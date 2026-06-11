// Password Generator - Simple & Clean
class PasswordGenerator {
    constructor() {
        this.currentMode = 'easy';
        this.init();
    }

    init() {
        // Get all DOM elements
        this.easyBtn = document.getElementById('easy');
        this.mediumBtn = document.getElementById('medium');
        this.strongBtn = document.getElementById('strong');
        this.passwordDisplay = document.getElementById('passwordishere');
        this.generateBtn = document.getElementById('generate_password');
        
        // Add event listeners
        this.easyBtn.addEventListener('click', () => this.setMode('easy'));
        this.mediumBtn.addEventListener('click', () => this.setMode('medium'));
        this.strongBtn.addEventListener('click', () => this.setMode('strong'));
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        
        // Generate first password on load
        this.generatePassword();
    }

    setMode(mode) {
        this.currentMode = mode;
        this.updateActiveButton(mode);
    }

    updateActiveButton(activeMode) {
        // Remove active class from all buttons
        [this.easyBtn, this.mediumBtn, this.strongBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        if (activeMode === 'easy') this.easyBtn.classList.add('active');
        if (activeMode === 'medium') this.mediumBtn.classList.add('active');
        if (activeMode === 'strong') this.strongBtn.classList.add('active');
    }

    // Helper functions
    getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    getRandomLetter() {
        const isUpperCase = Math.random() < 0.5;
        const charCode = isUpperCase ? 65 : 97;
        return String.fromCharCode(Math.floor(Math.random() * 26) + charCode);
    }

    getSpecialChar() {
        const specialChars = ['!', '@', '#', '$', '%', '&', '*', '?'];
        return specialChars[Math.floor(Math.random() * specialChars.length)];
    }

    generatePassword() {
        let password = '';
        
        if (this.currentMode === 'easy') {
            // Easy: 8 digits only
            for (let i = 0; i < 8; i++) {
                password += this.getRandomNumber();
            }
        } 
        else if (this.currentMode === 'medium') {
            // Medium: 10 chars (letters + numbers)
            for (let i = 0; i < 10; i++) {
                const random = Math.random();
                if (random < 0.5) {
                    password += this.getRandomNumber();
                } else {
                    password += this.getRandomLetter();
                }
            }
        } 
        else if (this.currentMode === 'strong') {
            // Strong: 15 chars (letters + numbers + symbols)
            for (let i = 0; i < 15; i++) {
                const random = Math.random();
                if (random < 0.4) {
                    password += this.getRandomNumber();
                } else if (random < 0.7) {
                    password += this.getRandomLetter();
                } else {
                    password += this.getSpecialChar();
                }
            }
        }
        
        // Display the generated password
        this.passwordDisplay.textContent = password;
        
        // Add copy animation
        this.passwordDisplay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.passwordDisplay.style.transform = 'scale(1)';
        }, 200);
    }
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});
