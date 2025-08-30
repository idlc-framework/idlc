// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Toggle aria-expanded for dropdowns
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('a[aria-haspopup="true"]');
  if (toggle) {
    toggle.addEventListener('click', function(e) {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('a[aria-haspopup="true"]');
    if (toggle && !dropdown.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// Version selector for phase pages
const versionSelector = document.getElementById('version-selector');
if (versionSelector) {
  // Get baseurl from hidden span
  const baseurlElement = document.getElementById('baseurl');
  const baseurl = baseurlElement ? baseurlElement.textContent : '/';

  // Initialize version from localStorage or default to 'v0.1'
  const savedVersion = localStorage.getItem('selectedVersion') || 'v0.1';
  versionSelector.value = savedVersion;
  updatePhaseLinks(savedVersion);

  // Update links and refresh page on version change
  versionSelector.addEventListener('change', function() {
    const version = this.value;
    localStorage.setItem('selectedVersion', version);
    updatePhaseLinks(version);

    // Redirect to the corresponding versioned page
    const currentPath = window.location.pathname;
    const phaseMatch = currentPath.match(/\/pages\/phases\/[^/]+\/(.*\.html)$/);
    if (phaseMatch) {
      // If on a phase page, redirect to the same phase with the new version
      const phasePage = phaseMatch[1];
      window.location.href = `${baseurl}pages/phases/${version}/${phasePage}`;
    } else {
      // Otherwise, redirect to the Phases index for the selected version
      window.location.href = `${baseurl}pages/phases/${version}/index.html`;
    }
  });

  // Update phase links function
  function updatePhaseLinks(version) {
    const phaseLinks = document.querySelectorAll('.phase-link');
    phaseLinks.forEach(link => {
      const basePath = link.getAttribute('href').replace(/\/pages\/phases\/[^/]+/, `/pages/phases/${version}`);
      link.setAttribute('href', basePath);
    });
  }
}

console.log('Site loaded with modern effects');