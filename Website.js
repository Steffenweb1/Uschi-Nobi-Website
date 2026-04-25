"use strict";

// ===== Burger Menü =====
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav) 
    burger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("rotate"); // <— Burger drehen
});

// Alle Links im Menü holen
const navLinks = document.querySelectorAll(".nav a");

// Wenn ein Link geklickt wird → Menü schließen + Burger zurückdrehen
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        burger.classList.remove("rotate");
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    const offsetPosition = target.offsetTop - 100;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    if (nav) nav.classList.remove("nav-open");
  });
});

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

// ===== Shows (Monatswechsel) =====
const shows = [
  { date: "2026-04-24", location: "Mühlendorf Bockbieranstich - Gasthaus Alte Mühle", time: "18:30 Uhr", address: "Brückenstraße 19 96135 Stegaurach - Mühlendorf" },
  { date: "2026-05-02", location: "Fässla Stub`n Hallstadt - Biergarten Eröffnung", time: "Uhrzeit wird noch bekannt gegeben", address: "Marktplatz 3 - 96103 Hallstadt" },
  { date: "2026-05-14", location: "Oberhaid - Feuerwehrfest", time: "Uhrzeit wird noch bekannt gegeben", address: "Blumenstraße 6, 96173 Oberhaid" },
  { date: "2026-06-04", location: "Hallstadt - Feuerwehrfest", time: "Uhrzeit wird noch bekannt gegeben", address: "An der Feuerwehr 1, 96103 Hallstadt" },
  { date: "2026-06-20", location: "Bamberg/Geisfeld - Regnitztaler Alm", time: "Uhrzeit wird noch bekannt gegeben", address: "Regnitztaler Alm 1, 96047 Bamberg" },
  { date: "2026-07-13", location: "Roßdorf am Forst - Kirchweih", time: "Beginn: 18:00 Uhr", address: "Sutte 5, 96129 Strullendorf - Roßdorf" },
  { date: "2026-07-19", location: "Bamberg Wunderburger - Kirchweih", time: "17:00 bis 21:00 Uhr", address: "Wunderburg 6, 96050 Bamberg" },
  { date: "2026-07-25", location: "Trosdorf - Stichelfest", time: "Uhrzeit wird noch bekannt gegeben", address: "96120 Trosdorf" },
  { date: "2026-07-27", location: "Hallstadt Anna - Kirchweih", time: "Beginn: 18:00 Uhr", address: "SV Hallstadt am Sportplatz, 96103 Hallstadt" },
  { date: "2026-08-08", location: "Bamberg Laurenzikirchweih - Brauerei Greifenklau", time: "17:00 bis 22:00 Uhr", address: "Laurenziplatz 20, 96049 Bamberg" },
  { date: "2026-08-09", location: "Bamberg Laurenzikirchweih - Brauerei Greifenklau", time: "17:00 bis 22:00 Uhr", address: "Laurenziplatz 20, 96049 Bamberg" },
  { date: "2026-08-15", location: "Hallstadt - Kirchweih", time: "ab 18:00 Uhr", address: "Lichtenfelser Straße 7, 96103 Hallstadt" },
  { date: "2026-08-16", location: "Hallstadt - Kirchweih", time: "ab 18:00 Uhr", address: "Lichtenfelser Straße 7, 96103 Hallstadt" },
  { date: "2026-09-14", location: "Deusdorf - Kirchweih", time: "Uhrzeit wird noch bekannt gegeben", address: "Festplatz am Kirchberg, 96196 Lauter - Deusdorf" },
  { date: "2026-10-17", location: "Hirschaid - Schützen Proklamation", time: "Beginn: 19:00 Uhr", address: "Nürnberger Str. 96 -100, 96114 Hirschaid" },
  { date: "2026-11-07", location: "Oberhaid - Burschen und Madla - Bockbieranstich", time: "Beginn: 19:00 Uhr", address: "Saal Brauerei Wagner - Bamberger Straße 2, 96173 Oberhaid" },
  { date: "2027-01-23", location: "SV Dörfleins - Fasching", time: "Beginn: 19:50 Uhr", address: "Sportlerheim SV Dörfleins - Flurstraße 6, 96103 Dörfleins" },
];

const showsList = document.getElementById("shows-list");
const currentMonthEl = document.getElementById("current-month");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const tip = document.getElementById("show-tip");
const tipClick = document.getElementById("show-tip-click");
let tipClickDismissed = false;
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const startMonth = currentMonth;

function changeMonth(direction){
  let newMonth = currentMonth+direction;
  if(newMonth<0||newMonth>11) return;
  if(newMonth<startMonth) return;
  currentMonth=newMonth;
  renderShows();
}
function renderShows(){
  showsList.innerHTML="";
  const monthName = new Date(currentYear,currentMonth).toLocaleString("de-DE",{month:"long"});
  currentMonthEl.textContent=`Termine für ${monthName} ${currentYear}`;
  if(tip) tip.style.display=currentMonth===startMonth?"block":"none";
  if(tipClick) tipClick.style.display=!tipClickDismissed?"block":"none";

  const filteredShows = shows.filter(s=>{const d=new Date(s.date); return d.getMonth()===currentMonth && d.getFullYear()===currentYear;});
  if(filteredShows.length===0) showsList.innerHTML="<p>Diesen Monat sind leider schon alle Shows vorbei aber schau gerne in den nächsten <br> vielleicht gibt es einen Termin an dem wir uns sehen.</p>";
  else filteredShows.forEach(show=>{
    const d=new Date(show.date);
    const weekday=d.toLocaleDateString("de-DE",{weekday:"short"});
    const date=d.toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit"});
    const el=document.createElement("div");
    el.classList.add("show-item");
    el.innerHTML=`<div class="show-main"><div class="show-date">${weekday}. ${date}</div><div class="show-location">${show.location}</div></div><div class="show-details">${show.time?`<div>${show.time}</div>`:""}${show.address?`<div>Adresse: ${show.address}</div>`:""}${show.tickets?`<div><a href="${show.tickets}" target="_blank">Tickets</a></div>`:""}</div>`;
    el.querySelector(".show-main").addEventListener("click",()=>{
      const details=el.querySelector(".show-details");
      if(tipClick && !tipClickDismissed){ tipClick.classList.add("hide"); setTimeout(()=>{ tipClick.style.display="none"; tipClickDismissed=true; },400); }
      setTimeout(()=>{ details.classList.toggle("open"); },50);
    });
    showsList.appendChild(el);
    setTimeout(()=>el.classList.add("show-slide"),50);
  });
  prevBtn.disabled=currentMonth===startMonth;
  nextBtn.disabled=currentMonth===11;
  prevBtn.style.backgroundColor=prevBtn.disabled?"#ccc":"#ff4b4b";
  prevBtn.style.color=prevBtn.disabled?"#666":"white";
  nextBtn.style.backgroundColor=nextBtn.disabled?"#ccc":"#ff4b4b";
  nextBtn.style.color=nextBtn.disabled?"#666":"white";
}
if(prevBtn && nextBtn){ prevBtn.addEventListener("click",()=>changeMonth(-1)); nextBtn.addEventListener("click",()=>changeMonth(1)); }
renderShows();

// ===== LIGHTBOX (Galerie + Logo) =====
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = document.getElementById("gallery-lightbox-img");
const lightboxCaption = document.getElementById("gallery-caption");
const lightboxPrev = document.getElementById("gallery-prev");
const lightboxNext = document.getElementById("gallery-next");

// Alle Bilder, die die Lightbox auslösen
const lightboxImages = [
  ...document.querySelectorAll(".lightbox-trigger:not(.lightbox-trigger-logo)")];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = lightboxImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.dataset.caption || "";
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

// Klick auf ein Bild öffnet die Lightbox
lightboxImages.forEach((img, i) => {
  img.addEventListener("click", () => openLightbox(i));
});

// Vor-/Zurück-Buttons kreisförmig
lightboxPrev.addEventListener("click", e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  openLightbox(currentIndex);
});
lightboxNext.addEventListener("click", e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  openLightbox(currentIndex);
});

// Klick auf Overlay schließt Lightbox
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

//Gorße Galarie Close Button
document.getElementById("gallery-close").addEventListener("click", () => {
  lightbox.style.display = "none";



});


// ===== Tastatursteuerung =====
document.addEventListener("keydown", e => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
      openLightbox(currentIndex);
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % lightboxImages.length;
      openLightbox(currentIndex);
    }
  }
});

document.addEventListener("scroll", () => {
    const insta = document.querySelector(".insta-float");

    if (window.scrollY > 200) { 
        insta.classList.add("scrolled");
    } else {
        insta.classList.remove("scrolled");
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

logoImg.addEventListener("click", () => {
  logoLightboxImg.src = logoImg.src;
  logoLightboxCaption.textContent = logoImg.dataset.caption || "";
  logoLightbox.style.display = "flex";
});

logoLightbox.addEventListener("click", e => {
  if (e.target === logoLightbox) logoLightbox.style.display = "none";
});

//Kleine Garalie Close Button
document.getElementById("logo-close").addEventListener("click", () => {
  logoLightbox.style.display = "none";
});