---
title: Deploy Phase
layout: page
---

The **Deploy** phase applies blueprints into environments.

## Core Concepts
- Deployments are environment-specific (Stage, PRO, etc.).  
- Configurations are applied with **strict enforcement** of policies.  

## Example Deployment
```
deployments/
├─ stage/
│  ├─ super-service/
│  │  ├─ main.tf
│  │  ├─ providers.tf
├─ aproduction/
│  ├─ super-service/
│  │  ├─ main.tf
│  │  ├─ providers.tf
```

## Example Commands
```bash
tofu init
tofu plan -var-file=stage.tfvars
tofu apply -var-file=stage.tfvars
```

> **Principle**: Deployment turns **code into real infrastructure**, consistently across environments.