// STARS
(function(){
  const c=document.getElementById('stars');
  if(!c)return;
  for(let i=0;i<110;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*2+.4;
    s.style.cssText=`width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${Math.random()*3+2}s;animation-delay:${Math.random()*5}s;`;
    c.appendChild(s);
  }
})();

// RAIN
(function(){
  const c=document.getElementById('rain');
  for(let i=0;i<70;i++){
    const d=document.createElement('div');
    d.className='drop';
    const h=Math.random()*55+15;
    d.style.cssText=`left:${Math.random()*100}%;height:${h}px;animation-duration:${Math.random()*1.2+.7}s;animation-delay:${Math.random()*3}s;opacity:${Math.random()*.3+.06};`;
    c.appendChild(d);
  }
})();

// FLOATING HEARTS
(function(){
  const c=document.getElementById('floatHearts');
  const em=['❤️','🤍','💕','💗','💖','🌸','✨','💫'];
  for(let i=0;i<16;i++){
    const h=document.createElement('div');
    h.className='fh';
    h.textContent=em[Math.floor(Math.random()*em.length)];
    h.style.cssText=`left:${Math.random()*100}%;font-size:${Math.random()*1.2+.6}rem;--d:${Math.random()*9+6}s;--dl:${Math.random()*9}s;`;
    c.appendChild(h);
  }
})();

// SCREEN NAVIGATION
const screens=document.querySelectorAll('.screen');
let cur=0;

function goTo(idx){
  if(idx>=screens.length)return;
  screens[cur].classList.add('exit');
  setTimeout(()=>screens[cur].classList.remove('active','exit'),650);
  cur=idx;
  screens[cur].classList.add('active');
  screens[cur].scrollTop=0;
  onEnter(cur);
}

function onEnter(idx){
  if(idx===1) startStory('storyBox1','btn1',story1);
  if(idx===2) startStory('storyBox2','btn2',story2);
  if(idx===4) initSurprises();
  if(idx===5) initCanvas();
}

// STORY DATA
const story1=[
  {t:'في يوم 10 / 05 / 2005',hl:false},
  {t:'بدأت حكاية بنيتي ونور عيوني جوجو…',hl:false},
  {t:'سجو❤️‍🔥، من أول لحظة… كان فيها شي مختلف',hl:false},
  {t:'كأنها جاية للدنيا بش تنورها',hl:false},
  {t:'وتكون القطعة الناقصة من قمر ليلة ميلادها',hl:false},
  {t:'كبرت شوي شوي… والطيبة تمشي معاها في كل خطوة',hl:false},
  {t:'أي حد يقرب منها يحس براحة بدون سبب',hl:false},
  {t:'وكانت ابتسامتها… تغير الجو كله',hl:false},
  {t:'سجى 🤍',hl:true},
  {t:'مش بس اسم… لكن إحساس',hl:false},
  {t:'اختارت الهندسة 📐 والبرمجة 💻',hl:false},
  {t:'مش طريق سهل… لكن هي ما تعرفش الاستسلام',hl:false},
  {t:'مكافحة • مجتهدة • مواظبة • شطورة',hl:false},
  {t:'مهندستي 🎀 تتعب… لكن تكمل',hl:false},
  {t:'21 سنة من الجمال والطيبة والقوة والحنيه',hl:false},
  {t:'واليوم… هي قريبة تحقق حلمها',hl:false},
  {t:'احلا خريجه واحلا بش مهندسه 🎀🤍',hl:false},
  {t:'رافعه راسها وفخورة بنفسها',hl:false},
  {t:'وهذا هو… أجمل شي فيها',hl:false},
  {t:'سجى 🤍',hl:true},
];

const story2=[
  {t:'وفي لحظة… ما كانتش محسوبة',hl:false},
  {t:'بدت حكايتي اني وملاذي الآمن جوجو نور عيوني…',hl:false},
  {t:'مش صدفة عادية ولا مجرد تعارف',hl:false},
  {t:'تعرفت على سجى عن طريق رسالة في تلجرام',hl:false},
  {t:'كانت تسأل على مشروع في مادة برمجة مرئيه 1…',hl:false},
  {t:'قررت نساعدها لجمال اسلوبها',hl:false},
  {t:'كانت تحكي باحترام، تشكر… وتعتذر…',hl:false},
  {t:'بطريقة خلتني نوقف ونحس… إنها مش زي أي حد 🤍',hl:false},
  {t:'بدي الكلام خفيف… مجرد دراسة ومساعدة',hl:false},
  {t:'لكن مع الأيام… بدي يومي، بدي في انتظار',hl:false},
  {t:'بدي في تعلّق… بدون حتى ما نحس حبيتهاا',hl:false},
  {t:'لين جت فترة… كنت تحت ضغط في مشروع التخرج',hl:false},
  {t:'تعب، توتر، تفكييرر',hl:false},
  {t:'وقفت معايا… سهرت معايا',hl:false},
  {t:'تسند فيا وتخفف عليا وكأنها حاسّة بكل شي',hl:false},
  {t:'في اللحظة هذي… فهمت',hl:false},
  {t:'إنها مش شخص عادي ولا مجرد حد في حياتي',hl:false},
  {t:'هي حاجة أكبر',hl:false},
  {t:'يوم عطتني شال كهدية للتخرج',hl:false},
  {t:'في وقت كنت حتى أنا مش عارف كيف بندير لنفسي حاجة',hl:false},
  {t:'اللحظة هذي كانت كبيرة عندي',hl:false},
  {t:'وقيمتها… أكبر من أي حاجة مادية',hl:false},
  {t:'حتى سؤال عادي، حتى كلمة صغيرة، حتى ريبوست على تيك توك يخليني فرحان',hl:false},
  {t:'ملاذي الآمن 🤍',hl:true},
  {t:'ودنيتي كلها',hl:false},
  {t:'ومن غيرها… نحس روحي بروحي… ومش مرتاح',hl:false},
  {t:'اني معاذ تعرفت علي سجى وحبيتها قبل ل نعرف روحي حبيتها',hl:false},
  {t:'فجأة كأنها يد كبيره حضنتني بقوه',hl:false},
  {t:'حنيتها تخلي فيا نحس في روحي انسان مؤذي ونخاف نقسى عليها فيوم',hl:false},
  {t:'تسند فيا وتدعم فيا بشكل منقدرش نوصفه',hl:false},
  {t:'وكان ليها الفضل في انجازي لمشروع التخرج',hl:false},
  {t:'خوفها عليا ونصائحها ليا كانهم نسمه بارده تصححلي في مساري',hl:false},
  {t:'ومرات لما نغلط تزعل مني واني منرضاش تقعد زعلانه مني دقيقه',hl:false},
  {t:'نحبها حب منقدرش لا نوصفه ولا نعبر عليه',hl:false},
  {t:'ان شاء الله ربي يكتب في قلبها نفس مقدار حبي ليها',hl:false},
  {t:'الوحيده ل متخليش فيا لما نتضايق',hl:false},
  {t:'متأكد انها ملاك نازل ع الدنيا بكميه الحنيه والطيبه هادي كلها',hl:false},
];

function startStory(boxId,btnId,lines){
  const box=document.getElementById(boxId);
  const btn=document.getElementById(btnId);
  if(!box||box.dataset.done)return;
  box.dataset.done='1';
  box.innerHTML='';
  btn.classList.add('hidden');
  lines.forEach((l,i)=>{
    const span=document.createElement('span');
    span.className='story-line'+(l.hl?' name-hl':'');
    span.textContent=l.t;
    box.appendChild(span);
    setTimeout(()=>span.classList.add('show'),i*160+300);
  });
  setTimeout(()=>btn.classList.remove('hidden'),lines.length*160+800);
}

// SURPRISES
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

let surpriseIdx=0;

function initSurprises(){
  surpriseIdx=0;
  showSurprise(0);
}

function showSurprise(i){
  const prog=document.getElementById('surpriseProgress');
  const emoji=document.getElementById('surpriseEmoji');
  const msg=document.getElementById('surpriseMsg');
  const nextBtn=document.getElementById('surpriseNext');
  prog.textContent=`${i+1} / ${surprises.length}`;
  emoji.textContent=surprises[i].e;
  msg.textContent=surprises[i].m;
  const card=document.getElementById('surpriseCard');
  card.style.opacity='0';card.style.transform='scale(.9)';
  requestAnimationFrame(()=>{
    card.style.transition='opacity .4s ease,transform .4s ease';
    card.style.opacity='1';card.style.transform='scale(1)';
  });
  if(i>=surprises.length-1){
    nextBtn.textContent='كملي 🤍';
    nextBtn.onclick=()=>goTo(5);
  } else {
    nextBtn.textContent='التالية 🤍';
    nextBtn.onclick=nextSurprise;
  }
}

function nextSurprise(){
  if(surpriseIdx<surprises.length-1){
    surpriseIdx++;
    showSurprise(surpriseIdx);
    miniHearts(document.getElementById('surpriseCard'));
  }
}

function miniHearts(el){
  const r=el.getBoundingClientRect();
  for(let i=0;i<5;i++){
    const h=document.createElement('div');
    h.className='click-heart';
    h.textContent=['❤️','💕','🌸','✨'][Math.floor(Math.random()*4)];
    h.style.cssText=`left:${r.left+Math.random()*r.width}px;top:${r.top+Math.random()*r.height}px;font-size:${Math.random()*1+.8}rem;animation-delay:${Math.random()*.25}s;`;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1700);
  }
}

// CANVAS
let canvasReady=false,drawing=false,lx=0,ly=0;
const COLORS=['#ff6b9d','#ffb3cc','#c56cf0','#ff4757','#ffd6e7','#ffffff'];
let cIdx=0;

function initCanvas(){
  if(canvasReady)return;
  canvasReady=true;
  const canvas=document.getElementById('drawCanvas');
  const ctx=canvas.getContext('2d');
  const wrap=canvas.parentElement;
  canvas.width=wrap.clientWidth;
  canvas.height=Math.min(window.innerHeight*.38,290);
  function gp(e){
    const r=canvas.getBoundingClientRect();
    if(e.touches)return{x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top};
    return{x:e.clientX-r.left,y:e.clientY-r.top};
  }
  function draw(e){
    const p=gp(e);
    ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p.x,p.y);
    ctx.strokeStyle=COLORS[cIdx];ctx.lineWidth=4;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.shadowColor=COLORS[cIdx];ctx.shadowBlur=12;ctx.stroke();
    if(Math.random()<.05){
      ctx.font=`${Math.random()*14+10}px serif`;ctx.fillStyle=COLORS[cIdx];ctx.shadowBlur=8;
      ctx.fillText(['❤️','🌸','✨','💕'][Math.floor(Math.random()*4)],p.x-7,p.y-7);
    }
    lx=p.x;ly=p.y;
  }
  canvas.addEventListener('mousedown',e=>{drawing=true;const p=gp(e);lx=p.x;ly=p.y;});
  canvas.addEventListener('mousemove',e=>{if(!drawing)return;e.preventDefault();draw(e);});
  canvas.addEventListener('mouseup',()=>drawing=false);
  canvas.addEventListener('mouseleave',()=>drawing=false);
  canvas.addEventListener('touchstart',e=>{drawing=true;const p=gp(e);lx=p.x;ly=p.y;},{passive:false});
  canvas.addEventListener('touchmove',e=>{if(!drawing)return;e.preventDefault();draw(e);},{passive:false});
  canvas.addEventListener('touchend',()=>drawing=false);
}

function clearCanvas(){
  const c=document.getElementById('drawCanvas');
  c.getContext('2d').clearRect(0,0,c.width,c.height);
}

function changeColor(){ cIdx=(cIdx+1)%COLORS.length; }

// GIFT
let giftDone=false;
function openGift(){
  if(giftDone)return;
  giftDone=true;
  const gift=document.getElementById('gift3d');
  const tap=document.getElementById('giftTap');
  const card=document.getElementById('bdayCard');
  const wrap=document.getElementById('giftWrap');
  gift.classList.add('opened');
  tap.style.opacity='0';
  for(let i=0;i<35;i++){
    setTimeout(()=>{
      const h=document.createElement('div');
      h.className='click-heart';
      h.textContent=['❤️','💕','🌸','✨','💖','🤍','⭐'][Math.floor(Math.random()*7)];
      const r=gift.getBoundingClientRect();
      h.style.cssText=`left:${r.left+Math.random()*r.width}px;top:${r.top+Math.random()*r.height}px;font-size:${Math.random()*1.7+.8}rem;animation-delay:${Math.random()*.12}s;`;
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),1800);
    },i*38);
  }
  setTimeout(()=>{
    wrap.style.display='none';
    card.classList.remove('hidden');
  },900);
}

// YOUTUBE UNMUTE
function unmuteVideo(){
  const frame=document.getElementById('ytFrame');
  const btn=document.getElementById('soundBtn');
  frame.src=frame.src.replace('&mute=1','&mute=0');
  btn.classList.add('hidden');
}

// FINAL HEARTS
function heartBurst(e){
  for(let i=0;i<12;i++){
    const h=document.createElement('div');
    h.className='click-heart';
    h.textContent=['❤️','💕','🌸','✨','💖','🤍','💗','💝'][Math.floor(Math.random()*8)];
    h.style.cssText=`left:${e.clientX+(Math.random()-.5)*80}px;top:${e.clientY+(Math.random()-.5)*80}px;font-size:${Math.random()*1.5+.9}rem;animation-delay:${Math.random()*.28}s;`;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1800);
  }
}

// MUSIC
const musicBtn=document.getElementById('musicBtn');
const bgMusic=document.getElementById('bgMusic');
let musicOn=false;
musicBtn.addEventListener('click',()=>{
  if(!musicOn){
    bgMusic.volume=.15;bgMusic.play().catch(()=>{});
    musicBtn.classList.add('playing');musicBtn.textContent='🔊';musicOn=true;
  } else {
    bgMusic.pause();musicBtn.classList.remove('playing');musicBtn.textContent='🎵';musicOn=false;
  }
});
