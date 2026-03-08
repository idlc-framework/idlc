---
title: terraform-docs
layout: default
parent: Stack Set
nav_order: 5
---

# terraform-docs — Auto Documentation

[terraform-docs](https://terraform-docs.io) generates documentation for Terraform modules by reading inputs, outputs, providers, and resources directly from the code.

## Why terraform-docs?

In the IDLC framework, every module and solution must have up-to-date documentation. Manually maintaining README files is error-prone and quickly becomes stale. terraform-docs solves this by auto-generating documentation on every commit via pre-commit hooks.

## Key Features

| Feature | Description |
|:--------|:------------|
| Auto-generation | Reads `.tf` files and generates docs automatically |
| Multiple formats | Markdown, AsciiDoc, JSON, TOML, XML, YAML |
| Pluggable templates | Customize output format with Go templates |
| Inject mode | Update existing README without overwriting custom content |
| Pre-commit integration | Runs automatically before every commit |
| Sort options | Sort inputs/outputs alphabetically or by requirement |

## How It Fits in IDLC

terraform-docs runs during the **Code** and **Build** phases via pre-commit hooks. Every time a developer commits changes to a module, the README is automatically updated.

```
Developer edits module → git commit → pre-commit hook → terraform-docs → README updated
```

## Generated Documentation

terraform-docs generates a standardized README section that includes:

- **Requirements** — Terraform and provider version constraints
- **Providers** — Cloud providers used by the module
- **Modules** — Sub-modules referenced
- **Resources** — Cloud resources created
- **Inputs** — All input variables with types, defaults, and descriptions
- **Outputs** — All output values with descriptions

### Example Output

```markdown
<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| terraform | ~> 1.9 |
| aws | >= 3.60.0 |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| bucket_name | The bucket name. | `string` | n/a | yes |
| bucket_tags | Tags to assign to the Bucket. | `map(any)` | n/a | yes |
| block_public_acls | Block public ACLs. | `bool` | `true` | no |

## Outputs

| Name | Description |
|------|-------------|
| bucket | Bucket object ID |
| bucket_arn | ARN Bucket |
<!-- END_TF_DOCS -->
```

## Pre-commit Configuration

terraform-docs is integrated via the pre-commit framework:

```yaml
# .pre-commit-config.yaml
repos:
- repo: https://github.com/antonbabenko/pre-commit-terraform
  rev: v1.100.0
  hooks:
    - id: terraform_docs
      args:
      - --hook-config=--tf-path=tofu
      - --hook-config=--path-to-file=README.md
      - --hook-config=--add-to-existing-file=true
      - --hook-config=--create-file-if-not-exist=true
      - --args=--output-mode=inject
```

### Configuration Options

| Option | Description |
|:-------|:------------|
| `--path-to-file=README.md` | Target file for documentation |
| `--add-to-existing-file=true` | Inject into existing file instead of overwriting |
| `--create-file-if-not-exist=true` | Create README if it doesn't exist |
| `--output-mode=inject` | Only update content between `BEGIN_TF_DOCS` and `END_TF_DOCS` markers |

## Writing Module READMEs

Structure your module README with custom content above the auto-generated section:

```markdown
# My Module Name

Brief description of what this module does.

## Usage

\```hcl
module "example" {
  source  = "terrareg.example.com/modules/my-module/aws"
  version = "1.0.0"

  name = "example"
}
\```

<!-- BEGIN_TF_DOCS -->
(auto-generated content goes here)
<!-- END_TF_DOCS -->
```

{: .tip }
Always add a usage example above the `BEGIN_TF_DOCS` marker. The auto-generated docs cover inputs and outputs, but a real-world example helps consumers get started faster.

## Links

- [terraform-docs Website](https://terraform-docs.io)
- [terraform-docs GitHub](https://github.com/terraform-docs/terraform-docs)
- [pre-commit-terraform](https://github.com/antonbabenko/pre-commit-terraform)
