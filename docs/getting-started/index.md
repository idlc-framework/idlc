---
title: Getting Started
layout: default
nav_order: 2
has_children: true
permalink: /getting-started/
---

# Getting Started

## Why IDLC?

Modern organizations don't have a single infrastructure team — they have many. DevOps, SecOps, MLOps, DataOps, Platform Engineering, and application teams all need to provision and manage cloud resources. Without a shared framework, each team builds its own patterns, tools, and conventions. The result is drift, duplication, and friction.

IDLC solves this by giving every team a **common language** for infrastructure.

{: .note }
IDLC stands for **Infrastructure as Code Development Lifecycle**. It applies software development best practices — versioning, testing, code review, automated releases — to infrastructure management.

## The Problem

```
Team A (DevOps)     → Custom Terraform modules, manual deploys
Team B (DataOps)    → Copy-pasted configs, no versioning
Team C (MLOps)      → Different folder structure, no code review
Team D (SecOps)     → Can't enforce policies across teams
```

Every team reinvents the wheel. Security defaults are inconsistent. There's no shared module registry. Onboarding new engineers takes weeks. AI tools can't help because there's no consistent structure to learn from.

## The IDLC Solution

```
┌─────────────────────────────────────────────────────┐
│                   IDLC Framework                     │
│                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────────┐    │
│  │ Modules  │──▶│Solutions │──▶│ Deployments  │    │
│  │ (reuse)  │   │(compose) │   │ (ship)       │    │
│  └──────────┘   └──────────┘   └──────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │         8 Phases (Plan → Monitor)             │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │    Stack Set (Terrareg, Terragrunt, Atlantis, │   │
│  │    release-please, terraform-docs, pre-commit)│   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         │           │           │           │
     DevOps      DataOps      MLOps      SecOps
```

With IDLC, every team follows the same structure:

- **Modules** — Reusable, secure-by-default building blocks
- **Solutions** — Opinionated compositions that enforce policies
- **Deployments** — Declarative, environment-specific configurations
- **GitOps** — Every change goes through a pull request

## Who Benefits?

| Team | How IDLC Helps |
|:-----|:---------------|
| **DevOps** | Standardized modules, automated releases, zero-touch deployments |
| **SecOps** | Security defaults baked into modules, policy-as-code enforcement |
| **DataOps** | Reuse proven database and storage modules, consistent tagging |
| **MLOps** | Compose ML infrastructure from existing modules, version everything |
| **Platform** | Publish modules to a shared registry, enforce standards at scale |
| **Application Teams** | Self-service infrastructure through solutions, no Terraform expertise needed |

## AI Friendly by Design

IDLC's structured, convention-driven approach makes it ideal for AI-assisted development:

- **Consistent file structure** — AI tools can navigate and generate code predictably
- **Conventional Commits** — Automated versioning means AI can follow release patterns
- **Auto-generated docs** — Every module is self-documenting via terraform-docs
- **Opinionated defaults** — Less decision-making, more automation
- **Modular architecture** — AI can compose solutions from existing modules

{: .tip }
When every team follows the same patterns, AI copilots become dramatically more effective. They can learn from one team's modules and apply that knowledge across the entire organization.

## The IDLC Lifecycle

The framework defines 8 phases that mirror the software development lifecycle:

```
  ┌──────────────────────────────────────────────┐
  │              DEVELOPMENT                      │
  │                                               │
  │   Plan ──▶ Code ──▶ Build ──▶ Test ──▶       │
  │                                    │          │
  │                              Release ──▶      │
  │                                    │          │
  │                               Deploy          │
  └────────────────────────────────┬───────────── │
                                   │
  ┌────────────────────────────────▼──────────────┐
  │              OPERATIONS                        │
  │                                                │
  │          Operate ──▶ Monitor ──┐               │
  │                                │               │
  │          ◀─── Feedback Loop ◀──┘               │
  └────────────────────────────────────────────────┘
```

Each phase has clear responsibilities, tooling, and outputs. The Operations phases feed insights back into the next development cycle, creating a continuous improvement loop.

## Key Principles

1. **Zero Touch on Production** — No manual intervention in production environments. All changes go through the PR-based GitOps workflow.

2. **Modules Versioning** — Every module and solution follows semantic versioning with automated releases.

3. **Modular Architecture** — Small, reusable modules compose into opinionated solutions that deploy declaratively.

4. **Automated Compliance** — Security and compliance checks are built into the pipeline, not bolted on after.

5. **Cross-Platform** — Deploy consistently across AWS, Azure, GCP, and on-premises using the same patterns.

## Repository Structure

An IDLC repository follows a three-tier structure:

```
your-idlc-repo/
├── modules/          # Reusable infrastructure components
│   ├── s3/
│   ├── rds/
│   ├── eks/
│   └── ...
├── solutions/        # Service compositions
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

## Prerequisites

Install the following tools before proceeding:

```bash
brew install pre-commit terraform-docs tenv tflint
```

{: .note }
We use `tenv` to manage OpenTofu/Terraform/Terragrunt versions. If you have `tfenv` installed, uninstall it first: `brew uninstall tfenv && brew install tenv`.

## Next Steps

- Explore the [Core Concepts]({{ site.baseurl }}/concepts/) — Modules, Solutions, and Deployments
- Understand the [8 Phases]({{ site.baseurl }}/phases/) of the lifecycle
- Review the [Stack Set]({{ site.baseurl }}/stackset/) toolchain
- Check [Cloud Provider]({{ site.baseurl }}/cloud-providers/) support
