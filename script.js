// script.js

const translations = {
  cs: {
    title: "Lucien Systems — Tichý režim",
    kicker: "Tichý režim",
    headline: "Nová kapitola Lucien Systems.",
    subhead: "Veřejné okno: Q1 2026.",
    body: "Když je to důležité, napiš. Odpovíme do 72 hodin.",
    dynamicLabel: "Signál",
    dynamicWords: ["Jasnost", "Disciplína", "Přesnost", "Důvěra", "Klid", "Fokus"],
    countdownTitle: "T-Launch",
    targetDate: "Cíl: 17. 2. 2026",
    replyNote: "Odpověď do 72 hodin",
    footerTagline: "Privacy-first | Edge-native | Audit-ready",
    days: "Dny",
    hours: "Hodiny",
    minutes: "Minuty",
    seconds: "Sekundy",
    countdownFinished: "Jsme online!"
  },
  en: {
    title: "Lucien Systems — Quiet Mode",
    kicker: "Quiet mode",
    headline: "A new chapter for Lucien Systems.",
    subhead: "Public window: Q1 2026.",
    body: "If it matters, reach out. Reply within 72 hours.",
    dynamicLabel: "Signal",
    dynamicWords: ["Clarity", "Discipline", "Precision", "Trust", "Restraint", "Focus"],
    countdownTitle: "T-Launch",
    targetDate: "Target: Feb 17, 2026",
    replyNote: "Reply within 72 hours",
    footerTagline: "Privacy-first | Edge-native | Audit-ready",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    countdownFinished: "We are live!"
  },
  de: {
    title: "Lucien Systems — Ruhemodus",
    kicker: "Ruhemodus",
    headline: "Ein neues Kapitel für Lucien Systems.",
    subhead: "Öffentliches Fenster: Q1 2026.",
    body: "Wenn es wichtig ist, melden Sie sich. Antwort in 72 Stunden.",
    dynamicLabel: "Signal",
    dynamicWords: ["Klarheit", "Disziplin", "Präzision", "Vertrauen", "Respekt", "Stille"],
    countdownTitle: "T-Launch",
    targetDate: "Ziel: 17. Feb 2026",
    replyNote: "Antwort in 72 Stunden",
    footerTagline: "Privacy-first | Edge-native | Audit-ready",
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    countdownFinished: "Wir sind online!"
  },
  uk: {
    title: "Lucien Systems — Тихий режим",
    kicker: "Тихий режим",
    headline: "Нова глава для Lucien Systems.",
    subhead: "Публічне вікно: Q1 2026.",
    body: "Якщо це важливо, напишіть. Відповімо за 72 години.",
    dynamicLabel: "Сигнал",
    dynamicWords: ["Ясність", "Дисципліна", "Точність", "Довіра", "Спокій", "Фокус"],
    countdownTitle: "T-Launch",
    targetDate: "Ціль: 17 лютого 2026",
    replyNote: "Відповідь за 72 години",
    footerTagline: "Privacy-first | Edge-native | Audit-ready",
    days: "Дні",
    hours: "Години",
    minutes: "Хвилини",
    seconds: "Секунди",
    countdownFinished: "Ми онлайн!"
  },
  it: {
    title: "Lucien Systems — Modalità silenziosa",
    kicker: "Modalità silenziosa",
    headline: "Un nuovo capitolo per Lucien Systems.",
    subhead: "Finestra pubblica: Q1 2026.",
    body: "Se è importante, contattaci. Risposta entro 72 ore.",
    dynamicLabel: "Segnale",
    dynamicWords: ["Chiarezza", "Disciplina", "Precisione", "Fiducia", "Riservatezza", "Focus"],
    countdownTitle: "T-Launch",
    targetDate: "Target: 17 Feb 2026",
    replyNote: "Risposta entro 72 ore",
    footerTagline: "Privacy-first | Edge-native | Audit-ready",
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
    countdownFinished: "Siamo online!"
  },
  zh: {
    title: "Lucien Systems — 静默模式",
    kicker: "静默模式",
    headline: "Lucien Systems 的新篇章。",
    subhead: "公开窗口：2026 年 Q1。",
    body: "如属要事，请联系。72 小时内回复。",
    dynamicLabel: "信号",
    dynamicWords: ["清晰", "克制", "精准", "信任", "专注", "安静"],
    countdownTitle: "倒计时",
    targetDate: "目标：2026 年 2 月 17 日",
    replyNote: "72 小时内回复",
    footerTagline: "隐私优先 | 边缘原生 | 可审计",
    days: "天",
    hours: "小时",
    minutes: "分钟",
    seconds: "秒",
    countdownFinished: "我们已上线！"
  }
};

let currentLang = "cs";
let wordInterval = null;

const countdownDate = new Date("2026-02-17T00:00:00Z").getTime();
let countdownInterval;

function byId(id) {
  return document.getElementById(id);
}

function setFill(id, value) {
  const el = byId(id);
  if (!el) return;
  const clamped = Math.max(0, Math.min(1, value));
  el.style.setProperty("--fill", String(clamped));
}

function updateCountdown() {
  const now = Date.now();
  const distance = countdownDate - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    const grid = document.querySelector(".countdown-grid");
    if (grid) {
      grid.innerHTML = `<div class="countdown-finished">${translations[currentLang].countdownFinished}</div>`;
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = byId("days");
  const hoursEl = byId("hours");
  const minutesEl = byId("minutes");
  const secondsEl = byId("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours);
  minutesEl.textContent = String(minutes);
  secondsEl.textContent = String(seconds);

  byId("days-label").textContent = translations[currentLang].days;
  byId("hours-label").textContent = translations[currentLang].hours;
  byId("minutes-label").textContent = translations[currentLang].minutes;
  byId("seconds-label").textContent = translations[currentLang].seconds;

  setFill("days-card", Math.min(1, days / 365));
  setFill("hours-card", hours / 24);
  setFill("minutes-card", minutes / 60);
  setFill("seconds-card", seconds / 60);
}

function startWordCycle(words) {
  const wordEl = byId("dynamic-word");
  if (!wordEl || !Array.isArray(words) || !words.length) return;

  if (wordInterval) clearInterval(wordInterval);
  let idx = 0;
  wordEl.classList.remove("is-out");
  wordEl.textContent = words[0];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  wordInterval = setInterval(() => {
    wordEl.classList.add("is-out");
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      wordEl.textContent = words[idx];
      wordEl.classList.remove("is-out");
    }, 240);
  }, 2400);
}

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[currentLang];

  document.title = t.title;
  document.documentElement.lang = currentLang;

  byId("kicker").textContent = t.kicker;
  byId("main-message").textContent = t.headline;
  byId("sub-message").textContent = t.subhead;
  byId("body-message").textContent = t.body;
  byId("dynamic-label").textContent = t.dynamicLabel;
  byId("countdown-title").textContent = t.countdownTitle;
  byId("target-date").textContent = t.targetDate;
  byId("reply-note").textContent = t.replyNote;
  byId("footer-tagline").textContent = t.footerTagline;

  startWordCycle(t.dynamicWords);
  updateCountdown();

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

const langButtons = document.querySelectorAll(".lang-btn");
langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const yearEl = byId("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  setLanguage(currentLang);
  countdownInterval = setInterval(updateCountdown, 1000);
});
