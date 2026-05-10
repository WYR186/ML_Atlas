// theme.js — light / dark mode toggle.
//
// Loads as the FIRST <script> on every page (right after the favicon
// link, before style.css's effects matter). It does two things:
//
//   1. Reads `ml_review_theme_v1` from localStorage and writes
//      data-theme onto <html> synchronously, BEFORE the first paint.
//      This is what stops the dark→light "flash of wrong theme" on
//      every navigation. Falls back to the OS-level
//      prefers-color-scheme on first visit.
//
//   2. Once the DOM is ready, injects a small ☀️ / 🌙 toggle button
//      into the topbar (after the search box), wires the click to
//      flip the theme, and notifies listeners via a custom
//      `ml-theme-changed` event so atlas-rf.js / mermaid can re-paint.
//
// Persisted shape: localStorage["ml_review_theme_v1"] ∈ {"light","dark"}.

(function () {
  const KEY = "ml_review_theme_v1";

  function read() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch {}
  }
  function systemPref() {
    try {
      return window.matchMedia &&
             window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";
    } catch { return "light"; }
  }
  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.dispatchEvent(new CustomEvent("ml-theme-changed", {
      detail: { theme },
    }));
  }

  // 1. Synchronous boot — before paint.
  const stored = read();
  const initial = (stored === "dark" || stored === "light")
    ? stored
    : systemPref();
  document.documentElement.setAttribute("data-theme", initial);

  // Public API.
  window.MLTheme = {
    get: () => document.documentElement.getAttribute("data-theme") || "light",
    set: (theme) => {
      const v = theme === "dark" ? "dark" : "light";
      write(v); apply(v);
    },
    toggle: () => {
      const next = window.MLTheme.get() === "dark" ? "light" : "dark";
      window.MLTheme.set(next);
    },
  };

  // Follow OS changes only when the user hasn't explicitly chosen.
  try {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener && mq.addEventListener("change", (e) => {
      if (read()) return; // user has a saved preference, leave it alone
      apply(e.matches ? "dark" : "light");
    });
  } catch {}

  // 2. Inject the toggle button into the topbar after DOM is ready.
  function buildButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle dark mode");
    btn.title = "Toggle dark mode";
    btn.innerHTML =
      '<span class="icon-moon" aria-hidden="true">🌙</span>' +
      '<span class="icon-sun"  aria-hidden="true">☀️</span>';
    btn.addEventListener("click", () => window.MLTheme.toggle());
    return btn;
  }

  function mount() {
    const inner = document.querySelector(".topbar-inner");
    if (!inner || inner.querySelector(".theme-toggle")) return;
    const btn = buildButton();
    // Place it at the far right (after search box if there is one).
    const search = inner.querySelector(".search-box");
    if (search && search.nextSibling) {
      inner.insertBefore(btn, search.nextSibling);
    } else if (search) {
      inner.appendChild(btn);
    } else {
      inner.appendChild(btn);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
