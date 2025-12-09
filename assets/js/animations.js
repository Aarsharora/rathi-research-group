// Common Scroll Animation Script
(function() {
    'use strict';

    // Initialize animations when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
    });

    function initScrollAnimations() {
        // Animation observer options
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Create intersection observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.animate-on-scroll, .animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale'
        );

        animatedElements.forEach((element, index) => {
            // Add staggered delay for grid items
            if (element.parentElement && element.parentElement.classList.contains('grid-container')) {
                const gridItems = Array.from(element.parentElement.children);
                const itemIndex = gridItems.indexOf(element);
                element.style.transitionDelay = `${itemIndex * 0.1}s`;
            }
            observer.observe(element);
        });

        // Observe section titles with underline animation
        const titleElements = document.querySelectorAll('.animate-title-underline');
        titleElements.forEach(title => {
            observer.observe(title);
        });

        // Auto-apply animations to common elements
        autoApplyAnimations(observer);
    }

    function autoApplyAnimations(observer) {
        // Auto-animate sections
        const sections = document.querySelectorAll('section, .section, .main-container > div');
        sections.forEach((section, index) => {
            if (!section.classList.contains('animate-on-scroll')) {
                section.classList.add('animate-fade-up');
                if (index > 0) {
                    section.style.transitionDelay = `${index * 0.15}s`;
                }
                observer.observe(section);
            }
        });

        // Auto-animate cards and grid items
        const cards = document.querySelectorAll('.card, .grid-item, [class*="item"], [class*="card"]');
        cards.forEach((card, index) => {
            if (!card.classList.contains('animate-on-scroll') && 
                !card.classList.contains('animate-scale') &&
                card.closest('.grid-container, .grid, [class*="grid"]')) {
                card.classList.add('animate-scale');
                const parent = card.closest('.grid-container, .grid, [class*="grid"]');
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const itemIndex = siblings.indexOf(card);
                    card.style.transitionDelay = `${itemIndex * 0.1}s`;
                }
                observer.observe(card);
            }
        });

        // Auto-animate images in wrappers
        const imageWrappers = document.querySelectorAll('[class*="image"], [class*="img"]');
        imageWrappers.forEach((wrapper, index) => {
            if (wrapper.querySelector('img') && !wrapper.classList.contains('animate-on-scroll')) {
                wrapper.classList.add('animate-image-hover');
                if (index % 2 === 0) {
                    wrapper.classList.add('animate-fade-left');
                } else {
                    wrapper.classList.add('animate-fade-right');
                }
                observer.observe(wrapper);
            }
        });
    }
})();

