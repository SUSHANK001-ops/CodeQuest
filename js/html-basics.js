// html-basics.js - Interactive HTML Basics Planet
class HTMLBasicsPlanet {
  constructor() {
    this.currentStep = 0;
    this.exercises = [
      {
        title: "Basic HTML Structure",
        instruction:
          "Create a basic HTML document with DOCTYPE, html, head, and body tags:",
        starterCode: "",
        solution:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
        hint: "Remember to include &lt;!DOCTYPE html&gt;, &lt;html&gt;, &lt;head&gt;, and &lt;body&gt; tags",
      },
      {
        title: "HTML Headings",
        instruction:
          "Add different heading levels (h1 through h6) to organize content:",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Headings Example</title>\n</head>\n<body>\n  <!-- Add your headings here -->\n</body>\n</html>',
        solution:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Headings Example</title>\n</head>\n<body>\n  <h1>Main Title</h1>\n  <h2>Section Title</h2>\n  <h3>Subsection</h3>\n  <h4>Sub-subsection</h4>\n  <h5>Minor Heading</h5>\n  <h6>Smallest Heading</h6>\n</body>\n</html>',
        hint: "Use &lt;h1&gt; for the main title, &lt;h2&gt; for sections, and so on down to &lt;h6&gt;",
      },
      {
        title: "HTML Paragraphs and Text",
        instruction: "Add paragraphs, line breaks, and text formatting:",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Text Content</title>\n</head>\n<body>\n  <h1>About HTML</h1>\n  <!-- Add paragraphs and formatted text here -->\n</body>\n</html>',
        solution:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Text Content</title>\n</head>\n<body>\n  <h1>About HTML</h1>\n  <p>HTML stands for <strong>HyperText Markup Language</strong>.</p>\n  <p>It is used to create <em>web pages</em> and web applications.</p>\n  <p>HTML uses tags to structure content.<br>Tags are enclosed in angle brackets.</p>\n</body>\n</html>',
        hint: "Use &lt;p&gt; for paragraphs, &lt;strong&gt; for bold, &lt;em&gt; for italic, and &lt;br&gt; for line breaks",
      },
      {
        title: "HTML Lists and Links",
        instruction: "Create ordered lists, unordered lists, and links:",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Lists and Links</title>\n</head>\n<body>\n  <h1>Web Development Resources</h1>\n  <!-- Add lists and links here -->\n</body>\n</html>',
        solution:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Lists and Links</title>\n</head>\n<body>\n  <h1>Web Development Resources</h1>\n  \n  <h2>Technologies to Learn:</h2>\n  <ol>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>JavaScript</li>\n  </ol>\n  \n  <h2>Useful Links:</h2>\n  <ul>\n    <li><a href="https://developer.mozilla.org">MDN Web Docs</a></li>\n    <li><a href="https://www.w3schools.com">W3Schools</a></li>\n  </ul>\n</body>\n</html>',
        hint: "Use &lt;ol&gt; for ordered lists, &lt;ul&gt; for unordered lists, &lt;li&gt; for list items, and &lt;a href=''&gt; for links",
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
            <h4>Your HTML Code</h4>
            <textarea 
              id="code-input" 
              placeholder="Type your HTML here..."
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
    document
      .getElementById("submit-btn")
      .addEventListener("click", () => this.submitCode());
    document
      .getElementById("hint-btn")
      .addEventListener("click", () => this.showHint());
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetCode());

    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
      step.addEventListener('click', (e) => {
        const stepIndex = parseInt(e.target.dataset.step);
        this.loadExercise(stepIndex);
      });
    });

    // Auto-update preview when typing
    document.getElementById("code-input").addEventListener("input", () => {
      this.updatePreview();
    });
  }

  loadExercise(stepIndex = this.currentStep) {
    this.currentStep = stepIndex;
    const exercise = this.exercises[stepIndex];
    
    // Update exercise title and instruction
    document.getElementById("exercise-title").textContent = exercise.title;
    document.getElementById("exercise-instruction").textContent = exercise.instruction;
    document.getElementById("exercise-hint").textContent = exercise.hint;
    
    // Update code input
    document.getElementById("code-input").value = exercise.starterCode;
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
      step.classList.toggle('active', index === stepIndex);
      step.classList.toggle('completed', index < stepIndex);
    });
    
    // Hide hint initially
    document.querySelector('.hint-section').style.display = 'none';
    
    // Clear feedback
    document.getElementById("feedback-area").innerHTML = '';
    
    // Update preview
    this.updatePreview();
  }

  updatePreview() {
    const code = document.getElementById("code-input").value;
    const iframe = document.getElementById("preview-iframe");
    
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
  }

  showHint() {
    const hintSection = document.querySelector('.hint-section');
    hintSection.style.display = hintSection.style.display === 'none' ? 'block' : 'none';
  }

  resetCode() {
    const exercise = this.exercises[this.currentStep];
    document.getElementById("code-input").value = exercise.starterCode;
    this.updatePreview();
    document.getElementById("feedback-area").innerHTML = '';
  }

  submitCode() {
    const userCode = document.getElementById("code-input").value.trim();
    const exercise = this.exercises[this.currentStep];
    
    if (!userCode) {
      this.showFeedback("Please enter some HTML code first!", "error");
      return;
    }
    
    // Simple validation - check if solution elements are present
    const isValid = this.validateCode(userCode, exercise.solution);
    
    if (isValid) {
      this.showFeedback("🎉 Excellent work! Your HTML looks great!", "success");
      if (this.currentStep < this.exercises.length - 1) {
        setTimeout(() => {
          this.loadExercise(this.currentStep + 1);
        }, 2000);
      } else {
        setTimeout(() => {
          this.showFeedback("🚀 Congratulations! You've completed HTML Basics!", "success");
        }, 2000);
      }
    } else {
      this.showFeedback("Not quite right. Check the hint for guidance!", "error");
    }
  }

  validateCode(userCode, solution) {
    // Simple validation - check for basic HTML structure
    const hasDoctype = userCode.toLowerCase().includes('<!doctype html>');
    const hasHtml = userCode.toLowerCase().includes('<html');
    const hasHead = userCode.toLowerCase().includes('<head');
    const hasBody = userCode.toLowerCase().includes('<body');
    
    return hasDoctype && hasHtml && hasHead && hasBody;
  }

  showFeedback(message, type) {
    const feedbackArea = document.getElementById("feedback-area");
    feedbackArea.innerHTML = `
      <div class="feedback ${type}">
        <h4>${type === 'success' ? '✅ Success!' : type === 'error' ? '❌ Try Again' : '💡 Hint'}</h4>
        <p>${message}</p>
      </div>
    `;
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
    document.getElementById("user-code").placeholder =
      currentExercise.placeholder || "Type your HTML code here...";

    this.updateStepIndicator();
    this.hideNextButton();
    this.hideFeedback();
  }

  getExercises() {
    return [
      {
        title: "Create a Basic HTML Structure",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Create a basic HTML document with the essential structure. Your HTML should include:</p>
            <ul>
              <li>✅ <code>&lt;!DOCTYPE html&gt;</code> declaration</li>
              <li>✅ <code>&lt;html&gt;</code> root element with lang="en"</li>
              <li>✅ <code>&lt;head&gt;</code> section with a title</li>
              <li>✅ <code>&lt;body&gt;</code> section with an h1 heading</li>
            </ul>
            <div class="tip">💡 Remember: HTML documents are like a house - they need a foundation (DOCTYPE), walls (html), a roof (head), and rooms (body)!</div>
          </div>
        `,
        startingCode: "",
        placeholder: "Start with <!DOCTYPE html>...",
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
        hints: [
          "Start with the DOCTYPE declaration: <!DOCTYPE html>",
          "The html element should have a lang attribute",
          "Don't forget to close all your tags!",
        ],
      },
      {
        title: "Add Semantic HTML Elements",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Enhance your HTML with semantic elements. Add these inside the body:</p>
            <ul>
              <li>✅ <code>&lt;header&gt;</code> with a site title</li>
              <li>✅ <code>&lt;main&gt;</code> with your main content</li>
              <li>✅ <code>&lt;footer&gt;</code> with copyright info</li>
              <li>✅ <code>&lt;nav&gt;</code> with at least 3 navigation links</li>
            </ul>
            <div class="tip">💡 Semantic HTML helps screen readers and search engines understand your content structure!</div>
          </div>
        `,
        startingCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Add your semantic elements here -->
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>My Amazing Website</h1>
    </header>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    </nav>
    <main>
        <h2>Welcome to my website!</h2>
        <p>This is the main content area.</p>
    </main>
    <footer>
        <p>&copy; 2025 My Website</p>
    </footer>
</body>
</html>`,
        hints: [
          "Use semantic tags like <header>, <main>, <nav>, and <footer>",
          "Navigation links can use the <a> tag with href attributes",
          "Remember to include some content inside each semantic element",
        ],
      },
      {
        title: "Create a Content-Rich Page",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Create a complete webpage about your favorite hobby. Include:</p>
            <ul>
              <li>✅ Different heading levels (h1, h2, h3)</li>
              <li>✅ At least 2 paragraphs with <code>&lt;p&gt;</code> tags</li>
              <li>✅ An unordered list with <code>&lt;ul&gt;</code> and <code>&lt;li&gt;</code></li>
              <li>✅ An image with <code>&lt;img&gt;</code> tag (use a placeholder URL)</li>
              <li>✅ A link to an external website with <code>&lt;a&gt;</code> tag</li>
            </ul>
            <div class="tip">💡 Make it personal! Write about something you're passionate about.</div>
          </div>
        `,
        startingCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Hobby Page</title>
</head>
<body>
    <header>
        <h1><!-- Your hobby name here --></h1>
    </header>
    <main>
        <!-- Add your content here -->
    </main>
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Hobby Page</title>
</head>
<body>
    <header>
        <h1>Photography</h1>
    </header>
    <main>
        <h2>Why I Love Photography</h2>
        <p>Photography allows me to capture beautiful moments and express my creativity. It's a way to preserve memories and share my perspective with others.</p>
        
        <img src="https://via.placeholder.com/400x200" alt="Beautiful landscape photo">
        
        <h3>Types of Photography I Enjoy</h3>
        <ul>
            <li>Landscape photography</li>
            <li>Portrait photography</li>
            <li>Street photography</li>
            <li>Wildlife photography</li>
        </ul>
        
        <p>If you're interested in learning more about photography, check out <a href="https://www.nationalgeographic.com/photography" target="_blank">National Geographic Photography</a>.</p>
    </main>
</body>
</html>`,
        hints: [
          "Use h2 and h3 for subheadings after your main h1",
          "For the image, you can use: https://via.placeholder.com/400x200",
          "Don't forget the alt attribute for your image!",
        ],
      },
      {
        title: "Master HTML Forms",
        instructions: `
          <div class="instruction-card">
            <h4>🎯 Your Mission</h4>
            <p>Create a contact form with proper HTML form elements:</p>
            <ul>
              <li>✅ A <code>&lt;form&gt;</code> element</li>
              <li>✅ Text input for name with a <code>&lt;label&gt;</code></li>
              <li>✅ Email input with proper type="email"</li>
              <li>✅ Textarea for a message</li>
              <li>✅ A submit button</li>
              <li>✅ Use proper labels with 'for' attributes</li>
            </ul>
            <div class="tip">💡 Proper form labels make your forms accessible to everyone!</div>
          </div>
        `,
        startingCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <!-- Create your form here -->
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        
        <button type="submit">Send Message</button>
    </form>
</body>
</html>`,
        hints: [
          "The 'for' attribute in labels should match the 'id' of the input",
          "Use type='email' for email inputs for better validation",
          "The 'required' attribute makes fields mandatory",
        ],
      },
    ];
  }

  submitCode() {
    const userCode = document.getElementById("user-code").value.trim();
    if (!userCode) {
      this.showFeedback("❌ Please enter some HTML code first!", "error");
      return;
    }

    const exercises = this.getExercises();
    const currentExercise = exercises[this.currentStep - 1];
    const isCorrect = this.validateCode(userCode, currentExercise);

    if (isCorrect) {
      this.showFeedback("🎉 Excellent work! Your HTML is correct!", "success");
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
    // Basic validation - check for required elements
    const requirements = this.getRequirementsForStep(this.currentStep);
    return requirements.every((req) => {
      if (req.type === "contains") {
        return userCode.toLowerCase().includes(req.value.toLowerCase());
      }
      if (req.type === "regex") {
        return new RegExp(req.value, "i").test(userCode);
      }
      return true;
    });
  }

  getRequirementsForStep(step) {
    const requirements = {
      1: [
        { type: "contains", value: "<!DOCTYPE html>" },
        { type: "contains", value: "<html" },
        { type: "contains", value: "<head>" },
        { type: "contains", value: "<body>" },
        { type: "contains", value: "<title>" },
        { type: "contains", value: "<h1>" },
      ],
      2: [
        { type: "contains", value: "<header>" },
        { type: "contains", value: "<main>" },
        { type: "contains", value: "<footer>" },
        { type: "contains", value: "<nav>" },
      ],
      3: [
        { type: "contains", value: "<h2>" },
        { type: "contains", value: "<p>" },
        { type: "contains", value: "<ul>" },
        { type: "contains", value: "<li>" },
        { type: "contains", value: "<img" },
        { type: "contains", value: "<a href=" },
      ],
      4: [
        { type: "contains", value: "<form>" },
        { type: "contains", value: "<label" },
        { type: "contains", value: 'type="email"' },
        { type: "contains", value: "<textarea" },
        { type: "contains", value: 'type="submit"' },
      ],
    };
    return requirements[step] || [];
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
    localStorage.setItem("cq_progress_/planets/html-basics.html", progress);
  }

  completePlanet() {
    this.showFeedback(
      "🚀 Congratulations! You've completed the HTML Basics planet! Ready to explore more planets?",
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
  new HTMLBasicsPlanet();
});
