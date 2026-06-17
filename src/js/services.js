// ══════════════════════════════════════
// SUN-X — Services Page Interactions
// (navbar + drawer handled by comman.js;
//  this file only handles scroll reveals
//  for the services-page sections)
// ══════════════════════════════════════

// Generic reveal-on-scroll for anim-left / anim-right / anim-up
const srvAnimEls = document.querySelectorAll('.anim-left, .anim-right, .anim-up');
const srvAnimObs = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
srvAnimEls.forEach(el => srvAnimObs.observe(el));

// Core service cards — staggered reveal
const srvCards = document.querySelectorAll('.srv-card');
const srvCardObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      srvCardObs.unobserve(e.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

srvCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(32px)';
  card.style.filter = 'blur(4px)';
  card.style.transition = `opacity 0.7s cubic-bezier(.22,1,.36,1) ${i * 0.12}s,
                            transform 0.7s cubic-bezier(.22,1,.36,1) ${i * 0.12}s,
                            filter 0.7s ease ${i * 0.12}s`;
  srvCardObs.observe(card);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.srv-card.in-view').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
    card.style.filter = 'none';
  });
});

// Patch: toggle actual visual state via class instead of relying purely on inline styles
const srvCardStyleObs = new MutationObserver(mutations => {
  mutations.forEach(m => {
    const el = m.target;
    if (el.classList.contains('in-view')) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    }
  });
});
srvCards.forEach(card => srvCardStyleObs.observe(card, { attributes: true, attributeFilter: ['class'] }));

// Certification cards — staggered reveal (anim-up already handles fade,
// this just adds the stagger delay programmatically as a fallback)
document.querySelectorAll('.srv-cert-card.anim-up').forEach((el, i) => {
  if (!el.style.transitionDelay) el.style.transitionDelay = (i * 0.1) + 's';
});

// Process steps — staggered reveal
document.querySelectorAll('.srv-proc-step').forEach((el, i) => {
  el.classList.add('anim-up');
  el.style.transitionDelay = (i * 0.14) + 's';
  srvAnimObs.observe(el);
});