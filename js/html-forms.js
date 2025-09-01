class HTMLFormsPlanet {
  constructor() {
    this.currentStep = 0;
    this.exercises = [
      {
        title: "Basic Form Structure",
        instruction:
          "Create a form with a text input for name and a submit button:",
        starterCode: "",
        solution:
          '<form>\n  <input type="text" name="name" placeholder="Enter your name">\n  <button type="submit">Submit</button>\n</form>',
        hint: "Use &lt;form&gt;, &lt;input type='text'&gt;, and &lt;button type='submit'&gt; elements",
      },
      {
        title: "Form Labels",
        instruction: "Add proper labels to make the form accessible:",
        starterCode:
          '<form>\n  <input type="text" name="name" placeholder="Enter your name">\n  <button type="submit">Submit</button>\n</form>',
        solution:
          '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" placeholder="Enter your name">\n  <button type="submit">Submit</button>\n</form>',
        hint: "Use &lt;label for='id'&gt; and add id attribute to the input",
      },
      {
        title: "Multiple Input Types",
        instruction:
          "Create a complete contact form with name, email, and message:",
        starterCode:
          '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name">\n</form>',
        solution:
          '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  \n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n  \n  <label for="message">Message:</label>\n  <textarea id="message" name="message" rows="4" required></textarea>\n  \n  <button type="submit">Send Message</button>\n</form>',
        hint: "Use input type='email', textarea for multi-line text, and add 'required' attributes",
      },
      {
        title: "Form Validation & Structure",
        instruction:
          "Add fieldset, legend, and form validation to organize the form:",
        starterCode:
          '<form>\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  \n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n  \n  <button type="submit">Send</button>\n</form>',
        solution:
          '<form>\n  <fieldset>\n    <legend>Contact Information</legend>\n    \n    <label for="name">Name:</label>\n    <input type="text" id="name" name="name" required minlength="2">\n    \n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required>\n    \n    <label for="phone">Phone:</label>\n    <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890">\n    \n    <button type="submit">Send Message</button>\n  </fieldset>\n</form>',
        hint: "Use &lt;fieldset&gt; and &lt;legend&gt; to group form controls, add validation attributes like minlength and pattern",
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
            <h4>Your Code</h4>
            <textarea 
              id="code-input" 
              placeholder="Type your form HTML here..."
              rows="8"
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
    const codeInput = document.getElementById("code-input");
    codeInput.value = exercise.starterCode;
    codeInput.placeholder = "Type your form HTML here...";

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
    const code = document.getElementById("code-input").value;
    const iframe = document.getElementById("preview-iframe");

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
            form {
              max-width: 400px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              background: #f9f9f9;
            }
            label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
              color: #333;
            }
            input, textarea, select {
              width: 100%;
              padding: 8px 12px;
              margin-bottom: 15px;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 14px;
              box-sizing: border-box;
            }
            input:focus, textarea:focus, select:focus {
              outline: none;
              border-color: #4CAF50;
              box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
            }
            button {
              background-color: #4CAF50;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
            }
            button:hover {
              background-color: #45a049;
            }
            fieldset {
              border: 2px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
            }
            legend {
              padding: 0 10px;
              font-weight: bold;
              color: #4CAF50;
            }
            input:invalid {
              border-color: #ff6b6b;
            }
            input:valid {
              border-color: #51cf66;
            }
          </style>
        </head>
        <body>
          ${code}
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
    const checks = this.validateHTML(userCode, exercise);

    if (checks.isCorrect) {
      feedbackArea.innerHTML = `
        <div class="feedback success">
          <h4>🎉 Excellent!</h4>
          <p>Your form is correctly structured and accessible!</p>
          ${
            this.currentStep < this.exercises.length - 1
              ? '<button id="next-btn" class="btn btn-primary">Next Exercise →</button>'
              : "<p><strong>🚀 Mission Complete! You've mastered HTML Forms!</strong></p>"
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

  validateHTML(userCode, exercise) {
    const errors = [];
    let isCorrect = false;

    const code = userCode.toLowerCase();

    switch (this.currentStep) {
      case 0: // Basic form structure
        if (!code.includes("<form>") && !code.includes("<form ")) {
          errors.push("Missing <form> element");
        }
        if (!code.includes("</form>")) {
          errors.push("Missing closing </form> tag");
        }
        if (!code.includes("<input") || !code.includes('type="text"')) {
          errors.push("Missing text input field");
        }
        if (!code.includes("<button") || !code.includes('type="submit"')) {
          errors.push("Missing submit button");
        }
        isCorrect = errors.length === 0;
        break;

      case 1: // Form labels
        if (!code.includes("<label")) {
          errors.push("Missing <label> element");
        }
        if (!code.includes("for=")) {
          errors.push("Label needs 'for' attribute");
        }
        if (!code.includes("id=")) {
          errors.push("Input needs 'id' attribute to match label");
        }
        isCorrect = errors.length === 0;
        break;

      case 2: // Multiple input types
        if (!code.includes('type="email"')) {
          errors.push("Missing email input (type='email')");
        }
        if (!code.includes("<textarea")) {
          errors.push("Missing textarea for message");
        }
        if (!code.includes("required")) {
          errors.push("Add 'required' attributes for validation");
        }
        isCorrect =
          errors.length === 0 &&
          code.includes('type="text"') &&
          code.includes('type="email"') &&
          code.includes("<textarea");
        break;

      case 3: // Form validation & structure
        if (!code.includes("<fieldset>")) {
          errors.push("Missing <fieldset> to group form controls");
        }
        if (!code.includes("<legend>")) {
          errors.push("Missing <legend> to describe the fieldset");
        }
        if (!code.includes("minlength") && !code.includes("pattern")) {
          errors.push(
            "Add validation attributes like 'minlength' or 'pattern'"
          );
        }
        if (!code.includes('type="tel"')) {
          errors.push("Missing telephone input (type='tel')");
        }
        isCorrect = errors.length === 0;
        break;
    }

    return { isCorrect, errors };
  }

  resetExercise() {
    const exercise = this.exercises[this.currentStep];
    const codeInput = document.getElementById("code-input");
    codeInput.value = exercise.starterCode;
    codeInput.placeholder = "Type your form HTML here...";
    document.getElementById("feedback-area").innerHTML = "";
    document.querySelector(".hint-section").style.display = "none";
    this.updatePreview();
  }

  markStepCompleted(stepIndex) {
    const completed = this.getCompletedSteps();
    if (!completed.includes(stepIndex)) {
      completed.push(stepIndex);
      localStorage.setItem("htmlforms-completed", JSON.stringify(completed));
    }
  }

  getCompletedSteps() {
    const completed = localStorage.getItem("htmlforms-completed");
    return completed ? JSON.parse(completed) : [];
  }

  getUnlockedSteps() {
    const completed = this.getCompletedSteps();
    return completed.length > 0 ? Math.max(...completed) + 1 : 0;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HTMLFormsPlanet();
});
