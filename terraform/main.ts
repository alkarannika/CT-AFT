provider "aws" {
  region = "us-east-1"
}
terraform {
  backend "s3" {
    bucket = "585008052901-aftbootstrap-tfstate"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "ddb-aftbootstrap-state"
  }
}
module "aft_pipeline" {
  source = "github.com/aws-ia/terraform-aws-control_tower_account_factory"
  # Required Variables
  ct_management_account_id                         = "585008052901"
  log_archive_account_id                           = "626635407688"
  audit_account_id                                 = "180294209663"
  aft_management_account_id                        = "640168422994"
  ct_home_region                                   = "us-east-1"
  tf_backend_secondary_region                      = "us-east-2"
  # Terraform variables
  terraform_version                                = "1.9.8"
  terraform_distribution                           = "oss"
  # VCS Vars
  vcs_provider                                     = "github"
  account_request_repo_name                        = "alkarannika/aft-account-request"
  global_customizations_repo_name                  = "alkarannika/aft-global-customizations"
  account_customizations_repo_name                 = "alkarannika/aft-account-customizations"
  account_provisioning_customizations_repo_name    = "alkarannika/aft-account-provisioning-customizations"
  # AFT Feature flags
  aft_feature_cloudtrail_data_events               = false
  aft_feature_enterprise_support                   = false
  aft_feature_delete_default_vpcs_enabled          = true
  # AFT Additional Configurations
  aft_enable_vpc                                   = false
  backup_recovery_point_retention                  = 1
  log_archive_bucket_object_expiration_days        = 1
}
