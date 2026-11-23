(() => {
  const category = document.querySelector('#category');
  const examples = [...document.querySelectorAll('[data-example]')];
  const renderExample = () => {
    for (const example of examples) example.hidden = example.dataset.example !== category.value;
  };
  category.addEventListener('change', renderExample);
  renderExample();
  category.closest('.example-picker').hidden = false;

  const captions = ['Exact-match accuracy (%)', 'Mean answer F1 (%)', 'Line count within one line (%)'];
  const metrics = document.querySelector('.metrics');
  const scores = [...document.querySelectorAll('[data-scores]')];
  const renderMetric = () => {
    const index = Number(metrics.querySelector(':checked').value);
    document.querySelector('#metric-caption').textContent = captions[index];
    for (const cell of scores) cell.textContent = cell.dataset.scores.split(' ')[index];
    for (const cells of [scores.filter((_, i) => i % 2 === 0), scores.filter((_, i) => i % 2 === 1)]) {
      const best = Math.max(...cells.map(cell => Number(cell.textContent)));
      for (const cell of cells) cell.classList.toggle('top-score', Number(cell.textContent) === best);
    }
  };
  metrics.addEventListener('change', renderMetric);
  renderMetric();
  metrics.hidden = false;

  const copy = document.querySelector('#copy-bibtex');
  const citation = document.querySelector('#citation');
  const status = document.querySelector('#copy-status');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citation.textContent);
      status.textContent = 'BibTeX copied.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'BibTeX selected for copying.';
    }
  });
  copy.hidden = false;
})();
