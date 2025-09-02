// js-variables.js - Interactive JavaScript Variables Planet
class JSVariablesPlanet {
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
          <h2 id="exercise-title">Exercise ${this.currentStep} of ${
        this.totalSteps
      }</h2>
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
            <div class="code-editor">
              <h4>⚡ Your JavaScript Code</h4>
              <textarea 
                id="user-code" 
                placeholder="Write your JavaScript code here..."
                rows="12"
              ></textarea>
              
              <div class="editor-controls">
                <button id="submit-btn" class="btn btn-primary">🚀 Run Code</button>
                <button id="hint-btn" class="btn btn-secondary">💡 Get Hint</button>
                <button id="reset-btn" class="btn">Reset</button>
                <button id="next-btn" class="btn btn-success" style="display: none;">➡️ Next Exercise</button>
              </div>
            </div>

            <div class="console-output">
              <h4>📟 Console Output</h4>
              <div id="console-content" class="console-content"></div>
              <button id="clear-console" class="btn btn-secondary">Clear Console</button>
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
    document.getElementById("hint-btn").addEventListener("click", () => {
      const hintSection = document.querySelector(".hint-section");
      hintSection.style.display =
        hintSection.style.display === "none" ? "block" : "none";
    });

    // Reset button
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetCode());

    // Clear console button
    document
      .getElementById("clear-console")
      .addEventListener("click", () => this.clearConsole());

    // Next button
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.nextExercise());

    // Step indicators
    document.querySelectorAll(".step").forEach((step) => {
      step.addEventListener("click", (e) => {
        const stepIndex = parseInt(e.target.dataset.step);
        this.currentStep = stepIndex + 1;
        this.loadExercise();
      });
    });

    // Auto-execute code when typing
    document.getElementById("user-code").addEventListener("input", (e) => {
      this.userCode = e.target.value;
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
    document.getElementById("user-code").value =
      currentExercise.startingCode || "";

    // Update hint content
    if (currentExercise.hints && currentExercise.hints.length > 0) {
      document.getElementById("exercise-hint").textContent =
        currentExercise.hints[0];
    }

    this.updateStepIndicator();
    this.clearConsole();
    this.hideNextButton();
    this.hideFeedback();
  }

  getExercises() {
    return [
      {
        title: "Declare and Initialize Variables",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Learn to create and use variables in JavaScript:</p>
            <ul>
              <li>✅ Create a variable called <code>name</code> with your name (string)</li>
              <li>✅ Create a variable called <code>age</code> with your age (number)</li>
              <li>✅ Create a variable called <code>isStudent</code> (boolean)</li>
              <li>✅ Use <code>console.log()</code> to display each variable</li>
            </ul>
            <div class="tip">💡 Use let or const for variable declarations. Strings need quotes, numbers don't!</div>
          </div>
        `,
        startingCode: `// Create your variables here
`,
        solution: `let name = "Alex";
let age = 25;
let isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);`,
        tests: [
          { type: "variable", name: "name", expectedType: "string" },
          { type: "variable", name: "age", expectedType: "number" },
          { type: "variable", name: "isStudent", expectedType: "boolean" },
          { type: "console", count: 3 },
        ],
        hints: [
          "Use 'let' or 'const' to declare variables",
          "Strings must be wrapped in quotes: 'Hello' or \"Hello\"",
          "Use console.log() to print values to the console",
        ],
      },
      {
        title: "Variable Operations and Calculations",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Perform operations with variables:</p>
            <ul>
              <li>✅ Create variables <code>num1 = 10</code> and <code>num2 = 5</code></li>
              <li>✅ Create <code>sum</code> variable that adds num1 and num2</li>
              <li>✅ Create <code>product</code> variable that multiplies num1 and num2</li>
              <li>✅ Create <code>message</code> that combines text and variables</li>
              <li>✅ Log all results to console</li>
            </ul>
            <div class="tip">💡 Use + for addition and string concatenation, * for multiplication</div>
          </div>
        `,
        startingCode: `// Create variables and perform operations
`,
        solution: `let num1 = 10;
let num2 = 5;
let sum = num1 + num2;
let product = num1 * num2;
let message = "The sum is " + sum + " and the product is " + product;

console.log("num1:", num1);
console.log("num2:", num2);
console.log("sum:", sum);
console.log("product:", product);
console.log(message);`,
        tests: [
          { type: "variable", name: "num1", expectedValue: 10 },
          { type: "variable", name: "num2", expectedValue: 5 },
          { type: "variable", name: "sum", expectedValue: 15 },
          { type: "variable", name: "product", expectedValue: 50 },
          { type: "variable", name: "message", expectedType: "string" },
        ],
        hints: [
          "Use + operator to add numbers: let sum = a + b;",
          "Use * operator to multiply: let product = a * b;",
          "Combine strings and variables: 'Text ' + variable",
        ],
      },
      {
        title: "Template Literals and Modern Syntax",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Use modern JavaScript features:</p>
            <ul>
              <li>✅ Create variables for <code>firstName</code> and <code>lastName</code></li>
              <li>✅ Use template literals (backticks) to create <code>fullName</code></li>
              <li>✅ Create a <code>greeting</code> using template literals with variables</li>
              <li>✅ Use <code>const</code> for values that won't change</li>
              <li>✅ Display results with descriptive messages</li>
            </ul>
            <div class="tip">💡 Template literals use backticks (\`) and \${variable} syntax for interpolation</div>
          </div>
        `,
        startingCode: `// Use template literals and const
`,
        solution: `const firstName = "Jane";
const lastName = "Doe";
const fullName = \`\${firstName} \${lastName}\`;
const greeting = \`Hello, \${fullName}! Welcome to JavaScript!\`;

console.log("First Name:", firstName);
console.log("Last Name:", lastName);
console.log("Full Name:", fullName);
console.log(greeting);`,
        tests: [
          { type: "variable", name: "firstName", expectedType: "string" },
          { type: "variable", name: "lastName", expectedType: "string" },
          { type: "variable", name: "fullName", expectedType: "string" },
          { type: "variable", name: "greeting", expectedType: "string" },
          { type: "syntax", pattern: "`.*\\$\\{.*\\}.*`" },
        ],
        hints: [
          "Template literals use backticks: `text`",
          "Variables inside template literals: `Hello ${name}`",
          "Use const for values that won't change",
        ],
      },
      {
        title: "Working with Different Data Types",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Explore JavaScript data types and type conversion:</p>
            <ul>
              <li>✅ Create an array called <code>colors</code> with 3 color names</li>
              <li>✅ Create an object called <code>person</code> with name and age properties</li>
              <li>✅ Use <code>typeof</code> operator to check variable types</li>
              <li>✅ Convert a string number to actual number using <code>Number()</code></li>
              <li>✅ Display all variables and their types</li>
            </ul>
            <div class="tip">💡 Arrays use [], objects use {}, and typeof returns the data type as a string</div>
          </div>
        `,
        startingCode: `// Work with arrays, objects, and type checking
`,
        solution: `const colors = ["red", "green", "blue"];
const person = {
  name: "Alice",
  age: 30
};
const stringNumber = "42";
const actualNumber = Number(stringNumber);

console.log("Colors array:", colors);
console.log("Type of colors:", typeof colors);
console.log("Person object:", person);
console.log("Type of person:", typeof person);
console.log("String number:", stringNumber, "Type:", typeof stringNumber);
console.log("Actual number:", actualNumber, "Type:", typeof actualNumber);`,
        tests: [
          { type: "variable", name: "colors", expectedType: "object" },
          { type: "variable", name: "person", expectedType: "object" },
          { type: "variable", name: "stringNumber", expectedType: "string" },
          { type: "variable", name: "actualNumber", expectedType: "number" },
          { type: "syntax", pattern: "typeof" },
        ],
        hints: [
          "Arrays: const arr = [item1, item2, item3];",
          "Objects: const obj = { key: value };",
          "Use typeof to check data types: typeof variable",
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
      this.clearConsole();
      const result = this.executeCode(userCode);

      if (result.success) {
        const exercises = this.getExercises();
        const currentExercise = exercises[this.currentStep - 1];
        const isCorrect = this.validateCode(
          userCode,
          currentExercise,
          result.scope
        );

        if (isCorrect) {
          this.showFeedback(
            "🎉 Excellent! Your JavaScript code works perfectly!",
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
      } else {
        this.showFeedback(`❌ Error in your code: ${result.error}`, "error");
      }
    } catch (error) {
      this.showFeedback(`❌ Unexpected error: ${error.message}`, "error");
    }
  }

  executeCode(code) {
    const consoleLogs = [];
    const scope = {};

    // Create a custom console.log that captures output
    const mockConsole = {
      log: (...args) => {
        const message = args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg)
          )
          .join(" ");
        consoleLogs.push(message);
        this.addToConsole(message);
      },
    };

    try {
      // Create a function to execute the code in a controlled environment
      const executeFunction = new Function(
        "console",
        "scope",
        `
        ${code}
        
        // Capture all declared variables
        if (typeof name !== 'undefined') scope.name = name;
        if (typeof age !== 'undefined') scope.age = age;
        if (typeof isStudent !== 'undefined') scope.isStudent = isStudent;
        if (typeof num1 !== 'undefined') scope.num1 = num1;
        if (typeof num2 !== 'undefined') scope.num2 = num2;
        if (typeof sum !== 'undefined') scope.sum = sum;
        if (typeof product !== 'undefined') scope.product = product;
        if (typeof message !== 'undefined') scope.message = message;
        if (typeof firstName !== 'undefined') scope.firstName = firstName;
        if (typeof lastName !== 'undefined') scope.lastName = lastName;
        if (typeof fullName !== 'undefined') scope.fullName = fullName;
        if (typeof greeting !== 'undefined') scope.greeting = greeting;
        if (typeof colors !== 'undefined') scope.colors = colors;
        if (typeof person !== 'undefined') scope.person = person;
        if (typeof stringNumber !== 'undefined') scope.stringNumber = stringNumber;
        if (typeof actualNumber !== 'undefined') scope.actualNumber = actualNumber;
      `
      );

      executeFunction(mockConsole, scope);

      return {
        success: true,
        scope: scope,
        consoleLogs: consoleLogs,
      };
    } catch (error) {
      this.addToConsole(`Error: ${error.message}`, "error");
      return {
        success: false,
        error: error.message,
      };
    }
  }

  validateCode(code, exercise, scope) {
    if (!exercise.tests) return true;

    return exercise.tests.every((test) => {
      switch (test.type) {
        case "variable":
          const variable = scope[test.name];
          if (variable === undefined) return false;
          if (test.expectedType && typeof variable !== test.expectedType)
            return false;
          if (
            test.expectedValue !== undefined &&
            variable !== test.expectedValue
          )
            return false;
          return true;

        case "console":
          const consoleContent =
            document.getElementById("console-content").textContent;
          const logCount =
            (consoleContent.match(/\n/g) || []).length +
            (consoleContent ? 1 : 0);
          return logCount >= test.count;

        case "syntax":
          return new RegExp(test.pattern).test(code);

        default:
          return true;
      }
    });
  }

  addToConsole(message, type = "log") {
    const consoleContent = document.getElementById("console-content");
    const logEntry = document.createElement("div");
    logEntry.className = `console-entry console-${type}`;
    logEntry.textContent = message;
    consoleContent.appendChild(logEntry);
    consoleContent.scrollTop = consoleContent.scrollHeight;
  }

  clearConsole() {
    document.getElementById("console-content").innerHTML = "";
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
    this.clearConsole();
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
    localStorage.setItem("cq_progress_/planets/js-variables.html", progress);
  }

  completePlanet() {
    this.showFeedback(
      "⚡ Fantastic! You've mastered JavaScript variables! Ready to explore more planets?",
      "success"
    );
    document.getElementById("next-btn").textContent = "🌌 Return to Galaxy";
    document.getElementById("next-btn").onclick = () => {
      window.location.href = "../index.html#planets";
    };
  }
}

// Initialize the planet when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new JSVariablesPlanet();
});
