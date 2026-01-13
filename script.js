// script.js

// --- Translations ---
const translations = {
    cs: {
        mainMessage: "Připravujeme něco velkého:",
        dynamicWords: ["Inovaci", "Růst", "Expanzi", "Technologie", "Budoucnost", "Vizi"],
        tagline: "Nová éra začíná již brzy. Naše webové stránky procházejí finálními úpravami.",
        days: "Dny",
        hours: "Hodiny",
        minutes: "Minuty",
        seconds: "Sekundy",
        emailPrefix: "E-mail:",
        countdownFinished: "Již jsme online!"
    },
    en: {
        mainMessage: "Preparing something big:",
        dynamicWords: ["Innovation", "Growth", "Expansion", "Technology", "Future", "Vision"],
        tagline: "A new era begins soon. Our website is undergoing final adjustments.",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        emailPrefix: "E-mail:",
        countdownFinished: "We are live!"
    },
    de: {
        mainMessage: "Wir bereiten etwas Großes vor:",
        dynamicWords: ["Innovation", "Wachstum", "Expansion", "Technologie", "Zukunft", "Vision"],
        tagline: "Eine neue Ära beginnt bald. Unsere Website wird finalisiert.",
        days: "Tage",
        hours: "Stunden",
        minutes: "Minuten",
        seconds: "Sekunden",
        emailPrefix: "E-Mail:",
        countdownFinished: "Wir sind online!"
    },
    uk: {
        mainMessage: "Готуємо щось грандіозне:",
        dynamicWords: ["Інновації", "Зростанням", "Експансією", "Технологіями", "Майбутнім", "Баченням"],
        tagline: "Нова ера розпочнеться незабаром. Наш веб-сайт проходить фінальні налаштування.",
        days: "Дні",
        hours: "Години",
        minutes: "Хвилини",
        seconds: "Секунди",
        emailPrefix: "Електронна пошта:",
        countdownFinished: "Ми вже онлайн!"
    },
    it: {
        mainMessage: "Stiamo preparando qualcosa di grande:",
        dynamicWords: ["Innovazione", "Crescita", "Espansione", "Tecnologia", "Futuro", "Visione"],
        tagline: "Una nuova era inizierà presto. Il nostro sito web sta subendo le ultime modifiche.",
        days: "Giorni",
        hours: "Ore",
        minutes: "Minuti",
        seconds: "Secondi",
        emailPrefix: "E-mail:",
        countdownFinished: "Siamo online!"
    },
    zh: {
        mainMessage: "我们正在酝酿大计划:",
        dynamicWords: ["创新", "成长", "扩张", "科技", "未来", "愿景"],
        tagline: "新时代即将开启。我们的网站正在进行最后的调整。",
        days: "天",
        hours: "小时",
        minutes: "分钟",
        seconds: "秒",
        emailPrefix: "电子邮件:",
        countdownFinished: "我们上线了！"
    }
};

let currentLang = 'cs'; // Default language

// --- TextScramble Class ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// --- Countdown Logic ---
const countdownDate = new Date('Feb 17, 2026 00:00:00').getTime();
let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;

    document.getElementById('days-label').innerHTML = translations[currentLang].days;
    document.getElementById('hours-label').innerHTML = translations[currentLang].hours;
    document.getElementById('minutes-label').innerHTML = translations[currentLang].minutes;
    document.getElementById('seconds-label').innerHTML = translations[currentLang].seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = `<div class="countdown-finished">${translations[currentLang].countdownFinished}</div>`;
    }
}

// --- Language Switching ---
const flagIcons = document.querySelectorAll('.flag-icon');

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('main-message').innerHTML = translations[currentLang].mainMessage;

    // Initialize/Re-initialize TextScramble for dynamic-word
    const dynamicWordEl = document.getElementById('dynamic-word');
    if (dynamicWordEl) {
        fx = new TextScramble(dynamicWordEl);
        scrambleWords = translations[currentLang].dynamicWords;
        // Stop any existing interval before starting a new one
        if (updateDynamicWordInterval) {
            clearInterval(updateDynamicWordInterval);
        }
        wordIndex = 0; // Reset word index on language change
        fx.setText(scrambleWords[wordIndex % scrambleWords.length]).then(() => {
            wordIndex++;
            updateDynamicWordInterval = setInterval(() => {
                fx.setText(scrambleWords[wordIndex % scrambleWords.length]);
                wordIndex++;
            }, 3000);
        });
    } else {
        console.error("Element with ID 'dynamic-word' not found.");
    }

    // Update countdown labels
    updateCountdown();

    // Update contact info email text
    document.querySelector('.contact-info p').innerHTML = `${translations[currentLang].emailPrefix} <a href="mailto:adam.karl.lucien@luciensystems.io">adam.karl.lucien@luciensystems.io</a>`;

    // Update active flag
    flagIcons.forEach(icon => icon.classList.remove('active'));
    document.querySelector(`.flag-icon[data-lang="${lang}"]`).classList.add('active');

    // Update page title
    document.title = `LUCIEN SYSTEMS LLC - ${translations[currentLang].mainMessage}`;
}

flagIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const lang = icon.dataset.lang;
        setLanguage(lang);
    });
});





// --- Particle Animation ---
const particleContainer = document.getElementById('particle-container');
const particleCount = 70; // Number of particles
const particleColors = ['#3f51b5', '#5c6bc0', '#7986cb']; // Shades of indigo blue

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particleContainer.appendChild(particle);

    const size = Math.random() * 5 + 3; // Size between 3 and 8px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`; // Start from bottom
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // Duration 5-15s
    particle.style.animationDelay = `-${Math.random() * 10}s`; // Start with some particles already in motion
    particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];

    particle.addEventListener('animationend', () => {
        particle.remove();
        createParticle(); // Recreate particle when one animation ends
    });
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}


// --- Development Animation (Icon-based Growth) ---
const growthAnimationContainer = document.getElementById('growth-animation-container');
const growthIcons = [
    'fas fa-user',        // Individual
    'fas fa-users',       // Small team
    'fas fa-sitemap',     // Organization/structure
    'fas fa-building',    // Company
    'fas fa-globe'        // Global player
];
let currentGrowthStage = 0;

function initGrowthAnimation() {
    growthAnimationContainer.innerHTML = ''; // Clear previous icons
    const iconElement = document.createElement('i');
    iconElement.className = `growth-icon ${growthIcons[currentGrowthStage]}`;
    growthAnimationContainer.appendChild(iconElement);
    // Trigger initial animation for the first icon
    setTimeout(() => {
        iconElement.classList.add('stage-1');
    }, 50);
}

function animateGrowthIcons() {
    setInterval(() => {
        currentGrowthStage = (currentGrowthStage + 1) % growthIcons.length;
        growthAnimationContainer.innerHTML = ''; // Clear previous icon

        const iconElement = document.createElement('i');
        iconElement.className = `growth-icon ${growthIcons[currentGrowthStage]}`;
        growthAnimationContainer.appendChild(iconElement);

        // Trigger animation for the new icon
        setTimeout(() => {
            iconElement.classList.add('stage-1');
        }, 50);

    }, 2500); // Change icon every 2.5 seconds
}

window.addEventListener('resize', initGrowthAnimation); // Re-init on resize, if icons are responsive

// --- Main Initialization ---
let scrambleWords = translations[currentLang].dynamicWords;
let wordIndex = 0;
let fx; // fx declared globally here
let updateDynamicWordInterval; // Declare globally

document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // Set initial language (this will also initialize TextScramble)
    setLanguage(currentLang);

    // Initialize particles
    initParticles();

    // Initialize growth animation
    initGrowthAnimation();
    animateGrowthIcons();
});
