// Scroll Progress Bar - Optimized
const scrollProgress = document.getElementById('scroll-progress');
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

// Global Image Error Handler for WebP fallback
document.addEventListener('error', function (e) {
    const target = e.target;
    if (target.tagName === 'IMG' && target.src.endsWith('.webp') && !target.dataset.fallbackAttempted) {
        target.dataset.fallbackAttempted = 'true';
        const fallbackSrc = target.src.replace('.webp', '.jpg');
        target.src = fallbackSrc;
        target.onerror = function () {
            if (this.src.endsWith('.jpg')) {
                this.src = this.src.replace('.jpg', '.png');
            } else {
                this.style.background = 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1))';
                this.alt = 'Image unavailable';
            }
        };
    }
}, true);

// Unified Scroll Handler (Progress Bar + Throttled Updates)
function updateScrollProgress() {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollProgress) {
        scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
    }
}

window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });

window.addEventListener('resize', () => {
    height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
}, { passive: true });

// --- Scroll Reveal Animation ---
if (window.utils && window.utils.createObserver) {
    window.utils.createObserver('.reveal', (target) => {
        target.classList.add('active');
    }, { rootMargin: "0px 0px -50px 0px" });
}

// --- Scroll Depth Effect ---
function initScrollDepthEffect() {
    const cards = document.querySelectorAll('.glass-card, .project-card, .skill-box');
    if (cards.length === 0) return;

    const depthObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            // Initialize class
            if (!el.classList.contains('scroll-depth')) {
                el.classList.add('scroll-depth');
            }

            const ratio = entry.intersectionRatio;
            if (entry.isIntersecting) {
                if (ratio > 0.6) {
                    el.classList.remove('scroll-depth-receding', 'scroll-depth-entering');
                    el.classList.add('scroll-depth-active');
                } else if (ratio > 0.2) {
                    el.classList.remove('scroll-depth-receding', 'scroll-depth-active');
                    el.classList.add('scroll-depth-entering');
                } else {
                    el.classList.remove('scroll-depth-active', 'scroll-depth-entering');
                    el.classList.add('scroll-depth-receding');
                }
            } else {
                el.classList.remove('scroll-depth-active', 'scroll-depth-entering');
                el.classList.add('scroll-depth-receding');
            }
        });
    }, {
        threshold: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
        rootMargin: '-5% 0px -5% 0px'
    });

    cards.forEach(card => {
        card.classList.add('scroll-depth', 'scroll-depth-receding');
        depthObserver.observe(card);
    });
}
document.addEventListener('DOMContentLoaded', initScrollDepthEffect);

// --- Typewriter Effect ---
// Optimization: Only run when visible
if (window.utils && window.utils.createObserver) {
    window.utils.createObserver('.typewriter', (target) => {
        startTypewriter(target);
    });
}

function startTypewriter(element) {
    const text = element.getAttribute('data-text') || element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    element.classList.add('typing');

    let i = 0;
    const speed = 30;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing');
        }
    }
    type();
}

document.querySelectorAll('.typewriter').forEach(el => {
    el.setAttribute('data-text', el.textContent);
    el.textContent = '';
    el.style.opacity = '0';
});

// --- Progress Bar Animation ---
if (window.utils && window.utils.createObserver) {
    window.utils.createObserver('.progress-fill', (target) => {
        const width = target.getAttribute('data-width');
        target.style.width = width;
    });
}

// --- Page Transition & Timeline Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-transition');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-visible');
        });
    });

    // Timeline Modal System
    initTimelineModal();

    // ISS / Satellite Animation (Mobile)
    initISSAnimation();
});

// Extracted Modal Logic
function initTimelineModal() {
    const modal = document.getElementById('timeline-modal');
    if (!modal) return;

    const els = {
        step: modal.querySelector('.modal-step'),
        title: modal.querySelector('.modal-title'),
        subtitle: modal.querySelector('.modal-subtitle'),
        date: modal.querySelector('.modal-date'),
        desc: modal.querySelector('.modal-description'),
        link: modal.querySelector('.modal-link'),
        close: modal.querySelector('.modal-close')
    };

    const milestoneData = {
        '10th Grade': {
            step: 'Step 1', subtitle: 'Infant Jesus Matriculation Higher Secondary School', date: '2018',
            description: 'Completed 10th grade with strong academic foundation in science and mathematics.', link: 'education.html'
        },
        '12th Grade': {
            step: 'Step 2', subtitle: 'Velammal Matriculation Higher Secondary School', date: '2020',
            description: 'Completed 12th grade with focus on Computer Science, ranking among top performers.', link: 'education.html'
        },
        'Volunteering': {
            step: 'Step 3', subtitle: 'NSS & Energy Club', date: '2020-22',
            description: 'Active volunteer organizing community events and promoting sustainable practices.', link: 'volunteering.html'
        },
        'Secretary': {
            step: 'Step 4', subtitle: 'ANDRIOS Club', date: '2021',
            description: 'Managed communications and coordinated technical workshops for Android development.', link: 'volunteering.html'
        },
        'B.Tech - AI': {
            step: 'Step 5', subtitle: 'Easwari Engineering College', date: '2020-24',
            description: 'B.Tech in AI & Data Science (8.68 CGPA). Developed expertise in ML and data analytics.', link: 'education.html'
        },
        'President': {
            step: 'Step 6', subtitle: 'ANDRIOS Club', date: '2021-22',
            description: 'Led ANDRIOS Club, organizing 10+ technical workshops and expanding membership.', link: 'volunteering.html'
        },
        'PRO': {
            step: 'Step 7', subtitle: 'Department Public Relations Officer', date: '2022-23',
            description: 'Managed department communications and media presence.', link: 'volunteering.html'
        },
        'Winner': {
            step: 'Step 8', subtitle: 'Paper Presentation - Resurgam', date: '2023',
            description: 'Won first place in Paper Presentation competition at Resurgam technical symposium.', link: 'achievements.html'
        },
        'Intern': {
            step: 'Various', subtitle: 'Multiple Organizations', date: '2023-24',
            description: 'Gained industry experience at NSIC, FSS, and Zigma Tech.', link: 'experience.html'
        },
        'Coordinator': {
            step: 'Step 10', subtitle: 'Google Developer Student Clubs', date: 'Jan 2024',
            description: 'Organized cloud and AI workshops as GDSC Coordinator.', link: 'volunteering.html'
        },
        'Top 100': {
            step: 'Step 12', subtitle: 'Naan Mudhalvan Competition', date: '2024',
            description: 'Top 100 teams in state-level competition for Smart Vegetation Management solution.', link: 'achievements.html'
        },
        'Data Scientist': {
            step: 'Step 14', subtitle: 'L&T Realty', date: 'Dec 2024',
            description: 'Developing voice bots and implementing process automation using ML.', link: 'experience.html'
        },
        'PGDM': {
            step: 'Step 15', subtitle: 'Great Lakes Institute of Management', date: '2025-27',
            description: 'Pursuing PGDM focused on bridging AI/ML with business strategy.', link: 'education.html'
        },
        'Certified': {
            step: 'Step 16', subtitle: 'Continuous Learning', date: 'Ongoing',
            description: 'Acquiring certifications in cloud technologies and data science.', link: 'achievements.html'
        },
        'Business Trainee': {
            step: 'Step 17', subtitle: 'Incorp Advisory Services (Tech Transformation)', date: 'Apr 2026 - Jun 2026',
            description: 'Evaluated AI automation, KYC/eSign, OCR APIs, and MS Copilot training partners.', link: 'experience.html'
        }
    };

    function openModal(title, link) {
        const data = milestoneData[title] || {
            step: 'Milestone', subtitle: '', date: '',
            description: 'Click "Learn more" to explore this milestone in detail.', link: link
        };

        if (els.step) els.step.textContent = data.step;
        if (els.title) els.title.textContent = title;
        if (els.subtitle) els.subtitle.textContent = data.subtitle;
        if (els.date) els.date.textContent = data.date;
        if (els.desc) els.desc.textContent = data.description;
        if (els.link) els.link.href = data.link || link;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        els.close?.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (els.close) els.close.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    document.querySelectorAll('.planet-node').forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const title = node.querySelector('h3')?.textContent || 'Milestone';
            const link = node.getAttribute('href') || '#';
            openModal(title, link);
        });
    });
}

// Extracted ISS Animation Logic
function initISSAnimation() {
    const roadmap = document.getElementById('roadmap');
    const iss = document.querySelector('.iss-container');
    const desktopPath = document.querySelector('.desktop-path #cosmic-path');

    if (!roadmap || !iss || !desktopPath) return;

    let animationFrameId;
    const duration = 30000;
    let startTime = null;

    function updatePosition(progress, path) {
        const pathLength = path.getTotalLength();
        const point = path.getPointAtLength(progress * pathLength);
        const svgWidth = 1000;
        const svgHeight = 2100;
        const container = roadmap.querySelector('.timeline-container');
        const containerWidth = 1000;
        const containerHeight = container.clientHeight;

        const x = (point.x / svgWidth) * containerWidth;
        const y = (point.y / svgHeight) * containerHeight;

        iss.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

        if (progress > 0.98 || progress < 0.02) {
            iss.style.opacity = '0';
            iss.style.transition = 'opacity 0.5s ease';
        } else {
            iss.style.opacity = '1';
        }
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;

        updatePosition(progress, desktopPath);
        animationFrameId = requestAnimationFrame(animate);
    }

    // Use utils.createObserver if available, else standard
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationFrameId) {
                    startTime = null;
                    animationFrameId = requestAnimationFrame(animate);
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.01 });

    observer.observe(roadmap);
}

// --- Vertical Timeline Logic (if present) ---
function initVerticalTimeline() {
    const timeline = document.querySelector('.v-timeline');
    if (!timeline) return;

    const beam = timeline.querySelector('.v-beam');
    const nodes = timeline.querySelectorAll('.v-node');

    if (window.utils && window.utils.createObserver) {
        window.utils.createObserver('.v-item.will-animate', (target) => {
            target.classList.add('in-view');
        }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
    }

    function updateScrollBeam() {
        if (!beam) return;
        const rect = timeline.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const center = viewportHeight / 2;
        let progress = 0;

        if (rect.top < center) {
            progress = center - rect.top;
        }

        const maxLimit = rect.height;
        if (progress > maxLimit) progress = maxLimit;
        if (progress < 0) progress = 0;

        beam.style.height = `${progress}px`;

        nodes.forEach((node) => {
            const item = node.closest('.v-item');
            if (!item) return;
            const itemRect = item.getBoundingClientRect();
            const itemTop = itemRect.top - rect.top;
            const itemCenter = itemTop + (itemRect.height / 2);

            if (progress >= itemCenter) {
                node.classList.add('active');
                item.classList.add('active');
            } else {
                node.classList.remove('active');
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => requestAnimationFrame(updateScrollBeam), { passive: true });
    window.addEventListener('resize', updateScrollBeam, { passive: true });
    updateScrollBeam();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVerticalTimeline);
} else {
    initVerticalTimeline();
}

// --- Left-Aligned Scroll Progress Timeline ---
function initLeftScrollTimeline() {
    const wrappers = document.querySelectorAll('.scroll-timeline-wrapper');
    if (wrappers.length === 0) return;

    // Icon mapping based on data-icon-type attribute
    const iconMap = {
        'university': 'fa-university',
        'college': 'fa-graduation-cap',
        'school': 'fa-school',
        'briefcase': 'fa-briefcase'
    };

    wrappers.forEach(wrapper => {
        const fill = wrapper.querySelector('.scroll-progress-fill');
        const track = wrapper.querySelector('.scroll-progress-track');
        const cards = wrapper.querySelectorAll('[data-timeline-node]');

        if (!fill || cards.length === 0) return;

        // Create node markers and connectors dynamically
        const nodes = [];
        cards.forEach((card, index) => {
            // Get icon type from data attribute
            const iconType = card.getAttribute('data-icon-type') || 'briefcase';
            const iconClass = iconMap[iconType] || 'fa-circle';

            // Create icon node
            const node = document.createElement('div');
            node.className = 'scroll-timeline-node';
            node.setAttribute('data-node-index', index);
            node.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
            wrapper.appendChild(node);

            // Create horizontal connector
            const connector = document.createElement('div');
            connector.className = 'timeline-connector';
            connector.setAttribute('data-connector-index', index);
            wrapper.appendChild(connector);

            nodes.push({ element: node, connector: connector, card: card });
        });

        function updateScrollProgress() {
            const wrapperRect = wrapper.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollTrigger = viewportHeight * 0.4; // 40% down viewport

            // Calculate progress (0 to 1) based on wrapper position
            let progress = 0;
            if (wrapperRect.top < scrollTrigger) {
                progress = scrollTrigger - wrapperRect.top;
            }

            // Get the last card's center position for max progress
            const lastCard = cards[cards.length - 1];
            const lastCardRect = lastCard.getBoundingClientRect();
            const lastCardCenter = lastCardRect.top + (lastCardRect.height / 2) - wrapperRect.top;

            // FIX 3: Cap progress STRICTLY at last card center (glow stops at last icon, not beyond)
            // The glow should never exceed the last icon position
            const maxProgress = lastCardCenter;
            progress = Math.min(Math.max(progress, 0), maxProgress);

            // Update fill height (starts at 0, grows only as user scrolls)
            fill.style.height = `${progress}px`;

            // Set track height to reach last node (background track only)
            if (track) {
                track.style.height = `${lastCardCenter + 10}px`;
            }

            // Update node positions, connectors, and active states
            nodes.forEach(({ element, connector, card }) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.top + (cardRect.height / 2) - wrapperRect.top;

                // Position node at card center
                element.style.top = `${cardCenter}px`;

                // Position connector at same vertical position as node
                connector.style.top = `${cardCenter}px`;

                // Activate node and connector when fill reaches it
                if (progress >= cardCenter) {
                    element.classList.add('active');
                    connector.classList.add('active');
                    card.classList.add('timeline-active');
                } else {
                    element.classList.remove('active');
                    connector.classList.remove('active');
                    card.classList.remove('timeline-active');
                }
            });
        }

        // Initial positioning
        updateScrollProgress();

        // Scroll and resize listeners
        window.addEventListener('scroll', () => requestAnimationFrame(updateScrollProgress), { passive: true });
        window.addEventListener('resize', updateScrollProgress, { passive: true });
    });
}

// Initialize left scroll timeline
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeftScrollTimeline);
} else {
    initLeftScrollTimeline();
}
