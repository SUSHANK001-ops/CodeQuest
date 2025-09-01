// css-selectors.js - Interactive CSS Selectors Planet
class CSSSelectorsplanet {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.userCode = "";
    this.init();
  }

  init() {
    this.setupEditor();
    this.setupButtons();
    this.loadExercise();
  }

  setupEditor() {
    const editorContainer = document.querySelector(".editor-area");
    if (editorContainer) {
      editorContainer.innerHTML = `
        <div class="coding-exercise">
          <div class="exercise-header">
            <h3 id="exercise-title">Exercise ${this.currentStep} of ${
        this.totalSteps
      }</h3>
            <div class="step-indicator">
              ${Array.from(
                { length: this.totalSteps },
                (_, i) =>
                  `<div class="step ${
                    i + 1 <= this.currentStep ? "active" : ""
                  }">${i + 1}</div>`
              ).join("")}
            </div>
          </div>
          
          <div class="exercise-instructions" id="instructions"></div>

          <div class="html-preview" id="html-preview">
            <h4>🌐 HTML Structure (Don't modify)</h4>
            <div class="preview-code" id="preview-html"></div>
          </div>

          <div class="code-editor-container">
            <div class="editor-header">
              <span>🎨 Your CSS Code</span>
              <button id="reset-btn" class="btn-small">Reset</button>
            </div>
            <textarea 
              id="user-code" 
              class="code-editor"
              placeholder="Write your CSS selectors here..."
              spellcheck="false"
            ></textarea>
          </div>

          <div class="exercise-actions">
            <button id="submit-btn" class="btn btn-primary">🎨 Apply CSS</button>
            <button id="hint-btn" class="btn">💡 Get Hint</button>
            <button id="next-btn" class="btn" style="display: none;">Next Exercise →</button>
          </div>

          <div id="feedback" class="feedback-area" style="display: none;"></div>
          
          <div class="live-preview" id="live-preview">
            <h4>🎬 Live Preview</h4>
            <iframe id="preview-frame" style="width: 100%; height: 300px; border: 2px solid var(--light-green); border-radius: 0.5rem;"></iframe>
          </div>
        </div>
      `;
    }
  }

  setupButtons() {
    document
      .getElementById("submit-btn")
      .addEventListener("click", () => this.submitCode());
    document
      .getElementById("hint-btn")
      .addEventListener("click", () => this.showHint());
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetCode());
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.nextExercise());

    document.getElementById("user-code").addEventListener("input", (e) => {
      this.userCode = e.target.value;
      this.updateLivePreview();
      this.hideNextButton();
    });
  }

  loadExercise() {
    const exercises = this.getExercises();
    const currentExercise = exercises[this.currentStep - 1];

    document.getElementById(
      "exercise-title"
    ).textContent = `Exercise ${this.currentStep} of ${this.totalSteps}: ${currentExercise.title}`;
    document.getElementById("instructions").innerHTML =
      currentExercise.instructions;
    document.getElementById(
      "preview-html"
    ).innerHTML = `<pre><code>${this.escapeHtml(
      currentExercise.html
    )}</code></pre>`;
    document.getElementById("user-code").value =
      currentExercise.startingCode || "";

    this.updateStepIndicator();
    this.updateLivePreview();
    this.hideNextButton();
    this.hideFeedback();
  }

  getExercises() {
    return [
      {
        title: "Basic Element Selectors",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Use basic CSS selectors to style the HTML elements:</p>
            <ul>
              <li>✅ Make all <code>h1</code> elements color: blue</li>
              <li>✅ Make all <code>p</code> elements color: green</li>
              <li>✅ Make all <code>span</code> elements font-weight: bold</li>
            </ul>
            <div class="tip">💡 Element selectors target HTML tags directly: h1 { color: blue; }</div>
          </div>
        `,
        html: `<div>
  <h1>Welcome to CSS</h1>
  <p>This is a paragraph.</p>
  <p>This is another paragraph with a <span>bold word</span>.</p>
  <h1>Another heading</h1>
</div>`,
        startingCode: `/* Write your CSS here */
`,
        solution: `h1 {
  color: blue;
}

p {
  color: green;
}

span {
  font-weight: bold;
}`,
        hints: [
          "Use the element name directly as the selector (no # or .)",
          "Don't forget the semicolon after each property!",
          "Each rule should be in the format: selector { property: value; }",
        ],
      },
      {
        title: "ID and Class Selectors",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Use ID and class selectors to target specific elements:</p>
            <ul>
              <li>✅ Style the element with ID "header" with background-color: lightblue</li>
              <li>✅ Style all elements with class "highlight" with background-color: yellow</li>
              <li>✅ Style the element with ID "footer" with text-align: center</li>
            </ul>
            <div class="tip">💡 IDs use # and classes use . in CSS: #myId { } and .myClass { }</div>
          </div>
        `,
        html: `<div>
  <div id="header">
    <h1>My Website</h1>
  </div>
  <div class="content">
    <p class="highlight">This should be highlighted.</p>
    <p>Regular paragraph.</p>
    <p class="highlight">Another highlighted paragraph.</p>
  </div>
  <div id="footer">
    <p>© 2025 My Website</p>
  </div>
</div>`,
        startingCode: `/* Target elements with IDs and classes */
`,
        solution: `#header {
  background-color: lightblue;
}

.highlight {
  background-color: yellow;
}

#footer {
  text-align: center;
}`,
        hints: [
          "ID selectors start with # symbol",
          "Class selectors start with . symbol",
          "IDs should be unique, classes can be used multiple times",
        ],
      },
      {
        title: "Descendant and Child Selectors",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Use advanced selectors to target specific element relationships:</p>
            <ul>
              <li>✅ Style <code>p</code> elements inside <code>.container</code> with color: purple</li>
              <li>✅ Style direct children <code>li</code> of <code>.nav</code> with display: inline-block</li>
              <li>✅ Style <code>strong</code> elements anywhere inside <code>.content</code> with color: red</li>
            </ul>
            <div class="tip">💡 Use space for descendants (.parent p) and > for direct children (.parent > p)</div>
          </div>
        `,
        html: `<div>
  <div class="container">
    <h2>Container Title</h2>
    <p>This paragraph is in the container.</p>
    <div class="inner">
      <p>This paragraph is also in the container.</p>
    </div>
  </div>
  
  <ul class="nav">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
  
  <div class="content">
    <p>Regular paragraph with <strong>important text</strong>.</p>
    <div>
      <strong>Another important text</strong>
    </div>
  </div>
</div>`,
        startingCode: `/* Use descendant and child selectors */
`,
        solution: `.container p {
  color: purple;
}

.nav > li {
  display: inline-block;
}

.content strong {
  color: red;
}`,
        hints: [
          "Descendant selectors use a space: .parent p { }",
          "Child selectors use >: .parent > p { }",
          "Descendant selectors work at any level of nesting",
        ],
      },
      {
        title: "Pseudo-classes and Advanced Selectors",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Use pseudo-classes and advanced selectors:</p>
            <ul>
              <li>✅ Style links on hover with color: orange</li>
              <li>✅ Style the first <code>li</code> in lists with font-weight: bold</li>
              <li>✅ Style even-numbered rows in the table with background-color: #f0f0f0</li>
              <li>✅ Style links that have been visited with color: purple</li>
            </ul>
            <div class="tip">💡 Pseudo-classes use : like :hover, :first-child, :nth-child(even)</div>
          </div>
        `,
        html: `<div>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="https://example.com">External Link</a>
  </nav>
  
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ul>
  
  <table>
    <tr><td>Row 1</td><td>Data</td></tr>
    <tr><td>Row 2</td><td>Data</td></tr>
    <tr><td>Row 3</td><td>Data</td></tr>
    <tr><td>Row 4</td><td>Data</td></tr>
  </table>
</div>`,
        startingCode: `/* Use pseudo-classes and advanced selectors */
`,
        solution: `a:hover {
  color: orange;
}

li:first-child {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f0f0f0;
}

a:visited {
  color: purple;
}`,
        hints: [
          "Pseudo-classes start with a colon (:)",
          "Common pseudo-classes: :hover, :first-child, :visited",
          ":nth-child(even) selects every even-numbered element",
        ],
      },
    ];
  }

  submitCode() {
    const userCode = document.getElementById("user-code").value.trim();
    if (!userCode) {
      this.showFeedback("❌ Please enter some CSS code first!", "error");
      return;
    }

    const exercises = this.getExercises();
    const currentExercise = exercises[this.currentStep - 1];
    const isCorrect = this.validateCode(userCode, currentExercise);

    if (isCorrect) {
      this.showFeedback(
        "🎉 Perfect! Your CSS selectors are working correctly!",
        "success"
      );
      this.showNextButton();
      this.updateProgress();
    } else {
      this.showFeedback(
        "❌ Not quite right. Check the requirements and try again!",
        "error"
      );
    }
  }

  validateCode(userCode, exercise) {
    const requirements = this.getRequirementsForStep(this.currentStep);
    return requirements.every((req) => {
      const regex = new RegExp(req.pattern, "i");
      return regex.test(userCode.replace(/\s+/g, " "));
    });
  }

  getRequirementsForStep(step) {
    const requirements = {
      1: [
        { pattern: "h1\\s*{[^}]*color\\s*:\\s*blue" },
        { pattern: "p\\s*{[^}]*color\\s*:\\s*green" },
        { pattern: "span\\s*{[^}]*font-weight\\s*:\\s*bold" },
      ],
      2: [
        { pattern: "#header\\s*{[^}]*background-color\\s*:\\s*lightblue" },
        { pattern: "\\.highlight\\s*{[^}]*background-color\\s*:\\s*yellow" },
        { pattern: "#footer\\s*{[^}]*text-align\\s*:\\s*center" },
      ],
      3: [
        { pattern: "\\.container\\s+p\\s*{[^}]*color\\s*:\\s*purple" },
        { pattern: "\\.nav\\s*>\\s*li\\s*{[^}]*display\\s*:\\s*inline-block" },
        { pattern: "\\.content\\s+strong\\s*{[^}]*color\\s*:\\s*red" },
      ],
      4: [
        { pattern: "a:hover\\s*{[^}]*color\\s*:\\s*orange" },
        { pattern: "li:first-child\\s*{[^}]*font-weight\\s*:\\s*bold" },
        { pattern: "tr:nth-child\\(even\\)\\s*{[^}]*background-color" },
        { pattern: "a:visited\\s*{[^}]*color\\s*:\\s*purple" },
      ],
    };
    return requirements[step] || [];
  }

  updateLivePreview() {
    const exercises = this.getExercises();
    const currentExercise = exercises[this.currentStep - 1];
    const userCode = document.getElementById("user-code").value;

    const previewHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; margin: 10px 0; }
          td { border: 1px solid #ddd; padding: 8px; }
          a { margin-right: 10px; }
          ${userCode}
        </style>
      </head>
      <body>
        ${currentExercise.html}
      </body>
      </html>
    `;

    const iframe = document.getElementById("preview-frame");
    iframe.srcdoc = previewHTML;
  }

  showHint() {
    const exercises = this.getExercises();
    const currentExercise = exercises[this.currentStep - 1];
    const hints = currentExercise.hints;

    if (hints && hints.length > 0) {
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      this.showFeedback(`💡 Hint: ${randomHint}`, "hint");
    }
  }

  showFeedback(message, type) {
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = `<div class="feedback-${type}">${message}</div>`;
    feedback.style.display = "block";
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  hideFeedback() {
    document.getElementById("feedback").style.display = "none";
  }

  showNextButton() {
    document.getElementById("next-btn").style.display = "inline-flex";
  }

  hideNextButton() {
    document.getElementById("next-btn").style.display = "none";
  }

  resetCode() {
    const exercises = this.getExercises();
    const currentExercise = exercises[this.currentStep - 1];
    document.getElementById("user-code").value =
      currentExercise.startingCode || "";
    this.updateLivePreview();
    this.hideFeedback();
    this.hideNextButton();
  }

  nextExercise() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.loadExercise();
    } else {
      this.completePlanet();
    }
  }

  updateStepIndicator() {
    const steps = document.querySelectorAll(".step");
    steps.forEach((step, index) => {
      if (index + 1 <= this.currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  updateProgress() {
    const progress = (this.currentStep / this.totalSteps) * 100;
    localStorage.setItem("cq_progress_/planets/css-selectors.html", progress);
  }

  completePlanet() {
    this.showFeedback(
      "🎨 Amazing! You've mastered CSS selectors! Ready to explore more planets?",
      "success"
    );
    document.getElementById("next-btn").textContent = "🌌 Return to Galaxy";
    document.getElementById("next-btn").onclick = () => {
      window.location.href = "../index.html#planets";
    };
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the planet when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new CSSSelectorsplanet();
});
