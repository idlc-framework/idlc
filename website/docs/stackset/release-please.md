---
title: release-please
layout: default
parent: Stack Set
nav_order: 4
---

# release-please — Automated Versioning

[release-please](https://github.com/googleapis/release-please) is a release automation tool driven by Conventional Commits. It proposes pull requests that update changelogs, version tags, and GitHub releases with zero manual toil.

## Why release-please?

In the IDLC framework, every module and solution is versioned independently. Managing dozens of versions manually is error-prone. release-please automates the entire process:

- Analyzes commit messages to determine version bumps
- Creates release PRs with updated changelogs
- Tags releases with semantic versions
- Supports monorepo setups with multiple packages

## Key Features

| Feature | Description |
|:--------|:------------|
| Conventional Commits | Determines version bumps from commit messages |
| Monorepo support | Independent versioning per module/solution |
| Changelog generation | Auto-generates CHANGELOG.md per package |
| GitHub releases | Creates tagged releases with release notes |
| Manifest tracking | Tracks current versions in a manifest file |
| Custom tag format | Supports `@` separator for monorepo tags |

## How It Fits in IDLC

release-please powers the **Release** phase. It sits between Test and Deploy:

```
Code → Build → Test → [release-please] → Terrareg → Deploy
                            ↓
                    Version tags + Changelogs
```

## Conventional Commits

release-please uses commit messages to determine version bumps:

| Commit Prefix | Version Bump | Example |
|:--------------|:-------------|:--------|
| `fix:` | Patch (0.0.x) | `fix: correct S3 bucket policy` |
| `feat:` | Minor (0.x.0) | `feat: add lifecycle rules to S3 module` |
| `feat!:` or `BREAKING CHANGE:` | Major (x.0.0) | `feat!: rename bucket_name to name` |
| `chore:` | No release | `chore: update README` |
| `docs:` | No release | `docs: add usage examples` |

### Scoping Commits

For monorepos, scope your commits to the affected package:

```
feat(s3-bucket): add CORS configuration support
fix(rds-postgres-database): correct parameter group association
feat(sol-my-app)!: require eks_cluster_names as list
```

## Configuration

### release-please-config.json

Defines the release strategy and package mapping:

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
    "modules/s3/bucket": {
      "package-name": "s3-bucket"
    },
    "modules/rds/postgres-database": {
      "package-name": "rds-postgres-database"
    },
    "modules/eks/cluster": {
      "package-name": "eks-cluster"
    },
    "solutions/my-app": {
      "package-name": "sol-my-app"
    },
    "solutions/my-database": {
      "package-name": "sol-my-database"
    }
  }
}
```

### .release-please-manifest.json

Tracks current versions for each package:

```json
{
  "modules/s3/bucket": "1.1.0",
  "modules/rds/postgres-database": "1.3.0",
  "modules/eks/cluster": "1.6.2",
  "solutions/my-app": "2.1.0",
  "solutions/my-database": "2.1.1"
}
```

## Tag Format

Tags follow the pattern `<package-name>@v<version>`:

```
# Modules
s3-bucket@v1.1.0
rds-postgres-database@v1.3.0
eks-cluster@v1.6.2

# Solutions
sol-my-app@v2.1.0
sol-my-database@v2.1.1
```

## GitHub Actions Workflow

```yaml
name: Release Please
on:
  push:
    branches:
      - main

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          config-file: release-please-config.json
          manifest-file: .release-please-manifest.json
```

{: .note }
release-please only creates release PRs — it does not publish modules. A separate CI step should publish to Terrareg after the release is tagged.

## Links

- [release-please GitHub](https://github.com/googleapis/release-please)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
