// ══════════════════════════════════════
//   STARS
// ══════════════════════════════════════
(function () {
  const c = document.getElementById('stars');
  if (!c) return;
  for (let i = 0; i < 130; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.4 + 0.4;
    s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${Math.random()*3+2}s;animation-delay:${Math.random()*5}s;`;
    c.appendChild(s);
  }
})();

// ══════════════════════════════════════
//   RAIN
// ══════════════════════════════════════
(function () {
  const c = document.getElementById('rain');
  for (let i = 0; i < 90; i++) {
    const d = document.createElement('div');
    d.className = 'drop';
    const h = Math.random() * 65 + 18;
    d.style.cssText = `left:${Math.random()*100}%;height:${h}px;animation-duration:${Math.random()*1.4+0.7}s;animation-delay:${Math.random()*3}s;opacity:${Math.random()*0.38+0.08};`;
    c.appendChild(d);
  }
})();

// ══════════════════════════════════════
//   FLOATING HEARTS
// ══════════════════════════════════════
(function () {
  const c = document.getElementById('floatHearts');
  const em = ['❤️','🤍','💕','💗','💖','🌸','✨','💫'];
  for (let i = 0; i < 20; i++) {
    const h = document.createElement('div');
    h.className = 'fh';
    h.textContent = em[Math.floor(Math.random() * em.length)];
    h.style.cssText = `left:${Math.random()*100}%;font-size:${Math.random()*1.4+0.7}rem;--d:${Math.random()*9+6}s;--delay:${Math.random()*9}s;`;
    c.appendChild(h);
  }
})();

// ══════════════════════════════════════
//   INTERSECTION OBSERVER — fade-in
// ══════════════════════════════════════
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scene-inner').forEach(el => io.observe(el));

// ══════════════════════════════════════
//   SURPRISE CARDS
// ══════════════════════════════════════
const surprises = [
  { emoji: '🌙', msg: 'أنتِ نور حياتي زي القمر بالضبط 🌙' },
  { emoji: '💌', msg: 'كل رسالة منك تخلي يومي أحلى 💌' },
  { emoji: '🎓', msg: 'مهندستي المستقبلية، أنا فخور بيكِ 🎓' },
  { emoji: '🌸', msg: 'طيبتك مش طبيعية، ربي يحفظها 🌸' },
  { emoji: '✨', msg: 'ابتسامتك تغير الجو كله ✨' },
  { emoji: '🤍', msg: 'ملاذي الآمن في كل وقت 🤍' },
  { emoji: '💻', msg: 'البرمجة خلتنا نتعرف، والقدر جمعنا 💻' },
  { emoji: '🎀', msg: 'الشال هديتك اللي ما ننساها 🎀' },
  { emoji: '🌹', msg: 'أنتِ أجمل شي في حياتي 🌹' },
  { emoji: '💫', msg: 'عيونك مذوبيني من أول نظرة 💫' },
  { emoji: '🕊️', msg: 'راحتي وسكينتي أنتِ 🕊️' },
  { emoji: '🌙', msg: 'ليلة ميلادك نزل قمر على الأرض 🌙' },
  { emoji: '💝', msg: 'حبك في قلبي ما يوصفه كلام 💝' },
  { emoji: '🌟', msg: 'نجمتي اللي تضوي دربي 🌟' },
  { emoji: '🤗', msg: 'دعمك ليا كان أكبر من أي حاجة 🤗' },
  { emoji: '🎵', msg: 'كل أغنية حلوة تذكرني بيكِ 🎵' },
  { emoji: '☁️', msg: 'أنتِ الهدوء في وسط الضغط ☁️' },
  { emoji: '💐', msg: 'كل يوم معك زهرة جديدة 💐' },
  { emoji: '🙏', msg: 'ربي يجمعنا بالحلال ويسعدنا 🙏' },
  { emoji: '🔥', msg: 'سجو❤️‍🔥 أنتِ الفريدة من نوعها' },
  { emoji: '🎂', msg: 'عيد ميلادك الـ21 مبارك يا أحلى إنسانة 🎂🤍' },
];

const grid = document.getElementById('cardsGrid');
surprises.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 's-card';
  card.innerHTML = `<div class="s-emoji">${s.emoji}</div><div class="s-front">مفاجأة ${i + 1} 🎁<br>اضغطي</div><div class="s-back">${s.msg}</div>`;
  card.addEventListener('click', () => {
    card.classList.toggle('open');
    if (card.classList.contains('open')) miniHearts(card);
  });
  grid.appendChild(card);
});

function miniHearts(el) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 7; i++) {
    const h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = ['❤️','💕','🌸','✨'][Math.floor(Math.random()*4)];
    h.style.cssText = `left:${r.left + Math.random()*r.width}px;top:${r.top + Math.random()*r.height}px;font-size:${Math.random()*1.2+0.9}rem;animation-delay:${Math.random()*0.3}s;`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1700);
  }
}

// ══════════════════════════════════════
//   CANVAS DRAWING
// ══════════════════════════════════════
const canvas = document.getElementById('drawCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  const p = canvas.parentElement;
  canvas.width  = Math.min(p.clientWidth - 32, 720);
  canvas.height = Math.min(window.innerHeight * 0.44, 370);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let drawing = false, lx = 0, ly = 0, hue = 0;

function pos(e) {
  const r = canvas.getBoundingClientRect();
  if (e.touches) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

canvas.addEventListener('mousedown',  e => { drawing = true; const p = pos(e); lx = p.x; ly = p.y; });
canvas.addEventListener('mousemove',  e => { if (!drawing) return; e.preventDefault(); doDraw(e); });
canvas.addEventListener('mouseup',    () => drawing = false);
canvas.addEventListener('mouseleave', () => drawing = false);
canvas.addEventListener('touchstart', e => { drawing = true; const p = pos(e); lx = p.x; ly = p.y; }, { passive: false });
canvas.addEventListener('touchmove',  e => { if (!drawing) return; e.preventDefault(); doDraw(e); }, { passive: false });
canvas.addEventListener('touchend',   () => drawing = false);

function doDraw(e) {
  const p = pos(e);
  hue = (hue + 2) % 360;
  ctx.beginPath();
  ctx.moveTo(lx, ly);
  ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = `hsl(${hue},100%,72%)`;
  ctx.lineWidth   = 4;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.shadowColor = `hsl(${hue},100%,68%)`;
  ctx.shadowBlur  = 16;
  ctx.stroke();
  if (Math.random() < 0.045) {
    ctx.font      = `${Math.random()*18+12}px serif`;
    ctx.fillStyle = `hsl(${hue},100%,78%)`;
    ctx.shadowBlur = 10;
    ctx.fillText(['❤️','🌸','✨','💕'][Math.floor(Math.random()*4)], p.x - 10, p.y - 10);
  }
  lx = p.x; ly = p.y;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ══════════════════════════════════════
//   GIFT
// ══════════════════════════════════════
let giftDone = false;

function openGift() {
  if (giftDone) return;
  giftDone = true;
  const box  = document.getElementById('giftBox');
  const msg  = document.getElementById('giftMsg');
  const hint = document.getElementById('giftHint');
  box.classList.add('opened');
  hint.style.opacity = '0';
  setTimeout(() => {
    msg.classList.add('show');
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const h = document.createElement('div');
        h.className = 'click-heart';
        h.textContent = ['❤️','💕','🌸','✨','💖','🤍'][Math.floor(Math.random()*6)];
        const r = box.getBoundingClientRect();
        h.style.cssText = `left:${r.left + Math.random()*r.width}px;top:${r.top + Math.random()*r.height}px;font-size:${Math.random()*1.6+0.9}rem;animation-delay:${Math.random()*0.2}s;`;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1700);
      }, i * 75);
    }
  }, 650);
}

// ══════════════════════════════════════
//   FINAL TOUCH HEARTS
// ══════════════════════════════════════
function spawnHearts(e) {
  for (let i = 0; i < 10; i++) {
    const h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = ['❤️','💕','🌸','✨','💖','🤍','💗'][Math.floor(Math.random()*7)];
    h.style.cssText = `left:${e.clientX + (Math.random()-.5)*70}px;top:${e.clientY + (Math.random()-.5)*70}px;font-size:${Math.random()*1.5+0.9}rem;animation-delay:${Math.random()*0.3}s;`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1700);
  }
}
