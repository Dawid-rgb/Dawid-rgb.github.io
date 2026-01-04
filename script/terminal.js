const terminal = document.getElementById("terminal");

const user = "dawid";
const host = "portfolio";

const projects = [
    { name: "mizutwitter.js", target: "mizutwitter" },
    { name: "iuterrain.java", target: "iuterrain" },
    { name: "googlegreen.html", target: "googlegreen" },
    { name: "regiments.sh", target: "minecraftregiments" },
    { name: "codewarfare.c", target: "codewarfare" },
    { name: "omicronbot.js", target: "omicronbot" }
];

const skills = [
    "HTML / CSS",
    "JavaScript",
    "Java",
    "C / C++",
    "SQL",
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function prompt(command) {
    const line = document.createElement("div");
    line.innerHTML = `<span class="prompt">$</span> <span class="terminal-command"></span><span class="cursor"></span>`;
    terminal.appendChild(line);

    const commandSpan = line.querySelector(".terminal-command");
    const cursor = line.querySelector(".cursor");

    for (let char of command) {
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

async function runNeofetch() {
    output("OS: DBOS x86_64");
    output("Host: Portfolio Machine");
    output("Kernel: 6.1.0-dev");
    output("Shell: bash");

    await sleep(300);
    output("");

    output(">> Compétences principales :", "terminal-info");
    await sleep(300);
    const bar = "OK";

    skills.forEach(skill => {
        output(skill);
    });
}

async function runTerminal() {
    await prompt("whoami");
    await sleep(300);

    output("Dawid Banas");
    await sleep(300);
    output(">> Passionné par le développement d'applications", "terminal-info");
    await sleep(300);
    output(">> Curieux et toujours prêt à explorer de nouveaux outils et technologies.", "terminal-info");

    await sleep(1000);

    await prompt("neofetch");
    await sleep(500);
    runNeofetch();

    await sleep(2000);

    await prompt("ls -la projets");
    await sleep(300);

    projects.forEach(p => {
        outputHTML(
            `<div class="terminal-file" data-project="${p.target}">-rwxr-xr-x 23 ${user} ${user} 2048 ${p.name}</div>`
        );
    });

    await sleep(600);
    idlePrompt();
}

terminal.addEventListener("click", e => {
    if (e.target.classList.contains("terminal-file")) {
        const target = e.target.dataset.project;
        const project = document.querySelector(`.project[data-project="${target}"]`);

        if (project) {
            project.scrollIntoView({ behavior: "smooth", block: "center" });
            project.classList.add("highlight");
            setTimeout(() => project.classList.remove("highlight"), 2000);
        }
    }
});

runTerminal();
