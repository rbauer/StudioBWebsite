// Home page: the demo phone that steps through Design -> Build -> Launch.
(() => {
  const box = document.querySelector('.stagebox');
  if (!box) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stages = [...box.querySelectorAll('.st')];
  const buttons = [...box.querySelectorAll('.switch button')];
  const pill = box.querySelector('.switch .pill');
  const bar = box.querySelector('.switch .prog i');
  const confetti = box.querySelector('.confetti');
  const DURATION = 4200;
  const COLOURS = ['#6D4DF6', '#FF6B4A', '#1FC495', '#FFC23D', '#4EA8FF'];

  let current = 0, elapsed = 0, last = performance.now();
  let hovering = false, onScreen = true, stoppedByUser = reduce;

  // Fresh pieces each time, so every burst gets new random timing.
  function burst() {
    confetti.replaceChildren();
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('i');
      p.style.left = (Math.random() * 100) + '%';
      p.style.background = COLOURS[i % COLOURS.length];
      p.style.animationDelay = (2 + Math.random() * 0.6) + 's';
      p.style.animationDuration = (1.4 + Math.random() * 1.2) + 's';
      confetti.appendChild(p);
    }
  }

  function show(i) {
    current = i;
    stages.forEach((s, k) => s.classList.toggle('on', k === i));
    // Replay the entrance animations of the stage just revealed (confetti is rebuilt instead).
    stages[i].querySelectorAll('*').forEach(el => {
      if (el.closest('.confetti')) return;
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    });
    if (stages[i].classList.contains('st-launch')) burst();
    buttons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    pill.style.transform = `translateX(${i * 100}%)`;
    elapsed = 0;
    bar.style.width = '0%';
  }

  function stop() {
    stoppedByUser = true;
    box.classList.add('paused');
  }

  function tick(now) {
    const dt = now - last; last = now;
    if (!stoppedByUser && !hovering && onScreen && !document.hidden) {
      elapsed += dt;
      const p = Math.min(1, elapsed / DURATION);
      bar.style.width = (p * 100) + '%';
      if (p >= 1) show((current + 1) % stages.length);
    }
    requestAnimationFrame(tick);
  }

  buttons.forEach((b, k) => b.addEventListener('click', () => { stop(); show(k); }));
  box.querySelector('.switch').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (current + (e.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
    stop(); show(next); buttons[next].focus();
  });
  box.addEventListener('pointerenter', () => { hovering = true; });
  box.addEventListener('pointerleave', () => { hovering = false; });
  box.addEventListener('focusin', () => { hovering = true; });
  box.addEventListener('focusout', () => { hovering = false; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(box);
  }

  if (reduce) box.classList.add('paused');
  show(0);
  requestAnimationFrame(tick);
})();
