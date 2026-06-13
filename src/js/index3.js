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
// ══════════════════════════════════════
const heroVideo = document.getElementById('heroVideo');
const videoThumb = document.getElementById('videoThumb');
const vtfCenterPlay = document.getElementById('vtfCenterPlay');
const vtfPlayBtn = document.getElementById('vtfPlayBtn');
const vtfPlayIcon = document.getElementById('vtfPlayIcon');
const vtfMuteBtn = document.getElementById('vtfMuteBtn');
const vtfVolIcon = document.getElementById('vtfVolIcon');
const vtfVolSlider = document.getElementById('vtfVolSlider');
const vtfProgressTrack = document.getElementById('vtfProgressTrack');
const vtfProgressFill = document.getElementById('vtfProgressFill');
const vtfProgressBuf = document.getElementById('vtfProgressBuf');
const vtfTimeCurrent = document.getElementById('vtfTimeCurrent');
const vtfTimeTotal = document.getElementById('vtfTimeTotal');
const vtfFullscreenBtn = document.getElementById('vtfFullscreenBtn');
const vtfFsIcon = document.getElementById('vtfFsIcon');
const vtfMenuBtn = document.getElementById('vtfMenuBtn');
const vtfMenuDropdown = document.getElementById('vtfMenuDropdown');
const menuAutoplay = document.getElementById('menuAutoplay');
const menuLoop = document.getElementById('menuLoop');
const menuPip = document.getElementById('menuPip');
const menuDownload = document.getElementById('menuDownload');
const autoplayLabel = document.getElementById('autoplayLabel');
const loopLabel = document.getElementById('loopLabel');

const ICON_PAUSE = `<rect x="5"  y="3" width="4" height="18" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/>`;
const ICON_PLAY = `<polygon points="5,3 19,12 5,21"/>`;
const ICON_VOL_MUTED = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
const ICON_VOL_LOW = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
const ICON_VOL_HIGH = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`;
const ICON_FS_ENTER = `<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>`;
const ICON_FS_EXIT = `<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>`;

function fmtTime(s) {
  if (isNaN(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

function syncPlayState() {
  const playing = !heroVideo.paused && !heroVideo.ended;
  videoThumb.classList.toggle('playing', playing);
  videoThumb.classList.toggle('paused', !playing);
  vtfCenterPlay.classList.toggle('visible', !playing);
  vtfPlayIcon.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
}

function syncVolIcon() {
  if (heroVideo.muted || heroVideo.volume === 0) {
    vtfVolIcon.innerHTML = ICON_VOL_MUTED;
  } else if (heroVideo.volume < 0.5) {
    vtfVolIcon.innerHTML = ICON_VOL_LOW;
  } else {
    vtfVolIcon.innerHTML = ICON_VOL_HIGH;
  }
  vtfVolSlider.value = heroVideo.muted ? 0 : heroVideo.volume;
}

heroVideo.addEventListener('play', syncPlayState);
heroVideo.addEventListener('pause', syncPlayState);
heroVideo.addEventListener('ended', syncPlayState);

heroVideo.addEventListener('timeupdate', () => {
  if (!heroVideo.duration) return;
  const pct = (heroVideo.currentTime / heroVideo.duration) * 100;
  vtfProgressFill.style.width = pct + '%';
  vtfTimeCurrent.textContent = fmtTime(heroVideo.currentTime);
});

heroVideo.addEventListener('loadedmetadata', () => {
  vtfTimeTotal.textContent = fmtTime(heroVideo.duration);
  syncVolIcon();
});

heroVideo.addEventListener('progress', () => {
  if (!heroVideo.duration || !heroVideo.buffered.length) return;
  const bufPct = (heroVideo.buffered.end(heroVideo.buffered.length - 1) / heroVideo.duration) * 100;
  vtfProgressBuf.style.width = bufPct + '%';
});

heroVideo.addEventListener('loadeddata', syncPlayState);
heroVideo.addEventListener('volumechange', syncVolIcon);

function togglePlay(e) {
  if (e) e.stopPropagation();
  if (heroVideo.paused || heroVideo.ended) {
    heroVideo.play().catch(() => { });
  } else {
    heroVideo.pause();
  }
}

vtfPlayBtn.addEventListener('click', togglePlay);
vtfCenterPlay.addEventListener('click', togglePlay);
videoThumb.addEventListener('click', e => {
  if (e.target.closest('.vtf-controls')) return;
  togglePlay(e);
});

vtfMuteBtn.addEventListener('click', e => {
  e.stopPropagation();
  heroVideo.muted = !heroVideo.muted;
  if (!heroVideo.muted && heroVideo.volume === 0) heroVideo.volume = 0.5;
  syncVolIcon();
});

vtfVolSlider.addEventListener('input', e => {
  e.stopPropagation();
  heroVideo.volume = parseFloat(vtfVolSlider.value);
  heroVideo.muted = heroVideo.volume === 0;
  syncVolIcon();
});
vtfVolSlider.addEventListener('click', e => e.stopPropagation());

function seekTo(clientX) {
  const rect = vtfProgressTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  if (heroVideo.duration) {
    heroVideo.currentTime = pct * heroVideo.duration;
    vtfTimeCurrent.textContent = fmtTime(heroVideo.currentTime);
  }
  vtfProgressFill.style.width = (pct * 100) + '%';
}

vtfProgressTrack.addEventListener('click', e => { e.stopPropagation(); seekTo(e.clientX); });
let isDragging = false;
vtfProgressTrack.addEventListener('mousedown', e => { e.stopPropagation(); isDragging = true; seekTo(e.clientX); });
document.addEventListener('mousemove', e => { if (isDragging) seekTo(e.clientX); });
document.addEventListener('mouseup', () => { isDragging = false; });

let isTouchScrubbing = false;
vtfProgressTrack.addEventListener('touchstart', e => { e.stopPropagation(); isTouchScrubbing = true; seekTo(e.touches[0].clientX); }, { passive: true });
vtfProgressTrack.addEventListener('touchmove', e => { if (!isTouchScrubbing) return; e.stopPropagation(); e.preventDefault(); seekTo(e.touches[0].clientX); }, { passive: false });
vtfProgressTrack.addEventListener('touchend', e => { e.stopPropagation(); isTouchScrubbing = false; }, { passive: true });

vtfFullscreenBtn.addEventListener('click', e => {
  e.stopPropagation();
  const el = videoThumb;
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }
});

document.addEventListener('fullscreenchange', () => {
  vtfFsIcon.innerHTML = document.fullscreenElement ? ICON_FS_EXIT : ICON_FS_ENTER;
});
document.addEventListener('webkitfullscreenchange', () => {
  vtfFsIcon.innerHTML = document.webkitFullscreenElement ? ICON_FS_EXIT : ICON_FS_ENTER;
});

vtfMenuBtn.addEventListener('click', e => {
  e.stopPropagation();
  vtfMenuDropdown.classList.toggle('open');
});
document.addEventListener('click', () => vtfMenuDropdown.classList.remove('open'));
vtfMenuDropdown.addEventListener('click', e => e.stopPropagation());

let autoplayEnabled = true;
menuAutoplay.addEventListener('click', () => {
  autoplayEnabled = !autoplayEnabled;
  autoplayLabel.textContent = autoplayEnabled ? 'On' : 'Off';
});

menuLoop.addEventListener('click', () => {
  heroVideo.loop = !heroVideo.loop;
  loopLabel.textContent = heroVideo.loop ? 'On' : 'Off';
});

menuPip.addEventListener('click', () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch(() => { });
  } else if (heroVideo.requestPictureInPicture) {
    heroVideo.requestPictureInPicture().catch(() => { });
  }
  vtfMenuDropdown.classList.remove('open');
});

menuDownload.addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = heroVideo.src;
  a.download = 'sunx-ad.mp4';
  a.click();
  vtfMenuDropdown.classList.remove('open');
});

const vidInViewObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && autoplayEnabled) {
      heroVideo.play().catch(() => { });
    } else {
      heroVideo.pause();
    }
  });
}, { threshold: 0.3 });
vidInViewObserver.observe(videoThumb);

heroVideo.addEventListener('error', () => {
  heroVideo.style.display = 'none';
  const fallback = document.createElement('img');
  fallback.src = './src/assets/images/Poonamallee%20Plant.jpg';
  fallback.alt = 'SUN-X Plant';
  fallback.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  videoThumb.prepend(fallback);
  syncPlayState();
});

syncPlayState();
syncVolIcon();