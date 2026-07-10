// =========================================================
// عناصر الصفحة
// =========================================================
const gate         = document.getElementById('gate');
const enterBtn     = document.getElementById('enterBtn');
const stage        = document.getElementById('stage');
const moon         = document.getElementById('moon');
const stars        = document.getElementById('stars');
const scene1Img    = document.querySelector('#scene-1 .scene-img');
const scene2Img    = document.querySelector('#scene-2 .scene-img');
const titleBlock   = document.getElementById('titleBlock');
const tapHint      = document.querySelector('.tap-hint');
const musicBtn     = document.getElementById('musicBtn');
const petalsWrap   = document.getElementById('petals');
const pawTrail     = document.getElementById('pawTrail');
const portraitBtn  = document.getElementById('portraitBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');

const sfxWind      = document.getElementById('sfxWind');
const sfxHowl      = document.getElementById('sfxHowl');
const sfxForest    = document.getElementById('sfxForest');
const sfxAmbient   = document.getElementById('sfxAmbient');
const musicFav     = document.getElementById('musicFav');

// =========================================================
// تشغيل آمن للصوت
// =========================================================
function safePlay(audio, options = {}) {
  if (!audio) return;

  if (options.volume !== undefined) {
    audio.volume = options.volume;
  }

  audio.play().catch((error) => {
    console.error('تعذر تشغيل ملف الصوت:', audio.src, error);
  });
}

function safePause(audio) {
  if (!audio) return;

  audio.pause();
}

// =========================================================
// توليد النجوم المتلألئة
// =========================================================
function buildStars(count = 60) {
  if (!stars) return;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');

    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';

    stars.appendChild(star);
  }
}

buildStars();

// =========================================================
// بتلات الورد المتساقطة
// =========================================================
let petalsInterval = null;

function startPetals() {
  if (!petalsWrap || petalsInterval) return;

  petalsInterval = setInterval(() => {
    const petal = document.createElement('div');
    const duration = 6 + Math.random() * 6;
    const size = 6 + Math.random() * 8;

    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = duration + 's';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    petalsWrap.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, duration * 1000 + 500);
  }, 500);
}

// =========================================================
// آثار أقدام الذئب خلف مؤشر الفأرة
// =========================================================
let lastPaw = 0;

function addPaw(x, y) {
  if (!pawTrail) return;

  const now = Date.now();

  if (now - lastPaw < 220) return;

  lastPaw = now;

  const paw = document.createElement('div');

  paw.className = 'paw';
  paw.textContent = '🐾';
  paw.style.left = x + 'px';
  paw.style.top = y + 'px';
  paw.style.transform =
    'rotate(' + (Math.random() * 40 - 20) + 'deg)';

  pawTrail.appendChild(paw);

  setTimeout(() => {
    paw.remove();
  }, 1800);
}

document.addEventListener('mousemove', (event) => {
  addPaw(event.clientX, event.clientY);
});

document.addEventListener(
  'touchmove',
  (event) => {
    const touch = event.touches[0];

    if (!touch) return;

    addPaw(touch.clientX, touch.clientY);
  },
  { passive: true }
);

// =========================================================
// التسلسل السينمائي الرئيسي
// =========================================================
function runTimeline() {
  if (stage) {
    stage.setAttribute('aria-hidden', 'false');
  }

  safePlay(sfxWind, { volume: 0.35 });

  setTimeout(() => {
    if (moon) {
      moon.classList.add('on');
    }
  }, 300);

  setTimeout(() => {
    safePlay(sfxHowl, { volume: 0.7 });
  }, 1000);

  setTimeout(() => {
    safePlay(sfxForest, { volume: 0.25 });
  }, 1200);

  setTimeout(() => {
    if (scene1Img) {
      scene1Img.classList.add('in');
    }
  }, 3000);

  setTimeout(() => {
    safePlay(sfxAmbient, { volume: 0.2 });
  }, 6500);

  setTimeout(() => {
    if (scene2Img) {
      scene2Img.classList.add('in');
    }
  }, 7000);

  setTimeout(() => {
    startPetals();
  }, 7400);

  setTimeout(() => {
    if (titleBlock) {
      titleBlock.classList.add('in');
    }
  }, 9000);

  setTimeout(() => {
    // هذا العنصر غير موجود في HTML عندك، لذلك يجب فحصه
    if (tapHint) {
      tapHint.classList.add('in');
    }

    if (musicBtn) {
      musicBtn.classList.add('in');
    }
  }, 10200);
}

// =========================================================
// زر الدخول
// =========================================================
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    if (gate) {
      gate.classList.add('hidden');

      setTimeout(() => {
        gate.style.display = 'none';
      }, 1500);
    }

    runTimeline();
  });
}

// =========================================================
// زر تشغيل الأغنية المفضلة
// =========================================================
if (musicBtn && musicFav) {
  musicBtn.addEventListener('click', () => {
    if (musicFav.paused) {
      // إيقاف موسيقى الخلفية أثناء تشغيل الأغنية
      safePause(sfxAmbient);

      musicFav.volume = 0.6;

      musicFav
        .play()
        .then(() => {
          musicBtn.textContent = '⏸ Pause Song';
          musicBtn.classList.add('playing');
        })
        .catch((error) => {
          console.error('لم يتم تشغيل الأغنية:', error);
          console.error('مسار الأغنية:', musicFav.src);

          musicBtn.textContent = '⚠ Song Not Found';

          setTimeout(() => {
            musicBtn.textContent = '🎵 Play Favorite Song';
          }, 2000);
        });
    } else {
      musicFav.pause();

      musicBtn.textContent = '🎵 Play Favorite Song';
      musicBtn.classList.remove('playing');

      safePlay(sfxAmbient, { volume: 0.2 });
    }
  });
}

// =========================================================
// نافذة الرسالة الذهبية
// =========================================================
if (portraitBtn && modalOverlay) {
  portraitBtn.addEventListener('click', () => {
    modalOverlay.classList.add('open');
  });
}

if (modalClose && modalOverlay) {
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay) {
    modalOverlay.classList.remove('open');
  }
});