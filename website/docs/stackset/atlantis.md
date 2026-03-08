---
title: Atlantis
layout: default
parent: Stack Set
nav_order: 3
---

# Atlantis — GitOps for Infrastructure

[Atlantis](https://www.runatlantis.io/) is a pull-request automation tool for Terraform. It plans and applies infrastructure changes from Git, ensuring peer review is part of every change.

## Why Atlantis?

The IDLC framework enforces a **zero touch on production** principle. Atlantis makes this possible by:

- Running `plan` automatically on every PR
- Posting plan output as a PR comment for review
- Applying changes only after approval
- Providing an audit trail of every infrastructure change

## Key Features

| Feature | Description |
|:--------|:------------|
| Auto-plan on PR | Runs `tofu plan` when deployment files change |
| PR comments | Posts plan output directly in the pull request |
| Apply after approval | Changes are applied only after reviewer approval |
| Custom workflows | Define pre/post hooks for plan and apply |
| Policy checks | Run OPA/Conftest policies before apply |
| Lock management | Prevents concurrent changes to the same state |
| Chat notifications | Notify Slack/Teams on plan and apply events |

## How It Fits in IDLC

Atlantis is the enforcement layer for the **Deploy** phase. It ensures that:

1. Every infrastructure change goes through a pull request
2. Plans are reviewed by the right people (via CODEOWNERS)
3. No one applies changes manually
4. There is a full audit trail in Git

```
Developer → PR → Atlantis Plan → Review → Atlantis Apply → Infrastructure
```

## Workflow

### 1. Developer Opens a PR

```hcl
# deployments/region-1/production/my-app/terragrunt.hcl
terraform {
  source = "tfr://terrareg.example.com/solutions/my-app/aws?version=2.2.0"
  #                                                          ↑ version bump
}
```

### 2. Atlantis Runs Plan

Atlantis detects the changed files and runs `tofu plan` automatically. The plan output is posted as a PR comment:

```
Ran Plan for dir: deployments/region-1/production/my-app

Terraform will perform the following actions:

  # module.app_bucket.aws_s3_bucket.this will be updated
  ~ resource "aws_s3_bucket" "this" {
      ~ tags = {
          + "version" = "2.2.0"
        }
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```

### 3. Reviewer Approves

The reviewer checks the plan output and approves the PR. CODEOWNERS ensures the right team reviews the change.

### 4. Atlantis Applies

After approval, the reviewer (or Atlantis) applies the change:

```
atlantis apply -d deployments/region-1/production/my-app
```

## Custom Workflows

Atlantis supports custom workflows for pre/post hooks:

```yaml
# atlantis.yaml
workflows:
  terragrunt:
    plan:
      steps:
        - env:
            name: TF_INPUT
            value: "false"
        - run: terragrunt plan -no-color -out=$PLANFILE
    apply:
      steps:
        - run: terragrunt apply -no-color $PLANFILE
```

## CODEOWNERS Integration

Atlantis respects GitHub CODEOWNERS for approval requirements:

```
# CODEOWNERS
/deployments/ @my-org/platform-admin
/deployments/region-1/production/ @my-org/platform-team
/solutions/ @my-org/platform-admin
/modules/ @my-org/platform-admin
```

{: .warning }
Never bypass Atlantis to apply changes manually in production. The PR-based workflow is the only approved path for infrastructure changes.

{: .tip }
Configure Atlantis to require at least 2 approvals for production deployments and 1 for non-production.

## Links

- [Atlantis Documentation](https://www.runatlantis.io/docs/)
- [Atlantis GitHub](https://github.com/runatlantis/atlantis)
