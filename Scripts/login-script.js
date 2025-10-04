document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm.querySelector('button[type="submit"]');
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validation
        let isValid = true;
        
        if (usernameInput.value.trim() === '') {
            showFieldError(usernameInput, 'Please enter your username or email');
            isValid = false;
        }
        
        if (passwordInput.value.trim() === '') {
            showFieldError(passwordInput, 'Please enter your password');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate authentication process
        const loginData = {
            username: usernameInput.value,
            password: passwordInput.value
        };
        
        console.log('Login attempt:', loginData);
        
        // Simulate API call
        setTimeout(() => {
            // Demo: redirect to landing page (in real app, would go to dashboard)
            window.location.href = 'index.html';
        }, 1500);
    });
    
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
            loginForm.classList.add('form-loading');
            submitButton.disabled = true;
        } else {
            loginForm.classList.remove('form-loading');
            submitButton.disabled = false;
        }
    }
    
    // Real-time validation
    usernameInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (this.value.trim() !== '') {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
    });
    
    passwordInput.addEventListener('input', function() {
        const formGroup = this.parentElement;
        if (this.value.trim() !== '') {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
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