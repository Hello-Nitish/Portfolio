/**
 * Parallax Scrolling Effect
 * Moves background layers at different speeds to create depth.
 * optimization: Uses requestAnimationFrame for smoother performance.
 */

document.addEventListener('DOMContentLoaded', () => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            // Negative value moves it up as we scroll down (standard parallax)
            const yPos = -(scrollY * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
});
