document.addEventListener('DOMContentLoaded', () => {
   document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger');
    const navLinksDiv = document.getElementById('navLinks');

    if (hamburgerButton && navLinksDiv) {
        hamburgerButton.addEventListener('click', () => {
            // Toggle the 'is-active' class on the hamburger button
            hamburgerButton.classList.toggle('is-active');

            // Toggle the 'is-active' class on the nav-links div
            navLinksDiv.classList.toggle('is-active');

            // Update ARIA attribute for accessibility
            const isExpanded = hamburgerButton.classList.contains('is-active');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
        });

        // Optional: Close menu when a link inside it is clicked
        const navLinks = navLinksDiv.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerButton.classList.remove('is-active');
                navLinksDiv.classList.remove('is-active');
                hamburgerButton.setAttribute('aria-expanded', false);
            });
        });
    } else {
        console.warn('AmoraFloral: Hamburger button or nav-links element not found. Check your HTML.');
    }
});

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