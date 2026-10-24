# Nimol Thuon — Personal Academic Website

Live site: [back-kh.github.io](https://back-kh.github.io/).

This static GitHub Pages site preserves the existing project URLs and teaching pages. The homepage includes six research projects, thirteen publications, five talks, thirteen awards, reviewing service, and writing. The four updated research pages add the related papers and attributed figures within the original project content.

## Edit and build

- `home.template.html`: biography, profile, talks, reviewing, teaching, and awards.
- `content.mjs`: publications, citations, and project cards.
- `paper-details.mjs`: illustrated research explanations and figure captions.
- `publication-images.mjs`: explicit paper-to-image mapping and source links.
- `personal.css`, `styles.css`, and `script.js`: homepage design and interaction.
- `project-updates.css` and `project-interactions.js`: paper galleries and enlargement.
- `source-pages/`: retained project-page inputs for the build. Edit these source files when changing the original project content.

No package installation is required. Use Node.js to generate the five public pages:

```sh
node build.mjs --production
```

The production build removes preview labels and `noindex` metadata and adds canonical URLs. Commit the generated pages together with their source changes. GitHub Pages serves the repository root from `main`; `.nojekyll` keeps these static files intact.

For a local preview:

```sh
python3 -m http.server 4178 --bind 127.0.0.1
```

Open `http://127.0.0.1:4178/`. Running `node build.mjs` without `--production` creates the original review preview with `noindex` metadata; run the production build again before publishing.

## Content and image provenance

Paper thumbnails are matched individually to paper figures or official author project imagery; they have no generic-image fallback. `publication-images.mjs` and `paper-details.mjs` record the sources. Images are resized for display without inventing scientific content. The profile scan animation is a visual decoration, supports pause and reduced motion, and does not represent a model output. The visitor counter uses the image URL supplied by the site owner.

Venue updates and academic-profile details follow the author's approved content. Available preprint links and citations are retained where final proceedings identifiers have not been provided. IJDAR's Athens 2024 and Wuhan 2025 labels describe presentation locations. The 2018 CAS-TWAS funding description follows the [official programme](https://english.ucas.ac.cn/index.php/admission/international-students/financial-aid/4683-2018-cas-twas-president-s-fellowship-programme-for-doctoral-candidates).
