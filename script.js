// Romantic interactive experience for Stephanie.
const song = document.getElementById('song');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const captionDisplay = document.getElementById('captionDisplay');
const enterButton = document.getElementById('enterButton');
const coverVideo = document.getElementById('coverVideo');
const experiencePages = document.getElementById('experiencePages');
const finalSection = document.getElementById('finalSection');
const whatsappButton = document.getElementById('whatsappButton');
const floatingHearts = document.getElementById('floatingHearts');
const floatingHeartsSecondary = document.getElementById('floatingHeartsSecondary');
const toFinalButton = document.getElementById('toFinalButton');
const musicPage = document.getElementById('musicPage');
const finalPage = document.getElementById('finalPage');

const captions = [
  { time: 8, text: 'There are moments that quietly change the way we see everything.' },
  { time: 18, text: 'And then you realize how deeply someone has become a part of your heart.' },
  { time: 32, text: 'Love can survive distance, silence, and the long stretches between conversations.' },
  { time: 48, text: 'It lives in the memory of your smile, the comfort of your voice, and the peace of being known.' },
  { time: 64, text: 'And when the world feels uncertain, you still know who your heart would choose.' }
];

let shownCaptions = new Set();
let typingTimer = null;
let coverVideoIndex = 0;
const coverVideoSources = [
  'video of stephanie1.mp4',
  'video of myself 1.mp4'
];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updatePlayerUI() {
  const current = song.currentTime || 0;
  const duration = song.duration || 0;
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
  progress.value = duration ? (current / duration) * 100 : 0;
}

function displayCaption(text) {
  if (typingTimer) {
    clearTimeout(typingTimer);
  }

  captionDisplay.innerHTML = '';
  const span = document.createElement('p');
  span.className = 'caption-text';
  captionDisplay.appendChild(span);

  let index = 0;
  span.textContent = '';

  function type() {
    if (index < text.length) {
      span.textContent += text[index];
      index += 1;
      typingTimer = setTimeout(type, 24);
    }
  }

  type();
}

function handleCaptions() {
  const current = song.currentTime;
  captions.forEach((caption) => {
    if (current >= caption.time && !shownCaptions.has(caption.time)) {
      shownCaptions.add(caption.time);
      displayCaption(caption.text);
    }
  });
}

function switchCoverVideo() {
  coverVideoIndex = (coverVideoIndex + 1) % coverVideoSources.length;
  coverVideo.src = coverVideoSources[coverVideoIndex];
  coverVideo.load();
  coverVideo.play().catch(() => {});
}

function createFloatingHearts(container, count = 18) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = '♡';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`;
    heart.style.opacity = `${0.25 + Math.random() * 0.5}`;
    container.appendChild(heart);
  }
}

function showPage(pageId) {
  const pages = [musicPage, finalPage];
  pages.forEach((page) => page.classList.remove('active'));
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  if (pageId === 'finalPage') {
    document.body.classList.add('final-active');
  } else {
    document.body.classList.remove('final-active');
  }
}

playBtn.addEventListener('click', async () => {
  try {
    await song.play();
  } catch (error) {
    console.error('Playback failed:', error);
  }
});

pauseBtn.addEventListener('click', () => {
  song.pause();
});

progress.addEventListener('input', () => {
  if (!song.duration) return;
  const newTime = (Number(progress.value) / 100) * song.duration;
  song.currentTime = newTime;
  updatePlayerUI();
});

coverVideo.addEventListener('ended', switchCoverVideo);

song.addEventListener('loadedmetadata', updatePlayerUI);
song.addEventListener('timeupdate', () => {
  updatePlayerUI();
  handleCaptions();
});
song.addEventListener('play', () => {
  playBtn.style.opacity = '0.55';
  pauseBtn.style.opacity = '1';
  coverVideo.play().catch(() => {});
});
song.addEventListener('pause', () => {
  playBtn.style.opacity = '1';
  pauseBtn.style.opacity = '0.55';
  coverVideo.pause();
});
song.addEventListener('ended', () => {
  showPage('finalPage');
});

enterButton.addEventListener('click', () => {
  document.body.classList.add('experience-started');
  showPage('musicPage');
  window.scrollTo({ top: 0, behavior: 'auto' });
});

toFinalButton.addEventListener('click', () => {
  showPage('finalPage');
});

whatsappButton.addEventListener('click', () => {
  whatsappButton.href = 'https://wa.me/233509470007';
});

createFloatingHearts(floatingHearts, 18);
createFloatingHearts(floatingHeartsSecondary, 12);
updatePlayerUI();
