// Blue-Purple Glassmorphism Portfolio - Anuj Dwivedi - Fixed External Links

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // This will be replaced with actual key in production
    
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
    initTimelineAnimations();
    
    console.log('Anuj Dwivedi Portfolio loaded successfully with updated resume data');
});

// Enhanced Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const originalText = "Anuj Dwivedi";
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid #FFFFFF';
    typingElement.style.whiteSpace = 'nowrap';
    typingElement.style.overflow = 'hidden';
    typingElement.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.8)';
    
    let index = 0;
    const typeSpeed = 120;
    
    function typeText() {
        if (index < originalText.length) {
            typingElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        } else {
            setTimeout(() => {
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    typingElement.style.borderRight = 
                        typingElement.style.borderRight === 'none' ? 
                        '3px solid #FFFFFF' : 'none';
                    blinkCount++;
                    if (blinkCount > 8) {
                        clearInterval(blinkInterval);
                        typingElement.style.borderRight = 'none';
                    }
                }, 500);
            }, 1000);
        }
    }
    
    setTimeout(typeText, 1500);
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = 120;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                const correspondingNavItem = document.querySelector(`.nav-item[href="#${targetId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
                
                showNotification(`✨ Navigating to ${targetId}`, 'success');
            }
        });
    });
}

// Enhanced Navigation Highlight
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                activeSection = section;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        if (activeSection) {
            const correspondingNavLink = document.querySelector(`.nav-item[href="#${activeSection.id}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', updateActiveNav);
    setTimeout(updateActiveNav, 100);
}

// Fixed External Links
function initExternalLinks() {
    // Handle LinkedIn links
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = 'https://linkedin.com/in/anujdwivedi502';
            window.open(url, '_blank', 'noopener,noreferrer');
            showNotification('🔗 Opening LinkedIn profile...', 'info');
        });
    });
    
    // Handle email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'anujdwivedi.sae.comp@gmail.com';
            window.location.href = `mailto:${email}`;
            showNotification('📧 Opening email client...', 'info');
        });
    });
    
    // Handle other external links
    const otherExternalLinks = document.querySelectorAll('a[href^="https://"]');
    otherExternalLinks.forEach(link => {
        if (!link.href.includes('linkedin.com')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const url = this.getAttribute('href');
                if (url && url !== '#') {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    showNotification('🔗 Opening link in new tab...', 'info');
                }
            });
        }
    });
}

// Enhanced Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = targetWidth + '%';
                    skillBar.style.opacity = '1';
                }, 300);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.3
    });
    
    skillBars.forEach(bar => {
        bar.style.opacity = '0';
        skillObserver.observe(bar);
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .service-card, .skill-category, .contact-content, .education-card, .awards-section');
    
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
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animationObserver.observe(element);
    });
}

// Enhanced Form Handler with EmailJS
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.querySelector('.form-submit');
    
    if (contactForm && submitButton) {
        // Initialize form inputs
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.pointerEvents = 'auto';
            input.style.userSelect = 'text';
            input.style.cursor = 'text';
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                this.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                validateInputWithDelay(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('from_name')?.trim() || '';
            const email = formData.get('reply_to')?.trim() || '';
            const subject = formData.get('subject')?.trim() || '';
            const message = formData.get('message')?.trim() || '';
            
            // Validation
            const errors = [];
            
            if (!name || name.length < 2) {
                errors.push('Name must be at least 2 characters long');
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Please enter a valid email address');
            }
            
            if (!subject || subject.length < 3) {
                errors.push('Subject must be at least 3 characters long');
            }
            
            if (!message || message.length < 10) {
                errors.push('Message must be at least 10 characters long');
            }
            
            if (errors.length > 0) {
                showNotification(`❌ Please fix the following:\n${errors.join('\n')}`, 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            showNotification('📤 Sending your message...', 'info');
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                reply_to: email,
                subject: subject,
                message: message,
                to_email: 'anujdwivedi.sae.comp@gmail.com'
            };
            
            // Try EmailJS first, fallback to mailto
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        showNotification('✅ Message sent successfully! I will get back to you soon.', 'success');
                        contactForm.reset();
                        inputs.forEach(input => {
                            input.style.borderColor = '';
                            input.style.boxShadow = '';
                        });
                    })
                    .catch(function(error) {
                        console.error('EmailJS Error:', error);
                        fallbackToMailto(name, email, subject, message);
                    })
                    .finally(function() {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.opacity = '1';
                    });
            } else {
                // Fallback to mailto
                fallbackToMailto(name, email, subject, message);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        });
    }
}

// Fallback to mailto functionality
function fallbackToMailto(name, email, subject, message) {
    const emailBody = `Dear Anuj,

I hope this message finds you well. I'm reaching out regarding potential opportunities.

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

I look forward to hearing from you soon.

Best regards,
${name}`;
    
    const mailtoLink = `mailto:anujdwivedi.sae.comp@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(emailBody)}`;
    
    try {
        window.location.href = mailtoLink;
        showNotification('✅ Your email client has been opened with your message pre-filled. Please review and send the email.', 'success');
        
        setTimeout(() => {
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.reset();
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                });
            }
        }, 1000);
        
    } catch (error) {
        showNotification('❌ Unable to open email client. Please copy: anujdwivedi.sae.comp@gmail.com', 'error');
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Input validation
function validateInput(input) {
    const value = input.value.trim();
    
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    if (value) {
        let isValid = false;
        
        switch (input.name) {
            case 'reply_to':
                isValid = isValidEmail(value);
                break;
            case 'from_name':
                isValid = value.length >= 2;
                break;
            case 'subject':
                isValid = value.length >= 3;
                break;
            case 'message':
                isValid = value.length >= 10;
                break;
        }
        
        if (isValid) {
            input.style.borderColor = 'rgba(122, 250, 150, 0.8)';
            input.style.boxShadow = '0 0 0 3px rgba(122, 250, 150, 0.2)';
        } else {
            input.style.borderColor = 'rgba(255, 100, 100, 0.8)';
            input.style.boxShadow = '0 0 0 3px rgba(255, 100, 100, 0.2)';
        }
    }
}

function validateInputWithDelay(input) {
    clearTimeout(input.validationTimeout);
    input.validationTimeout = setTimeout(() => {
        validateInput(input);
    }, 300);
}

// Enhanced Micro-interactions
function initMicroInteractions() {
    const buttons = document.querySelectorAll('.btn, .glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.boxShadow = '0 5px 20px rgba(42, 82, 190, 0.5)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Enhanced Background Effects
function initBackgroundEffects() {
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        floatingOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.15;
            const translateY = rate * speed;
            orb.style.transform = `translateY(${translateY}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        floatingOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.0002;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            orb.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Enhanced Particle System
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
        
        particle.style.opacity = '1';
        particle.style.zIndex = '1';
        particle.style.boxShadow = '0 0 12px rgba(106, 90, 205, 0.9)';
        
        const colors = [
            'radial-gradient(circle, rgba(42, 82, 190, 0.9) 0%, rgba(42, 82, 190, 0.3) 70%, transparent 100%)',
            'radial-gradient(circle, rgba(106, 90, 205, 0.9) 0%, rgba(106, 90, 205, 0.3) 70%, transparent 100%)',
            'radial-gradient(circle, rgba(138, 43, 226, 0.9) 0%, rgba(138, 43, 226, 0.3) 70%, transparent 100%)',
            'radial-gradient(circle, rgba(70, 130, 180, 0.9) 0%, rgba(70, 130, 180, 0.3) 70%, transparent 100%)',
            'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        
        setInterval(() => {
            const newColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = newColor;
        }, 2000 + Math.random() * 3000);
    });
}

// Enhanced Project Card Animations
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
                    }, index * 150);
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

// Enhanced Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'translateY(-50%) scale(1.2)';
                    setTimeout(() => {
                        marker.style.transform = 'translateY(-50%) scale(1)';
                    }, 300);
                }
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(item);
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
            <span style="font-size: 20px; flex-shrink: 0;">${icon}</span>
            <span style="line-height: 1.4; word-wrap: break-word;">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        notification.style.opacity = '1';
    }, 100);
    
    const baseDelay = type === 'success' ? 6000 : type === 'error' ? 8000 : 4000;
    const hideDelay = Math.max(baseDelay, message.length * 50);
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, hideDelay);
}

// Page Load Handler
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        showNotification('🎉 Welcome to Anuj Dwivedi\'s Portfolio! Updated with latest experience and skills.', 'success');
    }, 2000);
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('⚠️ A minor error occurred. The page should continue working normally.', 'warning');
});

// Cleanup
window.addEventListener('beforeunload', function() {
    const animations = document.getAnimations();
    animations.forEach(animation => {
        animation.cancel();
    });
});

// Portfolio API
window.portfolioAPI = {
    showNotification,
    isValidEmail,
    validateInput,
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            showNotification(`Navigated to ${sectionId}`, 'success');
        }
    },
    updateResumeData: function() {
        showNotification('📄 Resume data updated successfully!', 'success');
    },
    version: '3.0.1'
};

// Skills Animation on Scroll
function animateSkillsOnScroll() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    }, index * 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Initialize skills animation
document.addEventListener('DOMContentLoaded', function() {
    animateSkillsOnScroll();
});

// Performance Optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollAnimations() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Update scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateScrollAnimations);
    
    // Lazy load images if any
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Professional Experience Data (for dynamic updates)
const professionalData = {
    currentRole: {
        title: "Software Engineer",
        company: "Banking & FinTech",
        experience: "1.5+ years",
        focus: "Post-trade platform development & electronic trading infrastructure"
    },
    skills: {
        programming: ["Python", "Java", "C++", "Kotlin"],
        databases: ["MySQL", "PostgreSQL", "Oracle RAC", "MongoDB", "ElasticSearch"],
        tools: ["Linux", "Shell Scripting", "REST APIs", "AWS", "Docker"],
        fintech: ["Electronic Trading Systems", "Risk Management", "Regulatory Compliance (RBI)"],
        ml: ["CNN", "GAN", "Deep Learning", "Image Processing", "OCR"],
        development: ["Android Studio", "Database Performance Tuning", "High Availability Systems"]
    },
    achievements: [
        "97% monitoring efficiency across 400+ financial applications",
        "2-5 minute RTO for automated disaster recovery systems",
        "Seamless migration of 200+ applications with zero downtime",
        "Best Paper Award - Image & Video Restoration System",
        "All India Rank 10 in IoT Machine Learning Contest",
        "3rd Position in Microsoft Power Apps Hackathon"
    ]
};

console.log('🚀 Anuj Dwivedi Portfolio v3.0.1 - Fixed external links and enhanced functionality!');
console.log('💼 Current Role:', professionalData.currentRole.title);
console.log('📊 Key Skills:', professionalData.skills.programming.join(', '));
console.log('🏆 Major Achievements:', professionalData.achievements.length, 'highlights loaded');
console.log('🔗 External links functionality fixed!');