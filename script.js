/* 🎬 */
function go(id){
document.querySelectorAll(".scene").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
vib();
}

/* 🎧 */
function start(){
music.play().catch(()=>{});
go("login");
}

/* 📳 */
function vib(){
if(navigator.vibrate) navigator.vibrate(30);
}

/* 🔐 */
function check(){
if(pass.value==="سجوو"){
go("cake");
}else alert("ركزي في التلميح 🤍");
}

/* 🎂 */
let lit=false;

function light(){
lit=true;
candle.classList.add("lit");
hint.innerText="قص الكيكة 🔪";
cutBtn.style.display="block";
}

function cut(){
if(lit){
burst();
go("story");
typeStory();
}
}

/* 💥 */
function burst(){
for(let i=0;i<60;i++){
let e=document.createElement("div");
e.innerText=Math.random()>0.5?"💗":"🌸";
e.style.position="absolute";
e.style.left=Math.random()*100+"vw";
e.style.top=Math.random()*100+"vh";
document.body.appendChild(e);
setTimeout(()=>e.remove(),1500);
}
}

/* 📖 cinematic */
const storyParts = [

`من يوم 3 / 12  
وانا بديت نحس بشي مختلف...`,

`مش فاهمه في البداية  
لكن قلبي فهم`,

`لقيت روحي نميل لك  
ونرتاح لك`,

`وجودك بس يريحني  
حتى بدون كلام`,

`كأنك أمان`,

`جوجو 🤍  
كل عام وانتي بخير`,

`سجى ❤️‍🩹  
أنا نحبك 🤍`
];

function typeStory(){

storyText.innerHTML="";
let i=0;

function next(){

if(i>=storyParts.length) return;

let p=document.createElement("div");
p.className="paragraph";
p.innerText=storyParts[i];

storyText.appendChild(p);

setTimeout(()=>{
p.classList.add("show");
window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
},100);

i++;
setTimeout(next,2200);
}

next();
}

/* 💌 */
function flip(){
cardBox.classList.toggle("flip");
burst();
}

/* ❤️ */
function showHeart(){
go("heartScene");

bigHeart.onclick=()=>{
burst();
go("surprise");
};
}

/* 🎁 */
let msgs=[
"💗 وجودك فرق فيا",
"🌸 نرتاح معاك",
"🤍 انتي الأمان",
"💗 نحبك",
"🤍 وصلتي 21 🤍"
];

let i=0;
function nextSurprise(){
if(i>=msgs.length) return;

let d=document.createElement("div");
d.innerText=msgs[i++];
alerts.appendChild(d);
}

/* 🎧 */
function yt(){
window.open("https://youtube.com/watch?v=1t9sfYqZ2iY");
}

/* 🖌️ */
document.addEventListener("touchmove",(e)=>{
let h=document.createElement("div");
h.innerText="💗";
h.style.position="absolute";
h.style.left=e.touches[0].clientX+"px";
h.style.top=e.touches[0].clientY+"px";
document.body.appendChild(h);
setTimeout(()=>h.remove(),800);
});

/* 💗 canvas */
const c=document.getElementById("bgfx");
const x=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

let p=[];

function spawn(){
p.push({
x:Math.random()*c.width,
y:c.height,
s:Math.random()*2+1,
t:Math.random()>0.5?"💗":"🌸"
});
}

function draw(){
x.clearRect(0,0,c.width,c.height);

p.forEach((e,i)=>{
e.y-=e.s;
x.font="18px Arial";
x.fillText(e.t,e.x,e.y);
if(e.y<0) p.splice(i,1);
});

requestAnimationFrame(draw);
}

setInterval(spawn,120);
draw();
