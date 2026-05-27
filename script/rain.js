// Realistic rain — active only when the cyberpunk theme is loaded.
// Canvas sits at z-index:-1 (below normal-flow content, above body background).
(() => {
"use strict";

const CYBERPUNK  = 'cyberpunk.css';
const DROP_COUNT = 250;
const WIND_ANGLE = 0.22;
const SIN_W = Math.sin(WIND_ANGLE);
const COS_W = Math.cos(WIND_ANGLE);

let canvas = null, ctx = null, raf = null, drops = [];

/* ── canvas setup ──────────────────────────────────────── */

function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'pointer-events:none;z-index:-1;';
    document.body.prepend(canvas);
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', resize);
    resize();
}

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array.from({length: DROP_COUNT}, () => spawnDrop(true));
}

/* ── drop factory ─────────────────────────────────────── */

function spawnDrop(scatter) {
    const speed   = 10 + Math.random() * 10;
    const len     = 14 + Math.random() * 22;
    const opacity = 0.04 + Math.random() * 0.11;
    return {
        x:  Math.random() * (canvas.width + 120) - 60,
        y:  scatter ? Math.random() * canvas.height : -(len + 5),
        vx: speed * SIN_W,
        vy: speed * COS_W,
        len,
        opacity,
    };
}

/* ── render loop ──────────────────────────────────────── */

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 1;
    for (const d of drops) {
        ctx.strokeStyle = `rgba(180,210,255,${d.opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.vx * (d.len / d.vy), d.y - d.len);
        ctx.stroke();

        d.x += d.vx;
        d.y += d.vy;

        if (d.y > canvas.height + d.len) Object.assign(d, spawnDrop(false));
    }

    raf = requestAnimationFrame(draw);
}

/* ── start / stop ─────────────────────────────────────── */

function start() {
    if (raf) return;
    if (!canvas) createCanvas();
    canvas.style.display = 'block';
    draw();
}

function stop() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (canvas) canvas.style.display = 'none';
}

function isCyberpunk() {
    const link = document.getElementById('theme-link');
    if (!link) return false;
    const href = link.getAttribute('href') || link.href;
    return href.includes(CYBERPUNK);
}

/* ── observe theme changes ────────────────────────────── */

const themeLink = document.getElementById('theme-link');
if (themeLink) {
    new MutationObserver(() => isCyberpunk() ? start() : stop())
        .observe(themeLink, {attributes: true, attributeFilter: ['href']});
}

if (isCyberpunk()) start();

})();
