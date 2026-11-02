document.documentElement.classList.add('js');
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

/* ---- Motion layer ---- */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = ['.hero .eyebrow', '.hero h1', '.hero-lead', '.event-meta', '.hero .button-primary', '.hero .microcopy', '.hero-art', '.visual-note'];
  const groups = [
    { sel: '.section-rule', step: 0 },
    { sel: '.about > div', step: 140 },
    { sel: '.section-heading', step: 0 },
    { sel: '.topic-card', step: 140 },
    { sel: '.form-intro > *', step: 90 },
    { sel: '.form-card', step: 0 },
    { sel: '.faq-layout > div:first-child', step: 0 },
    { sel: '.faq-item', step: 110 }
  ];
  const mark = (el, delay) => { el.classList.add('reveal'); el.style.setProperty('--d', delay + 'ms'); };
  if (!reduce) {
    hero.forEach((s, i) => { const el = document.querySelector(s); if (el) mark(el, 300 + i * 110); });
    const items = [];
    groups.forEach(g => document.querySelectorAll(g.sel).forEach((el, i) => { mark(el, i * g.step); items.push(el); }));
    const heroEls = hero.map(s => document.querySelector(s)).filter(Boolean);
    requestAnimationFrame(() => requestAnimationFrame(() => heroEls.forEach(el => el.classList.add('is-in'))));
    setTimeout(() => document.querySelector('.hero-visual').classList.add('is-settled'), 2400);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      items.forEach(el => io.observe(el));
    } else items.forEach(el => el.classList.add('is-in'));
  }

  // Smooth FAQ open/close (replaces the instant show/hide, same behaviour otherwise)
  document.querySelectorAll('.faq-item button').forEach(button => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      if (reduce || !panel.animate) return;
      const opening = !panel.hidden;
      if (opening) {
        const h = panel.scrollHeight;
        panel.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.22,.61,.36,1)' });
      }
    });
  });
})();
