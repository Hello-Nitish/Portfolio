/**
 * Shared Components for Anti Gravity Portfolio
 * Handles Navigation and other common UI elements
 * 
 * @file components.js
 * @description Centralized navigation component and global search functionality.
 *              All searchable content is indexed here for site-wide search.
 * 
 * Performance Notes:
 * - Debounce: 300ms delay on search input to reduce DOM updates on slow devices
 * - Lazy loading: All images use loading="lazy" decoding="async" except LCP
 * - WebP only: All assets are WebP format for 2G network optimization
 */

// =============================================================================
// NAVIGATION DATA
// =============================================================================
// Main navigation items displayed in the floating dock
const navItems = [
    { href: 'index.html', icon: '🏠', label: 'Home' },
    { href: 'experience.html', icon: '💼', label: 'Experience' },
    { href: 'achievements.html', icon: '🏆', label: 'Awards' },
    { href: 'education.html', icon: '🎓', label: 'Education' },
    { href: 'volunteering.html', icon: '🤝', label: 'POR' },
    { href: 'blogs.html', icon: '🎯', label: 'Blogs' },
    { href: 'lets_connect.html', icon: '🤙', label: 'Connect' }
];

// =============================================================================
// SEARCH INDEX
// =============================================================================
/**
 * Global search index containing all searchable content across the site.
 * Each entry has:
 * - title: Display name in search results
 * - url: Page URL with optional anchor (e.g., 'achievements.html#cert-lean-six-sigma')
 * - category: Grouping for filtering (Page, Certification, Achievement, etc.)
 * - icon: Emoji displayed in results
 * - snippet: Short description shown below title
 * - keywords: Space-separated search terms for matching
 */
const searchIndex = [
    // --- Main Pages ---
    { title: 'Home', url: 'index.html', category: 'Page', icon: '🏠', snippet: 'Portfolio homepage featuring bio, skills, timeline, and featured projects', keywords: 'home portfolio bio nitish kumar introduction profile main' },
    { title: 'Experience', url: 'experience.html', category: 'Page', icon: '💼', snippet: 'Professional work history including internships and full-time roles', keywords: 'experience work history jobs internships employment career' },
    { title: 'Education', url: 'education.html', category: 'Page', icon: '🎓', snippet: 'Academic background from school to PGDM at Great Lakes', keywords: 'education degrees college school university academic' },
    { title: 'Achievements', url: 'achievements.html', category: 'Page', icon: '🏆', snippet: 'Awards, certifications, and recognition in various competitions', keywords: 'achievements awards certificates certifications competitions recognition' },
    { title: 'Volunteering & POR', url: 'volunteering.html', category: 'Page', icon: '🤝', snippet: 'Leadership roles and positions of responsibility in clubs and organizations', keywords: 'volunteering leadership por positions responsibility clubs' },
    { title: 'Blogs & Insights', url: 'blogs.html', category: 'Page', icon: '📝', snippet: 'Articles, event coverage, and insights on technology and career', keywords: 'blogs articles insights writing events workshops' },
    { title: 'Let\'s Connect', url: 'lets_connect.html', category: 'Page', icon: '🤙', snippet: 'Contact information, resume download, and video introduction', keywords: 'contact resume connect email phone reach message form cv download video' },

    // --- Experience Details ---
    { title: 'Business Management Trainee @ Incorp Advisory', url: 'experience.html', category: 'Experience', icon: '💼', snippet: 'Tech Transformation, AI automation, KYC/eSign, OCR APIs & Copilot evaluation at Incorp Advisory', keywords: 'incorp advisory business management trainee tech transformation ai automation kyc copilot ocr' },
    { title: 'Data Scientist @ L&T Realty', url: 'experience.html', category: 'Experience', icon: '💼', snippet: 'Voice bots and process automation using ML and data analytics at L&T Realty, Chennai', keywords: 'l&t realty data scientist voice bots process automation machine learning chennai current' },
    { title: 'Intern @ Zigma Technologies', url: 'experience.html', category: 'Experience', icon: '💼', snippet: 'Apache Superset, IPFS, and system administration on Ubuntu servers', keywords: 'zigma technologies intern apache superset ipfs system administration ubuntu decentralized' },
    { title: 'Intern @ FSS', url: 'experience.html', category: 'Experience', icon: '💼', snippet: 'Banking data anomaly detection and customer segmentation at Financial Software Systems', keywords: 'fss financial software systems intern banking data anomaly detection customer segmentation' },
    { title: 'Intern @ NSIC', url: 'experience.html', category: 'Experience', icon: '💼', snippet: 'Image processing and object detection using OpenCV at NSIC', keywords: 'nsic intern image processing opencv object detection computer vision' },

    // --- Education Details ---
    { title: 'PGDM at Great Lakes', url: 'education.html', category: 'Education', icon: '🎓', snippet: 'Post Graduate Diploma in Management (2025-27) at Great Lakes Institute, Chennai', keywords: 'great lakes institute management pgdm mba business administration chennai glim' },
    { title: 'B.Tech in AI & Data Science', url: 'education.html', category: 'Education', icon: '🎓', snippet: 'Bachelor of Technology (2020-24) at Easwari Engineering College with 8.68 CGPA', keywords: 'easwari engineering college b.tech artificial intelligence data science srm group btech' },
    { title: '12th Grade - Velammal', url: 'education.html', category: 'Education', icon: '🎓', snippet: 'Higher Secondary education at Velammal Matriculation School (2020)', keywords: 'velammal matriculation school 12th grade higher secondary' },
    { title: '10th Grade - Infant Jesus', url: 'education.html', category: 'Education', icon: '🎓', snippet: 'Secondary education at Infant Jesus Matriculation School (2018)', keywords: 'infant jesus matriculation school 10th grade secondary' },

    // --- Skills ---
    { title: 'Generative AI', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'Building LLM workflows, prompt engineering, and GenAI solutions', keywords: 'gen ai generative ai llm prompt artificial intelligence' },
    { title: 'Vibe Coding', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'AI-assisted rapid software development and prototyping', keywords: 'vibe coding ai coding assistant prototyping rapid development' },
    { title: 'Agentic AI', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'Designing autonomous AI agents and workflow orchestration', keywords: 'agentic ai ai agents workflow automation autonomous systems' },
    { title: 'Data Analytics', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'Business analytics, data visualization, and statistical analysis', keywords: 'data analytics business analytics tableau visualization statistics' },
    { title: 'Product Management', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'Product lifecycle management, user research, and strategy', keywords: 'product management pm lifecycle strategy roadmap user research' },
    { title: 'Supply Chain Management', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'Operations, demand forecasting, and inventory management', keywords: 'supply chain management operations demand forecasting inventory logistics' },
    { title: 'Linux & System Admin', url: 'index.html', category: 'Skill', icon: '🛠️', snippet: 'Ubuntu server administration and shell scripting', keywords: 'linux system admin ubuntu server shell bash' },

    // --- Projects ---
    { title: 'Naan Mudhalvan Project', url: 'index.html#projects', category: 'Project', icon: '🚀', snippet: 'Smart Vegetation Management using satellite imagery and ML for agricultural optimization', keywords: 'naan mudhalvan smart vegetation management satellite imagery machine learning agricultural optimization government tamil nadu' },
    { title: 'WAGA Voice Assistant', url: 'index.html#projects', category: 'Project', icon: '🚀', snippet: 'User experience enhancement through AI voice assistant and artistic web design', keywords: 'waga user experience voice assistant ai web design artistic ux' },

    // --- Awards (with anchor IDs) ---
    { title: 'Naan Mudhalvan Top 100', url: 'achievements.html#award-naan-mudhalvan', category: 'Achievement', icon: '🏆', snippet: 'Selected among top 100 teams in state-level Naan Mudhalvan competition', keywords: 'naan mudhalvan top 100 teams government tamil nadu competition award winner' },
    { title: 'IC ACM-23 Publication', url: 'achievements.html#award-ic-acm', category: 'Achievement', icon: '🏆', snippet: 'Research paper published at International Conference ACM-23, funded by DST SERB', keywords: 'ic acm international conference paper publication dst serb research' },
    { title: 'Paper Presentation Winner', url: 'achievements.html#award-paper-presentation', category: 'Achievement', icon: '🏆', snippet: 'First place in Paper Presentation at Symposium Resurgam 2023', keywords: 'paper presentation winner resurgam symposium first place' },
    { title: 'Ideathon Winner', url: 'achievements.html#award-ideathon', category: 'Achievement', icon: '🏆', snippet: 'Winner of Ideathon event at Symposium Resurgam 2023', keywords: 'ideathon winner resurgam symposium innovation ideas' },

    // --- Certifications - Management & Business (with anchor IDs) ---
    { title: 'Produscope 2025', url: 'achievements.html#cert-produscope-2025', category: 'Certification', icon: '📜', snippet: 'IIT Guwahati management certification program', keywords: 'produscope iit guwahati management business strategy 2025' },
    { title: 'Introduction to Management Consulting', url: 'achievements.html#cert-management-consulting', category: 'Certification', icon: '📜', snippet: 'Management consulting certification from Emory University via Coursera', keywords: 'management consulting emory university coursera business strategy' },
    { title: 'Lean Six Sigma White Belt', url: 'achievements.html#cert-lean-six-sigma', category: 'Certification', icon: '📜', snippet: 'Process improvement and quality management certification from Udemy', keywords: 'lean six sigma white belt udemy process improvement quality' },
    { title: 'Influencer Content Marketing', url: 'achievements.html#cert-influencer-marketing', category: 'Certification', icon: '📜', snippet: 'Digital marketing and influencer strategies from Udemy', keywords: 'influencer content marketing udemy digital marketing social media' },
    { title: 'Business Analysis Overview', url: 'achievements.html#cert-business-analysis', category: 'Certification', icon: '📜', snippet: 'Business analysis fundamentals from Percipio', keywords: 'business analysis percipio ba fundamentals requirements' },
    { title: 'Management Information System', url: 'achievements.html#cert-mis-nptel', category: 'Certification', icon: '📜', snippet: 'MIS certification from NPTEL', keywords: 'management information system mis nptel information technology' },
    { title: 'Getting Influencer Marketing Right', url: 'achievements.html#cert-influencer-upgrad', category: 'Certification', icon: '📜', snippet: 'Influencer marketing strategies from upGrad', keywords: 'influencer marketing upgrad digital marketing social media' },

    // --- Certifications - AI & Data Science (with anchor IDs) ---
    { title: 'Data Science Foundations', url: 'achievements.html#cert-data-science-ibm', category: 'Certification', icon: '📜', snippet: 'IBM Data Science foundations certification', keywords: 'data science ibm foundations python analytics' },
    { title: 'KPMG AU Data Analytics', url: 'achievements.html#cert-kpmg-analytics', category: 'Certification', icon: '📜', snippet: 'Virtual experience in data analytics from KPMG via Forage', keywords: 'kpmg data analytics forage virtual experience' },
    { title: 'Recognizing Hallucinations/Bias in AI', url: 'achievements.html#cert-ai-hallucinations', category: 'Certification', icon: '📜', snippet: 'AI ethics and bias recognition from Percipio', keywords: 'ai hallucinations bias ethics percipio artificial intelligence' },
    { title: 'Machine Learning Foundations', url: 'achievements.html#cert-ml-foundations', category: 'Certification', icon: '📜', snippet: 'ML fundamentals from University of Washington', keywords: 'machine learning foundations university washington uw ml algorithms' },
    { title: 'Data Science (Exposys)', url: 'achievements.html#cert-data-science-exposys', category: 'Certification', icon: '📜', snippet: 'Data science training from Exposys Data Labs', keywords: 'data science exposys training python analytics' },
    { title: 'Introduction to Data Science', url: 'achievements.html#cert-intro-data-science', category: 'Certification', icon: '📜', snippet: 'Data science fundamentals from Cognitive Class', keywords: 'introduction data science cognitive class ibm fundamentals' },

    // --- Certifications - Cloud & Cybersecurity (with anchor IDs) ---
    { title: 'CCSP Cloud Computing Concepts', url: 'achievements.html#cert-cloud-computing', category: 'Certification', icon: '📜', snippet: 'Cloud computing concepts from Percipio CCSP 2022', keywords: 'ccsp cloud computing percipio concepts security' },
    { title: 'Blockchain and its Applications', url: 'achievements.html#cert-blockchain-nptel', category: 'Certification', icon: '📜', snippet: 'Blockchain technology certification from NPTEL', keywords: 'blockchain nptel applications cryptocurrency distributed ledger' },

    // --- Certifications - Enterprise & Professional (with anchor IDs) ---
    { title: 'Data Analytics Job Simulation', url: 'achievements.html#cert-kpmg-simulation', category: 'Certification', icon: '📜', snippet: 'KPMG job simulation via Forage', keywords: 'kpmg data analytics job simulation forage virtual experience' },
    { title: 'Data Analytics and Visualization', url: 'achievements.html#cert-accenture-analytics', category: 'Certification', icon: '📜', snippet: 'Accenture virtual experience via Forage', keywords: 'accenture data analytics visualization forage virtual experience' },
    { title: 'Creativity & Problem Solving', url: 'achievements.html#cert-creativity-ict', category: 'Certification', icon: '📜', snippet: 'Creative problem solving from ICT Academy', keywords: 'creativity problem solving ict academy soft skills' },
    { title: 'Step into RPA', url: 'achievements.html#cert-rpa-uipath', category: 'Certification', icon: '📜', snippet: 'Robotic Process Automation from UiPath', keywords: 'rpa robotic process automation uipath automation bots' },
    { title: 'RAKSHIN Certification', url: 'achievements.html#cert-rakshin-nss', category: 'Certification', icon: '📜', snippet: 'NSS RAKSHIN program certification', keywords: 'rakshin nss national service scheme volunteer' },

    // --- Certifications - Language (with anchor IDs) ---
    { title: 'German Language Exam', url: 'achievements.html#cert-german-language', category: 'Certification', icon: '📜', snippet: 'German language certification from inlingua', keywords: 'german language inlingua exam foreign language' },

    // --- Competitions (with anchor IDs) ---
    { title: 'Accenture Innovation Challenge 2023', url: 'achievements.html#comp-accenture-2023', category: 'Competition', icon: '🏅', snippet: 'Participated in Accenture national innovation challenge via Unstop', keywords: 'accenture innovation challenge 2023 unstop competition national' },
    { title: 'Tata Imagination Challenge 2023', url: 'achievements.html#comp-tata-2023', category: 'Competition', icon: '🏅', snippet: 'Participated in Tata Group prestigious competition via Unstop', keywords: 'tata imagination challenge 2023 unstop competition tata group' },
    { title: 'EY Techathon 4.0', url: 'achievements.html#comp-ey-techathon', category: 'Competition', icon: '🏅', snippet: 'Participated in EY technology hackathon via Unstop', keywords: 'ey techathon 4.0 unstop competition hackathon technology' },

    // --- Leadership Roles ---
    { title: 'GDSC Coordinator', url: 'volunteering.html', category: 'Leadership', icon: '👔', snippet: 'Google Developer Student Clubs coordinator organizing tech workshops', keywords: 'google developer student clubs gdsc coordinator volunteer hackathon event' },
    { title: 'ANDRIOS Club President', url: 'volunteering.html', category: 'Leadership', icon: '👔', snippet: 'Led ANDRIOS Club organizing 10+ technical workshops and hackathons', keywords: 'andrios club president leadership easwari engineering college workshops' },
    { title: 'Department PRO', url: 'volunteering.html', category: 'Leadership', icon: '👔', snippet: 'Public Relations Officer managing department communications and events', keywords: 'pro public relations officer department communications media' },
    { title: 'NSS Volunteer', url: 'volunteering.html', category: 'Leadership', icon: '👔', snippet: 'National Service Scheme volunteer organizing community events', keywords: 'nss national service scheme volunteer community events' },

    // --- Blogs/Events ---
    { title: 'Google Cloud Study Jams', url: 'blogs.html', category: 'Blog', icon: '📝', snippet: 'Achieved Tier II in Google Cloud Study Jams and received Google swag', keywords: 'google cloud study jams tier swag gdsc' },
    { title: 'Datronix 2k23 PRO', url: 'blogs.html', category: 'Blog', icon: '📝', snippet: 'Served as PRO for Datronix 2k23 national symposium', keywords: 'datronix 2k23 pro national symposium outreach' },
    { title: 'Ethical Hacking Workshop', url: 'blogs.html', category: 'Blog', icon: '📝', snippet: 'Organized national-level virtual workshop on ethical hacking and web development', keywords: 'ethical hacking workshop national level virtual web mobile development' },
    { title: 'Techie Conclave 2021', url: 'blogs.html', category: 'Blog', icon: '📝', snippet: 'Organized technical summit connecting students with industry leaders', keywords: 'techie conclave 2021 technical summit industry leaders' }
];

// =============================================================================
// CATEGORY COLOR MAPPING
// =============================================================================
/**
 * Color assignments for search result category badges.
 * Each category has a distinct color for visual differentiation.
 * Colors are used with transparency (e.g., #38bdf820 for 12.5% opacity background)
 */
const categoryColors = {
    'Page': '#38bdf8',        // Sky blue - main navigation pages
    'Experience': '#22c55e',   // Green - work history
    'Education': '#a855f7',    // Purple - academic background
    'Skill': '#f97316',        // Orange - technical skills
    'Project': '#ec4899',      // Pink - portfolio projects
    'Achievement': '#eab308',  // Yellow - awards and recognition
    'Certification': '#06b6d4', // Cyan - professional certifications
    'Competition': '#f43f5e',  // Rose - hackathons and challenges
    'Leadership': '#8b5cf6',   // Violet - POR and volunteering
    'Blog': '#64748b'          // Slate - articles and events
};

class NavigationComponent {
    constructor() {
        this.currentPath = window.location.pathname.split('/').pop() || 'index.html';
        this.debounceTimer = null;
        this.selectedIndex = -1;
        this.render();
        this.renderSearchButton();
        this.renderSearchModal();
    }

    isActive(href) {
        if (this.currentPath === '' && href === 'index.html') return true;
        if (this.currentPath === href) return true;
        if (href.includes('#')) {
            const [base, hash] = href.split('#');
            if (base === this.currentPath && window.location.hash === '#' + hash) return true;
        }
        return false;
    }

    render() {
        const navContainer = document.getElementById('navigation-container');
        if (!navContainer) return;

        const navHTML = `
            <div class="floating-dock-container reveal active">
                <nav class="floating-dock">
                    ${navItems.map(item => `
                        <a href="${item.href}" 
                           class="dock-item ${this.isActive(item.href) ? 'active' : ''}" 
                           aria-label="${item.label}">
                            ${item.icon}
                        </a>
                    `).join('')}
                </nav>
            </div>
        `;

        navContainer.innerHTML = navHTML;
    }

    renderSearchButton() {
        // Remove existing button if present
        const existingBtn = document.getElementById('floating-search-btn');
        if (existingBtn) existingBtn.remove();

        const btnHTML = `
            <button id="floating-search-btn" class="floating-search-btn js-search-trigger" aria-label="Search">
                🔍
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', btnHTML);

        document.getElementById('floating-search-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleSearchModal();
        });
    }

    renderSearchModal() {
        if (document.getElementById('search-modal')) return;

        const modalHTML = `
            <div id="search-modal" class="search-modal-overlay" role="dialog" aria-modal="true">
                <div class="search-modal-content glass-panel">
                    <div class="search-header">
                        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" id="search-input" placeholder="Search pages, skills, experience..." autocomplete="off" spellcheck="false">
                        <button id="close-search" class="search-close-btn" aria-label="Close">&times;</button>
                    </div>
                    <div id="search-results" class="search-results">
                        <div class="search-hint">
                            <span class="hint-icon">💡</span>
                            <span>Try searching for "Python", "Great Lakes", or "Projects"</span>
                        </div>
                    </div>
                    <div class="search-footer">
                        <span class="search-shortcut"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                        <span class="search-shortcut"><kbd>Enter</kbd> Select</span>
                        <span class="search-shortcut"><kbd>Esc</kbd> Close</span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event Listeners
        document.getElementById('close-search').addEventListener('click', () => this.toggleSearchModal());
        document.getElementById('search-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('search-modal')) this.toggleSearchModal();
        });

        // Search with debounce
        const input = document.getElementById('search-input');
        input.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => this.performSearch(e.target.value), 300);
        });

        // Keyboard navigation
        input.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
    }

    toggleSearchModal() {
        const modal = document.getElementById('search-modal');
        if (!modal) return;

        modal.classList.toggle('active');
        if (modal.classList.contains('active')) {
            const input = document.getElementById('search-input');
            setTimeout(() => input.focus(), 100);
            document.body.style.overflow = 'hidden';
            this.selectedIndex = -1;
        } else {
            document.body.style.overflow = '';
            document.getElementById('search-input').value = '';
            this.resetResults();
        }
    }

    resetResults() {
        document.getElementById('search-results').innerHTML = `
            <div class="search-hint">
                <span class="hint-icon">💡</span>
                <span>Try searching for "Python", "Great Lakes", or "Projects"</span>
            </div>
        `;
        this.selectedIndex = -1;
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('search-results');

        if (!query.trim()) {
            this.resetResults();
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matches = searchIndex.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.keywords.toLowerCase().includes(lowerQuery) ||
            item.snippet.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        );

        // Sort by relevance (title match first, then category, then keywords)
        matches.sort((a, b) => {
            const aTitle = a.title.toLowerCase().includes(lowerQuery) ? 0 : 1;
            const bTitle = b.title.toLowerCase().includes(lowerQuery) ? 0 : 1;
            if (aTitle !== bTitle) return aTitle - bTitle;
            return 0;
        });

        // Limit to 8 results
        const limitedMatches = matches.slice(0, 8);

        if (limitedMatches.length > 0) {
            resultsContainer.innerHTML = limitedMatches.map((match, index) => `
                <a href="${match.url}" 
                   class="search-result-item ${index === this.selectedIndex ? 'selected' : ''}" 
                   data-index="${index}"
                   onclick="handleSearchResultClick(event, '${match.url}')">
                    <div class="result-icon">${match.icon}</div>
                    <div class="result-info">
                        <div class="result-header">
                            <h4>${this.highlightMatch(match.title, query)}</h4>
                            <span class="result-category" style="background: ${categoryColors[match.category] || '#64748b'}20; color: ${categoryColors[match.category] || '#64748b'}; border: 1px solid ${categoryColors[match.category] || '#64748b'}40;">
                                ${match.category}
                            </span>
                        </div>
                        <p class="result-snippet">${this.highlightMatch(match.snippet, query)}</p>
                    </div>
                </a>
            `).join('');

        } else {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🔍</span>
                    <p>No results found for "<strong>${query}</strong>"</p>
                    <span class="empty-hint">Try different keywords or check spelling</span>
                </div>
            `;
        }

        this.selectedIndex = -1;
    }

    highlightMatch(text, query) {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    handleKeyNavigation(e) {
        const results = document.querySelectorAll('.search-result-item');
        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
            this.updateSelection(results);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
            this.updateSelection(results);
        } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
            e.preventDefault();
            results[this.selectedIndex].click();
        } else if (e.key === 'Escape') {
            this.toggleSearchModal();
        }
    }

    updateSelection(results) {
        results.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        if (this.selectedIndex >= 0) {
            results[this.selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }
}

// Global function to handle search result clicks with smooth scroll
function handleSearchResultClick(event, url) {
    event.preventDefault();

    // Close the modal and reset state
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Clear the search input
    const input = document.getElementById('search-input');
    if (input) input.value = '';

    // Parse the URL for hash anchor
    const [basePath, hash] = url.split('#');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // If same page with anchor, smooth scroll
    if (hash && (basePath === currentPage || basePath === '')) {
        const element = document.getElementById(hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight effect
                element.style.transition = 'box-shadow 0.3s ease';
                element.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.5)';
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 2000);
            }, 100);
            return;
        }
    }

    // Navigate to different page
    window.location.href = url;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationComponent();

    window.addEventListener('hashchange', () => {
        new NavigationComponent();
    });

    // Global keyboard shortcut for search (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const modal = document.getElementById('search-modal');
            if (modal) {
                modal.classList.toggle('active');
                if (modal.classList.contains('active')) {
                    setTimeout(() => document.getElementById('search-input').focus(), 100);
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        }
    });

    // Handle hash on page load (for deep links from search)
    const hash = window.location.hash.slice(1);
    if (hash) {
        setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.style.transition = 'box-shadow 0.3s ease';
                element.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.5)';
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 2000);
            }
        }, 300);
    }
});
