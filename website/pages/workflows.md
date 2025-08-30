---
title: Workflows
layout: page
---

# IDLC Workflow Flowchart

This module shows the linear flow of IDLC phases with example tools. Nodes are clickable to phase pages; arrows animate for flow.

<div class="flowchart-container">
<svg width="100%" height="250" viewBox="0 0 1400 250" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="var(--primary-color)" />
    </marker>
  </defs>

  <!-- Plan Node -->
  <a xlink:href="{{ '/pages/phases/plan.html' | relative_url }}">
    <rect x="50" y="50" width="120" height="50" class="node" />
    <text x="110" y="75">Plan</text>
  </a>

  <!-- Arrow 1 -->
  <line x1="170" y1="75" x2="220" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Code Node -->
  <a xlink:href="{{ '/pages/phases/code.html' | relative_url }}">
    <rect x="230" y="50" width="120" height="50" class="node" />
    <text x="290" y="75">Code</text>
    <image x="235" y="55" width="20" height="20" xlink:href="https://www.hashicorp.com/assets/images/og-image/product-terraform-4927668b.png" />
    <text x="290" y="95" font-size="12">Terraform</text>
  </a>

  <!-- Arrow 2 -->
  <line x1="350" y1="75" x2="400" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Build Node -->
  <a xlink:href="{{ '/pages/phases/build.html' | relative_url }}">
    <rect x="410" y="50" width="120" height="50" class="node" />
    <text x="470" y="75">Build</text>
  </a>

  <!-- Arrow 3 -->
  <line x1="530" y1="75" x2="580" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Test Node -->
  <a xlink:href="{{ '/pages/phases/test.html' | relative_url }}">
    <rect x="590" y="50" width="120" height="50" class="node" />
    <text x="650" y="75">Test</text>
  </a>

  <!-- Arrow 4 -->
  <line x1="710" y1="75" x2="760" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Release Node -->
  <a xlink:href="{{ '/pages/phases/release.html' | relative_url }}">
    <rect x="770" y="50" width="120" height="50" class="node" />
    <text x="830" y="75">Release</text>
  </a>

  <!-- Arrow 5 -->
  <line x1="890" y1="75" x2="940" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Deploy Node -->
  <a xlink:href="{{ '/pages/phases/deploy.html' | relative_url }}">
    <rect x="950" y="10" width="120" height="50" class="node" />
    <text x="1010" y="75">Deploy</text>
    <image x="955" y="55" width="20" height="20" xlink:href="https://www.ansible.com/hubfs/2016_Images/Ansible-Mark-RGB-Red.png" />
    <text x="1010" y="95" font-size="12">Ansible</text>
  </a>

  <!-- Arrow 6 -->
  <line x1="1070" y1="75" x2="1120" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Operate Node -->
  <a xlink:href="{{ '/pages/phases/operate.html' | relative_url }}">
    <rect x="1130" y="50" width="120" height="50" class="node" />
    <text x="1190" y="75">Operate</text>
  </a>

  <!-- Arrow 7 -->
  <line x1="1250" y1="75" x2="1300" y2="75" class="arrow" marker-end="url(#arrowhead)" />

  <!-- Monitor Node -->
  <a xlink:href="{{ '/pages/phases/monitor.html' | relative_url }}">
    <rect x="1310" y="50" width="120" height="50" class="node" />
    <text x="1370" y="75">Monitor</text>
    <image x="1315" y="55" width="20" height="20" xlink:href="https://www.pulumi.com/images/logo/color/logo-on-white@2x.png" />
    <text x="1370" y="95" font-size="12">Pulumi</text>
  </a>
</svg>
</div>