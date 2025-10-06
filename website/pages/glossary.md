---
title: Glossary
layout: page
---

Find here some of the terms or acronyms that you may find while navigating the IDLC Framework.

## Module
Modules are smaller components with well-defined scopes that require policy compliance. They are designed to be reusable and adhere to best practices established by the company. Each module should offer customizable parameters tailored to meet specific team requirements and environmental needs, and provide outputs of all relevant informations of each resource.

## Blueprint
Blueprints consist of aggregated modules configured for deployment purposes. They represents and group all the resources that compose a specific solution. As default they should refer `Modules` to inherit all best practices avoiding code duplication. A Blueprint is the artifact that will be deployed effectively.

## Deployment
Deployments are environment specific definitions that establish how `Blueprints` are utilized. A Deployment always references a Blueprint and never directly interacts with a Module.
