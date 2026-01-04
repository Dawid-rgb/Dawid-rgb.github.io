const themeSelector = document.getElementById('theme-selector');
const themeLink = document.getElementById('theme-link');

themeSelector.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    themeLink.href = selectedTheme;
});

const apps = document.querySelectorAll('.app');
const popupOverlay = document.getElementById('popup-overlay');
const popupTitle = document.getElementById('popup-title');
const popupImage = document.getElementById('popup-image');
const popupDescription = document.getElementById('popup-description');
const popupLike = document.getElementById('popup-like');
const popupClose = document.getElementById('popup-close');

apps.forEach(app => {
    app.addEventListener('click', () => {
        popupTitle.textContent = app.dataset.title;
        popupImage.src = app.dataset.image;
        popupDescription.textContent = app.dataset.description;
        popupLike.textContent = app.dataset.like;

        popupOverlay.style.display = 'flex';
    });
});

popupClose.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const entries = document.querySelectorAll(".media-entry");

    entries.forEach(entry => {
        entry.addEventListener("click", () => {

            const targetID = entry.dataset.target;
            const details = document.getElementById(targetID);
            const icon = entry.querySelector(".media-icon");

            const isOpen = entry.classList.contains("active");

            document.querySelectorAll(".media-entry").forEach(e => {
                e.classList.remove("active");
                const iconEl = e.querySelector(".media-icon");
                if (iconEl) iconEl.src = "img/icons/folder_close.png";
            });

            document.querySelectorAll(".media-details").forEach(d => {
                d.classList.remove("active");
            });

            if (!isOpen) {
                entry.classList.add("active");
                details.classList.add("active");
                if (icon) icon.src = "img/icons/folder_open.png";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll("#discover-window .project-ad");
    let index = 0;

    projects.forEach((p, i) => {
        p.classList.remove("show", "hide");
        if (i === 0) p.classList.add("show");
    });

    function showNextProject() {
        projects[index].classList.remove("show");
        projects[index].classList.add("hide");

        index = (index + 1) % projects.length;
        projects[index].classList.remove("hide");
        projects[index].classList.add("show");

        setTimeout(showNextProject, 3000);
    }

    setTimeout(showNextProject, 3000);
});

document.querySelectorAll('.project-ad').forEach(ad => {
    ad.addEventListener('click', () => {
        const targetProject = ad.dataset.project;
        const projectEl = document.querySelector(`.project-featured[data-project="${targetProject}"]`);
        if (projectEl) {
            projectEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});