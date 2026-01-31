/**
 * Shared Utility Functions
 * Consolidating common logic for performance and maintainability.
 */

/**
 * Creates an IntersectionObserver to trigger animations or callbacks when elements enter the viewport.
 * @param {string} selector - CSS selector for elements to observe.
 * @param {Function} callback - Function to run when an element intersects. 
 *                              Receives the target element as an argument.
 * @param {Object} options - IntersectionObserver options (root, rootMargin, threshold).
 * @param {boolean} unobserve - Whether to unobserve the element after the first trigger (default: true).
 */
function createObserver(selector, callback, options = {}, unobserve = true) {
    const defaultOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const finalOptions = { ...defaultOptions, ...options };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (unobserve) {
                    obs.unobserve(entry.target);
                }
            }
        });
    }, finalOptions);

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return observer;
}

/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions to global scope (since we aren't using modules yet)
window.utils = {
    createObserver,
    debounce
};
