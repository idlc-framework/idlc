---
title: Code
layout: default
parent: Development
grand_parent: Phases
nav_order: 2
---

# Code Phase

The Code phase is where you write the actual infrastructure code: modules, solutions, and deployments.

## Core Concepts

### Modules

The smallest reusable unit that defines a cloud resource. Modules enforce strong, opinionated defaults for security and compliance.

```hcl
# modules/s3/bucket/main.tf
resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = var.bucket_versioning_status
  }
}
```

### Solutions

Opinionated compositions of modules that represent a complete service. Solutions enforce required versions and policies — they should not be entirely configurable.

```hcl
# solutions/my-app/main.tf
module "app_bucket" {
  source  = "terrareg.example.com/modules/s3-bucket/aws"
  version = "1.1.0"

  bucket_name = "${var.environment}-${var.app_name}-data"
  bucket_tags = local.tags
}

module "app_database" {
  source  = "terrareg.example.com/modules/rds-postgres-database/aws"
  version = "1.3.0"

  instance_identifier = "${var.app_name}-${var.environment}"
  engine_version      = "16.6"  # Enforced by solution
  instance_class      = var.instance_class
  allocated_storage   = var.allocated_storage
  subnet_group_name   = var.subnet_group_name
}
```

### Deployments

Environment-specific definitions that instantiate solutions. A deployment always references a solution and never directly interacts with a module.

```hcl
# deployments/region-1/production/my-app/terragrunt.hcl
include "root" {
  path   = find_in_parent_folders("root.hcl")
  expose = true
}

terraform {
  source = "tfr://terrareg.example.com/solutions/my-app/aws?version=2.1.0"
}

inputs = {
  app_name          = "my-app"
  environment       = "production"
  business_region   = "region-1"
  instance_class    = "db.r6g.large"
  allocated_storage = 500
  subnet_group_name = "region-1-production-db-subnet-group"
}
```

## Repository Layout

```
your-idlc-repo/
├── modules/
│   ├── s3/
│   │   └── bucket/
│   ├── rds/
│   │   ├── postgres-database/
│   │   ├── parameter-group/
│   │   └── alarms/
│   └── eks/
│       ├── cluster/
│       └── karpenter/
├── solutions/
│   ├── my-app/
│   └── my-database/
└── deployments/
    ├── region-1/
    │   ├── stage/
    │   ├── production/
    └── region-2/
        └── production/
```

## Best Practices

- **Modules**: Small surface area, strong defaults (security, encryption, logging). Inputs are validated; outputs are minimal and purposeful.
- **Solutions**: Encapsulate service composition. Enforce required versions and policies. Only expose variables that truly vary across services.
- **Deployments**: One folder per team and environment. Keep them declarative (no business logic). Pin solution/module versions.
