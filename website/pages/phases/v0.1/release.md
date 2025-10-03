---
title: Release Phase
layout: page
---

Package and store Infrastructure as Code (IaC) artifacts in repositories using automated pipelines. Tag releases for traceability and enable consistent deployment across environments.

## Overview

The release phase focuses on creating, packaging, and distributing IaC artifacts through automated pipelines. This process ensures consistent versioning, proper artifact storage, and seamless integration with deployment workflows.

## Artifact Types

### Terraform/OpenTofu Packages
- **Registry**: The use of private module registries is highly recommended.
- **Packaging**: Module archives with proper versioning and metadata
- **Validation**: Terraform/OpenTofu validate, plan, and format checking before generating the package
- **Documentation**: Auto-generated module documentation with inputs, outputs, related providers and full descriptions of the module/blueprint usage.

### Pulumi Packages
- **Registry**: Since Pulumi allows creating packages using high-level languages, it is highly recommended to use private repositories supporting the chosen language ecosystem
- **Packaging**: Multi-language support (TypeScript/JavaScript, Python, Go, .NET, Java)
- **Validation**: Pulumi preview and policy checks
- **Documentation**: Auto-generated API documentation for each language binding

## Pipeline

### Key Pipeline Steps
1. **Code Validation**: Syntax checking and linting
2. **Version Calculation**: release-please determines next version based on conventional commits
3. **Packaging**: Create distributable artifacts for target platforms
4. **Tagging**: Apply SemVer tags and release metadata
5. **Publishing**: Upload to private registries with proper authentication
6. **Documentation**: Generate and update release notes via release-please

## Version Management

### release-please Integration
- **Automated Versioning**: Uses conventional commit messages to determine version bumps
- **Changelog Generation**: Automatically creates and maintains CHANGELOG.md
- **Release PR Creation**: Generates pull requests with version updates and release notes
- **Multi-package Support**: Handles versioning for mono-repo setups