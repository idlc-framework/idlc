---
title: Plan
layout: default
parent: Development
grand_parent: Phases
nav_order: 1
---

# Plan Phase

The Plan phase in IDLC is not fundamentally different from planning in the traditional Software Development Lifecycle (SDLC). We don't reinvent the wheel here — we borrow from decades of proven software engineering practices and apply them to infrastructure.

If your organization already has a solid planning process for application development, you're most of the way there.

## What We Borrow from SDLC

The software industry has refined planning practices over many years. IDLC embraces these directly:

| SDLC Practice | How It Applies to IDLC |
|:--------------|:-----------------------|
| Requirements gathering | Understand what infrastructure the application teams need |
| User stories / tickets | Write infrastructure tasks as stories with clear acceptance criteria |
| Sprint planning | Include infrastructure work in the same sprint cadence as application work |
| Architecture reviews | Review infrastructure design with the same rigor as application architecture |
| Risk assessment | Identify blast radius, rollback strategies, and compliance requirements |
| Definition of Done | A module isn't done until it's tested, documented, and published |

{: .note }
If you're familiar with Agile, Scrum, or any structured planning methodology, apply it here. IDLC doesn't prescribe a specific planning framework — use what works for your team.

## Planning Activities

### 1. Requirements Gathering

Work with application teams and stakeholders to understand infrastructure needs. Ask the right questions:

- What services does the application need? (compute, storage, database, messaging)
- What are the availability and performance requirements?
- Which environments are needed? (dev, stage, production)
- Which regions need to be supported?
- Are there compliance or regulatory constraints?

### 2. Module Discovery

Before writing any code, check what already exists:

- Browse the module registry (Terrareg) for existing modules
- Review solutions that solve similar problems
- Identify gaps — what needs to be created or extended

{: .tip }
This is one of the biggest advantages of IDLC. In a mature organization, most infrastructure needs can be met by composing existing modules into a new solution. Planning should start with "what do we already have?" not "what do we need to build?"

### 3. Architecture Design

Define the target architecture. This is standard SDLC practice:

- Create architecture diagrams (draw.io, Lucidchart, Miro, or similar)
- Document resource dependencies and data flows
- Identify which cloud provider(s) will be used
- Plan for scalability, high availability, and disaster recovery

### 4. Task Breakdown

Break the work into manageable pieces:

- One task per module (create or update)
- One task per solution composition
- One task per deployment configuration
- Include testing and documentation in every task

### 5. Compliance and Security Review

Ensure the plan meets organizational policies:

- Review security requirements with SecOps
- Identify encryption, access control, and network isolation needs
- Plan for policy-as-code validation (OPA, Sentinel)
- Consider tagging strategy for cost allocation and ownership

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

These are not IDLC-specific — they come from years of SDLC experience:

- **Document decisions** — Use Architecture Decision Records (ADRs) to capture the "why" behind choices
- **Plan module boundaries early** — Smaller modules are easier to test, reuse, and maintain
- **Think about consumers** — Who will use this module or solution? What do they need to configure?
- **Consider multi-region from the start** — Retrofitting multi-region support is painful
- **Include operational concerns** — Monitoring, alerting, and runbooks are part of the plan, not an afterthought
- **Estimate with infrastructure in mind** — Infrastructure changes often have longer feedback loops than application code

{: .note }
The Plan phase is intentionally lightweight in IDLC. We trust that your organization already knows how to plan software projects. The key difference is making sure infrastructure is planned with the same discipline — not treated as an afterthought.
