(() => {
  const category = document.querySelector('#category');
  const examples = [...document.querySelectorAll('[data-example]')];
  const renderExample = () => {
    for (const example of examples) example.hidden = example.dataset.example !== category.value;
  };
  category.addEventListener('change', renderExample);
  renderExample();
  category.closest('.example-picker').hidden = false;

  const captions = ['Exact-match accuracy (%)', 'Mean answer F1 (%)', 'Line count within one line (%)', 'Mean Jaccard (%)'];
  const metrics = document.querySelector('.metrics');
  const scores = [...document.querySelectorAll('.results [data-scores]')];
  const rankedColumns = [...document.querySelectorAll('.results tbody[data-rank]')].flatMap(group => {
    const cells = [...group.querySelectorAll('td[data-scores]')];
    return [1, 2].map(column => cells.filter(cell => cell.cellIndex === column));
  });
  const renderMetric = () => {
    const index = Number(metrics.querySelector(':checked').value);
    document.querySelector('#metric-caption').textContent = captions[index];
    for (const cell of scores) {
      const value = cell.dataset.scores.split(' ')[index];
      if (value && value !== '-') {
        cell.textContent = value;
        cell.removeAttribute('aria-label');
      } else {
        cell.textContent = '\u2014';
        cell.setAttribute('aria-label', 'Not reported');
      }
    }
    for (const cells of rankedColumns) {
      const best = Math.max(...cells.map(cell => Number(cell.textContent)).filter(Number.isFinite));
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
