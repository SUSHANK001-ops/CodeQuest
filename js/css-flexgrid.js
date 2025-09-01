class CSSFlexGridPlanet {
  constructor() {
    this.currentStep = 0;
    this.exercises = [
      {
        title: "Flexbox Basics",
        instruction:
          "Create a flex container with three items arranged horizontally:",
        starterCode: `.container {\n  /* Add flex properties here */\n}\n\n.item {\n  background: #4CAF50;\n  color: white;\n  padding: 20px;\n  margin: 5px;\n}`,
        solution: `.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.item {\n  background: #4CAF50;\n  color: white;\n  padding: 20px;\n  margin: 5px;\n}`,
        hint: "Use 'display: flex' to create a flex container, and 'justify-content' to arrange items",
      },
      {
        title: "Flex Direction & Wrap",
        instruction:
          "Create a vertical flex container that wraps items when needed:",
        starterCode: `.container {\n  display: flex;\n  /* Add flex direction and wrap */\n}\n\n.item {\n  background: #2196F3;\n  color: white;\n  padding: 15px;\n  margin: 5px;\n  min-width: 150px;\n}`,
        solution: `.container {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  height: 300px;\n  align-content: flex-start;\n}\n\n.item {\n  background: #2196F3;\n  color: white;\n  padding: 15px;\n  margin: 5px;\n  min-width: 150px;\n}`,
        hint: "Use 'flex-direction: column' and 'flex-wrap: wrap' properties",
      },
      {
        title: "CSS Grid Basics",
        instruction: "Create a 3-column grid layout with equal-width columns:",
        starterCode: `.grid-container {\n  /* Add grid properties here */\n}\n\n.grid-item {\n  background: #FF9800;\n  color: white;\n  padding: 20px;\n  text-align: center;\n  border: 2px solid white;\n}`,
        solution: `.grid-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n}\n\n.grid-item {\n  background: #FF9800;\n  color: white;\n  padding: 20px;\n  text-align: center;\n  border: 2px solid white;\n}`,
        hint: "Use 'display: grid', 'grid-template-columns', and 'gap' properties",
      },
      {
        title: "Advanced Grid Layout",
        instruction:
          "Create a responsive grid with header, sidebar, main content, and footer:",
        starterCode: `.page-grid {\n  /* Add grid template areas */\n}\n\n.header { background: #9C27B0; }\n.sidebar { background: #607D8B; }\n.main { background: #4CAF50; }\n.footer { background: #795548; }\n\n.header, .sidebar, .main, .footer {\n  color: white;\n  padding: 20px;\n  text-align: center;\n}`,
        solution: `.page-grid {\n  display: grid;\n  grid-template-areas:\n    "header header header"\n    "sidebar main main"\n    "footer footer footer";\n  grid-template-rows: 80px 1fr 60px;\n  gap: 10px;\n  min-height: 400px;\n}\n\n.header { \n  background: #9C27B0;\n  grid-area: header;\n}\n.sidebar { \n  background: #607D8B;\n  grid-area: sidebar;\n}\n.main { \n  background: #4CAF50;\n  grid-area: main;\n}\n.footer { \n  background: #795548;\n  grid-area: footer;\n}\n\n.header, .sidebar, .main, .footer {\n  color: white;\n  padding: 20px;\n  text-align: center;\n}`,
        hint: "Use 'grid-template-areas' to define layout regions and 'grid-area' to assign elements to those regions",
      },
    ];

    this.init();
  }

  init() {
    this.createExerciseInterface();
    this.loadExercise(0);
  }

  createExerciseInterface() {
    const container = document.getElementById("coding-exercises");

    container.innerHTML = `
      <div class="exercise-header">
        <h2 id="exercise-title">${this.exercises[0].title}</h2>
        <div class="step-indicator">
          ${this.exercises
            .map(
              (_, index) =>
                `<div class="step ${
                  index === 0 ? "active" : ""
                }" data-step="${index}">${index + 1}</div>`
            )
            .join("")}
        </div>
      </div>

      <div class="exercise-content">
        <div class="instruction-panel">
          <h3>Instructions</h3>
          <p id="exercise-instruction">${this.exercises[0].instruction}</p>
          
          <div class="hint-section" style="display: none;">
            <h4>💡 Hint</h4>
            <p id="exercise-hint">${this.exercises[0].hint}</p>
          </div>
        </div>

        <div class="coding-area">
          <div class="code-editor">
            <h4>CSS Code</h4>
            <textarea 
              id="code-input" 
              placeholder="Type your CSS here..."
              rows="12"
            >${this.exercises[0].starterCode}</textarea>
            
            <div class="editor-controls">
              <button id="submit-btn" class="btn btn-primary">Submit</button>
              <button id="hint-btn" class="btn btn-secondary">Show Hint</button>
              <button id="reset-btn" class="btn">Reset</button>
            </div>
          </div>

          <div class="preview-area">
            <h4>Preview</h4>
            <div class="preview-frame">
              <iframe id="preview-iframe" sandbox="allow-same-origin"></iframe>
            </div>
          </div>
        </div>

        <div id="feedback-area" class="feedback-area"></div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Submit button
    document.getElementById("submit-btn").addEventListener("click", () => {
      this.checkSolution();
    });

    // Hint button
    document.getElementById("hint-btn").addEventListener("click", () => {
      const hintSection = document.querySelector(".hint-section");
      hintSection.style.display =
        hintSection.style.display === "none" ? "block" : "none";
    });

    // Reset button
    document.getElementById("reset-btn").addEventListener("click", () => {
      this.resetExercise();
    });

    // Step indicators
    document.querySelectorAll(".step").forEach((step) => {
      step.addEventListener("click", (e) => {
        const stepIndex = parseInt(e.target.dataset.step);
        if (stepIndex <= this.getUnlockedSteps()) {
          this.loadExercise(stepIndex);
        }
      });
    });

    // Live preview on input
    document.getElementById("code-input").addEventListener("input", () => {
      this.updatePreview();
    });

    // Initial preview
    this.updatePreview();
  }

  loadExercise(index) {
    this.currentStep = index;
    const exercise = this.exercises[index];

    // Update UI
    document.getElementById("exercise-title").textContent = exercise.title;
    document.getElementById("exercise-instruction").textContent =
      exercise.instruction;
    document.getElementById("exercise-hint").textContent = exercise.hint;
    document.getElementById("code-input").value = exercise.starterCode;

    // Update step indicators
    document.querySelectorAll(".step").forEach((step, i) => {
      step.classList.remove("active", "completed");
      if (i === index) {
        step.classList.add("active");
      } else if (i < this.getUnlockedSteps()) {
        step.classList.add("completed");
      }
    });

    // Hide hint and feedback
    document.querySelector(".hint-section").style.display = "none";
    document.getElementById("feedback-area").innerHTML = "";

    // Update preview
    this.updatePreview();
  }

  updatePreview() {
    const cssCode = document.getElementById("code-input").value;
    const iframe = document.getElementById("preview-iframe");

    let htmlContent = "";

    // Generate appropriate HTML for each exercise
    switch (this.currentStep) {
      case 0: // Flexbox basics
        htmlContent = `
          <div class="container">
            <div class="item">Item 1</div>
            <div class="item">Item 2</div>
            <div class="item">Item 3</div>
          </div>
        `;
        break;
      case 1: // Flex direction & wrap
        htmlContent = `
          <div class="container">
            <div class="item">Item 1</div>
            <div class="item">Item 2</div>
            <div class="item">Item 3</div>
            <div class="item">Item 4</div>
            <div class="item">Item 5</div>
            <div class="item">Item 6</div>
          </div>
        `;
        break;
      case 2: // CSS Grid basics
        htmlContent = `
          <div class="grid-container">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
          </div>
        `;
        break;
      case 3: // Advanced grid layout
        htmlContent = `
          <div class="page-grid">
            <div class="header">Header</div>
            <div class="sidebar">Sidebar</div>
            <div class="main">Main Content</div>
            <div class="footer">Footer</div>
          </div>
        `;
        break;
    }

    const previewHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              margin: 20px;
              line-height: 1.6;
            }
            
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    iframe.src =
      "data:text/html;charset=utf-8," + encodeURIComponent(previewHTML);
  }

  checkSolution() {
    const userCode = document.getElementById("code-input").value.trim();
    const exercise = this.exercises[this.currentStep];
    const feedbackArea = document.getElementById("feedback-area");

    // Basic validation checks
    const checks = this.validateCSS(userCode, exercise);

    if (checks.isCorrect) {
      feedbackArea.innerHTML = `
        <div class="feedback success">
          <h4>🎉 Excellent!</h4>
          <p>Your layout looks great! You've mastered ${exercise.title.toLowerCase()}!</p>
          ${
            this.currentStep < this.exercises.length - 1
              ? '<button id="next-btn" class="btn btn-primary">Next Exercise →</button>'
              : "<p><strong>🚀 Mission Complete! You've mastered CSS Flex & Grid!</strong></p>"
          }
        </div>
      `;

      // Mark step as completed
      this.markStepCompleted(this.currentStep);

      // Add next button listener
      const nextBtn = document.getElementById("next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          this.loadExercise(this.currentStep + 1);
        });
      }
    } else {
      feedbackArea.innerHTML = `
        <div class="feedback error">
          <h4>🤔 Not quite right</h4>
          <ul>
            ${checks.errors.map((error) => `<li>${error}</li>`).join("")}
          </ul>
          <p>Try again! Use the hint if you need help.</p>
        </div>
      `;
    }
  }

  validateCSS(userCode, exercise) {
    const errors = [];
    let isCorrect = false;

    const code = userCode.toLowerCase().replace(/\s+/g, " ");

    switch (this.currentStep) {
      case 0: // Flexbox basics
        if (!code.includes("display: flex") && !code.includes("display:flex")) {
          errors.push("Missing 'display: flex' property");
        }
        if (!code.includes("justify-content")) {
          errors.push(
            "Missing 'justify-content' property for horizontal alignment"
          );
        }
        isCorrect = errors.length === 0;
        break;

      case 1: // Flex direction & wrap
        if (!code.includes("display: flex") && !code.includes("display:flex")) {
          errors.push("Missing 'display: flex' property");
        }
        if (
          !code.includes("flex-direction: column") &&
          !code.includes("flex-direction:column")
        ) {
          errors.push("Missing 'flex-direction: column' property");
        }
        if (!code.includes("flex-wrap") && !code.includes("flexwrap")) {
          errors.push("Missing 'flex-wrap' property");
        }
        isCorrect = errors.length === 0;
        break;

      case 2: // CSS Grid basics
        if (!code.includes("display: grid") && !code.includes("display:grid")) {
          errors.push("Missing 'display: grid' property");
        }
        if (!code.includes("grid-template-columns")) {
          errors.push("Missing 'grid-template-columns' property");
        }
        if (!code.includes("1fr")) {
          errors.push("Use '1fr' units for equal-width columns");
        }
        isCorrect = errors.length === 0;
        break;

      case 3: // Advanced grid layout
        if (!code.includes("display: grid") && !code.includes("display:grid")) {
          errors.push("Missing 'display: grid' property");
        }
        if (!code.includes("grid-template-areas")) {
          errors.push(
            "Missing 'grid-template-areas' property to define layout regions"
          );
        }
        if (!code.includes("grid-area")) {
          errors.push(
            "Missing 'grid-area' properties to assign elements to regions"
          );
        }
        if (
          !code.includes("header") ||
          !code.includes("sidebar") ||
          !code.includes("main") ||
          !code.includes("footer")
        ) {
          errors.push(
            "Make sure to define all layout areas: header, sidebar, main, footer"
          );
        }
        isCorrect = errors.length === 0;
        break;
    }

    return { isCorrect, errors };
  }

  resetExercise() {
    const exercise = this.exercises[this.currentStep];
    document.getElementById("code-input").value = exercise.starterCode;
    document.getElementById("feedback-area").innerHTML = "";
    document.querySelector(".hint-section").style.display = "none";
    this.updatePreview();
  }

  markStepCompleted(stepIndex) {
    const completed = this.getCompletedSteps();
    if (!completed.includes(stepIndex)) {
      completed.push(stepIndex);
      localStorage.setItem("cssflexgrid-completed", JSON.stringify(completed));
    }
  }

  getCompletedSteps() {
    const completed = localStorage.getItem("cssflexgrid-completed");
    return completed ? JSON.parse(completed) : [];
  }

  getUnlockedSteps() {
    const completed = this.getCompletedSteps();
    return completed.length > 0 ? Math.max(...completed) + 1 : 0;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CSSFlexGridPlanet();
});
