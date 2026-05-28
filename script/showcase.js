(() => {
"use strict";

document.querySelectorAll('.top-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetEl = document.getElementById(btn.getAttribute('data-target'));
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.add('highlight');
            setTimeout(() => targetEl.classList.remove('highlight'), 2000);
        }
    });
});

})();
