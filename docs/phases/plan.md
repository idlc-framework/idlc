---
title: Plan
layout: default
parent: Development
grand_parent: Phases
nav_order: 1
---

# Plan Phase

Define infrastructure requirements and architecture. Collaborate with stakeholders to align on goals.

## Objectives

- Create architecture diagrams
- Define resource dependencies
- Plan for scalability and compliance
- Identify which cloud provider(s) will be used

## Activities

1. **Requirements Gathering** — Work with application teams to understand infrastructure needs
2. **Architecture Design** — Define the target architecture using diagrams and documentation
3. **Resource Planning** — Identify which modules exist and which need to be created
4. **Compliance Review** — Ensure the plan meets security and regulatory requirements

## Cloud Provider Considerations

When planning, consider the target cloud provider(s):

| Aspect | AWS | Azure | GCP |
|:-------|:----|:------|:----|
| Compute | EC2, EKS, Lambda | AKS, VMs, Functions | GKE, Compute Engine, Cloud Run |
| Storage | S3, EBS | Blob Storage, Managed Disks | Cloud Storage, Persistent Disk |
| Database | RDS, DynamoDB | Azure SQL, Cosmos DB | Cloud SQL, Spanner |
| Networking | VPC, ALB | VNet, App Gateway | VPC, Cloud Load Balancing |

{: .tip }
The IDLC framework is cloud-agnostic. Your modules should abstract provider-specific details behind clean interfaces.

## Best Practices

- Document decisions in Architecture Decision Records (ADRs)
- Use draw.io or similar tools for architecture diagrams
- Plan module boundaries early — smaller modules are easier to test and reuse
- Consider multi-region and disaster recovery from the start
