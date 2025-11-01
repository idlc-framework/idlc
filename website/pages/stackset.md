---
title: Stack Set
layout: page
---

<section class="stackset-hero">
  <h2>Stack Set Toolchain</h2>
  <p>Our infrastructure platform leans on a curated toolkit that keeps Terraform modules reusable, validated, and ready for consumption across teams. Explore the core services we standardise on and the value they add to the delivery flow.</p>
</section>

<div class="stackset-grid">
  <article class="stackset-card">
    <img src="{{ '/assets/images/stackset/terrareg.svg' | relative_url }}" alt="Terraform icon representing Terrareg" loading="lazy" class="stackset-card-logo">
    <h2>Terrareg</h2>
    <p>A private Terraform module registry that centralises reusable components with access controls, semantic version tags, and searchable metadata.</p>
    <ul>
      <li><strong>Why we use it:</strong> Guarantees module discoverability and promotes golden patterns.</li>
      <li><strong>Highlights:</strong> Scoped API tokens, module signing, download analytics.</li>
    </ul>
    <a class="stackset-link" href="https://github.com/MatthewJohn/terrareg" target="_blank" rel="noopener">Explore Terrareg</a>
  </article>

  <article class="stackset-card">
    <img src="{{ '/assets/images/stackset/terragrunt.svg' | relative_url }}" alt="Gruntwork logo representing Terragrunt" loading="lazy" class="stackset-card-logo">
    <h2>Terragrunt</h2>
    <p>The opinionated wrapper around Terraform that keeps configurations DRY, enforces remote state conventions, and fan-outs deployments safely.</p>
    <ul>
      <li><strong>Why we use it:</strong> Simplifies multi-environment orchestration without copy-pasting code.</li>
      <li><strong>Highlights:</strong> Hierarchical configuration, dependency blocks, built-in state locking.</li>
    </ul>
    <a class="stackset-link" href="https://terragrunt.gruntwork.io" target="_blank" rel="noopener">Terragrunt Documentation</a>
  </article>

  <article class="stackset-card">
    <img src="{{ '/assets/images/stackset/atlantis.png' | relative_url }}" alt="Atlantis logo" loading="lazy" class="stackset-card-logo">
    <h2>Atlantis</h2>
    <p>Pull-request automation for Terraform. Atlantis plans and applies infrastructure changes from Git, ensuring peer review is part of every change.</p>
    <ul>
      <li><strong>Why we use it:</strong> Brings GitOps discipline to infrastructure workflows.</li>
      <li><strong>Highlights:</strong> Custom workflows, policy checks before apply, chat notifications.</li>
    </ul>
    <a class="stackset-link" href="https://www.runatlantis.io/" target="_blank" rel="noopener">Atlantis Docs</a>
  </article>

  <article class="stackset-card">
    <img src="{{ '/assets/images/stackset/release-please.svg' | relative_url }}" alt="Google Cloud icon representing release-please" loading="lazy" class="stackset-card-logo">
    <h2>release-please</h2>
    <p>Release automation driven by Conventional Commits. It proposes pull requests that update changelogs, version tags, and GitHub releases with zero manual toil.</p>
    <ul>
      <li><strong>Why we use it:</strong> Keeps module versioning predictable and auditable.</li>
      <li><strong>Highlights:</strong> Multiple package support, manifest upgrades, automated publishing.</li>
    </ul>
    <a class="stackset-link" href="https://github.com/googleapis/release-please" target="_blank" rel="noopener">release-please Repo</a>
  </article>

  <article class="stackset-card">
    <img src="{{ '/assets/images/stackset/terraform-docs.png' | relative_url }}" alt="terraform-docs logotype" loading="lazy" class="stackset-card-logo">
    <h2>terraform-docs</h2>
    <p>Documentation generation for Terraform modules. It renders inputs, outputs, examples, and requirements into consistent, publishable formats.</p>
    <ul>
      <li><strong>Why we use it:</strong> Ensures module consumers always have up-to-date reference docs.</li>
      <li><strong>Highlights:</strong> Multiple output formats (Markdown, AsciiDoc, JSON) and pluggable templates.</li>
    </ul>
    <a class="stackset-link" href="https://terraform-docs.io" target="_blank" rel="noopener">terraform-docs Site</a>
  </article>
</div>

<section class="stackset-footer">
  <h2>Operational Rhythm</h2>
  <p>Together these services close the infrastructure delivery loop: teams publish hardened modules, orchestrate them across environments, validate every pull request, and ship change logs with confidence. Standardising on this stack means new teams inherit proven practices from day one.</p>
</section>
