/**
 * Shared Components for Anti Gravity Portfolio
 * Handles Navigation and other common UI elements
 */

// Navigation Data
const navItems = [
    { href: 'index.html', icon: '🏠', label: 'Home' },
    // Search is now separate, removed from here
    { href: 'index.html#projects', icon: '🚀', label: 'Projects' },
    { href: 'experience.html', icon: '💼', label: 'Experience' },
    { href: 'achievements.html', icon: '🏆', label: 'Awards' },
    { href: 'education.html', icon: '🎓', label: 'Education' },
    { href: 'volunteering.html', icon: '🤝', label: 'POR' },
    { href: 'resume.html', icon: '📄', label: 'Resume' },
    { href: 'blogs.html', icon: '🎯', label: 'Blogs' },
    { href: 'contact.html', icon: '📬', label: 'Contact' }
];

// Simple Search Index
// Comprehensive Search Index
const searchIndex = [
    // --- Pages ---
    { title: 'Home', url: 'index.html', keywords: 'home portfolio bio nitish kumar introduction profile' },
    { title: 'Experience', url: 'experience.html', keywords: 'experience work history jobs internships l&t realty zigma fss nsic data scientist trainee' },
    { title: 'Education', url: 'education.html', keywords: 'education degrees college school great lakes glim easwari engineering b.tech pgdm' },
    { title: 'Projects', url: 'index.html#projects', keywords: 'projects portfolio work naan mudhalvan waga vegetation management voice assistant' },
    { title: 'Achievements', url: 'achievements.html', keywords: 'achievements awards certificates certifications competitions hackathons papers recognition' },
    { title: 'Volunteering', url: 'volunteering.html', keywords: 'volunteering leadership por positions of responsibility club president gdsc nss' },
    { title: 'Blogs & Goals', url: 'blogs.html', keywords: 'blogs articles future goals aims career path insights writing' },
    { title: 'Resume', url: 'resume.html', keywords: 'resume cv curriculum vitae download pdf profile' },
    { title: 'Contact', url: 'contact.html', keywords: 'contact email phone location get in touch message form reach' },

    // --- Experience Details ---
    { title: 'Data Scientist @ L&T Realty', url: 'experience.html', keywords: 'l&t realty data scientist voice bots process automation machine learning chennai' },
    { title: 'Intern @ Zigma Technologies', url: 'experience.html', keywords: 'zigma technologies intern apache superset ipfs system administration ubuntu' },
    { title: 'Intern @ FSS', url: 'experience.html', keywords: 'fss financial software systems intern banking data anomaly detection customer segmentation' },
    { title: 'Intern @ NSIC', url: 'experience.html', keywords: 'nsic intern image processing opencv object detection' },

    // --- Skills ---
    { title: 'Technical Skills', url: 'index.html#skills', keywords: 'python tableau linux system admin ipfs decentralized web technical skills proficiency' },
    { title: 'Business Skills', url: 'index.html#skills', keywords: 'business analytics management consulting data strategy product management business strategy' },

    // --- Projects ---
    { title: 'Naan Mudhalvan Project', url: 'index.html#projects', keywords: 'naan mudhalvan smart vegetation management satellite imagery machine learning agricultural optimization' },
    { title: 'WAGA Project', url: 'index.html#projects', keywords: 'waga user experience voice assistant ai web design artistic' },

    // --- Education Details ---
    { title: 'PGDM at Great Lakes', url: 'education.html', keywords: 'great lakes institute of management pgdm business administration chennai' },
    { title: 'B.Tech AI at Easwari Engineering College', url: 'education.html', keywords: 'easwari engineering college b.tech artificial intelligence data science srm group' },

    // --- Achievements & Certifications ---
    { title: 'Naan Mudhalvan Award', url: 'achievements.html', keywords: 'naan mudhalvan top 100 teams govt of tamil nadu competition award' },
    { title: 'IC ACM-23 Paper Presentation', url: 'achievements.html', keywords: 'ic acm international conference paper presentation dst serb' },
    { title: 'Management Certifications', url: 'achievements.html', keywords: 'management consulting lean six sigma business analysis udemy coursera' },
    { title: 'AI & Data Science Certifications', url: 'achievements.html', keywords: 'deep learning tensorflow machine learning robotics image processing python' },

    // --- Volunteering Roles ---
    { title: 'GDSC Coordinator', url: 'volunteering.html', keywords: 'google developer student clubs gdsc coordinator volunteer hackathon event management' },
    { title: 'Club President (ANDRIOS)', url: 'volunteering.html', keywords: 'andrios club president leadership easwari engineering college' },
    { title: 'WiMaX Founder', url: 'volunteering.html', keywords: 'wimax community founding member digital media' },
    { title: 'World is NFT Founder', url: 'volunteering.html', keywords: 'world is nft founder blockchain digital art' }
];

class NavigationComponent {
    constructor() {
        this.currentPath = window.location.pathname.split('/').pop() || 'index.html';
        this.render();
        this.renderSearchButton(); // New separate button
        this.renderSearchModal(); // Initialize Search Modal
    }

    isActive(href) {
        // Handle root path
        if (this.currentPath === '' && href === 'index.html') return true;

        // Exact match
        if (this.currentPath === href) return true;

        // Handle anchors (simple check)
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
        if (document.getElementById('floating-search-btn')) return;

        const btnHTML = `
            <button id="floating-search-btn" class="floating-search-btn js-search-trigger" aria-label="Search">
                🔍
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', btnHTML);

        // Attach event listener
        document.getElementById('floating-search-btn').addEventListener('click', () => {
            this.toggleSearchModal();
        });
    }

    renderSearchModal() {
        // Avoid duplicates
        if (document.getElementById('search-modal')) return;

        const modalHTML = `
            <div id="search-modal" class="search-modal-overlay">
                <div class="search-modal-content glass-panel">
                    <div class="search-header">
                        <input type="text" id="search-input" placeholder="Search anything (e.g. 'Python', 'Projects')..." autocomplete="off">
                        <button id="close-search" aria-label="Close">&times;</button>
                    </div>
                    <div id="search-results" class="search-results">
                        <!-- Results will appear here -->
                        <div class="empty-state">Type to start searching...</div>
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

        // Search Logic
        const input = document.getElementById('search-input');
        input.addEventListener('input', (e) => this.performSearch(e.target.value));
    }

    toggleSearchModal() {
        const modal = document.getElementById('search-modal');
        if (!modal) return;

        modal.classList.toggle('active');
        if (modal.classList.contains('active')) {
            setTimeout(() => document.getElementById('search-input').focus(), 100);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = '';
        }
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        if (!query.trim()) {
            resultsContainer.innerHTML = '<div class="empty-state">Type to start searching...</div>';
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matches = searchIndex.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.keywords.toLowerCase().includes(lowerQuery)
        );

        if (matches.length > 0) {
            resultsContainer.innerHTML = matches.map(match => `
                <a href="${match.url}" class="search-result-item" onclick="document.getElementById('search-modal').classList.remove('active'); document.body.style.overflow = '';">
                    <div class="result-icon">🔗</div>
                    <div class="result-info">
                        <h4>${match.title}</h4>
                        <p>Go to page</p>
                    </div>
                </a>
            `).join('');
        } else {
            resultsContainer.innerHTML = '<div class="empty-state">No results found.</div>';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationComponent();

    // Re-initialize active state on hash change for anchor links
    window.addEventListener('hashchange', () => {
        new NavigationComponent();
    });
});
