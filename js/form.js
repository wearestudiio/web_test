(function(){
  const form = document.querySelector('form[data-form="contact"]');
  const thanks = document.querySelector('[data-form="thanks"]');
  const storageKey = 'studiio_contact_submissions';
  if (!form) return;

  const showThanks = () => {
    form.style.display = 'none';
    if (thanks) thanks.style.display = 'block';
    launchConfetti();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const interest = data.get('interest');
    const note = data.get('note').trim();
    if (!name || !email) {
      alert('Name and email are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please use a valid email.');
      return;
    }
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existing.push({ name, email, interest, note, timestamp: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(existing));
    showThanks();
  });

  function launchConfetti(){
    const container = document.querySelector('.confetti-area');
    if (!container) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (let i = 0; i < (reduced ? 6 : 18); i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.background = i % 2 ? 'var(--color-accent-1)' : 'var(--color-accent-3)';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.animation = `confetti 900ms ease-out forwards`;
      piece.style.animationDelay = `${Math.random() * 200}ms`;
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 1200);
    }
  }
})();
