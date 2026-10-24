// Figure provenance and short research explanations. See README.md for sources.
// Values describe the cited study, rather than claiming performance beyond it.
export const paperDetails = {
  ksi: {
    shortTitle: 'Angkorian-KSI', field: 'Stone inscriptions · Benchmark',
    question: 'How can we recover structure from weathered stone?',
    metrics: [['230', 'full inscription images'], ['2,733', 'annotated text lines'], ['3', 'benchmark tasks']],
    notes: [
      ['The problem', 'Carved text is shaped by depth, erosion, shadows, and stone texture. Methods designed for flat documents face a different visual domain.'],
      ['The approach', 'KSI-LA locates regions and lines; KSI-B extracts binary text masks; KSI-C recognizes Pre-Angkorian, Angkorian, and Post-Angkorian script periods.'],
      ['The contribution', 'A shared benchmark connects these tasks and exposes the domain gap. It supports reproducible analysis and expert inspection of historical evidence.']
    ],
    figures: [
      { file: 'ksi-benchmark-pipeline.jpg', width: 2400, height: 1045, label: 'Benchmark design', alt: 'Angkorian-KSI collection workflow and the layout, binarization, and period-classification tasks', caption: 'Figure 3 · Collection, annotation, and the three task pathways.', source: 'https://github.com/back-kh/Angkorian-KSI', sourceLabel: 'Official paper repository' },
      { file: 'ksi-annotations.jpg', width: 2340, height: 684, label: 'Annotation examples', alt: 'Stone inscription examples with text-region, text-line, mask, and script-period annotations', caption: 'Figure 4 · Examples of the visual evidence represented by the annotations.', source: 'https://github.com/back-kh/Angkorian-KSI', sourceLabel: 'Official paper repository' }
    ],
    takeaway: 'The benchmark evaluates visual analysis; historical interpretation still depends on specialist expertise.'
  },
  heritage: {
    shortTitle: 'Angkorian-HeritageObj', field: 'Digital preservation · Visual assessment',
    question: 'What can a photograph tell us about visible condition?',
    tags: ['Visual features', 'Transfer learning', 'Vision-language models'],
    notes: [
      ['The problem', 'Khmer stone objects show varied textures, damage, and capture conditions. Consistent visual documentation is a useful starting point for preservation research.'],
      ['The approach', 'The research figure contrasts CLIP/DINOv2 features, CNN transfer learning, and prompted vision-language analysis for condition labels or descriptions.'],
      ['The relevance', 'These complementary pathways connect image evidence with descriptions of visible condition, creating material for expert review and further heritage analysis.']
    ],
    figures: [
      { file: 'heritage-collection.jpg', width: 1548, height: 718, label: 'Research collection', alt: 'Photographs of Khmer stone heritage objects showing good, moderate, and severe condition', caption: 'Figure 1 · Heritage objects illustrating the three condition classes.', source: 'https://www.researchgate.net/publication/413569705_Angkorian-HeritageObj_AI-Assisted_Visual_Condition_Assessment_of_Khmer_Stone_Heritage_Objects', sourceLabel: 'Paper' },
      { file: 'heritage-models.png', width: 4088, height: 2433, label: 'Model pathways', alt: 'Comparison of CLIP and DINOv2 visual features, CNN transfer learning, and vision-language prompting for stone condition assessment', caption: 'Figure 2 · Three model pathways for condition labels and descriptions.', source: 'https://www.researchgate.net/publication/413569705_Angkorian-HeritageObj_AI-Assisted_Visual_Condition_Assessment_of_Khmer_Stone_Heritage_Objects', sourceLabel: 'Paper' }
    ],
    takeaway: 'Visible condition assessment supports documentation. Conservation decisions require material context and heritage expertise.'
  },
  kseweb: {
    shortTitle: 'KSE-Web', field: 'Khmer information retrieval · Evaluation',
    question: 'Does adding an LLM make Khmer search better?',
    metrics: [['3,000', 'cleaned web documents'], ['300', 'reviewed queries'], ['0.876', 'BM25 nDCG@10']],
    notes: [
      ['The problem', 'Khmer word boundaries, mixed-language queries, and limited relevance annotations complicate search. Multilingual embeddings do not automatically solve these issues.'],
      ['The approach', 'The study compares character n-gram BM25, multilingual-E5, hybrid score fusion, and Qwen2.5 query expansion on the same corpus.'],
      ['The finding', 'BM25 is strongest overall; hybrid retrieval stays close. LLM expansion can drift from the query, and the larger expansion model still trails non-expanded retrieval.']
    ],
    figures: [
      { file: 'kse-framework.jpg', width: 4817, height: 2772, label: 'Retrieval framework', alt: 'KSE-Web framework connecting offline Khmer corpus indexing with query normalization, LLM expansion, sparse retrieval, dense retrieval, and score fusion', caption: 'Figure 1 · Offline indexing and online query processing.', source: 'https://arxiv.org/html/2608.21365v1#S1.F1', sourceLabel: 'Paper figure 1' },
      { file: 'kse-results.jpg', width: 3475, height: 1541, label: 'Retrieval results', alt: 'KSE-Web paper comparison of BM25, dense, hybrid, and LLM-expanded retrieval results', caption: 'Figure 3 · Retrieval performance across the evaluated configurations.', source: 'https://arxiv.org/html/2608.21365v1#S5.F3', sourceLabel: 'Paper figure 3' }
    ],
    takeaway: 'Results use silver relevance labels with partial human verification; BM25-based candidate pooling can favor lexical methods.'
  },
  khmervqa: {
    shortTitle: 'Khmer Document VQA', field: 'Multimodal document AI · Pilot study',
    question: 'Can MLLMs read the Khmer fields that matter?',
    metrics: [['62', 'document images'], ['370', 'question–answer pairs'], ['61.9%', 'Qwen3-VL-8B + Tesseract accuracy']],
    notes: [
      ['The problem', 'Forms mix Khmer, English, amounts, and currencies. A plausible answer can still copy the wrong field or miss the native-script content.'],
      ['The approach', 'Using a KH-FUNSD subset, the study compares direct Qwen-VL prompting, model-generated parser evidence, and external OCR assistance.'],
      ['The finding', 'Qwen3-VL-8B reaches 51.9% overall accuracy directly; Tesseract assistance raises it to 61.9%. Khmer-script and mixed-script answers remain difficult.']
    ],
    figures: [
      { file: 'khmer-vqa-documents.jpg', width: 2809, height: 1269, label: 'Document examples', alt: 'Paper examples of Khmer, mixed Khmer-English, and English-dominant business documents with Riel and US Dollar values', caption: 'Figure 2 · Language, layout, and currency variations in business forms.', source: 'https://arxiv.org/html/2608.28635v1#S1.F2', sourceLabel: 'Paper figure 2' },
      { file: 'khmer-vqa-results.jpg', width: 5365, height: 1606, label: 'Diagnostic results', alt: 'Paper chart comparing direct, parser-assisted, and OCR-assisted Khmer document VQA, including answer-group accuracy', caption: 'Figure 3 · Overall and answer-group results, with the paper’s confidence intervals.', source: 'https://arxiv.org/html/2608.28635v1#S5.F3', sourceLabel: 'Paper figure 3' }
    ],
    takeaway: 'A diagnostic pilot on one source collection; the reported accuracy does not establish reliable Khmer document understanding in general.'
  },
  palmvqa: {
    shortTitle: 'PalmLeaf-VQA', field: 'Historical manuscripts · Visual reasoning',
    question: 'Can a model understand the manuscript as an artifact?',
    metrics: [['923', 'manuscript images'], ['7,384', 'question–answer pairs'], ['8', 'collection groups']],
    notes: [
      ['The problem', 'Reading the text is only part of manuscript understanding. Material, damage, margins, binding holes, and drawings also carry preservation-relevant evidence.'],
      ['The approach', 'Eight question categories test classification, counting, layout, and attributes. Open and constrained answers are evaluated on image-disjoint splits.'],
      ['The finding', 'The strongest evaluated model reaches 58.00% exact match on the held-out test split under constrained prompting. Local physical features and condition remain challenging.']
    ],
    figures: [
      { file: 'palmleaf-vqa-overview.jpg', width: 9427, height: 3886, label: 'Benchmark overview', alt: 'PalmLeaf-VQA manuscript examples from eight collection groups, visual question-answer examples, and the eight-category task taxonomy', caption: 'Figure 1 · Manuscript collections, example questions, and task taxonomy.', source: 'https://arxiv.org/html/2609.31651v1#S1.F1', sourceLabel: 'Paper figure 1' }
    ],
    takeaway: 'The task concerns visible manuscript properties, rather than full transcription; image-disjoint splits are not fully manuscript-disjoint.'
  }
};
