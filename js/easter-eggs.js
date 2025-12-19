(function() {
  let logoClicks = 0;
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      logoClicks += 1;
      if (logoClicks >= 5) {
        document.body.classList.toggle('archive-mode');
        logoClicks = 0;
      }
    });
  }

  const sequence = ['r','u','n','w','a','y'];
  let index = 0;
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === sequence[index]) {
      index += 1;
      if (index === sequence.length) {
        document.body.classList.toggle('opulence');
        index = 0;
      }
    } else {
      index = 0;
    }
  });

  const micro = document.querySelector('[data-wink]');
  if (micro) {
    micro.addEventListener('mouseenter', () => micro.textContent = 'canon is couture');
    micro.addEventListener('mouseleave', () => micro.textContent = micro.getAttribute('data-wink'));
  }
})();
