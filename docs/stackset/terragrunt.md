---
title: Terragrunt
layout: default
parent: Stack Set
nav_order: 2
---

# Terragrunt — DRY Orchestration

[Terragrunt](https://terragrunt.gruntwork.io) is an opinionated wrapper around Terraform/OpenTofu that keeps configurations DRY, enforces remote state conventions, and fans out deployments safely.

## Why Terragrunt?

Without Terragrunt, deploying the same solution across 10+ environments means duplicating backend configuration, provider blocks, and shared variables in every folder. Terragrunt eliminates this duplication through hierarchical configuration.

## Key Features

| Feature | Description |
|:--------|:------------|
| Hierarchical config | Inherit settings from parent `root.hcl` files |
| DRY backends | Define remote state once, reuse everywhere |
| Dependency management | Declare dependencies between deployments |
| Provider generation | Auto-generate provider blocks per environment |
| Built-in state locking | Prevent concurrent modifications |
| Fan-out execution | Apply changes across multiple modules in order |

## How It Fits in IDLC

Terragrunt is the engine behind the **Deploy** phase. It orchestrates how solutions are instantiated across regions and environments.

```
deployments/
├── region-1/
│   ├── stage/
│   │   ├── root.hcl          ← Shared config for region-1 stage
│   │   ├── my-app/
│   │   │   └── terragrunt.hcl
│   │   └── my-database/
│   │       └── terragrunt.hcl
│   └── production/
│       ├── root.hcl          ← Shared config for region-1 production
│       └── my-app/
│           └── terragrunt.hcl
└── region-2/
    └── production/
        ├── root.hcl
        └── my-app/
            └── terragrunt.hcl
```

## Configuration Hierarchy

### root.hcl — Environment Level

Defines shared settings for all deployments in an environment:

```hcl
remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket         = "my-org-region-1-production-terraform-remote-state"
    dynamodb_table = "my-org-region-1-production-terraform-remote-state-locks"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    role_arn       = local.env_vars.atlantis_role
  }
}

locals {
  env_vars = {
    business_region      = "region-1"
    environment          = "production"
    vpc_id               = "vpc-0example"
    db_subnet_group_name = "region-1-production-db-subnet-group"
    alarm_sns_topic_arn  = "arn:aws:sns:us-west-2:123456789:region-1-production-alerts"
  }
}

terraform_binary = "tofu"
```

### terragrunt.hcl — Deployment Level

References a solution from Terrareg and passes environment-specific inputs:

```hcl
include "root" {
  path   = find_in_parent_folders("root.hcl")
  expose = true
}

dependency "eks_cluster" {
  config_path = "../eks/base/jazz"
}

terraform {
  source = "tfr://terrareg.example.com/solutions/my-app/aws?version=2.1.0"
}

inputs = {
  business_region = "region-1"
  environment     = "production"

  eks_cluster_names = [
    dependency.eks_cluster.outputs.name
  ]
}
```

## Provider Generation

Terragrunt can auto-generate provider blocks, keeping them consistent across environments:

```hcl
generate "provider" {
  path      = "providers.tf"
  if_exists = "overwrite_terragrunt"

  contents = <<EOF
provider "aws" {
  region = "us-west-2"
  assume_role {
    role_arn = "${local.env_vars.atlantis_role}"
  }
  default_tags {
    tags = ${jsonencode(local.tags)}
  }
}
EOF
}
```

## Dependency Management

Declare explicit dependencies between deployments:

```hcl
dependency "eks_cluster" {
  config_path = "../eks/base/jazz"
}

dependency "database" {
  config_path = "../my-database"
}

inputs = {
  cluster_name = dependency.eks_cluster.outputs.name
  db_endpoint  = dependency.database.outputs.main_db_instance_endpoint
}
```

{: .warning }
Always use `dependency` blocks instead of hardcoding values. This ensures deployments are applied in the correct order and outputs are always fresh.

## Common Commands

```bash
# Plan a single deployment
terragrunt plan

# Apply a single deployment
terragrunt apply

# Plan all deployments in a directory
terragrunt run-all plan

# Apply all deployments in order
terragrunt run-all apply
```

## Links

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terragrunt GitHub](https://github.com/gruntwork-io/terragrunt)
