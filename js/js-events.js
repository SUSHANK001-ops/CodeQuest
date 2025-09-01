class JSEventsPlanet {
  constructor() {
    this.currentStep = 0;
    this.exercises = [
      {
        title: "Basic Click Event",
        instruction:
          "Add a click event listener to the button that shows an alert:",
        starterCode: `// Select the button and add click event\nconst button = document.getElementById('myButton');\n\n// Add your event listener here`,
        solution: `// Select the button and add click event\nconst button = document.getElementById('myButton');\n\n// Add click event listener\nbutton.addEventListener('click', function() {\n  alert('Button clicked!');\n});`,
        hint: "Use addEventListener('click', function() {...}) to handle button clicks",
      },
      {
        title: "Input Events",
        instruction:
          "Listen for input changes and update the display text in real-time:",
        starterCode: `const input = document.getElementById('textInput');\nconst display = document.getElementById('displayText');\n\n// Add input event listener here`,
        solution: `const input = document.getElementById('textInput');\nconst display = document.getElementById('displayText');\n\n// Add input event listener\ninput.addEventListener('input', function() {\n  display.textContent = 'You typed: ' + input.value;\n});`,
        hint: "Use the 'input' event to listen for text changes, and update textContent",
      },
      {
        title: "Mouse Events",
        instruction:
          "Add mouseenter and mouseleave events to change the box color:",
        starterCode: `const colorBox = document.getElementById('colorBox');\n\n// Add mouseenter event\n\n// Add mouseleave event`,
        solution: `const colorBox = document.getElementById('colorBox');\n\n// Add mouseenter event\ncolorBox.addEventListener('mouseenter', function() {\n  colorBox.style.backgroundColor = '#4CAF50';\n});\n\n// Add mouseleave event\ncolorBox.addEventListener('mouseleave', function() {\n  colorBox.style.backgroundColor = '#f0f0f0';\n});`,
        hint: "Use 'mouseenter' and 'mouseleave' events, change style.backgroundColor",
      },
      {
        title: "Keyboard Events",
        instruction: "Listen for keydown events and display the pressed key:",
        starterCode: `const keyDisplay = document.getElementById('keyDisplay');\n\n// Add keydown event to document\ndocument.addEventListener('keydown', function(event) {\n  // Display the pressed key\n});`,
        solution: `const keyDisplay = document.getElementById('keyDisplay');\n\n// Add keydown event to document\ndocument.addEventListener('keydown', function(event) {\n  // Display the pressed key\n  keyDisplay.textContent = 'You pressed: ' + event.key;\n  \n  // Special handling for special keys\n  if (event.key === 'Enter') {\n    keyDisplay.style.color = '#4CAF50';\n  } else if (event.key === 'Escape') {\n    keyDisplay.style.color = '#f44336';\n  } else {\n    keyDisplay.style.color = '#333';\n  }\n});`,
        hint: "Use event.key to get the pressed key, and handle special keys like Enter and Escape",
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
            <h4>JavaScript Code</h4>
            <textarea 
              id="code-input" 
              placeholder="Type your JavaScript here..."
              rows="10"
            >${this.exercises[0].starterCode}</textarea>
            
            <div class="editor-controls">
              <button id="submit-btn" class="btn btn-primary">Submit</button>
              <button id="hint-btn" class="btn btn-secondary">Show Hint</button>
              <button id="reset-btn" class="btn">Reset</button>
            </div>
          </div>

          <div class="preview-area">
            <h4>Interactive Demo</h4>
            <div class="preview-frame">
              <iframe id="preview-iframe" sandbox="allow-scripts allow-same-origin"></iframe>
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
    const jsCode = document.getElementById("code-input").value;
    const iframe = document.getElementById("preview-iframe");

    let htmlContent = "";
    let cssStyles = "";

    // Generate appropriate HTML for each exercise
    switch (this.currentStep) {
      case 0: // Basic click event
        htmlContent = `
          <button id="myButton" style="padding: 15px 30px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            Click Me!
          </button>
          <p style="margin-top: 20px; color: #666;">Try clicking the button above</p>
        `;
        break;
      case 1: // Input events
        htmlContent = `
          <div style="margin: 20px 0;">
            <label for="textInput" style="display: block; margin-bottom: 10px; font-weight: bold;">Type something:</label>
            <input type="text" id="textInput" placeholder="Start typing..." style="padding: 10px; width: 300px; border: 2px solid #ddd; border-radius: 5px; font-size: 16px;">
          </div>
          <div id="displayText" style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px; min-height: 20px; color: #333;">
            Text will appear here as you type...
          </div>
        `;
        break;
      case 2: // Mouse events
        htmlContent = `
          <div id="colorBox" style="width: 200px; height: 100px; background: #f0f0f0; border: 2px solid #ddd; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; margin: 20px 0;">
            Hover over me!
          </div>
          <p style="color: #666;">Try hovering your mouse over the box above</p>
        `;
        break;
      case 3: // Keyboard events
        htmlContent = `
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; margin-bottom: 20px;">Press any key on your keyboard:</p>
            <div id="keyDisplay" style="padding: 20px; background: #f0f0f0; border: 2px solid #ddd; border-radius: 10px; font-size: 24px; font-weight: bold; min-height: 60px; display: flex; align-items: center; justify-content: center;">
              Press a key...
            </div>
            <p style="margin-top: 15px; color: #666; font-size: 14px;">Try pressing Enter or Escape for special effects!</p>
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
            ${cssStyles}
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            try {
              ${jsCode}
            } catch (error) {
              console.error('JavaScript Error:', error);
            }
          </script>
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
    const checks = this.validateJavaScript(userCode, exercise);

    if (checks.isCorrect) {
      feedbackArea.innerHTML = `
        <div class="feedback success">
          <h4>🎉 Excellent!</h4>
          <p>Your event handling is working perfectly! Great job with ${exercise.title.toLowerCase()}!</p>
          ${
            this.currentStep < this.exercises.length - 1
              ? '<button id="next-btn" class="btn btn-primary">Next Exercise →</button>'
              : "<p><strong>🚀 Mission Complete! You've mastered JavaScript Events!</strong></p>"
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

  validateJavaScript(userCode, exercise) {
    const errors = [];
    let isCorrect = false;

    const code = userCode.toLowerCase().replace(/\s+/g, " ");

    switch (this.currentStep) {
      case 0: // Basic click event
        if (!code.includes("addeventlistener")) {
          errors.push("Missing addEventListener method");
        }
        if (!code.includes("'click'") && !code.includes('"click"')) {
          errors.push("Missing 'click' event type");
        }
        if (!code.includes("alert")) {
          errors.push("Missing alert() function call");
        }
        isCorrect = errors.length === 0;
        break;

      case 1: // Input events
        if (!code.includes("addeventlistener")) {
          errors.push("Missing addEventListener method");
        }
        if (!code.includes("'input'") && !code.includes('"input"')) {
          errors.push("Missing 'input' event type");
        }
        if (!code.includes("textcontent")) {
          errors.push("Missing textContent property to update display");
        }
        if (!code.includes("input.value") && !code.includes("this.value")) {
          errors.push("Missing input.value to get the typed text");
        }
        isCorrect = errors.length === 0;
        break;

      case 2: // Mouse events
        if (!code.includes("mouseenter")) {
          errors.push("Missing 'mouseenter' event");
        }
        if (!code.includes("mouseleave")) {
          errors.push("Missing 'mouseleave' event");
        }
        if (
          !code.includes("backgroundcolor") &&
          !code.includes("background-color")
        ) {
          errors.push("Missing backgroundColor style change");
        }
        isCorrect = errors.length === 0;
        break;

      case 3: // Keyboard events
        if (!code.includes("keydown")) {
          errors.push("Missing 'keydown' event");
        }
        if (!code.includes("event.key")) {
          errors.push("Missing event.key to get the pressed key");
        }
        if (!code.includes("textcontent")) {
          errors.push("Missing textContent to display the key");
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
      localStorage.setItem("jsevents-completed", JSON.stringify(completed));
    }
  }

  getCompletedSteps() {
    const completed = localStorage.getItem("jsevents-completed");
    return completed ? JSON.parse(completed) : [];
  }

  getUnlockedSteps() {
    const completed = this.getCompletedSteps();
    return completed.length > 0 ? Math.max(...completed) + 1 : 0;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new JSEventsPlanet();
});
