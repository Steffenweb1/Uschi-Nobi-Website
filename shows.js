"use strict";

// ===== Shows (Monatswechsel) =====
const shows = [
  { date: "2026-09-05", location: "Diana Schützenclub e.V. - Schützenfest", time: "17:00 Uhr", address: "Altenburg 1, 96049 Bamberg" },
  { date: "2026-09-14", location: "Deusdorf - Kirchweih", time: "Uhrzeit wird noch bekannt gegeben", address: "Festplatz am Kirchberg, 96196 Lauter - Deusdorf" },
  { date: "2026-10-05", location: "Weinfest des Bürgervereins Hallstadt", time: "Beginn: 17:00 Uhr", address: "Jugendheim Hallstadt, Lichenfelser Str. 4- 96103 Hallstadt" },
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
