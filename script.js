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
  if (n === 6) initDrawMode();
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

// ── SCENE 5: FINAL EXPLOSION ──
let finalDone = false;

function finalExplosion() {
  if (finalDone) return;
  finalDone = true;
  initAudio();
  playBoom();
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

// ── SCENE 6: DRAW MODE ──
let drawCanvas, drawCtx, isDrawing = false, drawParticles = [];

function initDrawMode() {
  drawCanvas = document.getElementById('drawCanvas');
  drawCanvas.width = window.innerWidth;
  drawCanvas.height = window.innerHeight;
  drawCtx = drawCanvas.getContext('2d');

  drawCanvas.addEventListener('touchstart', onDrawStart, { passive: false });
  drawCanvas.addEventListener('touchmove', onDrawMove, { passive: false });
  drawCanvas.addEventListener('touchend', () => { isDrawing = false; });
  drawCanvas.addEventListener('mousedown', e => { isDrawing = true; spawnDraw(e.clientX, e.clientY); });
  drawCanvas.addEventListener('mousemove', e => { if (isDrawing) spawnDraw(e.clientX, e.clientY); });
  drawCanvas.addEventListener('mouseup', () => { isDrawing = false; });

  animateDraw();
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
  for (let i = 0; i < 5; i++) {
    drawParticles.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: -1 - Math.random() * 2,
      size: 14 + Math.random() * 16,
      opacity: 1,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08
    });
  }
  if (audioCtx) playNote(523.25 + Math.random() * 400, audioCtx.currentTime, 0.2, 0.05);
}

function animateDraw() {
  if (!drawCtx) return;
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  drawParticles = drawParticles.filter(p => p.opacity > 0);
  drawParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.04;
    p.opacity -= 0.012;
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

// ── INIT ──
document.addEventListener('touchstart', () => initAudio(), { once: true });
document.addEventListener('click', () => initAudio(), { once: true });
