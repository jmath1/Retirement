locals {
    zone_id = data.terraform_remote_state.domain.outputs.route53_zone.id
}