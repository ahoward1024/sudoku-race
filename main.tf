terraform {
  backend "s3" {
    bucket = "sudokurace-tfstate-717012417639"
    key = "terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  # Empty because AWS credentials are passed through env variables
}

locals {
  lb_origin_id = "ELB-backend-lb"
}

data "aws_availability_zones" "all" {}

# This bucket receives requests to "sudokurace.io" for redirecting
resource "aws_s3_bucket" "redirect" {
  website {
    redirect_all_requests_to = "www.sudokurace.io"
  }
}

# Route requests to "sudokurace.io" to our CloudFront distribution
resource "aws_route53_record" "redirect" {
  zone_id = "${data.aws_route53_zone.zone.id}"
  name = "sudokurace.io"
  type = "A"

  alias {
    name = "${aws_cloudfront_distribution.distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.distribution.hosted_zone_id}"
    evaluate_target_health = "false"
  }
}

resource "aws_launch_configuration" "backend" {
  image_id = "ami-8c0d44f4"
  instance_type = "t2.micro"
  key_name = "sudokurace"
  iam_instance_profile = "SudokuRaceBackendRole"
  security_groups = ["${aws_security_group.backend.id}"]
  associate_public_ip_address = false

  user_data = <<-EOF
              #!/bin/sh
              eval $(aws ecr get-login --no-include-email --region us-west-2)
              docker run --restart always -d -p"${var.server_port}":8000 717012417639.dkr.ecr.us-west-2.amazonaws.com/sudokurace:${var.tag}
              EOF

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_alb" "alb" {
  name = "sudokurace-lb"
  security_groups = ["${aws_security_group.lb.id}"]
  subnets = ["subnet-58d6152f", "subnet-dc7c9c85", "subnet-33832e56"]
}

resource "aws_alb_listener" "alb" {
  load_balancer_arn = "${aws_alb.alb.arn}"
  port = "443"
  protocol = "HTTPS"
  ssl_policy = "ELBSecurityPolicy-2016-08"
  certificate_arn = "${aws_acm_certificate.cert.arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.alb.arn}"
    type = "forward"
  }
}

resource "aws_alb_target_group" "alb" {
  name = "sudokurace-lb-target-group"
  port = "80"
  protocol = "HTTP"
  vpc_id = "vpc-214d9b44"
}

resource "aws_autoscaling_attachment" "alb" {
  alb_target_group_arn = "${aws_alb_target_group.alb.arn}"
  autoscaling_group_name = "${aws_autoscaling_group.backend.id}"
}

resource "aws_autoscaling_group" "backend" {
  launch_configuration = "${aws_launch_configuration.backend.id}"
  availability_zones = ["${data.aws_availability_zones.all.names}"]

  min_size = 1
  max_size = 2

  target_group_arns = ["${aws_alb_target_group.alb.arn}"]

  tag {
    key = "Name"
    value = "backend-asg"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "backend" {
  name = "backend-sg"

  ingress {
    from_port = "${var.server_port}"
    to_port = "${var.server_port}"
    protocol = "tcp"
    security_groups = ["${aws_security_group.lb.id}"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "lb" {
  name = "lb-sg"

  ingress {
    from_port = "443"
    to_port = "443"
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name = "www.sudokurace.io"
  subject_alternative_names = ["sudokurace.io"]
  validation_method = "DNS"
}

data "aws_route53_zone" "zone" {
  name = "sudokurace.io."
  private_zone = false
}

resource "aws_route53_record" "cert_validation" {
  name = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.zone.id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl = 60
}

resource "aws_route53_record" "cert_validation_alt1" {
  name = "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_name}"
  type = "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_type}"
  zone_id = "${data.aws_route53_zone.zone.id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.1.resource_record_value}"]
  ttl = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = [
    "${aws_route53_record.cert_validation.fqdn}",
    "${aws_route53_record.cert_validation_alt1.fqdn}"
  ]
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = "${aws_alb.alb.dns_name}"
    origin_id = "${local.lb_origin_id}"

    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2", "SSLv3"]
    }
  }

  enabled = true

  aliases = ["www.sudokurace.io", "sudokurace.io"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.lb_origin_id}"

    forwarded_values {
      query_string = false
      headers = ["Host"]
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    # Manually created certificate. Apparently CloudFront can only use certs from us-east-1
    acm_certificate_arn = "arn:aws:acm:us-east-1:717012417639:certificate/8c310d5f-7e0f-4fc4-bb59-538ff047e946"
    ssl_support_method = "sni-only"
  }
}

resource "aws_route53_record" "backend" {
  zone_id = "${data.aws_route53_zone.zone.id}"
  name = "www.sudokurace.io"
  type = "CNAME"
  ttl = "5"
  records = ["${aws_cloudfront_distribution.distribution.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}
