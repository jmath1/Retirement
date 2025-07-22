data "aws_iam_openid_connect_provider" "existing_github_runner_provider" {
    url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "github_runner_provider" {
    # create if it doesnt already exist
    count          = length(data.aws_iam_openid_connect_provider.existing_github_runner_provider.id) == 0 ? 1 : 0
    client_id_list = ["sts.amazonaws.com"]
    thumbprint_list = ["${var.github_thumbprint}"]

    url = "https://token.actions.githubusercontent.com"
}


data "aws_iam_policy_document" "github_allow" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [ 
        length(data.aws_iam_openid_connect_provider.existing_github_runner_provider.id) == 0 ? 
        aws_iam_openid_connect_provider.github_runner_provider[0].arn : 
        data.aws_iam_openid_connect_provider.existing_github_runner_provider.arn ]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repository_owner}/${var.github_repository_name}:*"]
    }
  }
}


resource "github_actions_secret" "aws_account_number" {
  repository      = var.github_repository_name
  secret_name     = "AWS_ACCOUNT_NUMBER"
  plaintext_value = var.aws_account_number
}

resource "github_actions_secret" "s3_bucket_name" {
  repository  = var.github_repository_name
  secret_name = "S3_BUCKET_NAME"
  plaintext_value = var.bucket_name
}

resource "github_actions_secret" "cf_distribution_id" {
  repository  = var.github_repository_name
  secret_name = "CLOUDFRONT_DISTRIBUTION_ID"
  plaintext_value = aws_cloudfront_distribution.react_app.id
}