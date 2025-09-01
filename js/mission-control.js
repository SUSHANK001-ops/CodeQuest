class MissionControlPlanet {
    constructor() {
        this.currentStep = 0;
        this.exercises = [
            {
                title: "Create Basic HTML Structure",
                instruction: "Build the HTML foundation for a space mission landing page with header, main content, and footer:",
                starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Space Mission</title>\n</head>\n<body>\n  <!-- Create your landing page structure here -->\n</body>\n</html>',
                solution: 'basic-structure',
                hint: "Use semantic HTML elements like <header>, <main>, <section>, and <footer>"
            },
            {
                title: "Add CSS Styling",
                instruction: "Style your landing page with a space theme, flexbox navigation, and responsive design:",
                starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Space Mission</title>\n  <style>\n    /* Add your CSS here */\n  </style>\n</head>\n<body>\n  <header>\n    <h1>🚀 Mars Mission 2025</h1>\n    <nav>\n      <ul>\n        <li><a href="#mission">Mission</a></li>\n        <li><a href="#team">Team</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  \n  <main>\n    <section id="mission">\n      <h2>Our Mission</h2>\n      <p>Explore the red planet and search for signs of life.</p>\n    </section>\n    \n    <section id="team">\n      <h2>Meet the Team</h2>\n      <p>Our dedicated astronauts and scientists.</p>\n    </section>\n  </main>\n  \n  <footer id="contact">\n    <p>Contact us: mission@space.gov</p>\n  </footer>\n</body>\n</html>',
                solution: 'styled-page',
                hint: "Use CSS gradients for space theme, flexbox for navigation, and rgba() for transparency"
            },
            {
                title: "Add Interactive Elements",
                instruction: "Add a contact form and JavaScript interactions for a complete experience:",
                starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Space Mission</title>\n  <style>\n    /* Add your complete CSS */\n  </style>\n</head>\n<body>\n  <header>\n    <h1>🚀 Mars Mission 2025</h1>\n    <nav>\n      <ul>\n        <li><a href="#mission">Mission</a></li>\n        <li><a href="#team">Team</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  \n  <main>\n    <section id="mission">\n      <h2>Our Mission</h2>\n      <p>Explore the red planet and search for signs of life.</p>\n    </section>\n    \n    <!-- Add contact form and JavaScript here -->\n  </main>\n</body>\n</html>',
                solution: 'interactive-page',
                hint: "Add a form with validation, JavaScript for countdown timer, and smooth scrolling navigation"
            }
        ];

        this.init();
    }

    init() {
        this.createExerciseInterface();
        this.loadExercise(0);
    }

    createExerciseInterface() {
        const container = document.getElementById('coding-exercises');
        
        container.innerHTML = `
            <div class="exercise-header">
                <h2 id="exercise-title">${this.exercises[0].title}</h2>
                <div class="step-indicator">
                    ${this.exercises.map((_, index) => 
                        `<div class="step ${index === 0 ? 'active' : ''}" data-step="${index}">${index + 1}</div>`
                    ).join('')}
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
                        <h4>Complete HTML Page</h4>
                        <textarea 
                            id="code-input" 
                            placeholder="Build your landing page here..."
                            rows="20"
                        >${this.exercises[0].starterCode}</textarea>
                        
                        <div class="editor-controls">
                            <button id="submit-btn" class="btn btn-primary">Submit</button>
                            <button id="hint-btn" class="btn btn-secondary">Show Hint</button>
                            <button id="reset-btn" class="btn">Reset</button>
                        </div>
                    </div>

                    <div class="preview-area">
                        <h4>Live Preview</h4>
                        <div class="preview-frame">
                            <iframe id="preview-iframe" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
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
        document.getElementById('submit-btn').addEventListener('click', () => {
            this.checkSolution();
        });

        // Hint button
        document.getElementById('hint-btn').addEventListener('click', () => {
            const hintSection = document.querySelector('.hint-section');
            hintSection.style.display = hintSection.style.display === 'none' ? 'block' : 'none';
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetExercise();
        });

        // Step indicators
        document.querySelectorAll('.step').forEach(step => {
            step.addEventListener('click', (e) => {
                const stepIndex = parseInt(e.target.dataset.step);
                if (stepIndex <= this.getUnlockedSteps()) {
                    this.loadExercise(stepIndex);
                }
            });
        });

        // Live preview on input
        document.getElementById('code-input').addEventListener('input', () => {
            this.updatePreview();
        });

        // Initial preview
        this.updatePreview();
    }

    loadExercise(index) {
        this.currentStep = index;
        const exercise = this.exercises[index];

        // Update UI
        document.getElementById('exercise-title').textContent = exercise.title;
        document.getElementById('exercise-instruction').textContent = exercise.instruction;
        document.getElementById('exercise-hint').textContent = exercise.hint;
        document.getElementById('code-input').value = exercise.starterCode;

        // Update step indicators
        document.querySelectorAll('.step').forEach((step, i) => {
            step.classList.remove('active', 'completed');
            if (i === index) {
                step.classList.add('active');
            } else if (i < this.getUnlockedSteps()) {
                step.classList.add('completed');
            }
        });

        // Hide hint and feedback
        document.querySelector('.hint-section').style.display = 'none';
        document.getElementById('feedback-area').innerHTML = '';

        // Update preview
        this.updatePreview();
    }

    updatePreview() {
        const htmlCode = document.getElementById('code-input').value;
        const iframe = document.getElementById('preview-iframe');
        
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlCode);
    }

    checkSolution() {
        const userCode = document.getElementById('code-input').value.trim();
        const exercise = this.exercises[this.currentStep];
        const feedbackArea = document.getElementById('feedback-area');

        // Basic validation checks
        const checks = this.validateHTML(userCode, exercise);
        
        if (checks.isCorrect) {
            let completionMessage = '';
            
            if (this.currentStep === this.exercises.length - 1) {
                completionMessage = '<p><strong>🎉 MISSION COMPLETE! You\'ve successfully built a complete landing page using HTML, CSS, and JavaScript! You\'re ready to explore the galaxy of web development!</strong></p>';
            } else {
                completionMessage = '<button id="next-btn" class="btn btn-primary">Next Challenge →</button>';
            }
            
            feedbackArea.innerHTML = `
                <div class="feedback success">
                    <h4>🚀 Mission Success!</h4>
                    <p>Excellent work! Your landing page ${exercise.title.toLowerCase()} is complete!</p>
                    ${completionMessage}
                </div>
            `;

            // Mark step as completed
            this.markStepCompleted(this.currentStep);

            // Add next button listener
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.loadExercise(this.currentStep + 1);
                });
            }
        } else {
            feedbackArea.innerHTML = `
                <div class="feedback error">
                    <h4>🛠️ Mission Adjustments Needed</h4>
                    <ul>
                        ${checks.errors.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                    <p>Keep working! Use the hint if you need guidance.</p>
                </div>
            `;
        }
    }

    validateHTML(userCode, exercise) {
        const errors = [];
        let isCorrect = false;

        const code = userCode.toLowerCase();

        switch (this.currentStep) {
            case 0: // Basic HTML structure
                if (!code.includes('<!doctype html>')) {
                    errors.push("Missing DOCTYPE declaration");
                }
                if (!code.includes('<header>')) {
                    errors.push("Missing <header> element");
                }
                if (!code.includes('<main>')) {
                    errors.push("Missing <main> element");
                }
                if (!code.includes('<section>')) {
                    errors.push("Missing <section> elements");
                }
                if (!code.includes('<nav>')) {
                    errors.push("Missing <nav> element for navigation");
                }
                if (!code.includes('<footer>')) {
                    errors.push("Missing <footer> element");
                }
                isCorrect = errors.length === 0;
                break;

            case 1: // CSS styling
                if (!code.includes('<style>') && !code.includes('style=')) {
                    errors.push("Missing CSS styles");
                }
                if (!code.includes('display: flex') && !code.includes('display:flex')) {
                    errors.push("Missing flexbox for navigation layout");
                }
                if (!code.includes('background:') && !code.includes('background-color:')) {
                    errors.push("Missing background styling for space theme");
                }
                if (!code.includes('padding:') && !code.includes('margin:')) {
                    errors.push("Missing spacing (padding/margin) for layout");
                }
                isCorrect = errors.length === 0;
                break;

            case 2: // Interactive elements
                if (!code.includes('<form>')) {
                    errors.push("Missing contact form");
                }
                if (!code.includes('<script>')) {
                    errors.push("Missing JavaScript functionality");
                }
                if (!code.includes('addeventlistener')) {
                    errors.push("Missing event listeners for interactivity");
                }
                if (!code.includes('input') && !code.includes('textarea')) {
                    errors.push("Missing form inputs (input, textarea)");
                }
                isCorrect = errors.length === 0;
                break;
        }

        return { isCorrect, errors };
    }

    resetExercise() {
        const exercise = this.exercises[this.currentStep];
        document.getElementById('code-input').value = exercise.starterCode;
        document.getElementById('feedback-area').innerHTML = '';
        document.querySelector('.hint-section').style.display = 'none';
        this.updatePreview();
    }

    markStepCompleted(stepIndex) {
        const completed = this.getCompletedSteps();
        if (!completed.includes(stepIndex)) {
            completed.push(stepIndex);
            localStorage.setItem('missioncontrol-completed', JSON.stringify(completed));
        }
    }

    getCompletedSteps() {
        const completed = localStorage.getItem('missioncontrol-completed');
        return completed ? JSON.parse(completed) : [];
    }

    getUnlockedSteps() {
        const completed = this.getCompletedSteps();
        return completed.length > 0 ? Math.max(...completed) + 1 : 0;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MissionControlPlanet();
});
