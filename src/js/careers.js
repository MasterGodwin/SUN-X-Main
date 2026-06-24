document.addEventListener('DOMContentLoaded', () => {

  // ── EmailJS init ──
  emailjs.init('IkbsYWDvyGm5LgKgu');

  // ── Footer animations ──
  (function () {
    const topItems  = document.querySelectorAll('.fx-top-item');
    const logoItems = document.querySelectorAll('.fx-logo-item');
    const fxObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('fx-in'); fxObs.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    topItems.forEach((el, i)  => { el.style.transitionDelay = (i * 0.08) + 's'; fxObs.observe(el); });
    logoItems.forEach((el, i) => { el.style.transitionDelay = (i * 0.1)  + 's'; fxObs.observe(el); });
  })();

  (function () {
    const cols = document.querySelectorAll('.fx2-col');
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('fx-in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    cols.forEach((el, i) => { el.style.transitionDelay = (i * 0.1) + 's'; obs.observe(el); });
  })();

  // ── Opening card expand on click ──
  document.querySelectorAll('.opening-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.op-apply-btn')) return;
      const isExpanded = this.classList.contains('expanded');
      document.querySelectorAll('.opening-card').forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) this.classList.add('expanded');
    });
  });

  // ── IntersectionObserver helper ──
  const makeObs = (threshold = 0, rootMargin = '0px 0px -60px 0px') =>
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
        else e.target.classList.remove('in-view');
      });
    }, { threshold, rootMargin });

  const obs = makeObs(0, '0px 0px -60px 0px');

  // Strip items
  ['cs1', 'cs2', 'cs3'].forEach((id, i) => {
    const el = document.getElementById(id); if (!el) return;
    el.style.transitionDelay = (i * 0.1) + 's'; obs.observe(el);
  });

  // Vacancy
  ['vacancyLeft', 'vacancyRight'].forEach(id => {
    const el = document.getElementById(id); if (el) obs.observe(el);
  });

  // Openings
  const openingsHeader = document.getElementById('openingsHeader');
  if (openingsHeader) obs.observe(openingsHeader);
  ['oc1', 'oc2'].forEach((id, i) => {
    const el = document.getElementById(id); if (!el) return;
    el.style.transitionDelay = (i * 0.12) + 's'; obs.observe(el);
  });

  // People
  const peopleInner = document.getElementById('peopleInner');
  if (peopleInner) obs.observe(peopleInner);

  // Why
  const whyHeader = document.getElementById('whyHeader');
  if (whyHeader) obs.observe(whyHeader);
  ['wc1', 'wc2', 'wc3', 'wc4'].forEach((id, i) => {
    const el = document.getElementById(id); if (!el) return;
    el.style.transitionDelay = (i * 0.13) + 's'; obs.observe(el);
  });
  const whyCta = document.getElementById('whyCta');
  if (whyCta) obs.observe(whyCta);

  // ── File upload ──
  const cvFile         = document.getElementById('cvFile');
  const uploadBox      = document.getElementById('uploadBox');
  const uploadFilename = document.getElementById('uploadFilename');
  const formMsg        = document.getElementById('formMsg');
  const submitBtn      = document.getElementById('submitApplicationBtn');

  uploadBox.addEventListener('click', () => cvFile.click());

  uploadBox.addEventListener('dragover', e => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
    uploadBox.style.borderColor = '#c0392b';
  });
  uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
    if (!cvFile.files.length) uploadBox.style.borderColor = '#e0e0e0';
  });
  uploadBox.addEventListener('drop', e => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  cvFile.addEventListener('change', () => {
    if (cvFile.files[0]) handleFile(cvFile.files[0]);
  });

  function handleFile(file) {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowed.includes(file.type)) {
      showMsg('Only PDF, DOC, DOCX files are allowed.', 'error'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showMsg('File size must be under 5MB.', 'error'); return;
    }
    uploadFilename.textContent    = '✓ ' + file.name;
    uploadFilename.style.color    = '#1a7a3f';
    uploadFilename.style.display  = 'block';
    uploadBox.style.borderColor   = '#1a7a3f';
    uploadBox.style.background    = 'rgba(26,122,63,0.03)';
    showMsg('', '');
  }

  // ── EmailJS Submit ──
  submitBtn.addEventListener('click', () => {
    const name     = document.getElementById('appName').value.trim();
    const email    = document.getElementById('appEmail').value.trim();
    const phone    = document.getElementById('appPhone').value.trim();
    const position = document.getElementById('appPosition').value;
    const file     = cvFile.files[0];
    const time     = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (!name || !email || !position) {
      showMsg('Please fill in Name, Email and Position.', 'error'); return;
    }
    if (!file) {
      showMsg('Please upload your CV / Resume.', 'error'); return;
    }

    const cvNote = file.name + ' (' + (file.size / 1024).toFixed(0) + ' KB) — Please follow up with the applicant directly to request the CV file.';

    submitBtn.disabled  = true;
    submitBtn.innerHTML = 'Sending… <span style="opacity:.6">please wait</span>';

    emailjs.send('service_8um2p6b', 'template_a3hxv8n', {
      applicant_name:  name,
      applicant_email: email,
      applicant_phone: phone || 'Not provided',
      position:        position,
      cv_note:         cvNote,
      time:            time
    })
    .then(() => {
      submitBtn.innerHTML        = '✓ Application Submitted!';
      submitBtn.style.background = '#1a7a3f';
      showMsg('', '');

      document.getElementById('appName').value     = '';
      document.getElementById('appEmail').value    = '';
      document.getElementById('appPhone').value    = '';
      document.getElementById('appPosition').value = '';
      cvFile.value               = '';
      uploadFilename.textContent = '';
      uploadFilename.style.display = 'none';
      uploadBox.style.borderColor  = '#e0e0e0';
      uploadBox.style.background   = '';

      setTimeout(() => {
        submitBtn.innerHTML        = 'Submit Application <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
        submitBtn.style.background = '';
        submitBtn.disabled         = false;
      }, 4000);
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      submitBtn.innerHTML        = 'Failed — Try Again';
      submitBtn.style.background = '#c0392b';
      submitBtn.disabled         = false;
      showMsg('Something went wrong. Please try again.', 'error');
    });
  });

  function showMsg(text, type) {
    formMsg.style.display = text ? 'block' : 'none';
    formMsg.textContent   = text;
    formMsg.style.color   = type === 'error' ? '#c0392b' : '#1a7a3f';
  }

}); // end DOMContentLoaded