// Green & Yellow Portfolio - Fixed JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
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
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
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
    
    let ticking = false;
    
    function updateActiveNav() {
        if (ticking) return;
        ticking = true;
        
        requestAnimationFrame(() => {
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
            
            ticking = false;
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// Fixed External Links
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="https://"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            window.open(url, '_blank', 'noopener,noreferrer');
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

// Fixed Form Handler
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.querySelector('.form-submit');
    
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send email
            setTimeout(() => {
                // Create mailto link
                const mailtoLink = `mailto:anujdwivedi502@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open mailto
                window.open(mailtoLink, '_blank');
                
                // Reset form
                contactForm.reset();
                showNotification('Message prepared! Your email client should open.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
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
    
    let ticking = false;
    
    function updateParallax() {
        if (ticking) return;
        ticking = true;
        
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            floatingOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.2;
                const translateY = rate * speed;
                orb.style.transform = `translateY(${translateY}px)`;
            });
            
            ticking = false;
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
        
        // Add glow effect
        particle.style.boxShadow = '0 0 6px rgba(0, 255, 127, 0.8)';
        
        // Random color
        const colors = [
            'rgba(0, 255, 127, 0.8)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(127, 255, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;
    });
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
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">${type === 'success' ? '✅' : '❌'}</span>
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
    }, 4000);
}

// Initialize stagger animations for project cards
document.addEventListener('DOMContentLoaded', function() {
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
});

// Simple page load handler
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Portfolio loaded successfully');
});

// Simplified error handling
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});