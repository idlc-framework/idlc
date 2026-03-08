---
title: Operate
layout: default
parent: Operations
grand_parent: Phases
nav_order: 7
---

# Operate Phase

Day-2 operations cover the ongoing management and maintenance of deployed infrastructure.

## Key Activities

- **Drift Detection** — Regularly check for configuration drift between the desired state (code) and actual state
- **Patching** — Apply security patches and version upgrades through the standard PR workflow
- **Scaling** — Adjust resource capacity based on demand, always through code changes
- **Incident Response** — Use runbooks and automation to respond to infrastructure incidents
- **Cost Optimization** — Review and optimize resource usage periodically

## Operational Practices

### Drift Detection

```bash
# Run plan to detect drift
tofu plan -detailed-exitcode

# Exit code 2 means drift detected
```

### Tagging Strategy

Enforce consistent tagging across all resources:

```yaml
# tags.yaml
company:ops:owner: "platform-team"
company:cost:project: "my-project"
company:cost:center-name: "engineering"
```

Tags are merged at the environment level via `root.hcl` and enforced across all deployments.

### CODEOWNERS

Use GitHub CODEOWNERS to enforce review policies:

```
# Default owners
/solutions/ @my-org/platform-admin
/modules/ @my-org/platform-admin
/deployments/ @my-org/platform-admin

# Team-specific
/deployments/region-1/production/ @my-org/platform-team
/deployments/region-2/production/ @my-org/platform-team
```

{: .tip }
Treat operational changes the same as feature development — always through code, always through PRs.
