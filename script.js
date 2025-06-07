document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            hamburger.classList.toggle('active');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        // Close the mobile menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close the mobile menu if clicked outside
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // --- Testimonial Carousel ---
    const testimonialWrapper = document.querySelector('.testimonial-cards-wrapper');
    const prevArrow = document.querySelector('.arrow-prev');
    const nextArrow = document.querySelector('.arrow-next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialIndicatorsContainer = document.querySelector('.testimonial-indicators');

    let currentIndex = 0;

    // Create indicators dynamically
    if (testimonialIndicatorsContainer && testimonialCards.length > 0) {
        testimonialCards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('testimonial-indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            testimonialIndicatorsContainer.appendChild(indicator);
        });
    }

    const updateCarousel = () => {
        if (testimonialWrapper) {
            const cardWidth = testimonialCards[0] ? testimonialCards[0].offsetWidth + 30 : 0; // card width + gap
            testimonialWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            // Update indicators
            const indicators = document.querySelectorAll('.testimonial-indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    };

    const goToSlide = (index) => {
        if (index >= 0 && index < testimonialCards.length) {
            currentIndex = index;
            updateCarousel();
        }
    };

    if (prevArrow && nextArrow && testimonialCards.length > 0) {
        prevArrow.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialCards.length - 1;
            updateCarousel();
        });

        nextArrow.addEventListener('click', () => {
            currentIndex = (currentIndex < testimonialCards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Initialize carousel position
        updateCarousel();
    }


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the fixed header height to offset the scroll position
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});