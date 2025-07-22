provider "aws" {
  region = "us-east-1"
}

provider "github" {
  token = var.github_token
}

terraform {
  backend "s3" {
    bucket = "jonathanmathcom-terraform-state"
    key    = "retirement.tfstate"
    region = "us-east-1"
  }
}