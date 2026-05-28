(() => {
"use strict";

/* ── backdrop ─────────────────────────────────────────────────── */
const backdrop = document.createElement('div');
backdrop.className = 'win-backdrop';
document.body.appendChild(backdrop);

function closeMaximized() {
    backdrop.style.display = 'none';
    document.querySelectorAll('.winbox.win-maximized').forEach(w => {
        w.classList.remove('win-maximized');
        w.classList.add('win-restoring');
        w.addEventListener('animationend', () => {
            w.classList.remove('win-restoring');
        }, { once: true });
    });
}

function minimize(win) {
    const content = win.querySelector('.win-content');
    win.classList.add('win-minimizing');
    (content || win).addEventListener('animationend', () => {
        win.classList.remove('win-minimizing');
        win.classList.add('win-minimized');
    }, { once: true });
}

function unminimize(win) {
    win.classList.remove('win-minimized');
    win.classList.add('win-unminimizing');
    const content = win.querySelector('.win-content');
    (content || win).addEventListener('animationend', () => {
        win.classList.remove('win-unminimizing');
    }, { once: true });
}

backdrop.addEventListener('click', closeMaximized);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMaximized(); });

/* ── nav buttons ──────────────────────────────────────────────── */
document.querySelectorAll('.top-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetEl = document.getElementById(btn.getAttribute('data-target'));
        if (!targetEl) return;
        targetEl.classList.remove('win-closed', 'win-minimized');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add('highlight');
        setTimeout(() => targetEl.classList.remove('highlight'), 2000);
    });
});

/* ── window buttons ───────────────────────────────────────────── */
document.querySelectorAll('.winbox').forEach(win => {
    const closeBtn = win.querySelector('.win-btn-lx.close');
    const minBtn   = win.querySelector('.win-btn-lx.minimize');
    const maxBtn   = win.querySelector('.win-btn-lx.maximize');
    const header   = win.querySelector('.win-header');

    if (closeBtn) {
        closeBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (win.classList.contains('win-maximized')) closeMaximized();
            win.classList.add('win-closing');
            win.addEventListener('animationend', () => {
                win.classList.remove('win-closing');
                win.classList.add('win-closed');
            }, { once: true });
        });
    }

    if (minBtn) {
        minBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (win.classList.contains('win-maximized')) closeMaximized();
            if (win.classList.contains('win-minimized')) {
                unminimize(win);
            } else {
                minimize(win);
            }
        });
    }

    if (maxBtn) {
        maxBtn.addEventListener('click', e => {
            e.stopPropagation();
            win.classList.remove('win-minimized');
            const maximizing = !win.classList.contains('win-maximized');
            closeMaximized();
            if (maximizing) {
                win.classList.add('win-maximized', 'win-maximizing');
                backdrop.style.display = 'block';
                win.scrollTop = 0;
                win.addEventListener('animationend', () => {
                    win.classList.remove('win-maximizing');
                }, { once: true });
            }
        });
    }

    if (header) {
        header.addEventListener('click', e => {
            if (e.target.closest('.win-btn-lx')) return;
            if (win.classList.contains('win-minimized')) {
                unminimize(win);
            }
        });
    }
});

})();
