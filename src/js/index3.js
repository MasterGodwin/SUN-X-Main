// ══════════════════════════════════════
// SLIDER
// ══════════════════════════════════════

let currentSlide = 0, isPaused = false, slideTimer;
const slides = document.querySelectorAll('.slide');
const tabs = document.querySelectorAll('.tab');
const pauseBtn = document.getElementById('pauseBtn');

function animateSlideText(slide) {
  const c = slide.querySelector('.slide-content');
  if (!c) return;
  c.classList.remove('text-animate');
  void c.offsetWidth;
  c.classList.add('text-animate');
}

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
    if (i === index) setTimeout(() => animateSlideText(s), 200);
    else { const c = s.querySelector('.slide-content'); if (c) c.classList.remove('text-animate'); }
  });
  tabs.forEach((t, i) => t.classList.toggle('active', i === index));
  currentSlide = index;
}

function startAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => { if (!isPaused) showSlide((currentSlide + 1) % slides.length); }, 5000);
}

tabs.forEach((tab, i) => tab.addEventListener('click', () => { showSlide(i); startAutoSlide(); }));
pauseBtn.addEventListener('click', () => { isPaused = !isPaused; pauseBtn.textContent = isPaused ? '▶' : '⏸'; });
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { showSlide((currentSlide + 1) % slides.length); startAutoSlide(); }
  if (e.key === 'ArrowLeft') { showSlide((currentSlide - 1 + slides.length) % slides.length); startAutoSlide(); }
});

let touchStartX = 0;
document.getElementById('slidesWrapper').addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
document.getElementById('slidesWrapper').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) { showSlide(diff > 0 ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length); startAutoSlide(); }
}, { passive: true });

showSlide(0);
startAutoSlide();

// ══════════════════════════════════════
// STAT COUNTER
// ══════════════════════════════════════
const countEls = document.querySelectorAll('[data-count]');
let countStarted = false;
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countStarted) {
      countStarted = true;
      countEls.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        let count = 0;
        const inc = target / 60;
        const timer = setInterval(() => {
          count += inc;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = Math.floor(count);
        }, 1400 / 60);
      });
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
statsObserver.observe(document.getElementById('statsSection'));

// ══════════════════════════════════════
// SCROLL ANIMATIONS
// ══════════════════════════════════════
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0.15 });
document.querySelectorAll('.anim-left, .anim-right, .anim-up').forEach(el => aboutObserver.observe(el));

const valuedObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0.08 });
valuedObserver.observe(document.getElementById('valuedSection'));

const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0.12 });
document.querySelectorAll('.va-top, .va-thumb').forEach(el => videoObserver.observe(el));

const advObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('#advCards .adv-card').forEach(el => advObserver.observe(el));

const advLeftObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
const advLeftContent = document.querySelector('.adv-left-content');
if (advLeftContent) advLeftObserver.observe(advLeftContent);

// ══════════════════════════════════════
// PROJECTS SECTION SCROLL ANIMATIONS
// ══════════════════════════════════════
const projObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('#projCards .proj-card').forEach(el => projObserver.observe(el));

const projHeader = document.getElementById('projHeader');
if (projHeader) projObserver.observe(projHeader);

// ══════════════════════════════════════
// NEWS & PLANTS SCROLL ANIMATIONS
// ══════════════════════════════════════
const pageObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

['newsHeader', 'newsFeatured', 'plantsLeft',
  'plantsImgMain', 'plantsText', 'plantsImgSecondary', 'plantsBottomText'
].forEach(id => {
  const el = document.getElementById(id);
  if (el) pageObserver.observe(el);
});
// ══════════════════════════════════════
// SX FEATURES SECTION SCROLL ANIMATIONS
// ══════════════════════════════════════
const sxObserver = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
}, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

const sxHeader = document.querySelector('.sx-header');
if (sxHeader) sxObserver.observe(sxHeader);

document.querySelectorAll('.sx-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.13) + 's';
  sxObserver.observe(el);
});


// ── Experience banner, Features, Contact ──
['expInner', 'featHeader'].forEach(id => {
  const el = document.getElementById(id);
  if (el) pageObserver.observe(el);
});
['feat1', 'feat2', 'feat3'].forEach(id => {
  const el = document.getElementById(id);
  if (el) pageObserver.observe(el);
});