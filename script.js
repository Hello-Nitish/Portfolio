// Scroll Progress Bar - Optimized
const scrollProgress = document.getElementById('scroll-progress');
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let ticking = false;

// Use passive listener for better scroll performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Update height on resize
window.addEventListener('resize', () => {
    height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
}, { passive: true });

// Scroll Reveal Animation via Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Typewriter Effect - Optimized
const typeWriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypewriter(entry.target);
            typeWriterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

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
    typeWriterObserver.observe(el);
});

// Progress Bar Animation
const progressBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            progressBarObserver.unobserve(bar);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.progress-fill').forEach(bar => {
    progressBarObserver.observe(bar);
});

// Page Transition Logic - Optimized
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-transition');
    // Use requestAnimationFrame for smoother initial fade
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-visible');
        });
    });

    // Timeline Modal System
    const modal = document.getElementById('timeline-modal');
    const modalStep = modal?.querySelector('.modal-step');
    const modalTitle = modal?.querySelector('.modal-title');
    const modalSubtitle = modal?.querySelector('.modal-subtitle');
    const modalDate = modal?.querySelector('.modal-date');
    const modalDescription = modal?.querySelector('.modal-description');
    const modalLink = modal?.querySelector('.modal-link');
    const modalClose = modal?.querySelector('.modal-close');

    // Timeline milestone data
    const milestoneData = {
        '10th Grade': {
            step: 'Step 1',
            subtitle: 'Infant Jesus Matriculation Higher Secondary School',
            date: '2018',
            description: 'Completed 10th grade with strong academic foundation in science and mathematics, developing early interests in technology and problem-solving.',
            link: 'education.html'
        },
        '12th Grade': {
            step: 'Step 2',
            subtitle: 'Velammal Matriculation Higher Secondary School',
            date: '2020',
            description: 'Completed 12th grade with focus on Computer Science, ranking among top performers and laying groundwork for engineering education.',
            link: 'education.html'
        },
        'Volunteering': {
            step: 'Step 3',
            subtitle: 'NSS & Energy Club',
            date: '2020-22',
            description: 'Active volunteer with National Service Scheme and Energy Club, organizing community events and promoting sustainable practices.',
            link: 'volunteering.html'
        },
        'Secretary': {
            step: 'Step 4',
            subtitle: 'ANDRIOS Club',
            date: '2021',
            description: 'Served as Secretary of ANDRIOS Club, managing communications and coordinating technical workshops for Android development.',
            link: 'volunteering.html'
        },
        'B.Tech - AI': {
            step: 'Step 5',
            subtitle: 'Easwari Engineering College',
            date: '2020-24',
            description: 'Bachelor of Technology in Artificial Intelligence and Data Science with 8.68 CGPA. Developed expertise in ML, deep learning, and data analytics.',
            link: 'education.html'
        },
        'President': {
            step: 'Step 6',
            subtitle: 'ANDRIOS Club',
            date: '2021-22',
            description: 'Led ANDRIOS Club as President, organizing 10+ technical workshops, hackathons, and expanding club membership by 40%.',
            link: 'volunteering.html'
        },
        'PRO': {
            step: 'Step 7',
            subtitle: 'Department Public Relations Officer',
            date: '2022-23',
            description: 'Managed department communications and media presence, coordinating events and building industry connections for AI&DS department.',
            link: 'volunteering.html'
        },
        'Winner': {
            step: 'Step 8',
            subtitle: 'Paper Presentation - Resurgam',
            date: '2023',
            description: 'Won first place in Paper Presentation competition at Resurgam technical symposium, presenting research on AI applications.',
            link: 'achievements.html'
        },
        'Intern': {
            step: 'Various',
            subtitle: 'Multiple Organizations',
            date: '2023-24',
            description: 'Gained diverse industry experience through internships at NSIC (Image Processing), FSS (Data Analytics), and Zigma Tech.',
            link: 'experience.html'
        },
        'Coordinator': {
            step: 'Step 10',
            subtitle: 'Google Developer Student Clubs',
            date: 'Jan 2024',
            description: 'Served as GDSC Coordinator, organizing cloud and AI workshops, connecting students with Google technologies and career opportunities.',
            link: 'volunteering.html'
        },
        'Top 100': {
            step: 'Step 12',
            subtitle: 'Naan Mudhalvan Competition',
            date: '2024',
            description: 'Selected among top 100 teams in Naan Mudhalvan state-level competition for Smart Vegetation Management solution using satellite imagery and ML.',
            link: 'achievements.html'
        },
        'Data Scientist': {
            step: 'Step 14',
            subtitle: 'L&T Realty',
            date: 'Dec 2024',
            description: 'Working as Data Scientist at L&T Realty, developing voice bots and implementing process automation using ML and data analytics.',
            link: 'experience.html'
        },
        'PGDM': {
            step: 'Step 15',
            subtitle: 'Great Lakes Institute of Management',
            date: '2025-27',
            description: 'Pursuing Post Graduate Diploma in Management at Great Lakes Institute of Management, Chennai, focusing on bridging AI/ML with business strategy.',
            link: 'education.html'
        },
        'Certified': {
            step: 'Step 16',
            subtitle: 'Continuous Learning',
            date: 'Ongoing',
            description: 'Continuously acquiring certifications in cloud technologies, data science, and management to stay updated with industry trends.',
            link: 'achievements.html'
        }
    };

    function openModal(title, link) {
        if (!modal) return;

        const data = milestoneData[title] || {
            step: 'Milestone',
            subtitle: '',
            date: '',
            description: 'Click "Learn more" to explore this milestone in detail.',
            link: link
        };

        modalStep.textContent = data.step;
        modalTitle.textContent = title;
        modalSubtitle.textContent = data.subtitle;
        modalDate.textContent = data.date;
        modalDescription.textContent = data.description;
        modalLink.href = data.link || link;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Event listeners for modal
    if (modal) {
        modalClose?.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Attach click handlers to timeline nodes
    document.querySelectorAll('.planet-node').forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop event from bubbling to page transition handler
            const title = node.querySelector('h3')?.textContent || 'Milestone';
            const link = node.getAttribute('href') || '#';
            openModal(title, link);
        });
    });

    // Link Interception for Fade Out
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Skip modal links as they handle navigation differently
        if (link.classList.contains('modal-link')) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        // Only intercept internal links
        if (href &&
            !href.startsWith('#') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            !href.startsWith('http') &&
            target !== '_blank' &&
            (href.endsWith('.html') || !href.includes('.'))) {

            e.preventDefault();

            document.body.classList.remove('page-visible');
            document.body.classList.add('page-transition-exit');

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }
    });

    // --- ISS / Satellite Automatic Path Following (Mobile Only) ---
    const roadmap = document.getElementById('roadmap');
    const iss = document.querySelector('.iss-container');
    const desktopPath = document.querySelector('.desktop-path #cosmic-path');

    if (roadmap && iss && desktopPath) {
        let animationFrameId;
        const duration = 30000; // 30 seconds for a full cycle (Explicit Request)
        let startTime = null;

        function updatePosition(progress, path) {
            const pathLength = path.getTotalLength();
            const point = path.getPointAtLength(progress * pathLength);
            const svgWidth = 1000;
            const svgHeight = 2100;
            const container = roadmap.querySelector('.timeline-container');
            const containerWidth = 1000; // Fixed width for calculation due to CSS lock
            const containerHeight = container.clientHeight; // Should be consistent with aspect ratio

            // X calculation: (SVG_X / SVG_Width) * Container_Width
            const x = (point.x / svgWidth) * containerWidth;

            // Y calculation: (SVG_Y / SVG_Height) * Container_Height
            const y = (point.y / svgHeight) * containerHeight;

            iss.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

            // Loop Fade Effect
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

            // Only update if visible (Mobile check)
            if (window.innerWidth <= 768) {
                updatePosition(progress, desktopPath);
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        // Performance: Only run animation when roadmap is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (window.innerWidth <= 768) {
                        updatePosition(0, desktopPath);
                        startAnimation();
                    }
                } else {
                    stopAnimation();
                }
            });
        }, { threshold: 0.01 });

        function startAnimation() {
            if (!animationFrameId) {
                startTime = null;
                animationFrameId = requestAnimationFrame(animate);
            }
        }

        function stopAnimation() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }

        observer.observe(roadmap);
    }
});
