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

resource "aws_instance" "example" {
  ami = "ami-db710fa3"
  instance_type = "t2.micro"
  key_name = "sudokurace"
  vpc_security_group_ids = ["${aws_security_group.instance.id}"]

  tags {
    Name = "terraform-example"
  }
}

resource "aws_security_group" "instance" {
  name = "terraform-example-instance"

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
}
