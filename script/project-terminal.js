(() => {
'use strict';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const DATA = {
    talesofdanmaku: {
        name: 'talesofdanmaku.ts',
        competences: [
            ['Persévérance',             'implémenter la logique bullet hell (centaines de projectiles simultanés)'],
            ["Capacité d'apprentissage", 'maîtriser TypeScript, Vite et Tauri en contexte de SAÉ'],
            ['Autonomie',                "finaliser seul après la dissolution de l'équipe initiale"],
        ],
        resultats: [
            "Jeu solo/multijoueur déployé sur navigateur et en app desktop via Tauri",
            "Moteur bullet hell gérant des centaines de projectiles simultanément",
            "Projet livré seul malgré la dissolution de l'équipe initiale",
        ],
        reflexive: [
            ['Acquis',    "architecturer un moteur de jeu en TypeScript et gérer des centaines d'entités"],
            ['Défi',      "reprendre seul un projet conçu initialement en équipe"],
            ['À refaire', "définir l'architecture et les rôles dès le lancement"],
        ],
    },
    mizutwitter: {
        name: 'mizutwitter.js',
        competences: [
            ['Autonomie',              'conception et développement complets sans guidance externe'],
            ['Curiosité',              "explorer les APIs d'extension navigateur"],
            ['Attention à la qualité', 'interface de thèmes cohérente et agréable pour les utilisateurs'],
        ],
        resultats: [
            'Extension Chrome fonctionnelle avec thèmes personnalisables et filtrage',
            'Interface de configuration intuitive intégrée au navigateur',
            'Projet autonome livré et publié sans ressources externes',
        ],
        reflexive: [
            ['Acquis',    "APIs d'extension navigateur et injection CSS dans un DOM tiers"],
            ['Défi',      'compatibilité après les fréquentes mises à jour de Twitter'],
            ['À refaire', 'versionner les sélecteurs CSS pour faciliter les MAJ futures'],
        ],
    },
    iuterrain: {
        name: 'iuterrain.java',
        competences: [
            ['Adaptabilité',    "s'ajuster au rythme et au niveau de chacun dans le trinôme"],
            ["Esprit d'équipe", 'cohérence de code et répartition des tâches à trois'],
            ['Organisation',    'planifier les algorithmes en parallèle du travail des autres'],
        ],
        resultats: [
            'Application Java livrée dans les délais avec plusieurs algorithmes de génération',
            'Interface JavaFX jouable : mode progression et mode libre fonctionnels',
            'Coordination réussie entre 3 développeurs, rendu cohérent',
        ],
        reflexive: [
            ['Acquis',    'algorithmes de graphes et coordination de code en trinôme'],
            ['Défi',      'cohérence visuelle et technique entre 3 développeurs'],
            ['À refaire', 'conventions de code et architecture commune dès le lancement'],
        ],
    },
    googlegreen: {
        name: 'googlegreen.html',
        competences: [
            ['Attention à la qualité', "reproduire l'identité visuelle Google en HTML/CSS pur, sans framework"],
            ['Organisation',           'répartir les pages et responsabilités au sein du binôme'],
            ["Esprit d'équipe",        'coordonner contenu et design pour un rendu cohérent'],
        ],
        resultats: [
            'Site multi-pages livré dans les délais, identité Google fidèlement reproduite',
            'Contenu axé sur des solutions concrètes de mobilité durable',
            'Cohérence visuelle entre les pages développées à deux',
        ],
        reflexive: [
            ['Acquis',    "HTML/CSS pur et reproduction d'une identité visuelle existante"],
            ['Défi',      'cohérence graphique entre les pages de chaque membre'],
            ['À refaire', "variables CSS partagées dès le départ pour garantir l'uniformité"],
        ],
    },
    minecraftregiments: {
        name: 'regiments.sh',
        competences: [
            ['Organisation',    'gérer serveur, 150 membres et contenu régulier sur plusieurs mois'],
            ['Persévérance',    'maintenir le projet actif avec mises à jour et événements réguliers'],
            ["Esprit d'équipe", "animer et fédérer une communauté autour d'un projet commun"],
        ],
        resultats: [
            '150 membres actifs, des milliers de vues sur les réseaux sociaux',
            'Serveur stable avec missions immersives et événements réguliers',
            'Communauté francophone fédérée, entièrement gérée en solo',
        ],
        reflexive: [
            ['Acquis',    'gestion de communauté, administration serveur et communication digitale'],
            ['Défi',      "maintenir l'engagement des membres sur la durée"],
            ['À refaire', "automatiser les tâches d'administration répétitives dès le départ"],
        ],
    },
    poisonplant: {
        name: 'poisonplant.cs',
        competences: [
            ['Curiosité', 'apprendre Godot et C# de zéro en autodidacte'],
            ['Autonomie', 'conception et développement entièrement en solo'],
            ['Patience',  'débogage et rééquilibrage du gameplay sur de nombreuses itérations'],
        ],
        resultats: [
            'Jeu complet publié sur itch.io avec système de vagues progressives',
            "Plusieurs types d'ennemis, game over et boucle de jeu fonctionnels",
            'Godot et C# maîtrisés de façon entièrement autonome',
        ],
        reflexive: [
            ['Acquis',    "Godot, C# et conception d'une game loop appris en autodidacte"],
            ['Défi',      'équilibrer la difficulté des vagues pour une expérience agréable'],
            ['À refaire', 'planifier le game design sur papier avant de commencer à coder'],
        ],
    },
    codewarfare: {
        name: 'codewarfare.c',
        competences: [
            ['Persévérance',             'implémenter chaque mécanique from scratch sans moteur de jeu'],
            ['Attention à la qualité',   'architecture soignée pour gérer la complexité croissante'],
            ["Capacité d'apprentissage", 'maîtrise progressive de SFML et des structures de données nécessaires'],
        ],
        resultats: [
            "Tower defense jouable : IA ennemie, tours et économie fonctionnels",
            'Rendu graphique SFML entièrement custom, sans assets de moteur',
            'C/C++ et gestion mémoire manuelle maîtrisés sur un projet complet',
        ],
        reflexive: [
            ['Acquis',    'architecture sans moteur, gestion mémoire C++ et rendu SFML'],
            ['Défi',      'complexité croissante sans patterns architecturaux établis'],
            ['À refaire', 'appliquer des patterns de conception (ECS) pour mieux structurer'],
        ],
    },
    omicronbot: {
        name: 'omicronbot.js',
        competences: [
            ['Curiosité',                "découverte de Node.js et de l'API Discord par intérêt propre"],
            ["Capacité d'apprentissage", "prise en main autonome d'un environnement inconnu"],
            ['Persévérance',             'projet mené jusqu\'au bout malgré les obstacles de débutant'],
        ],
        resultats: [
            'Bot déployé sur plusieurs serveurs avec mini-jeux multijoueurs en temps réel',
            'Puissance 4, pierre-feuille-ciseaux et jeux de logique fonctionnels',
            'Premier projet Node.js mené de A à Z',
        ],
        reflexive: [
            ['Acquis',    "programmation asynchrone Node.js et intégration d'API tierce"],
            ['Défi',      'gérer les états de plusieurs parties simultanées sans conflit'],
            ['À refaire', 'structurer avec des classes orientées objet dès le début'],
        ],
    },
};

function ln(term, html, cls = 'pt-out') {
    const d = document.createElement('div');
    d.className = cls;
    d.innerHTML = html;
    term.appendChild(d);
    term.scrollTop = term.scrollHeight;
    return d;
}

async function typeCmd(term, cmd) {
    const d = document.createElement('div');
    d.className = 'pt-cmd-line';
    d.innerHTML = `<span class="pt-prompt-lbl">$</span><span class="pt-text"></span><span class="pt-cursor-bl">█</span>`;
    term.appendChild(d);
    const t = d.querySelector('.pt-text');
    const c = d.querySelector('.pt-cursor-bl');
    for (const ch of cmd) {
        t.textContent += ch;
        term.scrollTop = term.scrollHeight;
        await sleep(42 + Math.random() * 28);
    }
    await sleep(60);
    c.remove();
}

async function loadBar(term) {
    const d = ln(term, '', 'pt-load');
    const bars = ['▒▒▒▒▒▒▒▒▒▒','██▒▒▒▒▒▒▒▒','████▒▒▒▒▒▒','██████▒▒▒▒','████████▒▒','██████████'];
    const pcts = [0, 20, 40, 60, 80, 100];
    for (let i = 0; i < bars.length; i++) {
        d.textContent = `Chargement [${bars[i]}] ${pcts[i]}%`;
        term.scrollTop = term.scrollHeight;
        await sleep(110 + Math.random() * 40);
    }
}

async function waitClick(term) {
    ln(term, '▌ cliquez pour continuer', 'pt-enter-line');
    await new Promise(resolve => {
        function handler(e) {
            if (e.target.classList.contains('pt-reset-line')) return;
            term.removeEventListener('click', handler);
            delete term._clickHandler;
            term.innerHTML = '';
            resolve();
        }
        if (term._clickHandler) term.removeEventListener('click', term._clickHandler);
        term._clickHandler = handler;
        term.addEventListener('click', handler);
    });
}

async function run(term, projectId) {
    const d = DATA[projectId];
    if (!d) return;

    // BOOT
    await typeCmd(term, `boot project-analysis.sh ${d.name}`);
    await sleep(180);
    await loadBar(term);
    await sleep(150);
    ln(term, '&gt; Système initialisé. Fichiers chargés.', 'pt-info');
    await sleep(320);

    // SKILLS
    await typeCmd(term, 'cat competences.log');
    await sleep(160);
    ln(term, '╔══ COMPÉTENCES MOBILISÉES ════════════════════╗', 'pt-section');
    for (const [lbl, desc] of d.competences) {
        await sleep(140);
        ln(term, `&gt;&gt; <span class="pt-lbl">${lbl}</span> — ${desc}`);
    }
    await sleep(220);
    await waitClick(term);

    // RESULTS
    await typeCmd(term, 'cat resultats.log');
    await sleep(160);
    ln(term, '╔══ RÉSULTATS ══════════════════════════════════╗', 'pt-section');
    for (const r of d.resultats) {
        await sleep(140);
        ln(term, `• ${r}`);
    }
    await sleep(220);
    await waitClick(term);

    // ANALYSIS
    await typeCmd(term, 'cat reflexion.log');
    await sleep(160);
    ln(term, '╔══ ANALYSE RÉFLEXIVE ══════════════════════════╗', 'pt-section');
    for (const [lbl, desc] of d.reflexive) {
        await sleep(140);
        ln(term, `&gt;&gt; <span class="pt-lbl">${lbl}</span> — ${desc}`);
    }

    // CRASH
    await sleep(800);
    ln(term, '');
    await sleep(180);
    term.classList.add('pt-crashing');
    await sleep(620);
    term.classList.remove('pt-crashing');
    await sleep(120);
    ln(term, '⚠ FATAL : SEGMENTATION FAULT at 0x00DEADBEEF', 'pt-error');
    await sleep(100);
    ln(term, '  signal 11 (SIGSEGV) — processus terminé', 'pt-error-dim');
    await sleep(100);
    ln(term, '  core dump : /tmp/core.0x4d450000', 'pt-error-dim');
    await sleep(100);
    ln(term, '  exit code : 139', 'pt-error-dim');
    await sleep(200);

    const resetLine = ln(term, '&gt; [ ↺ RÉINITIALISER ] — cliquez pour relancer', 'pt-reset-line');
    term.scrollTop = term.scrollHeight;
    term.dataset.state = 'done';

    resetLine.addEventListener('click', e => {
        e.stopPropagation();
        if (term._clickHandler) {
            term.removeEventListener('click', term._clickHandler);
            delete term._clickHandler;
        }
        term.innerHTML = '';
        term.dataset.state = 'running';
        run(term, projectId);
    });
}

document.querySelectorAll('.project-terminal-section').forEach(section => {
    const projectId = section.closest('.project-featured').dataset.project;
    const toggleBtn = section.querySelector('.pt-toggle');
    const term      = section.querySelector('.project-terminal');

    term.dataset.state = 'idle';

    toggleBtn.addEventListener('click', () => {
        const open = term.classList.contains('open');
        if (open) {
            term.classList.remove('open', 'pt-expanded');
            toggleBtn.classList.remove('active');
            if (term._clickHandler) {
                term.removeEventListener('click', term._clickHandler);
                delete term._clickHandler;
            }
        } else {
            term.classList.add('open', 'pt-expanded');
            toggleBtn.classList.add('active');
            if (term.dataset.state === 'idle') {
                term.dataset.state = 'running';
                run(term, projectId);
            }
        }
    });

});

})();
