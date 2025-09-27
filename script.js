function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    if (menu && icon) {
        menu.classList.toggle("open");
        icon.classList.toggle("open");
    }
}

// Parallax Background Dots Effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion) {
        return;
    }
    
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
    
    // Handle parallax scrolling for background dots
    function handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3; // Slower than content (30% of scroll speed)
        
        // Apply parallax transform to background dots (negative for correct direction)
        document.body.style.setProperty('--parallax-offset', `${-scrolled * parallaxSpeed}px`);
    }
    
    // Add CSS custom property for parallax transform
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            transform: translateY(var(--parallax-offset, 0px));
            height: calc(100vh + 200vh);
            min-height: calc(100vh + 200vh);
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll listener for background parallax
    window.addEventListener('scroll', throttle(handleParallaxScroll, 16));
});

// Navigation Glassmorphism Scroll Responsiveness
window.addEventListener('scroll', function() {
    const desktopNav = document.querySelector('nav');
    const mobileNav = document.getElementById('hamburger-nav');
    const scrolled = window.pageYOffset;
    
    // Add scrolled class when user scrolls down
    if (scrolled > 50) {
        if (desktopNav) {
            desktopNav.classList.add('scrolled');
        }
        if (mobileNav) {
            mobileNav.classList.add('scrolled');
        }
    } else {
        if (desktopNav) {
            desktopNav.classList.remove('scrolled');
        }
        if (mobileNav) {
            mobileNav.classList.remove('scrolled');
        }
    }
});

// Cursor-following glow effect for profile and contact sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = ['profile', 'contact'];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        let lastMouseX = 50;
        let lastMouseY = 50;
        
        if (section) {
            section.addEventListener('mousemove', function(e) {
                const rect = section.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                // Store the last valid position
                lastMouseX = x;
                lastMouseY = y;
                
                section.style.setProperty('--mouse-x', x + '%');
                section.style.setProperty('--mouse-y', y + '%');
            });
            
            section.addEventListener('mouseleave', function() {
                // Keep the glow at the last cursor position instead of snapping to center
                section.style.setProperty('--mouse-x', lastMouseX + '%');
                section.style.setProperty('--mouse-y', lastMouseY + '%');
            });
        }
    });
});

// Delayed hover intent for project cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');
    const HOVER_DELAY_MS = 300; // 0.3s

    const state = new WeakMap();

    function activate(card) {
        card.classList.add('is-hover-intent');
        // Shrink other cards
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('is-shrunk');
            }
        });
    }

    function deactivate(card) {
        card.classList.remove('is-hover-intent');
        // Remove shrink from all cards
        cards.forEach(otherCard => {
            otherCard.classList.remove('is-shrunk');
        });
    }

    cards.forEach((card) => {
        state.set(card, { timer: null, active: false });

        card.addEventListener('mouseenter', () => {
            const s = state.get(card);
            if (s.timer) clearTimeout(s.timer);
            s.timer = setTimeout(() => {
                s.active = true;
                activate(card);
            }, HOVER_DELAY_MS);
        });

        card.addEventListener('mouseleave', () => {
            const s = state.get(card);
            if (s.timer) {
                clearTimeout(s.timer);
                s.timer = null;
            }
            if (s.active) {
                s.active = false;
                deactivate(card);
            }
        });

        // Cancel when clicking anywhere to remove overlay quickly
        card.addEventListener('click', () => {
            const s = state.get(card);
            if (s.timer) {
                clearTimeout(s.timer);
                s.timer = null;
            }
            if (s.active) {
                s.active = false;
                deactivate(card);
            }
        });
    });
});

// Skills Section Scroll Animation - Only for individual skill tags
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Skills section is now visible by default - no animation needed
});

// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

