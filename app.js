const MOCK_MENTORS = [
    {
        id: "m1",
        name: "Ananya Sharma",
        title: "Senior Product & UI/UX Designer @ TechCorp",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        category: "UI/UX Design",
        skills: ["Figma", "UX Research", "Design Systems", "Prototyping", "UI Design"],
        price: 25,
        rating: 4.9,
        reviewCount: 42,
        experience: 6,
        language: "Hindi",
        secondaryLanguage: "English",
        level: ["Beginner", "Intermediate"],
        mode: "Online",
        bio: "Specializing in helping beginners and junior designers master Figma, build portfolio-ready design systems, and crack UI/UX product interviews.",
        certificates: ["NN/g Certified UX Specialist", "Google UX Design Professional"],
        studentsTaught: 120,
        availableSlots: ["Mon 4:00 PM", "Wed 6:00 PM", "Sat 10:00 AM"]
    },
    {
        id: "m2",
        name: "Vikram Rathore",
        title: "Embedded Systems Specialist & IoT Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        category: "Hardware & Embedded",
        skills: ["Arduino", "STM32", "PCB Design", "IoT", "Embedded C++"],
        price: 30,
        rating: 4.95,
        reviewCount: 38,
        experience: 8,
        language: "English",
        secondaryLanguage: "Hindi",
        level: ["Beginner", "Intermediate", "Advanced"],
        mode: "Online",
        bio: "Hardware enthusiast with 8+ years experience designing IoT controllers and microcontrollers. I guide students through STM32 bare-metal programming and custom PCB layouts.",
        certificates: ["ARM Microcontroller Certified", "Hardware Engineering B.S."],
        studentsTaught: 95,
        availableSlots: ["Tue 5:00 PM", "Thu 7:00 PM", "Sun 2:00 PM"]
    },
    {
        id: "m3",
        name: "Dr. Elena Rostova",
        title: "AI Research Scientist & Python Lead",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        category: "AI & Data Science",
        skills: ["Python", "Machine Learning", "PyTorch", "Deep Learning", "NLP"],
        price: 50,
        rating: 5.0,
        reviewCount: 64,
        experience: 10,
        language: "English",
        secondaryLanguage: "German",
        level: ["Intermediate", "Advanced"],
        mode: "Online",
        bio: "Ex-Stanford researcher teaching practical Artificial Intelligence, deep neural networks, and real-world LLM fine-tuning.",
        certificates: ["Ph.D. in Computer Vision", "PyTorch Certified Developer"],
        studentsTaught: 210,
        availableSlots: ["Wed 3:00 PM", "Fri 4:00 PM", "Sat 1:00 PM"]
    },
    {
        id: "m4",
        name: "Karan Patel",
        title: "Full-Stack Web Architect (Node/React/MongoDB)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        category: "Software & Development",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
        price: 20,
        rating: 4.8,
        reviewCount: 29,
        experience: 4,
        language: "Hindi",
        secondaryLanguage: "English",
        level: ["Beginner", "Intermediate"],
        mode: "Online",
        bio: "Self-taught developer turned Tech Lead. I simplify JavaScript frameworks, live code debugging, and step-by-step fullstack development.",
        certificates: ["AWS Certified Developer"],
        studentsTaught: 80,
        availableSlots: ["Mon 7:00 PM", "Sat 11:00 AM", "Sun 5:00 PM"]
    },
    {
        id: "m5",
        name: "Sarah Jenkins",
        title: "Executive Public Speaking & Pitch Coach",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        category: "Soft Skills & Career",
        skills: ["Public Speaking", "Communication", "Pitching", "Leadership"],
        price: 40,
        rating: 4.9,
        reviewCount: 51,
        experience: 9,
        language: "English",
        secondaryLanguage: "Spanish",
        level: ["Beginner", "Intermediate", "Advanced"],
        mode: "Online",
        bio: "TEDx Speaker Coach helping students, founders, and professionals conquer stage fear, deliver compelling pitches, and improve vocal clarity.",
        certificates: ["Toastmasters International Gold"],
        studentsTaught: 310,
        availableSlots: ["Tue 10:00 AM", "Thu 2:00 PM", "Fri 11:00 AM"]
    },
    {
        id: "m6",
        name: "Carlos Mendez",
        title: "Certified Personal Trainer & Nutritionist",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400",
        category: "Fitness & Health",
        skills: ["Fitness", "Calisthenics", "Weight Loss", "Meal Planning"],
        price: 18,
        rating: 4.85,
        reviewCount: 19,
        experience: 5,
        language: "Spanish",
        secondaryLanguage: "English",
        level: ["Beginner", "Intermediate"],
        mode: "Offline",
        bio: "Personalized online fitness coaching, posture correction, home workout routines, and realistic nutrition guidance.",
        certificates: ["NASM Certified Personal Trainer"],
        studentsTaught: 60,
        availableSlots: ["Mon 8:00 AM", "Wed 8:00 AM", "Sat 9:00 AM"]
    }
];

// App Core State
class SkillConnectApp {
    constructor() {
        this.mentors = [...MOCK_MENTORS];
        this.wishlist = new Set(JSON.parse(localStorage.getItem('sc_wishlist') || '[]'));
        this.bookings = JSON.parse(localStorage.getItem('sc_bookings') || '[]');
        this.chatHistory = {};
        this.activeMentorId = null;

        this.init();
    }

    init() {
        this.renderFeaturedMentors();
        this.applyFilters();
        this.updateWishlistBadge();
        this.renderBookingsList();
        
        // Listen to URL hash change for direct view routing
        window.addEventListener('hashchange', () => this.handleHashChange());
        this.handleHashChange();
    }

    // Hash Based View Router
    handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'home';
        if (['home', 'explore', 'dashboard', 'profile'].includes(hash)) {
            this.navigateTo(hash, false);
        }
    }

    navigateTo(viewId, updateHash = true) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const targetView = document.getElementById(`Rs.{viewId}-view`);
        if (targetView) targetView.classList.add('active');

        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.dataset.view === viewId);
        });

        if (updateHash) {
            window.location.hash = viewId;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Render Cards Utility
    createMentorCardHTML(mentor) {
        const isWishlisted = this.wishlist.has(mentor.id);
        return `
            <div class="mentor-card">
                <button class="wishlist-btn Rs.{isWishlisted ? 'active' : ''}" onclick="app.toggleWishlist('Rs.{mentor.id}')" title="Save Mentor">
                    <i class="fa-Rs.{isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
                </button>

                <div class="mentor-header">
                    <img src="Rs.{mentor.avatar}" alt="Rs.{mentor.name}" class="mentor-avatar">
                    <div class="mentor-info">
                        <h3>Rs.{mentor.name}</h3>
                        <p class="mentor-title">Rs.{mentor.title}</p>
                        <div class="mentor-rating">
                            <i class="fa-solid fa-star"></i>
                            <span>Rs.{mentor.rating}</span>
                            <span class="text-muted">(Rs.{mentor.reviewCount} reviews)</span>
                        </div>
                    </div>
                </div>

                <div class="mentor-skills">
                    Rs.{mentor.skills.map(skill => `<span>Rs.{skill}</span>`).join('')}
                </div>

                <div class="mentor-meta">
                    <div><i class="fa-solid fa-briefcase"></i> <strong>Rs.{mentor.experience} yrs</strong> exp</div>
                    <div><i class="fa-solid fa-language"></i> <strong>Rs.{mentor.language}</strong></div>
                    <div><i class="fa-solid fa-video"></i> <strong>Rs.{mentor.mode}</strong></div>
                </div>

                <div class="mentor-footer">
                    <div class="mentor-price">Rs.Rs.{mentor.price} <span>/ hr</span></div>
                    <div style="display: flex; gap: 0.35rem;">
                        <button class="btn btn-outline btn-sm" onclick="app.openChatModal('Rs.{mentor.id}')" title="Chat Before Booking">
                            <i class="fa-regular fa-comment"></i>
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="app.viewProfile('Rs.{mentor.id}')">View Profile</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderFeaturedMentors() {
        const grid = document.getElementById('featured-mentors-grid');
        if (!grid) return;
        const topMentors = this.mentors.slice(0, 3);
        grid.innerHTML = topMentors.map(m => this.createMentorCardHTML(m)).join('');
    }

    // Search and Filtering Logic
    applyFilters() {
        const searchQuery = (document.getElementById('global-search-input').value || 
                            document.getElementById('hero-search').value || '').toLowerCase().trim();

        const category = document.getElementById('filter-category')?.value || 'all';
        const maxPrice = parseFloat(document.getElementById('filter-price')?.value || 150);
        const language = document.getElementById('filter-language')?.value || 'all';
        const minRating = parseFloat(document.getElementById('filter-rating')?.value || 0);
        const mode = document.getElementById('filter-mode')?.value || 'all';
        const sortOption = document.getElementById('sort-select')?.value || 'recommended';

        const checkedLevels = Array.from(document.querySelectorAll('.filter-level:checked')).map(cb => cb.value);

        let filtered = this.mentors.filter(m => {
            // Search Query Filter
            const matchesSearch = !searchQuery || 
                m.name.toLowerCase().includes(searchQuery) ||
                m.skills.some(s => s.toLowerCase().includes(searchQuery)) ||
                m.category.toLowerCase().includes(searchQuery) ||
                m.title.toLowerCase().includes(searchQuery);

            // Category Filter
            const matchesCategory = category === 'all' || m.category === category;

            // Price Filter
            const matchesPrice = m.price <= maxPrice;

            // Language Filter
            const matchesLang = language === 'all' || m.language === language || m.secondaryLanguage === language;

            // Rating Filter
            const matchesRating = m.rating >= minRating;

            // Mode Filter
            const matchesMode = mode === 'all' || m.mode === mode;

            // Level Filter
            const matchesLevel = checkedLevels.length === 0 || m.level.some(lvl => checkedLevels.includes(lvl));

            return matchesSearch && matchesCategory && matchesPrice && matchesLang && matchesRating && matchesMode && matchesLevel;
        });

        // Sorting
        if (sortOption === 'rating-high') filtered.sort((a,b) => b.rating - a.rating);
        else if (sortOption === 'price-low') filtered.sort((a,b) => a.price - b.price);
        else if (sortOption === 'price-high') filtered.sort((a,b) => b.price - a.price);
        else if (sortOption === 'experience-high') filtered.sort((a,b) => b.experience - a.experience);

        this.renderExploreResults(filtered, searchQuery);
    }

    renderExploreResults(results, query) {
        const grid = document.getElementById('explore-mentors-grid');
        const noResults = document.getElementById('no-results');
        const countText = document.getElementById('search-count-text');
        const titleText = document.getElementById('search-title');

        if (!grid) return;

        titleText.textContent = query ? `Search Results for "Rs.{query}"` : "All Mentors";
        countText.textContent = `Showing Rs.{results.length} verified available mentors`;

        if (results.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            grid.innerHTML = results.map(m => this.createMentorCardHTML(m)).join('');
        }
    }

    updatePriceSliderLabel(val) {
        document.getElementById('price-slider-value').textContent = `Rs.Rs.{val}/hr`;
    }

    resetFilters() {
        document.getElementById('global-search-input').value = '';
        document.getElementById('hero-search').value = '';
        if (document.getElementById('filter-category')) document.getElementById('filter-category').value = 'all';
        if (document.getElementById('filter-price')) {
            document.getElementById('filter-price').value = 100;
            this.updatePriceSliderLabel(100);
        }
        if (document.getElementById('filter-language')) document.getElementById('filter-language').value = 'all';
        if (document.getElementById('filter-rating')) document.getElementById('filter-rating').value = 0;
        if (document.getElementById('filter-mode')) document.getElementById('filter-mode').value = 'all';
        document.querySelectorAll('.filter-level').forEach(cb => cb.checked = false);

        this.applyFilters();
        this.showToast("Filters reset");
    }

    handleGlobalSearch() {
        this.navigateTo('explore');
        this.applyFilters();
    }

    handleHeroSearch() {
        const val = document.getElementById('hero-search').value;
        document.getElementById('global-search-input').value = val;
        this.navigateTo('explore');
        this.applyFilters();
    }

    searchByTag(tag) {
        document.getElementById('global-search-input').value = tag;
        document.getElementById('hero-search').value = tag;
        this.navigateTo('explore');
        this.applyFilters();
    }

    // Mentor Detailed Profile Page
    viewProfile(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        if (!mentor) return;

        this.activeMentorId = mentorId;
        const container = document.getElementById('profile-content');
        const isWishlisted = this.wishlist.has(mentor.id);

        container.innerHTML = `
            <div class="profile-card-header">
                <div class="profile-cover"></div>
                <div class="profile-main-info">
                    <div class="profile-avatar-wrapper">
                        <img src="Rs.{mentor.avatar}" alt="Rs.{mentor.name}">
                    </div>
                    <div class="profile-actions">
                        <button class="btn btn-outline" onclick="app.toggleWishlist('Rs.{mentor.id}')">
                            <i class="fa-Rs.{isWishlisted ? 'solid' : 'regular'} fa-heart text-danger"></i> Rs.{isWishlisted ? 'Saved' : 'Save'}
                        </button>
                        <button class="btn btn-outline" onclick="app.openChatModal('Rs.{mentor.id}')">
                            <i class="fa-regular fa-comment"></i> Direct Message
                        </button>
                    </div>
                </div>
                <div style="padding: 0 2rem 1.5rem;">
                    <h2>Rs.{mentor.name} <i class="fa-solid fa-circle-check text-primary text-sm" title="Verified Mentor"></i></h2>
                    <p class="text-muted">Rs.{mentor.title}</p>
                    <div class="mentor-rating" style="margin-top: 0.5rem;">
                        <i class="fa-solid fa-star"></i>
                        <span>Rs.{mentor.rating}</span>
                        <span class="text-muted">(Rs.{mentor.reviewCount} student reviews)</span>
                        <span class="badge badge-soft-success" style="margin-left: 1rem;">Rs.{mentor.studentsTaught}+ Sessions Taught</span>
                    </div>
                </div>
            </div>

            <div class="profile-body-grid">
                <div>
                    <div class="profile-section-box">
                        <h3>About the Mentor</h3>
                        <p>Rs.{mentor.bio}</p>
                    </div>

                    <div class="profile-section-box">
                        <h3>Skills & Expertise</h3>
                        <div class="mentor-skills">
                            Rs.{mentor.skills.map(s => `<span style="font-size: 0.875rem; padding: 0.3rem 0.75rem;">Rs.{s}</span>`).join('')}
                        </div>
                    </div>

                    <div class="profile-section-box">
                        <h3>Certificates & Credentials</h3>
                        <ul style="list-style: disc; padding-left: 1.2rem;">
                            Rs.{mentor.certificates.map(c => `<li style="margin-bottom:0.5rem;">Rs.{c}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="profile-section-box">
                        <h3>Learner Reviews</h3>
                        <div class="review-item" style="border-bottom: 1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1rem;">
                            <div style="display:flex; justify-between; align-items:center; margin-bottom:0.3rem;">
                                <strong>Rahul V.</strong>
                                <span class="text-warning">★★★★★</span>
                            </div>
                            <p class="text-sm text-muted">"Ananya helped me clean up my Figma auto-layout and component design in 1 hour. Totally worth it!"</p>
                        </div>
                        <div class="review-item">
                            <div style="display:flex; justify-between; align-items:center; margin-bottom:0.3rem;">
                                <strong>Priya S.</strong>
                                <span class="text-warning">★★★★★</span>
                            </div>
                            <p class="text-sm text-muted">"Clear explanation of embedded logic and hardware debugging. Highly recommended."</p>
                        </div>
                    </div>
                </div>

                <!-- Interactive Booking Widget -->
                <div>
                    <div class="booking-widget-card">
                        <span class="text-sm text-muted">Mentorship Rate</span>
                        <div class="price-tag-big">Rs.Rs.{mentor.price} <span style="font-size:1rem; font-weight:normal; color:var(--text-muted);">/ 1 Hr Session</span></div>
                        
                        <div style="margin: 1.25rem 0;">
                            <label class="filter-label">Select Available Slot</label>
                            <select id="profile-slot-select" class="form-group" style="width:100%; padding:0.6rem; border:1px solid var(--border-color); border-radius:var(--radius-md);">
                                Rs.{mentor.availableSlots.map(slot => `<option value="Rs.{slot}">Rs.{slot}</option>`).join('')}
                            </select>
                        </div>

                        <button class="btn btn-primary btn-full btn-lg" onclick="app.openBookingModal('Rs.{mentor.id}')">
                            <i class="fa-solid fa-calendar-check"></i> Book Session Now
                        </button>

                        <div style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                            <i class="fa-solid fa-shield"></i> 100% Satisfaction Guarantee. Free cancellation up to 24 hours before.
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.navigateTo('profile');
    }

    // Wishlist Functionality
    toggleWishlist(mentorId) {
        if (this.wishlist.has(mentorId)) {
            this.wishlist.delete(mentorId);
            this.showToast("Removed from saved mentors");
        } else {
            this.wishlist.add(mentorId);
            this.showToast("Mentor saved to wishlist!", "success");
        }

        localStorage.setItem('sc_wishlist', JSON.stringify(Array.from(this.wishlist)));
        this.updateWishlistBadge();
        this.applyFilters();
        this.renderWishlistTab();
    }

    updateWishlistBadge() {
        const badge = document.getElementById('wishlist-count-badge');
        if (badge) badge.textContent = this.wishlist.size;
    }

    renderWishlistTab() {
        const grid = document.getElementById('wishlist-grid');
        if (!grid) return;

        const savedMentors = this.mentors.filter(m => this.wishlist.has(m.id));
        if (savedMentors.length === 0) {
            grid.innerHTML = '<p class="text-muted">You have no saved mentors yet. Browse mentors and click the heart icon to save them.</p>';
        } else {
            grid.innerHTML = savedMentors.map(m => this.createMentorCardHTML(m)).join('');
        }
    }

    // Modal Handling
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    // Booking Workflow Modal & Submission
    openBookingModal(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        if (!mentor) return;

        const body = document.getElementById('booking-modal-body');
        const selectedSlot = document.getElementById('profile-slot-select')?.value || mentor.availableSlots[0];

        body.innerHTML = `
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1.5rem; background:var(--bg-body); padding:1rem; border-radius:var(--radius-md);">
                <img src="Rs.{mentor.avatar}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
                <div>
                    <strong>Rs.{mentor.name}</strong>
                    <p class="text-sm text-muted">Rs.{mentor.title}</p>
                </div>
            </div>

            <form onsubmit="app.handleConfirmBooking(event, 'Rs.{mentor.id}')">
                <div class="form-group" style="margin-bottom:1rem;">
                    <label>Selected Session Time</label>
                    <input type="text" value="Rs.{selectedSlot}" readonly style="background:#f1f5f9;">
                </div>

                <div class="form-group" style="margin-bottom:1rem;">
                    <label>What is your primary learning goal for this call?</label>
                    <textarea id="booking-notes" rows="3" placeholder="e.g. Please review my Figma UI layout and suggest industry best practices..." required></textarea>
                </div>

                <div style="border-top:1px solid var(--border-color); padding-top:1rem; margin-top:1rem; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <span class="text-sm text-muted">Total Payment</span>
                        <h3 class="text-primary">Rs.Rs.{mentor.price}.00</h3>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg">Confirm & Reserve Slot</button>
                </div>
            </form>
        `;

        this.openModal('booking-modal');
    }

    handleConfirmBooking(e, mentorId) {
        e.preventDefault();
        const mentor = this.mentors.find(m => m.id === mentorId);
        const notes = document.getElementById('booking-notes').value;
        const slot = document.getElementById('profile-slot-select')?.value || mentor.availableSlots[0];

        const booking = {
            id: 'bk_' + Date.now(),
            mentorId: mentor.id,
            mentorName: mentor.name,
            mentorAvatar: mentor.avatar,
            mentorTitle: mentor.title,
            slot: slot,
            price: mentor.price,
            notes: notes,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        this.bookings.unshift(booking);
        localStorage.setItem('sc_bookings', JSON.stringify(this.bookings));

        this.closeModal('booking-modal');
        this.showToast("Session successfully booked!", "success");
        this.renderBookingsList();
        this.navigateTo('dashboard');
    }

    renderBookingsList() {
        const container = document.getElementById('bookings-list');
        if (!container) return;

        if (this.bookings.length === 0) {
            container.innerHTML = '<p class="text-muted">No sessions booked yet. Explore mentors to schedule your first 1-on-1 session!</p>';
            return;
        }

        container.innerHTML = this.bookings.map(bk => `
            <div class="booking-item-card">
                <div style="display:flex; gap:1rem; align-items:center;">
                    <img src="Rs.{bk.mentorAvatar}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
                    <div>
                        <strong>Rs.{bk.mentorName}</strong>
                        <p class="text-sm text-muted">Rs.{bk.mentorTitle}</p>
                        <small class="badge badge-soft-primary" style="margin-top:0.25rem;"><i class="fa-regular fa-clock"></i> Rs.{bk.slot}</small>
                    </div>
                </div>
                <div>
                    <button class="btn btn-outline btn-sm" onclick="app.openChatModal('Rs.{bk.mentorId}')"><i class="fa-regular fa-comment"></i> Message</button>
                    <button class="btn btn-primary btn-sm" onclick="app.showToast('Joining call room...', 'success')"><i class="fa-solid fa-video"></i> Join Meeting</button>
                </div>
            </div>
        `).join('');
    }

    // Dynamic Dashboard Tabs Switch
    switchDashTab(tabId) {
        document.querySelectorAll('.dash-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.dash-tab-content').forEach(c => c.classList.remove('active'));

        document.querySelector(`.dash-tab[data-tab="Rs.{tabId}"]`)?.classList.add('active');
        document.getElementById(`tab-Rs.{tabId}`)?.classList.add('active');

        if (tabId === 'wishlist') this.renderWishlistTab();
    }

    // Mock Chat Functionality
    openChatModal(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        if (!mentor) return;

        this.activeMentorId = mentorId;
        const headerInfo = document.getElementById('chat-header-info');
        headerInfo.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.75rem;">
                <img src="Rs.{mentor.avatar}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
                <div>
                    <strong>Chat with Rs.{mentor.name}</strong>
                    <p class="text-sm text-muted" style="margin:0;">Ask questions before booking</p>
                </div>
            </div>
        `;

        if (!this.chatHistory[mentorId]) {
            this.chatHistory[mentorId] = [
                { sender: 'mentor', text: `Hi there! I'm Rs.{mentor.name}. What questions do you have about my Rs.{mentor.category} sessions?` }
            ];
        }

        this.renderChatMessages(mentorId);
        this.openModal('chat-modal');
    }

    renderChatMessages(mentorId) {
        const container = document.getElementById('chat-messages');
        const msgs = this.chatHistory[mentorId] || [];

        container.innerHTML = msgs.map(m => `
            <div class="chat-bubble Rs.{m.sender === 'user' ? 'sent' : 'received'}">
                Rs.{m.text}
            </div>
        `).join('');

        container.scrollTop = container.scrollHeight;
    }

    handleSendChatMessage(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text || !this.activeMentorId) return;

        this.chatHistory[this.activeMentorId].push({ sender: 'user', text });
        input.value = '';
        this.renderChatMessages(this.activeMentorId);

        // Simulated Mentor Auto Response
        setTimeout(() => {
            if (this.chatHistory[this.activeMentorId]) {
                this.chatHistory[this.activeMentorId].push({
                    sender: 'mentor',
                    text: "Thanks for reaching out! That sounds like a great topic to cover. Feel free to book any open slot that works for you!"
                });
                this.renderChatMessages(this.activeMentorId);
            }
        }, 1000);
    }

    // Register New Mentor Handler
    handleMentorRegistration(e) {
        e.preventDefault();
        const newMentor = {
            id: 'm_' + Date.now(),
            name: document.getElementById('reg-name').value,
            title: document.getElementById('reg-title').value,
            category: document.getElementById('reg-category').value,
            price: parseFloat(document.getElementById('reg-price').value),
            experience: parseInt(document.getElementById('reg-exp').value),
            language: document.getElementById('reg-languages').value.split(',')[0].trim(),
            secondaryLanguage: "English",
            skills: document.getElementById('reg-skills').value.split(',').map(s => s.trim()),
            avatar: document.getElementById('reg-avatar').value || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
            bio: document.getElementById('reg-bio').value,
            rating: 5.0,
            reviewCount: 1,
            level: ["Beginner", "Intermediate", "Advanced"],
            mode: "Online",
            certificates: ["SkillConnect Verified Mentor"],
            studentsTaught: 1,
            availableSlots: ["Mon 5:00 PM", "Wed 5:00 PM", "Sat 2:00 PM"]
        };

        this.mentors.unshift(newMentor);
        this.closeModal('become-mentor-modal');
        this.showToast("Mentor profile successfully created!", "success");
        this.applyFilters();
        this.navigateTo('explore');
    }

    handleAuth(e) {
        e.preventDefault();
        this.closeModal('auth-modal');
        this.showToast("Successfully signed in as Alex Morgan", "success");
        document.getElementById('auth-btn').innerHTML = '<i class="fa-solid fa-user-check"></i> Alex M.';
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.nav-links');
        if (nav) {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '60px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = '#fff';
            nav.style.padding = '1rem';
            nav.style.boxShadow = 'var(--shadow-md)';
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast Rs.{type === 'success' ? 'success' : ''}`;
        toast.innerHTML = `
            <i class="fa-solid Rs.{type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i>
            <span>Rs.{message}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Global Application Instance
const app = new SkillConnectApp();