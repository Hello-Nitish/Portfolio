/**
 * Interactive Particle Background - Optimized
 * Creates a constellation effect with performance optimizations.
 */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d', { alpha: false });

let particlesArray = [];
let animationId = null;
let isVisible = true;

// Mouse Interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
};

// Throttled mouse move
let mouseThrottle = false;
window.addEventListener('mousemove', (event) => {
    if (!mouseThrottle) {
        mouse.x = event.x;
        mouse.y = event.y;
        mouseThrottle = true;
        setTimeout(() => { mouseThrottle = false; }, 16);
    }
}, { passive: true });

// Handle visibility change - pause animation when tab is hidden
document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animationId) {
        animate();
    }
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }, 250);
}, { passive: true });

// Particle Class - Simplified
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directionX = (Math.random() * 0.2) - 0.1;
        this.directionY = (Math.random() * 0.2) - 0.1;
        this.size = (Math.random() * 1.5) + 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
    }

    update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse interaction - simplified calculation
        if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = mouse.radius * mouse.radius;

            if (distSq < radiusSq) {
                const force = 0.3;
                if (dx > 0 && this.x > this.size * 10) this.x -= force;
                if (dx < 0 && this.x < canvas.width - this.size * 10) this.x += force;
                if (dy > 0 && this.y > this.size * 10) this.y -= force;
                if (dy < 0 && this.y < canvas.height - this.size * 10) this.y += force;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize particles with responsive count
function init() {
    particlesArray = [];
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Responsive particle count - fewer on mobile for performance
    const isMobile = canvas.width < 768;
    const divisor = isMobile ? 25000 : 10000;
    const maxParticles = isMobile ? 50 : 100;

    let numberOfParticles = Math.min(
        (canvas.height * canvas.width) / divisor,
        maxParticles
    );

    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

// Connect particles - optimized with distance check
function connect() {
    const maxDistance = canvas.width < 768 ? 100 : 150;
    const maxDistanceSq = maxDistance * maxDistance;
    const len = particlesArray.length;

    for (let a = 0; a < len; a++) {
        for (let b = a + 1; b < len; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistanceSq) {
                const opacity = (1 - distSq / maxDistanceSq) * 0.1;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop - optimized
function animate() {
    if (!isVisible) {
        animationId = null;
        return;
    }

    animationId = requestAnimationFrame(animate);

    // Fill with background color instead of clear for better performance
    ctx.fillStyle = '#02040a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    // Only connect if reasonable particle count
    if (particlesArray.length <= 100) {
        connect();
    }
}

// Start
init();
animate();
