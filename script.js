(() => {
  'use strict';

  const navigation = document.querySelector('#navigation');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileWidth = matchMedia(document.body.classList.contains('personal-homepage')
    ? '(max-width: 1050px)'
    : '(max-width: 700px)');
  const setMenu = (open) => {
    const isExpanded = mobileWidth.matches && open;
    navigation.hidden = mobileWidth.matches && !open;
    menuButton.setAttribute('aria-expanded', String(isExpanded));
    menuButton.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
  };

  setMenu(false);
  document.body.classList.add('js-ready');
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasMobile = mobileWidth.matches;
    setMenu(false);
    if (wasMobile && link.getAttribute('href').startsWith('#')) {
      const destination = document.getElementById(link.getAttribute('href').slice(1));
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
  });
  mobileWidth.addEventListener('change', () => {
    const focusedInsideMenu = navigation.contains(document.activeElement);
    setMenu(false);
    if (mobileWidth.matches && focusedInsideMenu) menuButton.focus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileWidth.matches && !navigation.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (mobileWidth.matches && !event.target.closest('.site-header')) setMenu(false);
  });

  const filters = document.querySelector('.filters');
  const projects = [...document.querySelectorAll('.project')];
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', (event) => {
      const selected = event.target.closest('[data-filter]');
      if (!selected) return;
      filters.querySelectorAll('[data-filter]').forEach((button) => {
        const active = button === selected;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      projects.forEach((project) => {
        project.hidden = selected.dataset.filter !== 'all' && project.dataset.category !== selected.dataset.filter;
      });
      const visibleCount = projects.filter((project) => !project.hidden).length;
      document.querySelector('#project-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
    });
  }

  const figureControls = document.querySelector('.figure-tabs');
  if (figureControls) {
    figureControls.hidden = false;
    document.querySelector('#binarization').hidden = true;
    figureControls.addEventListener('click', (event) => {
      const selected = event.target.closest('[data-figure]');
      if (!selected) return;
      figureControls.querySelectorAll('[data-figure]').forEach((button) => {
        const active = button === selected;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
        document.getElementById(button.dataset.figure).hidden = !active;
      });
    });
  }

  const citationData = document.querySelector('#citation-data');
  const citations = citationData ? JSON.parse(citationData.textContent) : {};
  const citationDialog = document.querySelector('#citation-dialog');
  const copyButton = document.querySelector('#copy-citation');
  const copyStatus = document.querySelector('#copy-status');
  let lastCitationButton;

  if (typeof citationDialog.showModal === 'function') {
    document.querySelectorAll('[data-citation]').forEach((button) => {
      button.hidden = false;
      button.addEventListener('click', () => {
        const citation = citations[button.dataset.citation];
        if (!citation) return;
        document.querySelector('#citation-note').textContent = citation.note;
        document.querySelector('#citation-content').textContent = citation.bibtex;
        copyStatus.textContent = '';
        copyButton.disabled = false;
        lastCitationButton = button;
        citationDialog.showModal();
      });
    });
  }
  document.querySelector('.dialog-close').addEventListener('click', () => citationDialog.close());
  citationDialog.addEventListener('close', () => lastCitationButton?.focus());
  citationDialog.addEventListener('click', (event) => {
    if (event.target === citationDialog) {
      const rect = citationDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) citationDialog.close();
    }
  });
  copyButton.addEventListener('click', async () => {
    const citationContent = document.querySelector('#citation-content');
    try {
      await navigator.clipboard.writeText(citationContent.textContent);
      copyStatus.textContent = 'Citation copied.';
    } catch {
      copyStatus.textContent = 'Select and copy the citation text above.';
      const range = document.createRange();
      range.selectNodeContents(citationContent);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      citationContent.focus();
    }
  });

  document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  let manuallyPaused = false;
  const applyMotion = () => {
    const paused = manuallyPaused || reducedMotion.matches;
    document.body.classList.toggle('motion-paused', paused);
    if (!motionButton) return;
    motionButton.hidden = reducedMotion.matches;
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    if (paused) document.querySelectorAll('[data-reveal]').forEach((element) => element.getAnimations().forEach((animation) => animation.cancel()));
  };
  motionButton?.addEventListener('click', () => { manuallyPaused = !manuallyPaused; applyMotion(); });
  reducedMotion.addEventListener('change', applyMotion);
  applyMotion();

  if ('IntersectionObserver' in window) {
    // Animate visible content once; nothing is hidden while awaiting JavaScript.
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!manuallyPaused && !reducedMotion.matches && typeof entry.target.animate === 'function') {
          entry.target.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
        }
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.project, .personal-section-header, .research-journey').forEach((element) => {
      element.dataset.reveal = '';
      revealObserver.observe(element);
    });
  }

  const progress = document.querySelector('.reading-progress span');
  const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let scrollFrame = 0;
  const updateScroll = () => {
    const distance = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
    let active;
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= 170) active = section.id; });
    sectionLinks.forEach((link) => {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollFrame = 0;
  };
  const scheduleScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll);
  updateScroll();
})();
