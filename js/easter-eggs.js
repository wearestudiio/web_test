(function(){
  const logo = document.querySelector('.logo');
  let clicks = 0;
  if (logo) {
    logo.addEventListener('click', () => {
      clicks++;
      if (clicks >= 5) {
        document.body.classList.toggle('archive-mode');
        clicks = 0;
      }
    });
  }

  const sequence = ['R','U','N','W','A','Y'];
  let buffer = [];
  window.addEventListener('keydown', (e) => {
    buffer.push(e.key.toUpperCase());
    buffer = buffer.slice(-sequence.length);
    if (sequence.every((char, i) => buffer[i] === char)) {
      document.body.classList.toggle('opulence-mode');
      const toggle = document.querySelector('.secret-toggle');
      if (toggle) toggle.classList.add('active');
    }
  });

  const toggleButton = document.querySelector('.secret-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.remove('opulence-mode');
      toggleButton.classList.remove('active');
    });
  }
})();
