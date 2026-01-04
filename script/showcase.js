document.querySelectorAll('.top-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);

        if(targetEl){
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.add('highlight');
            setTimeout(() => {
                targetEl.classList.remove('highlight');
            }, 2000);
        }
    });
});
