const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>12),{passive:true});
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));navLinks.classList.toggle('open',!open)});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');navLinks.classList.remove('open')}));
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
document.getElementById('redirectUrl').value=new URL('merci.html',window.location.href).href;
const banner=document.getElementById('cookie-banner');const key='portfolio-analytics-consent';const consent=localStorage.getItem(key);
function setConsent(value){if(typeof gtag==='function')gtag('consent','update',{analytics_storage:value==='granted'?'granted':'denied'})}
if(consent)setConsent(consent);else banner.classList.add('is-visible');
document.getElementById('cookie-accept').addEventListener('click',()=>{localStorage.setItem(key,'granted');setConsent('granted');banner.classList.remove('is-visible')});
document.getElementById('cookie-reject').addEventListener('click',()=>{localStorage.setItem(key,'denied');setConsent('denied');banner.classList.remove('is-visible')});
