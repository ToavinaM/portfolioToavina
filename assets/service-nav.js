const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.service-nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('open', !open);
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      menuButton.focus();
    }
  });
}
