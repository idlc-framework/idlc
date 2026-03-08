---
title: Terrareg
layout: default
parent: Stack Set
nav_order: 1
---

# Terrareg — Private Module Registry

[Terrareg](https://github.com/MatthewJohn/terrareg) is a private Terraform module registry that centralizes reusable components with access controls, semantic version tags, and searchable metadata.

## Why Terrareg?

In the IDLC framework, modules and solutions are the building blocks of all infrastructure. Terrareg provides a single place where teams can:

- **Discover** existing modules before writing new ones
- **Consume** versioned modules with confidence
- **Publish** new modules through automated CI pipelines
- **Audit** module usage across the organization

## Key Features

| Feature | Description |
|:--------|:------------|
| Scoped API tokens | Fine-grained access control per namespace or module |
| Module signing | Verify module integrity before consumption |
| Semantic versioning | Every module follows semver with tagged releases |
| Download analytics | Track which modules are used and by whom |
| Searchable metadata | Find modules by name, provider, or description |
| Auto-generated docs | Renders inputs, outputs, and usage examples |

## How It Fits in IDLC

```
Code → Build → Test → Release → [Terrareg] → Deploy
                                     ↑
                              Modules & Solutions
                              are published here
```

Terrareg sits between the Release and Deploy phases. Once a module passes all tests and gets a version tag, CI publishes it to Terrareg. Deployments then reference modules from the registry with pinned versions.

## Consuming Modules from Terrareg

### In a Solution

```hcl
module "app_bucket" {
  source  = "terrareg.example.com/modules/s3-bucket/aws"
  version = "1.1.0"

  bucket_name = "${var.environment}-${var.app_name}-data"
  bucket_tags = local.tags
}
```

### In a Deployment (via Terragrunt)

```hcl
terraform {
  source = "tfr://terrareg.example.com/solutions/my-app/aws?version=2.1.0"
}
```

## Module Naming Convention

Modules follow the Terraform registry naming convention:

```
<NAMESPACE>/<MODULE-NAME>/<PROVIDER>
```

Examples:
- `modules/s3-bucket/aws`
- `modules/rds-postgres-database/aws`
- `solutions/my-app/aws`

## Publishing Modules

Modules are published automatically via CI when a release tag is created by release-please:

1. Developer merges a PR with Conventional Commits
2. release-please creates a version tag (e.g., `s3-bucket@v1.1.0`)
3. CI workflow publishes the module to Terrareg
4. Module is immediately available for consumption

{: .tip }
Always browse Terrareg before creating a new module. Reusing existing modules reduces duplication and ensures consistency across teams.

## Links

- [Terrareg GitHub](https://github.com/MatthewJohn/terrareg)
- [Terrareg Documentation](https://terrareg.readthedocs.io/)
