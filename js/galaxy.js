// galaxy.js — homepage interactions and common bootstrapping
// Registers service worker, handles smooth scroll CTA, progress rings, and contact toast.

// Register Service Worker on all pages that include this script
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    try {
      const base =
        document.querySelector('link[rel="manifest"]')?.getAttribute("href") ||
        "./manifest.json";
      const root = new URL(base, location.href);
      // sw at /codequest/js/sw.js relative to manifest
      const swUrl = new URL("./js/sw.js", root).pathname;
      navigator.serviceWorker.register(swUrl).catch(() => {});
    } catch {}
  });
}

// Smooth scroll for Launch button
const launchBtn = document.getElementById("launchBtn");
if (launchBtn) {
  launchBtn.addEventListener("click", (e) => {
    const sel = launchBtn.getAttribute("data-scroll");
    const el = sel ? document.querySelector(sel) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    const ambient = document.getElementById("ambient");
    if (ambient && ambient.paused) {
      ambient.muted = true; // keep muted for a11y by default
      ambient.play().catch(() => {});
    }
  });
}

// Fake progress from localStorage
(function initProgress() {
  const rings = document.querySelectorAll(".planet-card .ring");
  rings.forEach((ring) => {
    const parent = ring.closest("a");
    const href = parent ? parent.getAttribute("href") : null;
    const path = href ? new URL(href, location.href).pathname : "";
    const key = path ? `cq_progress_${path}` : "";
    const val = Number((key && localStorage.getItem(key)) || 0);
    ring.dataset.progress = String(val);
    ring.setAttribute("aria-valuenow", String(val));
  });
})();

// Contact page toast
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const toast = document.getElementById("toast");
    if (toast) {
      // Optional: include a bold heading if not present
      if (!toast.dataset.enhanced) {
        const text = toast.textContent || "";
        toast.innerHTML = `<strong>Message sent</strong><span>${text}</span>`;
        toast.dataset.enhanced = "true";
      }
      toast.hidden = false;
      toast.classList.add("show");
      // Auto-hide after a short delay
      setTimeout(() => {
        toast.classList.remove("show");
        toast.hidden = true;
      }, 2400);
    }
    form.reset();
  });
}

// Multi-step image fallbacks using data-fallback="url1|url2|..."
function initImgFallbacks() {
  const imgs = document.querySelectorAll("img[data-fallback]");
  imgs.forEach((img) => {
    const list = (img.getAttribute("data-fallback") || "")
      .split("|")
      .filter(Boolean);
    if (!list.length) return;
    let i = 0;
    img.addEventListener("error", function handler() {
      if (i < list.length) {
        img.src = list[i++];
      } else {
        img.removeEventListener("error", handler);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initImgFallbacks);
