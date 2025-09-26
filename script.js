function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Profile Section Parallax Scroll Animation with Performance Optimization
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const profileSection = document.getElementById('profile');
    
    if (profileSection) {
        const rect = profileSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only animate when profile section is in view
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
            // Different parallax speeds for different elements
            const profileSpeed = 0.7; // Main section speed
            const imageSpeed = 0.5; // Image moves slower
            const textSpeed = 1.1; // Text moves faster
            
            // Calculate relative scroll position within the section
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const relativeScroll = Math.max(0, -sectionTop);
            const scrollProgress = Math.min(relativeScroll / sectionHeight, 1);
            
            // Apply parallax transforms
            const profileY = -(scrolled * profileSpeed);
            const imageY = -(scrolled * imageSpeed);
            const textY = -(scrolled * textSpeed);
            
            // Apply transforms with hardware acceleration
            profileSection.style.transform = `translateY(${profileY}px) translateZ(0)`;
            
            // Apply different speeds to child elements
            const imageContainer = profileSection.querySelector('.section_pic-container');
            const textContainer = profileSection.querySelector('.section_text');
            
            if (imageContainer) {
                imageContainer.style.transform = `translateY(${imageY}px) translateZ(0)`;
            }
            
            if (textContainer) {
                textContainer.style.transform = `translateY(${textY}px) translateZ(0)`;
            }
        }
    }
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Use optimized scroll listener
window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

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

// Cursor-following glow effect for profile section
document.addEventListener('DOMContentLoaded', function() {
    const profileSection = document.getElementById('profile');
    let lastMouseX = 50;
    let lastMouseY = 50;
    
    if (profileSection) {
        profileSection.addEventListener('mousemove', function(e) {
            const rect = profileSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Store the last valid position
            lastMouseX = x;
            lastMouseY = y;
            
            profileSection.style.setProperty('--mouse-x', x + '%');
            profileSection.style.setProperty('--mouse-y', y + '%');
        });
        
        profileSection.addEventListener('mouseleave', function() {
            // Keep the glow at the last cursor position instead of snapping to center
            profileSection.style.setProperty('--mouse-x', lastMouseX + '%');
            profileSection.style.setProperty('--mouse-y', lastMouseY + '%');
        });
    }
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

// Projects section layered parallax effect
document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.getElementById('projects');
    const projectsTitle = projectsSection.querySelector('.title');
    const projectsSubtitle = projectsSection.querySelector('.section_text_p1');
    const projectsGroup = projectsSection.querySelector('.projects-group');
    const projectsContainer = projectsSection.querySelector('.projects-container');
    
    if (projectsSection && projectsTitle && projectsSubtitle && projectsGroup && projectsContainer) {
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const sectionRect = projectsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Only animate when projects section is in view
            if (sectionRect.bottom >= 0 && sectionRect.top <= windowHeight) {
                // Title and subtitle move faster (1.2x speed)
                const titleSpeed = 1.2;
                const titleY = -(scrolled * titleSpeed);
                
                // Project cards move slower (0.6x speed)
                const cardsSpeed = 1.1;
                const cardsY = -(scrolled * cardsSpeed);
                
                // Apply different parallax speeds to different elements
                projectsTitle.style.transform = `translateY(${titleY}px) translateZ(0)`;
                projectsSubtitle.style.transform = `translateY(${titleY}px) translateZ(0)`;
                projectsContainer.style.transform = `translateY(${cardsY}px) translateZ(0)`;
                
                // Enable hardware acceleration
                projectsTitle.style.willChange = 'transform';
                projectsSubtitle.style.willChange = 'transform';
                projectsContainer.style.willChange = 'transform';
            }
        }
        
        // Use optimized scroll listener
        window.addEventListener('scroll', updateParallax, { passive: true });
        
        // Initial call
        updateParallax();
    }
});

