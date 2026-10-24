(() => {
  'use strict';
  document.querySelectorAll('[data-paper-gallery]').forEach((gallery) => {
    const figures = [...gallery.querySelectorAll('.paper-figure')];
    const buttons = [...gallery.querySelectorAll('[data-figure-choice]')];
    if (figures.length < 2) return;
    const choose = (index) => {
      figures.forEach((figure, i) => { figure.hidden = i !== index; });
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    };
    gallery.querySelector('.paper-figure-controls').hidden = false;
    choose(0);
    buttons.forEach((button, index) => button.addEventListener('click', () => choose(index)));
  });
  const dialog = document.querySelector('.figure-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('.figure-dialog-image');
  let lastTrigger;
  document.querySelectorAll('[data-enlarge-figure]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const source = link.querySelector('img');
      lastTrigger = link;
      image.src = link.href;
      image.alt = source.alt;
      dialog.querySelector('.figure-dialog-caption').textContent = link.closest('figure')?.querySelector('figcaption > span')?.textContent || source.alt;
      dialog.querySelector('.figure-dialog-original').href = link.href;
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-close-figure]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    lastTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
