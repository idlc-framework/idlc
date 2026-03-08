---
title: Deployments
layout: default
parent: Core Concepts
nav_order: 3
---

# Deployments

Deployments are environment-specific definitions that establish how solutions are utilized. A deployment always references a solution and never directly interacts with a module.

## Characteristics

- **Environment-specific** — One folder per region and environment
- **Declarative** — No business logic, only configuration
- **Pinned versions** — Always reference a specific solution version
- **Terragrunt-based** — Uses Terragrunt for DRY configuration and orchestration

## Deployment Hierarchy

```
deployments/
├── region-1/                      # Region
│   ├── stage/                     # Environment
│   │   ├── root.hcl              # Shared env config
│   │   ├── my-app/               # Service deployment
│   │   │   ├── terragrunt.hcl
│   │   │   └── tags.yaml
│   │   └── my-database/
│   │       ├── terragrunt.hcl
│   │       └── tags.yaml
│   └── production/
│       ├── root.hcl
│       └── ...
└── region-2/
    ├── stage/
    └── production/
```

## Environment Types

| Environment | Purpose | Region Examples |
|:------------|:--------|:---------------|
| Stage | Pre-production testing and validation | region-1, region-2 |
| Production | Live production workloads | region-1, region-2 |

## root.hcl — Environment Configuration

Each environment has a `root.hcl` that defines shared settings:

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
    business_region      = "region-1"
    environment          = "production"
    vpc_id               = "vpc-0example"
    db_subnet_group_name = "region-1-production-db-subnet-group"
    alarm_sns_topic_arn  = "arn:aws:sns:us-west-2:123456789:region-1-production-alerts"
  }
}
```

## Tagging Strategy

Tags are enforced at the environment level and merged with deployment-specific tags:

```yaml
# tags.yaml
company:ops:owner: "platform-team"
company:cost:project: "my-project"
company:cost:center-name: "engineering"
```

```hcl
# In root.hcl
locals {
  default_tags = {
    "ops:region"      = local.env_vars.business_region
    "ops:environment" = local.env_vars.environment
  }

  overwrite_tags = try(yamldecode(file("${get_terragrunt_dir()}/tags.yaml")))

  tags = merge(
    local.default_tags,
    {
      "ops:owner"        = local.overwrite_tags["ops:owner"]
      "cost:project"     = local.overwrite_tags["cost:project"]
      "cost:center-name" = local.overwrite_tags["cost:center-name"]
    },
    local.overwrite_tags,
    {
      "ops:stack" = "${path_relative_to_include()}"
    }
  )
}
```

{: .tip }
The tag merge strategy ensures mandatory tags are always present while allowing deployments to add custom tags.
