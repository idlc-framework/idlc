---
title: Stack Set
layout: default
nav_order: 5
has_children: true
permalink: /stackset/
---

# Stack Set Toolchain

The IDLC framework relies on a curated set of tools that keep Terraform modules reusable, validated, and ready for consumption across teams.

## Tools Overview

| Tool | Role in IDLC |
|:-----|:-------------|
| [Terrareg]({{ site.baseurl }}/stackset/terrareg/) | Private module registry — publish, discover, and consume modules |
| [Terragrunt]({{ site.baseurl }}/stackset/terragrunt/) | DRY orchestration — multi-environment deployments without duplication |
| [Atlantis]({{ site.baseurl }}/stackset/atlantis/) | GitOps — plan and apply infrastructure from pull requests |
| [release-please]({{ site.baseurl }}/stackset/release-please/) | Automated versioning — changelogs and semantic tags from commits |
| [terraform-docs]({{ site.baseurl }}/stackset/terraform-docs/) | Auto documentation — generate README from module inputs/outputs |

## Operational Rhythm

Together these tools close the infrastructure delivery loop:

1. Teams **publish** hardened modules to Terrareg
2. Terragrunt **orchestrates** deployments across environments
3. Atlantis **validates** every pull request
4. release-please **ships** changelogs and version tags
5. terraform-docs **documents** everything automatically

Standardizing on this stack means new teams inherit proven practices from day one.
