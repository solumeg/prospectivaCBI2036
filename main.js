(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const links = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }

  if (toggle && nav) {
    toggle.setAttribute("aria-controls", "site-navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      const opening = toggle.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("is-open", opening);
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
    });
    links.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  if ("IntersectionObserver" in window) {
    const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach(link => link.classList.toggle(
          "is-active", link.getAttribute("href") === "#" + entry.target.id
        ));
      }
    }, { rootMargin: "-20% 0px -66% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
})();
