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
const experience = document.getElementById('experience');
const finalSection = document.getElementById('finalSection');
const whatsappButton = document.getElementById('whatsappButton');
const floatingHearts = document.getElementById('floatingHearts');
const floatingHeartsSecondary = document.getElementById('floatingHeartsSecondary');

const captions = [
  { time: 8, text: 'A beautiful moment begins, and the world feels softer for a while.' },
  { time: 18, text: 'Some people make quiet days feel unforgettable, just by being there.' },
  { time: 32, text: 'Love has a way of turning quiet spaces into something sacred.' },
  { time: 48, text: 'And every gentle memory becomes a treasure worth holding forever.' },
  { time: 64, text: 'This is for the softness, the warmth, and the magic of being truly seen.' }
];

let shownCaptions = new Set();
let typingTimer = null;

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

function updateCoverVideo() {
  const current = song.currentTime || 0;

  if (current >= 35 && coverVideo.currentSrc !== window.location.href + 'WhatsApp%20Video%202026-07-12%20at%2012.32.44%20AM.mp4') {
    coverVideo.src = 'WhatsApp Video 2026-07-12 at 12.32.44 AM.mp4';
    coverVideo.load();
    coverVideo.play().catch(() => {});
  }
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

song.addEventListener('loadedmetadata', updatePlayerUI);
song.addEventListener('timeupdate', () => {
  updatePlayerUI();
  handleCaptions();
  updateCoverVideo();
});
song.addEventListener('play', () => {
  playBtn.style.opacity = '0.55';
  pauseBtn.style.opacity = '1';
});
song.addEventListener('pause', () => {
  playBtn.style.opacity = '1';
  pauseBtn.style.opacity = '0.55';
});
song.addEventListener('ended', () => {
  document.body.classList.add('final-active');
  finalSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

enterButton.addEventListener('click', () => {
  document.body.classList.add('experience-started');
  experience.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

whatsappButton.addEventListener('click', () => {
  const message = 'Hi Baby ❤️ I just experienced the special message you made for me. My answer is…';
  const encoded = encodeURIComponent(message);
  whatsappButton.href = `https://wa.me/233509470007?text=${encoded}`;
});

createFloatingHearts(floatingHearts, 18);
createFloatingHearts(floatingHeartsSecondary, 12);
updatePlayerUI();
