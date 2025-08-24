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
  
  // Toggle aria-expanded for Documentation dropdown
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const dropdownToggle = dropdown.querySelector('a[aria-haspopup="true"]');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  
    dropdownToggle.addEventListener('click', function(e) {
      // Toggle visibility only on click for mobile (CSS handles hover for desktop)
      const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', !isExpanded);
    });
  
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
  
  console.log('Site loaded with modern effects');