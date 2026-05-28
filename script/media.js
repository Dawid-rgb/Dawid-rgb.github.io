(() => {
"use strict";

const CAROUSEL_INTERVAL = 3000;

function initThemeSelector() {
    const selector = document.getElementById('theme-selector');
    const themeLink = document.getElementById('theme-link');
    if (!selector || !themeLink) return;

    selector.addEventListener('change', (e) => {
        themeLink.href = e.target.value;
    });
}

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

function initSkillsAccordion() {
    const entries = document.querySelectorAll('.media-entry');

    entries.forEach(entry => {
        entry.addEventListener('click', () => {
            const details = document.getElementById(entry.dataset.target);
            const wasOpen = entry.classList.contains('active');

            // Close every entry first
            entries.forEach(e => {
                e.classList.remove('active');
                const icon = e.querySelector('.media-icon');
                if (icon) icon.src = 'img/icons/folder_close.png';
            });
            document.querySelectorAll('.media-details').forEach(d => d.classList.remove('active'));

            // Re-open the clicked one unless it was already open
            if (!wasOpen) {
                entry.classList.add('active');
                if (details) details.classList.add('active');
                const icon = entry.querySelector('.media-icon');
                if (icon) icon.src = 'img/icons/folder_open.png';
            }
        });
    });
}

function initDiscoverCarousel() {
    const container = document.querySelector('#discover-window .discover-content');
    const ads = document.querySelectorAll('#discover-window .project-ad');
    if (!ads.length) return;

    /* canvas bruit */
    const canvas = document.createElement('canvas');
    canvas.className = 'tv-static-canvas';
    container.appendChild(canvas);

    function resizeCanvas() {
        canvas.width  = Math.max(container.offsetWidth, 1);
        canvas.height = Math.max(container.offsetHeight, 1);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    let noiseActive = false;
    let raf = null;

    function drawNoise() {
        const w = canvas.width, h = canvas.height;
        const img = ctx.createImageData(w, h);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
            const v = Math.random() * 255 | 0;
            d[i] = d[i+1] = d[i+2] = v;
            d[i+3] = 255;
        }
        ctx.putImageData(img, 0, 0);
    }

    function loopNoise() {
        if (!noiseActive) return;
        drawNoise();
        raf = requestAnimationFrame(loopNoise);
    }

    let index = 0;
    let busy  = false;

    ads.forEach((ad, i) => {
        ad.classList.remove('show', 'hide');
        if (i === 0) ad.classList.add('show');
        ad.addEventListener('click', () => {
            const target = document.querySelector(`.project-featured[data-project="${ad.dataset.project}"]`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    const showNext = () => {
        if (busy) return;
        busy = true;

        /* démarrer le bruit */
        resizeCanvas();
        noiseActive = true;
        canvas.style.opacity = '1';
        loopNoise();

        /* swap image au milieu du bruit */
        setTimeout(() => {
            ads[index].classList.remove('show');
            ads[index].classList.add('hide');
            index = (index + 1) % ads.length;
            ads[index].classList.remove('hide');
            ads[index].classList.add('show');
        }, 200);

        /* arrêter le bruit */
        setTimeout(() => {
            noiseActive = false;
            cancelAnimationFrame(raf);
            canvas.style.opacity = '0';
            busy = false;
            setTimeout(showNext, CAROUSEL_INTERVAL);
        }, 400);
    };

    setTimeout(showNext, CAROUSEL_INTERVAL);
}

initThemeSelector();
initInterestPopup();
initSkillsAccordion();
initDiscoverCarousel();

})();
