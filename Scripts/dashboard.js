/**
 * Anux Dashboard - Main Application Class
 * Handles UI interactions, navigation, and data management
 */
class AnuxDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.mockData = {
      user: {
        name: 'Alex Johnson',
        plan: 'Pro Plan',
        avatar: '👨‍🎓',
        stats: {
          hoursStudied: 42.5,
          tasksCompleted: 128,
          streakDays: 14,
          progress: 78,
          level: 5,
          xp: 1250,
          xpToNextLevel: 1500
        }
      },
      tasks: [
        { id: 1, title: 'Math Assignment', description: 'Calculus problems due tomorrow', dueDate: 'tomorrow', priority: 'high', subject: 'Math', completed: false },
        { id: 2, title: 'Physics Quiz', description: 'Thermodynamics chapter review', dueDate: 'Friday', priority: 'medium', subject: 'Physics', completed: false },
        { id: 3, title: 'History Essay', description: 'World War II analysis draft', dueDate: 'Next Week', priority: 'low', subject: 'History', completed: false },
        { id: 4, title: 'Chemistry Lab Report', description: 'Acid-base titration experiment', dueDate: 'Tomorrow', priority: 'high', subject: 'Chemistry', completed: false },
        { id: 5, title: 'Literature Reading', description: 'Read chapter 5 of The Great Gatsby', dueDate: 'Next Monday', priority: 'low', subject: 'Literature', completed: true }
      ],
      recentActivity: [
        { id: 1, type: 'neuronote', title: 'Summarized Biology notes', time: '2 hours ago', icon: '🧠' },
        { id: 2, type: 'quiz', title: 'Created Math practice test', time: '4 hours ago', icon: '🎯' },
        { id: 3, type: 'collab', title: 'Joined Physics study group', time: 'Yesterday', icon: '👥' },
        { id: 4, type: 'weakness', title: 'Identified weak areas in Algebra', time: '2 days ago', icon: '🔍' },
        { id: 5, type: 'studyplan', title: 'Created new study plan', time: '3 days ago', icon: '📅' }
      ],
      subjects: [
        { name: 'Mathematics', progress: 85, color: '#4A90E2' },
        { name: 'Physics', progress: 65, color: '#E74C3C' },
        { name: 'Chemistry', progress: 72, color: '#2ECC71' },
        { name: 'Biology', progress: 58, color: '#9B59B6' },
        { name: 'History', progress: 41, color: '#F39C12' },
        { name: 'Literature', progress: 67, color: '#1ABC9C' }
      ]
    };
    this.init();
  }

  /**
   * Initialize the dashboard
   */
  init() {
    try {
      this.setupNavigation();
      this.setupUIInteractions();
      this.setupMockData();
      this.setupEventListeners();
      this.updateDashboard();
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      throw error; // Re-throw to be caught by the global error handler
    }
  }

  /**
   * Setup UI interactions and event handlers
   */
  setupUIInteractions() {
    try {
      // Theme toggle
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('themeChanged'));
        });
      }

      // Initialize tooltips
      this.initializeTooltips();
      
      // Initialize any other UI components
      this.initializeComponents();
      
    } catch (error) {
      console.error('Error setting up UI interactions:', error);
    }
  }
  
  /**
   * Initialize tooltips
   */
  initializeTooltips() {
    // Add tooltip initialization code here
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
      // Your tooltip initialization logic
    });
  }
  
  /**
   * Initialize UI components
   */
  initializeComponents() {
    // Initialize any UI components here
  }

  /**
   * Setup event listeners for interactive elements
   */
  setupEventListeners() {
    // Task completion toggles
    document.addEventListener('click', (e) => {
      if (e.target.closest('.task-checkbox')) {
        const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);
        this.toggleTaskComplete(taskId);
      }
    });

    // Add new task
    const addTaskBtn = document.querySelector('.add-task-btn');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => this.showAddTaskModal());
    }

    // Quick action buttons
    document.querySelectorAll('.quick-action').forEach(btn => {
      btn.addEventListener('click', () => this.handleQuickAction(btn.dataset.action));
    });
  }

  /**
   * Toggle task completion status
   */
  toggleTaskComplete(taskId) {
    const task = this.mockData.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.updateTasksList();
      this.updateProgressCircle();
      this.showNotification(`Task marked as ${task.completed ? 'completed' : 'incomplete'}`, 'success');
    }
  }

  /**
   * Show notification to user
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 100);
  }

  /**
   * Update the entire dashboard with current data
   */
  updateDashboard() {
    this.updateUserProfile();
    this.updateProgressCircle();
    this.updateTasksList();
    this.updateRecentActivity();
    this.updateSubjectProgress();
  }

  /**
   * Update user profile section
   */
  updateUserProfile() {
    const { name, plan, stats } = this.mockData.user;
    
    // Update user info in sidebar
    const userNameEl = document.querySelector('.user-name');
    const userPlanEl = document.querySelector('.user-plan');
    const userAvatarEl = document.querySelector('.user-avatar');
    
    if (userNameEl) userNameEl.textContent = name;
    if (userPlanEl) userPlanEl.textContent = plan;
    if (userAvatarEl) userAvatarEl.textContent = this.mockData.user.avatar;

    // Update stats
    const hoursEl = document.getElementById('hours-studied');
    const tasksEl = document.getElementById('tasks-completed');
    const streakEl = document.getElementById('streak-days');
    
    if (hoursEl) hoursEl.textContent = stats.hoursStudied.toFixed(1);
    if (tasksEl) tasksEl.textContent = stats.tasksCompleted;
    if (streakEl) streakEl.textContent = stats.streakDays;
  }

  /**
   * Update progress circle with current progress
   * @param {number} [percentage] - Optional percentage to set (0-100)
   */
  updateProgressCircle(percentage) {
    const progressCircle = document.getElementById('progress-circle');
    const progressPercentage = document.getElementById('progress-percentage');
    
    // If no percentage is provided, use the one from mock data
    if (percentage === undefined) {
      percentage = this.mockData?.user?.stats?.progress || 0;
    }
    
    if (progressCircle && progressPercentage) {
      const radius = 45; // Circle radius
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percentage / 100) * circumference;
      
      // Set up the circle properties
      progressCircle.setAttribute('r', radius);
      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      progressCircle.style.strokeDashoffset = offset;
      progressCircle.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
      
      // Update the percentage text
      progressPercentage.textContent = `${Math.round(percentage)}%`;
      
      // Update the mock data to reflect the current progress
      if (this.mockData?.user?.stats) {
        this.mockData.user.stats.progress = percentage;
      }
    }
    
    // This block is redundant as we're already setting the textContent in the block above
    // when both progressCircle and progressPercentage exist
  }

  /**
   * Update tasks list with current tasks
   */
  updateTasksList() {
    const tasksList = document.getElementById('tasks-list');
    if (!tasksList) return;
    
    // Filter and sort tasks
    const pendingTasks = this.mockData.tasks
      .filter(task => !task.completed)
      .sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    
    // Generate task items
    tasksList.innerHTML = pendingTasks.slice(0, 5).map(task => `
      <div class="task-item ${task.priority}" data-task-id="${task.id}">
        <label class="task-checkbox">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <div class="task-content">
          <h4>${task.title}</h4>
          <p>${task.description}</p>
        </div>
        <div class="task-time">Due: ${task.dueDate}</div>
      </div>
    `).join('');
  }

  /**
   * Update recent activity feed
   */
  updateRecentActivity() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = this.mockData.recentActivity.map(activity => `
      <div class="activity-item" data-activity-id="${activity.id}">
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-content">
          <p><strong>${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</strong> ${activity.title}</p>
          <span class="activity-time">${activity.time}</span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Update subject progress visualization
   */
  updateSubjectProgress() {
    const subjectProgress = document.querySelector('.subject-progress');
    if (!subjectProgress) return;
    
    subjectProgress.innerHTML = this.mockData.subjects.map(subject => `
      <div class="subject-item">
        <div class="subject-info">
          <span class="subject-name">${subject.name}</span>
          <span class="subject-percentage">${subject.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" 
               style="width: ${subject.progress}%; background: ${subject.color}">
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Handle quick action button clicks
   */
  handleQuickAction(action) {
    switch(action) {
      case 'create-notes':
        this.showNotification('Opening note editor...', 'info');
        // Navigate to Neuronote section
        this.navigateToSection('neuronote');
        break;
      case 'start-quiz':
        this.showNotification('Preparing quiz...', 'info');
        // Navigate to Quiz Generator section
        this.navigateToSection('quiz-generator');
        break;
      case 'find-weakness':
        this.showNotification('Analyzing your performance...', 'info');
        // Navigate to Weakness Finder section
        this.navigateToSection('weakness-finder');
        break;
      case 'view-analytics':
        this.showNotification('Loading your analytics...', 'info');
        // Navigate to Analytics section
        this.navigateToSection('analytics');
        break;
    }
  }

  /**
   * Navigate to a specific section
   */
  navigateToSection(sectionId) {
    const section = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
    if (section) {
      section.click();
    }
  }

  /**
   * Show add task modal
   */
  showAddTaskModal() {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Task</h3>
          <button class="close-modal">&times;</button>
        </div>
        <form id="add-task-form">
          <div class="form-group">
            <label for="task-title">Task Title</label>
            <input type="text" id="task-title" required>
          </div>
          <div class="form-group">
            <label for="task-description">Description</label>
            <textarea id="task-description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="task-subject">Subject</label>
            <select id="task-subject" required>
              <option value="">Select a subject</option>
              ${this.mockData.subjects.map(subject => 
                `<option value="${subject.name}">${subject.name}</option>`
              ).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="task-priority">Priority</label>
            <select id="task-priority" required>
              <option value="high">High</option>
              <option value="medium" selected>Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div class="form-group">
            <label for="task-due">Due Date</label>
            <input type="date" id="task-due" required>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary close-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => modal.remove());
    });

    const form = modal.querySelector('#add-task-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addNewTask({
          title: document.getElementById('task-title').value,
          description: document.getElementById('task-description').value,
          subject: document.getElementById('task-subject').value,
          priority: document.getElementById('task-priority').value,
          dueDate: document.getElementById('task-due').value
        });
        modal.remove();
      });
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const dueDateInput = modal.querySelector('#task-due');
    if (dueDateInput) {
      dueDateInput.min = today;
    }
  }

  /**
   * Add a new task
   */
  addNewTask(taskData) {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      subject: taskData.subject,
      priority: taskData.priority,
      dueDate: this.formatDueDate(taskData.dueDate),
      completed: false
    };

    this.mockData.tasks.unshift(newTask);
    this.updateTasksList();
    this.showNotification('Task added successfully!', 'success');
  }

  /**
   * Format due date to relative time
   */
  formatDueDate(dateString) {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
    return dueDate.toLocaleDateString();
  }

  // ===== NAVIGATION =====
  
  /**
   * Setup navigation between sections
   */
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    // Function to handle section change
    const changeSection = (targetSection, item) => {
      if (!targetSection) return;
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      if (item) item.classList.add('active');
      
      // Update current section
      this.currentSection = targetSection;
      this.updatePageTitle(targetSection);
      
      // Show target section with fade effect
      this.showSection(targetSection);
      
      // Save active section to localStorage
      localStorage.setItem('lastActiveSection', targetSection);
    };

    // Add click event listeners to navigation items
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = item.dataset.section;
        changeSection(targetSection, item);
      });
    });
    
    // Restore last active section if available
    const lastActiveSection = localStorage.getItem('lastActiveSection') || 'dashboard';
    const sectionToActivate = document.querySelector(`.nav-item[data-section="${lastActiveSection}"]`);
    
    if (sectionToActivate) {
      changeSection(lastActiveSection, sectionToActivate);
    } else if (navItems.length > 0) {
      // Fallback to first nav item if last active section not found
      const firstNavItem = navItems[0];
      const firstSection = firstNavItem.dataset.section;
      changeSection(firstSection, firstNavItem);
    }
  }

  /**
   * Show a specific section with fade effect
   */
  showSection(sectionId) {
    const sectionElementId = `${sectionId}-section`;
    const targetSection = document.getElementById(sectionElementId);
    const allSections = document.querySelectorAll('.content-section');

    if (!targetSection) {
      console.warn(`Section with ID '${sectionElementId}' not found`);
      return;
    }
    
    // Add transition class to all sections
    allSections.forEach(section => {
      section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Hide all sections first
    allSections.forEach(section => {
      if (section !== targetSection) {
        section.style.opacity = '0';
        section.style.pointerEvents = 'none';
        section.style.transform = 'translateX(20px)';
        section.style.position = 'absolute';
        section.style.visibility = 'hidden';
      }
    });
    
    // Show the target section
    targetSection.style.display = 'block';
    targetSection.style.visibility = 'visible';
    targetSection.style.opacity = '0';
    targetSection.style.transform = 'translateX(0)';
    targetSection.style.position = 'relative';
    
    // Trigger reflow to ensure styles are applied
    void targetSection.offsetHeight;
    
    // Fade in the target section
    requestAnimationFrame(() => {
      targetSection.style.opacity = '1';
      targetSection.style.pointerEvents = 'auto';
      
      // Initialize section-specific functionality
      this.initializeSection(sectionId);

      // Scroll to top of the section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Initialize section-specific functionality
   */
  initializeSection(sectionId) {
    console.log(`Initializing section: ${sectionId}`);

    try {
      switch(sectionId) {
        case 'dashboard':
          this.initializeDashboard();
          break;
        case 'neuronote':
          this.initializeNeuronote();
          break;
        case 'curriculum':
          this.initializeCurriculum();
          break;
        case 'study-planner':
          this.initializeStudyPlanner();
          break;
        case 'collabspace':
          this.initializeCollabSpace();
          break;
        case 'quiz-generator':
          this.initializeQuizGenerator();
          break;
        case 'weakness-finder':
          this.initializeWeaknessFinder();
          break;
        case 'analytics':
          this.initializeAnalytics();
          break;
        default:
          console.warn(`No initialization defined for section: ${sectionId}`);
      }
    } catch (error) {
      console.error(`Error initializing section ${sectionId}:`, error);
    }
  }

  // ===== SECTION INITIALIZERS =====
  
  /**
   * Initialize the dashboard section
   */
  initializeDashboard() {
    console.log('Initializing Dashboard');
    this.updateDashboard();
    
    // Add any dashboard-specific initialization here
    const dashboardSection = document.getElementById('dashboard-section');
    if (dashboardSection) {
      // Initialize any dashboard-specific components
      this.setupDashboardCharts();
      this.setupDashboardEventListeners();
    }
  }
  
  initializeCurriculum() {
    console.log('Initializing Curriculum');
  }

  initializeCollabSpace() {
    console.log('Initializing CollabSpace');
  }

  initializeNeuronote() {
    console.log('Initializing Neuronote AI');
    const neuronoteSection = document.getElementById('neuronote-section');
    if (neuronoteSection) {
      this.setupNeuronoteEditor();
      this.loadNeuronoteContent();
    }
  }
  
  /**
   * Initialize the Study Planner section
   */
  initializeStudyPlanner() {
    console.log('Initializing Study Planner');
    const studyPlannerSection = document.getElementById('study-planner-section');
    if (studyPlannerSection) {
      // Initialize Study Planner components
      this.setupStudyCalendar();
      this.loadStudySessions();
    }
  }
  
  /**
   * Initialize the Quiz Generator section
   */
  initializeQuizGenerator() {
    console.log('Initializing Quiz Generator');
    const quizSection = document.getElementById('quiz-generator-section');
    if (quizSection) {
      // Initialize Quiz Generator components
      this.setupQuizBuilder();
      this.loadQuestionBank();
    }
  }
  
  /**
   * Initialize the Weakness Finder section
   */
  initializeWeaknessFinder() {
    console.log('Initializing Weakness Finder');
    const weaknessSection = document.getElementById('weakness-finder-section');
    if (weaknessSection) {
      // Initialize Weakness Finder components
      this.analyzePerformance();
      this.setupWeaknessVisualizations();
    }
  }
  
  /**
   * Initialize the Analytics section
   */
  initializeAnalytics() {
    console.log('Initializing Analytics');
    const analyticsSection = document.getElementById('analytics-section');
    if (analyticsSection) {
      // Initialize Analytics components
      this.loadAnalyticsData();
      this.setupAnalyticsCharts();
    }
  }
  
  // ===== HELPER METHODS =====
  
  /**
   * Setup dashboard charts
   */
  setupDashboardCharts() {
    // Initialize any charts or visualizations for the dashboard
    console.log('Setting up dashboard charts');
    // Implementation would go here
  }
  
  /**
   * Setup dashboard event listeners
   */
  setupDashboardEventListeners() {
    // Add any dashboard-specific event listeners
    console.log('Setting up dashboard event listeners');
    // Implementation would go here
  }
  
  // ===== SECTION SPECIFIC METHODS =====
  
  /**
   * Setup Neuronote editor
   */
  setupNeuronoteEditor() {
    console.log('Setting up Neuronote editor');
    // Implementation would go here
  }
  
  /**
   * Load Neuronote content
   */
  loadNeuronoteContent() {
    console.log('Loading Neuronote content');
    // Implementation would go here
  }
  
  /**
   * Setup study calendar
   */
  setupStudyCalendar() {
    console.log('Setting up study calendar');
    // Implementation would go here
  }
  
  /**
   * Load study sessions
   */
  loadStudySessions() {
    console.log('Loading study sessions');
    // Implementation would go here
  }
  
  /**
   * Setup quiz builder
   */
  setupQuizBuilder() {
    console.log('Setting up quiz builder');
    // Implementation would go here
  }
  
  /**
   * Load question bank
   */
  loadQuestionBank() {
    console.log('Loading question bank');
    // Implementation would go here
  }
  
  /**
   * Analyze performance for weakness finder
   */
  analyzePerformance() {
    console.log('Analyzing performance for weakness finder');
    // Implementation would go here
  }
  
  /**
   * Setup weakness visualizations
   */
  setupWeaknessVisualizations() {
    console.log('Setting up weakness visualizations');
    // Implementation would go here
  }
  
  /**
   * Load analytics data
   */
  loadAnalyticsData() {
    console.log('Loading analytics data');
    // Implementation would go here
  }
  
  /**
   * Setup analytics charts
   */
  setupAnalyticsCharts() {
    console.log('Setting up analytics charts');
    // Implementation would go here
  }
  
  /**
   * Setup responsive behavior
   */
  setupResponsiveBehavior() {
    // Toggle sidebar on mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
          document.body.appendChild(overlay);
          overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.remove();
          });
        } else {
          overlay.remove();
        }
      });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      document.body.classList.add('resize-animation-stopper');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 400);
    });
  }
  
  /**
   * Setup theme switcher
   */
  setupThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      // Check for saved theme preference or use preferred color scheme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
      
      // Apply the saved theme
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      // Toggle theme on button click
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        const icon = themeToggle.querySelector('i');
        if (icon) {
          icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
      });
      
      // Update button icon based on initial theme
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  /**
   * Setup sidebar toggle and behavior
   */
  setupSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarCollapse = localStorage.getItem('sidebarCollapsed') === 'true';
    
    if (sidebar) {
      // Apply saved collapsed state
      if (sidebarCollapse) {
        sidebar.classList.add('collapsed');
      }
      
      // Toggle sidebar on button click
      if (menuToggle) {
        menuToggle.addEventListener('click', () => {
          sidebar.classList.toggle('collapsed');
          localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
      }
      
      // Handle sidebar item clicks
      const navItems = sidebar.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        // Handle dropdown toggles
        const hasChildren = item.querySelector('.nav-dropdown');
        if (hasChildren) {
          item.classList.add('has-children');
          
          // Add dropdown toggle button
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'nav-dropdown-toggle';
          toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
          item.appendChild(toggleBtn);
          
          // Toggle dropdown on button click
          toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('expanded');
          });
        }
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
    const svg = progressCircle?.closest('svg');
    
    if (!progressCircle || !progressPercentage || !svg) return;
    
    // Set up the SVG circle properties
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    // Set initial attributes for the progress circle
    progressCircle.setAttribute('r', radius);
    progressCircle.setAttribute('cx', '50%');
    progressCircle.setAttribute('cy', '50%');
    progressCircle.setAttribute('stroke-width', '8');
    progressCircle.setAttribute('fill', 'transparent');
    progressCircle.style.strokeLinecap = 'round';
    progressCircle.style.transform = 'rotate(-90deg)';
    progressCircle.style.transformOrigin = '50% 50%';
    progressCircle.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
    
    // Create background circle if it doesn't exist
    let bgCircle = svg.querySelector('.progress-bg');
    if (!bgCircle) {
      bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bgCircle.classList.add('progress-bg');
      bgCircle.setAttribute('r', radius);
      bgCircle.setAttribute('cx', '50%');
      bgCircle.setAttribute('cy', '50%');
      bgCircle.setAttribute('stroke-width', '8');
      bgCircle.setAttribute('fill', 'transparent');
      bgCircle.style.stroke = 'rgba(0, 0, 0, 0.1)';
      svg.insertBefore(bgCircle, progressCircle);
    }
    
    // Set up gradient for the progress circle
    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.insertBefore(defs, svg.firstChild);
    }
    
    // Add gradient if not already present
    if (!svg.querySelector('#progressGradient')) {
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.id = 'progressGradient';
      gradient.setAttribute('gradientTransform', 'rotate(90)');
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', '#4A90E2');
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', '#357ABD');
      
      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
    }
    
    // Apply gradient to the circle
    progressCircle.setAttribute('stroke', 'url(#progressGradient)');
    
    // Set initial progress
    this.updateProgressCircle();
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
    errorMessage.style.padding = '1rem';
    errorMessage.style.background = '#ffebee';
    errorMessage.style.color = '#c62828';
    errorMessage.style.borderLeft = '4px solid #c62828';
    errorMessage.style.margin = '1rem';
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
