/**
 * DRA. MÓNICA SÁNCHEZ - MEDICINA ESTÉTICA
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==================== Header Scroll Effect ====================
    const header = document.getElementById('header');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==================== Mobile Navigation ====================
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const body = document.body;

    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') &&
                !nav.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('nav-open');
            }
        });
    }

    // ==================== Smooth Scroll ====================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== Dropdown Navigation (Desktop) ====================
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');

        // For touch devices
        if ('ontouchstart' in window) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth > 1024) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // ==================== Form Validation ====================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }

            // Phone validation
            const phoneField = contactForm.querySelector('#telefono');
            if (phoneField && phoneField.value) {
                const phoneRegex = /^[0-9+\s()-]{9,}$/;
                if (!phoneRegex.test(phoneField.value)) {
                    isValid = false;
                    phoneField.classList.add('error');
                }
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px;">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c9a86c" stroke-width="2" style="margin-bottom: 20px;">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <h3 style="margin-bottom: 10px;">¡Mensaje enviado!</h3>
                            <p style="color: #707070;">Gracias por contactar. Te responderé lo antes posible.</p>
                        </div>
                    `;
                }, 1500);
            }
        });

        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }

    // ==================== Intersection Observer for Animations ====================
    const animatedElements = document.querySelectorAll('.treatment-card, .feature, .treatment-list-card');

    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .nav-open {
            overflow: hidden;
        }

        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #e74c3c;
        }
    `;
    document.head.appendChild(style);

    // ==================== Lazy Loading Images ====================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==================== Current Year in Footer ====================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // ==================== Cookie Banner ====================
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (cookieBanner && !cookieConsent) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('active');
        }, 1000);
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('active');
            // Here you would initialize analytics, etc.
            initializeCookies();
        });
    }

    if (rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            cookieBanner.classList.remove('active');
        });
    }

    // Function to initialize cookies/analytics when accepted
    function initializeCookies() {
        // Google Analytics or other tracking would go here
        // Example:
        // gtag('consent', 'update', { analytics_storage: 'granted' });
        console.log('Cookies aceptadas');
    }

    // If cookies were previously accepted, initialize them
    if (cookieConsent === 'accepted') {
        initializeCookies();
    }

    // ==================== Scroll to Top Button (Optional) ====================
    // Uncomment if you want to add a scroll to top button
    /*
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    */

});

// ==================== Console Message ====================
console.log('%c Dra. Mónica Sánchez - Medicina Estética ',
    'background: #0a0a0a; color: #c9a86c; padding: 10px 20px; font-size: 14px;');
console.log('%c Cuidar tu piel sin perder tu esencia ',
    'color: #707070; font-style: italic;');
