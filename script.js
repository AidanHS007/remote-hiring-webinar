const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; }
menu.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? 'Close' : 'Menu'; });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
const form = document.querySelector('#demo-form');
document.querySelectorAll('.go-form').forEach(button => button.addEventListener('click', () => { closeMenu(); form.scrollIntoView({behavior:'smooth', block:'center'}); form.querySelector('input').focus({preventScroll:true}); }));
form.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; form.hidden = true; document.querySelector('.success').hidden = false; form.reset(); });
document.querySelector('.try-again').addEventListener('click', () => { document.querySelector('.success').hidden = true; form.hidden = false; form.querySelector('input').focus(); });
document.querySelectorAll('.faq-item button').forEach(button => button.addEventListener('click', () => { const expanded = button.getAttribute('aria-expanded') === 'true'; document.querySelectorAll('.faq-item button').forEach(b => { b.setAttribute('aria-expanded','false'); b.querySelector('.faq-plus').textContent='+'; document.getElementById(b.getAttribute('aria-controls')).hidden=true; }); if(!expanded) { button.setAttribute('aria-expanded','true'); button.querySelector('.faq-plus').textContent='−'; document.getElementById(button.getAttribute('aria-controls')).hidden=false; } }));
