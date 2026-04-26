// ═══════════════════════════════════
//   STARS
// ═══════════════════════════════════
(function(){
  const c=document.getElementById('stars');
  if(!c)return;
  for(let i=0;i<120;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*2.2+.4;
    s.style.cssText=`width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${Math.random()*3+2}s;animation-delay:${Math.random()*5}s;`;
    c.appendChild(s);
  }
})();

// ═══════════════════════════════════
//   RAIN
// ═══════════════════════════════════
(function(){
  const c=document.getElementById('rain');
  for(let i=0;i<80;i++){
    const d=document.createElement('div');
    d.className='drop';
    const h=Math.random()*60+18;
    d.style.cssText=`left:${Math.random()*100}%;height:${h}px;animation-duration:${Math.random()*1.3+.7}s;animation-delay:${Math.random()*3}s;opacity:${Math.random()*.35+.07};`;
    c.appendChild(d);
  }
})();

// ═══════════════════════════════════
//   FLOATING HEARTS
// ═══════════════════════════════════
(function(){
  const c=document.getElementById('floatHearts');
  const em=['❤️','🤍','💕','💗','💖','🌸','✨','💫'];
  for(let i=0;i<18;i++){
    const h=document.createElement('div');
    h.className='fh';
    h.textContent=em[Math.floor(Math.random()*em.length)];
    h.style.cssText=`left:${Math.random()*100}%;font-size:${Math.random()*1.3+.7}rem;--d:${Math.random()*9+6}s;--dl:${Math.random()*9}s;`;
    c.appendChild(h);
  }
})();

// ═══════════════════════════════════
//   INLINE SVG HELPERS
// ═══════════════════════════════════
const FEMALE_SVG=`<svg viewBox="0 0 80 160" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="26" rx="22" ry="24" fill="#3d1a00"/>
  <ellipse cx="40" cy="30" rx="18" ry="20" fill="#f5cba7"/>
  <ellipse cx="33" cy="28" rx="2.5" ry="3" fill="#2c1a00"/>
  <ellipse cx="47" cy="28" rx="2.5" ry="3" fill="#2c1a00"/>
  <ellipse cx="29" cy="34" rx="4" ry="2" fill="#ffb3cc" opacity=".5"/>
  <ellipse cx="51" cy="34" rx="4" ry="2" fill="#ffb3cc" opacity=".5"/>
  <path d="M34 38 Q40 44 46 38" stroke="#c0392b" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M22 50 Q40 46 58 50 L62 128 Q40 136 18 128Z" fill="#e91e8c" opacity=".9"/>
  <rect x="36" y="48" width="8" height="10" fill="#f5cba7"/>
  <path d="M22 58 Q10 78 14 98" stroke="#f5cba7" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M58 58 Q70 78 66 98" stroke="#f5cba7" stroke-width="7" fill="none" stroke-linecap="round"/>
  <rect x="28" y="126" width="10" height="28" rx="5" fill="#f5cba7"/>
  <rect x="42" y="126" width="10" height="28" rx="5" fill="#f5cba7"/>
</svg>`;

const MALE_SVG=`<svg viewBox="0 0 90 170" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="45" cy="24" rx="24" ry="22" fill="#2c1a00"/>
  <ellipse cx="45" cy="34" rx="22" ry="24" fill="#d4a574"/>
  <ellipse cx="45" cy="52" rx="18" ry="10" fill="#3d2200" opacity=".85"/>
  <ellipse cx="30" cy="46" rx="8" ry="10" fill="#3d2200" opacity=".7"/>
  <ellipse cx="60" cy="46" rx="8" ry="10" fill="#3d2200" opacity=".7"/>
  <ellipse cx="37" cy="30" rx="2.5" ry="3" fill="#1a0d00"/>
  <ellipse cx="53" cy="30" rx="2.5" ry="3" fill="#1a0d00"/>
  <path d="M38 42 Q45 48 52 42" stroke="#8b4513" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="45" cy="98" rx="28" ry="38" fill="#2c3e7a"/>
  <rect x="39" y="56" width="12" height="12" fill="#d4a574"/>
  <path d="M17 73 Q5 93 10 113" stroke="#d4a574" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M73 73 Q85 93 80 113" stroke="#d4a574" stroke-width="9" fill="none" stroke-linecap="round"/>
  <rect x="28" y="130" width="13" height="32" rx="6" fill="#1a2550"/>
  <rect x="49" y="130" width="13" height="32" rx="6" fill="#1a2550"/>
</svg>`;

document.querySelectorAll('.char.female').forEach(el=>{
  if(!el.querySelector('svg')) el.innerHTML=FEMALE_SVG;
});
document.querySelectorAll('.char.male').forEach(el=>{
  if(!el.querySelector('svg')) el.innerHTML=MALE_SVG;
});

// ═══════════════════════════════════
//   SCREEN NAVIGATION
// ═══════════════════════════════════
const screens=document.querySelectorAll('.screen');
let currentScreen=0;
const TOTAL=screens.length;

function goNext(){
  if(currentScreen>=TOTAL-1)return;
  const cur=screens[currentScreen];
  cur.classList.add('exit');
  setTimeout(()=>cur.classList.remove('active','exit'),700);
  currentScreen++;
  const next=screens[currentScreen];
  next.classList.add('active');
  onScreenEnter(currentScreen);
}

function onScreenEnter(idx){
  if(idx===1) animateLines('lines1',story1Lines);
  if(idx===2) animateLines('lines2',story2Lines);
  if(idx===5) initCanvas();
}

// Swipe support
let touchStartY=0;
document.addEventListener('touchstart',e=>{ touchStartY=e.touches[0].clientY; },{passive:true});
document.addEventListener('touchend',e=>{
  const dy=touchStartY-e.changedTouches[0].clientY;
  if(dy>60) goNext();
},{passive:true});

// ═══════════════════════════════════
//   STORY DATA
// ═══════════════════════════════════
const story1Lines=[
  {t:'في يوم 10 / 05 / 2005',cls:''},
  {t:'بدأت حكاية بنيتي ونور عيوني جوجو…',cls:''},
  {t:'سجو❤️‍🔥، من أول لحظة… كان فيها شي مختلف',cls:''},
  {t:'كأنها جاية للدنيا بش تنورها',cls:''},
  {t:'وتكون القطعة الناقصة من قمر ليلة ميلادها',cls:''},
  {t:'كبرت شوي شوي… والطيبة تمشي معاها في كل خطوة',cls:''},
  {t:'أي حد يقرب منها يحس براحة بدون سبب',cls:''},
  {t:'وكانت ابتسامتها… تغير الجو كله',cls:''},
  {t:'سجى 🤍',cls:'name-hl'},
  {t:'مش بس اسم… لكن إحساس',cls:''},
  {t:'اختارت الهندسة 📐 والبرمجة 💻',cls:''},
  {t:'مش طريق سهل… لكن هي ما تعرفش الاستسلام',cls:''},
  {t:'مكافحة • مجتهدة • مواظبة • شطورة',cls:''},
  {t:'مهندستي 🎀 تتعب… لكن تكمل',cls:''},
  {t:'21 سنة من الجمال والطيبة والقوة والحنيه',cls:''},
  {t:'واليوم… هي قريبة تحقق حلمها',cls:''},
  {t:'احلا خريجه واحلا بش مهندسه 🎀🤍',cls:''},
  {t:'رافعه راسها وفخورة بنفسها',cls:''},
  {t:'وهذا هو… أجمل شي فيها',cls:''},
  {t:'سجى 🤍',cls:'name-hl'},
];

const story2Lines=[
  {t:'وفي لحظة… ما كانتش محسوبة',cls:''},
  {t:'بدت حكايتي اني وملاذي الآمن جوجو نور عيوني…',cls:''},
  {t:'مش صدفة عادية ولا مجرد تعارف',cls:''},
  {t:'تعرفت على سجى عن طريق رسالة في تلجرام',cls:''},
  {t:'كانت تسأل على مشروع في مادة برمجة مرئيه 1…',cls:''},
  {t:'قررت نساعدها لجمال اسلوبها',cls:''},
  {t:'كانت تحكي باحترام، تشكر… وتعتذر…',cls:''},
  {t:'بطريقة خلتني نوقف ونحس… إنها مش زي أي حد 🤍',cls:''},
  {t:'بدي الكلام خفيف… مجرد دراسة ومساعدة',cls:''},
  {t:'لكن مع الأيام… بدي يومي، بدي في انتظار',cls:''},
  {t:'بدي في تعلّق… بدون حتى ما نحس حبيتهاا',cls:''},
  {t:'لين جت فترة… كنت تحت ضغط في مشروع التخرج',cls:''},
  {t:'تعب، توتر، تفكييرر',cls:''},
  {t:'وقفت معايا… سهرت معايا',cls:''},
  {t:'تسند فيا وتخفف عليا وكأنها حاسّة بكل شي',cls:''},
  {t:'في اللحظة هذي… فهمت',cls:''},
  {t:'إنها مش شخص عادي ولا مجرد حد في حياتي',cls:''},
  {t:'هي حاجة أكبر',cls:''},
  {t:'يوم عطتني شال كهدية للتخرج',cls:''},
  {t:'في وقت كنت حتى أنا مش عارف كيف بندير لنفسي حاجة',cls:''},
  {t:'اللحظة هذي كانت كبيرة عندي',cls:''},
  {t:'وقيمتها… أكبر من أي حاجة مادية',cls:''},
  {t:'حتى سؤال عادي، حتى كلمة صغيرة، حتى ريبوست على تيك توك يخليني فرحان',cls:''},
  {t:'ملاذي الآمن 🤍',cls:'name-hl'},
  {t:'ودنيتي كلها',cls:''},
  {t:'ومن غيرها… نحس روحي بروحي… ومش مرتاح',cls:''},
  {t:'اني معاذ تعرفت علي سجى وحبيتها قبل ل نعرف روحي حبيتها',cls:''},
  {t:'فجأة كأنها يد كبيره حضنتني بقوه',cls:''},
  {t:'حنيتها تخلي فيا نحس في روحي انسان مؤذي ونخاف نقسى عليها فيوم',cls:''},
  {t:'تسند فيا وتدعم فيا بشكل منقدرش نوصفه',cls:''},
  {t:'وكان ليها الفضل في انجازي لمشروع التخرج',cls:''},
  {t:'خوفها عليا ونصائحها ليا كانهم نسمه بارده تصححلي في مساري',cls:''},
  {t:'ومرات لما نغلط تزعل مني واني منرضاش تقعد زعلانه مني دقيقه',cls:''},
  {t:'نحبها حب منقدرش لا نوصفه ولا نعبر عليه',cls:''},
  {t:'ان شاء الله ربي يكتب في قلبها نفس مقدار حبي ليها',cls:''},
  {t:'الوحيده ل متخليش فيا لما نتضايق',cls:''},
  {t:'متأكد انها ملاك نازل ع الدنيا بكميه الحنيه والطيبه هادي كلها',cls:''},
];

function animateLines(containerId,lines){
  const c=document.getElementById(containerId);
  if(!c||c.dataset.done)return;
  c.dataset.done='1';
  c.innerHTML='';
  lines.forEach((l,i)=>{
    const span=document.createElement('span');
    span.className='line-item'+(l.cls?' '+l.cls:'');
    span.textContent=l.t;
    c.appendChild(span);
    setTimeout(()=>span.classList.add('show'),i*120+200);
  });
}

// ═══════════════════════════════════
//   SURPRISE CARDS
// ═══════════════════════════════════
const surprises=[
  {e:'🌙',m:'أنتِ نور حياتي زي القمر 🌙'},
  {e:'💌',m:'كل رسالة منك تخلي يومي أحلى 💌'},
  {e:'🎓',m:'مهندستي المستقبلية، أنا فخور بيكِ 🎓'},
  {e:'🌸',m:'طيبتك مش طبيعية، ربي يحفظها 🌸'},
  {e:'✨',m:'ابتسامتك تغير الجو كله ✨'},
  {e:'🤍',m:'ملاذي الآمن في كل وقت 🤍'},
  {e:'💻',m:'البرمجة خلتنا نتعرف، والقدر جمعنا 💻'},
  {e:'🎀',m:'الشال هديتك اللي ما ننساها 🎀'},
  {e:'🌹',m:'أنتِ أجمل شي في حياتي 🌹'},
  {e:'💫',m:'عيونك مذوبيني من أول نظرة 💫'},
  {e:'🕊️',m:'راحتي وسكينتي أنتِ 🕊️'},
  {e:'🌙',m:'ليلة ميلادك نزل قمر على الأرض 🌙'},
  {e:'💝',m:'حبك في قلبي ما يوصفه كلام 💝'},
  {e:'🌟',m:'نجمتي اللي تضوي دربي 🌟'},
  {e:'🤗',m:'دعمك ليا كان أكبر من أي حاجة 🤗'},
  {e:'🎵',m:'كل أغنية حلوة تذكرني بيكِ 🎵'},
  {e:'☁️',m:'أنتِ الهدوء في وسط الضغط ☁️'},
  {e:'💐',m:'كل يوم معك زهرة جديدة 💐'},
  {e:'🙏',m:'ربي يجمعنا بالحلال ويسعدنا 🙏'},
  {e:'🔥',m:'سجو❤️‍🔥 أنتِ الفريدة من نوعها'},
  {e:'🎂',m:'عيد ميلادك الـ21 مبارك يا أحلى إنسانة 🎂🤍'},
];

const grid=document.getElementById('cardsGrid');
surprises.forEach((s,i)=>{
  const card=document.createElement('div');
  card.className='s-card';
  card.innerHTML=`<div class="s-emoji">${s.e}</div><div class="s-front">مفاجأة ${i+1}<br>اضغطي</div><div class="s-back">${s.m}</div>`;
  card.addEventListener('click',()=>{
    card.classList.toggle('open');
    if(card.classList.contains('open')) miniHearts(card);
  });
  grid.appendChild(card);
});

function miniHearts(el){
  const r=el.getBoundingClientRect();
  for(let i=0;i<6;i++){
    const h=document.createElement('div');
    h.className='click-heart';
    h.textContent=['❤️','💕','🌸','✨'][Math.floor(Math.random()*4)];
    h.style.cssText=`left:${r.left+Math.random()*r.width}px;top:${r.top+Math.random()*r.height}px;font-size:${Math.random()*1.1+.8}rem;animation-delay:${Math.random()*.3}s;`;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1700);
  }
}

// ═══════════════════════════════════
//   CANVAS DRAWING
// ═══════════════════════════════════
let canvasReady=false;
let drawing=false,lx=0,ly=0;
const COLORS=['#ff6b9d','#ff9ff3','#ffd6e7','#c56cf0','#ff4757','#ffffff'];
let colorIdx=0;

function initCanvas(){
  if(canvasReady)return;
  canvasReady=true;
  const canvas=document.getElementById('drawCanvas');
  const ctx=canvas.getContext('2d');
  const parent=canvas.parentElement;
  canvas.width=parent.clientWidth;
  canvas.height=Math.min(window.innerHeight*.38,300);

  function getPos(e){
    const r=canvas.getBoundingClientRect();
    if(e.touches)return{x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top};
    return{x:e.clientX-r.left,y:e.clientY-r.top};
  }

  function doDraw(e){
    const p=getPos(e);
    ctx.beginPath();
    ctx.moveTo(lx,ly);
    ctx.lineTo(p.x,p.y);
    ctx.strokeStyle=COLORS[colorIdx];
    ctx.lineWidth=4;
    ctx.lineCap='round';
    ctx.lineJoin='round';
    ctx.shadowColor=COLORS[colorIdx];
    ctx.shadowBlur=14;
    ctx.stroke();
    if(Math.random()<.05){
      ctx.font=`${Math.random()*16+10}px serif`;
      ctx.fillStyle=COLORS[colorIdx];
      ctx.shadowBlur=8;
      ctx.fillText(['❤️','🌸','✨','💕'][Math.floor(Math.random()*4)],p.x-8,p.y-8);
    }
    lx=p.x;ly=p.y;
  }

  canvas.addEventListener('mousedown',e=>{drawing=true;const p=getPos(e);lx=p.x;ly=p.y;});
  canvas.addEventListener('mousemove',e=>{if(!drawing)return;e.preventDefault();doDraw(e);});
  canvas.addEventListener('mouseup',()=>drawing=false);
  canvas.addEventListener('mouseleave',()=>drawing=false);
  canvas.addEventListener('touchstart',e=>{drawing=true;const p=getPos(e);lx=p.x;ly=p.y;},{passive:false});
  canvas.addEventListener('touchmove',e=>{if(!drawing)return;e.preventDefault();doDraw(e);},{passive:false});
  canvas.addEventListener('touchend',()=>drawing=false);
}

function clearCanvas(){
  const canvas=document.getElementById('drawCanvas');
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function changeColor(){
  colorIdx=(colorIdx+1)%COLORS.length;
}

// ═══════════════════════════════════
//   GIFT
// ═══════════════════════════════════
let giftDone=false;

function openGift(){
  if(giftDone)return;
  giftDone=true;
  const gift=document.getElementById('gift3d');
  const burst=document.getElementById('giftBurst');
  const card=document.getElementById('bdayCard');
  const tap=document.getElementById('giftTap');
  const afterBtn=document.getElementById('afterGift');

  gift.classList.add('opened');
  tap.style.opacity='0';

  for(let i=0;i<40;i++){
    setTimeout(()=>{
      const p=document.createElement('div');
      p.className='click-heart';
      p.textContent=['❤️','💕','🌸','✨','💖','🤍','⭐'][Math.floor(Math.random()*7)];
      const r=gift.getBoundingClientRect();
      p.style.cssText=`left:${r.left+Math.random()*r.width}px;top:${r.top+Math.random()*r.height}px;font-size:${Math.random()*1.8+.8}rem;animation-delay:${Math.random()*.15}s;`;
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),1800);
    },i*40);
  }

  burst.style.cssText='background:radial-gradient(circle,rgba(255,255,255,.6),transparent 70%);animation:burstFade .8s ease forwards;';
  const style=document.createElement('style');
  style.textContent='@keyframes burstFade{0%{opacity:1}100%{opacity:0}}';
  document.head.appendChild(style);

  setTimeout(()=>{
    gift.style.display='none';
    card.classList.add('show');
    setTimeout(()=>{ afterBtn.style.display='block'; },1200);
  },900);
}

// ═══════════════════════════════════
//   FINAL HEART BURST
// ═══════════════════════════════════
function heartBurst(e){
  for(let i=0;i<12;i++){
    const h=document.createElement('div');
    h.className='click-heart';
    h.textContent=['❤️','💕','🌸','✨','💖','🤍','💗','💝'][Math.floor(Math.random()*8)];
    h.style.cssText=`left:${e.clientX+(Math.random()-.5)*80}px;top:${e.clientY+(Math.random()-.5)*80}px;font-size:${Math.random()*1.6+.9}rem;animation-delay:${Math.random()*.3}s;`;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1800);
  }
}

// ═══════════════════════════════════
//   MUSIC TOGGLE
// ═══════════════════════════════════
const musicBtn=document.getElementById('musicBtn');
const bgMusic=document.getElementById('bgMusic');
let musicOn=false;

musicBtn.addEventListener('click',()=>{
  if(!musicOn){
    bgMusic.volume=.18;
    bgMusic.play().catch(()=>{});
    musicBtn.classList.add('playing');
    musicBtn.textContent='🔊';
    musicOn=true;
  } else {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.textContent='🎵';
    musicOn=false;
  }
});
