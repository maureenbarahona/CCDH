// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {

    console.log('CCDH Website Loaded');

    // Scroll Effects (Simple Parallax)
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

    // Intersection Observer for Fade-In Effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.content-section, .hero-meta');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
