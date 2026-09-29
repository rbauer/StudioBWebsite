// Shared behaviour for every page: scroll reveals, footer year, legal-page section tracking.
(() => {
  const revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in'));
  }

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Legal pages: contents list is always open beside the text on desktop, collapsed on phones.
  const tocDetails = document.querySelector('.toc details');
  if (tocDetails) {
    const wide = matchMedia('(min-width: 961px)');
    const sync = () => { tocDetails.open = wide.matches; };
    wide.addEventListener('change', sync);
    sync();
  }

  // Legal pages: highlight whichever section is being read in the table of contents.
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const byId = new Map([...tocLinks].map(a => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      tocLinks.forEach(a => a.classList.remove('active'));
      const link = byId.get(e.target.id);
      if (link) link.classList.add('active');
    }), { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('.prose section[id]').forEach(s => spy.observe(s));
  }
})();
