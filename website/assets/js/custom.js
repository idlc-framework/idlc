document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  if (toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent click from bubbling to main menu
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      // Close other dropdowns
      dropdowns.forEach(otherDropdown => {
        const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
        if (otherToggle && otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
        }
      });
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
  // Allow submenu links to navigate
  const submenuLinks = dropdown.querySelectorAll('.dropdown-menu a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent submenu click from closing main menu
    });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');
if (menuToggle && mainMenu) {
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainMenu.setAttribute('aria-expanded', !isExpanded);
    // Close all dropdowns when main menu is toggled
    if (!isExpanded) {
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  document.addEventListener('click', function(e) {
    if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainMenu.setAttribute('aria-expanded', 'false');
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

const versionSelector = document.getElementById('version-selector');
if (versionSelector) {
  const baseurlElement = document.getElementById('baseurl');
  const baseurl = baseurlElement ? baseurlElement.textContent : '/';

  const savedVersion = localStorage.getItem('selectedVersion') || 'v0.1';
  versionSelector.value = savedVersion;
  updatePhaseLinks(savedVersion);

  versionSelector.addEventListener('change', function() {
    const version = this.value;
    localStorage.setItem('selectedVersion', version);
    updatePhaseLinks(version);

    const currentPath = window.location.pathname;
    const phaseMatch = currentPath.match(/\/pages\/phases\/[^/]+\/(.*\.html)$/);
    if (phaseMatch) {
      const phasePage = phaseMatch[1];
      window.location.href = `${baseurl}pages/phases/${version}/${phasePage}`;
    } else {
      window.location.href = `${baseurl}pages/phases/${version}/index.html`;
    }
  });

  function updatePhaseLinks(version) {
    const phaseLinks = document.querySelectorAll('.phase-list a');
    phaseLinks.forEach(link => {
      const basePath = link.getAttribute('href').replace(/\/pages\/phases\/[^/]+/, `/pages/phases/${version}`);
      link.setAttribute('href', basePath);
    });
  }
}

console.log('Site loaded with modern effects');