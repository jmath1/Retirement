resource "aws_route53_record" "react_app_route" {
  zone_id = data.terraform_remote_state.domain.outputs.route53_zone.id
  name    = "retirement.jonathanmath.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.react_app.domain_name
    zone_id                = aws_cloudfront_distribution.react_app.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_react_app_route" {
  zone_id = data.terraform_remote_state.domain.outputs.route53_zone.id
  name    = "www.retirement.jonathanmath.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.react_app.domain_name
    zone_id                = aws_cloudfront_distribution.react_app.hosted_zone_id
    evaluate_target_health = false
  }
}

