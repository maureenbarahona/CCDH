// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeToggle();
    initScrollEffects();
    initScrollAnimations();

    console.log('CCDH Website Loaded - 2025 Ready');
});

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');

            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.setAttribute('data-theme', 'dark');
        updateToggleIcon(toggleBtn, true);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(toggleBtn, newTheme === 'dark');
        });
    }
}

function updateToggleIcon(btn, isDark) {
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Parallax for Hero Lines
        const lines = document.querySelectorAll('.line');
        lines.forEach((line, index) => {
            const speed = (index + 1) * 0.2;
            line.style.transform = `translateX(${scrolled * speed}px)`;
        });

        // Parallax for Hero Image
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage) {
            heroImage.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.1}px))`;
        }
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.content-section, .hero-meta');
    fadeElements.forEach(el => {
        el.style.opacity = '0'; // Set initial state here if not in CSS to avoid FOUC, but ideally CSS handles it
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}
