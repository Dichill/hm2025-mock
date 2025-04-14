// ScrollReveal implementation for HackMESA website

export function initScrollReveal() {
    if (typeof window !== "undefined") {
        // Check if we're in a browser environment
        const revealElements = document.querySelectorAll(".reveal");

        // Function to check if an element is in viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <=
                    (window.innerHeight ||
                        document.documentElement.clientHeight) *
                        0.85 && rect.bottom >= 0
            );
        };

        // Function to reveal elements that are in viewport
        const revealOnScroll = () => {
            revealElements.forEach((element) => {
                if (isInViewport(element)) {
                    element.classList.add("active");
                }
            });
        };

        // Initial check on load
        revealOnScroll();

        // Attach scroll event listener
        window.addEventListener("scroll", revealOnScroll);

        // Clean up function (for React useEffect)
        return () => {
            window.removeEventListener("scroll", revealOnScroll);
        };
    }

    // Return empty function if not in browser
    return () => {};
}

// Function to add reveal classes to elements
export function addRevealClasses() {
    if (typeof window !== "undefined") {
        // Add reveal classes to sections
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section, index) => {
            section.classList.add("reveal");

            // Alternate the reveal direction for visual interest
            if (index % 2 === 0) {
                section.classList.add("reveal-from-left");
            } else {
                section.classList.add("reveal-from-right");
            }
        });

        // Add reveal classes to specific elements
        const headings = document.querySelectorAll("h1, h2, h3");
        headings.forEach((heading) => {
            heading.classList.add("reveal", "reveal-from-bottom");
        });

        const cards = document.querySelectorAll(
            ".bg-opacity-80.backdrop-blur-sm"
        );
        cards.forEach((card, index) => {
            card.classList.add("reveal");

            // Alternate the reveal direction
            if (index % 2 === 0) {
                card.classList.add("reveal-from-bottom");
            } else {
                card.classList.add("reveal-from-right");
            }
        });
    }
}
