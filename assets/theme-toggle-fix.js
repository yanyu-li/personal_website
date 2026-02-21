<script>
(() => {
  const KEY = "quarto-color-scheme";

  const setBodyMode = (isDark) => {
    const body = document.body;
    if (!body) return;
    body.classList.toggle("quarto-dark", isDark);
    body.classList.toggle("quarto-light", !isDark);
  };

  const setStylesheets = (isDark) => {
    const primary = document.querySelectorAll("link.quarto-color-scheme:not(.quarto-color-alternate)");
    const alternate = document.querySelectorAll("link.quarto-color-scheme.quarto-color-alternate");
    for (const el of primary) {
      if (isDark && el.id !== "quarto-bootstrap") continue;
      el.rel = "stylesheet";
    }
    for (const el of alternate) {
      el.rel = isDark ? "stylesheet" : "disabled-stylesheet";
    }
  };

  const getStoredChoice = () => {
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      return null;
    }
  };

  const setStoredChoice = (isDark) => {
    try {
      window.localStorage.setItem(KEY, isDark ? "alternate" : "default");
    } catch {
      // Ignore storage failures in restricted environments.
    }
  };

  const applyTheme = (isDark) => {
    setStylesheets(isDark);
    setBodyMode(isDark);
  };

  const detectInitialDark = () => {
    const stored = getStoredChoice();
    if (stored === "alternate") return true;
    if (stored === "default") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const toggle = () => {
    const isDark = !document.body.classList.contains("quarto-dark");
    applyTheme(isDark);
    setStoredChoice(isDark);
  };

  window.quartoToggleColorScheme = toggle;

  const bindToggles = () => {
    const toggles = document.querySelectorAll(".quarto-color-scheme-toggle");
    for (const el of toggles) {
      el.onclick = (ev) => {
        if (ev) ev.preventDefault();
        toggle();
        return false;
      };
    }
  };

  const init = () => {
    applyTheme(detectInitialDark());
    bindToggles();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
</script>
