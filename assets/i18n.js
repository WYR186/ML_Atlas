// === i18n: EN / CN switch ===
// Two language modes:
//   "en"     — English only (default for first-time visitors)
//   "cn"     — Chinese-dominant, with English technical keywords kept inline
// HTML elements use data-i18n="key" (textContent) or
// data-i18n-attr="placeholder" data-i18n="key" (attribute).
// Block content uses .cn-only / .en-only wrappers.

const I18N_KEY = "ml_review_lang_v1";

const I18N = {
  // ── chrome ──
  "brand.title":            { cn: "ECE 449 / CS 446 · 期末复习路线图", en: "ECE 449 / CS 446 · Final Review Roadmap" },
  "brand.short":            { cn: "ECE 449 / CS 446", en: "ECE 449 / CS 446" },
  "nav.roadmap":            { cn: "🗺️ 路线图", en: "🗺️ Roadmap" },
  "nav.notes":              { cn: "📘 速查", en: "📘 Notes" },
  "nav.algorithms":         { cn: "📚 算法表", en: "📚 Algorithms" },
  "nav.cheatsheet":         { cn: "⚡ 公式大全", en: "⚡ Equations" },
  "nav.resources":          { cn: "📂 资料", en: "📂 Resources" },
  "search.placeholder":     { cn: "搜索算法…", en: "Search algorithms…" },
  "search.formula":         { cn: "搜索公式…", en: "Search formulas…" },

  // ── home page ──
  "home.progress":          { cn: "📊 复习进度", en: "📊 Progress" },
  "home.legend.found":      { cn: "简单", en: "Easy" },
  "home.legend.dl":         { cn: "中等", en: "Medium" },
  "home.legend.theory":     { cn: "困难", en: "Hard" },
  "home.btn.cheatsheet":    { cn: "⚡ 公式大全", en: "⚡ Equations" },
  "home.btn.start":         { cn: "📖 从头开始", en: "📖 Start from Block 1" },
  "home.btn.resources":     { cn: "📂 课件 & 作业", en: "📂 Slides & Homework" },
  "home.btn.reset":         { cn: "🔄 重置进度", en: "🔄 Reset progress" },
  "home.btn.export":        { cn: "📤 备份到文件", en: "📤 Save to file" },
  "home.btn.import":        { cn: "📥 从文件恢复", en: "📥 Load from file" },
  "home.confirm.reset":     { cn: "重置全部学习进度？", en: "Reset all learning progress?" },
  "home.indexTitle":        { cn: "📚 完整核心算法表 · Course Algorithm Index", en: "📚 Complete Algorithm Index" },
  "home.indexSub":          { cn: "按模块整理；每行可点击跳转到对应章节。", en: "Grouped by module — click any row to jump to the section." },
  "home.col.topic":         { cn: "算法 / Topic", en: "Algorithm / Topic" },
  "home.col.goal":          { cn: "核心目标", en: "Core Goal" },
  "home.col.exam":          { cn: "考点 / Exam focus", en: "Exam Focus" },
  "home.subtitle.subtitle": { cn: "机器学习 · 期末复习", en: "Machine Learning · Final Review" },

  // root + foundation node titles
  "node.b1":                { cn: "📐 Block 1 · Foundations", en: "📐 Block 1 · Foundations" },
  "node.b1.sub":            { cn: "概率 · 线代 · 优化", en: "Probability · Linear Algebra · Optimization" },
  "group.classical":        { cn: "🧮 Classical Machine Learning · 经典机器学习", en: "🧮 Classical Machine Learning" },
  "group.dlcore":           { cn: "🧠 Deep Learning Core · 深度学习核心", en: "🧠 Deep Learning Core" },
  "group.repr":             { cn: "🎭 Representation & Generative · 表示与生成", en: "🎭 Representation & Generative" },
  "group.modern":           { cn: "🔮 Modern Models · 现代序列模型", en: "🔮 Modern Sequence Models" },
  "group.diff":             { cn: "🌊 Diffusion · 扩散模型", en: "🌊 Diffusion" },
  "group.theory":           { cn: "🎓 Learning Theory · 学习理论", en: "🎓 Learning Theory" },
  "group.rl":               { cn: "🎮 Reinforcement Learning · 强化学习", en: "🎮 Reinforcement Learning" },
  "node.practice":          { cn: "⚡ 公式大全 + 练习", en: "⚡ Equations + Practice" },
  "node.practice.sub":      { cn: "10 min · 闭卷自测", en: "10 min · Closed-book self-test" },

  // ── block page chrome ──
  "page.toc":               { cn: "本章导航 · TOC", en: "Table of Contents" },
  "btn.markRead.todo":      { cn: "📌 标记为已掌握", en: "📌 Mark as mastered" },
  "btn.markRead.done":      { cn: "✅ 已完成 · 点击撤销", en: "✅ Mastered · click to undo" },
  "btn.next":               { cn: "下一章 →", en: "Next →" },
  "btn.prev":               { cn: "← 上一章", en: "← Prev" },
  "btn.back":               { cn: "← 返回路线图", en: "← Back to Roadmap" },
  "btn.cheatsheetGo":       { cn: "⚡ 公式大全", en: "⚡ Equations" },
  "crumbs.roadmap":         { cn: "路线图", en: "Roadmap" },

  // common labels used across blocks
  "label.intuition":        { cn: "🧠 直觉 / Intuition", en: "🧠 Intuition" },
  "label.coreIntuition":    { cn: "🧠 Core intuition", en: "🧠 Core intuition" },
  "label.concepts":         { cn: "🔵 概念理解", en: "🔵 Concepts" },
  "label.formulas":         { cn: "🟣 核心公式（默写）", en: "🟣 Core Formulas (memorize)" },
  "label.pitfalls":         { cn: "⚠️ Common pitfalls", en: "⚠️ Common pitfalls" },
  "label.examFocus":        { cn: "✅ Exam focus", en: "✅ Exam focus" },
  "label.example":          { cn: "🧩 Example", en: "🧩 Example" },
  "label.checklist":        { cn: "✅ 速记 Checklist", en: "✅ Quick Checklist" },
  "label.summary":          { cn: "✅ 速记 Checklist", en: "✅ Quick Checklist" },

  // ── footer ──
  "footer.home":            { cn: "本网站由 ECE 449 / CS 446 期末笔记 (Block 1-4.rtf, Block 5-10.rtf) 与课件 / 作业生成 ·",
                              en: "Built from course notes (Block 1-4.rtf, Block 5-10.rtf), slides, and homework ·" },
  "footer.viewMap":         { cn: "查看资源映射", en: "View resource map" },
  "footer.builtFrom14":     { cn: "由 Block 1-4.rtf 整理 ·", en: "Compiled from Block 1-4.rtf ·" },
  "footer.builtFrom510":    { cn: "由 Block 5-10.rtf 整理 ·", en: "Compiled from Block 5-10.rtf ·" },
  "footer.resourceMap":     { cn: "资源映射", en: "Resource map" }
};

function getLang() {
  const v = localStorage.getItem(I18N_KEY);
  if (v === "en" || v === "cn") return v;
  if (v === "mixed") {
    localStorage.setItem(I18N_KEY, "en");
    return "en";
  }
  return "en";  // default for first-time visitors
}
function setLang(lang) {
  const next = lang === "cn" ? "cn" : "en";
  const snap = captureLangScrollPosition();
  localStorage.setItem(I18N_KEY, next);
  applyLang(next);
  restoreLangScrollPosition(snap);
}
// Strip a leading emoji + spaces from a string. Returns { emoji, rest }.
function stripLeadEmoji(s) {
  s = String(s || "");
  const m = s.match(/^(\p{Extended_Pictographic}+)\s*/u);
  return m ? { emoji: m[1], rest: s.slice(m[0].length) } : { emoji: "", rest: s };
}

function escHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function alignSliderThumb(sw) {
  // Position the thumb pixel-precisely to the active button — independent
  // of paddings, borders and per-button content widths.
  const active = sw.querySelector(`button[data-lang="${sw.dataset.active}"]`)
              || sw.querySelector("button.active")
              || sw.querySelector("button");
  const thumb = sw.querySelector(".lang-thumb");
  if (!active || !thumb) return;
  const swRect = sw.getBoundingClientRect();
  const btnRect = active.getBoundingClientRect();
  const thumbLeft = parseFloat(window.getComputedStyle(thumb).left) || 0;
  thumb.style.width = btnRect.width + "px";
  thumb.style.transform = `translateX(${btnRect.left - swRect.left - thumbLeft}px)`;
}

function langTopOffset() {
  const topbar = document.querySelector(".topbar");
  return (topbar ? topbar.getBoundingClientRect().height : 0) + 16;
}

function langIsVisible(el) {
  if (!el || !el.isConnected || !el.getClientRects().length) return false;
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}

function visibleTopicSection() {
  const top = langTopOffset();
  const sections = Array.from(document.querySelectorAll("section.topic")).filter(langIsVisible);
  return sections.find(sec => {
    const r = sec.getBoundingClientRect();
    return r.bottom > top && r.top < window.innerHeight;
  }) || sections[0] || null;
}

function captureLangScrollPosition() {
  const top = langTopOffset();
  const section = visibleTopicSection();
  if (section) {
    const heads = Array.from(section.querySelectorAll(":scope > h2, :scope > h3"));
    let index = 0;
    for (let i = 0; i < heads.length; i++) {
      if (heads[i].getBoundingClientRect().top <= top + 1) index = i;
      else break;
    }
    const anchor = heads[index] || section;
    return {
      kind: "topic",
      index,
      offset: anchor.getBoundingClientRect().top - top,
      scrollY: window.scrollY
    };
  }

  const x = Math.max(1, Math.min(window.innerWidth / 2, window.innerWidth - 2));
  const y = Math.max(top + 1, Math.min(window.innerHeight * 0.35, window.innerHeight - 2));
  const el = document.elementsFromPoint(x, y).find(node => {
    return node instanceof Element
      && !node.closest(".topbar")
      && !node.closest(".toc")
      && langIsVisible(node);
  });
  if (!el) return { kind: "scroll", scrollY: window.scrollY };
  return { kind: "element", el, y, offset: el.getBoundingClientRect().top - y, scrollY: window.scrollY };
}

function restoreLangScrollPosition(snap) {
  if (!snap) return;
  document.documentElement.classList.add("lang-preserve-scroll");

  let attempts = 0;
  const restore = () => {
    attempts += 1;
    const top = langTopOffset();

    if (snap.kind === "topic") {
      const section = visibleTopicSection();
      const heads = section ? Array.from(section.querySelectorAll(":scope > h2, :scope > h3")) : [];
      const anchor = heads[Math.min(snap.index, Math.max(heads.length - 1, 0))] || section;
      if (anchor && langIsVisible(anchor)) {
        const wantedTop = top + snap.offset;
        window.scrollBy({ top: anchor.getBoundingClientRect().top - wantedTop, left: 0, behavior: "auto" });
      } else {
        window.scrollTo({ top: snap.scrollY, left: window.scrollX, behavior: "auto" });
      }
    } else if (snap.kind === "element" && langIsVisible(snap.el)) {
      const wantedTop = snap.y + snap.offset;
      window.scrollBy({ top: snap.el.getBoundingClientRect().top - wantedTop, left: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: snap.scrollY, left: window.scrollX, behavior: "auto" });
    }

    if (attempts < 4) requestAnimationFrame(restore);
    else document.documentElement.classList.remove("lang-preserve-scroll");
  };

  requestAnimationFrame(restore);
}

function applyLang(lang) {
  if (lang !== "cn" && lang !== "en") lang = "en";
  document.documentElement.setAttribute("data-lang", lang);

  // Update the segmented switch thumb position.
  document.querySelectorAll(".lang-switch").forEach(sw => {
    sw.setAttribute("data-active", lang);
    requestAnimationFrame(() => alignSliderThumb(sw));
  });

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const dict = I18N[key];
    if (!dict) return;
    const attr = el.getAttribute("data-i18n-attr");

    // Single-language modes: just write text content (or attribute).
    if (lang === "cn" || lang === "en") {
      const value = lang === "cn" ? (dict.cn || dict.en) : (dict.en || dict.cn);
      if (attr) el.setAttribute(attr, value);
      else el.textContent = value;
      return;
    }

    const value = dict.en || dict.cn;
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  });

  // Toggle button "active" state for accessibility / focus styling.
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function injectLangSwitch() {
  // Adds a segmented EN / CN slider next to the search box.
  // The order is fixed: EN (left), CN (right) — the
  // CSS thumb position is keyed off [data-active] so it must match.
  const topbarInner = document.querySelector(".topbar-inner");
  if (!topbarInner || document.querySelector(".lang-switch")) return;
  const wrap = document.createElement("div");
  wrap.className = "lang-switch";
  wrap.setAttribute("role", "tablist");
  wrap.setAttribute("data-active", getLang());
  wrap.innerHTML = `
    <span class="lang-thumb" aria-hidden="true"></span>
    <button data-lang="en"    type="button" role="tab" title="English only">EN</button>
    <button data-lang="cn"    type="button" role="tab" title="Chinese with English keywords">中</button>
  `;
  const search = topbarInner.querySelector(".search-box");
  if (search) topbarInner.insertBefore(wrap, search);
  else topbarInner.appendChild(wrap);
  wrap.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
}

// Run before DOMContentLoaded so the initial paint matches saved language.
(function bootI18n() {
  document.documentElement.setAttribute("data-lang", getLang());
})();

document.addEventListener("DOMContentLoaded", () => {
  injectLangSwitch();
  applyLang(getLang());
});

// Re-align the slider thumb on viewport changes — button widths can shift
// when the topbar wraps or the nav grows.
window.addEventListener("resize", () => {
  document.querySelectorAll(".lang-switch").forEach(alignSliderThumb);
});
