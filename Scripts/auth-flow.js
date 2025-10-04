// Frontend Authentication UI Management
class AuthFlow {
  constructor() {
    this.init();
  }

  init() {
    // Set up form handlers
    this.setupLoginForm();
    this.setupSignupForm();
    this.setupDemoMode();
  }

  setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin(e.target);
    });
  }

  setupSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSignup(e.target);
    });
  }

  setupDemoMode() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    demoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Show loading state
        const submitBtn = document.querySelector('#loginForm button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Entering Demo Mode...';
          submitBtn.disabled = true;
          
          // Simulate login delay
          setTimeout(() => {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
          }, 1000);
        }
      });
    });
  }

  handleLogin(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Client-side validation
    if (!data.username || !data.password) {
      this.showError(form, 'Please fill in all fields');
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call and redirect to dashboard
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        isAuthenticated: true
      }));
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
      
    }, 1000);
  }

  handleSignup(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Client-side validation
    if (!data.fullname || !data.email || !data.username || !data.password || !data.confirm_password) {
      this.showError(form, 'Please fill in all fields');
      return;
    }
    
    if (data.password !== data.confirm_password) {
      this.showError(form, 'Passwords do not match');
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call and redirect to dashboard
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        isAuthenticated: true
      }));
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
      
    }, 1000);
  }
  
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  clearErrors(form) {
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
  }

  showError(form, fieldName, message) {
    // Remove any existing error for this field
    const existingError = form.querySelector(`.error-message[data-field="${fieldName}"]`);
    if (existingError) {
      existingError.remove();
    }

    // Find the field
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    // Create and show new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.setAttribute('data-field', fieldName);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Insert after the field
    field.classList.add('error');
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    field.focus();
  }

  clearErrors(form) {
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
  }

  // Logout functionality (frontend only)
  static logout() {
    // In a real app, you would call a logout API here
    // For demo, just redirect to home page
    window.location.href = 'index.html';
  }
}

// Initialize auth flow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.authFlow = new AuthFlow();
});
window.AuthFlow = AuthFlow;
