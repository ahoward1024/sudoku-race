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

resource "aws_instance" "backend" {
  ami = "ami-8faee3f7"
  instance_type = "t2.micro"
  key_name = "sudokurace"
  vpc_security_group_ids = ["${aws_security_group.backend.id}"]
  iam_instance_profile = "SudokuRaceBackendRole"

  user_data = <<-EOF
              #!/bin/sh
              eval $(sudo aws ecr get-login --no-include-email --region us-west-2)
              sudo docker run --restart always -d -p"${var.server_port}":8080  717012417639.dkr.ecr.us-west-2.amazonaws.com/sudokurace:latest
              EOF

  lifecycle {
    create_before_destroy = true
  }

  tags {
    Name = "sudokurace-backend"
  }
}

resource "aws_security_group" "backend" {
  name = "backend-sg"

  ingress {
    from_port = "${var.server_port}"
    to_port = "${var.server_port}"
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = "22"
    to_port = "22"
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "backend" {
  zone_id = "Z3M4U9F1SEVV2O"
  name = "backend.sudokurace.io"
  type = "A"
  ttl = "5"
  records = ["${aws_instance.backend.public_ip}"]

  lifecycle {
    create_before_destroy = true
  }
}
