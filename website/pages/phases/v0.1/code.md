---
title: Code Phase
layout: page
---

# IDLC Phase 1: Code

The **Code** phase is where you *author* the three code constructs used throughout IDLC: **Modules**, **Blueprints**, and **Deployments**.

---

## Core Concepts

- **Modules** — the smallest reusable unit that defines a cloud resource (e.g., S3 bucket). They are reused by other modules and/or blueprints.
  - *Guidance*: Keep modules minimal but enforce strong, opinionated defaults (security, compliance).

- **Blueprints** — opinionated compositions of modules and/or resources that make up a service (e.g., DB + S3 + CloudWatch). Blueprints **should not be entirely configurable**; they enforce characteristics such as versions and policies.

- **Deployments** — environment-specific definitions that **instantiate blueprints** (e.g., Stage, Production). This directory holds configuration for where/how a blueprint runs. fileciteturn1file0L33-L35 fileciteturn1file3L21-L33

---

## Repository Layout (Authoring)
A typical layout while coding these constructs:

```
itops-idlc/
├─ modules/
│  ├─ s3/
│  │  ├─ main.tf
│  │  ├─ variables.tf
│  ├─ database/
│  │  ├─ main.tf
├─ blueprints/
│  ├─ super-service/
│  │  ├─ storage.tf   # uses S3 + log-group modules
│  │  ├─ database.tf  # uses database module
├─ deployments/
│  ├─ <TEAM>/
│  │  ├─ stage/
│  │  │  ├─ super-service/
│  │  │  │  ├─ main.tf   # instantiates the super-service blueprint
│  │  ├─ production/
│  │  │  ├─ super-service/
│  │  │  │  ├─ main.tf
```

---

## Examples

### 1) Example: S3 Bucket Module (minimal, opinionated defaults)
```hcl
resource "aws_s3_bucket" "this" {
  bucket = var.name
  acl    = "private"

  versioning { enabled = true }

  lifecycle_rule {
    id      = "expire-logs"
    enabled = true
    expiration { days = 90 }
  }
}

variable "name" {
  type        = string
  description = "Bucket name"
}
```

### 2) Example: Blueprint excerpt (compose modules)
```hcl
module "storage" {
  source = "../../modules/s3"
  name   = "${var.service}-data"
}

module "logs" {
  source = "../../modules/cloudwatch-log-group"
  name   = "${var.service}-logs"
}

module "database" {
  source  = "../../modules/database"
  engine  = "postgres"
  version = "15" # enforced by blueprint
}
```

### 3) Example: Deployment (instantiate a blueprint per environment)
```hcl
# /deployments/<TEAM>/stage/super-service/main.tf
module "super_service" {
  # In practice, this would point to Terrareg (private registry) or a pinned source.
  source  = "../../../blueprints/super-service"
  service = "super-service"
  env     = "stage"
}
```

---

## Best Practices Checklist

- **Modules**
  - Small surface area; strong defaults (security, encryption, logging).
  - Inputs are validated; outputs are minimal and purposeful.

- **Blueprints**
  - Encapsulate service composition; **enforce** required versions and policies.
  - Provide only the variables that truly vary across services.

- **Deployments**
  - One folder per **team** and **environment**; keep them **declarative** (no business logic).
  - Pin blueprint/module versions and use consistent naming for workspaces and resources.

> **Principle:** Code is about **reusability + opinionated standards** and clear separation of concerns across *Modules*, *Blueprints*, and *Deployments*.
