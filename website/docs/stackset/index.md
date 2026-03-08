---
title: Stack Set
layout: default
nav_order: 5
has_children: true
permalink: /docs/stackset/
---

# Stack Set Toolchain

The IDLC framework relies on a curated set of tools that keep Terraform modules reusable, validated, and ready for consumption across teams.

## Tools Overview

| Tool | Role in IDLC |
|:-----|:-------------|
| [Terrareg]({{ "/docs/stackset/terrareg/" | relative_url }}) | Private module registry — publish, discover, and consume modules |
| [Terragrunt]({{ "/docs/stackset/terragrunt/" | relative_url }}) | DRY orchestration — multi-environment deployments without duplication |
| [Atlantis]({{ "/docs/stackset/atlantis/" | relative_url }}) | GitOps — plan and apply infrastructure from pull requests |
| [release-please]({{ "/docs/stackset/release-please/" | relative_url }}) | Automated versioning — changelogs and semantic tags from commits |
| [terraform-docs]({{ "/docs/stackset/terraform-docs/" | relative_url }}) | Auto documentation — generate README from module inputs/outputs |
| [Pre-commit Hooks]({{ "/docs/stackset/pre-commit/" | relative_url }}) | Code quality — enforce formatting, linting, and docs on every commit |
| [Release Automation]({{ "/docs/stackset/release-automation/" | relative_url }}) | CI/CD — automated versioning and registry publishing workflows |

## Operational Rhythm

Together these tools close the infrastructure delivery loop:

1. Teams **publish** hardened modules to Terrareg
2. Terragrunt **orchestrates** deployments across environments
3. Atlantis **validates** every pull request
4. release-please **ships** changelogs and version tags
5. terraform-docs **documents** everything automatically

Standardizing on this stack means new teams inherit proven practices from day one.
