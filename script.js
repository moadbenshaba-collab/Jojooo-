// ── AUDIO ENGINE ──
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx, masterGain, audioMuted = false;

function initAudio() {
  if (audioCtx) return;
  audioCtx = new AudioCtx();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.45;
  masterGain.connect(audioCtx.destination);
  startPianoLoop();
}

function toggleAudio() {
  if (!audioCtx) { initAudio(); return; }
  audioMuted = !audioMuted;
  masterGain.gain.setTargetAtTime(audioMuted ? 0 : 0.45, audioCtx.currentTime, 0.3);
  document.getElementById('audioBtn').textContent = audioMuted ? '🔇' : '🎵';
}

const MELODY = [
  [523.25,0.5],[659.25,0.5],[783.99,0.75],[659.25,0.25],
  [587.33,0.5],[523.25,0.5],[440.00,1.0],
  [392.00,0.5],[523.25,0.5],[659.25,0.75],[587.33,0.25],
  [523.25,0.5],[440.00,0.5],[392.00,1.25],
  [349.23,0.5],[440.00,0.5],[523.25,0.5],[587.33,0.5],
  [659.25,0.75],[783.99,0.25],[880.00,1.0],
  [783.99,0.5],[659.25,0.5],[587.33,0.5],[523.25,0.5],
  [440.00,0.75],[392.00,0.25],[349.23,1.5]
];

function playNote(freq, startTime, duration, gain = 0.18) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const env = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, startTime);
  env.gain.linearRampToValueAtTime(gain, startTime + 0.04);
  env.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.9);
  osc.connect(env); env.connect(masterGain);
  osc.start(startTime); osc.stop(startTime + duration);
}

function startPianoLoop() {
  let t = audioCtx.currentTime + 0.1;
  function scheduleLoop() {
    let time = t;
    MELODY.forEach(([freq, dur]) => {
      playNote(freq, time, dur * 0.85);
      playNote(freq * 0.5, time, dur * 0.85, 0.06);
      time += dur * 0.52;
    });
    t = time + 0.5;
    setTimeout(scheduleLoop, (t - audioCtx.currentTime - 1) * 1000);
  }
  scheduleLoop();
}

function playChime() {
  if (!audioCtx) return;
  [1046.5, 1318.5, 1567.98].forEach((f, i) =>
    playNote(f, audioCtx.currentTime + i * 0.08, 0.6, 0.12));
}

function playBoom() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    playNote(f, t + i * 0.05, 1.2, 0.15));
}

function playPop() {
  if (!audioCtx) return;
  playNote(880, audioCtx.currentTime, 0.18, 0.1);
  playNote(1046.5, audioCtx.currentTime + 0.06, 0.18, 0.08);
}

// ── BACKGROUND PARTICLES ──
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

function resizeBg() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

const CHARS = ['🤍','💗','🌸','✨','💕','🌷','💖'];

class BgParticle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x = Math.random() * bgCanvas.width;
    this.y = init ? Math.random() * bgCanvas.height : bgCanvas.height + 30;
    this.size = 12 + Math.random() * 22;
    this.speed = 0.3 + Math.random() * 0.7;
    this.drift = (Math.random() - 0.5) * 0.4;
    this.opacity = 0.15 + Math.random() * 0.35;
    this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.01 + Math.random() * 0.02;
  }
  update() {
    this.y -= this.speed;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.5 + this.drift;
    this.rotation += this.rotSpeed;
    if (this.y < -40) this.reset();
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillText(this.char, -this.size / 2, this.size / 2);
    ctx.restore();
  }
}

const bgParticles = Array.from({ length: 28 }, () => new BgParticle());

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgParticles.forEach(p => { p.update(); p.draw(bgCtx); });
  requestAnimationFrame(animateBg);
}
animateBg();

// ── EXPLOSION CANVAS ──
const expCanvas = document.getElementById('explosionCanvas');
const expCtx = expCanvas.getContext('2d');
let expParticles = [], expAnimating = false;

function resizeExp() {
  expCanvas.width = window.innerWidth;
  expCanvas.height = window.innerHeight;
}
resizeExp();
window.addEventListener('resize', resizeExp);

class ExpParticle {
  constructor(x, y, big = false) {
    this.x = x; this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = big ? (3 + Math.random() * 9) : (2 + Math.random() * 6);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - (big ? 4 : 2);
    this.gravity = 0.18;
    this.size = big ? (18 + Math.random() * 28) : (10 + Math.random() * 18);
    this.opacity = 1;
    this.decay = 0.012 + Math.random() * 0.018;
    this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.12;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity; this.vx *= 0.98;
    this.opacity -= this.decay;
    this.rotation += this.rotSpeed;
  }
  draw(ctx) {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.font = `${this.size}px serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillText(this.char, -this.size / 2, this.size / 2);
    ctx.restore();
  }
}

function triggerExplosion(x, y, count = 60, big = false) {
  for (let i = 0; i < count; i++) expParticles.push(new ExpParticle(x, y, big));
  if (!expAnimating) animateExp();
}

function animateExp() {
  expAnimating = true;
  expCtx.clearRect(0, 0, expCanvas.width, expCanvas.height);
  expParticles = expParticles.filter(p => p.opacity > 0);
  expParticles.forEach(p => { p.update(); p.draw(expCtx); });
  if (expParticles.length > 0) {
    requestAnimationFrame(animateExp);
  } else {
    expAnimating = false;
    expCtx.clearRect(0, 0, expCanvas.width, expCanvas.height);
  }
}

// ── SCENE MANAGEMENT ──
let currentScene = 1;

function goToScene(n) {
  const prev = document.getElementById(`scene${currentScene}`);
  const next = document.getElementById(`scene${n}`);
  if (!next) return;
  prev.classList.remove('active');
  prev.classList.add('exit');
  setTimeout(() => prev.classList.remove('exit'), 1000);
  next.classList.add('active');
  currentScene = n;
  updateDots();
  if (n === 2) startVideoScene();
  if (n === 6) initSurpriseSystem();
}

function updateDots() {
  for (let i = 0; i < 6; i++) {
    const d = document.getElementById(`dot${i}`);
    if (d) d.classList.toggle('active', i === currentScene - 1);
  }
}

// ── SCENE 1: GIFT ──
function openGift() {
  initAudio();
  playChime();
  const flash = document.getElementById('flashOverlay');
  flash.style.opacity = '1';
  setTimeout(() => { flash.style.opacity = '0'; }, 300);
  if (navigator.vibrate) navigator.vibrate([30, 20, 40, 20, 60]);
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  triggerExplosion(cx, cy, 80);
  setTimeout(() => triggerExplosion(cx, cy, 60), 300);
  setTimeout(() => goToScene(2), 1200);
}

// ── SCENE 2: CINEMATIC CANVAS ──
let videoSceneCanvas, videoSceneCtx, videoFrame = 0, videoAnim;

function startVideoScene() {
  const scene2 = document.getElementById('scene2');
  if (!videoSceneCanvas) {
    videoSceneCanvas = document.createElement('canvas');
    videoSceneCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    scene2.insertBefore(videoSceneCanvas, scene2.firstChild);
  }
  videoSceneCanvas.width = window.innerWidth;
  videoSceneCanvas.height = window.innerHeight;
  videoSceneCtx = videoSceneCanvas.getContext('2d');
  videoFrame = 0;

  function drawVideoFrame() {
    const ctx = videoSceneCtx;
    const w = videoSceneCanvas.width, h = videoSceneCanvas.height;
    const t = videoFrame / 60;
    ctx.clearRect(0, 0, w, h);
    const hue = 320 + Math.sin(t * 0.3) * 20;
    const grad = ctx.createRadialGradient(w/2, h*0.4, 0, w/2, h/2, h*0.8);
    grad.addColorStop(0, `hsla(${hue},80%,85%,1)`);
    grad.addColorStop(0.5, `hsla(${hue+20},70%,70%,1)`);
    grad.addColorStop(1, `hsla(${hue-20},60%,30%,1)`);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 6; i++) {
      const ox = w * (0.2 + 0.6 * ((i * 0.17 + t * 0.05) % 1));
      const oy = h * (0.2 + 0.5 * Math.sin(t * 0.2 + i * 1.1));
      const r = 40 + 30 * Math.sin(t * 0.3 + i);
      const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
      og.addColorStop(0, 'rgba(255,255,255,0.35)');
      og.addColorStop(1, 'rgba(255,150,200,0)');
      ctx.fillStyle = og;
      ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2); ctx.fill();
    }
    const hs = 80 + 10 * Math.sin(t * 2);
    ctx.save();
    ctx.translate(w / 2, h * 0.38);
    ctx.scale(hs / 80, hs / 80);
    ctx.font = '80px serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.9;
    ctx.fillText('🤍', 0, 0);
    ctx.restore();
    for (let i = 0; i < 12; i++) {
      const px = w * ((i * 0.083 + t * 0.04 + Math.sin(t * 0.1 + i) * 0.05) % 1);
      const py = h * ((0.1 + i * 0.07 + t * 0.03) % 1);
      ctx.save();
      ctx.globalAlpha = 0.5 + 0.3 * Math.sin(t + i);
      ctx.font = `${16 + 8 * Math.sin(t * 0.5 + i)}px serif`;
      ctx.fillText(['🌸','🌷','✨','💕'][i % 4], px, py);
      ctx.restore();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, 0, w, h * 0.08);
    ctx.fillRect(0, h * 0.92, w, h * 0.08);
    const fadeIn = Math.min(1, t / 1.5);
    const fadeOut = t > 7 ? Math.max(0, 1 - (t - 7) / 1.5) : 1;
    ctx.fillStyle = `rgba(0,0,0,${1 - fadeIn * fadeOut})`;
    ctx.fillRect(0, 0, w, h);
    videoFrame++;
    if (t < 9) { videoAnim = requestAnimationFrame(drawVideoFrame); }
    else { goToScene(3); }
  }
  if (videoAnim) cancelAnimationFrame(videoAnim);
  drawVideoFrame();
}

// ── SCENE 5: HEART EXPLOSION → SCENE 6 ──
let finalDone = false;
function finalExplosion() {
  if (finalDone) return;
  finalDone = true;
  initAudio(); playBoom();
  if (navigator.vibrate) navigator.vibrate([50, 30, 80, 30, 100]);
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  triggerExplosion(cx, cy, 100, true);
  setTimeout(() => triggerExplosion(cx * 0.5, cy * 0.6, 60, true), 200);
  setTimeout(() => triggerExplosion(cx * 1.5, cy * 0.7, 60, true), 350);
  setTimeout(() => triggerExplosion(cx, cy * 1.3, 80, true), 500);
  setTimeout(() => triggerExplosion(cx, cy, 120, true), 700);
  const flash = document.getElementById('flashOverlay');
  flash.style.opacity = '1';
  setTimeout(() => { flash.style.opacity = '0'; }, 400);
  setTimeout(() => {
    document.getElementById('finalText').classList.add('show');
    document.getElementById('ytBtn').classList.add('show');
  }, 600);
  setTimeout(() => goToScene(6), 4000);
}

// ════════════════════════════════════════════
// ── SCENE 6: 21 SURPRISES ──
// ════════════════════════════════════════════
const SURPRISES = [
  { text: 'اضغطي هنا 🤍',                              hint: 'ابدأي الرحلة' },
  { text: 'كل شي بدأ بابتسامة بسيطة منك 🤍',           hint: 'كملي' },
  { text: 'ما كنتش نعرف ان لحظة بسيطة تغير كل شي',     hint: 'اضغطي للمفاجأة التالية' },
  { text: 'كل مرة نشوف اسمك نحس براحة غريبة',           hint: 'كملي' },
  { text: 'يمكن صدفة… لكن صارت أهم صدفة في حياتي',     hint: 'اضغطي' },
  { text: 'وجودك غير طريقة تفكيري',                     hint: 'كملي' },
  { text: 'صرت نبتسم بدون سبب لما نفكر فيك',            hint: 'اضغطي' },
  { text: 'كل يوم معاك أحلى من اللي قبله',              hint: 'كملي' },
  { text: 'في ناس تجي وتروح… وانتي بقيتي',              hint: 'اضغطي' },
  { text: 'صرتي جزء من يومي بدون ما نحس',               hint: 'كملي' },
  { text: 'حتى سكوتك يطمنّي',                           hint: 'اضغطي' },
  { text: 'كل رسالة منك تفرحني أكثر من أي شي',          hint: 'كملي' },
  { text: 'ما نبيش لحظة تمر بدون ما تفكري فيك',         hint: 'اضغطي' },
  { text: 'صرت نخاف نخسرك حتى في الخيال',               hint: 'كملي' },
  { text: 'انتي مش شخص عادي… انتي إحساس',               hint: 'اضغطي' },
  { text: 'كل لحظة معاك كنز',                           hint: 'كملي' },
  { text: 'لو نقدر نوقف الزمن… نوقفه معاك',             hint: 'اضغطي' },
  { text: 'ما نبيش شي غير راحتك',                       hint: 'كملي' },
  { text: 'كل شي وصلني ليك بدون ما نحس',                hint: 'قريب النهاية' },
  { text: 'قريب نوصلك لأهم لحظة',                       hint: 'آخر مفاجأة' },
  { text: 'كل عام وانتي ليا يا عمري 🤍',                hint: 'ابدأي المرحلة الأخيرة' }
];

let surpriseIndex = 0;
let surpriseActive = false;

function initSurpriseSystem() {
  surpriseIndex = 0;
  surpriseActive = false;
  renderSurprise(0);
}

function renderSurprise(index) {
  const scene6 = document.getElementById('scene6');
  const old = document.getElementById('surpriseCard');

  if (old) {
    old.style.opacity = '0';
    old.style.transform = 'scale(0.85)';
    setTimeout(() => { if (old.parentNode) old.remove(); }, 380);
  }

  if (index >= SURPRISES.length) {
    setTimeout(() => startDrawMode(), 420);
    return;
  }

  const s = SURPRISES[index];
  const isFinal = index === SURPRISES.length - 1;
  const delay = old ? 400 : 0;

  setTimeout(() => {
    const card = document.createElement('div');
    card.id = 'surpriseCard';
    card.style.cssText = `
      position:absolute; inset:0;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      gap:24px; padding:32px 24px;
      opacity:0; transform:scale(0.85);
      transition:opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
      z-index:30;
    `;

    // Progress dots row
    const progressWrap = document.createElement('div');
    progressWrap.style.cssText = `
      position:absolute; top:20px; left:50%; transform:translateX(-50%);
      display:flex; gap:5px; flex-wrap:wrap;
      justify-content:center; width:90%; max-width:340px;
    `;
    for (let i = 0; i < SURPRISES.length; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        width:10px; height:10px; border-radius:50%; flex-shrink:0;
        background:${i <= index ? '#c2185b' : 'rgba(194,24,91,0.2)'};
        transition:background 0.4s;
      `;
      progressWrap.appendChild(dot);
    }
    card.appendChild(progressWrap);

    // Counter badge
    const badge = document.createElement('div');
    badge.style.cssText = `
      font-size:0.85rem; font-weight:700;
      color:rgba(194,24,91,0.5); letter-spacing:0.1em;
      margin-top:48px;
      font-family:'Tajawal',sans-serif;
    `;
    badge.textContent = `${index + 1} / ${SURPRISES.length}`;
    card.appendChild(badge);

    // Glass box
    const box = document.createElement('div');
    box.style.cssText = `
      width:min(88vw,380px);
      background:rgba(255,255,255,0.18);
      backdrop-filter:blur(22px) saturate(1.5);
      -webkit-backdrop-filter:blur(22px) saturate(1.5);
      border:1.5px solid rgba(255,255,255,0.35);
      border-radius:28px;
      box-shadow:0 8px 60px rgba(255,100,160,0.35),inset 0 1px 0 rgba(255,255,255,0.6);
      padding:36px 28px; text-align:center;
      cursor:pointer;
      transition:transform 0.15s, box-shadow 0.15s;
    `;
    box.addEventListener('touchstart', () => {
      box.style.transform = 'scale(0.96)';
    }, { passive: true });
    box.addEventListener('touchend', () => {
      box.style.transform = 'scale(1)';
    }, { passive: true });

    const txt = document.createElement('div');
    txt.style.cssText = `
      font-family:'Tajawal',sans-serif;
      font-size:clamp(1.1rem,5vw,1.4rem);
      font-weight:700; color:#6b1a35;
      line-height:1.8; direction:rtl;
    `;
    txt.textContent = s.text;
    box.appendChild(txt);

    const tapIcon = document.createElement('div');
    tapIcon.style.cssText = `
      margin-top:20px; font-size:1.6rem;
      animation:surprisePulse 1.5s ease-in-out infinite;
    `;
    tapIcon.textContent = isFinal ? '🤍' : '👆';
    box.appendChild(tapIcon);

    box.onclick = () => onSurpriseClick(index);
    card.appendChild(box);

    // Hint text
    const hint = document.createElement('div');
    hint.style.cssText = `
      font-family:'Tajawal',sans-serif;
      font-size:0.9rem; color:rgba(194,24,91,0.6);
      font-weight:500; letter-spacing:0.03em; direction:rtl;
    `;
    hint.textContent = s.hint;
    card.appendChild(hint);

    scene6.appendChild(card);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }));
  }, delay);
}

function onSurpriseClick(index) {
  if (surpriseActive) return;
  surpriseActive = true;
  initAudio(); playPop();
  if (navigator.vibrate) navigator.vibrate([20, 10, 30]);
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  triggerExplosion(cx, cy, 25, false);
  surpriseIndex = index + 1;
  surpriseActive = false;
  renderSurprise(surpriseIndex);
}

// ── DRAW MODE (40 seconds) ──
let drawCanvas, drawCtx, isDrawing = false, drawParticles = [];
let drawTimer = null;

function startDrawMode() {
  const scene6 = document.getElementById('scene6');

  const oldCard = document.getElementById('surpriseCard');
  if (oldCard) { oldCard.style.opacity = '0'; setTimeout(() => oldCard.remove(), 400); }

  // Hint label
  const hint = document.createElement('div');
  hint.className = 'draw-hint';
  hint.textContent = 'جربي ارسمي 🤍';
  scene6.appendChild(hint);

  // Countdown
  const countdown = document.createElement('div');
  countdown.id = 'drawCountdown';
  countdown.style.cssText = `
    position:absolute; top:22px; right:22px;
    font-family:'Tajawal',sans-serif;
    font-size:0.9rem; font-weight:700;
    color:rgba(194,24,91,0.55);
    background:rgba(255,255,255,0.18);
    backdrop-filter:blur(10px);
    -webkit-backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,0.35);
    border-radius:50px; padding:6px 16px;
    z-index:40; direction:ltr;
    transition:opacity 0.4s;
  `;
  scene6.appendChild(countdown);

  // Draw canvas
  drawCanvas = document.getElementById('drawCanvas');
  drawCanvas.width = window.innerWidth;
  drawCanvas.height = window.innerHeight;
  drawCanvas.style.opacity = '1';
  drawCtx = drawCanvas.getContext('2d');

  drawCanvas.addEventListener('touchstart', onDrawStart, { passive: false });
  drawCanvas.addEventListener('touchmove', onDrawMove, { passive: false });
  drawCanvas.addEventListener('touchend', () => { isDrawing = false; });
  drawCanvas.addEventListener('mousedown', e => { isDrawing = true; spawnDraw(e.clientX, e.clientY); });
  drawCanvas.addEventListener('mousemove', e => { if (isDrawing) spawnDraw(e.clientX, e.clientY); });
  drawCanvas.addEventListener('mouseup', () => { isDrawing = false; });

  animateDraw();

  let secondsLeft = 40;
  countdown.textContent = `⏳ ${secondsLeft}s`;
  drawTimer = setInterval(() => {
    secondsLeft--;
    countdown.textContent = `⏳ ${secondsLeft}s`;
    if (secondsLeft <= 0) {
      clearInterval(drawTimer);
      endDrawMode();
    }
  }, 1000);
}

function endDrawMode() {
  isDrawing = false;
  drawParticles = [];
  if (drawCanvas) drawCanvas.style.opacity = '0';
  const hint = document.querySelector('.draw-hint');
  if (hint) hint.style.opacity = '0';
  const cd = document.getElementById('drawCountdown');
  if (cd) cd.style.opacity = '0';
  setTimeout(() => goToFinalScene(), 700);
}

function onDrawStart(e) {
  e.preventDefault();
  isDrawing = true;
  spawnDraw(e.touches[0].clientX, e.touches[0].clientY);
}

function onDrawMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  Array.from(e.touches).forEach(t => spawnDraw(t.clientX, t.clientY));
}

function spawnDraw(x, y) {
  for (let i = 0; i < 6; i++) {
    drawParticles.push({
      x: x + (Math.random() - 0.5) * 24,
      y: y + (Math.random() - 0.5) * 24,
      vx: (Math.random() - 0.5) * 2.5,
      vy: -1.2 - Math.random() * 2.5,
      size: 14 + Math.random() * 18,
      opacity: 1,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.09
    });
  }
  if (audioCtx) playNote(523.25 + Math.random() * 400, audioCtx.currentTime, 0.15, 0.04);
}

function animateDraw() {
  if (!drawCtx) return;
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  drawParticles = drawParticles.filter(p => p.opacity > 0);
  drawParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.04;
    p.opacity -= 0.011;
    p.rotation += p.rotSpeed;
    drawCtx.save();
    drawCtx.globalAlpha = Math.max(0, p.opacity);
    drawCtx.font = `${p.size}px serif`;
    drawCtx.translate(p.x, p.y);
    drawCtx.rotate(p.rotation);
    drawCtx.fillText(p.char, -p.size / 2, p.size / 2);
    drawCtx.restore();
  });
  requestAnimationFrame(animateDraw);
}

// ── SCENE 7: FINAL ──
function goToFinalScene() {
  const s6 = document.getElementById('scene6');
  s6.classList.remove('active');
  s6.classList.add('exit');
  setTimeout(() => s6.classList.remove('exit'), 1000);

  const s7 = document.getElementById('scene7');
  s7.classList.add('active');
  currentScene = 7;

  initAudio(); playBoom();
  if (navigator.vibrate) navigator.vibrate([60, 30, 100, 30, 120]);
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  triggerExplosion(cx, cy, 120, true);
  setTimeout(() => triggerExplosion(cx * 0.4, cy * 0.5, 70, true), 250);
  setTimeout(() => triggerExplosion(cx * 1.6, cy * 0.6, 70, true), 400);
  setTimeout(() => triggerExplosion(cx, cy * 1.4, 90, true), 600);
  setTimeout(() => triggerExplosion(cx, cy, 150, true), 900);

  const flash = document.getElementById('flashOverlay');
  flash.style.opacity = '1';
  setTimeout(() => { flash.style.opacity = '0'; }, 500);

  setTimeout(() => {
    document.getElementById('finalMsg').classList.add('show');
  }, 700);
  setTimeout(() => {
    document.getElementById('finalYtBtn').classList.add('show');
  }, 1800);
}

// ── INIT ──
document.addEventListener('touchstart', () => initAudio(), { once: true });
document.addEventListener('click', () => initAudio(), { once: true });
