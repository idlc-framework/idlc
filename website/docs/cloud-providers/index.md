---
title: Cloud Providers
layout: default
nav_order: 6
has_children: true
permalink: /docs/cloud-providers/
---

# Cloud Providers

The IDLC framework is cloud-agnostic by design. The same principles of modules, solutions, and deployments apply regardless of the underlying cloud provider.

## Supported Providers

| Provider | Status | Description |
|:---------|:-------|:------------|
| [AWS]({{ "/docs/cloud-providers/aws.html" | relative_url }}) | Reference implementation | Full module library with production examples |
| [Azure]({{ "/docs/cloud-providers/azure.html" | relative_url }}) | Framework ready | Patterns defined, modules in development |
| [GCP]({{ "/docs/cloud-providers/gcp.html" | relative_url }}) | Framework ready | Patterns defined, modules in development |

## Multi-Cloud Strategy

When working across multiple cloud providers, the repository structure extends naturally:

```
your-idlc-repo/
├── modules/
│   ├── aws/
│   │   ├── s3/
│   │   ├── rds/
│   │   └── eks/
│   ├── azure/
│   │   ├── storage-account/
│   │   ├── azure-sql/
│   │   └── aks/
│   └── gcp/
│       ├── cloud-storage/
│       ├── cloud-sql/
│       └── gke/
├── solutions/
│   ├── my-app-aws/
│   ├── my-app-azure/
│   └── my-app-gcp/
└── deployments/
    ├── aws/
    │   └── region-1/
    ├── azure/
    │   └── westeurope/
    └── gcp/
        └── us-central1/
```

## Provider-Agnostic Principles

Regardless of the cloud provider, these principles always apply:

1. **Modules** enforce security defaults (encryption, public access blocking, etc.)
2. **Solutions** pin module versions and enforce organizational policies
3. **Deployments** are declarative and environment-specific
4. **All changes** go through the PR-based GitOps workflow
5. **Versioning** follows semantic versioning with automated releases
