(function() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const storageKey = 'studiio-contact-entries';
  const message = form.querySelector('[data-form-message]');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entry = Object.fromEntries(data.entries());
    if (!entry.name || !entry.email) {
      message.textContent = 'Name and email are required.';
      message.classList.add('alert');
      return;
    }
    const emailValid = /.+@.+\..+/.test(entry.email);
    if (!emailValid) {
      message.textContent = 'Please enter a valid email.';
      message.classList.add('alert');
      return;
    }
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    stored.push({ ...entry, createdAt: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(stored));
    form.reset();
    message.classList.remove('alert');
    message.innerHTML = '<strong>Saved.</strong> You are in the queue. Check your inbox for the canon drop (fictional).';
    message.classList.add('form-success');
    confetti(form);
    submitBtn.disabled = true;
    setTimeout(() => submitBtn.disabled = false, 1200);
  });

  function confetti(anchor) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const holder = document.createElement('div');
    holder.style.position = 'relative';
    holder.style.height = '0';
    holder.style.width = '100%';
    holder.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      holder.appendChild(piece);
    }
    anchor.appendChild(holder);
    setTimeout(() => holder.remove(), 1200);
  }
})();
