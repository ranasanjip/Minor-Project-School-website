document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordError = document.getElementById('password-error');
    const usernameError = document.getElementById('username-error');
    const successMessage = document.getElementById('success-message');
    const passwordStrength = document.querySelector('.password-strength');
    const passwordStrengthBar = document.querySelector('.password-strength-bar');
    const passwordStrengthText = document.querySelector('.password-strength-text');

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Robust email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function validateUsername(username) {
        // Username should be 3-20 chars, letters, numbers, underscores or dots
        const re = /^[a-zA-Z0-9_.]{3,20}$/;
        return re.test(username);
    }

    function validatePassword(password) {
        // Password should be at least 8 chars with at least one letter and one number
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

    function checkPasswordStrength(password) {
        // Strength calculation
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return strength;
    }

    function updatePasswordStrength(password) {
        const strength = checkPasswordStrength(password);
        
        // Reset classes
        passwordStrength.className = 'password-strength';
        passwordStrengthBar.style.width = '0%';
        
        if (password.length === 0) {
            passwordStrengthText.textContent = '';
            return;
        }
        
        if (strength <= 2) {
            passwordStrength.classList.add('weak');
            passwordStrengthText.textContent = 'Weak password';
            passwordStrengthText.style.color = 'var(--accent-color)';
        } else if (strength <= 4) {
            passwordStrength.classList.add('medium');
            passwordStrengthText.textContent = 'Medium strength';
            passwordStrengthText.style.color = '#f39c12';
        } else {
            passwordStrength.classList.add('strong');
            passwordStrengthText.textContent = 'Strong password';
            passwordStrengthText.style.color = 'var(--success-color)';
        }
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.previousElementSibling.querySelector('input').classList.add('error');
    }

    function clearError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
            const input = element.previousElementSibling.querySelector('input');
            if (input) input.classList.remove('error');
        }
    }

    function showSuccess(message) {
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i> ${message}
        `;
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Form submission handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            clearError(usernameError);
            clearError(passwordError);
            successMessage.style.display = 'none';
            
            // Get form values
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            let isValid = true;
            
            // Validate username/email
            if (!username) {
                showError(usernameError, 'Username or email is required');
                isValid = false;
            } else if (username.includes('@')) {
                if (!validateEmail(username)) {
                    showError(usernameError, 'Please enter a valid email address (e.g., user@example.com)');
                    isValid = false;
                }
            } else if (!validateUsername(username)) {
                showError(usernameError, 'Username must be 3-20 characters (letters, numbers, _ or .)');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                showError(passwordError, 'Password is required');
                isValid = false;
            } else if (!validatePassword(password)) {
                showError(passwordError, 'Password must be at least 8 characters with at least one letter and one number');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showSuccess(`Welcome back! Redirecting to dashboard...`);
                    
                    // In real implementation, redirect after successful login
                    // window.location.href = '/dashboard.html';
                }, 1500);
            }
        });
        
        // Real-time validation for username/email
        usernameInput.addEventListener('input', function() {
            const username = this.value.trim();
            if (!username) {
                clearError(usernameError);
            } else if (username.includes('@')) {
                if (!validateEmail(username)) {
                    showError(usernameError, 'Please enter a valid email address');
                } else {
                    clearError(usernameError);
                }
            } else if (!validateUsername(username)) {
                showError(usernameError, 'Username must be 3-20 characters');
            } else {
                clearError(usernameError);
            }
        });
        
        // Real-time validation for password
        passwordInput.addEventListener('input', function() {
            const password = this.value.trim();
            updatePasswordStrength(password);
            
            if (!password) {
                clearError(passwordError);
            } else if (!validatePassword(password)) {
                showError(passwordError, 'Needs at least 8 chars with letter and number');
            } else {
                clearError(passwordError);
            }
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});