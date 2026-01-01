/**
 * LUCA FINALDI - Portfolio Script 2026
 * Focus: High Performance & ML Visuals
 */

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// --- 1. LOADING SCREEN & INITIALIZATION ---
window.addEventListener('load', () => {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        if (loadingProgress) loadingProgress.style.width = progress + '%';
        if (loadingPercentage) loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initAnimations();
                startTypewriterEffect();
            }, 600);
        }
    }, 120);
});

// --- 2. CORE ANIMATIONS (Intersection Observer) ---
function initAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Effetto "staggered" per le icone delle skill
                if (entry.target.classList.contains('stack-display')) {
                    animateSkills(entry.target);
                }
            }
        });
    }, observerOptions);

    // Seleziona gli elementi da animare
    const animatedElements = document.querySelectorAll('.skill-item, .stack-display, .portfolio-item, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(el);
    });
}

// Funzione specifica per rendere visibili gli elementi con transizione
document.addEventListener('scroll', () => {
    document.querySelectorAll('.visible').forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    });
});

// --- 3. TYPEWRITER EFFECT (Role Switcher) ---
function startTypewriterEffect() {
    const roleElement = document.querySelector('.hero-title .title-line:last-child');
    if (!roleElement) return;

    const roles = ["Web App Developer", "ML Explorer", "Open Source Contributor"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pausa alla fine della parola
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// --- 4. NAVIGATION & MOBILE MENU ---
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animazione icone hamburger (già gestita via CSS, ma rinforzata qui)
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars.forEach(bar => bar.style.transform = 'none');
        bars[1].style.opacity = '1';
    }
});

// Chiudi menu al click sui link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- 5. CONTACT FORM HANDLING (Simulated) ---
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Processing...</span>';
        submitBtn.style.opacity = '0.7';
        
        // Simulazione invio (es. verso Formspree o Backend)
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Inviato con Successo!</span>';
            submitBtn.style.background = 'var(--purple-accent)';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

// --- 6. CURSOR TRAIL (Solo Desktop) ---
if (window.innerWidth > 1024) {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ["#58a6ff", "#8957e5"];

    for (let i = 0; i < 15; i++) {
        const div = document.createElement("div");
        div.classList.add("cursor-trail");
        div.style.cssText = `
            height: 8px; width: 8px; border-radius: 50%;
            background: ${colors[i % 2]}; position: fixed;
            top: 0; left: 0; pointer-events: none; z-index: 9999;
        `;
        document.body.appendChild(div);
        circles.push(div);
    }

    window.addEventListener("mousemove", (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach((circle, index) => {
            circle.style.left = x - 4 + "px";
            circle.style.top = y - 4 + "px";
            circle.style.scale = (circles.length - index) / circles.length;
            
            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        requestAnimationFrame(animateCircles);
    }
    animateCircles();
}

// Navbar scroll logic
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
                
