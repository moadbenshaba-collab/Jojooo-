// ════════════════════════════════════════════
// INTRO SYSTEM
// ════════════════════════════════════════════

const introCanvas = document.getElementById('introCanvas');
const iCtx = introCanvas.getContext('2d');
let introW, introH;
let introRainDrops = [];
let introStars = [];
let introFlowers = [];
let introAnimFrame;
let introSkipped = false;

function resizeIntro() {
  introW = introCanvas.width = window.innerWidth;
  introH = introCanvas.height = window.innerHeight;
}
resizeIntro();
window.addEventListener('resize', resizeIntro);

// Stars
for (let i = 0; i < 120; i++) {
  introStars.push({
    x: Math.random(),
    y: Math.random() * 0.65,
    r: 0.5 + Math.random() * 1.5,
    twinkle: Math.random() * Math.PI * 2,
    speed: 0.01 + Math.random() * 0.02
  });
}

// Rain drops
for (let i = 0; i < 80; i++) {
  introRainDrops.push({
    x: Math.random(),
    y: Math.random(),
    len: 8 + Math.random() * 14,
    speed: 3 + Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.25
  });
}

// Flowers
const flowerColors = ['#ff80b5','#ffb3cc','#ff6fa8','#ffd6e8','#ffcce0','#e91e8c'];
for (let i = 0; i < 18; i++) {
  introFlowers.push({
    x: Math.random(),
    y: 0.72 + Math.random() * 0.28,
    size: 10 + Math.random() * 18,
    color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
    sway: Math.random() * Math.PI * 2,
    swaySpeed: 0.008 + Math.random() * 0.012
  });
}

function drawIntroFrame() {
  iCtx.clearRect(0, 0, introW, introH);

  // Night sky gradient
  const skyGrad = iCtx.createLinearGradient(0, 0, 0, introH * 0.75);
  skyGrad.addColorStop(0, '#060010');
  skyGrad.addColorStop(0.5, '#0d0025');
  skyGrad.addColorStop(1, '#1a0035');
  iCtx.fillStyle = skyGrad;
  iCtx.fillRect(0, 0, introW, introH * 0.75);

  // Ground / field
  const groundGrad = iCtx.createLinearGradient(0, introH * 0.7, 0, introH);
  groundGrad.addColorStop(0, '#1a0030');
  groundGrad.addColorStop(0.4, '#2d0050');
  groundGrad.addColorStop(1, '#0a0015');
  iCtx.fillStyle = groundGrad;
  iCtx.fillRect(0, introH * 0.7, introW, introH * 0.3);

  // Moon
  const moonX = introW * 0.78, moonY = introH * 0.14, moonR = Math.min(introW, introH) * 0.07;
  const moonGlow = iCtx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR * 3.5);
  moonGlow.addColorStop(0, 'rgba(255,240,200,0.18)');
  moonGlow.addColorStop(0.4, 'rgba(255,220,180,0.08)');
  moonGlow.addColorStop(1, 'rgba(255,200,150,0)');
  iCtx.fillStyle = moonGlow;
  iCtx.beginPath();
  iCtx.arc(moonX, moonY, moonR * 3.5, 0, Math.PI * 2);
  iCtx.fill();

  iCtx.fillStyle = '#fff8e8';
  iCtx.shadowColor = 'rgba(255,240,180,0.9)';
  iCtx.shadowBlur = 30;
  iCtx.beginPath();
  iCtx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
  iCtx.fill();
  iCtx.shadowBlur = 0;

  // Stars
  introStars.forEach(s => {
    s.twinkle += s.speed;
    const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
    iCtx.save();
    iCtx.globalAlpha = alpha;
    iCtx.fillStyle = '#fff';
    iCtx.shadowColor = '#fff';
    iCtx.shadowBlur = 4;
    iCtx.beginPath();
    iCtx.arc(s.x * introW, s.y * introH, s.r, 0, Math.PI * 2);
    iCtx.fill();
    iCtx.restore();
  });

  // Rain
  iCtx.strokeStyle = 'rgba(180,210,255,0.35)';
  iCtx.lineWidth = 1;
  introRainDrops.forEach(d => {
    d.y += d.speed / introH;
    if (d.y > 1) { d.y = -0.05; d.x = Math.random(); }
    iCtx.save();
    iCtx.globalAlpha = d.opacity;
    iCtx.beginPath();
    iCtx.moveTo(d.x * introW, d.y * introH);
    iCtx.lineTo(d.x * introW - 1, d.y * introH + d.len);
    iCtx.stroke();
    iCtx.restore();
  });

  // Flowers
  introFlowers.forEach(f => {
    f.sway += f.swaySpeed;
    const fx = f.x * introW + Math.sin(f.sway) * 3;
    const fy = f.y * introH;
    // Stem
    iCtx.save();
    iCtx.strokeStyle = 'rgba(100,200,80,0.5)';
    iCtx.lineWidth = 1.5;
    iCtx.beginPath();
    iCtx.moveTo(fx, fy);
    iCtx.lineTo(fx, fy + f.size * 1.2);
    iCtx.stroke();
    // Petals
    iCtx.fillStyle = f.color;
    iCtx.globalAlpha = 0.75;
    for (let p = 0; p < 5; p++) {
      const angle = (p / 5) * Math.PI * 2;
      const px = fx + Math.cos(angle) * f.size * 0.45;
      const py = fy + Math.sin(angle) * f.size * 0.45;
      iCtx.beginPath();
      iCtx.ellipse(px, py, f.size * 0.28, f.size * 0.18, angle, 0, Math.PI * 2);
      iCtx.fill();
    }
    // Center
    iCtx.fillStyle = '#fff8c0';
    iCtx.globalAlpha = 0.9;
    iCtx.beginPath();
    iCtx.arc(fx, fy, f.size * 0.18, 0, Math.PI * 2);
    iCtx.fill();
    iCtx.restore();
  });

  introAnimFrame = requestAnimationFrame(drawIntroFrame);
}
drawIntroFrame();

// ── Intro figure canvases ──
function drawBaby(canvas) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const t = Date.now() / 1000;
  c.clearRect(0, 0, w, h);
  const float = Math.sin(t * 1.2) * 5;

  c.save();
  c.translate(0, float);

  // Body wrap
  c.fillStyle = '#ffcce0';
  c.beginPath();
  c.ellipse(w/2, h*0.62, 38, 48, 0, 0, Math.PI*2);
  c.fill();

  // Head
  c.fillStyle = '#ffe0c8';
  c.shadowColor = 'rgba(255,150,180,0.4)';
  c.shadowBlur = 12;
  c.beginPath();
  c.arc(w/2, h*0.32, 36, 0, Math.PI*2);
  c.fill();
  c.shadowBlur = 0;

  // Hair
  c.fillStyle = '#5c3317';
  c.beginPath();
  c.arc(w/2, h*0.28, 36, Math.PI, 0);
  c.fill();
  c.beginPath();
  c.arc(w/2 - 28, h*0.3, 12, 0, Math.PI*2);
  c.fill();
  c.beginPath();
  c.arc(w/2 + 28, h*0.3, 12, 0, Math.PI*2);
  c.fill();

  // Eyes
  c.fillStyle = '#3d1a00';
  c.beginPath(); c.arc(w/2-13, h*0.31, 5, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(w/2+13, h*0.31, 5, 0, Math.PI*2); c.fill();
  c.fillStyle = '#fff';
  c.beginPath(); c.arc(w/2-11, h*0.3, 2, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(w/2+15, h*0.3, 2, 0, Math.PI*2); c.fill();

  // Smile
  c.strokeStyle = '#c2185b';
  c.lineWidth = 2;
  c.beginPath();
  c.arc(w/2, h*0.35, 10, 0.2, Math.PI-0.2);
  c.stroke();

  // Cheeks
  c.fillStyle = 'rgba(255,150,150,0.35)';
  c.beginPath(); c.ellipse(w/2-20, h*0.35, 10, 7, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(w/2+20, h*0.35, 10, 7, 0, 0, Math.PI*2); c.fill();

  // Arms
  c.fillStyle = '#ffe0c8';
  c.beginPath(); c.ellipse(w/2-44, h*0.6, 10, 22, -0.3, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(w/2+44, h*0.6, 10, 22, 0.3, 0, Math.PI*2); c.fill();

  // Blanket
  c.fillStyle = '#ff80b5';
  c.beginPath();
  c.ellipse(w/2, h*0.78, 42, 22, 0, 0, Math.PI*2);
  c.fill();

  c.restore();

  // Floating hearts
  for (let i = 0; i < 4; i++) {
    const hx = w*0.15 + i*(w*0.22) + Math.sin(t*0.8+i)*8;
    const hy = h*0.08 + Math.cos(t*0.6+i*1.3)*10;
    c.save();
    c.globalAlpha = 0.5 + 0.3*Math.sin(t+i);
    c.font = `${12+i*3}px serif`;
    c.fillText('🤍', hx, hy);
    c.restore();
  }
}

function drawGrowingGirl(canvas, age) {
  // age: 0=child, 1=teen
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const t = Date.now() / 1000;
  c.clearRect(0, 0, w, h);

  const scale = 0.75 + age * 0.25;
  const headR = 28 + age * 6;
  const bodyH = 55 + age * 25;
  const cx = w / 2;
  const headY = h * 0.28;

  c.save();
  c.translate(cx, 0);

  // Hair
  c.fillStyle = '#4a2800';
  c.beginPath();
  c.arc(0, headY, headR + 4, Math.PI, 0);
  c.fill();
  if (age > 0.5) {
    // Long hair
    c.beginPath();
    c.moveTo(-headR-2, headY);
    c.quadraticCurveTo(-headR-10, headY+40, -headR-5, headY+70);
    c.quadraticCurveTo(-headR+5, headY+80, -headR+2, headY+70);
    c.quadraticCurveTo(-headR-5, headY+40, -headR+5, headY);
    c.fill();
    c.beginPath();
    c.moveTo(headR+2, headY);
    c.quadraticCurveTo(headR+10, headY+40, headR+5, headY+70);
    c.quadraticCurveTo(headR-5, headY+80, headR-2, headY+70);
    c.quadraticCurveTo(headR+5, headY+40, headR-5, headY);
    c.fill();
  }

  // Head
  c.fillStyle = '#ffe0c8';
  c.shadowColor = 'rgba(255,150,180,0.3)';
  c.shadowBlur = 10;
  c.beginPath();
  c.arc(0, headY, headR, 0, Math.PI*2);
  c.fill();
  c.shadowBlur = 0;

  // Eyes
  c.fillStyle = '#3d1a00';
  c.beginPath(); c.arc(-10, headY+2, 4, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(10, headY+2, 4, 0, Math.PI*2); c.fill();
  c.fillStyle = '#fff';
  c.beginPath(); c.arc(-8, headY+1, 1.5, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(12, headY+1, 1.5, 0, Math.PI*2); c.fill();

  // Smile
  c.strokeStyle = '#c2185b'; c.lineWidth = 1.8;
  c.beginPath(); c.arc(0, headY+8, 8, 0.2, Math.PI-0.2); c.stroke();

  // Cheeks
  c.fillStyle = 'rgba(255,150,150,0.3)';
  c.beginPath(); c.ellipse(-16, headY+6, 8, 5, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(16, headY+6, 8, 5, 0, 0, Math.PI*2); c.fill();

  // Body
  const bodyColor = age < 0.5 ? '#ffb3cc' : '#ff80b5';
  c.fillStyle = bodyColor;
  c.beginPath();
  c.roundRect(-22, headY+headR, 44, bodyH, 8);
  c.fill();

  // Legs
  c.fillStyle = '#ffe0c8';
  c.fillRect(-16, headY+headR+bodyH, 12, 30+age*10);
  c.fillRect(4, headY+headR+bodyH, 12, 30+age*10);

  // Shoes
  c.fillStyle = '#c2185b';
  c.beginPath(); c.ellipse(-10, headY+headR+bodyH+30+age*10, 12, 7, 0, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(10, headY+headR+bodyH+30+age*10, 12, 7, 0, 0, Math.PI*2); c.fill();

  // Arms
  c.fillStyle = '#ffe0c8';
  const armSway = Math.sin(t * 1.5) * 5;
  c.beginPath(); c.ellipse(-30, headY+headR+20+armSway, 8, 22, -0.2, 0, Math.PI*2); c.fill();
  c.beginPath(); c.ellipse(30, headY+headR+20-armSway, 8, 22, 0.2, 0, Math.PI*2); c.fill();

  c.restore();
}

function drawStudyScene(canvas) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const t = Date.now() / 1000;
  c.clearRect(0, 0, w, h);

  // Desk
  c.fillStyle = '#5c3317';
  c.fillRect(10, h*0.65, w-20, 10);
  c.fillRect(20, h*0.75, 8, h*0.25);
  c.fillRect(w-28, h*0.75, 8, h*0.25);

  // Laptop
  c.fillStyle = '#333';
  c.beginPath();
  c.roundRect(w*0.3, h*0.38, w*0.4, h*0.27, 4);
  c.fill();
  // Screen glow
  const screenGlow = c.createRadialGradient(w/2, h*0.5, 0, w/2, h*0.5, w*0.2);
  screenGlow.addColorStop(0, 'rgba(100,200,255,0.6)');
  screenGlow.addColorStop(1, 'rgba(50,100,200,0)');
  c.fillStyle = screenGlow;
  c.beginPath();
  c.roundRect(w*0.32, h*0.4, w*0.36, h*0.23, 3);
  c.fill();
  // Code lines on screen
  c.fillStyle = 'rgba(150,255,150,0.7)';
  for (let i = 0; i < 4; i++) {
    const lw = (0.4 + Math.random()*0.4) * w*0.3;
    c.fillRect(w*0.34, h*0.43+i*h*0.045, lw, 3);
  }
  // Laptop base
  c.fillStyle = '#444';
  c.beginPath();
  c.roundRect(w*0.25, h*0.65, w*0.5, h*0.04, 2);
  c.fill();

  // Books stack
  const bookColors = ['#ff6fa8','#ff80b5','#c2185b','#ffb3cc'];
  bookColors.forEach((col, i) => {
    c.fillStyle = col;
    c.fillRect(w*0.05, h*0.5-i*14, w*0.18, 13);
    c.fillStyle = 'rgba(255,255,255,0.3)';
    c.fillRect(w*0.05+2, h*0.5-i*14+3, w*0.18-4, 2);
  });

  // Floating particles (study sparks)
  for (let i = 0; i < 6; i++) {
    const px = w*0.3 + Math.sin(t*1.2+i*1.1)*w*0.25;
    const py = h*0.3 - Math.abs(Math.sin(t*0.8+i))*h*0.2;
    c.save();
    c.globalAlpha = 0.4 + 0.4*Math.sin(t+i);
    c.font = '14px serif';
    c.fillText(['✨','💡','📚','⭐','🔬','💻'][i], px, py);
    c.restore();
  }

  // Girl silhouette sitting
  c.fillStyle = '#ffe0c8';
  c.beginPath(); c.arc(w/2, h*0.35, 20, 0, Math.PI*2); c.fill();
  c.fillStyle = '#4a2800';
  c.beginPath(); c.arc(w/2, h*0.31, 21, Math.PI, 0); c.fill();
  c.fillStyle = '#ff80b5';
  c.beginPath(); c.roundRect(w/2-14, h*0.35+20, 28, 30, 5); c.fill();
}

function drawMirrorScene(canvas) {
  const c = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const t = Date.now() / 1000;
  c.clearRect(0, 0, w, h);

  // Mirror frame
  c.strokeStyle = '#c2a060';
  c.lineWidth = 6;
  c.shadowColor = 'rgba(255,220,100,0.5)';
  c.shadowBlur = 15;
  c.beginPath();
  c.roundRect(w*0.52, h*0.05, w*0.42, h*0.75, 10);
  c.stroke();
  c.shadowBlur = 0;

  // Mirror glass
  const mirrorGrad = c.createLinearGradient(w*0.52, 0, w*0.94, 0);
  mirrorGrad.addColorStop(0, 'rgba(200,230,255,0.15)');
  mirrorGrad.addColorStop(0.5, 'rgba(255,255,255,0.08)');
  mirrorGrad.addColorStop(1, 'rgba(200,220,255,0.12)');
  c.fillStyle = mirrorGrad;
  c.beginPath();
  c.roundRect(w*0.52, h*0.05, w*0.42, h*0.75, 10);
  c.fill();

  // Reflection glow (graduate)
  const glowR = c.createRadialGradient(w*0.73, h*0.4, 0, w*0.73, h*0.4, 60);
  glowR.addColorStop(0, 'rgba(255,220,100,0.35)');
  glowR.addColorStop(1, 'rgba(255,200,50,0)');
  c.fillStyle = glowR;
  c.beginPath(); c.arc(w*0.73, h*0.4, 60, 0, Math.PI*2); c.fill();

  // Reflection figure (graduate cap)
  const rx = w*0.73, ry = h*0.28;
  c.fillStyle = '#ffe0c8';
  c.beginPath(); c.arc(rx, ry, 18, 0, Math.PI*2); c.fill();
  // Cap
  c.fillStyle = '#1a0035';
  c.fillRect(rx-22, ry-18, 44, 8);
  c.beginPath(); c.arc(rx, ry-18, 14, 0, Math.PI*2); c.fill();
  c.strokeStyle = '#c2a060'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(rx+14, ry-18); c.lineTo(rx+14, ry-8); c.stroke();
  // Gown
  c.fillStyle = '#1a0035';
  c.beginPath(); c.roundRect(rx-16, ry+18, 32, 40, 5); c.fill();

  // Real girl (left side)
  const gx = w*0.22, gy = h*0.28;
  c.fillStyle = '#ffe0c8';
  c.shadowColor = 'rgba(255,150,180,0.3)'; c.shadowBlur = 8;
  c.beginPath(); c.arc(gx, gy, 22, 0, Math.PI*2); c.fill();
  c.shadowBlur = 0;
  // Hair
  c.fillStyle = '#4a2800';
  c.beginPath(); c.arc(gx, gy-4, 23, Math.PI, 0); c.fill();
  c.beginPath(); c.moveTo(gx-20, gy); c.quadraticCurveTo(gx-28, gy+35, gx-22, gy+60); c.quadraticCurveTo(gx-14, gy+65, gx-18, gy+55); c.quadraticCurveTo(gx-24, gy+30, gx-14, gy); c.fill();
  c.beginPath(); c.moveTo(gx+20, gy); c.quadraticCurveTo(gx+28, gy+35, gx+22, gy+60); c.quadraticCurveTo(gx+14, gy+65, gx+18, gy+55); c.quadraticCurveTo(gx+24, gy+30, gx+14, gy); c.fill();
  // Eyes
  c.fillStyle = '#3d1a00';
  c.beginPath(); c.arc(gx-9, gy+2, 3.5, 0, Math.PI*2); c.fill();
  c.beginPath(); c.arc(gx+9, gy+2, 3.5, 0, Math.PI*2); c.fill();
  // Smile
  c.strokeStyle = '#c2185b'; c.lineWidth = 1.5;
  c.beginPath(); c.arc(gx, gy+8, 7, 0.2, Math.PI-0.2); c.stroke();
  // Body
  c.fillStyle = '#ff80b5';
  c.beginPath(); c.roundRect(gx-16, gy+22, 32, 50, 6); c.fill();
  // Legs
  c.fillStyle = '#ffe0c8';
  c.fillRect(gx-12, gy+72, 10, 30);
  c.fillRect(gx+2, gy+72, 10, 30);

  // Sparkles around mirror
  for (let i = 0; i < 5; i++) {
    const sx = w*0.52 + Math.sin(t*1.1+i*1.3)*8 + i*(w*0.1);
    const sy = h*0.05 + Math.cos(t*0.9+i)*6;
    c.save();
    c.globalAlpha = 0.5+0.4*Math.sin(t*1.5+i);
    c.font = '14px serif';
    c.fillText('✨', sx, sy);
    c.restore();
  }
}

// ── Animate figure canvases ──
let figureAnimFrame;
function animateFigures() {
  const babyC = document.getElementById('babyCanvas');
  const growC = document.getElementById('growCanvas');
  const g18C = document.getElementById('girl18Canvas');
  const studyC = document.getElementById('studyCanvas');
  const g21C = document.getElementById('girl21Canvas');
  const mirrorC = document.getElementById('mirrorCanvas');

  if (babyC) drawBaby(babyC);
  if (growC) drawGrowingGirl(growC, 0.3);
  if (g18C) drawGrowingGirl(g18C, 0.85);
  if (studyC) drawStudyScene(studyC);
  if (g21C) drawGrowingGirl(g21C, 1.0);
  if (mirrorC) drawMirrorScene(mirrorC);

  figureAnimFrame = requestAnimationFrame(animateFigures);
}
animateFigures();

// ── Intro slide sequencer ──
const INTRO_SLIDES = [
  {
    id: 'islide0',
    lines: [
      { id: 'il0a', delay: 400 },
      { id: 'il0b', delay: 1600 },
      { id: 'il0c', delay: 2600 }
    ],
    duration: 5000
  },
  {
    id: 'islide1',
    lines: [
      { id: 'il1a', delay: 500 },
      { id: 'il1b', delay: 1600 }
    ],
    duration: 4500
  },
  {
    id: 'islide2',
    lines: [
      { id: 'il2a', delay: 400 },
      { id: 'il2b', delay: 1400 },
      { id: 'il2c', delay: 2500 }
    ],
    duration: 5500
  },
  {
    id: 'islide3',
    lines: [
      { id: 'il3a', delay: 400 },
      { id: 'il3b', delay: 1500 },
      { id: 'il3c', delay: 2500 },
      { id: 'il3d', delay: 3300 }
    ],
    duration: 6000
  },
  {
    id: 'islide4',
    lines: [
      { id: 'il4a', delay: 300 },
      { id: 'il4b', delay: 1000 },
      { id: 'il4c', delay: 1700 },
      { id: 'il4d', delay: 2500 }
    ],
    duration: 5500
  },
  {
    id: 'islide5',
    lines: [
      { id: 'il5a', delay: 400 },
      { id: 'il5b', delay: 1300 },
      { id: 'il5c', delay: 2400 }
    ],
    duration: 5000
  },
  {
    id: 'islide6',
    lines: [
      { id: 'il6a', delay: 600 },
      { id: 'il6b', delay: 1800 }
    ],
    duration: 5000
  },
  {
    id: 'islide7',
    lines: [
      { id: 'il7a', delay: 400 },
      { id: 'il7b', delay: 1400 },
      { id: 'il7c', delay: 2800 }
    ],
    duration: 5500
  }
];

let currentSlideIdx = 0;
let slideTimeout = null;

function showSlide(idx) {
  if (introSkipped) return;
  if (idx >= INTRO_SLIDES.length) {
    endIntro();
    return;
  }

  // Hide previous
  if (idx > 0) {
    const prev = document.getElementById(INTRO_SLIDES[idx-1].id);
    if (prev) prev.classList.remove('visible');
  }

  const slide = INTRO_SLIDES[idx];
  const el = document.getElementById(slide.id);
  if (!el) { endIntro(); return; }

  el.classList.add('visible');

  // Animate lines
  slide.lines.forEach(line => {
    setTimeout(() => {
      if (introSkipped) return;
      const lineEl = document.getElementById(line.id);
      if (lineEl) lineEl.classList.add('visible');
    }, line.delay);
  });

  slideTimeout = setTimeout(() => {
    currentSlideIdx++;
    showSlide(currentSlideIdx);
  }, slide.duration);
}

function skipIntro() {
  introSkipped = true;
  if (slideTimeout) clearTimeout(slideTimeout);
  endIntro();
}

function endIntro() {
  cancelAnimationFrame(introAnimFrame);
  cancelAnimationFrame(figureAnimFrame);
  const wrapper = document.getElementById('introWrapper');
  wrapper.classList.add('fade-out');
  setTimeout(() => {
    wrapper.style.display = 'none';
    const main = document.getElementById('mainSite');
    main.style.display = 'block';
    initMainSite();
  }, 1400);
}

// Start intro after short delay
setTimeout(() => showSlide(0), 600);

// ════════════════════════════════════════════
// MAIN SITE
// ════════════════════════════════════════════

function initMainSite() {
  resizeBg();
  resizeExp();
  animateBg();
}

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

// ── EXPLOSION CANVAS ──
const expCanvas = document.getElementById('explosionCanvas');
const expCtx = expCanvas.getContext('2d');
let expParticles = [], expAnimating = false;

function resizeExp() {
  expCanvas.width = window.innerWidth;
  expCanvas.height = window.innerHeight;
}

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

// ── SCENE 5: HEART ──
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
// SCENE 6: 21 SURPRISES
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

    // Progress dots
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

    // Counter
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
    box.addEventListener('touchstart', () => { box.style.transform = 'scale(0.96)'; }, { passive: true });
    box.addEventListener('touchend', () => { box.style.transform = 'scale(1)'; }, { passive: true });

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

  const hint = document.createElement('div');
  hint.className = 'draw-hint';
  hint.textContent = 'جربي ارسمي 🤍';
  scene6.appendChild(hint);

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
    z-index:40; direction:ltr; transition:opacity 0.4s;
  `;
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

  setTimeout(() => { document.getElementById('finalMsg').classList.add('show'); }, 700);
  setTimeout(() => { document.getElementById('finalYtBtn').classList.add('show'); }, 1800);
}

// ── INIT ──
document.addEventListener('touchstart', () => initAudio(), { once: true });
document.addEventListener('click', () => initAudio(), { once: true });
