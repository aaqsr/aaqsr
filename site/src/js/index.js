let isAutoScrolling = false;
let autoScrollTimeout;

let ticking = false;
let lastScrollY = 0;

const hero = document.querySelector('.hero');
const page = document.querySelector('.page');
const nav = document.querySelector('.nav');
const progressBar = document.querySelector('.reading-progress');
const heroContent = document.querySelector('.hero-content');
const navLinks = document.querySelectorAll('.nav-link');

// Get all h2 elements with IDs (these are your section headers)
const sections = document.querySelectorAll('h2[id]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    const warning = document.getElementById('motion-warning');
    if (warning) {
        warning.innerText = 'Animations and transitions are disabled due to your system\'s reduced motion preference.';
        warning.style.display = 'block';
    }
}

// Scroll arrow behaviour
const scrollArrow = document.querySelector('.scroll-indicator');

if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const navHeight = nav.offsetHeight || 60;
        const nextSection = document.querySelector('main .section');

        if (nextSection) {
            isAutoScrolling = true;

            const targetOffset = nextSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetOffset,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });

            clearTimeout(autoScrollTimeout);
            autoScrollTimeout = setTimeout(() => {
                isAutoScrolling = false;
            }, 1000);
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveSection() {
    const scrollY = window.scrollY;
    const navHeight = nav ? nav.offsetHeight : 60;
    
    // Use a smaller offset - when section header is near top of screen, highlight it
    const triggerOffset = navHeight + 150;
    
    let currentSection = null;

    // Iterate through all sections and find which one we're currently in
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const absoluteTop = scrollY + rect.top;
        
        // If we've scrolled past this section's top (with offset), it becomes current
        if (scrollY >= absoluteTop - triggerOffset) {
            currentSection = section;
        }
    });

    // Update nav links
    if (currentSection) {
        const currentId = currentSection.id;

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Update scroll-related elements (nav visibility, progress bar, active section)
function updateScrollElements() {
    const scrollY = window.pageYOffset;
    const heroHeight = hero ? hero.offsetHeight : 0;

    // Hero fade effect and show/hide nav and progress
    if (scrollY < heroHeight * 0.3) {
        // if (nav) nav.classList.remove('visible');
        if (progressBar) progressBar.classList.remove('visible');
    } else {
        // if (nav) nav.classList.add('visible');
        if (progressBar) progressBar.classList.add('visible');

        // Reading progress bar
        const pages = document.querySelectorAll('.page');
        let totalPageHeight = 0;
        let pageTop = heroHeight;

        pages.forEach(page => {
            totalPageHeight += page.offsetHeight;
        });

        const scrollableHeight = totalPageHeight - window.innerHeight;
        const pageScrollY = Math.max(0, scrollY - pageTop);
        const readingProgress = Math.min(Math.max((pageScrollY / scrollableHeight) * 100, 0), 100);
        if (progressBar) progressBar.style.width = readingProgress + '%';
    }

    if (!isAutoScrolling) {
        updateActiveSection();
    }

    lastScrollY = scrollY;
    ticking = false;
}

// Scroll throttling
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
}

// Smooth scroll navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        const navHeight = nav ? nav.offsetHeight : 60;

        let targetOffset = 0;

        if (target && targetId !== 'hero') {
            targetOffset = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        }

        isAutoScrolling = true;

        if (autoScrollTimeout) clearTimeout(autoScrollTimeout);

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        window.scrollTo({
            top: targetOffset,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        autoScrollTimeout = setTimeout(() => {
            isAutoScrolling = false;
        }, 1200);
    });
});

// User interaction cancels auto-scroll
['wheel', 'touchstart', 'keydown'].forEach(event => {
    window.addEventListener(event, () => {
        if (isAutoScrolling) {
            isAutoScrolling = false;
            clearTimeout(autoScrollTimeout);
        }
    }, { passive: true });
});

if ('onscrollend' in window) {
    window.addEventListener('scrollend', () => {
        isAutoScrolling = false;
    });
}

// Scroll listener
window.addEventListener('scroll', () => {
    requestTick();
}, { passive: true });

// Handle resize events
window.addEventListener('resize', () => {
    setTimeout(() => {
        updateScrollElements();
    }, 100);
}, { passive: true });

// Initialize on load
updateScrollElements();
