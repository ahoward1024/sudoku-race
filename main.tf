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

data "aws_availability_zones" "all" {}

resource "aws_launch_configuration" "backend" {
  image_id = "ami-8faee3f7"
  instance_type = "t2.micro"
  key_name = "sudokurace"
  iam_instance_profile = "SudokuRaceBackendRole"
  security_groups = ["${aws_security_group.backend.id}"]
  associate_public_ip_address = false

  user_data = <<-EOF
              #!/bin/sh
              eval $(sudo aws ecr get-login --no-include-email --region us-west-2)
              sudo docker run --restart always -d -p"${var.server_port}":8000 717012417639.dkr.ecr.us-west-2.amazonaws.com/sudokurace:latest
              EOF

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "backend" {
  launch_configuration = "${aws_launch_configuration.backend.id}"
  availability_zones = ["${data.aws_availability_zones.all.names}"]

  min_size = 1
  max_size = 1

  load_balancers = ["${aws_elb.backend.name}"]

  tag {
    key = "Name"
    value = "backend-asg"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_elb" "backend" {
  name = "backend-elb"
  security_groups = ["${aws_security_group.elb.id}"]
  availability_zones = ["${data.aws_availability_zones.all.names}"]

  listener {
    lb_port = 443
    lb_protocol = "https"
    instance_port = "${var.server_port}"
    instance_protocol = "http"
    ssl_certificate_id = "arn:aws:acm:us-west-2:717012417639:certificate/95a0de96-0eaa-4c61-8a24-80bac18c13e6"
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
    security_groups = ["${aws_security_group.elb.id}"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group" "elb" {
  name = "elb-sg"

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

resource "aws_route53_record" "backend" {
  zone_id = "Z3M4U9F1SEVV2O"
  name = "backend.sudokurace.io"
  type = "CNAME"
  ttl = "5"
  records = ["${aws_elb.backend.dns_name}"]

  lifecycle {
    create_before_destroy = true
  }
}
