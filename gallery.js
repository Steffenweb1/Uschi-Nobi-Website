"use strict";

// ===== LIGHTBOX (Galerie + Logo) =====
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = document.getElementById("gallery-lightbox-img");
const lightboxCaption = document.getElementById("gallery-caption");
const lightboxPrev = document.getElementById("gallery-prev");
const lightboxNext = document.getElementById("gallery-next");

const lightboxImages = [...document.querySelectorAll(".lightbox-trigger:not(.lightbox-trigger-logo)")];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = lightboxImages[currentIndex];
  if (!img || !lightbox || !lightboxImg) return;
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.dataset.caption || "";
  lightbox.style.display = "flex";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = "none";
}

lightboxImages.forEach((img, i) => {
  img.addEventListener("click", () => openLightbox(i));
});

// Button "Weitere Bilder ansehen"
const galleryToggleBtn = document.getElementById("gallery-toggle");
if (galleryToggleBtn) {
  galleryToggleBtn.addEventListener("click", () => {
    const firstHiddenImg = document.querySelector(".gallery-pool-hidden .lightbox-trigger");
    if (!firstHiddenImg) return;
    const index = lightboxImages.indexOf(firstHiddenImg);
    if (index > -1) openLightbox(index);
  });
}

// Tastatur-Zugriff: Enter/Space auf dem Galerie-Kästchen öffnet die Lightbox
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const img = item.querySelector(".lightbox-trigger");
      const index = lightboxImages.indexOf(img);
      if (index > -1) openLightbox(index);
    }
  });
});

// Vor-/Zurück-Buttons
if (lightboxPrev) lightboxPrev.addEventListener("click", e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  openLightbox(currentIndex);
});
if (lightboxNext) lightboxNext.addEventListener("click", e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  openLightbox(currentIndex);
});

if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
}

const galleryCloseBtn = document.getElementById("gallery-close");
if (galleryCloseBtn) galleryCloseBtn.addEventListener("click", () => { if (lightbox) lightbox.style.display = "none"; });

// ===== Tastatursteuerung für Lightbox =====
document.addEventListener("keydown", e => {
  if (!lightbox || lightbox.style.display !== "flex") return;
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    openLightbox(currentIndex);
  } else if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % lightboxImages.length;
    openLightbox(currentIndex);
  }
});

// ===== LIGHTBOX FÜR DAS LOGO =====
const logoLightbox = document.createElement("div");
logoLightbox.className = "lightbox";
logoLightbox.style.display = "none";
logoLightbox.innerHTML = `
  <div class="lightbox-close" id="logo-close">×</div>
  <img id="logo-lightbox-img" style="max-width:90vw; max-height:80vh; object-fit:contain;">
  <div id="logo-lightbox-caption" class="gallery-caption"></div>
`;
document.body.appendChild(logoLightbox);

const logoImg = document.querySelector(".lightbox-trigger-logo");
const logoLightboxImg = document.getElementById("logo-lightbox-img");
const logoLightboxCaption = document.getElementById("logo-lightbox-caption");

if (logoImg) {
  logoImg.addEventListener("click", () => {
    if (!logoLightboxImg || !logoLightbox) return;
    logoLightboxImg.src = logoImg.src;
    logoLightboxCaption.textContent = logoImg.dataset.caption || "";
    logoLightbox.style.display = "flex";
  });
}

logoLightbox.addEventListener("click", e => {
  if (e.target === logoLightbox) logoLightbox.style.display = "none";
});

const logoClose = document.getElementById("logo-close");
if (logoClose) logoClose.addEventListener("click", () => { logoLightbox.style.display = "none"; });
