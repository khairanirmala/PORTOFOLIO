// =========================================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==================== PROJECT CAROUSEL ====================
    const track = document.querySelector(".project-track");
    const cards = document.querySelectorAll(".project-card");
    const nextButton = document.querySelector(".carousel-btn.next");
    const prevButton = document.querySelector(".carousel-btn.prev");

    let currentProject = 0;

    function updateCarousel() {
        if (!track || !cards.length) return;

        track.style.transform = `translateX(-${currentProject * 100}%)`;

        // Disable buttons at the first/last project.
        // Remove these two lines if you want infinite looping.
        prevButton.disabled = currentProject === 0;
        nextButton.disabled = currentProject === cards.length - 1;

        prevButton.style.opacity = currentProject === 0 ? "0.45" : "1";
        nextButton.style.opacity = currentProject === cards.length - 1 ? "0.45" : "1";
    }

    nextButton.addEventListener("click", () => {
        if (currentProject < cards.length - 1) {
            currentProject++;
            updateCarousel();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentProject > 0) {
            currentProject--;
            updateCarousel();
        }
    });

    updateCarousel();

    // ==================== NAVIGATION ACTIVE STATE ====================
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );
                    });
                }
            });
        },
        {
            root: null,
            threshold: 0.25
        }
    );

    sections.forEach((section) => observer.observe(section));

    // ==================== SMOOTH HEADER NAVIGATION ====================
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // ==================== FOOTER YEAR ====================
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
