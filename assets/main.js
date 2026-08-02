const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('open', !open);
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
}));

if (window.AOS) {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 90,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });
}

const form = document.getElementById('contactForm');
const redirect = document.getElementById('redirectUrl');
redirect.value = new URL('merci.html', window.location.href).href;

const status = document.getElementById('form-status');
const submitButton = form.querySelector('button[type="submit"]');
const originalLabel = submitButton.innerHTML;
let submitting = false;

function setStatus(message, type) {
  status.textContent = message;
  status.className = 'form-status' + (type ? ' ' + type : '');
}

form.addEventListener('submit', (event) => {
  if (submitting) { event.preventDefault(); return; }
  if (!navigator.onLine) {
    event.preventDefault();
    setStatus('Vous semblez hors ligne. Vérifiez votre connexion puis réessayez.', 'error');
    return;
  }
  submitting = true;
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="button-spinner" aria-hidden="true"></span> Envoi en cours…';
  setStatus('Envoi en cours — vérification anti-spam…');
  window.setTimeout(() => {
    if (document.hidden) return;
    submitting = false;
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
    setStatus("L’envoi semble bloqué (vérification anti-spam ?). Contrôlez votre connexion puis réessayez.", 'error');
  }, 25000);
});

const banner = document.getElementById('cookie-banner');
const consentKey = 'portfolio-analytics-consent';
const consent = localStorage.getItem(consentKey);

function setConsent(value) {
  if (typeof gtag === 'function') {
    gtag('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
  }
}

if (consent) setConsent(consent); else banner.classList.add('is-visible');

document.getElementById('cookie-accept').addEventListener('click', () => {
  localStorage.setItem(consentKey, 'granted');
  setConsent('granted');
  banner.classList.remove('is-visible');
});

document.getElementById('cookie-reject').addEventListener('click', () => {
  localStorage.setItem(consentKey, 'denied');
  setConsent('denied');
  banner.classList.remove('is-visible');
});
