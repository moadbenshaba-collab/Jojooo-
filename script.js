// ===== STARS =====
(function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*100}%;
      left:${Math.random()*100}%;
      --dur:${Math.random()*3+2}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(s);
  }
})();

// ===== RAIN =====
(function createRain() {
  const container = document.getElementById('rain');
  for (let i = 0; i < 80; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    const height = Math.random() * 60 + 20;
    drop.style.cssText = `
      left:${Math.random()*100}%;
      height:${height}px;
      animation-duration:${Math.random()*1.5+0.8}s;
      animation-delay:${Math.random()*3}s;
      opacity:${Math.random()*0.4+0.1};
    `;
    container.appendChild(drop);
  }
})();

// ===== FLOATING HEARTS =====
(function createFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const emojis = ['❤️','🤍','💕','💗','💖','🌸','✨'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `
      left:${Math.random()*100}%;
      --dur:${Math.random()*8+6}s;
      animation-delay:${Math.random()*8}s;
      font-size:${Math.random()*1.5+0.8}rem;
    `;
    container.appendChild(h);
  }
})();

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));

// ===== SURPRISE CARDS =====
const surprises = [
  { num: '1',  emoji: '🌙', msg: 'أنتِ نور حياتي زي القمر بالضبط 🌙' },
  { num: '2',  emoji: '💌', msg: 'كل رسالة منك تخلي يومي أحلى 💌' },
  { num: '3',  emoji: '🎓', msg: 'مهندستي المستقبلية، أنا فخور بيكِ 🎓' },
  { num: '4',  emoji: '🌸', msg: 'طيبتك مش طبيعية، ربي يحفظها 🌸' },
  { num: '5',  emoji: '✨', msg: 'ابتسامتك تغير الجو كله ✨' },
  { num: '6',  emoji: '🤍', msg: 'ملاذي الآمن في كل وقت 🤍' },
  { num: '7',  emoji: '💻', msg: 'البرمجة خلتنا نتعرف، والقدر جمعنا 💻' },
  { num: '8',  emoji: '🎀', msg: 'الشال هديتك اللي ما ننساها 🎀' },
  { num: '9',  emoji: '🌹', msg: 'أنتِ أجمل شي في حياتي 🌹' },
  { num: '10', emoji: '💫', msg: 'عيونك مذوبيني من أول نظرة 💫' },
  { num: '11', emoji: '🕊️', msg: 'راحتي وسكينتي أنتِ 🕊️' },
  { num: '12', emoji: '🌙', msg: 'ليلة ميلادك نزل قمر على الأرض 🌙' },
  { num: '13', emoji: '💝', msg: 'حبك في قلبي ما يوصفه كلام 💝' },
  { num: '14', emoji: '🌟', msg: 'نجمتي اللي تضوي دربي 🌟' },
  { num: '15', emoji: '🤗', msg: 'دعمك ليا كان أكبر من أي حاجة 🤗' },
  { num: '16', emoji: '🎵', msg: 'كل أغنية حلوة تذكرني بيكِ 🎵' },
  { num: '17', emoji: '☁️', msg: 'أنتِ الهدوء في وسط الضغط ☁️' },
  { num: '18', emoji: '💐', msg: 'كل يوم معك زهرة جديدة 💐' },
  { num: '19', emoji: '🙏', msg: 'ربي يجمعنا بالحلال ويسعدنا 🙏' },
  { num: '20', emoji: '🔥', msg: 'سجو❤️‍🔥 أنتِ الفريدة من نوعها' },
  { num: '21', emoji: '🎂', msg: 'عيد ميلادك الـ21 مبارك يا أحلى إنسانة 🎂🤍' },
];

const grid = document.getElementById('cardsGrid');
surprises.forEach((s) => {
  const card = document.createElement('div');
  card.className = 'surprise-card';
  card.innerHTML = `
    <div class="card-number">${s.emoji}</div>
    <div class="card-front">مفاجأة ${s.num} 🎁<br>اضغطي</div>
    <div class="card-back">${s.msg}</div>
  `;
  card.addEventListener('click', () => {
    card.classList.toggle('opened');
    if (card.classList.contains('opened')) spawnMiniHearts(card);
  });
  grid.appendChild(card);
});

function spawnMiniHearts(el) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = ['❤️','💕','🌸','✨'][Math.floor(Math.random()*4)];
    h.style.left = (rect.left + Math.random()*rect.width) + 'px';
    h.style.top  = (rect.top  + Math.random()*rect.height) + 'px';
    h.style.animationDelay = (Math.random()*0.3) + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1600);
  }
}

// ===== CANVAS DRAWING =====
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const parent = canvas.parentElement;
  const w = Math.min(parent.clientWidth - 40, 720);
  const h = Math.min(window.innerHeight * 0.45, 380);
  canvas.width = w;
  canvas.height = h;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let drawing = false, lastX = 0, lastY = 0, hue = 0;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function startDraw(e) {
  drawing = true;
  const pos = getPos(e);
  lastX = pos.x; lastY = pos.y;
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  const pos = getPos(e);
  hue = (hue + 2) % 360;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = `hsl(${hue}, 100%, 75%)`;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
  ctx.shadowBlur = 15;
  ctx.stroke();
  if (Math.random() < 0.04) {
    ctx.font = `${Math.random()*20+14}px serif`;
    ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
    ctx.shadowBlur = 10;
    ctx.fillText(['❤️','🌸','✨','💕'][Math.floor(Math.random()*4)], pos.x - 10, pos.y - 10);
  }
  lastX = pos.x; lastY = pos.y;
}

function stopDraw() { drawing = false; }

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', stopDraw);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ===== GIFT =====
let giftOpened = false;
function openGift() {
  if (giftOpened) return;
  giftOpened = true;
  const box = document.getElementById('giftBox');
  const msg = document.getElementById('giftMessage');
  box.classList.add('opened');
  setTimeout(() => {
    msg.classList.add('show');
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const h = document.createElement('div');
        h.className = 'click-heart';
        h.textContent = ['❤️','💕','🌸','✨','💖','🤍'][Math.floor(Math.random()*6)];
        const rect = box.getBoundingClientRect();
        h.style.left = (rect.left + Math.random()*rect.width) + 'px';
        h.style.top  = (rect.top  + Math.random()*rect.height) + 'px';
        h.style.fontSize = (Math.random()*1.5+1) + 'rem';
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1600);
      }, i * 80);
    }
  }, 600);
}

// ===== FINAL TOUCH HEARTS =====
function spawnHearts(e) {
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('div');
    h.className = 'click-heart';
    h.textContent = ['❤️','💕','🌸','✨','💖','🤍','💗'][Math.floor(Math.random()*7)];
    h.style.left = (e.clientX + (Math.random()-0.5)*60) + 'px';
    h.style.top  = (e.clientY + (Math.random()-0.5)*60) + 'px';
    h.style.fontSize = (Math.random()*1.5+1) + 'rem';
    h.style.animationDelay = (Math.random()*0.3) + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1600);
  }
}
