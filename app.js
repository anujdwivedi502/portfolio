// Apple Liquid Glass Portfolio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavigationHighlight();
    initSkillBars();
    initScrollAnimations();
    initFormHandler();
    initMicroInteractions();
    initBackgroundEffects();
    initFloatingOrbs();
    initExternalLinks();
    initEnhancedScrollEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Navigation highlight based on scroll position
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                
                const correspondingNavLink = document.querySelector(`.nav-item[href="#${section.id}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// External link handling
function initExternalLinks() {
    // Handle GitHub profile button in hero section
    const githubButtons = document.querySelectorAll('a[href^="https://github.com/"]');
    
    githubButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            window.open(url, '_blank', 'noopener,noreferrer');
        });
        
        // Add visual feedback
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Handle project GitHub links
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url && url.startsWith('https://github.com/')) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url && url.startsWith('http')) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = targetWidth + '%';
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .project-card, .skill-card, .contact-content');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for grids
                if (entry.target.classList.contains('projects-grid') || 
                    entry.target.classList.contains('skills-grid') ||
                    entry.target.classList.contains('services-grid')) {
                    
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
}

// Form submission handler
function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.form-submit');
    
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const subject = contactForm.querySelector('input[name="subject"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Add loading animation
            submitButton.style.background = 'rgba(255, 255, 255, 0.1)';
            submitButton.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                submitButton.style.opacity = '';
                
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Force reflow
    notification.offsetHeight;
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Micro-interactions
function initMicroInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(31, 38, 135, 0.4)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.2)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('.glass-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(31, 38, 135, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.2)';
        });
    });
}

// Background effects and parallax
function initBackgroundEffects() {
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    
    // Parallax effect for floating orbs
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            const translateY = rate * speed;
            orb.style.transform = `translateY(${translateY}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Mouse move effect
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
    });
    
    function updateMouseParallax() {
        if (isMouseMoving) {
            floatingOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.0003;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                
                const currentTransform = orb.style.transform;
                const translateYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
                const translateY = translateYMatch ? translateYMatch[1] : '0px';
                
                orb.style.transform = `translateY(${translateY}) translate(${x}px, ${y}px)`;
            });
            
            isMouseMoving = false;
        }
        
        requestAnimationFrame(updateMouseParallax);
    }
    
    requestAnimationFrame(updateMouseParallax);
}

// Initialize floating orbs animation
function initFloatingOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    orbs.forEach((orb, index) => {
        // Add random rotation and position variations
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        
        orb.style.animationDelay = randomDelay + 's';
        orb.style.animationDuration = randomDuration + 's';
        
        // Add subtle pulsing effect
        setInterval(() => {
            const randomOpacity = 0.3 + Math.random() * 0.4;
            orb.style.opacity = randomOpacity;
        }, 3000 + Math.random() * 2000);
    });
}

// Enhanced scroll effects
function initEnhancedScrollEffects() {
    let isScrolling = false;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Update navigation opacity based on scroll
        const nav = document.querySelector('.floating-nav');
        if (nav) {
            const opacity = scrollY > 50 ? 0.95 : 1;
            nav.style.opacity = opacity;
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < windowHeight) {
            const offset = scrollY * 0.5;
            hero.style.transform = `translateY(${offset}px)`;
        }
        
        isScrolling = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            requestAnimationFrame(updateScrollEffects);
            isScrolling = true;
        }
    });
}

// Resize handler for responsive adjustments
function initResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Adjust orb positions on mobile
            const orbs = document.querySelectorAll('.floating-orb');
            if (window.innerWidth < 768) {
                orbs.forEach(orb => {
                    orb.style.opacity = '0.3';
                });
            } else {
                orbs.forEach(orb => {
                    orb.style.opacity = '';
                });
            }
        }, 250);
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
}

// Initialize theme handling
function initThemeHandling() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        updateThemeElements();
    }
    
    function updateThemeElements() {
        const orbs = document.querySelectorAll('.floating-orb');
        orbs.forEach(orb => {
            const baseOpacity = window.matchMedia('(prefers-color-scheme: dark)').matches ? 0.4 : 0.6;
            orb.style.opacity = baseOpacity;
        });
    }
    
    mediaQuery.addEventListener('change', handleThemeChange);
    updateThemeElements();
}

// Initialize all additional features
window.addEventListener('load', function() {
    initResizeHandler();
    initKeyboardNavigation();
    initThemeHandling();
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});