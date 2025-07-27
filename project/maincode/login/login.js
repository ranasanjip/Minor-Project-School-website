document.addEventListener('DOMContentLoaded', function() {
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

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function validateUsername(username) {
        
        const re = /^[a-zA-Z0-9_.]{3,20}$/;
        return re.test(username);
    }

    function validatePassword(password) {
      
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

    function checkPasswordStrength(password) {
     
        let strength = 0;
        
    
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return strength;
    }

    function updatePasswordStrength(password) {
        const strength = checkPasswordStrength(password);
      
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

    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
           
            clearError(usernameError);
            clearError(passwordError);
            successMessage.style.display = 'none';
            
         
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            let isValid = true;
            
         
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
            
           
            if (!password) {
                showError(passwordError, 'Password is required');
                isValid = false;
            } else if (!validatePassword(password)) {
                showError(passwordError, 'Password must be at least 8 characters with at least one letter and one number');
                isValid = false;
            }
            
            if (isValid) {
               
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                submitBtn.disabled = true;
                
             
                setTimeout(() => {
                   
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    
                    showSuccess(`Welcome back! Redirecting to dashboard...`);
                
                }, 1500);
            }
        });
        
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