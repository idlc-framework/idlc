---
title: Getting Started
layout: default
nav_order: 2
has_children: true
permalink: /getting-started/
---

# Getting Started

This guide walks you through setting up an IDLC-compliant infrastructure repository from scratch.

## Prerequisites

Install the following tools before proceeding:

```bash
brew install pre-commit terraform-docs tenv tflint
```

{: .note }
We use `tenv` to manage OpenTofu/Terraform/Terragrunt versions. If you have `tfenv` installed, uninstall it first: `brew uninstall tfenv && brew install tenv`.

## Repository Setup

Initialize your repository with pre-commit hooks to enforce code standards:

```bash
# Install pre-commit in repo
DIR=~/.git-template
git config --global init.templateDir ${DIR}
pre-commit init-templatedir -t pre-commit ${DIR}

pre-commit install
```

## Repository Structure

An IDLC repository follows a three-tier structure:

```
your-idlc-repo/
├── modules/          # Reusable infrastructure components
│   ├── s3/
│   ├── rds/
│   ├── eks/
│   └── ...
├── solutions/       # Service compositions
│   ├── my-app/
│   ├── my-database/
│   └── ...
├── deployments/      # Environment-specific configurations
│   ├── region-1/
│   │   ├── stage/
│   │   └── production/
│   └── region-2/
│       ├── stage/
│       └── production/
└── .github/          # CI/CD workflows
```

## Next Steps

- Read about the [IDLC Phases]({{ site.baseurl }}/phases/) to understand the full lifecycle
- Explore [Modules]({{ site.baseurl }}/concepts/modules/) to learn how to write reusable components
- Check the [Stack Set]({{ site.baseurl }}/stackset/) for the recommended toolchain
