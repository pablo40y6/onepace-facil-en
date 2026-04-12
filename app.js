const STORAGE_KEY = 'onepace-facil-en-current-index-v1';

const episodes = [
  { title: 'Romance Dawn', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/LC22RWvq' },
  { title: 'Orange Town', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/DB6yzXoa' },
  { title: 'Syrup Village', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/WN5T2jSr' },
  { title: 'Gaimon', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/phZ3h3bW' },
  { title: 'Baratie', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/hPQyyjTf' },
  { title: 'Arlong Park', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/gXjJTaYK' },
  { title: 'The Adventures of Buggy\'s Crew', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/FqWWwsFD' },
  { title: 'Loguetown', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/sng6aHYQ' },
  { title: 'Reverse Mountain', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/Gxeezgxo' },
  { title: 'Whisky Peak', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/5d4WRz1y' },
  { title: 'The Trials of Koby-Meppo', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/81KWfWcq' },
  { title: 'Little Garden', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/uGAb7TWj' },
  { title: 'Drum Island', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/4juJksu7' },
  { title: 'Alabasta', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/t8zvG6gH' },
  { title: 'Jaya', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/P6mnmZpN' },
  { title: 'Skypiea', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/1bDwFCf9' },
  { title: 'Long Ring Long Land', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/7ky9W8GE' },
  { title: 'Water Seven', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/o8YkGt9i' },
  { title: 'Enies Lobby', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/PxxTYRGz' },
  { title: 'Post-Enies Lobby', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/upyN5vVk' },
  { title: 'Thriller Bark', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/Cq9faLGv' },
  { title: 'Sabaody Archipelago', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/jhpKUqF8' },
  { title: 'Amazon Lily', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/Bsr9gKsn' },
  { title: 'Impel Down', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/y5ywnHdF' },
  { title: 'If You Could Go Anywhere... The Adventures of the Straw Hats', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/QWXq5X3x' },
  { title: 'Marineford', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/uFuFpnpi' },
  { title: 'Post-War', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/7EANMSA7' },
  { title: 'Return to Sabaody', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/igysH62b' },
  { title: 'Fishman Island', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/o6ZzNwzp' },
  { title: 'Punk Hazard', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/wJoipMZu' },
  { title: 'Dressrosa', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/DMuj2Pqe' },
  { title: 'Zou', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/nSkEY2Cq' },
  { title: 'Whole Cake Island', meta: 'Sub EN · 720p', url: 'https://pixeldrain.net/l/phsTwRmF' },
  { title: 'Reverie', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/Md2atmnr' },
  { title: 'Wano', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/6rSQPvNJ' },
  { title: 'Egghead', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/PRTmztoz' },
  { title: 'Special: One Piece Fan Letter', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/JGkNAa1V' },
  { title: 'Special: Warship Island 01 (April Fools 2025)', meta: 'Sub EN · 480p', url: 'https://pixeldrain.net/l/YTERtTLz' }
];

let currentIndex = loadIndex();
let deferredPrompt = null;

const progressText = document.getElementById('progressText');
const episodeTitle = document.getElementById('episodeTitle');
const episodeMeta = document.getElementById('episodeMeta');
const episodeNote = document.getElementById('episodeNote');
const openBtn = document.getElementById('openBtn');
const doneBtn = document.getElementById('doneBtn');
const skipBtn = document.getElementById('skipBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const jumpSelect = document.getElementById('jumpSelect');
const jumpBtn = document.getElementById('jumpBtn');
const unavailableBox = document.getElementById('unavailableBox');
const listContainer = document.getElementById('listContainer');
const installBtn = document.getElementById('installBtn');

function loadIndex() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(saved) && saved >= 0 && saved < episodes.length) return saved;
  return 0;
}

function saveIndex() {
  localStorage.setItem(STORAGE_KEY, String(currentIndex));
}

function currentEpisode() {
  return episodes[currentIndex] || episodes[0];
}

function moveTo(index) {
  currentIndex = Math.max(0, Math.min(index, items.length - 1));
  saveIndex();
  render();

  requestAnimationFrame(() => {
    currentCard?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function render() {
  const item = currentEpisode();
  const isAvailable = item.available !== false && !!item.url;

  progressText.textContent = `Punto ${currentIndex + 1} de ${episodes.length}`;
  episodeTitle.textContent = item.title;
  episodeMeta.textContent = item.meta || '';
  episodeNote.textContent = item.note || 'Se ha elegido la menor calidad disponible para maximizar compatibilidad y cantidad de enlaces.';

  openBtn.classList.toggle('hidden', !isAvailable);
  doneBtn.classList.toggle('hidden', false);
  unavailableBox.classList.toggle('hidden', isAvailable);
  doneBtn.textContent = currentIndex >= episodes.length - 1 ? 'Terminado' : 'Ya lo he visto';

  jumpSelect.value = String(currentIndex);
  renderList();
}

function renderList() {
  listContainer.innerHTML = '';
  episodes.forEach((item, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'list-item';
    if (index === currentIndex) card.classList.add('current');
    if (index < currentIndex) card.classList.add('done');

    let badge = '';
    if (index === currentIndex) badge = '<span class="badge current">Actual</span>';
    else if (index < currentIndex) badge = '<span class="badge done">Visto</span>';

    card.innerHTML = `
      <div class="list-top">
        <strong>${index + 1}. ${escapeHtml(item.title)}</strong>
        ${badge}
      </div>
      <div class="list-meta">${escapeHtml(item.meta || '')}</div>
    `;
    card.addEventListener('click', () => moveTo(index));
    listContainer.appendChild(card);
  });
}

function fillJumpSelect() {
  jumpSelect.innerHTML = '';
  episodes.forEach((item, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `${index + 1}. ${item.title}`;
    jumpSelect.appendChild(option);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

openBtn.addEventListener('click', () => {
  const item = currentEpisode();
  if (item.url) window.location.href = item.url;
});

doneBtn.addEventListener('click', () => {
  if (currentIndex < episodes.length - 1) moveTo(currentIndex + 1);
});

skipBtn.addEventListener('click', () => {
  if (currentIndex < episodes.length - 1) moveTo(currentIndex + 1);
});

prevBtn.addEventListener('click', () => moveTo(currentIndex - 1));
nextBtn.addEventListener('click', () => moveTo(currentIndex + 1));

jumpBtn.addEventListener('click', () => moveTo(Number(jumpSelect.value)));

resetBtn.addEventListener('click', () => {
  if (window.confirm('Se reiniciara el progreso.')) {
    moveTo(0);
  }
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add('hidden');
});

fillJumpSelect();
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
