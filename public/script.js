const eventsDiv = document.getElementById('events');
const dateInput = document.getElementById('date-input');
const dateTitle = document.getElementById('date-title');

const ASTRO_KEYWORDS = [
  'astronomy', 'space', 'moon', 'solar', 'lunar', 'galaxy', 'planet', 'comet',
  'asteroid', 'meteor', 'nebula', 'satellite', 'launch', 'rocket', 'telescope'
];

function isAstroEvent(text) {
  return ASTRO_KEYWORDS.some(keyword => text.toLowerCase().includes(keyword));
}

async function fetchEvents(month, day) {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
  const data = await res.json();
  return data.events.filter(e => isAstroEvent(e.text));
}

function renderEvents(events, dateStr) {
  eventsDiv.innerHTML = '';
  dateTitle.textContent = `🚀 Astronomical Events on ${dateStr}`;
  if (events.length === 0) {
    eventsDiv.innerHTML = '<p>No astronomical events found.</p>';
    return;
  }
  events.forEach(evt => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${evt.year}</h3>
      <p>${evt.text}</p>
      ${evt.pages?.[0]?.content_urls?.desktop?.page ? `<a href="${evt.pages[0].content_urls.desktop.page}" target="_blank">Read more</a>` : ''}
    `;
    eventsDiv.appendChild(card);
  });
}

function loadToday() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateStr = `${month}/${day}`;
  fetchEvents(month, day).then(events => renderEvents(events, dateStr));
}

dateInput.addEventListener('change', e => {
  const date = new Date(e.target.value);
  if (isNaN(date)) return;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = `${month}/${day}`;
  fetchEvents(month, day).then(events => renderEvents(events, dateStr));
});

loadToday();
