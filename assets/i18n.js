// === i18n: EN / Mixed / CN switch ===
// Three language modes:
//   "en"     — English only (default for first-time visitors)
//   "mixed"  — both languages stacked (great for studying)
//   "cn"     — Chinese only
// HTML elements use data-i18n="key" (textContent) or
// data-i18n-attr="placeholder" data-i18n="key" (attribute).
// Block content uses .cn-only / .en-only wrappers; mixed mode shows both.

const I18N_KEY = "ml_review_lang_v1";

const I18N = {
  // ── chrome ──
  "brand.title":            { cn: "ECE 449 / CS 446 · 期末复习路线图", en: "ECE 449 / CS 446 · Final Review Roadmap" },
  "brand.short":            { cn: "ECE 449 / CS 446", en: "ECE 449 / CS 446" },
  "nav.roadmap":            { cn: "🗺️ 路线图", en: "🗺️ Roadmap" },
  "nav.notes":              { cn: "📘 速查", en: "📘 Notes" },
  "nav.cheatsheet":         { cn: "⚡ 速记", en: "⚡ Cheatsheet" },
  "nav.resources":          { cn: "📂 资料", en: "📂 Resources" },
  "search.placeholder":     { cn: "搜索算法…", en: "Search algorithms…" },
  "search.formula":         { cn: "搜索公式…", en: "Search formulas…" },

  // ── home page ──
  "home.progress":          { cn: "📊 复习进度", en: "📊 Progress" },
  "home.legend.found":      { cn: "Foundations / 基础", en: "Foundations" },
  "home.legend.dl":         { cn: "Modern DL / 现代深度", en: "Modern Deep Learning" },
  "home.legend.theory":     { cn: "Theory / RL", en: "Theory & RL" },
  "home.btn.cheatsheet":    { cn: "⚡ 1 小时速记", en: "⚡ 1-hour Cheatsheet" },
  "home.btn.start":         { cn: "📖 从头开始", en: "📖 Start from Block 1" },
  "home.btn.resources":     { cn: "📂 课件 & 作业", en: "📂 Slides & Homework" },
  "home.btn.reset":         { cn: "🔄 重置进度", en: "🔄 Reset progress" },
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
  "node.practice":          { cn: "⚡ 速记 + 练习", en: "⚡ Cheatsheet + Practice" },
  "node.practice.sub":      { cn: "10 min · 闭卷自测", en: "10 min · Closed-book self-test" },

  // ── block page chrome ──
  "page.toc":               { cn: "本章导航 · TOC", en: "Table of Contents" },
  "btn.markRead.todo":      { cn: "📌 标记为已掌握", en: "📌 Mark as mastered" },
  "btn.markRead.done":      { cn: "✅ 已完成 · 点击撤销", en: "✅ Mastered · click to undo" },
  "btn.next":               { cn: "下一章 →", en: "Next →" },
  "btn.prev":               { cn: "← 上一章", en: "← Prev" },
  "btn.back":               { cn: "← 返回路线图", en: "← Back to Roadmap" },
  "btn.cheatsheetGo":       { cn: "⚡ 速记 Cheatsheet", en: "⚡ Cheatsheet" },
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
  if (v === "en" || v === "cn" || v === "mixed") return v;
  return "en";  // default for first-time visitors
}
function setLang(lang) {
  localStorage.setItem(I18N_KEY, lang);
  applyLang(lang);
}
function applyLang(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  // Resolve text per element: in "mixed" mode prefer English (UI labels)
  // and let .cn-only / .en-only blocks naturally show both bodies.
  const pick = (dict) => {
    if (!dict) return null;
    if (lang === "cn") return dict.cn || dict.en;
    if (lang === "en") return dict.en || dict.cn;
    // mixed: show "EN · 中文" when both exist and they differ.
    if (dict.en && dict.cn && dict.en !== dict.cn) return `${dict.en} · ${dict.cn}`;
    return dict.en || dict.cn;
  };
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = pick(I18N[key]);
    if (value == null) return;
    const attr = el.getAttribute("data-i18n-attr");
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  });
  // Reflect in the toggle button
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function injectLangSwitch() {
  // Adds the EN / Mixed / 中 toggle next to the search box on every page.
  const topbarInner = document.querySelector(".topbar-inner");
  if (!topbarInner || document.querySelector(".lang-switch")) return;
  const wrap = document.createElement("div");
  wrap.className = "lang-switch";
  wrap.innerHTML = `
    <button data-lang="en"    type="button" title="English only">EN</button>
    <button data-lang="mixed" type="button" title="Both languages">EN+中</button>
    <button data-lang="cn"    type="button" title="Chinese only">中</button>
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
