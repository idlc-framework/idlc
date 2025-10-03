---
title: Stack Set
layout: page
---

# Stack Set Tools

This page provides an overview of the key infrastructure tools used in our Stack Set workflow. Each tool serves a specific purpose in managing, documenting, and automating our IaC-based infrastructure.

## Terrareg

Terrareg provides a private registry for Terraform modules, enabling teams to share and version control their infrastructure components securely within their organization. It offers a centralized location for storing and managing reusable Terraform modules with proper versioning and access controls.

**Official Documentation:** [Terrareg GitHub Repository](https://github.com/MatthewJohn/terrareg)

## Terragrunt

Terragrunt is a thin wrapper for Terraform that helps keep configurations DRY (Don't Repeat Yourself) by providing tools for working with multiple Terraform modules and managing remote state. It simplifies complex Terraform workflows by reducing code duplication and providing additional functionality for managing infrastructure at scale.

**Official Documentation:** [Terragrunt Website](https://terragrunt.gruntwork.io/)

## Atlantis

Atlantis runs Terraform commands directly from pull requests, providing automated planning and applying of infrastructure changes with proper review workflows and collaboration features. It integrates seamlessly with Git-based workflows to ensure infrastructure changes are reviewed, tested, and applied consistently.

**Official Documentation:** [Atlantis Documentation](https://www.runatlantis.io/)

## release-please

Release-please automates releases by parsing [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), updating changelogs, and creating GitHub releases, making it easy to maintain semantic versioning across projects. It streamlines the release process by automatically determining version bumps and generating release notes based on commit history.

**Official Documentation:** [release-please GitHub Repository](https://github.com/googleapis/release-please)

## terraform-docs

Terraform-docs automatically generates documentation for Terraform modules by parsing configuration files and creating formatted output for inputs, outputs, providers, and requirements. It ensures that module documentation stays up-to-date and provides consistent formatting across all infrastructure components.

**Official Documentation:** [terraform-docs Website](https://terraform-docs.io/)
