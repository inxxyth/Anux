document.addEventListener('DOMContentLoaded', function() {
    // Gallery navigation functionality
    const galleryBtns = document.querySelectorAll('.gallery-btn');
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    galleryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetGallery = this.getAttribute('data-gallery');
            
            // Remove active class from all buttons and sections
            galleryBtns.forEach(b => b.classList.remove('active'));
            gallerySections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show target gallery section
            const targetSection = document.getElementById(targetGallery);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Trigger animations for the newly visible section
                setTimeout(() => {
                    animateGalleryItems(targetSection);
                }, 100);
            }
        });
    });
    
    // Animate gallery items when they become visible
    function animateGalleryItems(section) {
        const items = section.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.6s ease';
            }, index * 150);
        });
    }
    
    // Initialize first gallery section
    const firstSection = document.querySelector('.gallery-section.active');
    if (firstSection) {
        setTimeout(() => {
            animateGalleryItems(firstSection);
        }, 500);
    }
    
    // Interactive mockup animations
    const progressCircles = document.querySelectorAll('.progress-circle');
    progressCircles.forEach(circle => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressCircle(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(circle);
    });
    
    function animateProgressCircle(circle) {
        const progressText = circle.querySelector('.progress-text');
        if (progressText) {
            const targetValue = parseInt(progressText.textContent);
            let currentValue = 0;
            const increment = targetValue / 30;
            
            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(animation);
                }
                progressText.textContent = Math.round(currentValue) + '%';
                
                // Update the conic gradient
                const percentage = currentValue;
                circle.style.background = `conic-gradient(var(--primary-blue) ${percentage}%, #e2e8f0 ${percentage}%)`;
            }, 50);
        }
    }
    
    // Animate chart bars when visible
    const chartBars = document.querySelectorAll('.bar');
    chartBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const height = entry.target.style.height;
                    entry.target.style.setProperty('--bar-height', height);
                    entry.target.style.animation = 'barGrow 1.5s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
    
    // Animate weakness bars
    const weaknessFills = document.querySelectorAll('.weakness-fill');
    weaknessFills.forEach(fill => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(fill);
    });
    
    // Interactive quiz options
    const quizOptions = document.querySelectorAll('.option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentElement.querySelectorAll('.option');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Show correct answer after a delay
            setTimeout(() => {
                siblings.forEach(sibling => {
                    if (sibling.classList.contains('correct')) {
                        sibling.style.background = 'rgba(34, 197, 94, 0.2)';
                        sibling.style.borderLeft = '4px solid #22c55e';
                    }
                });
            }, 1000);
        });
    });
    
    // Schedule item interactions
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('click', function() {
            scheduleItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Resource item hover effects
    const resourceItems = document.querySelectorAll('.resource-item');
    resourceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.background = 'rgba(74, 144, 226, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'var(--background-light)';
        });
    });
    
    // Processing animation for AI tools
    const processingFills = document.querySelectorAll('.processing-fill');
    processingFills.forEach(fill => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'processingAnimation 2s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(fill);
    });
    
    // Stat number counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
    
    function animateStatNumber(element) {
        const targetValue = parseInt(element.textContent);
        let currentValue = 0;
        const increment = targetValue / 20;
        
        const animation = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(animation);
            }
            element.textContent = Math.round(currentValue);
        }, 100);
    }
});
