(() => {
"use strict";

const terminal = document.getElementById("terminal");

const USER = "dawid";

const projects = [
    { name: "talesofdanmaku.ts",  target: "talesofdanmaku" },
    { name: "mizutwitter.js",     target: "mizutwitter" },
    { name: "iuterrain.java",     target: "iuterrain" },
    { name: "googlegreen.html",   target: "googlegreen" },
    { name: "regiments.sh",       target: "minecraftregiments" },
    { name: "poisonplant.cs",     target: "poisonplant" },
    { name: "codewarfare.c",      target: "codewarfare" },
    { name: "omicronbot.js",      target: "omicronbot" }
];

const softSkills = [
    "Persévérance",
    "Organisation",
    "Autonomie",
    "Attention à la qualité",
    "Curiosité",
    "Patience",
    "Capacité d'apprentissage",
    "Esprit d'équipe",
    "Adaptabilité",
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

function output(text, className = "terminal-output") {
    const line = document.createElement("div");
    line.className = className;
    line.textContent = text;
    terminal.appendChild(line);
    scrollToBottom();
}

function outputHTML(html, className = "terminal-output") {
    const div = document.createElement("div");
    div.className = className;
    div.innerHTML = html;
    terminal.appendChild(div);
    scrollToBottom();
}

async function typeCommand(command) {
    const line = document.createElement("div");
    line.innerHTML = `<span class="prompt">$</span> <span class="terminal-command"></span><span class="cursor"></span>`;
    terminal.appendChild(line);

    const commandSpan = line.querySelector(".terminal-command");
    const cursor = line.querySelector(".cursor");

    for (const char of command) {
        commandSpan.textContent += char;
        scrollToBottom();
        await sleep(80);
    }

    cursor.remove();
}

function idlePrompt() {
    const line = document.createElement("div");
    line.innerHTML = `<span class="prompt">$</span> <span class="cursor"></span>`;
    terminal.appendChild(line);
    scrollToBottom();
}

async function runSoftSkills() {
    await sleep(200);

    for (const skill of softSkills) {
        output("• " + skill);
        await sleep(180);
    }
}

async function runTerminal() {
    await typeCommand("whoami");
    await sleep(300);

    output("Dawid Banas");
    await sleep(300);
    output(">> Passionné par le développement d'applications", "terminal-info");
    await sleep(300);
    output(">> Curieux et toujours prêt à explorer de nouveaux outils et technologies.", "terminal-info");

    await sleep(1000);

    await typeCommand("cat softskills.txt");
    await sleep(300);
    await runSoftSkills();

    await sleep(2000);

    await typeCommand("ls -la projets");
    await sleep(300);

    projects.forEach(p => {
        outputHTML(
            `<div class="terminal-file" data-project="${p.target}">-rwxr-xr-x 23 ${USER} ${USER} 2048 ${p.name}</div>`
        );
    });

    await sleep(600);
    idlePrompt();
}

terminal.addEventListener("click", e => {
    if (!e.target.classList.contains("terminal-file")) return;

    const target = document.querySelector(`.project[data-project="${e.target.dataset.project}"]`);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("highlight");
        setTimeout(() => target.classList.remove("highlight"), 2000);
    }
});

runTerminal();

})();
