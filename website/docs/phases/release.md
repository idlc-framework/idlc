---
title: Release
layout: default
parent: Development
grand_parent: Phases
nav_order: 5
---

# Release Phase

The Release phase versions and publishes modules and solutions to a private registry for consumption.

## Release Flow

1. Developer merges code following Conventional Commits
2. `release-please` creates a release PR with changelog updates
3. On merge, a GitHub release is created with a semantic version tag
4. CI publishes the module/solution to the private Terraform registry (Terrareg)

## Semantic Versioning

All modules and solutions follow [Semantic Versioning](https://semver.org/):

| Change Type | Version Bump | Example |
|:------------|:-------------|:--------|
| Breaking change | Major | `1.0.0` → `2.0.0` |
| New feature | Minor | `1.0.0` → `1.1.0` |
| Bug fix | Patch | `1.0.0` → `1.0.1` |

## Tagging Convention

```
# Modules
s3-bucket@v1.1.0
rds-postgres-database@v1.3.0
eks-cluster@v1.6.2

# Solutions
blu-my-app@v2.1.0
blu-my-database@v2.1.1
```

## Private Registry (Terrareg)

Modules are published to [Terrareg](https://github.com/MatthewJohn/terrareg), a private Terraform module registry that provides:

- Scoped API tokens for access control
- Searchable metadata and documentation
- Download analytics
- Module signing and verification

### Consuming a Module

```hcl
module "my_bucket" {
  source  = "terrareg.example.com/modules/s3-bucket/aws"
  version = "1.1.0"

  bucket_name = "my-application-data"
  bucket_tags = { team = "platform" }
}
```

{: .note }
Always pin module versions in solutions and deployments. Use version constraints (`~>`, `>=`) only when you have a clear upgrade strategy.
