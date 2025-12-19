(function() {
  const navLinks = document.querySelectorAll('nav a');
  const path = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace(/index\.html$/, '').replace(/\/$/, '');
    if (href && path.endsWith(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const swapLabels = document.querySelectorAll('[data-swap]');
  swapLabels.forEach(el => {
    const original = el.textContent;
    const alt = el.getAttribute('data-swap');
    el.addEventListener('mouseenter', () => el.textContent = alt);
    el.addEventListener('mouseleave', () => el.textContent = original);
    el.addEventListener('focus', () => el.textContent = alt);
    el.addEventListener('blur', () => el.textContent = original);
  });

  const posterWall = document.querySelector('.poster-wall');
  if (posterWall && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    posterWall.addEventListener('pointermove', (e) => {
      const rect = posterWall.getBoundingClientRect();
      const ratioX = (e.clientX - rect.left) / rect.width - 0.5;
      const ratioY = (e.clientY - rect.top) / rect.height - 0.5;
      posterWall.querySelectorAll('.poster').forEach((poster, idx) => {
        const depth = (idx % 3 + 1) * 2;
        poster.style.transform = `translate(${ratioX * depth}px, ${ratioY * depth}px) rotate(${(poster.dataset.dir || 1) * 6}deg)`;
      });
    });
    posterWall.addEventListener('mouseleave', () => {
      posterWall.querySelectorAll('.poster').forEach(p => p.style.transform = '');
    });
  }

  const seal = document.querySelector('.signature-seal');
  if (seal) {
    const spin = () => {
      const deg = Math.sin(window.scrollY / 300) * 4;
      seal.style.transform = `rotate(${deg}deg) scale(1.01)`;
      requestAnimationFrame(spin);
    };
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(spin);
    }
  }

  const reducedToggle = document.querySelector('[data-toggle-reduced]');
  if (reducedToggle) {
    reducedToggle.addEventListener('click', () => {
      document.body.classList.toggle('debug-reduced');
      document.body.style.setProperty('--reduce-motion', document.body.classList.contains('debug-reduced') ? 'reduce' : '');
    });
  }
})();
