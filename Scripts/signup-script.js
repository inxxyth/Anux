document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const submitButton = signupForm.querySelector('button[type="submit"]');
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validation
        let isValid = true;
        
        if (fullnameInput.value.trim() === '') {
            showFieldError(fullnameInput, 'Please enter your full name');
            isValid = false;
        }
        
        if (emailInput.value.trim() === '') {
            showFieldError(emailInput, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (usernameInput.value.trim() === '') {
            showFieldError(usernameInput, 'Please choose a username');
            isValid = false;
        } else if (usernameInput.value.length < 3) {
            showFieldError(usernameInput, 'Username must be at least 3 characters');
            isValid = false;
        }
        
        if (passwordInput.value.trim() === '') {
            showFieldError(passwordInput, 'Please create a password');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showFieldError(passwordInput, 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (confirmPasswordInput.value.trim() === '') {
            showFieldError(confirmPasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            showFieldError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate registration process
        const signupData = {
            fullname: fullnameInput.value,
            email: emailInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        };
        
        console.log('Signup attempt:', signupData);
        
        // Simulate API call
        setTimeout(() => {
            // Demo: redirect to login page
            window.location.href = 'login.html';
        }, 1500);
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show field-specific error
    function showFieldError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
    }
    
    // Clear all errors
    function clearErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) errorElement.textContent = '';
        });
    }
    
    // Set loading state
    function setLoadingState(loading) {
        if (loading) {
            signupForm.classList.add('form-loading');
            submitButton.disabled = true;
        } else {
            signupForm.classList.remove('form-loading');
            submitButton.disabled = false;
        }
    }
    
    // Real-time validation
    fullnameInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (this.value.trim() !== '') {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
    });
    
    emailInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (isValidEmail(this.value)) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
    });
    
    usernameInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (this.value.trim().length >= 3) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
    });
    
    passwordInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (this.value.length >= 8) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
        
        // Check confirm password match
        if (confirmPasswordInput.value !== '') {
            const confirmGroup = confirmPasswordInput.parentElement;
            if (this.value === confirmPasswordInput.value) {
                confirmGroup.classList.remove('error');
                confirmGroup.classList.add('success');
            } else {
                confirmGroup.classList.add('error');
                confirmGroup.classList.remove('success');
            }
        }
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (this.value === passwordInput.value && this.value !== '') {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        } else if (this.value !== '') {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
        }
    });
    
    // Enhanced input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add smooth page entrance animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});