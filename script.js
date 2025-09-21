// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioBtn = document.getElementById('portfolioBtn');
const contactBtn = document.getElementById('contactBtn');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Loading Screen Animation
window.addEventListener('load', () => {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initAnimations();
            }, 500);
        }
    }, 100);
});

// Initialize Animations
function initAnimations() {
    // Animate elements on scroll - Optimized for all devices
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters
                if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .stat-number, .skill-item, .service-card, .portfolio-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add staggered animation delays
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;
    });
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Parallax effect for hero elements - Optimized for mobile
    if (window.innerWidth > 768) {
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrollY * 0.05}deg)`;
        });
    }
    
    // Smooth scroll animations for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            
            // Apply subtle transform based on scroll progress
            if (window.innerWidth > 768) {
                section.style.transform = `translateY(${(1 - scrollProgress) * 20}px)`;
                section.style.opacity = Math.max(0.3, scrollProgress);
            }
        }
    });
});

// Optimized scroll handling for mobile devices
let ticking = false;

function updateScrollAnimations() {
    // Your scroll animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
}, { passive: true });

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Button Actions
portfolioBtn.addEventListener('click', () => {
    const portfolioSection = document.querySelector('#portfolio');
    const offsetTop = portfolioSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

contactBtn.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    const offsetTop = contactSection.offsetTop - 70;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Portfolio Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Invio in corso...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Messaggio Inviato!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
            
            // Show success message
            showNotification('Messaggio inviato con successo!', 'success');
        }, 2000);
    }, 1500);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Background
// Moved to main scroll handler for better performance

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn, .portfolio-link, .social-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        // Only apply magnetic effect on desktop
        if (window.innerWidth > 768) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
        }
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.service-card, .portfolio-item, .skill-item').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after loading
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                const text = line.textContent;
                typeWriter(line, text, 50);
            }, index * 800);
        });
    }
}, 3500);

// Add glitch effect to logo on hover
document.querySelector('.nav-logo').addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
});

document.querySelector('.nav-logo').addEventListener('animationend', function() {
    this.style.animation = '';
});

// Add CSS for glitch effect
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Cursor Trail Effect
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

// Create trail elements
for (let i = 0; i < 10; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #7209b7, #533483);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - i * 0.1};
        transform: scale(${1 - i * 0.1});
    `;
    document.body.appendChild(trail);
    trailElements.push({
        element: trail,
        x: 0,
        y: 0
    });
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate trail
function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    trailElements.forEach((trail, index) => {
        trail.x += (x - trail.x) * 0.3;
        trail.y += (y - trail.y) * 0.3;
        
        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
        
        x = trail.x;
        y = trail.y;
    });
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Disable cursor trail on mobile for better performance
if (window.innerWidth <= 768) {
    trailElements.forEach(trail => {
        trail.element.style.display = 'none';
    });
}

// Responsive adjustments on window resize
window.addEventListener('resize', () => {
    // Update cursor trail visibility
    if (window.innerWidth <= 768) {
        trailElements.forEach(trail => {
            trail.element.style.display = 'none';
        });
    } else {
        trailElements.forEach(trail => {
            trail.element.style.display = 'block';
        });
    }
    
    // Reset transforms on resize
    document.querySelectorAll('section').forEach(section => {
        section.style.transform = '';
        section.style.opacity = '';
    });
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    smoothScrollPolyfill();
}
