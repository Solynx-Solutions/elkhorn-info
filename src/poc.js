(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...document.querySelectorAll('.poc-reveal, .poc-hero')];
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(node => node.classList.add('is-revealed'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(node => observer.observe(node));
  }

  document.querySelectorAll('.poc-detail-list').forEach(group => {
    group.querySelectorAll('details').forEach(detail => {
      detail.addEventListener('toggle', () => {
        if (!detail.open) return;
        group.querySelectorAll('details[open]').forEach(other => {
          if (other !== detail) other.open = false;
        });
      });
    });
  });

  const dock = document.querySelector('.poc-mobile-dock');
  const footer = document.querySelector('.site-footer');
  if (dock && footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      dock.style.opacity = entry.isIntersecting ? '0' : '1';
      dock.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.08 });
    footerObserver.observe(footer);
  }
})();
