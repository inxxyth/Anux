document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authButtons = document.querySelectorAll('.auth-buttons button');
    const getStartedBtn = document.querySelector('.get-started-btn');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    // Navigation button handlers
    authButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.trim() === 'Log In') {
                window.location.href = 'login.html';
            } else if (this.textContent.trim() === 'Sign Up') {
                window.location.href = 'signup.html';
            }
        });
    });
    
    // Get Started button handler
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .feature-card, .plan, .demo-window, .demo-calendar, .chat-window');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Interactive demo navigation
    const demoNavItems = document.querySelectorAll('.demo-nav-item');
    demoNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            demoNavItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add a subtle animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Calendar day interactions
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Demo animations
    function startTypingAnimation() {
        const typingDots = document.querySelectorAll('.typing-dots span');
        const demoSummary = document.querySelector('.demo-summary');
        
        if (typingDots.length > 0 && demoSummary) {
            demoSummary.style.opacity = '0';
            demoSummary.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                demoSummary.style.opacity = '1';
                demoSummary.style.transform = 'translateY(0)';
                demoSummary.style.transition = 'all 0.8s ease';
            }, 2000);
        }
    }
    
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.demo-progress-fill');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 2s ease-in-out';
                bar.style.width = '78%';
            }, 500);
        });
    }
    
    function animateMessages() {
        const messages = document.querySelectorAll('.message');
        messages.forEach((message, index) => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
                message.style.transition = 'all 0.5s ease';
            }, index * 600);
        });
    }
    
    // Demo observer for animations
    const demoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('neuronote-demo')) {
                    startTypingAnimation();
                } else if (entry.target.classList.contains('demo-screen')) {
                    animateProgressBars();
                } else if (entry.target.classList.contains('collab-demo')) {
                    animateMessages();
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe demo sections
    const demoSections = document.querySelectorAll('.neuronote-demo, .demo-screen, .collab-demo');
    demoSections.forEach(section => {
        demoObserver.observe(section);
    });
    
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Demo cards hover effects
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Curriculum cards animations
    const curriculumCards = document.querySelectorAll('.curriculum-cards .card');
    curriculumCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Problem & Solution hover effects
    const problemSolution = document.querySelectorAll('.problem, .solution');
    problemSolution.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Table row interactions
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Pricing plan interactions
    const pricingPlans = document.querySelectorAll('.pricing-card');
    pricingPlans.forEach(plan => {
        plan.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-15px) scale(1.05)';
            } else {
                this.style.transform = 'translateY(-15px) scale(1.08)';
            }
        });
        
        plan.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'translateY(0) scale(1.05)';
            }
        });
    });
    
    // CTA button interactions with ripple effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Redirect to signup
            setTimeout(() => {
                window.location.href = 'signup.html';
            }, 300);
        });
    });
    
    // Footer link hover effects
    const footerLinks = document.querySelectorAll('.footer-nav a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.color = '#60a5fa';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.color = 'rgba(255, 255, 255, 0.8)';
        });
    });
    
    // Section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                if (entry.target.classList.contains('usp')) {
                    animateCurriculumCards();
                } else if (entry.target.id === 'problem-section') {
                    animateProblemSolution();
                } else if (entry.target.id === 'comparison') {
                    animateComparisonTable();
                } else if (entry.target.id === 'pricing') {
                    animatePricingCards();
                }
            }
        });
    }, { threshold: 0.2 });
    
    // Observe main sections
    const sections = document.querySelectorAll('.usp, #problem-section, #comparison, #pricing');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        sectionObserver.observe(section);
    });
    
    // Animation functions
    function animateCurriculumCards() {
        const cards = document.querySelectorAll('.curriculum-cards .card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    function animateProblemSolution() {
        const problems = document.querySelectorAll('.problem');
        const solutions = document.querySelectorAll('.solution');
        
        problems.forEach((problem, index) => {
            setTimeout(() => {
                problem.style.opacity = '1';
                problem.style.transform = 'translateX(0)';
            }, index * 200 + 200);
        });
        
        solutions.forEach((solution, index) => {
            setTimeout(() => {
                solution.style.opacity = '1';
                solution.style.transform = 'translateX(0)';
            }, index * 200 + 400);
        });
    }
    
    function animateComparisonTable() {
        const table = document.querySelector('table');
        if (table) {
            table.style.opacity = '1';
            table.style.transform = 'translateY(0)';
        }
    }
    
    function animatePricingCards() {
        const plans = document.querySelectorAll('.plan');
        plans.forEach((plan, index) => {
            setTimeout(() => {
                plan.style.opacity = '1';
                plan.style.transform = plan.classList.contains('popular') ?
                    'translateY(0) scale(1.05)' : 'translateY(0) scale(1)';
            }, index * 200);
        });
    }
    
    // Initialize elements for animation
    const initElements = document.querySelectorAll('.curriculum-cards .card, .problem, .solution, table, .plan');
    initElements.forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('problem')) {
            element.style.transform = 'translateX(-50px)';
        } else if (element.classList.contains('solution')) {
            element.style.transform = 'translateX(50px)';
        } else {
            element.style.transform = 'translateY(30px)';
        }
        element.style.transition = 'all 0.8s ease';
    });
    
    // Fallback: Show elements after 3 seconds if animations haven't triggered
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.problem[style*="opacity: 0"], .solution[style*="opacity: 0"], .card[style*="opacity: 0"], .plan[style*="opacity: 0"]');
        hiddenElements.forEach(element => {
            element.style.opacity = '1';
            if (element.classList.contains('problem')) {
                element.style.transform = 'translateX(0)';
            } else if (element.classList.contains('solution')) {
                element.style.transform = 'translateX(0)';
            } else {
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Also ensure chat messages are visible
        const messages = document.querySelectorAll('.message[style*="opacity: 0"]');
        messages.forEach(message => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        });
    }, 3000);
    
    // Click tracking for analytics
    document.addEventListener('click', function(e) {
        const clickedElement = e.target;
        
        if (clickedElement.tagName === 'BUTTON') {
            console.log('Button clicked:', clickedElement.textContent);
        }
        
        if (clickedElement.tagName === 'A') {
            console.log('Link clicked:', clickedElement.href);
        }
    });
    
    // Mobile menu creation
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!nav || !navLinks) return;
        
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #4A90E2;
            cursor: pointer;
        `;
        
        nav.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
    }
    
    createMobileMenu();
    
    // Page loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .animate-on-scroll {
            animation: slideInFromBottom 0.8s ease-out;
        }

        @keyframes slideInFromBottom {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .demo-window.animate-on-scroll {
            animation: demoFloat 0.8s ease-out;
        }

        @keyframes demoFloat {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .demo-progress-fill {
            width: 78%;
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 4px;
            animation: progressFill 2s ease-out 1s forwards;
            transform-origin: left;
            transform: scaleX(0);
        }

        @keyframes progressFill {
            to {
                transform: scaleX(1);
            }
        }
    `;
    document.head.appendChild(style);
});
