// 🎬 navigation
function go(id){
  document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  vib(25);
}
function start(){
  // يبدأ الصوت بعد أول تفاعل
  const a=document.getElementById('bgm');
  a.volume=.6; a.play().catch(()=>{});
  go('login');
}

// 📳
function vib(ms){ if(navigator.vibrate) navigator.vibrate(ms||20); }

// 🔐
function check(){
  if(pass.value.trim()==="سجوو"){
    go('cake');
  }else{
    alert("التلميح واضح 🤍");
  }
}

// 🎂
let lit=false;
function light(){
  lit=true;
  candle.classList.add('lit');
  cakeHint.innerText="الخطوة 2: قص الكيكة 🔪";
  cutBtn.style.display='inline-block';
  vib(30);
}
function cut(){
  if(!lit) return;
  burst(80);
  go('story');
  typeStory();
}

// 💥 burst
function burst(n){
  for(let i=0;i<n;i++){
    const e=document.createElement('div');
    e.innerText=Math.random()>.5?'💗':'🌸';
    e.style.position='fixed';
    e.style.left=Math.random()*100+'vw';
    e.style.top=Math.random()*100+'vh';
    e.style.fontSize=(16+Math.random()*10)+'px';
    document.body.appendChild(e);
    setTimeout(()=>e.remove(),1200);
  }
}

// 📖 story (كاملة ومرتبة)
const story = `من يوم 3 / 12  
وانا بديت نحس بشي مختلف...

مش فاهمه في البداية  
ولا حتى عارف شنو هو بالضبط  

بس مع الأيام  
لقيت روحي نميل لك  
ونرتاح لك  

اني الفتره اللي فاتت كلها  
ومنيش مستريح  
حاس في شي ناقص...  

وكل مرة نقول  
شنو الشي هذا؟  

بس أول ما نهدرز معاك  
نحس كأني لقيته  

حتى لو ما قلتي شي  
وجودك بس...  
يرتاحله قلبي  

كأنك خديتي بيدي  
وطبطبتي عليا  

واني رغم اني نشوف الحكي ضعف  
لكن معاك لا  

معاك نحكي بدون خوف  

حتى لما نقولك مستاحشك  
مش كلمة وخلاص  

هذي شعور  

لأني نبي نهدرز معاك ديما  
مش لأن مفيش شي نديره  

لكن لأنك انتي  
الاستراحة متعي  

جوجو 🤍  
كل عام وانتي بخير  

سجى❤️‍🩹  
انتي ملاذي الآمن  
والراحة اللي نلقى فيها نفسي  

أنا نحبك حب صادق وثابت  
ونبيك تكوني جزء من حياتي 🤍`;

function typeStory(){
  storyText.innerText="";
  let i=0;
  const t=setInterval(()=>{
    storyText.innerText += story[i] || "";
    i++;
    if(i>=story.length) clearInterval(t);
  },18);
}

// 💌
function toCard(){ go('card'); }
function flip(){
  cardBox.classList.toggle('flip');
  burst(40);
}

// ❤️
function dropHeart(){
  go('heartScene');
  const h=document.getElementById('bigHeart');
  setTimeout(()=>{ h.style.transform='translateY(0)'; },50);
  h.onclick=()=>{
    burst(150);
    showHint("تقدري ترسمي بالقلوب زي ما عبيتي حياتي حنية 🤍");
    go('surprise');
  };
}

// 🎁 surprises step-by-step
const msgs=[
  "💗 أول حاجة… وجودك فرق فيا",
  "🌸 ثاني حاجة… نرتاح معاك بدون سبب",
  "🤍 ثالث حاجة… حتى سكوتك يريح",
  "💗 رابع حاجة… دايمًا في بالي",
  "🌸 خامس حاجة… نبيك في كل خطوة",
  "🤍 سادس حاجة… انتي الأمان",
  "💗 سابع حاجة… دعائي ليك دايم",
  "🌸 ثامن حاجة… مستحيل نمل منك",
  "🤍 تاسع حاجة… أقربلي من الكل",
  "💗 عاشر حاجة… نحبك",
  "🌸 11… نحبك أكثر",
  "🤍 12… نحبك أكثر وأكثر",
  "💗 13… انتي حياتي",
  "🌸 14… انتي راحتي",
  "🤍 15… انتي اختياري",
  "💗 16… انتي قدري",
  "🌸 17… انتي البداية",
  "🤍 18… انتي النهاية",
  "💗 19… انتي كل شي",
  "🌸 20… انتي قلبي",
  "🤍 21… وصلتي 21… وكل عام وانتي بخير يا سجوو 🤍"
];
let si=0;
function nextSurprise(){
  if(si>=msgs.length) return;
  const box=document.createElement('div');
  box.className='alert';
  box.innerText=msgs[si++];
  alerts.appendChild(box);
  vib(15);
}

// 🖌️ draw (يتبع الإصبع)
let drawing=false;
document.getElementById('draw').addEventListener('touchstart',()=>drawing=true);
document.getElementById('draw').addEventListener('touchend',()=>drawing=false);
document.getElementById('draw').addEventListener('touchmove',(e)=>{
  if(!drawing) return;
  const t=e.touches[0];
  for(let i=0;i<3;i++){
    const h=document.createElement('div');
    h.innerText="💗";
    h.style.position="fixed";
    h.style.left=(t.clientX+(Math.random()*20-10))+"px";
    h.style.top=(t.clientY+(Math.random()*20-10))+"px";
    h.style.fontSize="20px";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),900);
  }
});

// 🎧
function yt(){
  window.open("https://youtube.com/watch?v=1t9sfYqZ2iY","_blank");
}

// 💬 hint popup
function showHint(txt){
  const b=document.createElement('div');
  b.className='alert';
  b.style.position='fixed';
  b.style.bottom='20px';
  b.style.left='50%';
  b.style.transform='translateX(-50%)';
  b.innerText=txt;
  document.body.appendChild(b);
  setTimeout(()=>b.remove(),2200);
}

// 💗 Canvas bg (خفيف)
const c=document.getElementById('fx');
const x=c.getContext('2d');
function resize(){ c.width=innerWidth; c.height=innerHeight; }
resize(); addEventListener('resize',resize);

let P=[];
function spawn(){
  P.push({
    x:Math.random()*c.width,
    y:c.height+10,
    s:1+Math.random()*2,
    t:Math.random()>.5?'💗':'🌸'
  });
}
function loop(){
  x.clearRect(0,0,c.width,c.height);
  P.forEach((p,i)=>{
    p.y-=p.s;
    x.font="18px system-ui";
    x.fillText(p.t,p.x,p.y);
    if(p.y<-20) P.splice(i,1);
  });
  requestAnimationFrame(loop);
}
setInterval(spawn,140);
loop();
