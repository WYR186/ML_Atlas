// Click-anchored popup that pops out from the clicked card.
// Reads from window.POPUP_DATA / window.TOPICS.
// State: per-problem completion in localStorage under "ml_review_progress_v1".
(function () {
  const STORAGE = "ml_review_progress_v1";
  let popupEl = null;
  let currentAnchor = null;     // remembered so resize can re-position

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE) || "{}"); }
    catch { return {}; }
  }
  function setProgress(p) { localStorage.setItem(STORAGE, JSON.stringify(p)); }
  function probKey(slug, pid) { return `prob:${slug}:${pid}`; }
  function tutKey(slug)        { return `tut:${slug}`; }

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

  function problemField(cnLabel, enLabel, value) {
    const text = pickLang(value);
    if (!text) return "";
    return `
      <div class="popup-problem-field">
        <div class="popup-problem-field-label">${tr(cnLabel, enLabel)}</div>
        <div class="popup-problem-field-text">${escapeHtml(text)}</div>
      </div>`;
  }

  function problemTips(tips) {
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

  function problemBody(prob, hwPdf, solPdf, isLecture) {
    const hasStructured =
      prob.original_excerpt || prob.problem_understanding || prob.knowledge_points ||
      prob.tips || prob.detailed_solution;

    const linksHtml = `
      <div class="popup-problem-links">
        <a class="popup-full-link" href="${hwPdf}" target="_blank">📄 ${isLecture ? tr("课件出处", "Lecture source") : tr("完整原题", "Full problem")}</a>
        ${solPdf ? `<a class="popup-full-link" href="${solPdf}" target="_blank">✅ ${tr("官方解答", "Official sol")}</a>` : ""}
      </div>`;

    if (!hasStructured) {
      const sol = pickLang(prob.solution);
      return `
        ${sol ? `<div class="popup-problem-sol">${escapeHtml(sol)}</div>` : ""}
        ${linksHtml}`;
    }

    const detailed = pickLang(prob.detailed_solution);
    return `
      ${problemField("原题线索", "Original cue", prob.original_excerpt)}
      ${problemField("题意理解", "Problem understanding", prob.problem_understanding)}
      ${problemField("知识点", "Knowledge points", prob.knowledge_points)}
      ${problemTips(prob.tips)}
      ${detailed ? `
        <details class="popup-problem-detail">
          <summary>${tr("详细解法", "Detailed solution")}</summary>
          <div class="popup-problem-detail-text">${formatDetailText(detailed)}</div>
        </details>` : ""}
      ${linksHtml}`;
  }

  function build() {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.innerHTML = `
      <div class="popup-backdrop"></div>
      <div class="popup" role="dialog" aria-modal="true">
        <header class="popup-header">
          <span class="popup-title"></span>
          <span class="popup-progress"></span>
          <button class="popup-close" aria-label="close">✕</button>
        </header>
        <div class="popup-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => {
      const t = e.target;
      if (t.classList.contains("popup-backdrop") || t.closest(".popup-close")) close();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    return overlay;
  }

  function render(slug, anchorEl) {
    if (!popupEl) popupEl = build();
    const data = (window.POPUP_DATA || {})[slug];
    const meta = (window.TOPICS || []).find(t => t.slug === slug);
    if (!meta) return;

    const lang = getLang();
    const name = lang === "en" ? meta.name_en : meta.name_cn;
    popupEl.querySelector(".popup-title").textContent = name;

    // Progress count: tutorial + problems
    const p = getProgress();
    const probCount = (data?.problems || []).length;
    const total = probCount + (data?.tutorial ? 1 : 0);
    let done = 0;
    if (data?.tutorial && p[tutKey(slug)]) done += 1;
    (data?.problems || []).forEach(prob => { if (p[probKey(slug, prob.id)]) done += 1; });
    popupEl.querySelector(".popup-progress").textContent = total ? `${done}/${total}` : "";

    const body = popupEl.querySelector(".popup-body");

    if (!data) {
      body.innerHTML = `<p class="popup-empty">${tr("本算法的速记内容尚未补充。点击右上角链接查看完整笔记 →", "No tutorial / code / HW yet for this topic. See full notes →")}
        <a class="popup-full-link" href="topics/${slug}.html">${tr("完整笔记", "Full notes")}</a></p>`;
      open(anchorEl);
      return;
    }

    // Tutorial
    let tutorialHtml = "";
    if (data.tutorial) {
      const tutDone = !!p[tutKey(slug)];
      tutorialHtml = `
        <section class="popup-section">
          <h4>${tr("📘 教程", "📘 Tutorial")}</h4>
          <div class="popup-tutorial-row">
            <span class="popup-checkbox ${tutDone ? "checked" : ""}" data-tut="1">${tutDone ? "✓" : ""}</span>
            <div class="popup-tutorial-text">${escapeHtml(pickLang(data.tutorial))}</div>
          </div>
          <a class="popup-full-link" href="topics/${slug}.html" target="_self">${tr("完整笔记 →", "Full notes →")}</a>
        </section>`;
    }

    // Code templates — moved off the popup to keep it short.
    // The link below jumps to the #code section on the topic page.
    let codeHtml = "";
    if (data.code && data.code.length) {
      codeHtml = `
        <section class="popup-section">
          <a class="popup-code-link" href="topics/${slug}.html#code">
            <span>${tr("🐍 Python 代码模板", "🐍 Python templates")}</span>
            <span class="popup-code-link-meta">${data.code.length} ${tr("段", "snippet" + (data.code.length > 1 ? "s" : ""))} ›</span>
          </a>
        </section>`;
    }

    // Problems
    let problemsHtml = "";
    if (data.problems && data.problems.length) {
      problemsHtml = `
        <section class="popup-section">
          <div class="popup-section-heading">
            <h4>${tr("📝 习题（HW 节选 · 我的解题思路）", "📝 HW Problems (my answer sketches)")}</h4>
            <a class="popup-section-link" href="problems.html?topic=${encodeURIComponent(slug)}" target="_self">${tr("查看全部 →", "View all →")}</a>
          </div>
          ${data.problems.map(prob => {
            const pdone = !!p[probKey(slug, prob.id)];
            const title = pickLang(prob.title);
            const isLecture = String(prob.hw || "").startsWith("Lecture_");
            const hasSolPdf = Object.prototype.hasOwnProperty.call(prob, "sol_pdf");
            const hwPdf = prob.hw_pdf || (isLecture ? `slides/${prob.hw}.pdf` : `HW/${prob.hw}.pdf`);
            const solPdf = hasSolPdf ? prob.sol_pdf : (!isLecture ? `HW/${prob.hw}_sol.pdf` : "");
            const meta = [String(prob.hw || "").toUpperCase(), prob.section || ""].filter(Boolean).join(" ");
            return `
              <div class="popup-problem" data-pid="${prob.id}">
                <div class="popup-problem-row">
                  <span class="popup-checkbox ${pdone ? "checked" : ""}" data-prob="${prob.id}">${pdone ? "✓" : ""}</span>
                  <span class="popup-problem-title">${escapeHtml(title)}</span>
                  <span class="popup-problem-meta">${escapeHtml(meta)}</span>
                </div>
                <div class="popup-problem-body">
                  ${problemBody(prob, hwPdf, solPdf, isLecture)}
                </div>
              </div>`;
          }).join("")}
        </section>`;
    }

    body.innerHTML = tutorialHtml + codeHtml + problemsHtml ||
      `<p class="popup-empty">${tr("本算法的速记内容尚未补充。", "Content coming soon.")}</p>`;
    typesetMath(body);

    // Wire interactivity
    body.querySelectorAll(".popup-tutorial-row .popup-checkbox").forEach(cb => {
      cb.addEventListener("click", e => {
        e.stopPropagation();
        const next = !cb.classList.contains("checked");
        const cur = getProgress();
        if (next) cur[tutKey(slug)] = true; else delete cur[tutKey(slug)];
        setProgress(cur);
        cb.classList.toggle("checked", next);
        cb.textContent = next ? "✓" : "";
        refreshProgressLabel(slug);
        document.dispatchEvent(new CustomEvent("ml-progress-rerender"));
      });
    });

    body.querySelectorAll(".popup-problem").forEach(div => {
      const pid = div.dataset.pid;
      const checkbox = div.querySelector(".popup-checkbox");
      const row = div.querySelector(".popup-problem-row");

      checkbox.addEventListener("click", e => {
        e.stopPropagation();
        const next = !checkbox.classList.contains("checked");
        const cur = getProgress();
        if (next) cur[probKey(slug, pid)] = true; else delete cur[probKey(slug, pid)];
        setProgress(cur);
        checkbox.classList.toggle("checked", next);
        checkbox.textContent = next ? "✓" : "";
        refreshProgressLabel(slug);
        document.dispatchEvent(new CustomEvent("ml-progress-rerender"));
      });

      row.addEventListener("click", e => {
        if (e.target.closest(".popup-checkbox")) return;
        div.classList.toggle("open");
        if (div.classList.contains("open")) typesetMath(div);
      });
    });

    open(anchorEl);
  }

  function refreshProgressLabel(slug) {
    const data = (window.POPUP_DATA || {})[slug];
    const p = getProgress();
    const total = (data?.problems || []).length + (data?.tutorial ? 1 : 0);
    let done = 0;
    if (data?.tutorial && p[tutKey(slug)]) done += 1;
    (data?.problems || []).forEach(pr => { if (p[probKey(slug, pr.id)]) done += 1; });
    popupEl.querySelector(".popup-progress").textContent = total ? `${done}/${total}` : "";

    // Refresh card-level "done" indicator on home grid
    const card = document.querySelector(`.node[data-slug="${slug}"]`);
    if (card) {
      // Card is "done" when all items checked (or just any progress)
      card.classList.toggle("done", total > 0 && done === total);
    }
  }

  function open(anchorEl) {
    currentAnchor = anchorEl;
    popupEl.classList.add("open");
    // Two-pass: position once, then again on the next frame so the popup's
    // real height is known after the body finished laying out.
    position(anchorEl);
    requestAnimationFrame(() => position(anchorEl));
  }

  // Viewport-aware positioning. The .popup-overlay is `position: fixed`
  // (covers the viewport), so popup coordinates are viewport-relative —
  // do NOT add scrollX / scrollY.
  function position(anchorEl) {
    if (!popupEl || !anchorEl) return;
    const popup = popupEl.querySelector(".popup");
    const anchor = anchorEl.getBoundingClientRect();
    if (anchor.width === 0 && anchor.height === 0) return;  // anchor detached

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;

    // Anchor scrolled fully out of viewport — freeze the popup in place
    // instead of warping it to an off-screen coordinate.
    if (anchor.bottom <= 0 || anchor.top >= vh) return;

    // Width: 480 max, shrink on narrow screens
    const W = Math.min(480, vw - margin * 2);
    popup.style.width = W + "px";

    // Reset prior overrides — we may flip between top/bottom anchoring.
    popup.style.top = "";
    popup.style.bottom = "";
    popup.style.maxHeight = "";

    // Horizontal alignment: prefer anchor's left edge, clamp to viewport.
    let left = anchor.left;
    if (left + W + margin > vw) left = vw - W - margin;
    if (left < margin) left = margin;
    popup.style.left = left + "px";

    // Pick a vertical direction. We need at least 240 px of room to feel
    // usable; otherwise use whichever side has more space.
    const MIN_USABLE = 240;
    const spaceBelow = Math.floor(vh - anchor.bottom - margin);
    const spaceAbove = Math.floor(anchor.top - margin);
    const placeBelow = spaceBelow >= MIN_USABLE || spaceBelow >= spaceAbove;

    // Cap max height to whichever side we picked.
    // The .popup-body inside is `overflow-y: auto`, so long content scrolls.
    if (placeBelow) {
      popup.style.top = (anchor.bottom + margin) + "px";
      popup.style.maxHeight = Math.max(MIN_USABLE, spaceBelow) + "px";
    } else {
      // Anchor by `bottom` so the popup grows upward from anchor.top
      // regardless of how tall its body actually is.
      popup.style.bottom = (vh - anchor.top + margin) + "px";
      popup.style.maxHeight = Math.max(MIN_USABLE, spaceAbove) + "px";
    }

    // Scale-in origin sits near the clicked card.
    const cx = anchor.left + anchor.width / 2 - left;
    const originX = Math.max(20, Math.min(W - 20, cx));
    popup.style.transformOrigin = `${originX}px ${placeBelow ? "top" : "bottom"}`;
  }

  function close() {
    if (popupEl) popupEl.classList.remove("open");
    currentAnchor = null;
  }

  // Public API
  window.openTopicPopup = render;

  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", e => {
      const card = e.target.closest(".node[data-slug]");
      if (!card) return;
      // Allow Cmd/Ctrl-click to open the actual page in a new tab
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      render(card.dataset.slug, card);
    });

    // Re-position the open popup when the viewport changes — keeps the
    // popup inside the viewport and re-picks above/below if its anchor is
    // now near a different edge.
    let resizeRaf = 0;
    const reposition = () => {
      if (!currentAnchor || !popupEl?.classList.contains("open")) return;
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => position(currentAnchor));
    };
    window.addEventListener("resize", reposition);
    // The popup is `position: fixed` so scrolling doesn't drag it, but
    // re-running the math on scroll lets us flip above/below as the
    // anchor card moves through the viewport.
    window.addEventListener("scroll", reposition, { passive: true });
  });
})();
