// ════════════════════════════════════════════
// PERSISTENT BACKGROUND
// ════════════════════════════════════════════
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
let BW, BH, bgPhase = 0;

function resizeBg() {
  BW = bgCanvas.width = window.innerWidth;
  BH = bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

const STARS = Array.from({ length: 140 }, () => ({
  x: Math.random(),
  y: Math.random() * 0.7,
  r: 0.4 + Math.random() * 1.6,
  tw: Math.random() * Math.PI * 2,
  ts: 0.008 + Math.random() * 0.018
}));

const RAIN = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random(),
  len: 7 + Math.random() * 13,
  spd: 3.5 + Math.random() * 4,
  op: 0.08 + Math.random() * 0.22
}));

const FLOATERS = Array.from({ length: 22 }, () => ({
  x: Math.random() * 100,
  y: 100 + Math.random() * 100,
  size: 14 + Math.random() * 20,
  spd: 0.25 + Math.random() * 0.55,
  drift: (Math.random() - 0.5) * 0.35,
  op: 0.18 + Math.random() * 0.32,
  char: ['🌹','🤍','💗','🌸','✨','💕','🌷','💖'][Math.floor(Math.random() * 8)],
  rot: Math.random() * Math.PI * 2,
  rotSpd: (Math.random() - 0.5) * 0.018,
  wob: Math.random() * Math.PI * 2,
  wobSpd: 0.01 + Math.random() * 0.02
}));

function drawBg() {
  bgCtx.clearRect(0, 0, BW, BH);

  if (bgPhase === 0) {
    const sky = bgCtx.createLinearGradient(0, 0, 0, BH);
    sky.addColorStop(0, '#040010');
    sky.addColorStop(0.6, '#0c0022');
    sky.addColorStop(1, '#180030');
    bgCtx.fillStyle = sky;
    bgCtx.fillRect(0, 0, BW, BH);
  } else {
    const sky = bgCtx.createLinearGradient(0, 0, 0, BH);
    sky.addColorStop(0, '#fff0f5');
    sky.addColorStop(0.5, '#ffe4f0');
    sky.addColorStop(1, '#ffd6e8');
    bgCtx.fillStyle = sky;
    bgCtx.fillRect(0, 0, BW, BH);
  }

  // Moon
  const mx = BW * 0.8, my = BH * 0.12, mr = Math.min(BW, BH) * 0.065;
  const mg = bgCtx.createRadialGradient(mx, my, 0, mx, my, mr * 4);
  mg.addColorStop(0, 'rgba(255,240,200,0.2)');
  mg.addColorStop(1, 'rgba(255,200,150,0)');
  bgCtx.fillStyle = mg;
  bgCtx.beginPath();
  bgCtx.arc(mx, my, mr * 4, 0, Math.PI * 2);
  bgCtx.fill();
  bgCtx.fillStyle = '#fff8e8';
  bgCtx.shadowColor = 'rgba(255,240,180,0.9)';
  bgCtx.shadowBlur = 28;
  bgCtx.beginPath();
  bgCtx.arc(mx, my, mr, 0, Math.PI * 2);
  bgCtx.fill();
  bgCtx.shadowBlur = 0;

  // Stars (night only)
  if (bgPhase === 0) {
    STARS.forEach(s => {
      s.tw += s.ts;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(s.tw));
      bgCtx.save();
      bgCtx.globalAlpha = a;
      bgCtx.fillStyle = '#fff';
      bgCtx.shadowColor = '#fff';
      bgCtx.shadowBlur = 4;
      bgCtx.beginPath();
      bgCtx.arc(s.x * BW, s.y * BH, s.r, 0, Math.PI * 2);
      bgCtx.fill();
      bgCtx.restore();
    });
  }

  // Rain
  bgCtx.strokeStyle = 'rgba(180,210,255,0.3)';
  bgCtx.lineWidth = 1;
  RAIN.forEach(d => {
    d.y += d.spd / BH;
    if (d.y > 1) { d.y = -0.04; d.x = Math.random(); }
    bgCtx.save();
    bgCtx.globalAlpha = d.op;
    bgCtx.beginPath();
    bgCtx.moveTo(d.x * BW, d.y * BH);
    bgCtx.lineTo(d.x * BW - 1, d.y * BH + d.len);
    bgCtx.stroke();
    bgCtx.restore();
  });

  // Floaters
  FLOATERS.forEach(f => {
    f.y -= f.spd / BH * 100;
    f.wob += f.wobSpd;
    f.x += Math.sin(f.wob) * 0.4 + f.drift;
    f.rot += f.rotSpd;
    if (f.y < -5) { f.y = 105; f.x = Math.random() * 100; }
    bgCtx.save();
    bgCtx.globalAlpha = f.op;
    bgCtx.font = `${f.size}px serif`;
    bgCtx.translate(f.x / 100 * BW, f.y / 100 * BH);
    bgCtx.rotate(f.rot);
    bgCtx.fillText(f.char, -f.size / 2, f.size / 2);
    bgCtx.restore();
  });

  requestAnimationFrame(drawBg);
}
drawBg();

// ════════════════════════════════════════════
// EXPLOSION CANVAS
// ════════════════════════════════════════════
const expCanvas = document.getElementById('explosionCanvas');
const expCtx = expCanvas.getContext('2d');
let expParticles = [], expAnimating = false;

function resizeExp() {
  expCanvas.width = window.innerWidth;
  expCanvas.height = window.innerHeight;
}
resizeExp();
window.addEventListener('resize', resizeExp);

const CHARS = ['🤍','💗','🌸','✨','💕','🌹','💖','🌷'];

class ExpParticle {
  constructor(x, y, big = false) {
    this.x = x; this.y = y;
    const a = Math.random() * Math.PI * 2;
    const s = big ? (3 + Math.random() * 10) : (2 + Math.random() * 6);
    this.vx = Math.cos(a) * s;
    this.vy = Math.sin(a) * s - (big ? 5 : 2);
    this.gravity = 0.18;
    this.size = big ? (18 + Math.random() * 30) : (10 + Math.random() * 18);
    this.opacity = 1;
    this.decay = 0.011 + Math.random() * 0.017;
    this.char = CHARS[Math.floor(Math.random() * CHARS.length)];
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpd = (Math.random() - 0.5) * 0.13;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity; this.vx *= 0.98;
    this.opacity -= this.decay;
    this.rot += this.rotSpd;
  }
  draw(ctx) {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.font = `${this.size}px serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
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

// ════════════════════════════════════════════
// CHARACTER DRAWING ENGINE
// ════════════════════════════════════════════
function drawSaja(canvas, variant, t) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  c.clearRect(0, 0, w, h);
  const float = Math.sin(t * 1.1) * 6;
  c.save();
  c.translate(0, float);

  if (variant === 'baby') {
    const aura = c.createRadialGradient(w/2, h*0.45, 0, w/2, h*0.45, 80);
    aura.addColorStop(0, 'rgba(255,180,210,0.25)');
    aura.addColorStop(1, 'rgba(255,150,200,0)');
    c.fillStyle = aura;
    c.beginPath(); c.arc(w/2, h*0.45, 80, 0, Math.PI*2); c.fill();

    c.fillStyle = '#ffcce0';
    c.beginPath(); c.ellipse(w/2, h*0.65, 42, 52, 0, 0, Math.PI*2); c.fill();

    const hg = c.createRadialGradient(w/2-8, h*0.3, 0, w/2, h*0.33, 38);
    hg.addColorStop(0, '#ffe8d0'); hg.addColorStop(1, '#ffd0b0');
    c.fillStyle = hg;
    c.shadowColor = 'rgba(255,150,180,0.4)'; c.shadowBlur = 14;
    c.beginPath(); c.arc(w/2, h*0.33, 36, 0, Math.PI*2); c.fill();
    c.shadowBlur = 0;

    c.fillStyle = '#4a2800';
    c.beginPath(); c.arc(w/2, h*0.29, 37, Math.PI, 0); c.fill();
    c.beginPath(); c.arc(w/2-30, h*0.31, 13, 0, Math.PI*2); c.fill();
    c.beginPath(); c.arc(w/2+30, h*0.31, 13, 0, Math.PI*2); c.fill();

    c.fillStyle = '#2a1000';
    c.beginPath(); c.ellipse(w/2-13, h*0.32, 6, 7, 0, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(w/2+13, h*0.32, 6, 7, 0, 0, Math.PI*2); c.fill();
    c.fillStyle = '#fff';
    c.beginPath(); c.arc(w/2-10, h*0.305, 2.5, 0, Math.PI*2); c.fill();
    c.beginPath(); c.arc(w/2+16, h*0.305, 2.5, 0, Math.PI*2); c.fill();

    c.strokeStyle = '#c2185b'; c.lineWidth = 2.2; c.lineCap = 'round';
    c.beginPath(); c.arc(w/2, h*0.36, 10, 0.15, Math.PI-0.15); c.stroke();

    c.fillStyle = 'rgba(255,130,130,0.3)';
    c.beginPath(); c.ellipse(w/2-22, h*0.36, 11, 7, 0, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(w/2+22, h*0.36, 11, 7, 0, 0, Math.PI*2); c.fill();

    c.fillStyle = '#ffd0b0';
    c.beginPath(); c.ellipse(w/2-46, h*0.62, 11, 24, -0.3, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(w/2+46, h*0.62, 11, 24, 0.3, 0, Math.PI*2); c.fill();

    c.fillStyle = '#ff80b5';
    c.beginPath(); c.ellipse(w/2, h*0.8, 44, 20, 0, 0, Math.PI*2); c.fill();
    c.fillStyle = '#ff6fa8';
    c.beginPath(); c.arc(w/2, h*0.8, 10, 0, Math.PI*2); c.fill();

    for (let i = 0; i < 5; i++) {
      const hx = w*0.1 + i*(w*0.2) + Math.sin(t*0.7+i)*10;
      const hy = h*0.06 + Math.cos(t*0.5+i*1.4)*12;
      c.save(); c.globalAlpha = 0.45 + 0.35*Math.sin(t+i);
      c.font = `${11+i*2}px serif`;
      c.fillText('🤍', hx, hy); c.restore();
    }

  } else {
    const headR = variant === 'child' ? 28 : variant === 'teen' ? 34 : 38;
    const bodyH = variant === 'child' ? 55 : variant === 'teen' ? 75 : 90;
    const cx = w/2, headY = h*0.2;

    const aura = c.createRadialGradient(cx, h*0.5, 0, cx, h*0.5, 90);
    aura.addColorStop(0, 'rgba(255,180,210,0.2)');
    aura.addColorStop(1, 'rgba(255,150,200,0)');
    c.fillStyle = aura; c.beginPath(); c.arc(cx, h*0.5, 90, 0, Math.PI*2); c.fill();

    c.fillStyle = '#3d2000';
    c.beginPath(); c.arc(cx, headY, headR+3, Math.PI, 0); c.fill();
    c.beginPath();
    c.moveTo(cx-headR-2, headY);
    c.bezierCurveTo(cx-headR-14, headY+40, cx-headR-10, headY+80, cx-headR-4, headY+bodyH+40);
    c.bezierCurveTo(cx-headR+8, headY+bodyH+50, cx-headR+12, headY+bodyH+40, cx-headR+4, headY+bodyH+30);
    c.bezierCurveTo(cx-headR-4, headY+60, cx-headR+2, headY+30, cx-headR+8, headY);
    c.fill();
    c.beginPath();
    c.moveTo(cx+headR+2, headY);
    c.bezierCurveTo(cx+headR+14, headY+40, cx+headR+10, headY+80, cx+headR+4, headY+bodyH+40);
    c.bezierCurveTo(cx+headR-8, headY+bodyH+50, cx+headR-12, headY+bodyH+40, cx+headR-4, headY+bodyH+30);
    c.bezierCurveTo(cx+headR+4, headY+60, cx+headR-2, headY+30, cx+headR-8, headY);
    c.fill();

    const hg = c.createRadialGradient(cx-headR*0.3, headY-headR*0.2, 0, cx, headY, headR);
    hg.addColorStop(0, '#ffe8d0'); hg.addColorStop(0.7, '#ffd5b0'); hg.addColorStop(1, '#ffc8a0');
    c.fillStyle = hg;
    c.shadowColor = 'rgba(255,150,180,0.35)'; c.shadowBlur = 12;
    c.beginPath(); c.arc(cx, headY, headR, 0, Math.PI*2); c.fill();
    c.shadowBlur = 0;

    c.fillStyle = '#2a1000';
    c.beginPath(); c.ellipse(cx-headR*0.38, headY+2, headR*0.18, headR*0.22, 0, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(cx+headR*0.38, headY+2, headR*0.18, headR*0.22, 0, 0, Math.PI*2); c.fill();
    c.fillStyle = '#fff';
    c.beginPath(); c.arc(cx-headR*0.3, headY-1, headR*0.07, 0, Math.PI*2); c.fill();
    c.beginPath(); c.arc(cx+headR*0.46, headY-1, headR*0.07, 0, Math.PI*2); c.fill();

    c.strokeStyle = 'rgba(180,100,60,0.4)'; c.lineWidth = 1.2;
    c.beginPath(); c.arc(cx, headY+headR*0.25, headR*0.1, 0.2, Math.PI-0.2); c.stroke();

    c.fillStyle = '#e8607a';
    c.beginPath(); c.ellipse(cx, headY+headR*0.5, headR*0.22, headR*0.1, 0, 0, Math.PI*2); c.fill();
    c.fillStyle = '#c2185b';
    c.beginPath(); c.ellipse(cx, headY+headR*0.46, headR*0.22, headR*0.06, 0, 0, Math.PI); c.fill();

    c.fillStyle = 'rgba(255,130,130,0.28)';
    c.beginPath(); c.ellipse(cx-headR*0.65, headY+headR*0.3, headR*0.28, headR*0.18, 0, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(cx+headR*0.65, headY+headR*0.3, headR*0.28, headR*0.18, 0, 0, Math.PI*2); c.fill();

    const dressColor = variant === 'adult' ? '#ff6fa8' : '#ff80b5';
    c.fillStyle = dressColor;
    c.beginPath();
    c.moveTo(cx-headR*0.7, headY+headR);
    c.bezierCurveTo(cx-headR*0.9, headY+headR+bodyH*0.4, cx-headR*1.2, headY+headR+bodyH, cx-headR*1.4, headY+headR+bodyH);
    c.lineTo(cx+headR*1.4, headY+headR+bodyH);
    c.bezierCurveTo(cx+headR*1.2, headY+headR+bodyH, cx+headR*0.9, headY+headR+bodyH*0.4, cx+headR*0.7, headY+headR);
    c.closePath(); c.fill();

    c.fillStyle = 'rgba(255,255,255,0.15)';
    c.beginPath(); c.ellipse(cx-headR*0.2, headY+headR+bodyH*0.25, headR*0.4, headR*0.6, -0.3, 0, Math.PI*2); c.fill();

    const armSway = Math.sin(t*1.3) * 6;
    c.fillStyle = '#ffd0b0';
    c.beginPath(); c.ellipse(cx-headR*1.1, headY+headR+bodyH*0.3+armSway, headR*0.22, headR*0.55, -0.25, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(cx+headR*1.1, headY+headR+bodyH*0.3-armSway, headR*0.22, headR*0.55, 0.25, 0, Math.PI*2); c.fill();

    c.fillRect(cx-headR*0.55, headY+headR+bodyH, headR*0.4, headR*0.9);
    c.fillRect(cx+headR*0.15, headY+headR+bodyH, headR*0.4, headR*0.9);

    c.fillStyle = '#c2185b';
    c.beginPath(); c.ellipse(cx-headR*0.35, headY+headR+bodyH+headR*0.9, headR*0.38, headR*0.18, 0, 0, Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(cx+headR*0.35, headY+headR+bodyH+headR*0.9, headR*0.38, headR*0.18, 0, 0, Math.PI*2); c.fill();

    for (let i = 0; i < 4; i++) {
      const sx = cx - 60 + i*40 + Math.sin(t*0.9+i)*8;
      const sy = headY - 30 + Math.cos(t*0.7+i)*10;
      c.save(); c.globalAlpha = 0.4 + 0.4*Math.sin(t*1.2+i);
      c.font = '13px serif'; c.fillText('✨', sx, sy); c.restore();
    }
  }
  c.restore();
}

function drawMuath(canvas, t) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  c.clearRect(0, 0, w, h);
  const float = Math.sin(t*0.9) * 5;
  c.save(); c.translate(0, float);
  const cx = w/2, headY = h*0.18, headR = 34;

  const aura = c.createRadialGradient(cx, h*0.45, 0, cx, h*0.45, 100);
  aura.addColorStop(0, 'rgba(180,140,255,0.15)');
  aura.addColorStop(1, 'rgba(100,80,200,0)');
  c.fillStyle = aura; c.beginPath(); c.arc(cx, h*0.45, 100, 0, Math.PI*2); c.fill();

  c.fillStyle = '#1a0a00';
  c.beginPath(); c.arc(cx, headY, headR+2, Math.PI, 0); c.fill();
  c.beginPath(); c.arc(cx-headR-1, headY, 8, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx+headR+1, headY, 8, 0, Math.PI*2); c.fill();
  c.fillStyle = '#2a1200';
  c.beginPath(); c.arc(cx, headY-headR+4, headR-2, Math.PI+0.3, 0-0.3); c.fill();

  const hg = c.createRadialGradient(cx-10, headY-10, 0, cx, headY, headR);
  hg.addColorStop(0, '#e8c8a0'); hg.addColorStop(0.6, '#d4a870'); hg.addColorStop(1, '#c09060');
  c.fillStyle = hg;
  c.shadowColor = 'rgba(180,120,60,0.3)'; c.shadowBlur = 10;
  c.beginPath();
  c.moveTo(cx-headR, headY);
  c.bezierCurveTo(cx-headR-4, headY+headR*0.5, cx-headR-2, headY+headR*0.9, cx-headR*0.3, headY+headR*1.1);
  c.lineTo(cx+headR*0.3, headY+headR*1.1);
  c.bezierCurveTo(cx+headR+2, headY+headR*0.9, cx+headR+4, headY+headR*0.5, cx+headR, headY);
  c.arc(cx, headY, headR, 0, Math.PI, true);
  c.fill(); c.shadowBlur = 0;

  c.fillStyle = '#1a0a00';
  c.beginPath();
  c.moveTo(cx-headR*0.85, headY+headR*0.6);
  c.bezierCurveTo(cx-headR*0.9, headY+headR*0.9, cx-headR*0.4, headY+headR*1.15, cx, headY+headR*1.18);
  c.bezierCurveTo(cx+headR*0.4, headY+headR*1.15, cx+headR*0.9, headY+headR*0.9, cx+headR*0.85, headY+headR*0.6);
  c.bezierCurveTo(cx+headR*0.7, headY+headR*0.75, cx+headR*0.3, headY+headR*0.85, cx, headY+headR*0.85);
  c.bezierCurveTo(cx-headR*0.3, headY+headR*0.85, cx-headR*0.7, headY+headR*0.75, cx-headR*0.85, headY+headR*0.6);
  c.fill();
  c.beginPath(); c.ellipse(cx, headY+headR*0.42, headR*0.28, headR*0.1, 0, 0, Math.PI*2); c.fill();

  c.fillStyle = '#1a0800';
  c.beginPath(); c.ellipse(cx-headR*0.38, headY+2, headR*0.16, headR*0.19, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(cx+headR*0.38, headY+2, headR*0.16, headR*0.19, 0, 0, Math.PI*2); c.fill();
  c.fillStyle = '#5c3010';
  c.beginPath(); c.arc(cx-headR*0.38, headY+2, headR*0.1, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx+headR*0.38, headY+2, headR*0.1, 0, Math.PI*2); c.fill();
  c.fillStyle = 'rgba(255,255,255,0.7)';
  c.beginPath(); c.arc(cx-headR*0.32, headY-1, headR*0.05, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx+headR*0.44, headY-1, headR*0.05, 0, Math.PI*2); c.fill();

  c.strokeStyle = '#1a0a00'; c.lineWidth = 2.5; c.lineCap = 'round';
  c.beginPath(); c.moveTo(cx-headR*0.55, headY-headR*0.28); c.quadraticCurveTo(cx-headR*0.38, headY-headR*0.35, cx-headR*0.2, headY-headR*0.28); c.stroke();
  c.beginPath(); c.moveTo(cx+headR*0.55, headY-headR*0.28); c.quadraticCurveTo(cx+headR*0.38, headY-headR*0.35, cx+headR*0.2, headY-headR*0.28); c.stroke();

  c.strokeStyle = 'rgba(150,90,40,0.5)'; c.lineWidth = 1.5;
  c.beginPath(); c.moveTo(cx-4, headY+headR*0.15); c.lineTo(cx-6, headY+headR*0.35); c.lineTo(cx-2, headY+headR*0.38); c.stroke();
  c.beginPath(); c.moveTo(cx+4, headY+headR*0.15); c.lineTo(cx+6, headY+headR*0.35); c.lineTo(cx+2, headY+headR*0.38); c.stroke();

  c.fillStyle = '#c09060'; c.fillRect(cx-12, headY+headR*1.05, 24, 20);

  const bodyGrad = c.createLinearGradient(cx-50, headY+headR+20, cx+50, headY+headR+20);
  bodyGrad.addColorStop(0, '#2d4a8a'); bodyGrad.addColorStop(0.5, '#3a5fa0'); bodyGrad.addColorStop(1, '#2d4a8a');
  c.fillStyle = bodyGrad;
  c.beginPath();
  c.moveTo(cx-42, headY+headR+18);
  c.bezierCurveTo(cx-55, headY+headR+40, cx-58, headY+headR+80, cx-52, headY+headR+120);
  c.lineTo(cx+52, headY+headR+120);
  c.bezierCurveTo(cx+58, headY+headR+80, cx+55, headY+headR+40, cx+42, headY+headR+18);
  c.closePath(); c.fill();

  c.fillStyle = '#fff';
  c.beginPath(); c.moveTo(cx-14, headY+headR+18); c.lineTo(cx, headY+headR+35); c.lineTo(cx+14, headY+headR+18); c.closePath(); c.fill();

  const armSway = Math.sin(t*1.1) * 5;
  c.fillStyle = '#2d4a8a';
  c.beginPath(); c.ellipse(cx-58, headY+headR+55+armSway, 14, 38, -0.15, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(cx+58, headY+headR+55-armSway, 14, 38, 0.15, 0, Math.PI*2); c.fill();
  c.fillStyle = '#c09060';
  c.beginPath(); c.arc(cx-58, headY+headR+93+armSway, 12, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx+58, headY+headR+93-armSway, 12, 0, Math.PI*2); c.fill();

  c.fillStyle = '#1a2a4a';
  c.fillRect(cx-40, headY+headR+118, 36, 50);
  c.fillRect(cx+4, headY+headR+118, 36, 50);
  c.fillStyle = '#0a0a0a';
  c.beginPath(); c.ellipse(cx-22, headY+headR+170, 22, 10, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(cx+22, headY+headR+170, 22, 10, 0, 0, Math.PI*2); c.fill();

  const faceLight = c.createRadialGradient(cx-20, headY-15, 0, cx, headY, headR);
  faceLight.addColorStop(0, 'rgba(255,240,200,0.2)');
  faceLight.addColorStop(1, 'rgba(255,200,150,0)');
  c.fillStyle = faceLight; c.beginPath(); c.arc(cx, headY, headR, 0, Math.PI*2); c.fill();
  c.restore();
}

function drawTogether(canvas, t) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  c.clearRect(0, 0, w, h);

  const glow = c.createRadialGradient(w/2, h*0.5, 0, w/2, h*0.5, 120);
  glow.addColorStop(0, 'rgba(255,150,200,0.2)');
  glow.addColorStop(1, 'rgba(255,100,160,0)');
  c.fillStyle = glow; c.beginPath(); c.arc(w/2, h*0.5, 120, 0, Math.PI*2); c.fill();

  const mx = w*0.3, my = h*0.2, mr = 26;
  c.save(); c.translate(0, Math.sin(t*0.9)*4);
  c.fillStyle = '#1a0a00'; c.beginPath(); c.arc(mx, my, mr+2, Math.PI, 0); c.fill();
  const mhg = c.createRadialGradient(mx-8, my-8, 0, mx, my, mr);
  mhg.addColorStop(0, '#e8c8a0'); mhg.addColorStop(1, '#c09060');
  c.fillStyle = mhg; c.beginPath(); c.arc(mx, my, mr, 0, Math.PI*2); c.fill();
  c.fillStyle = '#1a0a00';
  c.beginPath(); c.ellipse(mx, my+mr*0.7, mr*0.7, mr*0.45, 0, 0, Math.PI*2); c.fill();
  c.fillStyle = '#1a0800';
  c.beginPath(); c.arc(mx-9, my+1, 4, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(mx+9, my+1, 4, 0, Math.PI*2); c.fill();
  c.fillStyle = '#2d4a8a';
  c.beginPath(); c.roundRect(mx-28, my+mr, 56, 80, 6); c.fill();
  c.beginPath(); c.ellipse(mx+36, my+mr+30, 10, 28, 0.6, 0, Math.PI*2); c.fill();
  c.restore();

  const sx = w*0.68, sy = h*0.2, sr = 22;
  c.save(); c.translate(0, Math.sin(t*1.1)*5);
  c.fillStyle = '#3d2000'; c.beginPath(); c.arc(sx, sy, sr+2, Math.PI, 0); c.fill();
  const shg = c.createRadialGradient(sx-6, sy-6, 0, sx, sy, sr);
  shg.addColorStop(0, '#ffe8d0'); shg.addColorStop(1, '#ffd0b0');
  c.fillStyle = shg;
  c.shadowColor = 'rgba(255,150,180,0.3)'; c.shadowBlur = 10;
  c.beginPath(); c.arc(sx, sy, sr, 0, Math.PI*2); c.fill(); c.shadowBlur = 0;
  c.fillStyle = '#2a1000';
  c.beginPath(); c.ellipse(sx-8, sy+1, 5, 6, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(sx+8, sy+1, 5, 6, 0, 0, Math.PI*2); c.fill();
  c.fillStyle = '#fff';
  c.beginPath(); c.arc(sx-6, sy-1, 2, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(sx+10, sy-1, 2, 0, Math.PI*2); c.fill();
  c.strokeStyle = '#c2185b'; c.lineWidth = 1.8;
  c.beginPath(); c.arc(sx, sy+8, 7, 0.2, Math.PI-0.2); c.stroke();
  c.fillStyle = '#ff80b5';
  c.beginPath();
  c.moveTo(sx-18, sy+sr);
  c.bezierCurveTo(sx-24, sy+sr+40, sx-28, sy+sr+70, sx-22, sy+sr+70);
  c.lineTo(sx+22, sy+sr+70);
  c.bezierCurveTo(sx+28, sy+sr+70, sx+24, sy+sr+40, sx+18, sy+sr);
  c.closePath(); c.fill();
  c.fillStyle = '#ffd0b0';
  c.beginPath(); c.ellipse(sx-26, sy+sr+25, 8, 22, -0.5, 0, Math.PI*2); c.fill();
  c.restore();

  const hx = w/2, hy = h*0.42 + Math.sin(t*1.5)*8;
  c.save(); c.globalAlpha = 0.7 + 0.3*Math.sin(t*2);
  c.font = `${28+Math.sin(t*2)*4}px serif`;
  c.fillText('🤍', hx-14, hy); c.restore();

  for (let i = 0; i < 6; i++) {
    const fx = w*0.1 + i*(w*0.16) + Math.sin(t*0.6+i)*12;
    const fy = h*0.05 + Math.cos(t*0.5+i*1.2)*15;
    c.save(); c.globalAlpha = 0.35 + 0.3*Math.sin(t+i);
    c.font = `${10+i*2}px serif`;
    c.fillText(['🤍','💗','✨','🌹'][i%4], fx, fy); c.restore();
  }
}

function drawStudy(canvas, t) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  c.clearRect(0, 0, w, h);

  c.fillStyle = '#5c3317';
  c.fillRect(15, h*0.62, w-30, 12);
  c.fillRect(25, h*0.74, 10, h*0.26);
  c.fillRect(w-35, h*0.74, 10, h*0.26);

  const lg = c.createRadialGradient(w/2, h*0.45, 0, w/2, h*0.45, w*0.22);
  lg.addColorStop(0, 'rgba(100,200,255,0.35)');
  lg.addColorStop(1, 'rgba(50,100,200,0)');
  c.fillStyle = lg; c.beginPath(); c.arc(w/2, h*0.45, w*0.22, 0, Math.PI*2); c.fill();

  c.fillStyle = '#2a2a2a';
  c.beginPath(); c.roundRect(w*0.28, h*0.35, w*0.44, h*0.27, 5); c.fill();
  c.fillStyle = 'rgba(100,200,255,0.5)';
  c.beginPath(); c.roundRect(w*0.3, h*0.37, w*0.4, h*0.23, 3); c.fill();
  c.fillStyle = 'rgba(150,255,150,0.8)';
  for (let i = 0; i < 5; i++) {
    const lw = (0.3 + Math.sin(t*0.5+i)*0.2) * w*0.32;
    c.fillRect(w*0.32, h*0.39+i*h*0.038, Math.max(20, lw), 2.5);
  }
  c.fillStyle = '#333';
  c.beginPath(); c.roundRect(w*0.22, h*0.62, w*0.56, h*0.04, 3); c.fill();

  ['#ff6fa8','#ff80b5','#c2185b','#ffb3cc','#e91e8c'].forEach((col, i) => {
    c.fillStyle = col; c.fillRect(w*0.04, h*0.46-i*13, w*0.16, 12);
    c.fillStyle = 'rgba(255,255,255,0.25)'; c.fillRect(w*0.04+2, h*0.46-i*13+3, w*0.16-4, 2);
  });

  const gx = w/2, gy = h*0.28;
  c.fillStyle = '#3d2000'; c.beginPath(); c.arc(gx, gy, 20, Math.PI, 0); c.fill();
  const hg = c.createRadialGradient(gx-6, gy-6, 0, gx, gy, 20);
  hg.addColorStop(0, '#ffe8d0'); hg.addColorStop(1, '#ffd0b0');
  c.fillStyle = hg; c.beginPath(); c.arc(gx, gy, 20, 0, Math.PI*2); c.fill();
  c.fillStyle = '#2a1000';
  c.beginPath(); c.arc(gx-7, gy+1, 3.5, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(gx+7, gy+1, 3.5, 0, Math.PI*2); c.fill();
  c.fillStyle = '#ff80b5';
  c.beginPath(); c.roundRect(gx-16, gy+20, 32, 35, 5); c.fill();

  for (let i = 0; i < 7; i++) {
    const px = w*0.2 + Math.sin(t*1.1+i*0.9)*w*0.3;
    const py = h*0.2 - Math.abs(Math.sin(t*0.7+i))*h*0.15;
    c.save(); c.globalAlpha = 0.4 + 0.4*Math.sin(t+i);
    c.font = '15px serif';
    c.fillText(['✨','💡','📚','⭐','🔬','💻','🎀'][i], px, py); c.restore();
  }
}

function drawMirror(canvas, t) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  c.clearRect(0, 0, w, h);

  c.strokeStyle = '#c2a060'; c.lineWidth = 7;
  c.shadowColor = 'rgba(255,220,100,0.6)'; c.shadowBlur = 18;
  c.beginPath(); c.roundRect(w*0.5, h*0.04, w*0.46, h*0.76, 12); c.stroke();
  c.shadowBlur = 0;

  const mg = c.createLinearGradient(w*0.5, 0, w*0.96, 0);
  mg.addColorStop(0, 'rgba(200,230,255,0.12)');
  mg.addColorStop(0.5, 'rgba(255,255,255,0.06)');
  mg.addColorStop(1, 'rgba(200,220,255,0.1)');
  c.fillStyle = mg; c.beginPath(); c.roundRect(w*0.5, h*0.04, w*0.46, h*0.76, 12); c.fill();

  const gr = c.createRadialGradient(w*0.73, h*0.42, 0, w*0.73, h*0.42, 65);
  gr.addColorStop(0, 'rgba(255,220,100,0.4)');
  gr.addColorStop(1, 'rgba(255,200,50,0)');
  c.fillStyle = gr; c.beginPath(); c.arc(w*0.73, h*0.42, 65, 0, Math.PI*2); c.fill();

  const rx = w*0.73, ry = h*0.25;
  c.fillStyle = '#ffd0b0'; c.beginPath(); c.arc(rx, ry, 16, 0, Math.PI*2); c.fill();
  c.fillStyle = '#1a0035'; c.fillRect(rx-20, ry-16, 40, 7);
  c.beginPath(); c.arc(rx, ry-16, 13, 0, Math.PI*2); c.fill();
  c.strokeStyle = '#c2a060'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(rx+13, ry-16); c.lineTo(rx+13, ry-7); c.stroke();
  c.fillStyle = '#1a0035';
  c.beginPath(); c.roundRect(rx-14, ry+16, 28, 38, 4); c.fill();
  c.fillStyle = 'rgba(255,255,255,0.12)';
  c.beginPath(); c.ellipse(rx-5, ry+28, 8, 18, -0.2, 0, Math.PI*2); c.fill();

  const gx = w*0.22, gy = h*0.22, gr2 = 22;
  c.fillStyle = '#3d2000'; c.beginPath(); c.arc(gx, gy, gr2+2, Math.PI, 0); c.fill();
  c.beginPath();
  c.moveTo(gx-gr2, gy);
  c.bezierCurveTo(gx-gr2-10, gy+35, gx-gr2-6, gy+70, gx-gr2, gy+90);
  c.bezierCurveTo(gx-gr2+8, gy+95, gx-gr2+10, gy+85, gx-gr2+4, gy+70);
  c.bezierCurveTo(gx-gr2-2, gy+40, gx-gr2+6, gy+20, gx-gr2+8, gy);
  c.fill();
  c.beginPath();
  c.moveTo(gx+gr2, gy);
  c.bezierCurveTo(gx+gr2+10, gy+35, gx+gr2+6, gy+70, gx+gr2, gy+90);
  c.bezierCurveTo(gx+gr2-8, gy+95, gx+gr2-10, gy+85, gx+gr2-4, gy+70);
  c.bezierCurveTo(gx+gr2+2, gy+40, gx+gr2-6, gy+20, gx+gr2-8, gy);
  c.fill();
  const shg = c.createRadialGradient(gx-6, gy-6, 0, gx, gy, gr2);
  shg.addColorStop(0, '#ffe8d0'); shg.addColorStop(1, '#ffd0b0');
  c.fillStyle = shg;
  c.shadowColor = 'rgba(255,150,180,0.3)'; c.shadowBlur = 10;
  c.beginPath(); c.arc(gx, gy, gr2, 0, Math.PI*2); c.fill(); c.shadowBlur = 0;
  c.fillStyle = '#2a1000';
  c.beginPath(); c.ellipse(gx-8, gy+1, 5, 6, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(gx+8, gy+1, 5, 6, 0, 0, Math.PI*2); c.fill();
  c.fillStyle = '#fff';
  c.beginPath(); c.arc(gx-6, gy-1, 2, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(gx+10, gy-1, 2, 0, Math.PI*2); c.fill();
  c.strokeStyle = '#c2185b'; c.lineWidth = 1.8;
  c.beginPath(); c.arc(gx, gy+8, 7, 0.2, Math.PI-0.2); c.stroke();
  c.fillStyle = '#ff80b5';
  c.beginPath(); c.roundRect(gx-16, gy+gr2, 32, 55, 6); c.fill();
  c.fillStyle = '#ffd0b0';
  c.fillRect(gx-12, gy+gr2+55, 10, 28);
  c.fillRect(gx+2, gy+gr2+55, 10, 28);
  c.fillStyle = '#c2185b';
  c.beginPath(); c.ellipse(gx-7, gy+gr2+83, 12, 6, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(gx+7, gy+gr2+83, 12, 6, 0, 0, Math.PI*2); c.fill();

  for (let i = 0; i < 6; i++) {
    const sx = w*0.5 + Math.sin(t*1.1+i*1.3)*10 + i*(w*0.09);
    const sy = h*0.04 + Math.cos(t*0.9+i)*8;
    c.save(); c.globalAlpha = 0.5 + 0.4*Math.sin(t*1.5+i);
    c.font = '13px serif'; c.fillText('✨', sx, sy); c.restore();
  }
}

function drawCardChar(canvas, t) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  c.clearRect(0, 0, w, h);

  const bg = c.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#ffb3cc'); bg.addColorStop(0.5, '#ff6fa8'); bg.addColorStop(1, '#ffcce0');
  c.fillStyle = bg; c.fillRect(0, 0, w, h);

  const gl = c.createRadialGradient(w/2, h*0.4, 0, w/2, h*0.4, w*0.4);
  gl.addColorStop(0, 'rgba(255,255,255,0.35)');
  gl.addColorStop(1, 'rgba(255,150,200,0)');
  c.fillStyle = gl; c.fillRect(0, 0, w, h);

  const cx = w/2, cy = h*0.38, r = 28;
  c.fillStyle = '#3d2000'; c.beginPath(); c.arc(cx, cy, r+3, Math.PI, 0); c.fill();
  const hg = c.createRadialGradient(cx-8, cy-8, 0, cx, cy, r);
  hg.addColorStop(0, '#ffe8d0'); hg.addColorStop(1, '#ffd0b0');
  c.fillStyle = hg;
  c.shadowColor = 'rgba(255,200,220,0.5)'; c.shadowBlur = 16;
  c.beginPath(); c.arc(cx, cy, r, 0, Math.PI*2); c.fill(); c.shadowBlur = 0;
  c.fillStyle = '#2a1000';
  c.beginPath(); c.ellipse(cx-10, cy+2, 6, 7, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(cx+10, cy+2, 6, 7, 0, 0, Math.PI*2); c.fill();
  c.fillStyle = '#fff';
  c.beginPath(); c.arc(cx-7, cy, 2.5, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx+13, cy, 2.5, 0, Math.PI*2); c.fill();
  c.strokeStyle = '#c2185b'; c.lineWidth = 2;
  c.beginPath(); c.arc(cx, cy+10, 9, 0.2, Math.PI-0.2); c.stroke();
  c.fillStyle = 'rgba(255,130,130,0.3)';
  c.beginPath(); c.ellipse(cx-22, cy+8, 10, 7, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(cx+22, cy+8, 10, 7, 0, 0, Math.PI*2); c.fill();
  c.fillStyle = '#ff6fa8';
  c.beginPath(); c.roundRect(cx-22, cy+r, 44, 55, 8); c.fill();

  for (let i = 0; i < 8; i++) {
    const fx = w*0.05 + i*(w*0.13) + Math.sin(t*0.8+i)*15;
    const fy = h*0.05 + Math.cos(t*0.6+i*1.1)*20;
    c.save(); c.globalAlpha = 0.4 + 0.35*Math.sin(t+i);
    c.font = `${12+i*2}px serif`;
    c.fillText(['🤍','💗','✨','🌹','💕'][i%5], fx, fy); c.restore();
  }
}

// Animate all figure canvases
let figT = 0;
function animateFigures() {
  figT = Date.now() / 1000;
  const bc = document.getElementById('babyCanvas');     if (bc)  drawSaja(bc, 'baby', figT);
  const cc = document.getElementById('childCanvas');    if (cc)  drawSaja(cc, 'child', figT);
  const ec = document.getElementById('engineerCanvas'); if (ec)  drawSaja(ec, 'adult', figT);
  const sc = document.getElementById('studyCanvas');    if (sc)  drawStudy(sc, figT);
  const g21 = document.getElementById('girl21Canvas'); if (g21) drawSaja(g21, 'adult', figT);
  const mc = document.getElementById('mirrorCanvas');   if (mc)  drawMirror(mc, figT);
  const muc = document.getElementById('muathCanvas');   if (muc) drawMuath(muc, figT);
  const tc = document.getElementById('togetherCanvas'); if (tc)  drawTogether(tc, figT);
  const ccc = document.getElementById('cardCharCanvas');if (ccc) drawCardChar(ccc, figT);
  requestAnimationFrame(animateFigures);
}
animateFigures();

// ════════════════════════════════════════════
// INTRO SEQUENCER
// ════════════════════════════════════════════
const SLIDES = [
  { id:'cs0',  lines:[{id:'cs0_a',d:400},{id:'cs0_b',d:1800}], dur:5500 },
  { id:'cs1',  lines:[{id:'cs1_a',d:400},{id:'cs1_b',d:1300},{id:'cs1_c',d:2200},{id:'cs1_d',d:3200}], dur:6500 },
  { id:'cs2',  lines:[{id:'cs2_a',d:400},{id:'cs2_b',d:1500},{id:'cs2_c',d:2600}], dur:6000 },
  { id:'cs3',  lines:[{id:'cs3_a',d:300},{id:'cs3_b',d:1400},{id:'cs3_c',d:2200},{id:'cs3_d',d:3200}], dur:6000 },
  { id:'cs4',  lines:[{id:'cs4_a',d:400},{id:'cs4_b',d:1400},{id:'cs4_c',d:2500}], dur:6000 },
  { id:'cs5',  lines:[{id:'cs5_a',d:300},{id:'cs5_b',d:900},{id:'cs5_c',d:1500},{id:'cs5_d',d:2300}], dur:5500 },
  { id:'cs6',  lines:[{id:'cs6_a',d:300},{id:'cs6_b',d:1000},{id:'cs6_c',d:1700},{id:'cs6_d',d:2400}], dur:5500 },
  { id:'cs7',  lines:[{id:'cs7_a',d:500},{id:'cs7_b',d:1600},{id:'cs7_c',d:2500}], dur:6000 },
  { id:'cs8',  lines:[{id:'cs8_a',d:400},{id:'cs8_b',d:2000}], dur:6000 },
  { id:'cs9',  lines:[{id:'cs9_a',d:400},{id:'cs9_b',d:1600},{id:'cs9_c',d:2800}], dur:6500 },
  { id:'cs10', lines:[{id:'cs10_a',d:400},{id:'cs10_b',d:1400},{id:'cs10_c',d:2400},{id:'cs10_d',d:3600}], dur:6500 },
];

let slideIdx = 0, slideTimer = null, introSkipped = false;

function showSlide(idx) {
  if (introSkipped) return;
  if (idx >= SLIDES.length) { endIntro(); return; }
  if (idx > 0) {
    const prev = document.getElementById(SLIDES[idx-1].id);
    if (prev) prev.classList.remove('active');
  }
  const sl = SLIDES[idx];
  const el = document.getElementById(sl.id);
  if (!el) { endIntro(); return; }
  el.classList.add('active');
  sl.lines.forEach(l => {
    setTimeout(() => {
      if (introSkipped) return;
      const le = document.getElementById(l.id);
      if (le) le.classList.add('show');
    }, l.d);
  });
  slideTimer = setTimeout(() => { slideIdx++; showSlide(slideIdx); }, sl.dur);
}

function nextSlide() {
  if (slideTimer) clearTimeout(slideTimer);
  const cur = document.getElementById(SLIDES[slideIdx]?.id);
  if (cur) cur.classList.remove('active');
  slideIdx++;
  showSlide(slideIdx);
}

function skipIntro() {
  introSkipped = true;
  if (slideTimer) clearTimeout(slideTimer);
  endIntro();
}

function endIntro() {
  const w = document.getElementById('introWrapper');
  w.classList.add('fade-out');
  bgPhase = 1;
  setTimeout(() => {
    w.style.display = 'none';
    document.getElementById('mainSite').style.display = 'block';
    resizeBg();
    resizeExp();
  }, 1600);
}

setTimeout(() => showSlide(0), 700);

// ════════════════════════════════════════════
// AUDIO ENGINE
// ════════════════════════════════════════════
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

// ════════════════════════════════════════════
// SCENE MANAGEMENT
// ════════════════════════════════════════════
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
  initAudio(); playChime();
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
      const ox = w*(0.2+0.6*((i*0.17+t*0.05)%1));
      const oy = h*(0.2+0.5*Math.sin(t*0.2+i*1.1));
      const r = 40+30*Math.sin(t*0.3+i);
      const og = ctx.createRadialGradient(ox,oy,0,ox,oy,r);
      og.addColorStop(0,'rgba(255,255,255,0.35)');
      og.addColorStop(1,'rgba(255,150,200,0)');
      ctx.fillStyle=og; ctx.beginPath(); ctx.arc(ox,oy,r,0,Math.PI*2); ctx.fill();
    }
    const hs = 80+10*Math.sin(t*2);
    ctx.save(); ctx.translate(w/2,h*0.38); ctx.scale(hs/80,hs/80);
    ctx.font='80px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.globalAlpha=0.9; ctx.fillText('🤍',0,0); ctx.restore();
    for (let i = 0; i < 12; i++) {
      const px=w*((i*0.083+t*0.04+Math.sin(t*0.1+i)*0.05)%1);
      const py=h*((0.1+i*0.07+t*0.03)%1);
      ctx.save(); ctx.globalAlpha=0.5+0.3*Math.sin(t+i);
      ctx.font=`${16+8*Math.sin(t*0.5+i)}px serif`;
      ctx.fillText(['🌸','🌷','✨','💕'][i%4],px,py); ctx.restore();
    }
    ctx.fillStyle='rgba(0,0,0,0.35)';
    ctx.fillRect(0,0,w,h*0.08); ctx.fillRect(0,h*0.92,w,h*0.08);
    const fadeIn=Math.min(1,t/1.5);
    const fadeOut=t>7?Math.max(0,1-(t-7)/1.5):1;
    ctx.fillStyle=`rgba(0,0,0,${1-fadeIn*fadeOut})`;
    ctx.fillRect(0,0,w,h);
    videoFrame++;
    if (t < 9) { videoAnim = requestAnimationFrame(drawVideoFrame); }
    else { goToScene(3); }
  }
  if (videoAnim) cancelAnimationFrame(videoAnim);
  drawVideoFrame();
}

// ── SCENE 5: HEART ──
let finalDone = false;
function finalExplosion() {
  if (finalDone) return;
  finalDone = true;
  initAudio(); playBoom();
  if (navigator.vibrate) navigator.vibrate([50, 30, 80, 30, 100]);
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  triggerExplosion(cx, cy, 100, true);
  setTimeout(() => triggerExplosion(cx*0.5, cy*0.6, 60, true), 200);
  setTimeout(() => triggerExplosion(cx*1.5, cy*0.7, 60, true), 350);
  setTimeout(() => triggerExplosion(cx, cy*1.3, 80, true), 500);
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
// SCENE 6: 21 SURPRISES
// ════════════════════════════════════════════
const SURPRISES = [
  { text: 'ياملاذي الامن من تعب الدنيا 🤍',                                                                                                                hint: 'اضغطي' },
  { text: 'كل شي بدي بابتسامة منك',                                                                                                                        hint: 'كملي' },
  { text: 'ما كنتش متوقع إنك تغيّري كل ش فيا',                                                                                                             hint: 'اضغطي' },
  { text: 'وجودك بس يحلي ايامي',                                                                                                                            hint: 'كملي' },
  { text: 'أحلى صدفة صارتلي',                                                                                                                               hint: 'اضغطي' },
  { text: 'طريقتك مختلفة ومميزه',                                                                                                                           hint: 'كملي' },
  { text: 'تخلي فيا نبتسم بدون سبب',                                                                                                                        hint: 'اضغطي' },
  { text: 'معاك الوقت يجري بشكل أحلى',                                                                                                                      hint: 'كملي' },
  { text: 'ربي يدومك جنبي ياعيوني',                                                                                                                         hint: 'اضغطي' },
  { text: 'صرتي جزء اساسي من يومي',                                                                                                                         hint: 'كملي' },
  { text: 'حتى سكوتك فيه راحة',                                                                                                                             hint: 'اضغطي' },
  { text: 'كل رسالة منك تفرحني',                                                                                                                            hint: 'كملي' },
  { text: 'نستنى كلامك حتى لو كلمة',                                                                                                                        hint: 'اضغطي' },
  { text: 'نخاف نخسرك وان شاء الله ماتصير',                                                                                                                 hint: 'كملي' },
  { text: 'انتي مش عادية',                                                                                                                                  hint: 'اضغطي' },
  { text: 'انتي إحساس',                                                                                                                                     hint: 'كملي' },
  { text: 'كل لحظة معاك كنز',                                                                                                                               hint: 'اضغطي' },
  { text: 'وجودك نعمة',                                                                                                                                     hint: 'كملي' },
  { text: 'نبي راحتك قبل أي شي',                                                                                                                            hint: 'قريب النهاية' },
  { text: 'خليتيني احسن وقاعد نتحسن والفضل كله ليك ياسندي في الدنيا وفعلا من يستند علي مهندسة لايسقط بل يزداد قوة❤️‍🩹',                                   hint: 'آخر مفاجأة' },
  { text: 'كل عام وانتي ليا يا عمري 🤍',                                                                                                                    hint: 'ابدأي المرحلة الأخيرة' }
];

let surpriseIndex = 0, surpriseActive = false;

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
  if (index >= SURPRISES.length) { setTimeout(() => startDrawMode(), 420); return; }

  const s = SURPRISES[index];
  const isFinal = index === SURPRISES.length - 1;
  const delay = old ? 400 : 0;

  setTimeout(() => {
    const card = document.createElement('div');
    card.id = 'surpriseCard';
    card.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:32px 24px;opacity:0;transform:scale(0.85);transition:opacity 0.5s ease,transform 0.5s cubic-bezier(0.34,1.56,0.64,1);z-index:30;';

    // Progress dots
    const pw = document.createElement('div');
    pw.style.cssText = 'position:absolute;top:20px;left:50%;transform:translateX(-50%);display:flex;gap:5px;flex-wrap:wrap;justify-content:center;width:90%;max-width:340px;';
    for (let i = 0; i < SURPRISES.length; i++) {
      const d = document.createElement('div');
      d.style.cssText = `width:10px;height:10px;border-radius:50%;flex-shrink:0;background:${i <= index ? '#c2185b' : 'rgba(194,24,91,0.2)'};transition:background 0.4s;`;
      pw.appendChild(d);
    }
    card.appendChild(pw);

    // Counter badge
    const badge = document.createElement('div');
    badge.style.cssText = "font-size:0.85rem;font-weight:700;color:rgba(194,24,91,0.5);letter-spacing:0.1em;margin-top:48px;font-family:'Tajawal',sans-serif;";
    badge.textContent = `${index + 1} / ${SURPRISES.length}`;
    card.appendChild(badge);

    // Glass box
    const box = document.createElement('div');
    box.style.cssText = 'width:min(88vw,380px);background:rgba(255,255,255,0.18);backdrop-filter:blur(22px) saturate(1.5);-webkit-backdrop-filter:blur(22px) saturate(1.5);border:1.5px solid rgba(255,255,255,0.35);border-radius:28px;box-shadow:0 8px 60px rgba(255,100,160,0.35),inset 0 1px 0 rgba(255,255,255,0.6);padding:36px 28px;text-align:center;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;';
    box.addEventListener('touchstart', () => { box.style.transform = 'scale(0.96)'; }, { passive: true });
    box.addEventListener('touchend', () => { box.style.transform = 'scale(1)'; }, { passive: true });

    const txt = document.createElement('div');
    txt.style.cssText = "font-family:'Tajawal',sans-serif;font-size:clamp(1rem,4.5vw,1.3rem);font-weight:700;color:#6b1a35;line-height:1.8;direction:rtl;";
    txt.textContent = s.text;
    box.appendChild(txt);

    const tapIcon = document.createElement('div');
    tapIcon.style.cssText = 'margin-top:20px;font-size:1.6rem;animation:surprisePulse 1.5s ease-in-out infinite;';
    tapIcon.textContent = isFinal ? '🤍' : '👆';
    box.appendChild(tapIcon);

    box.onclick = () => onSurpriseClick(index);
    card.appendChild(box);

    const hint = document.createElement('div');
    hint.style.cssText = "font-family:'Tajawal',sans-serif;font-size:0.9rem;color:rgba(194,24,91,0.6);font-weight:500;letter-spacing:0.03em;direction:rtl;";
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
  triggerExplosion(window.innerWidth / 2, window.innerHeight / 2, 25, false);
  surpriseIndex = index + 1;
  surpriseActive = false;
  renderSurprise(surpriseIndex);
}

// ════════════════════════════════════════════
// DRAW MODE — 40 seconds
// ════════════════════════════════════════════
let drawCanvas, drawCtx, isDrawing = false, drawParticles = [], drawTimer = null;

function startDrawMode() {
  const scene6 = document.getElementById('scene6');
  const oldCard = document.getElementById('surpriseCard');
  if (oldCard) { oldCard.style.opacity = '0'; setTimeout(() => oldCard.remove(), 400); }

  const hint = document.createElement('div');
  hint.className = 'draw-hint';
  hint.textContent = 'لما خشيتي حياتي عبيتيها ورد وقلوب واطمئنان وراحه زي ما صاير للشاشه توا ارسمي وشوفي 🤓';
  scene6.appendChild(hint);

  const countdown = document.createElement('div');
  countdown.id = 'drawCountdown';
  countdown.style.cssText = "position:absolute;top:22px;right:22px;font-family:'Tajawal',sans-serif;font-size:0.9rem;font-weight:700;color:rgba(194,24,91,0.55);background:rgba(255,255,255,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.35);border-radius:50px;padding:6px 16px;z-index:40;direction:ltr;transition:opacity 0.4s;";
  scene6.appendChild(countdown);

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
    if (secondsLeft <= 0) { clearInterval(drawTimer); endDrawMode(); }
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
      x: x + (Math.random()-0.5)*24,
      y: y + (Math.random()-0.5)*24,
      vx: (Math.random()-0.5)*2.5,
      vy: -1.2 - Math.random()*2.5,
      size: 14 + Math.random()*18,
      opacity: 1,
      char: CHARS[Math.floor(Math.random()*CHARS.length)],
      rotation: Math.random()*Math.PI*2,
      rotSpeed: (Math.random()-0.5)*0.09
    });
  }
  if (audioCtx) playNote(523.25 + Math.random()*400, audioCtx.currentTime, 0.15, 0.04);
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
    drawCtx.fillText(p.char, -p.size/2, p.size/2);
    drawCtx.restore();
  });
  requestAnimationFrame(animateDraw);
}

// ════════════════════════════════════════════
// SCENE 7: FINAL
// ════════════════════════════════════════════
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
  setTimeout(() => triggerExplosion(cx*0.4, cy*0.5, 70, true), 250);
  setTimeout(() => triggerExplosion(cx*1.6, cy*0.6, 70, true), 400);
  setTimeout(() => triggerExplosion(cx, cy*1.4, 90, true), 600);
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

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
document.addEventListener('touchstart', () => initAudio(), { once: true });
document.addEventListener('click', () => initAudio(), { once: true });
