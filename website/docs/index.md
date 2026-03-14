---
title: Home
layout: home
nav_order: 1
description: "IDLC Framework - Infrastructure Development Lifecycle documentation. Apply software development best practices to infrastructure management."
permalink: /docs/
---

# IDLC Framework Documentation
{: .fs-9 }

Apply software development best practices to infrastructure management.
{: .fs-6 .fw-300 }

[Get Started]({{ "/docs/getting-started/" | relative_url }}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View on GitHub](https://github.com/idlc-framework/idlc){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## What is IDLC?

IDLC stands for **IaC Development Lifecycle**. It is a framework that integrates software development practices into infrastructure management, enabling large distributed teams to manage infrastructure as code with consistency, collaboration, and version-controlled workflows.

The framework is built around **8 phases** that mirror the software development lifecycle, adapted specifically for Infrastructure as Code (IaC):

**Plan** → **Code** → **Build** → **Test** → **Release** → **Deploy** → **Operate** → **Monitor**

## Key Principles

- **Zero Touch on Production** — Automate deployments with zero manual intervention in production
- **Modules Versioning** — Semantic versioning for all infrastructure modules
- **Modular Architecture** — Reusable modules, opinionated solutions, declarative deployments
- **Automated Compliance** — Security and compliance checks built into the pipeline
- **Cross-Platform** — Deploy consistently across AWS, Azure, GCP, and on-premises

## Core Concepts

| Concept | Description |
|:--------|:------------|
| **Module** | Smallest reusable unit defining a cloud resource with strong defaults |
| **Solution** | Opinionated composition of modules representing a complete service |
| **Deployment** | Environment-specific configuration that instantiates solutions |

## Cloud Provider Support

The IDLC framework is cloud-agnostic by design. While the examples in this documentation primarily use AWS, the patterns and principles apply to any cloud provider:

| Provider | Status |
|:---------|:-------|
| AWS | Examples and reference implementation available |
| Azure | Framework compatible — examples coming soon |
| GCP | Framework compatible — examples coming soon |
| On-premises | Framework compatible via Terraform providers |
