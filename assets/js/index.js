"use strict";

const roles = [
    "Full Stack Developer",
    "Software Engineer",
    "DevOps",
    "System Administrator",
    "Database Administrator",
    "Cloud Engineer"
];

const interests = [
    "Containers",
    "REST",
    "Agile",
    "Go",
    "TypeScript",
    "Node.js",
    "Microservices",
    "Automation",
    "Orchestration",
    "Backend",
    "Databases",
    "Cloud",
    "DevOps",
    "Tinkering",
    "Open Source <3",
    "Linux",
    "Enabling Users",
    "Web Development",
    "Mobile",
    "IT",
    "Administration",
    "Solutions Architecting",
    "Security",
    "Monitoring",
    "Observability",
    "Reliability",
    "Team Engagement",
    "Change Velocity",
    "Performant Code",
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class TextScramble {
    frameRequest = null;

    constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
    }

    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ""
            const to = newText[i] || ""
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }

    update() {
        console.debug("running update");
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update.bind(this))
            this.frame++
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

class TextListScrambler {
    constructor(list, element) {
        this.list = list;
        this.scrambler = new TextScramble(element);
        this.counter = 0;
    }

    next() {
        if (this.counter == 0) {
            shuffleArray(this.list);
        }
        this.scrambler.setText(this.list[this.counter]).then(() => {
            setTimeout(this.next.bind(this), 800)
        });
        this.counter = (this.counter + 1) % this.list.length
    }
}

window.onload = function () {
    setTimeout(() => {
        // new TextListScrambler(roles, document.querySelector("#roles")).next();
        
        const maxLength = interests.reduce((max, interest) => Math.max(max, interest.length), 0);
        const filledInterests = interests.map((interest) => {
            const spaceStr = new Array(maxLength - interest.length).fill(0).map(() => " ").join("");
            return interest + spaceStr;
        });

        new TextListScrambler(filledInterests, document.querySelector("#interests")).next();
    }, 500);
}