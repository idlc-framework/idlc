---
title: Framework Overview
layout: default
parent: Getting Started
nav_order: 1
---

# Framework Overview

The IDLC framework brings structure to infrastructure management across distributed teams. This page provides a visual overview of how the pieces fit together.

## How Teams Use IDLC

```mermaid
graph TB
    subgraph Teams["Teams Using IDLC"]
        DevOps["🔧 DevOps"]
        SecOps["🔒 SecOps"]
        MLOps["🤖 MLOps"]
        DataOps["📊 DataOps"]
        Platform["⚙️ Platform"]
    end

    subgraph Framework["IDLC Framework"]
        Modules["📦 Modules<br/>Reusable components"]
        Solutions["🧩 Solutions<br/>Service compositions"]
        Deployments["🚀 Deployments<br/>Environment configs"]
    end

    subgraph Toolchain["Stack Set"]
        Terrareg["Terrareg<br/>Registry"]
        Terragrunt["Terragrunt<br/>Orchestration"]
        Atlantis["Atlantis<br/>GitOps"]
        RP["release-please<br/>Versioning"]
        TFDocs["terraform-docs<br/>Documentation"]
    end

    DevOps --> Modules
    SecOps --> Modules
    MLOps --> Solutions
    DataOps --> Solutions
    Platform --> Modules

    Modules --> Solutions
    Solutions --> Deployments

    Modules --> Terrareg
    Terrareg --> Terragrunt
    Terragrunt --> Atlantis
    RP --> Terrareg
    TFDocs --> Modules
```

## The Three Layers

Each layer has a specific responsibility and interacts with the others through well-defined interfaces.

```mermaid
graph LR
    subgraph Layer1["Layer 1: Modules"]
        M1["S3 Bucket"]
        M2["RDS Database"]
        M3["EKS Cluster"]
        M4["Security Group"]
    end

    subgraph Layer2["Layer 2: Solutions"]
        S1["My App<br/>(S3 + RDS + IAM)"]
        S2["My Database<br/>(RDS + Alarms + SG)"]
    end

    subgraph Layer3["Layer 3: Deployments"]
        D1["region-1/stage"]
        D2["region-1/production"]
        D3["region-2/production"]
    end

    M1 --> S1
    M2 --> S1
    M2 --> S2
    M4 --> S2

    S1 --> D1
    S1 --> D2
    S2 --> D2
    S1 --> D3
```

## The Lifecycle Flow

The 8 phases create a continuous loop from planning to monitoring:

```mermaid
graph LR
    Plan["📋 Plan"] --> Code["💻 Code"]
    Code --> Build["🏗️ Build"]
    Build --> Test["🧪 Test"]
    Test --> Release["📦 Release"]
    Release --> Deploy["🚀 Deploy"]
    Deploy --> Operate["⚙️ Operate"]
    Operate --> Monitor["📊 Monitor"]
    Monitor -.->|Feedback| Plan

    style Plan fill:#0f7b6c,color:#fff
    style Code fill:#0f7b6c,color:#fff
    style Build fill:#0f7b6c,color:#fff
    style Test fill:#0f7b6c,color:#fff
    style Release fill:#0f7b6c,color:#fff
    style Deploy fill:#0f7b6c,color:#fff
    style Operate fill:#1a3568,color:#fff
    style Monitor fill:#1a3568,color:#fff
```

## The GitOps Workflow

Every infrastructure change follows the same path — from code to production:

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as GitHub
    participant AT as Atlantis
    participant Reg as Terrareg
    participant Infra as Infrastructure

    Dev->>Git: Push commit (feat: add S3 module)
    Git->>AT: PR opened
    AT->>AT: Run tofu plan
    AT->>Git: Post plan output
    Git->>Git: Peer review + approve
    AT->>Infra: tofu apply
    Git->>Reg: release-please creates tag
    Reg->>Reg: Module published
```

## Why This Matters

| Without IDLC | With IDLC |
|:-------------|:----------|
| Each team has different patterns | One framework, shared conventions |
| Manual deployments in production | Zero-touch GitOps deployments |
| No module reuse across teams | Shared registry with versioned modules |
| Security policies applied inconsistently | Security baked into module defaults |
| AI tools struggle with inconsistent code | AI-friendly structure and conventions |
| Onboarding takes weeks | New teams inherit proven practices from day one |

## Next Steps

- Deep dive into [Modules]({{ "/docs/concepts/modules.html" | relative_url }}), [Solutions]({{ "/docs/concepts/solutions.html" | relative_url }}), and [Deployments]({{ "/docs/concepts/deployments.html" | relative_url }})
- Explore the [8 Phases]({{ "/docs/phases/" | relative_url }}) in detail
- Review the [Stack Set]({{ "/docs/stackset/" | relative_url }}) toolchain
