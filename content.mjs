// Public records checked in October 2026; author venue updates supplied on 25 October 2026. See README.md for sources.
export const papers = {
  ksi: {
    title: 'Angkorian-KSI: A Multi-task Benchmark for Khmer Stone Inscription Analysis',
    authors: ['Nimol Thuon', 'Jun Du', 'Ranysakol Thuon', 'Panhapin Theang'],
    year: '2026', yearNote: 'Online', venue: 'ICDAR 2026 · Vienna, Austria · Springer',
    url: 'https://link.springer.com/chapter/10.1007/978-3-032-36039-7_23',
    links: [['Publisher', 'https://link.springer.com/chapter/10.1007/978-3-032-36039-7_23'], ['Angkorian–AI', 'https://angkorianai.github.io/']],
    summary: 'A benchmark for locating inscription structure, extracting text masks, and recognizing historical script periods on Khmer stone surfaces. It makes the effects of erosion, uneven lighting, and stone texture visible in evaluation.',
    citationNote: 'First online in August 2026; Springer recommends a 2027 citation year. The BibTeX follows the publisher record.',
    bibtex: `@inproceedings{thuon2027angkorian,
  author = {Thuon, Nimol and Du, Jun and Thuon, Ranysakol and Theang, Panhapin},
  title = {Angkorian-KSI: A Multi-task Benchmark for Khmer Stone Inscription Analysis},
  booktitle = {Document Analysis and Recognition -- ICDAR 2026},
  series = {Lecture Notes in Computer Science},
  volume = {16974},
  pages = {387--404},
  year = {2027},
  publisher = {Springer, Cham},
  doi = {10.1007/978-3-032-36039-7_23}
}`
  },
  heritage: {
    title: 'Angkorian-HeritageObj: AI-Assisted Visual Condition Assessment of Khmer Stone Heritage Objects',
    authors: ['Nimol Thuon', 'Panhapin Theang'],
    year: '2026', venue: 'ICPR 2026 · PRESTIGE · Lyon, France',
    url: 'https://www.researchgate.net/publication/413569705_Angkorian-HeritageObj_AI-Assisted_Visual_Condition_Assessment_of_Khmer_Stone_Heritage_Objects',
    links: [['Paper', 'https://www.researchgate.net/publication/413569705_Angkorian-HeritageObj_AI-Assisted_Visual_Condition_Assessment_of_Khmer_Stone_Heritage_Objects'], ['Angkorian–AI', 'https://angkorianai.github.io/']],
    summary: 'Visual condition assessment for Khmer stone heritage objects using ordinary photographs. The study compares visual representations and vision-language approaches for describing visible damage and condition, with heritage expertise remaining essential to interpretation.'
  },
  palmvqa: {
    title: 'PalmLeaf-VQA: A Multi-Script Visual Question Answering Benchmark for Historical Palm-Leaf Manuscript Understanding Across Diverse Regions',
    authors: ['Nimol Thuon', 'Jun Du', 'Panhapin Theang'],
    year: '2027', preprintYear: '2026', venue: 'WACV 2027 · Florida, USA · IEEE/CVF',
    url: 'https://arxiv.org/abs/2609.31651',
    links: [['Project page', 'https://back-kh.github.io/palmleaf-vqa/'], ['arXiv', 'https://arxiv.org/abs/2609.31651']],
    summary: 'A visual question answering resource for reasoning about manuscript condition, physical features, and page structure across regional collections. It tests multimodal language models on historical material beyond transcription.',
    arxiv: '2609.31651', primaryClass: 'cs.CV',
    citationNote: 'This citation refers to the 2026 arXiv preprint. The displayed conference year is 2027; final proceedings details are not included in this citation.'
  },
  khmervqa: {
    title: 'Do MLLMs Really Understand Low-Resource Khmer Documents? A Pilot Study on Khmer Document VQA',
    authors: ['Nimol Thuon', 'Panhapin Theang'],
    year: '2026', venue: 'ICPR 2026 · Lyon, France · Springer',
    url: 'https://arxiv.org/abs/2608.28635',
    links: [['arXiv', 'https://arxiv.org/abs/2608.28635']],
    summary: 'A diagnostic study of multimodal models on business forms from KH-FUNSD. It examines direct prompting, parser and OCR assistance, and the gap between native Khmer answers and English or numeric fields.',
    arxiv: '2608.28635', primaryClass: 'cs.CL',
    citationNote: 'Citation for the publicly available arXiv version; the conference venue is displayed separately. This work is a pilot diagnostic study.'
  },
  kseweb: {
    title: 'KSE-Web: An Analysis of Hybrid Retrieval and LLM-Assisted Query Expansion for Low-Resource Khmer Semantic Search',
    authors: ['Nimol Thuon'],
    year: '2026', venue: 'ICDAR 2026 · Vienna, Austria · Springer',
    url: 'https://arxiv.org/abs/2608.21365',
    links: [['arXiv', 'https://arxiv.org/abs/2608.21365']],
    summary: 'An analysis of sparse, dense, and hybrid Khmer retrieval alongside LLM query expansion. The study finds a strong lexical baseline and documents how expansion can introduce topic drift, using relevance labels with partial human verification.',
    arxiv: '2608.21365', primaryClass: 'cs.CL',
    citationNote: 'Citation for the publicly available arXiv version of KSE-Web; the conference venue is displayed separately.'
  },
  palmlay: {
    title: 'PALM-LAY: A Multi-script Cross-Regional Dataset for Layout Analysis of Palm Leaf Manuscripts',
    authors: ['Nimol Thuon', 'Jun Du', 'Panhapin Theang', 'Ratana Thuon'],
    year: '2026', yearNote: 'Online', venue: 'ICDAR 2025 · Wuhan, China · Springer',
    url: 'https://link.springer.com/chapter/10.1007/978-3-032-09371-4_15',
    links: [['Publisher', 'https://link.springer.com/chapter/10.1007/978-3-032-09371-4_15'], ['Dataset overview', 'https://back-kh.github.io/project/PLA-1/palm-lay.html']],
    summary: 'A shared annotation framework for studying manuscript layouts across South and Southeast Asian collections. Region categories cover writing, illustrations, physical damage, and archival additions.',
    citationNote: 'ICDAR 2025 Workshops proceedings; first published online in January 2026. Names and citation year follow the publisher record.',
    bibtex: `@inproceedings{thuon2026palmlay,
  author = {Thuon, Nimol and Du, Jun and Theang, Panhapin and Thuon, Ratana},
  title = {PALM-LAY: A Multi-script Cross-Regional Dataset for Layout Analysis of Palm Leaf Manuscripts},
  booktitle = {Document Analysis and Recognition -- ICDAR 2025 Workshops},
  series = {Lecture Notes in Computer Science},
  volume = {16226},
  pages = {246--262},
  year = {2026},
  publisher = {Springer, Cham},
  doi = {10.1007/978-3-032-09371-4_15}
}`
  },
  khfunsd: {
    title: 'KH-FUNSD: A Hierarchical and Fine-Grained Layout Analysis Dataset for Low-Resource Khmer Business Document',
    authors: ['Nimol Thuon', 'Jun Du'],
    year: '2025', venue: 'APSIPA ASC 2025 · Singapore · IEEE',
    url: 'https://arxiv.org/abs/2512.11849',
    links: [['arXiv', 'https://arxiv.org/abs/2512.11849'], ['Repository', 'https://github.com/back-kh/KH-FUNSD']],
    summary: 'Khmer business-document annotations connect broad layout zones, form entities and relationships, and fine-grained semantic roles. The resource supports research on structure-aware information extraction.',
    arxiv: '2512.11849', primaryClass: 'cs.CL',
    citationNote: 'Citation for the arXiv version. The arXiv record also lists APSIPA ASC 2025 as its journal reference.'
  },
  palmsada: {
    title: 'Multi-low resource languages in palm leaf manuscript recognition: Syllable-based augmentation and error analysis',
    authors: ['Nimol Thuon', 'J. Du', 'P. Theang', 'R. Thuon'],
    year: '2025', venue: 'Pattern Recognition Letters · Elsevier',
    url: 'https://www.sciencedirect.com/science/article/pii/S0167865525001734',
    links: [['Publisher', 'https://www.sciencedirect.com/science/article/pii/S0167865525001734'], ['Code', 'https://github.com/back-kh/SADA']]
  },
  dualloop: {
    title: 'A Low-Intervention Dual-Loop Iterative Process for Efficient Dataset Expansion and Classification in Palm Leaf Manuscript Analysis',
    authors: ['Nimol Thuon', 'J. Du', 'P. Theang', 'R. Thuon'],
    year: '2025', venue: 'IJDAR · Springer · Presented in Wuhan, China',
    url: 'https://link.springer.com/article/10.1007/s10032-025-00532-y',
    links: [['Publisher', 'https://link.springer.com/article/10.1007/s10032-025-00532-y']]
  },
  palmgan: {
    title: 'Generate, transform, and clean: the role of GANs and transformers in palm leaf manuscript generation and enhancement',
    authors: ['Nimol Thuon', 'J. Du', 'Z. Zhang', 'J. Ma', 'P. Hu'],
    year: '2024', venue: 'IJDAR · Springer · Presented in Athens, Greece',
    url: 'https://link.springer.com/article/10.1007/s10032-024-00472-z',
    links: [['Publisher', 'https://link.springer.com/article/10.1007/s10032-024-00472-z']]
  },
  khmerformer: {
    title: 'KhmerFormer: Multi-scale CNNs-Transformer with External Attention for Ancient Khmer Palm Leaf Isolated Glyph Classification',
    authors: ['Nimol Thuon', 'J. Du'],
    year: '2024', venue: 'APSIPA ASC 2024 · Macau · IEEE',
    url: 'https://ieeexplore.ieee.org/document/10849201/',
    links: [['Publisher', 'https://ieeexplore.ieee.org/document/10849201/']]
  },
  glyphs: {
    title: 'Improving Isolated Glyph Classification Task for Palm Leaf Manuscripts',
    authors: ['Nimol Thuon', 'J. Du', 'J. Zhang'],
    year: '2022', venue: 'ICFHR 2022 · Springer',
    url: 'https://link.springer.com/chapter/10.1007/978-3-031-21648-0_5',
    links: [['Publisher', 'https://link.springer.com/chapter/10.1007/978-3-031-21648-0_5']]
  },
  khsada: {
    title: 'Syllable Analysis Data Augmentation for Khmer Ancient Palm leaf Recognition',
    authors: ['Nimol Thuon', 'J. Du', 'J. Zhang'],
    year: '2022', venue: 'APSIPA ASC 2022 · IEEE',
    url: 'https://ieeexplore.ieee.org/document/9980217/',
    links: [['Publisher', 'https://ieeexplore.ieee.org/document/9980217/']]
  }
};

for (const [key, paper] of Object.entries(papers)) {
  if (!paper.arxiv) continue;
  const authors = paper.authors.map((name) => {
    const parts = name.split(' ');
    return `${parts.pop()}, ${parts.join(' ')}`;
  }).join(' and ');
  const citationYear = paper.preprintYear || paper.year;
  paper.bibtex = `@misc{thuon${citationYear}${key},
  title = {${paper.title}},
  author = {${authors}},
  year = {${citationYear}},
  eprint = {${paper.arxiv}},
  archivePrefix = {arXiv},
  primaryClass = {${paper.primaryClass}},
  url = {${paper.url}}
}`;
}

export const allPaperOrder = ['palmvqa', 'khmervqa', 'kseweb', 'ksi', 'heritage', 'palmlay', 'khfunsd', 'palmsada', 'dualloop', 'palmgan', 'khmerformer', 'glyphs', 'khsada'];

export const projects = [
  {
    category: 'heritage', categoryLabel: 'Cultural heritage', tag: 'Angkorian–AI',
    id: 'stone-inscriptions', title: 'Ancient Khmer Stone Inscription Analysis',
    url: 'KSI/index.html', image: 'assets/stone-project.jpg', imageClass: 'stone-project-image',
    alt: 'Khmer stone inscription with carved historical script',
    description: 'Angkorian-KSI benchmarks inscription analysis. Angkorian-HeritageObj studies visible condition and damage in Khmer stone heritage objects.',
    links: [['Project details', 'KSI/index.html']]
  },
  {
    id: 'document-understanding', category: 'document', categoryLabel: 'Document understanding', tag: 'Layout · OCR · VQA',
    title: 'Document Understanding for Non-Latin Low-Resource Documents', url: 'project/MD/index.html',
    image: 'assets/kh-funsd.jpg', imageClass: 'document-project-image',
    alt: 'KH-FUNSD examples of Khmer document layout annotations',
    description: 'Layout analysis and multimodal understanding for low-resource documents. The project page brings together KH-FUNSD, PalmLeaf-VQA, and the Khmer document VQA pilot.',
    links: [['Project details', 'project/MD/index.html']]
  },
  {
    category: 'heritage', categoryLabel: 'Palm-leaf manuscripts', tag: 'PALM-GLOBAL',
    id: 'palm-global', title: 'PALM-GLOBAL: Cross Domains Palm Leaf Manuscript Analysis', url: 'project/PLA-1/index.html',
    image: 'assets/palm-project.jpg', imageClass: 'palm-project-image',
    alt: 'Palm-leaf pages with handwritten scripts and illustrations',
    description: 'PALM-LAY studies manuscript layout. PalmLeaf-VQA asks how well multimodal models understand preservation cues, physical features, and page structure.',
    links: [['Project details', 'project/PLA-1/index.html']]
  },
  {
    id: 'palm-sea', category: 'heritage', categoryLabel: 'Historical manuscript analysis', tag: 'PALM-SEA',
    title: 'PALM-SEA: Historical Palm Leaf Analysis for SEA', url: 'https://back-kh.github.io/project/PLA/PLA.html',
    image: 'assets/palm-sea.jpg', imageClass: 'palm-project-image',
    alt: 'Historical Southeast Asian palm-leaf manuscript examples from PALM-SEA',
    description: 'Document analysis and recognition for Khmer, Balinese, and Sundanese palm-leaf manuscripts, including datasets, enhancement, layout, glyph classification, and text recognition.',
    links: [['Project details', 'https://back-kh.github.io/project/PLA/PLA.html']]
  },
  {
    id: 'khmer-retrieval', category: 'systems', categoryLabel: 'Khmer information retrieval', tag: 'KSE · KSE-Web',
    title: 'Khmer Document Information Extraction and Retrieval', url: 'project/KSE/index.html',
    image: 'assets/kse-retrieval.png', imageClass: 'document-project-image',
    alt: 'Research diagram from the Khmer Semantic Search Engine project',
    description: 'KSE-Web extends the Khmer search programme with an analysis of lexical, dense, and hybrid retrieval, alongside LLM-assisted query expansion.',
    links: [['Project details', 'project/KSE/index.html']]
  },
  {
    id: 'education-resources', category: 'systems', categoryLabel: 'Educational & document systems', tag: 'Completed',
    title: 'Open Education Resource for Document Management System (Completed)',
    url: 'https://hal.science/hal-05072234v1/document',
    image: 'assets/education-resources.png', imageClass: 'document-project-image',
    alt: 'Open education resource and document management system project overview',
    description: 'Research and development of an Open Educational Resources platform and complex document management systems, including a national Financial Document Management system.',
    links: [['Project details', 'https://hal.science/hal-05072234v1/document']]
  }
];
