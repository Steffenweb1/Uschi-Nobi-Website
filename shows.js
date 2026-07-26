"use strict";

// ===== Shows (Monatswechsel) =====
const shows = [
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
  { date: "2026-09-05", location: "Diana Schützenclub e.V. - Schützenfest", time: "17:00 Uhr", address: "Altenburg 1, 96049 Bamberg" },
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
  if (!showsList || !currentMonthEl) return;
  showsList.innerHTML="";
  const monthName = new Date(currentYear,currentMonth).toLocaleString("de-DE",{month:"long"});
  currentMonthEl.textContent=`Termine für ${monthName} ${currentYear}`;
  if(tip) tip.style.display=currentMonth===startMonth?"block":"none";
  if(tipClick) tipClick.style.display=!tipClickDismissed?"block":"none"; // corrected: show unless dismissed

  const filteredShows = shows.filter(s=>{const d=new Date(s.date); return d.getMonth()===currentMonth && d.getFullYear()===currentYear;});
  if(filteredShows.length===0) showsList.innerHTML="<p>Diesen Monat sind leider schon alle Shows vorbei aber schau gerne in den nächsten <br> vielleicht gibt es einen Termin an dem wir uns sehen.</p>";
  else filteredShows.forEach(show=>{
    const d=new Date(show.date);
    const weekday=d.toLocaleDateString("de-DE",{weekday:"short"});
    const date=d.toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit"});
    const el=document.createElement("div");
    el.classList.add("show-item");
    el.innerHTML=`<div class="show-main"><div class="show-date">${weekday}. ${date}</div><div class="show-location">${show.location}</div></div><div class="show-details">${show.time?`<div>${show.time}</div>`:""}${show.address?`<div>Adresse: ${show.address}</div>`:""}${show.tickets?`<div><a href="${show.tickets}" target="_blank">Tickets</a></div>`:""}</div>`;
    const main = el.querySelector(".show-main");
    if (main) main.addEventListener("click",()=>{
      const details=el.querySelector(".show-details");
      if(tipClick && !tipClickDismissed){ tipClick.classList.add("hide"); setTimeout(()=>{ tipClick.style.display="none"; tipClickDismissed=true; },400); }
      setTimeout(()=>{ if (details) details.classList.toggle("open"); },50);
    });
    showsList.appendChild(el);
    setTimeout(()=>el.classList.add("show-slide"),50);
  });
  if (prevBtn) prevBtn.disabled=currentMonth===startMonth;
  if (nextBtn) nextBtn.disabled=currentMonth===11;
}
if(prevBtn && nextBtn){ prevBtn.addEventListener("click",()=>changeMonth(-1)); nextBtn.addEventListener("click",()=>changeMonth(1)); }
renderShows();
