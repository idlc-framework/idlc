---
title: Monitor
layout: default
parent: Operations
grand_parent: Phases
nav_order: 8
---

# Monitor Phase

Observe infrastructure health, set up alerts, and feed insights back into the lifecycle.

## Monitoring Strategy

### Infrastructure Alarms

Define alarms as code within your modules and solutions:

```hcl
# Example: RDS alarm module
module "db_alarms" {
  source  = "terrareg.example.com/modules/rds-alarms/aws"
  version = "1.3.0"

  db_instance_identifier = module.main.db_instance_name
  alarm_sns_topic_arn    = var.alarm_sns_topic_arn
  business_region        = var.business_region
  environment            = var.environment
}
```

### Dashboards

Use infrastructure-as-code for dashboards too:

```hcl
module "db_dashboard" {
  source  = "terrareg.example.com/modules/rds-instance-dashboard/aws"
  version = "1.0.1"

  db_instance_identifier = module.main.db_instance_name
}
```

## Observability Layers

| Layer | Tools | Purpose |
|:------|:------|:--------|
| Metrics | CloudWatch, Prometheus | Resource utilization, performance |
| Logs | CloudWatch Logs, ELK | Application and infrastructure logs |
| Traces | X-Ray, Jaeger | Request tracing across services |
| Alerts | IncidentIO, SNS | Incident notification and escalation |

## Feedback Loop

Monitoring insights should feed back into the Plan phase:

1. Alert fires → Incident response
2. Root cause analysis → Identify infrastructure gap
3. Plan improvement → Create module/solution update
4. Code → Test → Release → Deploy the fix

{: .note }
The Monitor phase closes the IDLC loop. Every insight should lead to a code change, not a manual fix.
