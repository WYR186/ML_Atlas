// === Progress tracking via localStorage ===
const STORAGE_KEY = "ml_review_progress_v1";
function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function setProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
function markBlockDone(block, done) {
  const p = getProgress();
  p[block] = !!done;
  setProgress(p);
}

// === Render homepage progress + index table ===
function paintProgressOnHome() {
  const p = getProgress();
  const total = 10;
  const done = Object.keys(p).filter(k => p[k] && /^[0-9]+$/.test(k)).length;
  const num = document.getElementById("progressNum");
  const circle = document.getElementById("progressCircle");
  if (num) num.textContent = done;
  if (circle) {
    const C = 2 * Math.PI * 33;
    circle.setAttribute("stroke-dasharray", C.toFixed(2));
    circle.setAttribute("stroke-dashoffset", (C * (1 - done/total)).toFixed(2));
  }
  document.querySelectorAll(".node[data-block]").forEach(node => {
    const b = node.getAttribute("data-block").replace(/[a-z]+$/, "");
    if (p[b]) node.classList.add("done");
  });
}

function renderIndexTable() {
  const root = document.getElementById("indexTable");
  if (!root || !window.COURSE_INDEX) return;
  const rows = window.COURSE_INDEX.map(b => `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
        <h3 style="margin: 0; font-size: 17px;">
          <a href="${b.href}" style="color: var(--text);">📦 Block ${b.block} · ${b.title}</a>
        </h3>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${b.lectures.map(l => `<a class="ref-chip lecture" href="slides/${l}.pdf" target="_blank">📄 ${l.replace('_',' ')}</a>`).join("")}
          ${b.homework.map(h => `<a class="ref-chip hw" href="HW/${h}.pdf" target="_blank">📝 ${h}</a>`).join("")}
        </div>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
        <thead>
          <tr style="text-align: left; color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
            <th style="padding: 6px 8px; width: 28%;" data-i18n="home.col.topic">Algorithm / Topic</th>
            <th style="padding: 6px 8px; width: 36%;" data-i18n="home.col.goal">Core Goal</th>
            <th style="padding: 6px 8px;" data-i18n="home.col.exam">Exam Focus</th>
          </tr>
        </thead>
        <tbody>
          ${b.items.map(it => `
            <tr style="border-top: 1px solid var(--border);">
              <td style="padding: 10px 8px; font-weight: 600;">
                <a href="${b.href}#${it.anchor}">${it.name}</a>
              </td>
              <td style="padding: 10px 8px; color: var(--text-soft);">${it.goal}</td>
              <td style="padding: 10px 8px; color: var(--text-soft);">${it.exam}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `).join("");
  root.innerHTML = rows;
  // Re-apply current language to newly inserted nodes.
  if (typeof applyLang === "function") applyLang(getLang ? getLang() : (localStorage.getItem("ml_review_lang_v1") || "en"));
}

// === Search across topics ===
// Filters both the legacy .node / .section-node cards (used on the
// Block detail pages) AND the React Flow .rf-topic cards on the
// homepage. For React Flow cards we look up the slug in window.TOPICS
// so we can match name_en / name_cn / sub_en / sub_cn / slug — the
// rendered text alone hides whichever language is hidden by i18n.
function setupSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const haystack = (slug) => {
    const t = (window.TOPICS || []).find(x => x.slug === slug);
    if (!t) return slug;
    return [
      slug, t.name_en, t.name_cn, t.sub_en, t.sub_cn,
    ].filter(Boolean).join(" ").toLowerCase();
  };

  const apply = (q) => {
    // Legacy cards (Block detail pages). Scoped to `a.node` so we
    // don't accidentally dim Mermaid's SVG `<g class="node">`.
    document.querySelectorAll("a.node, .section-node").forEach(n => {
      if (!q) { n.style.opacity = "1"; return; }
      n.style.opacity = n.textContent.toLowerCase().includes(q) ? "1" : "0.25";
    });
    // React Flow topic cards on the homepage.
    document.querySelectorAll(".rf-topic[data-slug]").forEach(n => {
      n.classList.remove("search-hit", "search-miss");
      if (!q) return;
      const hit = haystack(n.dataset.slug).includes(q);
      n.classList.add(hit ? "search-hit" : "search-miss");
    });
  };

  input.addEventListener("input", () => apply(input.value.trim().toLowerCase()));
  // Re-apply once after React Flow mounts (DOM nodes might not exist
  // when setupSearch first runs).
  document.addEventListener("ml-progress-loaded", () => apply(input.value.trim().toLowerCase()));
}

// === Collapsible homepage Progress panel ===
const PROGRESS_PANEL_KEY = "ml_review_progress_panel_collapsed_v1";
function setupProgressPanelCollapse() {
  const shell = document.querySelector(".home-shell");
  const panel = document.getElementById("progressPanel");
  const body = document.getElementById("progressPanelBody");
  const toggle = document.getElementById("progressPanelToggle");
  if (!shell || !panel || !body || !toggle) return;

  const currentLang = () => {
    if (typeof getLang === "function") return getLang();
    return localStorage.getItem("ml_review_lang_v1") === "cn" ? "cn" : "en";
  };

  function updateToggleLabel(collapsed) {
    const lang = currentLang();
    const label = collapsed
      ? (lang === "cn" ? "展开进度面板" : "Expand progress panel")
      : (lang === "cn" ? "收起进度面板" : "Collapse progress panel");
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }

  function setCollapsed(collapsed, persist = true) {
    shell.classList.toggle("progress-panel-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    body.setAttribute("aria-hidden", String(collapsed));
    if (collapsed) body.setAttribute("inert", "");
    else body.removeAttribute("inert");
    updateToggleLabel(collapsed);
    if (persist) localStorage.setItem(PROGRESS_PANEL_KEY, collapsed ? "1" : "0");
  }

  setCollapsed(localStorage.getItem(PROGRESS_PANEL_KEY) === "1", false);
  toggle.addEventListener("click", () => {
    setCollapsed(!shell.classList.contains("progress-panel-collapsed"));
  });
  document.addEventListener("click", e => {
    if (e.target.closest(".lang-switch button")) {
      setTimeout(() => updateToggleLabel(shell.classList.contains("progress-panel-collapsed")), 0);
    }
  });
}
setupProgressPanelCollapse();

// === Topic-page equation source anchors ===
function equationSourceSlug(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\\[a-z]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "formula";
}

function setupEquationSourceAnchors() {
  const file = (location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  if (!file || file === "index" || file === "cheatsheet") return;

  const seen = new Map();
  const isChineseOnly = el => !!el.closest(".cn-only");
  const cleanTitle = el => (el && el.textContent || "").replace(/\s+/g, " ").trim();

  function assign(el, title) {
    if (!el || isChineseOnly(el)) return;
    const label = String(title || "").replace(/\s+/g, " ").trim();
    if (!label) return;
    const base = equationSourceSlug(label);
    seen.set(base, (seen.get(base) || 0) + 1);
    const suffix = seen.get(base) === 1 ? "" : `-${seen.get(base)}`;
    el.id = `eq-${file}-${base}${suffix}`;
    el.classList.add("eq-source-anchor");
  }

  document.querySelectorAll(".callout.formula").forEach(callout => {
    assign(callout, cleanTitle(callout.querySelector(".head")));
  });

  document.querySelectorAll("section.topic.lesson-section.equations h3, section.topic.lesson-section.equations h4").forEach(heading => {
    assign(heading, cleanTitle(heading));
  });

  document.querySelectorAll("section.topic.lesson-section.equations .cols2 > div").forEach(card => {
    assign(card, cleanTitle(card.querySelector("h3, h4, .head")));
  });

  document.querySelectorAll("section.topic .cols2 > div").forEach(card => {
    if (card.matches(".callout.formula")) return;
    if (!card.querySelector(".eq")) return;
    assign(card, cleanTitle(card.querySelector("h3, h4, .head")));
  });

  document.querySelectorAll("section.topic > h3 + .eq").forEach(eq => {
    const heading = eq.previousElementSibling;
    if (heading && /key equations/i.test(cleanTitle(heading))) assign(eq, "Core equation");
  });

  document.querySelectorAll("section.topic.examples h3, section.topic.examples h4, section.topic.tips h3, section.topic.tips h4").forEach(heading => {
    assign(heading, cleanTitle(heading));
  });

  document.querySelectorAll("section.topic .mini-list h4").forEach(heading => {
    assign(heading, cleanTitle(heading));
  });

  document.querySelectorAll(".callout.example .head").forEach(head => {
    assign(head.closest(".callout") || head, cleanTitle(head));
  });

  if (location.hash && location.hash.slice(1).startsWith("eq-")) {
    requestAnimationFrame(() => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ block: "start" });
    });
  }
}

function topicEquationSheetUrl() {
  const mainScript = document.querySelector('script[src$="assets/main.js"], script[src$="/main.js"]');
  if (mainScript && mainScript.src) return new URL("equation-sheet.js", mainScript.src).href;
  return new URL(location.pathname.includes("/topics/") ? "../assets/equation-sheet.js" : "assets/equation-sheet.js", location.href).href;
}

function loadTopicEquationSheet() {
  if (window.EQUATION_SHEET) return Promise.resolve(window.EQUATION_SHEET);
  if (window.__topicEquationSheetPromise) return window.__topicEquationSheetPromise;

  const existing = Array.from(document.scripts).find(s => /equation-sheet\.js(?:\?|$)/.test(s.src || ""));
  if (existing) {
    window.__topicEquationSheetPromise = new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(window.EQUATION_SHEET), { once: true });
      existing.addEventListener("error", reject, { once: true });
      setTimeout(() => window.EQUATION_SHEET ? resolve(window.EQUATION_SHEET) : reject(new Error("Equation sheet did not load")), 4000);
    });
    return window.__topicEquationSheetPromise;
  }

  window.__topicEquationSheetPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = topicEquationSheetUrl();
    script.defer = true;
    script.dataset.topicEquationSheet = "1";
    script.addEventListener("load", () => resolve(window.EQUATION_SHEET), { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
  return window.__topicEquationSheetPromise;
}

function topicEquationSourceId(item, slug) {
  const source = item && item.source || "";
  const hashIndex = source.indexOf("#");
  if (hashIndex >= 0) return source.slice(hashIndex + 1);
  return item && item.title ? `eq-${slug}-${equationSourceSlug(item.title)}` : "";
}

function topicExplanationAlreadyPresent(node) {
  if (!node) return false;
  if (node.querySelector && node.querySelector(":scope > .equation-explain, :scope > .equation-explain-wrap")) return true;
  const next = node.nextElementSibling;
  return !!(next && next.matches(".equation-explain, .equation-explain-wrap"));
}

function topicFormulaTargetsIn(wrapper, target) {
  if (!wrapper || !target) return [];
  if (target.matches("h3, h4")) return Array.from(wrapper.querySelectorAll("section.topic h3, section.topic h4"));
  return Array.from(wrapper.querySelectorAll(".callout.formula, .cols2 > div, .study-box"))
    .filter(el => el.querySelector(".eq"));
}

function topicLanguagePeerWrapper(wrapper) {
  const selector = wrapper.classList.contains("en-only") ? ".cn-only" : ".en-only";
  return Array.from(document.querySelectorAll(selector)).find(el => el.querySelector("section.topic")) || null;
}

function topicMirroredTarget(target) {
  const wrapper = target && target.closest(".en-only, .cn-only");
  if (!wrapper) return null;
  const peer = topicLanguagePeerWrapper(wrapper);
  if (!peer) return null;

  const sourceTargets = topicFormulaTargetsIn(wrapper, target);
  const index = sourceTargets.indexOf(target);
  if (index < 0) return null;
  return topicFormulaTargetsIn(peer, target)[index] || null;
}

function topicEquationInsertionPoint(target) {
  if (!target) return null;
  if (target.matches(".callout.formula, .callout") && target.querySelector(".eq")) {
    return { mode: "inside", node: target };
  }
  if (target.querySelector && target.querySelector(":scope > .eq")) {
    return { mode: "inside", node: target };
  }
  if (target.matches("h3, h4")) {
    let cursor = target.nextElementSibling;
    let anchor = null;
    while (cursor && !cursor.matches("h2, h3, h4")) {
      anchor = cursor;
      cursor = cursor.nextElementSibling;
    }
    return { mode: "after", node: anchor || target };
  }
  return { mode: "after", node: target };
}

function typesetTopicEquationExplanations(nodes) {
  if (!nodes.length || !window.MathJax || !MathJax.typesetPromise) return;
  const run = () => MathJax.typesetPromise(nodes).catch(() => {});
  if (MathJax.startup && MathJax.startup.promise) MathJax.startup.promise.then(run);
  else run();
}

function applyTopicEquationExplanations(slug) {
  const sheet = window.EQUATION_SHEET;
  const items = slug && sheet && sheet.data && sheet.data[slug];
  if (!items || !items.length || typeof sheet.explain !== "function") return;

  const inserted = [];
  items.forEach(item => {
    const id = topicEquationSourceId(item, slug);
    const target = id && document.getElementById(id);
    const targets = [target, topicMirroredTarget(target)].filter(Boolean);
    targets.forEach(eachTarget => {
      const point = topicEquationInsertionPoint(eachTarget);
      if (!point || !point.node || topicExplanationAlreadyPresent(point.node)) return;

      const html = sheet.explain(item).replace(
        '<details class="equation-explain-wrap">',
        '<details class="equation-explain-wrap" open>'
      );
      if (!html) return;
      if (point.mode === "inside") point.node.insertAdjacentHTML("beforeend", html);
      else point.node.insertAdjacentHTML("afterend", html);
      const added = point.mode === "inside" ? point.node.lastElementChild : point.node.nextElementSibling;
      if (added) {
        if (added.matches(".equation-explain-wrap")) added.open = true;
        added.dataset.topicEquationExplain = "1";
        inserted.push(added);
      }
    });
  });

  typesetTopicEquationExplanations(inserted);
}

function setupTopicEquationExplanations() {
  const markBtn = document.getElementById("markRead");
  const slug = markBtn && markBtn.dataset.block;
  if (!slug || !document.querySelector("section.topic .eq")) return;

  if (window.EQUATION_SHEET) {
    applyTopicEquationExplanations(slug);
    return;
  }
  loadTopicEquationSheet()
    .then(() => applyTopicEquationExplanations(slug))
    .catch(() => {});
}

// === Collapsible topic-page table of contents ===
const TOPIC_TOC_KEY = "ml_review_topic_toc_collapsed_v1";
function reviewLang() {
  if (typeof getLang === "function") return getLang();
  const v = localStorage.getItem("ml_review_lang_v1");
  return v === "cn" ? "cn" : "en";
}

function labelForLang(en, cn, lang = reviewLang()) {
  if (lang === "cn") return cn || en;
  return en || cn;
}

function topicName(topic, lang = reviewLang()) {
  if (!topic) return "";
  return labelForLang(topic.name_en, topic.name_cn, lang);
}

function groupName(groupId, lang = reviewLang()) {
  const group = (window.GROUPS || []).find(g => g.id === groupId);
  if (!group) return "";
  return labelForLang(group.name_en, group.name_cn, lang);
}

function slugPart(text) {
  const s = String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "section";
}

function elementIsVisible(el) {
  if (!el || !el.isConnected || !el.getClientRects().length) return false;
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}

function setupTopicPageToc() {
  const aside = document.querySelector(".toc");
  const main = document.querySelector(".block-main");
  const toc = document.getElementById("topicToc");
  const markBtn = document.getElementById("markRead");
  if (!aside || !main || !toc || !markBtn) return;

  const page = aside.closest(".block-page");
  const slug = markBtn.dataset.block;
  const currentTopic = (window.TOPICS || []).find(t => t.slug === slug);
  const topAnchor = main.querySelector(".block-header") || main;
  topAnchor.id = topAnchor.id || "topic-top";
  topAnchor.style.scrollMarginTop = topAnchor.style.scrollMarginTop || "86px";

  function ensurePanelChrome() {
    let body = aside.querySelector(".toc-panel-body");
    if (!body) {
      body = document.createElement("div");
      body.className = "toc-panel-body";
      body.id = "topicTocPanelBody";

      while (aside.firstChild) body.appendChild(aside.firstChild);

      const toggle = document.createElement("button");
      toggle.className = "toc-panel-handle";
      toggle.id = "topicTocToggle";
      toggle.type = "button";
      toggle.setAttribute("aria-controls", body.id);
      toggle.innerHTML = '<span class="toc-panel-handle-icon" aria-hidden="true"></span>';

      const collapsedLabel = document.createElement("div");
      collapsedLabel.className = "toc-collapsed-label";
      collapsedLabel.setAttribute("aria-hidden", "true");

      aside.appendChild(toggle);
      aside.appendChild(collapsedLabel);
      aside.appendChild(body);
    }
    return body;
  }

  const body = ensurePanelChrome();
  const toggle = aside.querySelector(".toc-panel-handle");
  const collapsedLabel = aside.querySelector(".toc-collapsed-label");

  function updateCollapseCopy(collapsed) {
    const lang = reviewLang();
    const label = collapsed
      ? labelForLang("Expand table of contents", "展开目录", lang)
      : labelForLang("Collapse table of contents", "收起目录", lang);
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    collapsedLabel.textContent = lang === "cn" ? "目录" : "TOC";
  }

  function setCollapsed(collapsed, persist = true) {
    aside.classList.toggle("is-collapsed", collapsed);
    if (page) page.classList.toggle("toc-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    body.setAttribute("aria-hidden", String(collapsed));
    if (collapsed) body.setAttribute("inert", "");
    else body.removeAttribute("inert");
    updateCollapseCopy(collapsed);
    if (persist) localStorage.setItem(TOPIC_TOC_KEY, collapsed ? "1" : "0");
  }

  setCollapsed(localStorage.getItem(TOPIC_TOC_KEY) === "1", false);
  toggle.addEventListener("click", () => setCollapsed(!aside.classList.contains("is-collapsed")));

  function headingAllowed(el, lang) {
    if (!elementIsVisible(el)) return false;
    if (lang === "en") return !el.closest(".cn-only");
    if (lang === "cn") return !el.closest(".en-only");
    return !el.closest(".cn-only");
  }

  function textForToc(el, lang) {
    const clone = el.cloneNode(true);
    if (lang === "en") clone.querySelectorAll(".cn-only").forEach(n => n.remove());
    if (lang === "cn") clone.querySelectorAll(".en-only").forEach(n => n.remove());
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function headingAnchor(el, index, text) {
    const section = el.closest("section.topic");
    if (el.tagName === "H2" && section?.id) return section.id;
    if (!el.id) {
      const base = section?.id || slug || "topic";
      el.id = `${base}-toc-${index + 1}-${slugPart(text)}`;
    }
    return el.id;
  }

  function buildRoadmap(lang) {
    const topics = window.TOPICS || [];
    const idx = topics.findIndex(t => t.slug === slug);
    if (idx < 0) return null;

    const wrap = document.createElement("div");
    wrap.className = "toc-roadmap";

    const head = document.createElement("div");
    head.className = "toc-section-head";
    const title = document.createElement("span");
    title.textContent = labelForLang("Roadmap Position", "路线位置", lang);
    const count = document.createElement("span");
    count.className = "toc-position-count";
    count.textContent = `${idx + 1}/${topics.length}`;
    head.append(title, count);

    const group = document.createElement("div");
    group.className = "toc-roadmap-group";
    group.textContent = groupName(currentTopic?.group, lang);

    const list = document.createElement("ol");
    list.className = "toc-roadmap-list";
    const start = Math.max(0, idx - 2);
    const end = Math.min(topics.length - 1, idx + 2);
    for (let i = start; i <= end; i += 1) {
      const topic = topics[i];
      const li = document.createElement("li");
      li.className = i === idx ? "current" : "";
      const a = document.createElement("a");
      a.href = i === idx ? "#topic-top" : `${topic.slug}.html`;
      const pos = document.createElement("span");
      pos.className = "toc-roadmap-num";
      pos.textContent = String(i + 1).padStart(2, "0");
      const name = document.createElement("span");
      name.className = "toc-roadmap-name";
      name.textContent = topicName(topic, lang);
      a.append(pos, name);
      li.appendChild(a);
      list.appendChild(li);
    }

    wrap.append(head, group, list);
    return wrap;
  }

  let activeHeadings = [];
  let activeLinks = [];

  function updateActiveTocLink() {
    if (!activeHeadings.length) return;
    const topbar = document.querySelector(".topbar");
    const top = (topbar ? topbar.getBoundingClientRect().height : 0) + 24;
    let active = activeHeadings[0];
    for (const item of activeHeadings) {
      if (item.el.getBoundingClientRect().top <= top) active = item;
      else break;
    }
    activeLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${active.id}`));
  }

  function smoothScrollToHash(hash) {
    if (!hash || hash === "#") return false;
    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return false;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    target.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    if (history.pushState) history.pushState(null, "", hash);
    else location.hash = hash;
    setTimeout(updateActiveTocLink, reduceMotion ? 0 : 180);
    return true;
  }

  function buildProblems(lang) {
    const data = (window.POPUP_DATA || {})[slug];
    const probs = (data && data.problems) || [];
    if (!probs.length) return null;

    const wrap = document.createElement("div");
    wrap.className = "toc-page-section toc-problems-section";

    const head = document.createElement("div");
    head.className = "toc-section-head";
    const title = document.createElement("span");
    title.textContent = labelForLang("Related Problems", "本章题目", lang);
    const count = document.createElement("span");
    count.className = "toc-problems-count";
    count.textContent = String(probs.length);
    head.append(title, count);

    const ul = document.createElement("ul");
    ul.className = "toc-page-list toc-problems-list";

    const progress = (function () {
      try { return JSON.parse(localStorage.getItem("ml_review_progress_v1") || "{}"); }
      catch { return {}; }
    })();

    probs.forEach((pr) => {
      const li = document.createElement("li");
      li.className = "toc-depth-2";
      const a = document.createElement("a");
      // Topic pages live under /topics/, so HW PDFs resolve via ../HW/.
      a.href = pr.hw_pdf || `../HW/${pr.hw}.pdf`;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.className = "toc-problem-link";
      const done = !!progress[`prob:${slug}:${pr.id}`] || !!progress[slug];
      if (done) a.classList.add("toc-problem-done");

      const meta = document.createElement("span");
      meta.className = "toc-problem-meta";
      meta.textContent = `${pr.hw}${pr.section ? " " + pr.section : ""}`;

      const titleEl = document.createElement("span");
      titleEl.className = "toc-problem-title";
      const t = pr.title;
      titleEl.textContent = (t && (lang === "cn" ? (t.cn || t.en) : (t.en || t.cn))) || pr.id;

      a.append(meta, titleEl);
      li.appendChild(a);
      ul.appendChild(li);
    });

    wrap.append(head, ul);
    return wrap;
  }

  function render() {
    const lang = reviewLang();
    const headings = Array.from(main.querySelectorAll("section.topic > h2, section.topic > h3"))
      .filter(el => headingAllowed(el, lang));

    toc.innerHTML = "";

    const roadmap = buildRoadmap(lang);
    if (roadmap) toc.appendChild(roadmap);

    const section = document.createElement("div");
    section.className = "toc-page-section";
    const sectionHead = document.createElement("div");
    sectionHead.className = "toc-section-head";
    sectionHead.textContent = labelForLang("On This Page", "本页内容", lang);
    const ul = document.createElement("ul");
    ul.className = "toc-page-list";

    activeHeadings = [];
    activeLinks = [];
    headings.forEach((el, index) => {
      const text = textForToc(el, lang);
      const id = headingAnchor(el, index, text);
      const li = document.createElement("li");
      li.className = el.tagName === "H2" ? "toc-depth-1" : "toc-depth-2";
      const a = document.createElement("a");
      a.href = `#${id}`;
      a.textContent = text;
      li.appendChild(a);
      ul.appendChild(li);
      activeHeadings.push({ el, id });
      activeLinks.push(a);
    });

    section.append(sectionHead, ul);
    toc.appendChild(section);

    const problems = buildProblems(lang);
    if (problems) toc.appendChild(problems);

    updateCollapseCopy(aside.classList.contains("is-collapsed"));
    requestAnimationFrame(updateActiveTocLink);
  }

  render();
  toc.addEventListener("click", e => {
    const link = e.target.closest("a[href^='#']");
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (smoothScrollToHash(link.getAttribute("href"))) e.preventDefault();
  });
  window.addEventListener("scroll", updateActiveTocLink, { passive: true });
  window.addEventListener("hashchange", () => requestAnimationFrame(updateActiveTocLink));
  document.addEventListener("click", e => {
    if (e.target.closest(".lang-switch button")) {
      setTimeout(render, 30);
    }
  });
  // Re-render TOC when popup checkbox toggles a problem's done state —
  // the related-problems list shows a strike-through for completed
  // problems. Listen for the existing progress event.
  document.addEventListener("ml-progress-rerender", () => {
    requestAnimationFrame(render);
  });
}

// === Draw connector lines on the roadmap ===
function drawLines() {
  const svg = document.getElementById("lines");
  const root = document.getElementById("roadmap");
  if (!svg || !root) return;

  const rect = root.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  svg.setAttribute("width", rect.width);
  svg.setAttribute("height", rect.height);

  const center = el => {
    const r = el.getBoundingClientRect();
    const rr = root.getBoundingClientRect();
    return {
      x: r.left - rr.left + r.width / 2,
      y: r.top - rr.top + r.height / 2,
      w: r.width, h: r.height,
      top: r.top - rr.top,
      bottom: r.bottom - rr.top,
      left: r.left - rr.left,
      right: r.right - rr.left
    };
  };

  // Connections: from -> to (id), with side hint for the bezier
  const conns = [
    { from: "n-root", to: "n-b1", style: "v" },
    { from: "n-b1", to: "g-classical", style: "down-left" },
    { from: "n-b1", to: "g-dlcore", style: "down-right" },
    { from: "g-classical", to: "g-theory", style: "v" },
    { from: "g-theory", to: "g-rl", style: "v" },
    { from: "g-dlcore", to: "g-repr", style: "v" },
    { from: "g-repr", to: "g-modern", style: "v" },
    { from: "g-modern", to: "g-diff", style: "v" }
  ];

  // Clear and draw
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const NS = "http://www.w3.org/2000/svg";

  for (const c of conns) {
    const a = document.getElementById(c.from);
    const b = document.getElementById(c.to);
    if (!a || !b) continue;
    const A = center(a), B = center(b);
    let path;
    if (c.style === "v") {
      // straight-ish vertical line from bottom of A to top of B
      path = `M ${A.x},${A.bottom} C ${A.x},${(A.bottom+B.top)/2} ${B.x},${(A.bottom+B.top)/2} ${B.x},${B.top}`;
    } else if (c.style === "down-left") {
      const sx = A.x - 8, sy = A.bottom;
      const ex = B.right - 60, ey = B.top;
      const my = (sy + ey) / 2;
      path = `M ${sx},${sy} C ${sx},${my} ${ex},${my} ${ex},${ey}`;
    } else if (c.style === "down-right") {
      const sx = A.x + 8, sy = A.bottom;
      const ex = B.left + 60, ey = B.top;
      const my = (sy + ey) / 2;
      path = `M ${sx},${sy} C ${sx},${my} ${ex},${my} ${ex},${ey}`;
    }
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupEquationSourceAnchors();
  setupTopicEquationExplanations();
  paintProgressOnHome();
  renderIndexTable();
  setupSearch();
  drawLines();
  window.addEventListener("resize", drawLines);

  const reset = document.getElementById("resetProgress");
  if (reset) {
    reset.addEventListener("click", () => {
      const lang = localStorage.getItem("ml_review_lang_v1") || "en";
      const msg = lang === "en" ? "Reset all learning progress?" : "重置全部学习进度？";
      if (confirm(msg)) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });
  }

  // Export / Import buttons (wired through window.MLProgress from progress-sync.js)
  const exportBtn = document.getElementById("exportProgress");
  if (exportBtn && window.MLProgress?.export) {
    exportBtn.addEventListener("click", () => window.MLProgress.export());
  }
  const importBtn = document.getElementById("importProgress");
  if (importBtn && window.MLProgress?.import) {
    importBtn.addEventListener("click", () => window.MLProgress.import());
  }

  // The .sync-status hint speaks to whichever language is active.
  const syncStatus = document.getElementById("syncStatus");
  function paintSyncStatus() {
    if (!syncStatus) return;
    const lang = localStorage.getItem("ml_review_lang_v1") || "en";
    const en = syncStatus.dataset.en, cn = syncStatus.dataset.cn;
    if (lang === "cn")      syncStatus.textContent = cn;
    else if (lang === "en") syncStatus.textContent = en;
    else                    syncStatus.textContent = `${en} / ${cn}`;
  }
  paintSyncStatus();
  document.addEventListener("click", e => {
    if (e.target.closest(".lang-switch button")) setTimeout(paintSyncStatus, 0);
  });

  // When progress-sync.js pulls a snapshot from the server (or after Import),
  // re-paint everything that reflects the progress state.
  document.addEventListener("ml-progress-loaded", () => {
    if (typeof paintProgressOnHome === "function") paintProgressOnHome();
    // The home grid keeps its own listener; firing a custom event lets it
    // re-render card "done" markers without reloading the page.
    document.dispatchEvent(new CustomEvent("ml-progress-rerender"));
    // Refresh the mark-as-read button on topic pages.
    const mb = document.getElementById("markRead");
    if (mb && typeof mb.dataset.block === "string") {
      const cur = getProgress();
      mb.classList.toggle("btn-primary", !!cur[mb.dataset.block]);
      mb.setAttribute("data-i18n", cur[mb.dataset.block] ? "btn.markRead.done" : "btn.markRead.todo");
      if (typeof applyLang === "function") applyLang(localStorage.getItem("ml_review_lang_v1") || "en");
    }
  });

  // === Topic page: inject "Python implementation" section from POPUP_DATA ===
  // The popup used to show code inline; we link to topics/<slug>.html#code
  // instead. This builds that section from popup-data.js at load time so we
  // don't have to maintain code in two places.
  (function injectTopicCodeSection() {
    const main = document.querySelector(".block-main");
    const markBtn0 = document.getElementById("markRead");
    if (!main || !markBtn0 || !window.POPUP_DATA) return;
    const slug = markBtn0.dataset.block;
    const data = window.POPUP_DATA[slug];
    if (!data || !data.code || !data.code.length) return;
    if (document.getElementById("code")) return;  // idempotent

    const escHtml = (s) => String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
    const langSpans = (en, cn) => {
      const safeEn = escHtml(en || cn || "");
      const safeCn = escHtml(cn || en || "");
      if (safeEn === safeCn) return safeEn;
      return `<span class="en-only">${safeEn}</span><span class="cn-only">${safeCn}</span>`;
    };
    const titleHtml = (o) => {
      if (!o) return "Python";
      if (typeof o === "string") return escHtml(o);
      return langSpans(o.en || o.cn || "Python", o.cn || o.en || "Python");
    };
    const commentTranslations = {
      "离散期望与方差": "Discrete expectation and variance",
      "协方差矩阵 + 最大特征向量（PCA 直觉）": "Covariance matrix + top eigenvector (PCA intuition)",
      "线性 soft-margin SVM": "Linear soft-margin SVM",
      "Hinge loss 手算": "Manual hinge-loss check",
      "升序": "ascending order",
      "前 k 个最大特征向量": "top-k eigenvectors",
      "自动得到正确 shape": "autograd returns the correct shapes",
      "OLMo-style 配置": "OLMo-style configuration",
      "广播到图像形状": "broadcast to image shape"
    };
    const translateComment = (text) => {
      const clean = String(text || "").trim();
      return commentTranslations[clean] || clean.replace(/[\u4e00-\u9fff]+/g, "").replace(/\s+/g, " ").trim() || "note";
    };
    const englishCode = (code) => String(code || "").split("\n").map(line => {
      const hash = line.indexOf("#");
      if (hash < 0) return line;
      const before = line.slice(0, hash);
      const comment = line.slice(hash + 1);
      if (!/[\u4e00-\u9fff]/.test(comment)) return line;
      return `${before}# ${translateComment(comment)}`;
    }).join("\n");
    const highlightPython = (line) => {
      const hash = line.indexOf("#");
      const before = hash >= 0 ? line.slice(0, hash) : line;
      const comment = hash >= 0 ? line.slice(hash) : "";
      let html = escHtml(before);
      html = html.replace(/(&quot;.*?&quot;|'[^']*?')/g, '<span class="py-string">$1</span>');
      html = html.replace(/\b(def|return|import|from|as|for|if|else|elif|break|continue|class|with|in|assert|lambda)\b/g, '<span class="py-keyword">$1</span>');
      html = html.replace(/\b(np|torch|nn|math|gym)\b/g, '<span class="py-module">$1</span>');
      html = html.replace(/\b(\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/gi, '<span class="py-number">$1</span>');
      if (comment) html += `<span class="py-comment">${escHtml(comment)}</span>`;
      return html || " ";
    };
    const codeEditor = (code, idx) => {
      const lines = String(code || "").replace(/\s+$/g, "").split("\n");
      return `
        <div class="python-code-editor">
          <ol class="python-code-lines">
            ${lines.map(line => `<li><code>${highlightPython(line)}</code></li>`).join("")}
          </ol>
        </div>`;
    };

    const blocks = data.code.map((c, i) => `
      <details class="python-code-card" ${i === 0 ? "open" : ""}>
        <summary class="python-code-summary">
          ${titleHtml(c.title)}
        </summary>
        <div class="en-only">${codeEditor(c.code_en || englishCode(c.code), i)}</div>
        <div class="cn-only">${codeEditor(c.code_cn || c.code, i)}</div>
      </details>
    `).join("");

    const section = document.createElement("section");
    section.className = "topic";
    section.id = "code";
    section.style.scrollMarginTop = "80px";
    section.classList.add("python-section");
    section.innerHTML = `
      <h2>${langSpans("🐍 Python Implementation", "🐍 Python 实现")}</h2>
      <p class="python-section-note">
        ${langSpans("Reference implementation.", "参考实现。")}
      </p>
      ${blocks}
    `;

    // Insert before the prev/next nav row.
    const navDiv = main.querySelector('div[style*="space-between"][style*="margin-top"]');
    if (navDiv) main.insertBefore(section, navDiv);
    else main.appendChild(section);

    // Add a TOC entry on the left sidebar.
    const tocList = document.querySelector(".toc ul, .toc div ul, #topicToc ul");
    if (tocList) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#code";
      a.innerHTML = langSpans("🐍 Python Implementation", "🐍 Python 实现");
      a.style.color = "var(--text-soft)";
      a.style.fontSize = "13px";
      li.appendChild(a);
      tocList.appendChild(li);
    }
  })();

  // Mark block as read button on block pages
  const markBtn = document.getElementById("markRead");
  if (markBtn) {
    const block = markBtn.dataset.block;
    const refresh = () => {
      const p = getProgress();
      const key = p[block] ? "btn.markRead.done" : "btn.markRead.todo";
      markBtn.setAttribute("data-i18n", key);
      markBtn.classList.toggle("btn-primary", !!p[block]);
      if (typeof applyLang === "function") applyLang(localStorage.getItem("ml_review_lang_v1") || "en");
    };
    refresh();
    markBtn.addEventListener("click", () => {
      const p = getProgress();
      markBlockDone(block, !p[block]);
      refresh();
    });
  }

  setupTopicPageToc();
});
