// Wrapped in an IIFE so symbols stay local (no globals leak) while still
// working over file://. Loaded at end of <body>, so the DOM is ready.
(() => {
"use strict";

const CAROUSEL_INTERVAL = 3000;

/* ---------- Theme selector ---------- */
function initThemeSelector() {
    const selector = document.getElementById('theme-selector');
    const themeLink = document.getElementById('theme-link');
    if (!selector || !themeLink) return;

    selector.addEventListener('change', (e) => {
        themeLink.href = e.target.value;
    });
}

/* ---------- Centres d'intérêt popup ---------- */
function initInterestPopup() {
    const overlay = document.getElementById('popup-overlay');
    if (!overlay) return;

    const title = document.getElementById('popup-title');
    const image = document.getElementById('popup-image');
    const description = document.getElementById('popup-description');
    const like = document.getElementById('popup-like');
    const closeBtn = document.getElementById('popup-close');

    const open = (app) => {
        title.textContent = app.dataset.title;
        image.src = app.dataset.image;
        description.textContent = app.dataset.description;
        like.textContent = app.dataset.like;
        overlay.style.display = 'flex';
    };

    const close = () => { overlay.style.display = 'none'; };

    document.querySelectorAll('.app').forEach(app => {
        app.addEventListener('click', () => open(app));
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

/* ---------- Skills accordion ---------- */
function initSkillsAccordion() {
    const entries = document.querySelectorAll('.media-entry');

    entries.forEach(entry => {
        entry.addEventListener('click', () => {
            const details = document.getElementById(entry.dataset.target);
            const wasOpen = entry.classList.contains('active');

            // Close every entry first.
            entries.forEach(e => {
                e.classList.remove('active');
                const icon = e.querySelector('.media-icon');
                if (icon) icon.src = 'img/icons/folder_close.png';
            });
            document.querySelectorAll('.media-details').forEach(d => d.classList.remove('active'));

            // Re-open the clicked one unless it was already open.
            if (!wasOpen) {
                entry.classList.add('active');
                if (details) details.classList.add('active');
                const icon = entry.querySelector('.media-icon');
                if (icon) icon.src = 'img/icons/folder_open.png';
            }
        });
    });
}

/* ---------- "Découvrez mes projets" carousel ---------- */
function initDiscoverCarousel() {
    const ads = document.querySelectorAll('#discover-window .project-ad');
    if (!ads.length) return;

    let index = 0;
    ads.forEach((ad, i) => {
        ad.classList.remove('show', 'hide');
        if (i === 0) ad.classList.add('show');

        // Clicking an ad jumps to its featured project.
        ad.addEventListener('click', () => {
            const target = document.querySelector(`.project-featured[data-project="${ad.dataset.project}"]`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    const showNext = () => {
        ads[index].classList.replace('show', 'hide');
        index = (index + 1) % ads.length;
        ads[index].classList.remove('hide');
        ads[index].classList.add('show');
        setTimeout(showNext, CAROUSEL_INTERVAL);
    };

    setTimeout(showNext, CAROUSEL_INTERVAL);
}

initThemeSelector();
initInterestPopup();
initSkillsAccordion();
initDiscoverCarousel();

})();
