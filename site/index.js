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
const sections = document.querySelectorAll('section[id]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    const warning = document.getElementById('motion-warning');
    warning.innerText = 'Animations and transitions are disabled due to your system’s reduced motion preference.';
    warning.style.display = 'block';
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

            // Clear auto-scroll after a short delay
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
    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
        }
    });

    if (closestSection) {
        const current = closestSection.id;

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Update scroll-related elements (nav visibility, progress bar, active section)
function updateScrollElements() {
    const scrollY = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1);

    // Hero fade effect and show/hide nav and progress
    if (scrollY < heroHeight * 0.3) {
        nav.classList.remove('visible');
        progressBar.classList.remove('visible');
    } else {
        nav.classList.add('visible');
        progressBar.classList.add('visible');

        // Reading progress bar
        const pageTop = heroHeight;
        const pageScrollY = Math.max(0, scrollY - pageTop);
        const pageHeight = page.offsetHeight - window.innerHeight;
        const readingProgress = Math.min(Math.max((pageScrollY / pageHeight) * 100, 0), 100);

        progressBar.style.width = readingProgress + '%';
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
        const navHeight = nav.offsetHeight || 60;

        let targetOffset = 0;

        if (target && targetId !== 'hero') {
            targetOffset = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        }

        // Set the flag to prevent active section updates
        isAutoScrolling = true;

        // Clear any previous timeout just in case
        if (autoScrollTimeout) clearTimeout(autoScrollTimeout);

        // Manual update of nav active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Start scroll
        window.scrollTo({
            top: targetOffset,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Fallback timeout: in case scrollend isn't supported
        autoScrollTimeout = setTimeout(() => {
            isAutoScrolling = false;
        }, 1200); // a bit longer than expected scroll
    });
});

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

// Initialise
updateScrollElements();
