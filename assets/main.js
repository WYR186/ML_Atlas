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
function setupSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      document.querySelectorAll(".node, .section-node").forEach(n => n.style.opacity = "1");
      return;
    }
    document.querySelectorAll(".node, .section-node").forEach(n => {
      const t = n.textContent.toLowerCase();
      n.style.opacity = t.includes(q) ? "1" : "0.25";
    });
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

  // Block page: highlight TOC active section while scrolling
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length) {
    const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const onScroll = () => {
      let active = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top < 120) active = s;
      }
      tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + active.id));
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

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
});
