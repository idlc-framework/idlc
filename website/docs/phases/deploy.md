---
title: Deploy
layout: default
parent: Development
grand_parent: Phases
nav_order: 6
---

# Deploy Phase

The Deploy phase applies solutions into target environments with strict enforcement of policies.

## Core Concepts

- Deployments are environment-specific (stage, production)
- Configurations are applied with strict enforcement of policies
- Zero manual intervention in production environments

## Deployment Structure

```
deployments/
├── region-1/
│   ├── stage/
│   │   ├── root.hcl
│   │   └── my-app/
│   │       ├── terragrunt.hcl
│   │       └── tags.yaml
│   └── production/
│       ├── root.hcl
│       └── my-app/
│           ├── terragrunt.hcl
│           └── tags.yaml
└── region-2/
    └── production/
        └── my-app/
            └── terragrunt.hcl
```

## Terragrunt Configuration

### root.hcl (Environment-level)

Defines shared configuration for all deployments in an environment:

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
  }
}

locals {
  env_vars = {
    business_region = "region-1"
    environment     = "production"
    vpc_id          = "vpc-0example"
  }
}
```

### terragrunt.hcl (Deployment-level)

```hcl
include "root" {
  path   = find_in_parent_folders("root.hcl")
  expose = true
}

terraform {
  source = "tfr://terrareg.example.com/solutions/my-app/aws?version=2.1.0"
}

inputs = {
  business_region = "region-1"
  environment     = "production"
}
```

## Deployment Commands

```bash
# Initialize
tofu init

# Preview changes
tofu plan -var-file=production.tfvars

# Apply changes
tofu apply -var-file=production.tfvars
```

## GitOps with Atlantis

In production, deployments are managed through pull requests using [Atlantis](https://www.runatlantis.io/):

1. Developer opens a PR with deployment changes
2. Atlantis automatically runs `plan` and posts the output
3. Reviewer approves the plan
4. Atlantis applies the changes

{: .warning }
Never apply infrastructure changes manually in production. All changes must go through the PR-based GitOps workflow.
