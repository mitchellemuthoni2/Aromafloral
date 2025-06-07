 document.addEventListener('DOMContentLoaded', function() {
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dots = document.querySelectorAll('.indicator-dot');
            let currentPage = 0;
            
            // Function to update active dot
            function updateActiveDot() {
                dots.forEach((dot, index) => {
                    if (index === currentPage) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Navigation button event listeners
            prevBtn.addEventListener('click', function() {
                currentPage = (currentPage > 0) ? currentPage - 1 : dots.length - 1;
                updateActiveDot();
            });
            
            nextBtn.addEventListener('click', function() {
                currentPage = (currentPage < dots.length - 1) ? currentPage + 1 : 0;
                updateActiveDot();
            });
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentPage = index;
                    updateActiveDot();
                });
            });
        });

        
  const wrapper = document.querySelector(".testimonial-cards-wrapper");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".arrow-prev");
  const nextBtn = document.querySelector(".arrow-next");

  let currentIndex = 0;

  function updateSlider() {
    const offset = -100 * currentIndex;
    wrapper.style.transform = `translateX(${offset}%)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  });

