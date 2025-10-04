/**
 * Anux Dashboard - Main Application Class
 * Handles UI interactions, navigation, and data management
 */
class AnuxDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.init();
  }

  /**
   * Initialize the dashboard
   */
  init() {
    this.setupNavigation();
    this.setupUIInteractions();
    this.setupMockData();
  }

  // ===== NAVIGATION =====
  
  /**
   * Setup navigation between sections
   */
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = item.dataset.section;
        if (!targetSection) return;
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Update current section
        this.currentSection = targetSection;
        this.updatePageTitle(targetSection);
        
        // Show target section with fade effect
        this.showSection(targetSection);
      });
    });
  }

  /**
   * Show a specific section with fade effect
   */
  showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      if (section.id === `${sectionId}-section`) {
        section.style.opacity = '0';
        section.style.display = 'block';
        setTimeout(() => {
          section.style.opacity = '1';
          section.style.transition = 'opacity 0.3s ease';
        }, 10);
      } else {
        section.style.display = 'none';
      }
    });
  }

  // ===== UI COMPONENTS =====
  
  /**
   * Initialize all UI interactions
   */
  setupUIInteractions() {
    this.setupSidebar();
    this.setupTooltips();
    this.setupModals();
    this.setupForms();
    this.setupProgressCircle();
  }

  /**
   * Setup sidebar toggle functionality
   */
  setupSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }
  }

  /**
   * Setup tooltips for elements with data-tooltip attribute
   */
  setupTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        const tooltipText = el.getAttribute('data-tooltip');
        if (!tooltipText) return;
        
        // Remove any existing tooltip
        this.removeExistingTooltip();
        
        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = el.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        
        // Store reference
        this.currentTooltip = tooltip;
      });
      
      el.addEventListener('mouseleave', () => {
        this.removeExistingTooltip();
      });
    });
  }

  /**
   * Remove any existing tooltip
   */
  removeExistingTooltip() {
    if (this.currentTooltip && this.currentTooltip.parentNode) {
      this.currentTooltip.parentNode.removeChild(this.currentTooltip);
      this.currentTooltip = null;
    }
  }

  /**
   * Setup modal dialogs
   */
  setupModals() {
    // Close modals when clicking outside content
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = btn.closest('.modal');
        if (modal) modal.style.display = 'none';
      });
    });
  }

  /**
   * Setup form handling with validation
   */
  setupForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            this.showFormError(input, 'This field is required');
            isValid = false;
          } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
            this.showFormError(input, 'Please enter a valid email');
            isValid = false;
          } else {
            this.clearFormError(input);
          }
        });
        
        if (isValid) {
          this.handleFormSubmission(form);
        }
      });
    });
  }
  
  /**
   * Show form field error
   */
  showFormError(input, message) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    formGroup.classList.add('has-error');
  }
  
  /**
   * Clear form field error
   */
  clearFormError(input) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    formGroup.classList.remove('has-error');
  }
  
  /**
   * Validate email format
   */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  /**
   * Handle form submission
   */
  handleFormSubmission(form) {
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert form data to object
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Show success message
    this.showNotification('Form submitted successfully!', 'success');
    
    // Reset form
    form.reset();
    
    // Log form data (in a real app, you would send this to a server)
    console.log('Form submitted:', formObject);
  }

    // ===== MOCK DATA =====
  
  /**
   * Initialize with mock data for demonstration
   */
  setupMockData() {
    this.setCurrentUser('Demo User');
    this.setCurrentDate();
    this.initializeProgressCircles();
    this.setupMockNotifications();
  }
  
  /**
   * Setup mock notifications
   */
  setupMockNotifications() {
    const notifications = [
      { id: 1, text: 'New study material available', type: 'info' },
      { id: 2, text: 'Quiz results are ready', type: 'success' },
      { id: 3, text: 'Study group meeting in 1 hour', type: 'reminder' }
    ];
    
    const container = document.querySelector('.notifications-container');
    if (!container) return;
    
    notifications.forEach(notif => {
      const element = document.createElement('div');
      element.className = `notification ${notif.type}`;
      element.innerHTML = `
        <span class="notification-text">${notif.text}</span>
        <button class="notification-close">&times;</button>
      `;
      container.appendChild(element);
    });
    
    // Add click handler for close buttons
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('notification-close')) {
        e.target.closest('.notification').remove();
      }
    });
  }

  /**
   * Set the current user name in the UI
   */
  setCurrentUser(name) {
    const userElements = document.querySelectorAll('.user-name');
    userElements.forEach(el => {
      el.textContent = name;
    });
  }

  /**
   * Set the current date in the UI
   */
  setCurrentDate() {
    const dateElements = document.querySelectorAll('.current-date');
    if (dateElements.length === 0) return;
    
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const today = new Date().toLocaleDateString('en-US', options);
    dateElements.forEach(el => {
      el.textContent = today;
    });
  }

  /**
   * Update page title and subtitle based on current section
   */
  updatePageTitle(section) {
    const titles = {
      'dashboard': {
        title: 'Dashboard',
        subtitle: 'Welcome back! Here\'s your learning overview.'
      },
      'notes': {
        title: 'Smart Notes',
        subtitle: 'Your AI-powered notes and summaries'
      },
      'collabspace': {
        title: 'CollabSpace',
        subtitle: 'Connect and learn with your study groups'
      },
      'quiz-generator': {
        title: 'Quiz Generator',
        subtitle: 'Create custom quizzes from your materials'
      },
      'weakness-finder': {
        title: 'Weakness Finder',
        subtitle: 'Identify and improve your weak areas'
      },
      'analytics': {
        title: 'Analytics',
        subtitle: 'Detailed insights into your learning progress'
      }
    };

    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    if (titles[section] && pageTitle && pageSubtitle) {
      pageTitle.textContent = titles[section].title;
      pageSubtitle.textContent = titles[section].subtitle;
    }
  }

  // ===== PROGRESS CIRCLE =====
  
  /**
   * Initialize progress circle animation
   */
  setupProgressCircle() {
    const progressCircle = document.getElementById('progress-circle');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressCircle && progressPercentage) {
      const percentage = 78; // Default value
      this.updateProgressCircle(percentage);
    }
  }

  /**
   * Update progress circle with new percentage
   */
  updateProgressCircle(percentage) {
    const progressCircle = document.getElementById('progress-circle');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (!progressCircle) return;
    
    const circumference = 2 * Math.PI * 40; // Assuming radius of 40
    const offset = circumference - (percentage / 100) * circumference;
    
    // Update circle style
    progressCircle.style.strokeDashoffset = offset;
    
    // Update percentage text
    if (progressPercentage) {
      progressPercentage.textContent = `${percentage}%`;
    }
    
    // Add gradient definition if not exists
    const svg = progressCircle.closest('svg');
    if (svg && !svg.querySelector('#progressGradient')) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.id = 'progressGradient';
      gradient.innerHTML = `
        <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
      `;
      defs.appendChild(gradient);
      svg.insertBefore(defs, svg.firstChild);
      progressCircle.style.stroke = 'url(#progressGradient)';
    }
  }

  /**
   * Initialize all progress circle animations
   */
  initializeProgressCircles() {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach(circle => this.animateProgressCircle(circle));
  }

  /**
   * Animate a single progress circle
   */
  animateProgressCircle(circle) {
    const progress = circle.getAttribute('data-progress') || '0';
    const progressElement = circle.querySelector('.progress-value');
    
    if (!progressElement) return;
    
    let current = 0;
    const target = parseInt(progress);
    const increment = target / 50; // Animation steps
    
    const animate = () => {
      if (current < target) {
        current += increment;
        if (current > target) current = target;
        
        const circumference = 2 * Math.PI * 40; // Assuming radius of 40
        const offset = circumference - (current / 100) * circumference;
        
        circle.style.setProperty('--progress-offset', offset);
        progressElement.textContent = `${Math.round(current)}%`;
        
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animate();
        observer.unobserve(circle);
      }
    });
    
    observer.observe(circle);
  }
}

// Initialize dashboard when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Check for required elements
    const requiredElements = [
      { selector: '.dashboard-container', message: 'Dashboard container not found' },
      { selector: '.sidebar', message: 'Sidebar not found' },
      { selector: '.main-content', message: 'Main content area not found' }
    ];

    // Verify required elements exist
    const missingElements = requiredElements.filter(({ selector }) => !document.querySelector(selector));
    if (missingElements.length > 0) {
      throw new Error(missingElements.map(el => el.message).join(', '));
    }

    // Initialize dashboard
    window.dashboard = new AnuxDashboard();
    console.log('Anux Dashboard initialized successfully');
    
    // Show welcome message
    setTimeout(() => {
      if (window.dashboard.showNotification) {
        window.dashboard.showNotification('Welcome to Anux Dashboard!', 'success');
      }
    }, 1000);
    
  } catch (error) {
    console.error('Failed to initialize Anux Dashboard:', error);
    
    // Show error message to user
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Failed to initialize the dashboard. Please refresh the page or contact support if the issue persists.';
    document.body.prepend(errorMessage);
  }
});

// Listen for custom events
document.addEventListener('themeChanged', (event) => {
  const body = document.body;
  if (event.detail && event.detail.theme) {
    body.setAttribute('data-theme', event.detail.theme);
  } else {
    // Toggle between light and dark theme
    const currentTheme = body.getAttribute('data-theme') || 'light';
    body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
  }
});

// Initialize theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('themeChanged'));
  });
}
