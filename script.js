/* 🎬 مشاهد */
function show(id){
document.querySelectorAll(".scene").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function goLogin(){show("login");}

/* 🔐 */
function check(){
if(pass.value==="سجوو") show("cake");
else alert("جربي التلميح 🤍");
}

/* 📖 القصة كاملة */
let text = `من يوم 3 / 12  
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

جوجو 🤍  
كل عام وانتي بخير  

سجى❤️‍🩹  
انتي ملاذي الآمن  
والراحة اللي نلقى فيها نفسي  

أنا نحبك حب صادق وثابت  
ونبيك تكوني جزء من حياتي 🤍`;

function openStory(){
show("story");
storyText.innerText="";
let i=0;

let t=setInterval(()=>{
storyText.innerText += text[i];
i++;
if(i>=text.length) clearInterval(t);
},18);
}

function openCard(){show("card");}
function openSurprise(){show("surprise");}
function startDraw(){show("draw");}

/* 🎧 يوتيوب */
function openYT(){
window.open("https://youtube.com","_blank");
}

/* 💗 Canvas FX */
const c=document.getElementById("fx");
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
x.font="20px Arial";
x.fillText(e.t,e.x,e.y);
if(e.y<0) p.splice(i,1);
});

requestAnimationFrame(draw);
}

setInterval(spawn,120);
draw();

/* 🖌️ رسم */
document.getElementById("draw").addEventListener("touchmove",(e)=>{
let h=document.createElement("div");
h.innerText="💗";
h.style.position="absolute";
h.style.left=e.touches[0].clientX+"px";
h.style.top=e.touches[0].clientY+"px";
h.style.fontSize="18px";
document.body.appendChild(h);

setTimeout(()=>h.remove(),1000);
});
