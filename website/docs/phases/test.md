---
title: Test
layout: default
parent: Development
grand_parent: Phases
nav_order: 4
---

# Test Phase

Validate infrastructure code before it reaches any environment. Testing in IDLC happens at multiple levels.

## Testing Levels

### 1. Static Analysis

Run before every commit via pre-commit hooks:

```bash
# Format check
tofu fmt -check -recursive

# Linting
tflint --enable-rule=terraform_naming_convention

# Security scanning
tfsec .
```

### 2. Plan Validation

Verify that Terraform/OpenTofu plans produce expected results:

```bash
tofu init
tofu plan -var-file=test.tfvars
```

### 3. Integration Testing

Use tools like Terratest to validate actual infrastructure:

```go
func TestS3BucketModule(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../../modules/s3/bucket",
        Vars: map[string]interface{}{
            "bucket_name": "test-bucket-" + random.UniqueId(),
            "bucket_tags": map[string]string{"env": "test"},
        },
    }
    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    bucketID := terraform.Output(t, terraformOptions, "bucket")
    assert.NotEmpty(t, bucketID)
}
```

### 4. Policy as Code

Enforce organizational policies using OPA or Sentinel:

```rego
# policy/s3_encryption.rego
deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_s3_bucket"
    not resource.change.after.server_side_encryption_configuration
    msg := "S3 buckets must have encryption enabled"
}
```

## CI Pipeline Integration

Tests should run automatically on every pull request via your CI system (GitHub Actions, Atlantis, etc.).

{: .tip }
Start with static analysis and plan validation. Add integration tests as your module library matures.
