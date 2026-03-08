---
title: AWS
layout: default
parent: Cloud Providers
nav_order: 1
---

# AWS Reference Implementation

AWS is the primary cloud provider for the IDLC reference implementation. This section documents the available modules, solutions, and deployment patterns.

## Module Catalog

### Storage

| Module | Version | Description |
|:-------|:--------|:------------|
| `s3-bucket` | 1.1.0 | S3 bucket with public access blocking, versioning, lifecycle rules |

### Database

| Module | Version | Description |
|:-------|:--------|:------------|
| `rds-postgres-database` | 1.3.0 | PostgreSQL RDS instance (main or replica) |
| `rds-parameter-group` | 1.0.2 | RDS parameter group with sensible defaults |
| `rds-alarms` | 1.3.0 | CloudWatch alarms for RDS instances |
| `rds-instance-dashboard` | 1.0.1 | CloudWatch dashboard for RDS monitoring |

### Compute & Containers

| Module | Version | Description |
|:-------|:--------|:------------|
| `ec2-instance` | 2.0.1 | EC2 instance with standard configuration |
| `eks-cluster` | 1.6.2 | EKS cluster with addons and node groups |
| `eks-karpenter-app` | 4.2.3 | Karpenter autoscaler application |
| `eks-karpenter-infra` | 2.0.3 | Karpenter infrastructure (IAM, SQS) |
| `eks-cluster-autoscaler` | 2.0.3 | Cluster Autoscaler setup |
| `eks-pod-identity` | 2.0.0 | EKS Pod Identity associations |
| `eks-irsa-infra` | 1.0.0 | IAM Roles for Service Accounts (infrastructure) |
| `eks-irsa-service-account` | 1.0.0 | IRSA Kubernetes service account |

### Networking & Security

| Module | Version | Description |
|:-------|:--------|:------------|
| `security-group-static` | 1.0.2 | Security group with static rules |
| `security-group-dynamic` | 1.0.1 | Security group with dynamic rules |
| `vpc-peering` | 1.0.1 | VPC peering connection |

### Messaging

| Module | Version | Description |
|:-------|:--------|:------------|
| `amazon-mq-instance` | 2.0.1 | Amazon MQ broker instance |
| `amazon-mq-alarms` | 0.2.0 | CloudWatch alarms for MQ |
| `messaging-ses` | 1.0.1 | Simple Email Service configuration |
| `messaging-pinpoint` | 1.0.0 | Pinpoint messaging setup |

### Other

| Module | Version | Description |
|:-------|:--------|:------------|
| `efs` | 1.1.3 | Elastic File System |
| `ecr-repository` | 1.4.4 | ECR container repository |
| `ecr-pull-through-cache` | 1.0.1 | ECR pull-through cache rules |
| `remote-state` | 1.1.1 | S3 + DynamoDB remote state backend |
| `redshift-serverless` | 1.1.0 | Redshift Serverless namespace/workgroup |
| `ssm-parameter-eso` | 1.0.1 | SSM Parameter for External Secrets Operator |

## Solution Examples

### Application Solution

Creates IAM roles, Kubernetes service accounts, and S3 buckets for an application:

```hcl
module "my-app" {
  source  = "terrareg.example.com/solutions/my-app/aws"
  version = "2.1.0"

  business_region = "region-1"
  environment     = "production"
  eks_cluster_names = ["region-1-production-us-west-2-main"]
}
```

### Database Solution

Creates RDS instances with replicas, alarms, and security groups:

```hcl
module "my-database" {
  source  = "terrareg.example.com/solutions/my-database/aws"
  version = "2.1.1"

  instance_identifier = "my-app-production"
  instance_class      = "db.r6g.large"
  allocated_storage   = 500
  subnet_group_name   = "region-1-production-db-subnet-group"
  create_replica      = true
  create_alarms       = true
  alarm_sns_topic_arn = "arn:aws:sns:us-west-2:123456789:alerts"
}
```

### EKS Cluster Solution

Creates a full EKS cluster with networking, addons, and autoscaling:

```hcl
module "cluster" {
  source  = "terrareg.example.com/solutions/my-cluster-base/aws"
  version = "1.3.2"

  tenant                        = "region-1"
  eks_env                       = "production"
  cluster_version               = "1.31"
  cluster_internal_control_version = "jazz"
  vpc_id                        = "vpc-0example"
  private_subnets               = ["subnet-a", "subnet-b", "subnet-c"]
  vpc_public_access_cidrs       = ["10.0.0.0/8"]
}
```

## Deployment Regions

| Region | Environments |
|:-------|:-------------|
| region-1 (us-west-2) | Stage, Production |
| region-2 (eu-west-1) | Stage, Production |
