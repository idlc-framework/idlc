---
title: Solutions
layout: default
parent: Core Concepts
nav_order: 2
---

# Solutions

Solutions are opinionated compositions of modules configured for deployment. They represent and group all the resources that compose a specific solution.

## Characteristics

- **Compose modules** — Aggregate multiple modules into a service definition
- **Enforce policies** — Pin module versions, enforce security settings
- **Limited configurability** — Only expose variables that truly vary across environments
- **Self-contained** — A solution is the artifact that gets deployed

## Solution Structure

```
solutions/my-app/
├── main.tf           # Module compositions
├── variables.tf      # Limited, intentional inputs
├── outputs.tf        # Service-level outputs
├── versions.tf       # Provider constraints
├── README.md         # Auto-generated docs
└── CHANGELOG.md      # Auto-generated changelog
```

## Example: Application Solution (AWS)

This solution creates all AWS resources needed by an application — IAM roles, Kubernetes service accounts, and S3 buckets:

```hcl
# solutions/my-app/main.tf

module "app_service_account" {
  source  = "terrareg.example.com/modules/eks-irsa-service-account/aws"
  version = "1.0.0"

  for_each = toset(var.eks_cluster_names)

  cluster_name       = each.value
  namespace          = var.app_namespace
  service_account    = "my-app"
  iam_role_arn       = module.app_irsa_infra.role_arn
}

module "app_irsa_infra" {
  source  = "terrareg.example.com/modules/eks-irsa-infra/aws"
  version = "1.0.0"

  business_region = var.business_region
  environment     = var.environment
  service_name    = "my-app"
  policy_arn      = aws_iam_policy.app_policy.arn
}

module "data_bucket" {
  source  = "terrareg.example.com/modules/s3-bucket/aws"
  version = "1.1.0"

  bucket_name = "${lower(var.business_region)}-${lower(var.environment)}-my-app-data"
  bucket_tags = {
    service = "my-app"
    team    = "platform"
  }
}
```

## Example: Database Solution (AWS)

A database solution composes RDS modules with alarms and security groups:

```hcl
# solutions/my-database/main.tf

module "main" {
  source  = "terrareg.example.com/modules/rds-postgres-database/aws"
  version = "1.3.0"

  instance_identifier = var.instance_identifier
  engine_version      = "16.6"  # Enforced — not configurable
  instance_class      = var.instance_class
  allocated_storage   = var.allocated_storage
  subnet_group_name   = var.subnet_group_name
  deletion_protection = true    # Enforced — always on
  multi_az            = var.multi_az
}

module "replica" {
  count   = var.create_replica ? 1 : 0
  source  = "terrareg.example.com/modules/rds-postgres-database/aws"
  version = "1.2.0"

  create_as_replica   = true
  instance_identifier = module.main.db_instance_name
  # ...
}

module "security_group" {
  source  = "terrareg.example.com/modules/security-group-static/aws"
  version = "1.0.0"
  # ...
}

module "main_db_alarms" {
  source  = "terrareg.example.com/modules/rds-alarms/aws"
  version = "1.3.0"

  db_instance_identifier = module.main.db_instance_name
  alarm_sns_topic_arn    = var.alarm_sns_topic_arn
}
```

{: .warning }
Solutions should **never** be entirely configurable. Key settings like engine versions, deletion protection, and encryption must be enforced by the solution, not left to the consumer.

## Available Solution Examples

| Solution | Description |
|:---------|:------------|
| Application | IAM roles, K8s service accounts, S3 buckets |
| Database | RDS instances, replicas, alarms, security groups |
| Cluster | EKS cluster with addons, autoscaling, networking |
| Nexus | Artifact repository with S3, EFS, DNS |
| Messaging | Amazon MQ instances with alarms and dashboards |
