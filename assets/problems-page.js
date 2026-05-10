// Standalone HW/problem list page for one Atlas topic.
// Reads the same POPUP_DATA and progress keys as popup.js.
(function () {
  const STORAGE = "ml_review_progress_v1";

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE) || "{}"); }
    catch { return {}; }
  }
  function setProgress(p) { localStorage.setItem(STORAGE, JSON.stringify(p)); }
  function probKey(slug, pid) { return `prob:${slug}:${pid}`; }

  function getLang() {
    const v = localStorage.getItem("ml_review_lang_v1");
    if (v === "cn" || v === "en") return v;
    if (v === "mixed") localStorage.setItem("ml_review_lang_v1", "en");
    return "en";
  }
  function pickLang(obj) {
    if (!obj) return "";
    const lang = getLang();
    return obj[lang] || obj.cn || obj.en || "";
  }
  function tr(cn, en) {
    const lang = getLang();
    if (lang === "en") return en;
    return cn;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function formatDetailText(text) {
    const blocks = String(text || "").trim().split(/\n{2,}/);
    return blocks.map(block => {
      const lines = block.split("\n").map(line => line.trim()).filter(Boolean);
      if (!lines.length) return "";

      if (lines[0].startsWith("$$") && lines[lines.length - 1].endsWith("$$")) {
        return `<div class="popup-equation-block">${escapeHtml(lines.join("\n"))}</div>`;
      }

      if (lines.every(line => line.startsWith("- "))) {
        return `<ul class="popup-detail-list">${lines.map(line => `<li>${escapeHtml(line.slice(2))}</li>`).join("")}</ul>`;
      }

      if (lines.length === 1 && lines[0].startsWith("### ")) {
        return `<h5>${escapeHtml(lines[0].slice(4))}</h5>`;
      }

      return `<p>${escapeHtml(lines.join("\n"))}</p>`;
    }).join("");
  }
  function typesetMath(root) {
    if (!window.MathJax) return;
    const ready = window.MathJax.startup?.promise || Promise.resolve();
    ready.then(() => window.MathJax.typesetPromise?.([root])).catch(() => {});
  }
  function pickTips(tips) {
    if (!tips) return [];
    const lang = getLang();
    const en = Array.isArray(tips.en) ? tips.en : [];
    const cn = Array.isArray(tips.cn) ? tips.cn : [];
    const local = Array.isArray(tips[lang]) ? tips[lang] : [];
    if (local.length) return local;
    if (cn.length) return cn;
    return en;
  }

  function topicName(topic) {
    const lang = getLang();
    if (!topic) return tr("习题", "Problems");
    return lang === "cn" ? (topic.name_cn || topic.name_en) : (topic.name_en || topic.name_cn);
  }

  function problemMeta(prob) {
    return [String(prob.hw || "").toUpperCase(), prob.section || ""].filter(Boolean).join(" ");
  }

  function sourceLinks(prob) {
    const isLecture = String(prob.hw || "").startsWith("Lecture_");
    const hasSolPdf = Object.prototype.hasOwnProperty.call(prob, "sol_pdf");
    const hwPdf = prob.hw_pdf || (isLecture ? `slides/${prob.hw}.pdf` : `HW/${prob.hw}.pdf`);
    const solPdf = hasSolPdf ? prob.sol_pdf : (!isLecture && prob.hw ? `HW/${prob.hw}_sol.pdf` : "");
    return `
      <div class="popup-problem-links">
        <a class="popup-full-link" href="${escapeHtml(hwPdf)}" target="_blank">${isLecture ? tr("课件出处", "Lecture source") : tr("完整原题", "Full problem")}</a>
        ${solPdf ? `<a class="popup-full-link" href="${escapeHtml(solPdf)}" target="_blank">${tr("官方解答", "Official sol")}</a>` : ""}
      </div>`;
  }

  function field(cnLabel, enLabel, value) {
    const text = pickLang(value);
    if (!text) return "";
    return `
      <div class="popup-problem-field">
        <div class="popup-problem-field-label">${tr(cnLabel, enLabel)}</div>
        <div class="popup-problem-field-text">${escapeHtml(text)}</div>
      </div>`;
  }

  function tipsBlock(tips) {
    const items = pickTips(tips);
    if (!items.length) return "";
    return `
      <div class="popup-problem-field">
        <div class="popup-problem-field-label">${tr("提示", "Tips")}</div>
        <ul class="popup-problem-tips">
          ${items.map(t => `<li>${escapeHtml(t)}</li>`).join("")}
        </ul>
      </div>`;
  }

  function solutionDetails(prob) {
    const detailed = pickLang(prob.detailed_solution);
    const fallback = pickLang(prob.solution);
    const text = detailed || fallback;
    if (!text) return "";
    return `
      <details class="popup-problem-detail">
        <summary>${detailed ? tr("详细解法", "Detailed solution") : tr("解题思路", "Answer sketch")}</summary>
        <div class="popup-problem-detail-text">${formatDetailText(text)}</div>
      </details>`;
  }

  function problemCard(slug, prob, p) {
    const checked = !!p[probKey(slug, prob.id)];
    return `
      <article class="problem-page-card" data-pid="${escapeHtml(prob.id)}">
        <div class="problem-page-card-head">
          <span class="popup-checkbox ${checked ? "checked" : ""}" data-prob="${escapeHtml(prob.id)}">${checked ? "✓" : ""}</span>
          <div class="problem-page-card-title">
            <h2>${escapeHtml(pickLang(prob.title) || prob.id)}</h2>
            <div class="popup-problem-meta">${escapeHtml(problemMeta(prob))}</div>
          </div>
        </div>
        <div class="problem-page-card-body">
          ${field("原题线索", "Original cue", prob.original_excerpt)}
          ${field("题意理解", "Problem understanding", prob.problem_understanding)}
          ${field("知识点", "Knowledge points", prob.knowledge_points)}
          ${tipsBlock(prob.tips)}
          ${solutionDetails(prob)}
          ${sourceLinks(prob)}
        </div>
      </article>`;
  }

  function renderTopicList() {
    const root = document.getElementById("problemsPageRoot");
    const topics = window.TOPICS || [];
    const data = window.POPUP_DATA || {};
    const cards = topics
      .map(t => ({ topic: t, count: (data[t.slug]?.problems || []).length }))
      .filter(x => x.count > 0);

    document.getElementById("problemsCrumb").textContent = tr("全部题目", "All Problems");
    document.getElementById("problemsTitle").textContent = tr("选择一个 Atlas cell", "Choose an Atlas Cell");
    document.getElementById("problemsSubtitle").textContent = tr("从这里进入每个 topic 的题目页。", "Open a topic to see every problem attached to that card.");
    document.getElementById("problemsRefs").innerHTML = "";

    root.innerHTML = `
      <div class="problem-topic-grid">
        ${cards.map(({ topic, count }) => `
          <a class="problem-topic-card" href="problems.html?topic=${encodeURIComponent(topic.slug)}">
            <strong>${escapeHtml(topicName(topic))}</strong>
            <span>${count} ${tr("题", "problem" + (count > 1 ? "s" : ""))}</span>
          </a>`).join("")}
      </div>`;
  }

  function renderTopic(slug) {
    const root = document.getElementById("problemsPageRoot");
    const topic = (window.TOPICS || []).find(t => t.slug === slug);
    const data = (window.POPUP_DATA || {})[slug];
    if (!topic || !data) {
      renderTopicList();
      return;
    }

    const problems = data.problems || [];
    const p = getProgress();
    const done = problems.filter(prob => p[probKey(slug, prob.id)]).length;

    document.getElementById("problemsCrumb").textContent = topicName(topic);
    document.getElementById("problemsTitle").textContent = `${topicName(topic)} · ${tr("题目", "Problems")}`;
    document.getElementById("problemsSubtitle").textContent =
      problems.length
        ? `${done}/${problems.length} ${tr("已完成", "completed")}`
        : tr("这个 cell 还没有题目。", "No problems are attached to this cell yet.");
    document.getElementById("problemsRefs").innerHTML = `
      <a class="ref-chip" href="topics/${encodeURIComponent(slug)}.html">${tr("完整笔记", "Full notes")}</a>
      <a class="ref-chip hw" href="index.html">${tr("返回 Atlas", "Back to Atlas")}</a>`;

    if (!problems.length) {
      root.innerHTML = `<p class="popup-empty">${tr("这个 cell 还没有题目。", "No problems are attached to this cell yet.")}</p>`;
      return;
    }

    root.innerHTML = `
      <div class="problems-page-toolbar">
        <span>${problems.length} ${tr("道题", "problem" + (problems.length > 1 ? "s" : ""))}</span>
        <span>${tr("详细解法默认隐藏，需要手动展开。", "Detailed solutions stay hidden until you open them.")}</span>
      </div>
      <div class="problem-page-list">
        ${problems.map(prob => problemCard(slug, prob, p)).join("")}
      </div>`;

    root.querySelectorAll(".popup-checkbox[data-prob]").forEach(cb => {
      cb.addEventListener("click", e => {
        e.stopPropagation();
        const pid = cb.dataset.prob;
        const next = !cb.classList.contains("checked");
        const cur = getProgress();
        if (next) cur[probKey(slug, pid)] = true; else delete cur[probKey(slug, pid)];
        setProgress(cur);
        renderTopic(slug);
        document.dispatchEvent(new CustomEvent("ml-progress-rerender"));
      });
    });
    root.querySelectorAll("details.popup-problem-detail").forEach(detail => {
      detail.addEventListener("toggle", () => { if (detail.open) typesetMath(detail); });
    });
    typesetMath(root);
  }

  function currentSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("topic") || params.get("slug") || "";
  }

  function render() {
    const slug = currentSlug();
    if (slug) renderTopic(slug);
    else renderTopicList();
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    document.addEventListener("click", e => {
      if (e.target.closest(".lang-switch button")) setTimeout(render, 0);
    });
    window.addEventListener("storage", e => {
      if (e.key === STORAGE || e.key === "ml_review_lang_v1") render();
    });
  });
})();
