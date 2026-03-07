---
title: Release Automation
layout: default
parent: Getting Started
nav_order: 2
---

# Release Automation

IDLC uses [release-please](https://github.com/googleapis/release-please) to automate versioning and changelog generation based on Conventional Commits.

## How It Works

1. Developers write commits following the [Conventional Commits](https://www.conventionalcommits.org/) specification
2. `release-please` analyzes commits and proposes release PRs
3. When merged, it creates GitHub releases with semantic version tags
4. Modules and solutions are published to the private registry (Terrareg)

## Configuration

### release-please-config.json

```json
{
  "release-type": "terraform-module",
  "separate-pull-requests": false,
  "include-v-in-tag": true,
  "tag-separator": "@",
  "plugins": [
    { "type": "sentence-case" }
  ],
  "packages": {
    "modules/s3/bucket": { "package-name": "s3-bucket" },
    "modules/rds/postgres-database": { "package-name": "rds-postgres-database" },
    "solutions/my-app": { "package-name": "sol-my-app" }
  }
}
```

### .release-please-manifest.json

Tracks current versions for each package:

```json
{
  "modules/s3/bucket": "1.1.0",
  "modules/rds/postgres-database": "1.3.0",
  "solutions/my-app": "2.1.0"
}
```

## Versioning Convention

- Modules use `<module-name>@v<version>` tags (e.g., `s3-bucket@v1.1.0`)
- Solutions use `sol-<name>@v<version>` tags (e.g., `sol-my-app@v2.1.0`)
- All versions follow [Semantic Versioning](https://semver.org/)
