---
title: Build Phase
layout: page
---

The **Build** phase organizes and structures IaC into a repository model.

## Core Concepts
- **Repository Structure**: Organized into `modules/`, `blueprints/`, and `deployments/` directories.  
- **Blueprints enforce consistency** across services by explicitly defining constraints.

## Example Repository Structure
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
│  │  ├─ storage.tf  # Uses S3 module
│  │  ├─ database.tf # Uses database module
├─ deployments/
│  ├─ stage/
│  │  ├─ super-service/
│  │  │  ├─ main.tf
│  ├─ production/
│  │  ├─ super-service/
│  │  │  ├─ main.tf
```

## Best Practices
- Use clear naming for directories and modules.  
- Enforce **non-configurable defaults** in blueprints (security, policies).  

> **Principle**: Build is about **structure and enforcement**.