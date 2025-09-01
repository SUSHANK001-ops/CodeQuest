// update-planets.js - Script to update all planet pages with new interactive system

const planets = [
  {
    file: "css-selectors.html",
    jsFile: "css-selectors.js",
    title: "CSS Selectors Planet",
    description: "Master CSS selectors through interactive styling challenges",
    emoji: "🎨",
  },
  {
    file: "js-variables.html",
    jsFile: "js-variables.js",
    title: "JavaScript Variables Planet",
    description:
      "Learn JavaScript variables and data types with hands-on exercises",
    emoji: "⚡",
  },
  {
    file: "js-dom.html",
    jsFile: "js-dom.js",
    title: "JavaScript DOM Planet",
    description: "Manipulate web pages dynamically with DOM programming",
    emoji: "🌐",
  },
  {
    file: "html-forms.html",
    jsFile: "html-forms.js",
    title: "HTML Forms Planet",
    description:
      "Create interactive forms with proper validation and accessibility",
    emoji: "📝",
  },
  {
    file: "css-flexgrid.html",
    jsFile: "css-flexgrid.js",
    title: "CSS Flexbox & Grid Planet",
    description: "Master modern CSS layout techniques with flexbox and grid",
    emoji: "📐",
  },
  {
    file: "js-events.html",
    jsFile: "js-events.js",
    title: "JavaScript Events Planet",
    description: "Handle user interactions with event-driven programming",
    emoji: "🎮",
  },
  {
    file: "mission-control.html",
    jsFile: "mission-control.js",
    title: "Mission Control",
    description: "Final challenge combining all your web development skills",
    emoji: "🚀",
  },
];

function generatePlanetHTML(planet) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${planet.title} – CodeQuest</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Orbitron:wght@600;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../css/main.css" />
    <link rel="stylesheet" href="../css/planets.css" />
    <link rel="stylesheet" href="../css/animations.css" />
    <link rel="manifest" href="../manifest.json" />
    <link rel="icon" type="image/svg+xml" href="../assets/icons/rocket.svg" />
  </head>
  <body>
    <header class="site-header container" role="banner">
      <a class="logo" href="../index.html">
        <img
          src="../assets/icons/rocket.svg"
          alt="CodeQuest rocket logo"
          width="24"
          height="24"
        />
        <span>CodeQuest</span>
      </a>
      <nav class="site-nav" aria-label="Planet">
        <ul>
          <li><a href="../index.html#planets">Back to Galaxy</a></li>
        </ul>
      </nav>
    </header>

    <main class="container split" id="main" tabindex="-1">
      <section aria-labelledby="lesson-title" class="lesson-content animate-fade-up">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
          <div style="font-size: 3rem;">${planet.emoji}</div>
          <div>
            <h1 id="lesson-title" style="background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; color: transparent; margin: 0;">${planet.title}</h1>
            <p style="color: var(--muted); margin: 0.5rem 0 0;">${planet.description}</p>
          </div>
        </div>
        
        <div class="interactive-demo">
          <p>
            🚀 <strong>Welcome to ${planet.title}!</strong> Complete interactive exercises by following the instructions and writing your own code.
            Each exercise builds on the previous one to help you master the concepts step by step.
          </p>
        </div>
      </section>

      <section class="editor-wrap" aria-label="Interactive Exercises">
        <div class="editor-area">
          <!-- Interactive exercises will be loaded here by JavaScript -->
        </div>
      </section>
    </main>

    <script type="module" src="../js/galaxy.js"></script>
    <script type="module" src="../js/${planet.jsFile}"></script>
  </body>
</html>`;
}

// This script would be used to generate all planet HTML files
// For now, we'll provide the template that can be used manually
console.log(
  "Planet HTML template ready. Use generatePlanetHTML(planet) for each planet."
);
