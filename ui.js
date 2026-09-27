"use strict";

// ===== Dark Mode =====
const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = themeToggle ? themeToggle.querySelector(".theme-toggle-icon") : null;

function applyThemeIcon(theme) {
  if (themeToggleIcon) themeToggleIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Beim Laden: Icon passend zum bereits gesetzten data-theme anzeigen
applyThemeIcon(document.documentElement.getAttribute("data-theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    applyThemeIcon(next);
  });
}

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
systemThemeQuery.addEventListener("change", (e) => {
  if (localStorage.getItem("theme")) return;
  const theme = e.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  applyThemeIcon(theme);
});

// ===== Burger Menü =====
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav)
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    burger.classList.toggle("rotate");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (!nav || !burger) return;
    nav.classList.remove("nav-open");
    burger.classList.remove("rotate");
    burger.setAttribute("aria-expanded", "false");
  });
});

// ===== Smooth Scroll =====
const siteHeader = document.querySelector("header");

function getHeaderOffset() {
  return (siteHeader ? siteHeader.getBoundingClientRect().height : 0) + 16;
}

document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    const offsetPosition = target.offsetTop - getHeaderOffset();
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    if (nav) nav.classList.remove("nav-open");
  });
});

// ===== Instagram-Button im Hero-Bereich einblenden =====
const instaFloat = document.querySelector(".insta-float");
const heroSection = document.getElementById("home");
if (instaFloat && heroSection) {
  const updateInstaVisibility = () => {
    const heroBounds = heroSection.getBoundingClientRect();
    const buttonPosition = window.innerHeight / 2;
    instaFloat.classList.toggle(
      "is-visible",
      heroBounds.top <= buttonPosition && heroBounds.bottom >= buttonPosition
    );
  };

  updateInstaVisibility();
  window.addEventListener("scroll", updateInstaVisibility, { passive: true });
  window.addEventListener("resize", updateInstaVisibility);
}

// ===== Fade-In Sections =====
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});
faders.forEach(el => observer.observe(el));
