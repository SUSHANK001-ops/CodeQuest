// planetEngine.js — Monaco loader + topic-scoped editors + live preview
// Only loaded on planet pages.

const baseDefaults = {
  html: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8"/>\n    <meta name="viewport" content="width=device-width, initial-scale=1"/>\n    <title>Playground</title>\n  </head>\n  <body>\n    <main>\n      <h1 id="app">Hello, CodeQuest!</h1>\n      <p>Edit the code and press Run.</p>\n    </main>\n  </body>\n</html>',
  css: "body{font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;padding:1rem;}\nmain{max-width:720px;margin:auto;}\n#app{color:#16a34a}",
  js: "document.getElementById('app').addEventListener('click',()=>{\n  const el=document.getElementById('app');\n  el.textContent='You clicked the app!';\n});",
};

function getPlanetId() {
  const file = location.pathname.split("/").pop() || "";
  return file.replace(".html", "");
}

function planetDefaults(id) {
  switch (id) {
    case "html-basics":
      return {
        html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8"/>\n  <meta name="viewport" content="width=device-width, initial-scale=1"/>\n  <title>HTML Basics</title>\n</head>\n<body>\n  <header><h1>My First Page</h1></header>\n  <main>\n    <p>Edit this text, add a <strong>list</strong>, and a link.</p>\n  </main>\n  <footer>© You</footer>\n</body>\n</html>',
        css: "",
        js: "",
        langs: ["html"],
      };
    case "html-forms":
      return {
        html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8"/>\n  <meta name="viewport" content="width=device-width, initial-scale=1"/>\n  <title>HTML Forms</title>\n</head>\n<body>\n  <main>\n    <form>\n      <label>Name <input required name="name"></label>\n      <label>Email <input type="email" required name="email"></label>\n      <button>Submit</button>\n    </form>\n  </main>\n</body>\n</html>',
        css: "",
        js: "",
        langs: ["html"],
      };
    case "css-selectors":
      return {
        html: '<main>\n  <h1>Style the items</h1>\n  <p class="hint">Use class, id, and attribute selectors.</p>\n  <ul>\n    <li class="item">Alpha</li>\n    <li class="item special">Beta</li>\n    <li id="gamma">Gamma</li>\n  </ul>\n  <a href="#" title="cta">Link</a>\n</main>',
        css: "/* Make only .special green, #gamma bold, and [title] underlined */\n.item.special{ color:#16a34a }\n#gamma{ font-weight:700 }\n[a][title]{ text-decoration:underline }",
        js: "",
        langs: ["html", "css"],
      };
    case "css-flexgrid":
      return {
        html: '<main>\n  <h1>Lay out the cards</h1>\n  <div class="grid">\n    <article class="card">One</article>\n    <article class="card">Two</article>\n    <article class="card">Three</article>\n    <article class="card">Four</article>\n  </div>\n</main>',
        css: "/* Use Flex or Grid to create a responsive layout */\n.grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px }\n.card{ background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:12px }",
        js: "",
        langs: ["html", "css"],
      };
    case "js-variables":
      return {
        html: '<main>\n  <h1>Variables</h1>\n  <pre id="out"></pre>\n</main>',
        css: "pre{background:#0b1e14; color:#eafff3; padding:10px; border-radius:8px}",
        js: 'const planet = "CodeQuest";\nlet score = 0;\nscore += 10;\nconst msg = `Welcome to ${planet}! Score: ${score}`;\ndocument.getElementById("out").textContent = msg;',
        langs: ["html", "css", "js"],
      };
    case "js-dom":
      return {
        html: '<main>\n  <h1>DOM Practice</h1>\n  <button id="btn">Add item</button>\n  <ul id="list"><li>Start</li></ul>\n</main>',
        css: "li{margin:4px 0}",
        js: 'const list = document.getElementById("list");\nconst btn = document.getElementById("btn");\nlet i=1;\nbtn.addEventListener("click",()=>{\n  const li = document.createElement("li");\n  li.textContent = "Item "+(++i);\n  list.appendChild(li);\n});',
        langs: ["html", "css", "js"],
      };
    case "js-events":
      return {
        html: '<main>\n  <h1>Events</h1>\n  <button id="clicker">Click me</button>\n  <input id="name" placeholder="Type your name"/>\n  <p id="log"></p>\n</main>',
        css: "#log{margin-top:8px}",
        js: 'const log = document.getElementById("log");\nconst btn = document.getElementById("clicker");\nconst input = document.getElementById("name");\nbtn.addEventListener("click",()=>{ log.textContent = "Clicked!" });\ninput.addEventListener("input",()=>{ log.textContent = `Hello, ${input.value}`; });',
        langs: ["html", "css", "js"],
      };
    case "mission-control":
      return {
        html: '<main>\n  <header><h1>Launch</h1></header>\n  <section class="hero"><p>Build a tiny landing page.</p></section>\n  <section class="features">\n    <article>Fast</article><article>Accessible</article><article>Offline</article>\n  </section>\n</main>',
        css: ".hero{padding:12px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px}\n.features{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.features article{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px}",
        js: "",
        langs: ["html", "css", "js"],
      };
    default:
      return { ...baseDefaults, langs: ["html", "css", "js"] };
  }
}

function $(sel, root = document) {
  return root.querySelector(sel);
}

function getStorageKey(suffix) {
  const path = location.pathname.split("/").pop() || "planet";
  return `cq_${path}_${suffix}`;
}

function save(code) {
  localStorage.setItem(getStorageKey("html"), code.html);
  localStorage.setItem(getStorageKey("css"), code.css);
  localStorage.setItem(getStorageKey("js"), code.js);
}

function load() {
  const id = getPlanetId();
  const def = planetDefaults(id);
  return {
    html:
      localStorage.getItem(getStorageKey("html")) ||
      def.html ||
      baseDefaults.html,
    css:
      localStorage.getItem(getStorageKey("css")) || def.css || baseDefaults.css,
    js: localStorage.getItem(getStorageKey("js")) || def.js || baseDefaults.js,
    langs: def.langs || ["html", "css", "js"],
  };
}

function updateProgress(percent) {
  const path = location.pathname;
  const key = `cq_progress_${path}`;
  localStorage.setItem(key, String(percent));
}

async function initMonaco() {
  const container = $("#editor");
  if (!container) return null;

  // Lazy-load Monaco from CDN with timeout
  const base =
    "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.50.0/min";
  window.require = { paths: { vs: base + "/vs" } };
  try {
    await Promise.race([
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = base + "/vs/loader.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 4000)
      ),
    ]);
  } catch (e) {
    return initFallbackEditors(container);
  }

  return new Promise((resolve) => {
    // @ts-ignore
    window.require(["vs/editor/editor.main"], () => {
      const code = load();
      const langs = code.langs;
      const make = (lang, value) => {
        const el = document.createElement("div");
        el.style.height = "220px";
        container.append(el);
        // @ts-ignore
        return monaco.editor.create(el, {
          value,
          language: lang,
          theme: "vs-dark",
          automaticLayout: true,
        });
      };
      const stubs = {
        htmlEd: { getValue: () => code.html, setValue: () => {} },
        cssEd: { getValue: () => code.css, setValue: () => {} },
        jsEd: { getValue: () => code.js, setValue: () => {} },
      };
      const editors = { ...stubs };
      if (langs.includes("html")) editors.htmlEd = make("html", code.html);
      if (langs.includes("css")) editors.cssEd = make("css", code.css);
      if (langs.includes("js")) editors.jsEd = make("javascript", code.js);
      resolve({ ...editors, isFallback: false, langs });
    });
  });
}

function initFallbackEditors(container) {
  const code = load();
  const wrap = document.createElement("div");
  wrap.className = "fallback-stack";

  const mk = (label, val) => {
    const field = document.createElement("div");
    const lab = document.createElement("label");
    lab.textContent = label;
    lab.className = "tiny";
    const ta = document.createElement("textarea");
    ta.className = "fallback-editor";
    ta.value = val;
    field.append(lab, ta);
    return { field, ta };
  };

  const wants = code.langs;
  const parts = {};
  if (wants.includes("html")) parts.h = mk("HTML", code.html);
  if (wants.includes("css")) parts.c = mk("CSS", code.css);
  if (wants.includes("js")) parts.j = mk("JS", code.js);
  Object.values(parts).forEach((p) => wrap.append(p.field));
  container.appendChild(wrap);

  return {
    htmlEd: parts.h
      ? {
          getValue: () => parts.h.ta.value,
          setValue: (v) => (parts.h.ta.value = v),
        }
      : { getValue: () => code.html, setValue: () => {} },
    cssEd: parts.c
      ? {
          getValue: () => parts.c.ta.value,
          setValue: (v) => (parts.c.ta.value = v),
        }
      : { getValue: () => code.css, setValue: () => {} },
    jsEd: parts.j
      ? {
          getValue: () => parts.j.ta.value,
          setValue: (v) => (parts.j.ta.value = v),
        }
      : { getValue: () => code.js, setValue: () => {} },
    isFallback: true,
    langs: wants,
  };
}

function buildHTMLDoc(html, css, js) {
  const cssTag = `<style>\n${css}\n</style>`;
  const jsTag = `<script>\ntry{\n${js}\n}catch(e){console.error(e);document.body.insertAdjacentHTML('beforeend', '<pre>'+e.toString()+'</pre>')}\n<\/script>`;
  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${cssTag}\n${jsTag}\n</body>`);
  }
  return `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8"/>\n${cssTag}\n</head>\n<body>\n${html}\n${jsTag}\n</body>\n</html>`;
}

function runPreview(editors) {
  const iframe = document.getElementById("preview");
  if (!iframe) return;
  const wants = editors.langs ||
    planetDefaults(getPlanetId()).langs || ["html", "css", "js"];
  const html = editors.htmlEd.getValue();
  const css = wants.includes("css") ? editors.cssEd.getValue() : "";
  const js = wants.includes("js") ? editors.jsEd.getValue() : "";
  // Persist only what this planet allows (others cleared)
  save({ html, css, js });
  const doc = buildHTMLDoc(html, css, js);
  const blob = new Blob([doc], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  iframe.src = url;
  const raw = html.length + css.length + js.length;
  const pct = 25 + Math.min(75, Math.round(raw / 400));
  updateProgress(pct);
}

function resetEditors(editors) {
  const id = getPlanetId();
  const def = planetDefaults(id);
  // setValue may be a no-op for stubs; that's fine
  editors.htmlEd.setValue &&
    editors.htmlEd.setValue(def.html || baseDefaults.html);
  editors.cssEd.setValue && editors.cssEd.setValue(def.css || baseDefaults.css);
  editors.jsEd.setValue && editors.jsEd.setValue(def.js || baseDefaults.js);
  save({
    html: def.html || baseDefaults.html,
    css: def.css || baseDefaults.css,
    js: def.js || baseDefaults.js,
  });
  updateProgress(0);
  runPreview(editors);
}

(async function boot() {
  const toolbar = document.querySelector(".editor-toolbar");
  const runBtn = document.getElementById("runBtn");
  const resetBtn = document.getElementById("resetBtn");
  const fullBtn = document.getElementById("fullBtn");

  const editors = await initMonaco();
  if (!editors) return;
  // Initial preview and a tiny initial progress for first load
  runPreview(editors);

  runBtn && runBtn.addEventListener("click", () => runPreview(editors));
  resetBtn && resetBtn.addEventListener("click", () => resetEditors(editors));
  fullBtn &&
    fullBtn.addEventListener("click", () => {
      const wrap = document.querySelector(".editor-wrap");
      if (!wrap) return;
      if (!document.fullscreenElement) wrap.requestFullscreen().catch(() => {});
      else document.exitFullscreen().catch(() => {});
    });
})();
