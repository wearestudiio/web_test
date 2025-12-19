(function(){
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('focus', () => link.classList.add('focus-visible'));
    link.addEventListener('blur', () => link.classList.remove('focus-visible'));
  });

  const posters = document.querySelectorAll('.poster');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    document.addEventListener('pointermove', (e) => {
      posters.forEach((poster) => {
        const rect = poster.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        poster.style.transform = `rotateX(${dy * -4}deg) rotateY(${dx * 4}deg) translateZ(0)`;
      });
    });
  }

  const seal = document.querySelector('.verification-seal');
  if (seal) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        seal.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.5 });
    observer.observe(seal);
  }

  const microcopySwap = document.querySelectorAll('[data-swap]');
  microcopySwap.forEach(el => {
    const original = el.textContent;
    const alt = el.getAttribute('data-swap');
    el.addEventListener('mouseenter', () => el.textContent = alt);
    el.addEventListener('mouseleave', () => el.textContent = original);
    el.addEventListener('focus', () => el.textContent = alt);
    el.addEventListener('blur', () => el.textContent = original);
  });

  const reducedToggle = document.querySelector('[data-reduced-toggle]');
  if (reducedToggle) {
    reducedToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('debug-reduced');
      if (document.documentElement.classList.contains('debug-reduced')) {
        document.documentElement.style.setProperty('--dur-fast', '0ms');
        document.documentElement.style.setProperty('--dur-base', '0ms');
        document.documentElement.style.setProperty('--dur-slow', '0ms');
      } else {
        document.documentElement.style.removeProperty('--dur-fast');
        document.documentElement.style.removeProperty('--dur-base');
        document.documentElement.style.removeProperty('--dur-slow');
      }
    });
  }
})();
