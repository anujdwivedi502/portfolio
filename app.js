// Green & Yellow Portfolio - Fixed JavaScript with Working Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavigationHighlight();
    initSkillBars();
    initScrollAnimations();
    initFormHandler();
    initMicroInteractions();
    initBackgroundEffects();
    initTypingAnimation();
    initParticleSystem();
    initExternalLinks();
    initProjectCardAnimations();
    
    console.log('Portfolio loaded successfully');
});

// Fixed Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid #1D1D1F';
    
    let index = 0;
    const typeSpeed = 150;
    
    function typeText() {
        if (index < originalText.length) {
            typingElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        } else {
            // Blinking cursor effect
            setTimeout(() => {
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    typingElement.style.borderRight = 
                        typingElement.style.borderRight === 'none' ? 
                        '3px solid #1D1D1F' : 'none';
                    blinkCount++;
                    if (blinkCount > 6) {
                        clearInterval(blinkInterval);
                        typingElement.style.borderRight = 'none';
                    }
                }, 500);
            }, 1000);
        }
    }
    
    setTimeout(typeText, 1000);
}

// Fixed Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
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

// Fixed Navigation Highlight
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
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
    updateActiveNav();
}

// Fixed External Links
function initExternalLinks() {
    // Handle all external links
    const externalLinks = document.querySelectorAll('a[href^="https://"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Handle project links specifically
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

// Fixed Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = targetWidth + '%';
                }, 500);
                
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

// Fixed Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .service-card, .skill-card, .contact-content');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
}

// Fixed Form Handler
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.querySelector('.form-submit');
    
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim() || '';
            const email = formData.get('email')?.trim() || '';
            const subject = formData.get('subject')?.trim() || '';
            const message = formData.get('message')?.trim() || '';
            
            // Validation
            if (!name || name.length < 2) {
                showNotification('Please enter a valid name (minimum 2 characters).', 'error');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!subject || subject.length < 3) {
                showNotification('Please enter a subject (minimum 3 characters).', 'error');
                return;
            }
            
            if (!message || message.length < 10) {
                showNotification('Please enter a message (minimum 10 characters).', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate email sending and then create mailto link
            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:anujdwivedi502@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open mailto
                window.open(mailtoLink, '_blank');
                
                // Reset form and show success message
                contactForm.reset();
                showNotification('Email client opened successfully! Your message has been prepared.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time input validation
function validateInput(input) {
    const value = input.value.trim();
    
    // Remove previous validation styles
    input.style.borderColor = '';
    
    if (value) {
        switch (input.name) {
            case 'email':
                if (isValidEmail(value)) {
                    input.style.borderColor = 'rgba(0, 255, 127, 0.6)';
                } else {
                    input.style.borderColor = 'rgba(255, 68, 68, 0.6)';
                }
                break;
            case 'name':
                if (value.length >= 2) {
                    input.style.borderColor = 'rgba(0, 255, 127, 0.6)';
                } else {
                    input.style.borderColor = 'rgba(255, 68, 68, 0.6)';
                }
                break;
            case 'subject':
                if (value.length >= 3) {
                    input.style.borderColor = 'rgba(0, 255, 127, 0.6)';
                } else {
                    input.style.borderColor = 'rgba(255, 68, 68, 0.6)';
                }
                break;
            case 'message':
                if (value.length >= 10) {
                    input.style.borderColor = 'rgba(0, 255, 127, 0.6)';
                } else {
                    input.style.borderColor = 'rgba(255, 68, 68, 0.6)';
                }
                break;
        }
    }
}

// Fixed Micro-interactions
function initMicroInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('.glass-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Fixed Background Effects
function initBackgroundEffects() {
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        floatingOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.2;
            const translateY = rate * speed;
            orb.style.transform = `translateY(${translateY}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // Mouse move effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        floatingOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.0003;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            orb.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Fixed Particle System
function initParticleSystem() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const randomX = Math.random() * 100;
        const randomSize = Math.random() * 3 + 2;
        const randomDelay = Math.random() * 10;
        const randomDuration = Math.random() * 5 + 8;
        
        particle.style.left = randomX + '%';
        particle.style.width = randomSize + 'px';
        particle.style.height = randomSize + 'px';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        
        // Enhanced visibility
        particle.style.opacity = '1';
        particle.style.zIndex = '1';
        
        // Enhanced glow effect
        particle.style.boxShadow = '0 0 8px rgba(0, 255, 127, 0.8)';
        
        // Dynamic colors
        const colors = [
            'rgba(0, 255, 127, 0.8)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(127, 255, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;
        
        // Color changing animation
        setInterval(() => {
            const newColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = `radial-gradient(circle, ${newColor} 0%, transparent 70%)`;
        }, 3000 + Math.random() * 2000);
    });
}

// Fixed Project Card Animations
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card.stagger-animation');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.parentElement.querySelectorAll('.project-card');
                
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectObserver.observe(projectsGrid);
    }
}

// Fixed Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">${icon}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Page load handler
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to my portfolio! 🚀', 'success');
    }, 1000);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Export functions for testing
window.portfolioFunctions = {
    showNotification,
    isValidEmail,
    validateInput
};