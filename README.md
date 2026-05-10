# ML Atlas

Final-exam roadmap for **ECE 449 / CS 446 — Introduction to Machine Learning**. From foundations through classical ML, deep learning, modern sequence models, learning theory and reinforcement learning, every core algorithm gets its own page with key formulas, exam pitfalls and a worked example.

The whole site is bilingual. Use the **EN / 中** switch in the top right to flip between English-only and Chinese modes. **English is the default.**

🌐 **Live site:** [wyr186.github.io/ML_Atlas](https://wyr186.github.io/ML_Atlas/) — auto-deployed on every push to `main` via GitHub Actions.

## Layout

```
.
├── index.html          Roadmap homepage (one card per algorithm)
├── cheatsheet.html     One-page cram sheet
├── resources.html      Slides / homework / textbooks index
├── topics/             37 algorithm pages, one per topic
│   ├── probability.html · linear-algebra.html · optimization.html
│   ├── knn.html · naive-bayes.html
│   ├── linear-regression.html · logistic-regression.html · svm.html · kernel-methods.html
│   ├── decision-trees.html · bagging.html · boosting.html
│   ├── pca.html · kmeans.html
│   ├── mlp.html · backpropagation.html · cnn.html
│   ├── rnn.html · lstm.html
│   ├── autoencoder.html · vae.html · contrastive.html
│   ├── attention.html · positional-encoding.html · transformer.html · llm.html
│   ├── diffusion.html
│   ├── bayes-classifier.html · error-decomposition.html · pac.html · vc-dimension.html
│   ├── mdp.html · value-functions.html · bellman.html · dynamic-programming.html
│   └── q-learning.html · policy-gradient.html
└── assets/
    ├── style.css       Visual style + i18n visibility rules
    ├── i18n.js         EN / Mixed / CN switching + translation dictionary
    ├── topics-data.js  Topic metadata for the homepage cards
    ├── popup-data.js   Tutorial blurbs, Python templates, HW problem entries
    ├── popup.js        Click-anchored popup component
    └── main.js         Progress tracking + search + connector lines
```

Click any card on the homepage and a popup pops out from the click position, with three sections:

- **Tutorial** — a short blurb plus a link to the full notes page.
- **Python template** — a concise reference implementation. Code is a side-show in this course; these snippets are study aids, not the focus.
- **HW problems** — paraphrased one-line summaries of each homework problem, my own conceptual answer sketch, and direct links to the original problem and solution PDFs (the originals stay in their own folders, not in this repo).

Per-problem and per-tutorial completion is stored in the browser's `localStorage`, and the popup header shows your progress as `done / total`.

## Local preview

Drop the `ML Review/` folder next to your `slides/`, `HW/`, `book/` folders, then start a local server from inside `ML Review/`. Two options, depending on whether you want progress to survive across browsers / ports.

**Recommended — `serve.py` keeps your progress in a local file:**

```bash
cd "ML Review"
python3 serve.py        # http://localhost:8000
python3 serve.py 5173   # custom port
```

`serve.py` is a tiny wrapper around Python's `http.server` that adds a single `/api/progress` endpoint. Every checked-off problem, every "mastered" topic, and the read-state of every tutorial is mirrored to `progress.json` next to the script. Open the site from another browser, another port, or after wiping cache — the progress is still there.

**Plain — quick test, no persistence beyond the browser:**

```bash
cd "ML Review"
python3 -m http.server 8000
```

Same site, but progress lives only in `localStorage` for that exact origin (so a new port = a fresh slate). The site detects the missing endpoint at boot and silently falls back without spamming errors.

**Either way:** the homepage's `📤 Export` / `📥 Import` buttons round-trip a `ml-atlas-progress-YYYY-MM-DD.json` file you can move between machines.

The repo includes symlinks `HW`, `slides`, `book` pointing at the parent directory so all PDF chips on the site resolve cleanly when served from inside `ML Review/`. The symlinks themselves are git-ignored, and no PDFs are committed — the course material stays in your local filesystem. `progress.json` is also git-ignored so your personal study state never lands on GitHub.

LaTeX is rendered with MathJax 3 from the jsDelivr CDN, so an internet connection is needed for math to look right.

## Notes

- Source material: `Block 1-4.rtf` and `Block 5-10.rtf` (my consolidated bilingual study notes). Topic page bodies, homework summaries and the answer sketches are written from scratch in my own words.
- The site has no build step. Everything is plain HTML / CSS / vanilla JS.
- License: personal study notes — the algorithms, formulas and Python templates are public knowledge; my notes around them are released under MIT (see `LICENSE`).
