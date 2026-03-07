---
title: Pre-commit Hooks
layout: default
parent: Getting Started
nav_order: 1
---

# Pre-commit Hooks

IDLC repositories use pre-commit hooks to enforce code quality and documentation standards before every commit.

## Configuration

Create a `.pre-commit-config.yaml` in your repository root:

```yaml
repos:
- repo: https://github.com/antonbabenko/pre-commit-terraform
  rev: v1.100.0
  hooks:
    - id: terraform_fmt
      args:
      - --hook-config=--tf-path=tofu
    - id: terraform_docs
      args:
      - --hook-config=--tf-path=tofu
      - --hook-config=--path-to-file=README.md
      - --hook-config=--add-to-existing-file=true
      - --hook-config=--create-file-if-not-exist=true
      - --args=--output-mode=inject
    - id: terragrunt_fmt
    - id: terraform_tflint
      args:
      - --hook-config=--delegate-chdir
      - --args=--enable-rule=terraform_naming_convention
      - --args=--enable-rule=terraform_unused_required_providers
```

## What Each Hook Does

| Hook | Purpose |
|:-----|:--------|
| `terraform_fmt` | Formats all `.tf` files using OpenTofu |
| `terraform_docs` | Auto-generates README documentation from module inputs/outputs |
| `terragrunt_fmt` | Formats Terragrunt `.hcl` files |
| `terraform_tflint` | Lints Terraform code for naming conventions and unused providers |

## Troubleshooting

{: .warning }
If you see `Error: Cannot install tenv because conflicting formulae are installed`, uninstall `tfenv` first: `brew uninstall tfenv`.

{: .warning }
If you see `Cowardly refusing to install hooks with core.hooksPath set`, run: `git config --global --unset core.hooksPath && pre-commit install`.
