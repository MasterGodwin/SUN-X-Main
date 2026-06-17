    (function () {
      const topItems = document.querySelectorAll('.fx-top-item');
      const logoItems = document.querySelectorAll('.fx-logo-item');

      const fxObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('fx-in');
            fxObs.unobserve(e.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });

      topItems.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.08) + 's';
        fxObs.observe(el);
      });

      logoItems.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.1) + 's';
        fxObs.observe(el);
      });
    })();
  

    (function () {
      const cols = document.querySelectorAll('.fx2-col');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('fx-in');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
      cols.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.1) + 's';
        obs.observe(el);
      });
    })();
  

    // ── Opening card expand on click ──
    document.querySelectorAll('.opening-card').forEach(card => {
      card.addEventListener('click', function (e) {
        // Don't collapse if clicking the apply button
        if (e.target.closest('.op-apply-btn')) return;
        const isExpanded = this.classList.contains('expanded');
        // Close all
        document.querySelectorAll('.opening-card').forEach(c => c.classList.remove('expanded'));
        // Toggle clicked
        if (!isExpanded) this.classList.add('expanded');
      });
    });

    // ── IntersectionObserver helper ──
    const makeObs = (threshold = 0, rootMargin = '0px 0px -60px 0px') =>
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            // don't unobserve — allows out-view / re-enter like the index page
          } else {
            e.target.classList.remove('in-view');
          }
        });
      }, { threshold, rootMargin });

    const obs = makeObs(0, '0px 0px -60px 0px');
    const obsLight = makeObs(0.08);

    // Career hero (trigger on load)
    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('careerHeroInner').classList.add('in-view'), 200);
    });

    // Strip items
    ['cs1', 'cs2', 'cs3'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.transitionDelay = (i * 0.1) + 's';
      obs.observe(el);
    });

    // Vacancy
    ['vacancyLeft', 'vacancyRight'].forEach(id => {
      const el = document.getElementById(id); if (el) obs.observe(el);
    });

    // Openings
    const openingsHeader = document.getElementById('openingsHeader');
    if (openingsHeader) obs.observe(openingsHeader);
    ['oc1', 'oc2'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.transitionDelay = (i * 0.12) + 's';
      obs.observe(el);
    });

    // People
    const peopleInner = document.getElementById('peopleInner');
    if (peopleInner) obs.observe(peopleInner);

    // Why
    const whyHeader = document.getElementById('whyHeader');
    if (whyHeader) obs.observe(whyHeader);
    ['wc1', 'wc2', 'wc3', 'wc4'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.transitionDelay = (i * 0.13) + 's';
      obs.observe(el);
    });
    const whyCta = document.getElementById('whyCta');
    if (whyCta) obs.observe(whyCta);

    // ── File upload feedback ──
    const cvFile = document.getElementById('cvFile');
    const uploadBox = document.getElementById('uploadBox');
    const uploadFname = document.getElementById('uploadFilename');

    cvFile.addEventListener('change', () => {
      if (cvFile.files.length) {
        uploadFname.textContent = '✓ ' + cvFile.files[0].name;
        uploadFname.style.display = 'block';
        uploadBox.style.borderColor = '#c0392b';
        uploadBox.style.background = 'rgba(192,57,43,0.03)';
      }
    });

    // drag-over highlight
    uploadBox.addEventListener('dragover', e => { e.preventDefault(); uploadBox.style.borderColor = '#c0392b'; });
    uploadBox.addEventListener('dragleave', () => { if (!cvFile.files.length) uploadBox.style.borderColor = '#e0e0e0'; });
    uploadBox.addEventListener('drop', e => { e.preventDefault(); });

    // ── mailto submit ──
    document.getElementById('submitApplicationBtn').addEventListener('click', function () {
      const name = document.getElementById('appName').value.trim();
      const email = document.getElementById('appEmail').value.trim();
      const phone = document.getElementById('appPhone').value.trim();
      const position = document.getElementById('appPosition').value;
      const fileName = cvFile.files.length ? cvFile.files[0].name : 'Not attached';
      const msg = document.getElementById('formMsg');

      if (!name || !email || !phone || !position) {
        msg.textContent = '⚠ Please fill in all fields before submitting.';
        msg.style.color = '#c0392b';
        msg.style.display = 'block';
        return;
      }

      const to = 'careers@sunxconcrete.org';
      const subject = encodeURIComponent('Job Application – ' + position + ' – ' + name);
      const body = encodeURIComponent(
        'Dear SUN-X HR Team,\n\n' +
        'Please find my application details below:\n\n' +
        'Full Name    : ' + name + '\n' +
        'Email        : ' + email + '\n' +
        'Phone        : ' + phone + '\n' +
        'Position     : ' + position + '\n' +
        'CV File      : ' + fileName + '\n\n' +
        (fileName !== 'Not attached'
          ? 'Note: My CV (' + fileName + ') is attached to this email.\n\n'
          : 'Note: I will attach my CV separately.\n\n') +
        'Thank you for considering my application.\n\n' +
        'Regards,\n' + name
      );

      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;

      msg.textContent = '✓ Your email client will open now. Please attach your CV and send!';
      msg.style.color = '#1a7a3a';
      msg.style.display = 'block';
    });
