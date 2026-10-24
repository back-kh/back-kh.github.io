import { access, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname, relative } from 'node:path';
import { papers, projects, allPaperOrder } from './content.mjs';
import { paperDetails } from './paper-details.mjs';
import { publicationImages } from './publication-images.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));
const production = process.argv.includes('--production');
function preparePage(html, pagePath) {
  if (!production) return html;
  const canonical = new URL(pagePath === 'index.html' ? '/' : pagePath, 'https://back-kh.github.io/').href;
  return html
    .replace(/<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']\s*\/?>(?:\s*)/gi, '')
    .replace('Personal Academic Website · Preview</title>', 'Personal Academic Website</title>')
    .replace(/<span class="preview-note">[^<]*<\/span>/g, '<span class="site-focus">Document AI &amp; digital preservation</span>')
    .replace(/^[\t ]+$/gm, '')
    .replace('</head>', `<link rel="canonical" href="${canonical}"></head>`);
}
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const anchor = ([label, href]) => `<a href="${escape(href)}">${escape(label)} <span aria-hidden="true">↗</span></a>`;
const authors = (paper) => paper.authors.map((name) => name === 'Nimol Thuon' ? `<strong>${escape(name)}</strong>` : escape(name)).join(', ');
const paperRoutes = { ksi: 'KSI/index.html', heritage: 'KSI/index.html', kseweb: 'project/KSE/index.html', khmervqa: 'project/MD/index.html', palmvqa: 'project/PLA-1/index.html' };
for (const key of allPaperOrder) {
  const image = publicationImages[key];
  if (!image?.file || !image.alt || !image.source) throw new Error(`Missing verified publication image: ${key}`);
  await access(join(root, 'assets/papers', image.file));
}
function publicationThumbnail(key) {
  const figure = publicationImages[key];
  const src = `assets/papers/${figure.file}`;
  const href = paperRoutes[key] ? `${paperRoutes[key]}#paper-${key}` : papers[key].url;
  return `<a class="publication-thumbnail" href="${escape(href)}" aria-label="Explore ${escape(papers[key].title)}" title="${escape(figure.label)} · ${escape(figure.sourceLabel)}" data-image-source="${escape(figure.source)}"><img src="${escape(src)}" alt="${escape(figure.alt)}" width="108" height="78" loading="lazy" decoding="async"></a>`;
}
const citationData = JSON.stringify(Object.fromEntries(Object.entries(papers)
  .filter(([, paper]) => paper.bibtex)
  .map(([key, paper]) => [key, { note: paper.citationNote, bibtex: paper.bibtex }])))
  .replace(/</g, '\\u003c');

function publication(key, index) {
  const paper = papers[key];
  return `<article class="publication" id="paper-${key}">
    <div class="publication-year">${escape(paper.year)}${paper.yearNote ? `<span>${escape(paper.yearNote)}</span>` : ''}</div>
    ${publicationThumbnail(key)}
    <div class="publication-body"><p class="publication-venue">${escape(paper.venue)}</p>
      <h3><a href="${escape(paper.url)}">${escape(paper.title)}</a></h3><p>${authors(paper)}</p>
      <div class="paper-links">${paperRoutes[key] ? anchor(['Research story', `${paperRoutes[key]}#paper-${key}`]) : ''}${paper.links.map(anchor).join('')}${paper.bibtex ? `<button class="cite-button" type="button" data-citation="${escape(key)}" hidden>Cite</button>` : ''}</div>
    </div><span class="paper-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
  </article>`;
}
const dialogs = `<dialog id="citation-dialog" aria-labelledby="citation-title"><div class="dialog-heading"><h2 id="citation-title">Cite this work</h2><button class="dialog-close" aria-label="Close citation" type="button">×</button></div><p id="citation-note"></p><pre id="citation-content" tabindex="0"></pre><div class="dialog-actions"><button class="button button-dark" id="copy-citation" type="button">Copy BibTeX</button><span id="copy-status" role="status" aria-live="polite"></span></div></dialog><script type="application/json" id="citation-data">${citationData}</script>`;

const cards = projects.map((project) => `<article class="project" id="project-${escape(project.id)}" data-category="${escape(project.category)}"><div class="project-card-heading"><a class="project-image ${escape(project.imageClass)}" href="${escape(project.url)}" aria-label="${escape(project.title)}"><img src="${escape(project.image)}" alt="${escape(project.alt)}" loading="lazy" width="80" height="80" decoding="async"></a><div class="project-heading-copy"><div class="project-meta"><span>${escape(project.categoryLabel)}</span><span>${escape(project.tag)}</span></div><h3><a href="${escape(project.url)}">${escape(project.title)}</a></h3></div></div><p>${escape(project.description)}</p><div class="project-links">${project.links.map(anchor).join('')}</div></article>`).join('\n');
const template = (await readFile(join(root, 'home.template.html'), 'utf8'))
  .replace(/<!-- TEMPLATE_PREVIEW_REDIRECT -->[\s\S]*?<!-- \/TEMPLATE_PREVIEW_REDIRECT -->\s*/, '');
for (const marker of ['<!-- PROJECTS -->', '<!-- PUBLICATIONS -->', '<!-- CITATIONS -->']) {
  if (!template.includes(marker)) throw new Error(`Missing template marker: ${marker}`);
}
await writeFile(join(root, 'index.html'), preparePage(template
  .replace('<!-- PROJECTS -->', cards)
  .replace('<!-- PUBLICATIONS -->', allPaperOrder.map(publication).join('\n'))
  .replace('<!-- CITATIONS -->', dialogs), 'index.html'));

const retainedPages = [
  { path: 'KSI/index.html', keys: ['ksi', 'heritage'], before: /<section id="overview"/, description: 'Complementary studies examine Khmer stone inscription analysis and the visual condition of Khmer stone heritage objects.' },
  { path: 'project/KSE/index.html', keys: ['kseweb'], before: /<div class="content">\s*<h2 style="text-align:center;">Abstract<\/h2>/, description: 'KSE-Web extends the Khmer information retrieval programme with a study of hybrid search and LLM-assisted query expansion.' },
  { path: 'project/PLA-1/index.html', keys: ['palmvqa'], before: /<section id="roadmap"/, description: 'PalmLeaf-VQA adds manuscript-aware visual question answering to PALM-GLOBAL, alongside the existing PALM-LAY dataset and manuscript-analysis tasks.' },
  { path: 'project/MD/index.html', keys: ['khmervqa', 'palmvqa'], before: /<article id="paper-2"/, description: 'The public VQA papers complement KH-FUNSD and the existing project discussion of low-resource, non-Latin document understanding.' }
];
const routeMap = new Map([
  ['/index.html', 'index.html'], ['/', 'index.html'],
  ...retainedPages.map((page) => [`/${page.path}`, page.path])
]);

function resolveReferences(html, pagePath) {
  const base = new URL(pagePath, 'https://back-kh.github.io/');
  return html.replace(/\b(href|src)\s*=\s*(["'])(.*?)\2/g, (match, attribute, quote, value) => {
    if (!value || value.startsWith('#') || /^(data:|mailto:|javascript:|tel:)/i.test(value)) return match;
    const resolved = new URL(value, base);
    let result = resolved.href;
    if (resolved.hostname === 'back-kh.github.io' && routeMap.has(resolved.pathname)) {
      result = relative(dirname(pagePath), routeMap.get(resolved.pathname)).split('\\').join('/') + resolved.search + resolved.hash;
    }
    return `${attribute}=${quote}${escape(result)}${quote}`;
  });
}

function newPaperSection(page) {
  const assetPath = relative(dirname(page.path), 'assets/papers').split('\\').join('/');
  const articles = page.keys.map((key, index) => {
    const paper = papers[key];
    const detail = paperDetails[key];
    if (!detail) throw new Error(`Missing research story for ${key}`);
    const gallery = detail.figures.map((figure, figureIndex) => {
      const original = `${assetPath}/${figure.file}`;
      const preview = original.replace(/\.[^.]+$/, '.webp');
      return `<figure class="paper-figure" id="figure-${key}-${figureIndex}"><a href="${escape(original)}" data-enlarge-figure aria-label="Enlarge figure: ${escape(figure.label)}"><img src="${escape(preview)}" width="${figure.width}" height="${figure.height}" alt="${escape(figure.alt)}" loading="lazy" decoding="async"><span class="figure-enlarge" aria-hidden="true">Enlarge figure ↗</span></a><figcaption><span>${escape(figure.caption)}</span><a href="${escape(figure.source)}">${escape(figure.sourceLabel)} ↗</a></figcaption></figure>`;
    }).join('');
    return `<article class="project-paper" id="paper-${key}">
      <header class="paper-story-heading"><div class="paper-story-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div><div><p class="project-paper-venue">${escape(paper.year)} · ${escape(paper.venue)}</p><p class="paper-story-field">${escape(detail.field)}</p><h3><a href="${escape(paper.url)}">${escape(paper.title)}</a></h3><p class="project-paper-authors">${authors(paper)}</p></div></header>
      <p class="paper-research-question">${escape(detail.question)}</p>
      ${detail.metrics ? `<dl class="paper-metrics">${detail.metrics.map(([value, label]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>` : `<ul class="paper-tags">${detail.tags.map((tag) => `<li>${escape(tag)}</li>`).join('')}</ul>`}
      <div class="paper-gallery" data-paper-gallery><div class="paper-figure-controls" role="group" aria-label="Figures for ${escape(detail.shortTitle)}" hidden>${detail.figures.map((figure, i) => `<button type="button" data-figure-choice="${i}" aria-pressed="${i === 0}" aria-controls="figure-${key}-${i}">${escape(figure.label)}</button>`).join('')}</div>${gallery}</div>
      <div class="paper-story-notes">${detail.notes.map(([title, text]) => `<section><h4>${escape(title)}</h4><p>${escape(text)}</p></section>`).join('')}</div>
      <aside class="paper-takeaway"><span>Research perspective</span><p>${escape(detail.takeaway)}</p></aside>
      <div class="project-paper-links">${paper.links.map(anchor).join('')}</div>${paper.bibtex ? `<details class="project-paper-citation"><summary>BibTeX citation</summary><p>${escape(paper.citationNote)}</p><pre>${escape(paper.bibtex)}</pre></details>` : ''}</article>`;
  }).join('\n');
  let related = '';
  if (page.path.includes('PLA-1')) related = '<a href="../MD/index.html#research-updates">Also part of Document Understanding for Non-Latin Low-Resource Documents ↗</a>';
  if (page.path.includes('/MD/')) related = '<a href="../PLA-1/index.html#paper-palmvqa">PalmLeaf-VQA within PALM-GLOBAL ↗</a>';
  return `<section class="project-paper-updates" id="research-updates" aria-labelledby="research-updates-title"><div class="project-update-heading"><p class="project-update-kicker">RESEARCH IN FOCUS / 2026</p><h2 id="research-updates-title">Inside the research.</h2><p class="project-update-description">${escape(page.description)}</p><nav class="paper-jump-links" aria-label="Explore recent papers">${page.keys.map((key) => `<a href="#paper-${key}">${escape(paperDetails[key].shortTitle)} <span aria-hidden="true">↓</span></a>`).join('')}</nav></div>${articles}${related ? `<div class="project-related-link">${related}</div>` : ''}</section>\n`;
}

for (const page of retainedPages) {
  let html = await readFile(join(root, 'source-pages', page.path), 'utf8');
  html = resolveReferences(html, page.path);
  const stylePath = relative(dirname(page.path), 'project-updates.css').split('\\').join('/');
  const scriptPath = relative(dirname(page.path), 'project-interactions.js').split('\\').join('/');
  html = html.replace('</head>', `<meta name="robots" content="noindex,nofollow"><link rel="stylesheet" href="${stylePath}"><script src="${scriptPath}" defer></script></head>`);
  if (!page.before.test(html)) throw new Error(`Insertion point not found: ${page.path}`);
  html = html.replace(page.before, (match) => newPaperSection(page) + (page.path.includes('/KSE/') ? '<aside class="prior-research-note"><span>EARLIER KSE RESEARCH</span><p>The earlier studies on semantic search, keyword extraction, and digital information access provide the background to KSE-Web.</p></aside>' : '') + match);
  if (page.path.startsWith('KSI/')) {
    html = html.replace('<a href="#method"', '<a href="#research-updates" class="rounded-full px-3 py-2 text-sm font-semibold text-slate-700">Papers</a><a href="#method"');
    html = html.replace('Manuscript in preparation', 'Published research')
      .replace('This page presents the research direction and project details only. The paper has not been accepted yet; publication venue, code release, and dataset access will be updated when they are ready.', 'Angkorian-KSI is published in the ICDAR 2026 proceedings. The Angkorian-HeritageObj paper and the Angkorian–AI project website are linked above.');
  }
  if (page.path.includes('/KSE/')) {
    html = html.replace('<body>', '<body class="retained-kse"><nav class="research-page-nav" aria-label="Research page"><a href="../../index.html">NT. <span>Nimol Thuon / Research</span></a><a href="#research-updates">KSE-Web ↓</a><a href="../../index.html#research">All projects ↗</a></nav>')
      .replace(/<table\b[\s\S]*?<\/table>/gi, (table) => `<div class="legacy-table-scroll" tabindex="0" role="region" aria-label="Scrollable research table">${table}</div>`)
      .replace(/<script[^>]+src=["'][^"']*jquery[^"']*["'][^>]*>\s*<\/script>/gi, '');
  }
  if (page.path.includes('/MD/')) {
    html = html.replaceAll('href="#paper-2"', 'href="#research-updates"').replace('>Paper 2</a>', '>VQA papers</a>');
    html = html.replace('Paper 2: Multimodal Visual Question Answering (VQA)', 'Multimodal Visual Question Answering (VQA)')
      .replace(' Under Review</span>', ' Public VQA papers</span>')
      .replace('Two papers detailing our multimodal Visual VQA framework for low-resource languages are currently under peer review. This page summarizes the motivation, core problems, and research direction without releasing unpublished experimental details.', 'PalmLeaf-VQA and the Khmer document VQA pilot are now publicly available. Their paper links and summaries appear above; the sections below retain the project motivation, challenges, and methodology directions.')
      .replace('The Visual VQA framework and broader layout-analysis benchmarks for Khmer, Lao, and Burmese are in active development. Datasets, methodology details, and publication links will be added after peer review is finalized.', 'The public VQA studies are linked above. Broader layout-analysis and document-understanding research for Khmer, Lao, and Burmese continues, with further resources and methodology details to be added as they become available.');
    html = html.replace(/<img src="https:\/\/back-kh\.github\.io\/project\/MD\/Fig2_VQA_Architecture\.jpg"[^>]*>/, '<a href="../../assets/papers/khmer-vqa-results.jpg" data-enlarge-figure aria-label="Enlarge figure: Khmer document VQA results"><img src="../../assets/papers/khmer-vqa-results.webp" width="5365" height="1606" alt="Direct, parser-assisted, and OCR-assisted results from the Khmer document VQA pilot" class="w-full h-auto rounded-xl" loading="lazy"></a>')
      .replace('Proposed multimodal fusion direction for non-Latin document VQA.', 'Results from the Khmer Document VQA pilot (Figure 3), comparing direct prompting and OCR assistance.');
  }
  if (!html.includes('name="viewport"')) html = html.replace('</head>', '<meta name="viewport" content="width=device-width, initial-scale=1"></head>');
  if (!/<!doctype/i.test(html)) html = '<!doctype html>\n' + html;
  html = html.replace('<html>', '<html lang="en">');
  html = html.replace('</body>', '<dialog class="figure-dialog" aria-labelledby="figure-dialog-title"><div class="figure-dialog-toolbar"><h2 id="figure-dialog-title">Research figure</h2><button type="button" data-close-figure aria-label="Close figure">×</button></div><img class="figure-dialog-image" alt=""><p class="figure-dialog-caption"></p><a class="figure-dialog-original" href="#">Open original image ↗</a></dialog></body>');
  await mkdir(dirname(join(root, page.path)), { recursive: true });
  await writeFile(join(root, page.path), preparePage(html, page.path));
}
console.log(`Built the ${production ? 'production' : 'preview'} personal homepage (6 original project names, 13 papers) and 4 existing project pages with added publications.`);
