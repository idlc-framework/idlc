---
title: Glossary
layout: default
nav_order: 7
permalink: /glossary/
---

# Glossary

## Module

Modules are smaller components with well-defined scopes that require policy compliance. They are designed to be reusable and adhere to best practices established by the organization. Each module should offer customizable parameters tailored to meet specific team requirements and environmental needs, and provide outputs of all relevant information for each resource.

## Solution

Solutions consist of aggregated modules configured for deployment purposes. They represent and group all the resources that compose a specific solution. By default they should reference modules to inherit all best practices, avoiding code duplication. A solution is the artifact that will be deployed effectively.

## Deployment

Deployments are environment-specific definitions that establish how solutions are utilized. A deployment always references a solution and never directly interacts with a module.

## Terragrunt

An opinionated wrapper around Terraform/OpenTofu that keeps configurations DRY, enforces remote state conventions, and orchestrates multi-environment deployments.

## Terrareg

A private Terraform module registry that centralizes reusable components with access controls, semantic version tags, and searchable metadata.

## Atlantis

A pull-request automation tool for Terraform that plans and applies infrastructure changes from Git, ensuring peer review is part of every change.

## IRSA

IAM Roles for Service Accounts — an AWS EKS feature that allows Kubernetes pods to assume IAM roles for fine-grained access control.

## OpenTofu

An open-source fork of Terraform, maintained by the Linux Foundation. Used as the default Terraform binary in IDLC repositories.

## Conventional Commits

A specification for commit messages that enables automated versioning and changelog generation. Used by release-please to determine version bumps.

## GitOps

A practice where Git is the single source of truth for infrastructure. All changes are made through pull requests and applied automatically.

## Drift

The difference between the desired state (defined in code) and the actual state of deployed infrastructure. Drift detection is a key operational practice.
