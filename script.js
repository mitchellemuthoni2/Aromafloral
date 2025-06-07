document.addEventListener("DOMContentLoaded", function () {
    // SECTION HIGHLIGHT ON SCROLL
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    function onScroll() {
        let scrollPos = window.scrollY + 90; // 90px offset for header

        sections.forEach((section) => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + section.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // Run on page load

    // CONTACT FORM RESPONSE (Consolidated logic for contactForm and sendMessageForm)
    const contactForm = document.getElementById("contactForm"); // Assuming this is your main contact form ID
    const sendMessageForm = document.getElementById("sendMessageForm"); // If you have a separate form with this ID
    const responseDiv = document.getElementById("send-message-response"); // Common response div

    const handleFormSubmit = function (e) {
        e.preventDefault();
        if (responseDiv) {
            responseDiv.textContent =
                "Thank you for reaching out! We'll get back to you soon.";
            responseDiv.style.display = "block";
            this.reset(); // 'this' refers to the form that was submitted
            setTimeout(() => {
                responseDiv.style.display = "none";
            }, 4000);
        }
    };

    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }
    if (sendMessageForm) { // If it's the same form, this is redundant. If separate, keep.
        sendMessageForm.addEventListener("submit", handleFormSubmit);
    }


    // FAQ DATA AND ACCORDION FUNCTIONALITY
    const faqs = [
        {
            question: "How do I plan a road trip through your website?",
            answer: "You can plan a road trip by Browse our routes or tour packages, selecting your preferred options, and following our planning guides. Our team is also available to assist you.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards (Visa, MasterCard, American Express) and PayPal for online bookings. Bank transfers can be arranged for larger group bookings upon request.",
        },
        {
            question: "Can I customize my road trip package?",
            answer: "Absolutely! Many of our packages are customizable. Contact our road trip advisors to discuss your specific needs and create a tailor-made itinerary just for you.",
        },
        {
            question: "Do you offer road trip insurance or roadside assistance?",
            answer: "While we don't directly provide insurance, we can recommend partners for roadside assistance and trip interruption coverage to ensure you're covered during your journey.",
        },
        {
            question: "What happens if I need to cancel or change my booking?",
            answer: "Our cancellation and change policies vary by package and service provider. Please refer to your booking confirmation for details, or contact our customer support for assistance.",
        },
        {
            question: "How do I contact customer support?",
            answer: "You can contact customer support via email at roadtrip@fikabest.com, by phone at +1 800-555-TRAVEL, or by using the contact form on our website. We aim to respond within 24 hours.",
        },
    ];

    // Dynamically populate FAQ section
    const faqList = document.querySelector(".faq-list");
    if (faqList) {
        faqList.innerHTML = ""; // Clear existing content if any
        faqs.forEach((faq) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <button class="faq-question" aria-expanded="false">
                    <strong>${faq.question}</strong>
                    <span class="faq-toggle">+</span>
                </button>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            `;
            faqList.appendChild(li);
        });

        // Attach click listeners AFTER FAQ is populated
        document.querySelectorAll(".faq-question").forEach((btn) => {
            btn.addEventListener("click", function () {
                const expanded = this.getAttribute("aria-expanded") === "true";
                // Close all
                document.querySelectorAll(".faq-question").forEach((b) => {
                    b.setAttribute("aria-expanded", "false");
                    b.nextElementSibling.style.maxHeight = "0"; // Use max-height for smooth collapse
                    b.nextElementSibling.style.padding = "0 25px 0 25px"; // Reset padding
                });

                // Open this one if it was not already open
                if (!expanded) {
                    this.setAttribute("aria-expanded", "true");
                    const answerDiv = this.nextElementSibling;
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px"; // Set actual height
                    answerDiv.style.padding = "0 25px 20px 25px"; // Restore padding
                }
            });
        });
    }

    // --- TESTIMONIAL SLIDER FUNCTIONALITY (Simplified and Consolidated) ---
    // Target the main container for the scroll, and its child elements for cards
    const testimonialContainer = document.querySelector(".testimonials-right");
    const testimonialLeftArrow = document.querySelector(".testimonial-arrow.left");
    const testimonialRightArrow = document.querySelector(".testimonial-arrow.right");

    if (testimonialContainer && testimonialLeftArrow && testimonialRightArrow) {
        // Calculate scroll amount based on container width or card width + gap
        const scrollAmount = testimonialContainer.offsetWidth; // Scroll by full container width
        // You could also calculate based on a single card: cards[0].offsetWidth + 20 (for gap)

        testimonialLeftArrow.addEventListener("click", () => {
            testimonialContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        testimonialRightArrow.addEventListener("click", () => {
            testimonialContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    }

    // --- HAMBURGER MENU TOGGLE (Corrected and Simplified) ---
    const hamburger = document.querySelector(".hamburger"); // Select by class
    const mobileMenu = document.querySelector(".mobile-menu"); // Select by class

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("is-active"); // Use 'is-active' from your CSS
            mobileMenu.classList.toggle("is-active"); // Use 'is-active' from your CSS

            // Optional: Add/remove aria-expanded for accessibility
            const isExpanded = this.classList.contains("is-active");
            this.setAttribute("aria-expanded", isExpanded);

            // Optional: Close menu when a link inside it is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('is-active');
                    mobileMenu.classList.remove('is-active');
                    hamburger.setAttribute("aria-expanded", false);
                }, { once: true }); // Use { once: true } to prevent multiple listeners
            });
        });

        // Close mobile menu when clicking outside (on the overlay or body)
        // This is a common pattern, but requires the mobile-menu to take up full screen
        // or for there to be an overlay. If not, clicking anywhere on the page closes it.
        document.body.addEventListener('click', function(event) {
            // Check if the click was outside both the hamburger and the mobile menu
            if (
                mobileMenu.classList.contains('is-active') &&
                !hamburger.contains(event.target) &&
                !mobileMenu.contains(event.target)
            ) {
                hamburger.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
                hamburger.setAttribute("aria-expanded", false);
            }
        });

    }
});