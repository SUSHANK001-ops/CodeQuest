// js-dom.js - Interactive JavaScript DOM Planet
class JSDOMPlanet {
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
    const editorContainer = document.getElementById("coding-exercises");
    if (editorContainer) {
      editorContainer.innerHTML = `
        <div class="exercise-header">
          <h2 id="exercise-title">Exercise ${this.currentStep} of ${this.totalSteps}</h2>
          <div class="step-indicator">
            ${Array.from(
              { length: this.totalSteps },
              (_, i) =>
                `<div class="step ${
                  i + 1 <= this.currentStep ? "active" : ""
                }" data-step="${i}">${i + 1}</div>`
            ).join("")}
          </div>
        </div>

        <div class="exercise-content">
          <div class="instruction-panel">
            <h3>Instructions</h3>
            <div id="instructions"></div>
            
            <div class="hint-section" style="display: none;">
              <h4>💡 Hint</h4>
              <p id="exercise-hint"></p>
            </div>
          </div>

          <div class="coding-area">
            <div class="html-preview">
              <h4>🌐 HTML Structure (Read-only)</h4>
              <div class="preview-code" id="preview-html"></div>
            </div>

            <div class="code-editor">
              <h4>⚡ Your JavaScript Code</h4>
              <textarea 
                id="user-code" 
                placeholder="Write your JavaScript DOM manipulation code here..."
                rows="12"
              ></textarea>
              
              <div class="editor-controls">
                <button id="submit-btn" class="btn btn-primary">🚀 Run Code</button>
                <button id="hint-btn" class="btn btn-secondary">💡 Get Hint</button>
                <button id="reset-btn" class="btn">Reset</button>
              </div>
            </div>

            <div class="preview-area">
              <h4>🎬 Interactive Demo</h4>
              <div class="preview-frame">
                <iframe id="preview-frame" sandbox="allow-scripts allow-same-origin"></iframe>
              </div>
            </div>
          </div>

          <div id="feedback" class="feedback-area" style="display: none;"></div>
        </div>
      `;
    }
  }

  setupButtons() {
    // Submit button
    document
      .getElementById("submit-btn")
      .addEventListener("click", () => this.submitCode());
      
    // Hint button
    document
      .getElementById("hint-btn")
      .addEventListener("click", () => {
        const hintSection = document.querySelector('.hint-section');
        hintSection.style.display = hintSection.style.display === 'none' ? 'block' : 'none';
      });
      
    // Reset button
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetCode());

    // Step indicators
    document.querySelectorAll('.step').forEach(step => {
      step.addEventListener('click', (e) => {
        const stepIndex = parseInt(e.target.dataset.step);
        this.currentStep = stepIndex + 1;
        this.loadExercise();
      });
    });

    // Auto-update preview when typing
    document.getElementById("user-code").addEventListener("input", (e) => {
      this.userCode = e.target.value;
      this.hideNextButton();
      this.updateLivePreview();
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

    // Update hint content
    if (currentExercise.hints && currentExercise.hints.length > 0) {
      document.getElementById("exercise-hint").textContent = currentExercise.hints[0];
    }

    this.updateStepIndicator();
    this.updateLivePreview();
    this.hideNextButton();
    this.hideFeedback();
  }

  getExercises() {
    return [
      {
        title: "Select and Modify Elements",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Learn to select DOM elements and change their content:</p>
            <ul>
              <li>✅ Use <code>document.getElementById()</code> to select the heading</li>
              <li>✅ Change the heading text to "DOM Manipulation is Fun!"</li>
              <li>✅ Select the paragraph and change its text color to blue</li>
              <li>✅ Change the button text to "Clicked!"</li>
            </ul>
            <div class="tip">💡 Use element.textContent to change text and element.style.color for colors</div>
          </div>
        `,
        html: `<div>
  <h1 id="main-heading">Original Heading</h1>
  <p id="main-paragraph">This is a paragraph that will be modified.</p>
  <button id="my-button">Click Me</button>
</div>`,
        startingCode: `// Select elements and modify them
`,
        solution: `const heading = document.getElementById('main-heading');
heading.textContent = 'DOM Manipulation is Fun!';

const paragraph = document.getElementById('main-paragraph');
paragraph.style.color = 'blue';

const button = document.getElementById('my-button');
button.textContent = 'Clicked!';`,
        tests: [
          {
            type: "element-text",
            id: "main-heading",
            expectedText: "DOM Manipulation is Fun!",
          },
          {
            type: "element-style",
            id: "main-paragraph",
            property: "color",
            expectedValue: "blue",
          },
          { type: "element-text", id: "my-button", expectedText: "Clicked!" },
        ],
        hints: [
          "Use document.getElementById('id') to select elements",
          "Use element.textContent = 'new text' to change text",
          "Use element.style.color = 'blue' to change colors",
        ],
      },
      {
        title: "Create and Add New Elements",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Create new DOM elements and add them to the page:</p>
            <ul>
              <li>✅ Create a new <code>&lt;div&gt;</code> element</li>
              <li>✅ Set its text content to "I was created with JavaScript!"</li>
              <li>✅ Give it a background color of lightgreen</li>
              <li>✅ Add it to the container using <code>appendChild()</code></li>
            </ul>
            <div class="tip">💡 Use document.createElement() to create elements and appendChild() to add them</div>
          </div>
        `,
        html: `<div id="container">
  <h2>Container</h2>
  <p>Elements will be added here:</p>
</div>`,
        startingCode: `// Create and add new elements
`,
        solution: `const container = document.getElementById('container');
const newDiv = document.createElement('div');
newDiv.textContent = 'I was created with JavaScript!';
newDiv.style.backgroundColor = 'lightgreen';
newDiv.style.padding = '10px';
newDiv.style.margin = '10px 0';
container.appendChild(newDiv);`,
        tests: [
          {
            type: "new-element",
            tag: "div",
            expectedText: "I was created with JavaScript!",
          },
          {
            type: "element-style",
            selector: "div:last-child",
            property: "backgroundColor",
            expectedValue: "lightgreen",
          },
        ],
        hints: [
          "Use document.createElement('div') to create a new div",
          "Set element.textContent for the text",
          "Use element.style.backgroundColor for background color",
        ],
      },
      {
        title: "Handle User Interactions",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Add event listeners to make elements interactive:</p>
            <ul>
              <li>✅ Add a click event listener to the button</li>
              <li>✅ When clicked, change the paragraph text to "Button was clicked!"</li>
              <li>✅ Add a mouseover event to the box to change its color to yellow</li>
              <li>✅ Add a mouseout event to change the box color back to lightblue</li>
            </ul>
            <div class="tip">💡 Use addEventListener('event', function) to handle user interactions</div>
          </div>
        `,
        html: `<div>
  <button id="interactive-btn">Click Me!</button>
  <p id="status">Status: Waiting for interaction...</p>
  <div id="color-box" style="width: 100px; height: 100px; background-color: lightblue; margin: 10px 0;"></div>
</div>`,
        startingCode: `// Add event listeners for user interactions
`,
        solution: `const button = document.getElementById('interactive-btn');
const status = document.getElementById('status');
const colorBox = document.getElementById('color-box');

button.addEventListener('click', function() {
  status.textContent = 'Button was clicked!';
});

colorBox.addEventListener('mouseover', function() {
  colorBox.style.backgroundColor = 'yellow';
});

colorBox.addEventListener('mouseout', function() {
  colorBox.style.backgroundColor = 'lightblue';
});`,
        tests: [
          {
            type: "event-listener",
            element: "interactive-btn",
            event: "click",
          },
          { type: "event-listener", element: "color-box", event: "mouseover" },
          { type: "event-listener", element: "color-box", event: "mouseout" },
        ],
        hints: [
          "Use element.addEventListener('click', function() {...})",
          "Change textContent inside the event function",
          "Use 'mouseover' and 'mouseout' events for hover effects",
        ],
      },
      {
        title: "Dynamic Content and Forms",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Work with forms and dynamic content:</p>
            <ul>
              <li>✅ Add an event listener to the form's submit event</li>
              <li>✅ Prevent the default form submission with <code>preventDefault()</code></li>
              <li>✅ Get the input value and display it in the output div</li>
              <li>✅ Clear the input field after submission</li>
              <li>✅ Show/hide the output div based on content</li>
            </ul>
            <div class="tip">💡 Use event.preventDefault() to stop default form behavior and element.value for input values</div>
          </div>
        `,
        html: `<div>
  <form id="user-form">
    <label for="user-input">Enter your name:</label>
    <input type="text" id="user-input" placeholder="Your name here..." required>
    <button type="submit">Submit</button>
  </form>
  <div id="output" style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; display: none;"></div>
</div>`,
        startingCode: `// Handle form submission and dynamic content
`,
        solution: `const form = document.getElementById('user-form');
const input = document.getElementById('user-input');
const output = document.getElementById('output');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const userName = input.value.trim();
  
  if (userName) {
    output.textContent = \`Hello, \${userName}! Welcome to DOM manipulation!\`;
    output.style.display = 'block';
    input.value = '';
  }
});`,
        tests: [
          { type: "event-listener", element: "user-form", event: "submit" },
          { type: "prevent-default", form: "user-form" },
          { type: "form-handling", input: "user-input", output: "output" },
        ],
        hints: [
          "Use event.preventDefault() in the submit handler",
          "Get input value with input.value",
          "Clear input with input.value = ''",
        ],
      },
    ];
  }

  submitCode() {
    const userCode = document.getElementById("user-code").value.trim();
    if (!userCode) {
      this.showFeedback("❌ Please enter some JavaScript code first!", "error");
      return;
    }

    try {
      this.updateLivePreview();

      const exercises = this.getExercises();
      const currentExercise = exercises[this.currentStep - 1];
      const isCorrect = this.validateCode(userCode, currentExercise);

      if (isCorrect) {
        this.showFeedback(
          "🎉 Perfect! Your DOM manipulation is working correctly!",
          "success"
        );
        this.showNextButton();
        this.updateProgress();
      } else {
        this.showFeedback(
          "❌ Code runs but doesn't meet all requirements. Check the mission objectives!",
          "error"
        );
      }
    } catch (error) {
      this.showFeedback(`❌ Error in your code: ${error.message}`, "error");
    }
  }

  validateCode(code, exercise) {
    // Basic validation - check for required patterns
    const requirements = this.getRequirementsForStep(this.currentStep);
    return requirements.every((req) => {
      const regex = new RegExp(req.pattern, "i");
      return regex.test(code.replace(/\s+/g, " "));
    });
  }

  getRequirementsForStep(step) {
    const requirements = {
      1: [
        { pattern: "getElementById.*main-heading" },
        { pattern: "textContent.*DOM Manipulation is Fun!" },
        { pattern: "getElementById.*main-paragraph" },
        { pattern: "style\\.color.*blue" },
      ],
      2: [
        { pattern: "createElement.*div" },
        { pattern: "textContent.*created with JavaScript" },
        { pattern: "appendChild" },
        { pattern: "backgroundColor.*lightgreen" },
      ],
      3: [
        { pattern: "addEventListener.*click" },
        { pattern: "addEventListener.*mouseover" },
        { pattern: "addEventListener.*mouseout" },
      ],
      4: [
        { pattern: "addEventListener.*submit" },
        { pattern: "preventDefault" },
        { pattern: "\\.value" },
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
          button { padding: 10px 15px; margin: 5px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
          button:hover { background: #45a049; }
          input { padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; }
          label { display: block; margin: 10px 0 5px 0; font-weight: bold; }
        </style>
      </head>
      <body>
        ${currentExercise.html}
        <script>
          try {
            ${userCode}
          } catch (error) {
            console.error('Error:', error.message);
          }
        </script>
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
    localStorage.setItem("cq_progress_/planets/js-dom.html", progress);
  }

  completePlanet() {
    this.showFeedback(
      "🎉 Amazing! You've mastered DOM manipulation! Ready to explore more planets?",
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
  new JSDOMPlanet();
});
