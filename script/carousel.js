(() => {
    document.querySelectorAll('.project-info-carousel').forEach(carousel => {
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const label  = carousel.querySelector('.carousel-label');
        const dots   = Array.from(carousel.querySelectorAll('.dot'));
        let current  = 0;

        function go(n) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (n + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
            label.textContent = slides[current].dataset.label;
        }

        carousel.querySelector('.carousel-prev').addEventListener('click', () => go(current - 1));
        carousel.querySelector('.carousel-next').addEventListener('click', () => go(current + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
    });
})();
