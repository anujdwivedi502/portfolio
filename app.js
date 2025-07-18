// Anuj Dwivedi Portfolio - Fixed Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypingAnimation();
    initSmoothScrolling();
    initNavigationHighlight();
    initParticleSystem();
    initScrollAnimations();
    initFormHandler();
    initMicroInteractions();
    initFloatingOrbs();
    initExternalLinks();
    initHeroButtons();
    
    console.log('Portfolio loaded successfully');
});

// Fixed Hero Buttons
function initHeroButtons() {
    const viewWorkBtn = document.querySelector('.hero-buttons .btn-primary');
    const linkedinBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://linkedin.com/in/anujdwivedi502', '_blank', 'noopener,noreferrer');
        });
    }
}

// Fixed External Links
function initExternalLinks() {
    // Handle all external links
    const externalLinks = document.querySelectorAll('a[href^="https://"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Handle LinkedIn links specifically
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://linkedin.com/in/anujdwivedi502', '_blank', 'noopener,noreferrer');
        });
    });
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid var(--color-cream-50)';
    
    let index = 0;
    const typeSpeed = 120;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        } else {
            // Blinking cursor effect
            setTimeout(() => {
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    typingElement.style.borderRight = 
                        typingElement.style.borderRight === 'none' ? 
                        '3px solid var(--color-cream-50)' : 'none';
                    blinkCount++;
                    if (blinkCount > 8) {
                        clearInterval(blinkInterval);
                        typingElement.style.borderRight = 'none';
                    }
                }, 400);
            }, 1000);
        }
    }
    
    setTimeout(typeText, 1000);
}

// Fixed Smooth Scrolling Navigation
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

// Navigation Highlight on Scroll
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
    
    window.addEventListener('scroll', throttle(updateActiveNav, 16));
    updateActiveNav();
}

// Particle System with Blue-Purple Theme
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    const colors = ['#8A2BE2', '#6A5ACD', '#4682B4', '#2A52BE', '#5F9EA0'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 20;
        const animationDuration = Math.random() * 10 + 15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color}80, transparent);
            border-radius: 50%;
            left: ${left}%;
            animation: floatParticle ${animationDuration}s linear ${animationDelay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content, .timeline-item, .project-card, .education-card, .awards-list li, .contact-content'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
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
            
            // Send email using mailto
            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:anujdwivedi.sae.comp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open mailto
                window.open(mailtoLink, '_blank');
                
                // Reset form and show success message
                contactForm.reset();
                showNotification('Email client opened successfully! Your message has been prepared.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
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

// Input validation with visual feedback
function validateInput(input) {
    const value = input.value.trim();
    
    // Remove previous validation styles
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    if (value) {
        switch (input.name) {
            case 'email':
                if (isValidEmail(value)) {
                    input.style.borderColor = '#6A5ACD';
                    input.style.boxShadow = '0 0 0 2px rgba(106, 90, 205, 0.3)';
                } else {
                    input.style.borderColor = '#ff6b6b';
                    input.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.3)';
                }
                break;
            case 'name':
                if (value.length >= 2) {
                    input.style.borderColor = '#6A5ACD';
                    input.style.boxShadow = '0 0 0 2px rgba(106, 90, 205, 0.3)';
                } else {
                    input.style.borderColor = '#ff6b6b';
                    input.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.3)';
                }
                break;
            case 'subject':
                if (value.length >= 3) {
                    input.style.borderColor = '#6A5ACD';
                    input.style.boxShadow = '0 0 0 2px rgba(106, 90, 205, 0.3)';
                } else {
                    input.style.borderColor = '#ff6b6b';
                    input.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.3)';
                }
                break;
            case 'message':
                if (value.length >= 10) {
                    input.style.borderColor = '#6A5ACD';
                    input.style.boxShadow = '0 0 0 2px rgba(106, 90, 205, 0.3)';
                } else {
                    input.style.borderColor = '#ff6b6b';
                    input.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.3)';
                }
                break;
        }
    }
}

// Micro-interactions
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
    
    // Card hover effects
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Tech tag hover effects
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(106, 90, 205, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });
    });
}

// Floating Orbs Animation
function initFloatingOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    // Mouse movement parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseX - 0.5) * 100 * speed;
            const y = (mouseY - 0.5) * 100 * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Scroll parallax effect
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrolled * speed;
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    const colors = {
        success: '#6A5ACD',
        error: '#ff6b6b',
        info: '#4682B4'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 18px;">${icon}</span>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-left: 4px solid ${colors[type]};
        border-radius: 12px;
        padding: 16px 20px;
        color: var(--color-cream-50);
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Page load effects
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to my portfolio! 🚀', 'success');
    }, 2000);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for testing
window.portfolioFunctions = {
    showNotification,
    isValidEmail,
    validateInput,
    initTypingAnimation,
    initParticleSystem
};