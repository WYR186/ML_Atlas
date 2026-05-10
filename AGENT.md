# AGENT.md — ML Atlas project notes for Claude

A working memo for any Claude session that touches this repo. Read it before making changes.

---

## What this repo is

`ML Atlas` is the user's personal final-exam review site for **ECE 449 / CS 446 — Introduction to Machine Learning** (Spring 2026, UIUC). Static HTML/CSS/vanilla JS plus one ES-module that mounts a **React Flow** node-graph on the homepage. Each cell is an algorithm card; clicking a card pops a viewport-aware popover anchored to the cell. The site has a two-mode language switch (EN / CN) and an optional Python server that persists learning progress to a local JSON file.

- GitHub remote: `git@github.com:WYR186/ML_Atlas.git` (branch `main`, default branch deploys to Pages)
- Live site: `https://wyr186.github.io/ML_Atlas/` (auto-deployed by `.github/workflows/deploy.yml`)
- Local working directory: `/Users/ipanda/Library/CloudStorage/OneDrive-Personal/ECE 449/ML Review`

The `ML Review/` folder lives next to (siblings, not children) the user's course PDFs:

```
ECE 449/
├── ML Review/         ← this site (the git repo lives here)
├── slides/            ← Lecture_*.pdf, mt_course_review, final_review
├── HW/                ← hw1..5 + *_sol + midterm_practice_problems
├── book/              ← reference textbooks
├── Block 1-4.rtf      ← user's consolidated bilingual notes (source of truth)
└── Block 5-10.rtf
```

`HW`, `slides`, `book` exist inside `ML Review/` as **symlinks** to the parent so PDF chips resolve when the local server runs from `ML Review/`. The symlinks are `.gitignore`d. **PDFs are never committed** (copyrighted).

---

## Site layout (committed)

```
ML Review/
├── index.html                  homepage: full-viewport React Flow Atlas + Mermaid view switch
├── algorithms.html             standalone algorithm index — multi-axis filter chips
├── problems.html               standalone HW problem aggregator across all blocks
├── cheatsheet.html             bilingual equation sheet (rendered from equation-sheet.js)
├── resources.html              slides / HW / textbook map
├── README.md                   pure English; deploy + run instructions
├── AGENT.md                    this file
├── serve.py                    local dev server with /api/progress
├── .gitignore                  ignores HW/, slides/, book/, progress.json, .DS_Store…
├── .github/workflows/
│   └── deploy.yml              push-to-main → GitHub Pages
├── topics/                     37 algorithm pages, one per topic
└── assets/
    ├── style.css               visuals + i18n visibility + popup + slider thumb + .home-shell + .rf-* + .algo-*
    ├── progress-sync.js        ⚠ MUST load first; patches localStorage to /api/progress
    ├── i18n.js                 EN / 中 + thumb alignment + scroll-preserving switches
    ├── topics-data.js          GROUPS + TOPICS metadata for cards (lectures + hw fields too)
    ├── popup-data.js           tutorial / Python templates / HW problem entries (bilingual)
    ├── popup.js                click-anchored popup; exposes window.openTopicPopup(slug, anchor)
    ├── main.js                 progress + search (also targets .rf-topic + .algo-row) + code injector
    ├── atlas-rf.js             ES module — mounts React Flow Atlas in #rfMount
    ├── equation-sheet.js       cheatsheet.html data source — formula blocks per topic
    ├── algorithm-tags.js       TOPIC_TAGS (paradigm/task/family) + TAG_DIMENSIONS for filter UI
    ├── algorithm-index.js      algorithms.html renderer + chip filter logic
    └── problems-page.js        problems.html renderer (all HW problems grouped by block)
```

`index.html` `<head>` loads the React stack via an import map + esm.sh:

```html
<link rel="stylesheet" href="https://esm.sh/@xyflow/react@12.3.5/dist/style.css" />
<script type="importmap">{
  "imports": {
    "react":         "https://esm.sh/react@18.3.1",
    "react/":        "https://esm.sh/react@18.3.1/",
    "react-dom":     "https://esm.sh/react-dom@18.3.1",
    "react-dom/":    "https://esm.sh/react-dom@18.3.1/",
    "@xyflow/react": "https://esm.sh/@xyflow/react@12.3.5?external=react,react-dom"
  }
}</script>
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js" defer></script>
```

The trailing-slash `react/` and `react-dom/` mappings are load-bearing — `@xyflow/react` internally imports `react/jsx-runtime`, which only resolves with the `/` mapping. Don't drop them.

37 algorithm slugs (in homepage / table order):
`probability, linear-algebra, optimization, knn, naive-bayes, linear-regression, logistic-regression, svm, kernel-methods, decision-trees, bagging, boosting, pca, kmeans, mlp, backpropagation, cnn, rnn, lstm, autoencoder, vae, contrastive, attention, positional-encoding, transformer, llm, diffusion, bayes-classifier, error-decomposition, pac, vc-dimension, mdp, value-functions, bellman, dynamic-programming, q-learning, policy-gradient`.

11 groups:
`foundations, supervised, trees, unsupervised, neural, sequential, representation, modern, generative, theory, rl`.

---

## Hard rules (do not violate)

1. **Solo-author git.** Never add `Co-Authored-By:`. Never mention Claude / Anthropic / "generated by AI" anywhere. Use the existing global `user.name` / `user.email`.
2. **Commit messages read like a tired human.** Lowercase, plain, short. No emojis, no scope prefixes (`feat:` / `fix:`) unless natural. Multi-line bodies fine. **No trailing attribution lines.**
3. **Every change pushes.** After committing, `git push` immediately. Standing rule.
4. **Course PDFs never committed.** They live in the parent dir; symlinks are `.gitignore`d.
5. **HW problems are paraphrased, not reproduced.** Problem labels are 1-line summaries of what each problem tests; answer sketches are my own conceptual reasoning. Always link to the source PDF for the full text. Never paste verbatim from `hw*_sol.pdf`.
6. **English is the default language.** First-time visitors see English. `localStorage` key `ml_review_lang_v1` accepts only `en` (default) and `cn`. If legacy `mixed` is found, normalize it to `en`. Static HTML markup uses `<html lang="en" data-lang="en">`.
7. **No Chinese in pure-EN mode anywhere visible.** This is enforced by an HTMLParser-based scan (every `data` event with CJK must have an `.en-only` / `.cn-only` / `data-i18n` ancestor). Run the scan after any content change — see "EN-leak audit" below.
8. **One algorithm per cell, one page per topic.** No "Linear / Logistic" combo cards. The 37 slugs above are canonical.
9. **No README/AGENT generation unless asked.** Don't proactively create planning docs.

---

## Language modes (2-mode i18n)

The site has two language modes. The old `mixed` / EN+中 mode is discarded. Do not reintroduce an EN+中 button or a mixed-mode reading surface.

| Mode | Behavior |
| ---- | -------- |
| `en` | **Pure English.** `.cn-only` and any legacy `.mixed-only` hidden via CSS; `.bi-text .cn` hidden. No CJK characters appear in visible EN-mode prose or controls. Default for new users. |
| `cn` | **Chinese-dominant, English keywords inline.** Body prose is in Chinese, but technical terms that originated in English stay in English the first time they appear, often paired as `中文 / English`. `.en-only` and `.mixed-only` hidden; `.bi-text .en` hidden. |

### What "Chinese-dominant + English keywords" actually means

The CN body is a real Chinese explanation, not a literal translation of the English page. But ML jargon that students will see in papers, slides, and code stays in its English form rather than being translated into awkward Chinese. Examples of acceptable inline English in CN mode:

- Technical terms on first mention: `条件独立 / Conditional independence`, `半正定 (PSD)`, `特征值 / eigenvalue`.
- Terms with no clean Chinese equivalent: `Hessian`, `Lagrangian`, `Jacobian`, `softmax`, `posterior`, `prior`, `kernel trick`, `Slater`.
- Code identifiers, variable names, math symbols, and slogans: `posterior $\propto$ likelihood × prior`.
- Library / framework / model names: `PyTorch`, `Transformer`, `ReLU`.

What is NOT acceptable in CN mode:

- A whole English sentence sitting in CN body prose.
- Translating Chinese back into English when there is a perfectly natural Chinese phrasing (e.g., write "梯度下降" not "梯度下降 (gradient descent)" everywhere — keep the EN keyword for first mention only).
- Pasting the EN paragraph as a "翻译" alongside.

### Toggle component

A two-button switch in the topbar (segmented control with a sliding thumb), order **fixed**: `EN | CN` left → right. Thumb is positioned with JS via `getBoundingClientRect()` of the active button — no fragile percentage math. CSS `[data-active="..."]` rules give a fallback before JS runs. See `assets/i18n.js` `alignSliderThumb()`.

Language switching must preserve the user's viewport position. `assets/i18n.js` captures the visible topic heading / anchor before changing `data-lang`, then restores the corresponding heading to the same screen position after the DOM visibility changes. Do not remove this behavior or replace it with a raw `applyLang()` call from the language buttons; switching EN / CN should feel stationary, not like the page jumped.

### Bilingual content patterns

```html
<!-- UI chrome via dictionary lookup -->
<button data-i18n="home.btn.export">📤 Save to file</button>
<input data-i18n="search.placeholder" data-i18n-attr="placeholder" placeholder="..." />

<!-- Body content with parallel siblings (CSS shows the right one) -->
<h2><span class="en-only">Probability</span><span class="cn-only">概率论</span></h2>

<!-- Inline data attribute pattern (atlas cards, index table) -->
<span data-cn="概率论" data-en="Probability">概率论</span>

<!-- Source-note style (kept for legacy callouts; new pages should prefer .en-only / .cn-only) -->
<div class="bi-text">
  <span class="en">English summary.</span>
  <span class="cn">中文摘要。</span>
</div>
```

### Topic pages — parallel structure

```html
<h1><span class="en-only">Probability</span><span class="cn-only">概率论</span></h1>
<div class="subtitle">
  <span class="en-only">Bayes · Conditional · Expectation</span>
  <span class="cn-only">Bayes · 条件概率 · 期望</span>
</div>

<div class="en-only">
  <section class="topic" id="probability-en">…full English body, all 9 sections…</section>
</div>
<div class="cn-only">
  <section class="topic" id="probability-cn">…平行的中文版本，9 节齐全，技术名词保留英文…</section>
</div>

<!-- Python code injected at runtime by main.js, language-agnostic -->
```

The CN section ships every one of the 9 sections present in EN; the CN reader gets the same teaching depth. A page with 9 EN sections and only 6 CN sections is incomplete.

`topics-data.js` groups + topics carry **both** `name_en` / `name_cn` and `sub_en` / `sub_cn`. No single-language fields.

### Legacy mixed-mode hooks

`.mixed-only`, `.mixed-hide`, and `lbl-en` / `lbl-cn` stacking are legacy. Do not introduce new mixed-mode bodies. If legacy mixed-only content exists, it should remain hidden in both active modes until it is cleaned up.

---

## Progress system

### Storage shape (localStorage key `ml_review_progress_v1`)

```js
{
  "probability": true,                      // master flag (Mark as mastered)
  "tut:probability": true,                  // tutorial read in popup
  "prob:svm:hw2-2": true,                   // a HW problem checked in popup
  "prob:svm:hw2-3-3": true,
  …
}
```

### Per-card progress is fractional

`assets/popup.js` and the home grid in `index.html` compute:

```
fraction = (tutorial-checked + problems-checked) / (1 + total_problems)
                                                 ↑ if data has tutorial
```

If the master flag `p[slug]` is set, fraction is **1.0** regardless of problem state. The `.progress-bar .fill` width is `fraction * 100%`; cards earn `.done` only at 100%; the home ring `progressNum / progressTotal` counts cards at 100%.

### Custom events

| Event                    | Fired by                                     | Listened by |
| ------------------------ | -------------------------------------------- | ----------- |
| `ml-progress-loaded`     | `progress-sync.js` after `GET /api/progress` succeeds | `main.js` (re-paints), home grid (re-renders) |
| `ml-progress-rerender`   | popup checkbox toggles, mark-as-mastered, import | home grid `markProgress()` |

### Persistence layers

```
[ user clicks something ]
        │
        ▼
localStorage.setItem(KEY, …)
        │     ↑ patched by progress-sync.js
        ▼
debounce 300 ms → POST /api/progress
        │
        ▼
serve.py writes progress.json next to itself
```

On boot and on tab `focus`, `progress-sync.js` does `GET /api/progress` and merges (local wins on conflicts). If the endpoint isn't there (plain `python3 -m http.server`, file://, GitHub Pages), it silently falls back to localStorage-only.

### Export / Import

`window.MLProgress.export()` and `.import()` round-trip a JSON file. Useful when a user changes browsers, machines, or clears cache. Buttons live in the home sidebar with hover tooltips and a help paragraph spelling out use cases.

---

## Script load order (matters!)

Every page loads scripts in this order:

```html
<script src="assets/progress-sync.js"></script>      <!-- patches localStorage; must be FIRST -->
<script src="assets/i18n.js"></script>               <!-- reads localStorage immediately -->
<script src="assets/topics-data.js"></script>        <!-- GROUPS + TOPICS -->
<script src="assets/popup-data.js"></script>         <!-- POPUP_DATA (tutorials, code, problems) -->
<script src="assets/popup.js"></script>              <!-- exposes window.openTopicPopup -->
<script src="assets/main.js"></script>               <!-- progress, search, code-section injector -->
<!-- per-page extras, in order, AFTER main.js -->
<script type="module" src="assets/atlas-rf.js"></script>     <!-- index.html only -->
<script src="assets/algorithm-tags.js"></script>             <!-- algorithms.html only -->
<script src="assets/algorithm-index.js"></script>            <!-- algorithms.html only -->
<script src="assets/equation-sheet.js"></script>             <!-- cheatsheet.html only -->
<script src="assets/problems-page.js"></script>              <!-- problems.html only -->
```

`atlas-rf.js` is a `type="module"` script (deferred by spec), so it runs after the synchronous scripts above — by then `window.GROUPS` / `TOPICS` / `POPUP_DATA` are populated. The `algorithm-tags.js` file must load before `algorithm-index.js` (the renderer reads `window.TOPIC_TAGS` and `window.TAG_DIMENSIONS`).

If you ever introduce a script that touches localStorage, make sure `progress-sync.js` still loads before it.

---

## Atlas (React Flow) homepage

The Atlas view (default) and the Mermaid view share the same `<section class="home-shell">` shell — full-viewport (`calc(100vh - 65px)`) and **outside `.page`**, so it's not constrained by the `max-width: 1400px` page wrapper. The shell holds, in z-order:

```
.home-shell
├── .roadmap.atlas-rf#roadmap        — React Flow canvas (background, full-bleed)
├── .mermaid-view#mermaidView         — alt view, display:none by default
├── .side-card.floating               — top-left progress / legend / actions overlay
└── .view-switch.floating#viewSwitch  — top-right Atlas / Mermaid tab pill
```

`atlas-rf.js` mounts a React Flow tree into `#rfMount` (a child of `.roadmap.atlas-rf`):

- Layout coordinates are **hand-placed** in `GROUP_LAYOUT` (top-left of each group + column count). Card width / height / per-group dimensions are computed from `CARD_W` / `CARD_H` / `CARD_GAP` / `PAD_X` / `PAD_TOP` / `PAD_BOTTOM` constants. Re-tune coordinates here when groups change — don't go back to auto-flow.
- Topic cards are React Flow children of their group node (`parentId: "g-<gid>"` + `extent: "parent"`), so they move and clip with the parent.
- Each node carries 4 invisible Handles (`tt / tb / tl / tr` for target, `st / sb / sl / sr` for source) so edges can pick a specific exit / entry direction. Edge specs are object form: `{ from, to, sh, th, dashed? }`.
- Edges are `smoothstep`, default stroke `#aeb4c0` / 2.6px; **animated** + green (`#10b981` / 3.0px) when the source group is fully complete and the target group isn't (the user's "next thing to study" frontier). `dashed: true` flags analytical / cross-cutting links (currently `g-foundations → g-theory`).
- Click → React Flow's `onNodeClick` → `window.openTopicPopup(node.id, eventTarget)`. **Don't replace this with a custom drawer.** popup.js already handles viewport-aware flipping (above/below + left clamp + capped maxHeight).
- Cmd/Ctrl/Shift-click → `window.open("topics/<slug>.html", "_blank")`.
- `fitView` runs on mount and on every `ResizeObserver` tick of `#roadmap` (padding `0.16`, duration `120`). View-switching to Mermaid hides the Atlas via `display:none`; switching back fires the observer and re-fits. **Container is `width:100% / height:100%`** — never style it with a graph-derived pixel height.
- Reaching 100% across all topics fires `window.confetti(...)` once (re-arms when the user uncompletes anything).

`popup.js` listens for clicks on `.node[data-slug]`. The React Flow cards use class `.rf-topic` (not `.node`), so popup.js's auto-listener does NOT intercept them — that's intentional, the click goes through `onNodeClick` instead. Don't add `.node` to the React Flow cards.

---

## Standalone pages off the homepage

The homepage was getting overloaded, so two indices live as their own pages now:

### `algorithms.html` — Complete Algorithm Index with filter chips

Renders all 37 topics grouped by Block, with a collapsible filter panel above. Closed by default (so first paint is just the index). Opening it reveals chips for three **ML-knowledge** dimensions only:

| Dimension | Chips | Source |
| --- | --- | --- |
| 🧭 Learning paradigm | Supervised / Unsupervised / Self-supervised / Reinforcement / Theory | `TOPIC_TAGS[slug].paradigm` |
| 🎬 Task | Classification / Regression / Clustering / Dim-reduction / Representation / Sequence / Generation / Decision / Theoretical bound | `TOPIC_TAGS[slug].task` |
| 🧬 Model family | Classical / Linear / Non-parametric / Probabilistic / Kernel / Tree-based / Ensemble / Neural / Deep / RL | `TOPIC_TAGS[slug].family` |

Block / Group are NOT a filter dimension (already implicit in the section headers below). Difficulty isn't either (already shown via the colored dot on each card). Adding course-org metadata as filter chips clutters the panel — keep this page about ML knowledge taxonomy.

`algorithm-tags.js` exports `window.TOPIC_TAGS` (slug → 3-axis tag arrays) and `window.TAG_DIMENSIONS` (chip definitions with `valueLabels` for both EN / CN). `algorithm-index.js` does the rendering and chip toggling. State shape is `{ paradigm: Set, task: Set, family: Set }` — chips check on by default, filters narrow the set. The visibility predicate is "**topic with no values for a dim is NOT filtered by that dim**" — that's how foundation topics (probability / linear-algebra / optimization) and theory topics (Bayes / PAC / VC) stay visible across all chip combinations without forcing them into stretched ML-model categories.

Per-dimension `all` / `none` mini-buttons at each section head; global `Select all` / `Clear all` / `Reset` in the top bar (only visible when the panel is open). Search box on the topbar filters cards by name/sub haystack on top of the chip filters; whole groups hide when their last row is hidden.

### `problems.html` — HW problem aggregator

`assets/problems-page.js` walks every entry in `POPUP_DATA[slug].problems`, groups by HW number (and Block where useful), and renders a flat checklist. Same checkbox storage as the popup (`prob:slug:pid` localStorage keys), so a check on the index reflects the same flag the topic popup toggles. Useful for "show me everything I haven't ticked off yet" study sessions.

### Cheatsheet rebuild — `cheatsheet.html` + `equation-sheet.js`

`cheatsheet.html` is a thin shell; the actual content lives in `assets/equation-sheet.js` as data (one entry per topic, with a list of formula blocks each carrying an EN + CN explanation, the LaTeX, and an optional worked-example fragment). The cheatsheet renderer iterates that list and emits the purple formula callouts. To add a new equation, edit the data file — don't touch the HTML.

---

## Workflow when changing things

1. Make edits (`Edit` for known files, `Write` for new files, throwaway Python in `/tmp/` for bulk transforms — keep them idempotent).
2. Smoke-test:
   ```bash
   cd "ML Review"
   python3 serve.py 8821 &  # any unused port
   curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8821/
   curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8821/topics/svm.html
   curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8821/api/progress  # 200 with serve.py
   ```
3. **EN-leak audit** if any content was touched (see snippet below).
4. `git add -A && git commit -m "<lowercase one-liner>" && git push`.
5. Tell the user concisely what changed.

### EN-leak audit (HTMLParser-based)

Save as `/tmp/leak.py` and run from the repo:

```python
import re
from html.parser import HTMLParser
from pathlib import Path

class S(HTMLParser):
    def __init__(self): super().__init__(); self.lang=0; self.i18n=0; self.skip=0; self.st=[]; self.leaks=[]
    def handle_starttag(self, t, attrs):
        a = dict(attrs); cls = (a.get("class") or "").split()
        if t in ("script","style"): self.skip += 1
        in_lang = "en-only" in cls or "cn-only" in cls
        if in_lang: self.lang += 1
        if "data-i18n" in a: self.i18n += 1
        self.st.append((in_lang, "data-i18n" in a))
    def handle_endtag(self, t):
        if t in ("script","style"): self.skip = max(0, self.skip-1); return
        if not self.st: return
        il, hi = self.st.pop()
        if il: self.lang -= 1
        if hi: self.i18n -= 1
    def handle_data(self, d):
        if self.skip or self.lang or self.i18n: return
        if re.search(r"[一-鿿]", d):
            s = d.strip()
            if s: self.leaks.append((self.getpos(), s[:80]))

for p in [*Path(".").glob("*.html"), *Path("topics").glob("*.html")]:
    s = S(); s.feed(p.read_text(encoding="utf-8"))
    if s.leaks:
        print(f"{p}: {len(s.leaks)}")
        for pos, t in s.leaks[:3]: print(f"  {pos}: {t}")
```

Target: **0 leaks** across all pages. Wrap any leak in `<span class="en-only">EN</span><span class="cn-only">CN</span>`.

---

## Build / deploy

- `python3 serve.py [port]` — local dev with progress persistence (default 8000). Falls through to `SimpleHTTPRequestHandler` for static files; adds `GET /api/progress` and `POST /api/progress` endpoints. Quiet log mode (drops the access line for `/api/progress`).
- `python3 -m http.server [port]` — works too, but progress is per-origin localStorage (so a port change wipes it).
- `git push origin main` — triggers `.github/workflows/deploy.yml` which `actions/configure-pages@v5` + `upload-pages-artifact@v3` + `deploy-pages@v4`. Requires repo Settings → Pages → Source: GitHub Actions (one-time setup; user has done this).

---

## Source-note structure (for content updates)

`Block 1-4.rtf` and `Block 5-10.rtf` are the user's consolidated notes (source of truth). Each "Block" maps to a chapter:

| Block | Topics | Slugs |
| --- | --- | --- |
| 1 | Foundations | probability, linear-algebra, optimization |
| 2 | KNN, NB | knn, naive-bayes |
| 3 | Linear, Logistic, SVM, Kernel | linear-regression, logistic-regression, svm, kernel-methods |
| 4 | Trees, Ensemble, PCA, K-means | decision-trees, bagging, boosting, pca, kmeans |
| 5 | Deep learning core | mlp, backpropagation, cnn, rnn, lstm |
| 6 | AE / VAE / Contrastive | autoencoder, vae, contrastive |
| 7 | Attention, PE, Transformer, LLM | attention, positional-encoding, transformer, llm |
| 8 | Diffusion | diffusion |
| 9 | Learning theory | bayes-classifier, error-decomposition, pac, vc-dimension |
| 10 | RL | mdp, value-functions, bellman, dynamic-programming, q-learning, policy-gradient |

When the user asks to "update content" without naming a section, infer from this table.

---

## Common pitfalls

- **Forgetting to dispatch `ml-progress-rerender`** after a localStorage progress change — UI stays stale until a reload. Any new place that mutates progress must dispatch.
- **Inserting a script before `progress-sync.js`** — breaks the localStorage patch. Always put `progress-sync.js` first in `<script>` tags.
- **Adding `data-i18n` without entries in `assets/i18n.js`** — element keeps its placeholder text in all modes. Always add the dictionary entry.
- **Forgetting `sub_en` on a new topic / group** — the home index table will show empty cells in EN mode. Always add both `sub_en` and `sub_cn`.
- **Writing a CN body that is just a literal translation of the EN one** — the CN reader expects natural Chinese with English keywords inline (`Hessian`, `PSD`, `Lagrangian`, `softmax`), not a word-for-word render. See "Language modes" above.
- **Reading TOC from `h2.textContent` without filtering** — picks up both EN and CN headings. Filter by `closest('.en-only' / '.cn-only')` ancestor.
- **Spinning up another http.server on a different port for testing** — kills cross-session progress. Stick to one port (or use `serve.py` which makes it irrelevant).
- **Committing `progress.json`** — git-ignored already, but double-check on big patches.
- **Dropping the `react/` / `react-dom/` trailing-slash entries from the import map** — `@xyflow/react` imports `react/jsx-runtime` and the canvas renders blank with no console error if those mappings are missing.
- **Replacing `window.openTopicPopup` with a custom drawer / direct navigation** — the user has stated multiple times they want the click-anchored popover. Click stays wired to `onNodeClick → window.openTopicPopup(node.id, anchor)`.
- **Setting the React Flow container height from `buildLayout().height`** — that turns the page into a long-image scroll. The shell is `calc(100vh - 65px)`; the canvas is `width:100% / height:100%`; `fitView` handles scaling.
- **Adding `.node` class to React Flow cards** — popup.js's auto-listener would then double-fire alongside `onNodeClick`. React Flow cards use `.rf-topic` only.
- **Tuning edges with `sourceHandle: "sb" / targetHandle: "tt"` everywhere** — every fork collapses onto the same vector. Use the directional handles (`sl / sr / sb / sb` etc.) per-edge in the object-form `CONNS`.
- **Detail topic page that just rephrases the slide bullet.** The 9-section template (Concept Understanding → Quick Checklist) is the bar — see [class-material-to-website](~/.claude/skills/class-material-to-website/SKILL.md#topic-detail-page--9-section-template). Each section must be present in both EN and CN parallel bodies (CN is Chinese-dominant with English keywords inline, not a literal translation).
- **Adding chips for course-org metadata to the algorithm index filter** — the user has explicitly trimmed the filter taxonomy to ML-knowledge axes (paradigm / task / family). Block / Group is already the section heading; difficulty is already the colored dot. Don't add them back as filter chips.
- **Hard-coding lecture / hw chips on a topic page** — they're now derived from `topics-data.js` (`lectures` + `hw` arrays) and rendered automatically. Update the data file, not the HTML.
- **Forgetting to add a new page to all five nav menus** — `index.html`, `algorithms.html`, `cheatsheet.html`, `problems.html`, `resources.html`, plus all 37 `topics/*.html`. The nav uses relative paths (`../algorithms.html` from a topic page, `algorithms.html` from a top-level page). When adding a nav link, do it on every page or it'll feel inconsistent on the pages that miss it.
