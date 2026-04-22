function go(id){
document.querySelectorAll(".scene").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* 🎁 */
function openGift(){

for(let i=0;i<120;i++){
let e=document.createElement("div");
e.innerText=Math.random()>0.5?"🌸":"💗";
e.style.position="fixed";
e.style.left=Math.random()*100+"vw";
e.style.top=Math.random()*100+"vh";
e.style.fontSize=(16+Math.random()*10)+"px";

document.body.appendChild(e);
setTimeout(()=>e.remove(),2000);
}

setTimeout(()=>{
go("story");
showStory();
},800);
}

/* 📖 */
function showStory(){
storyText.innerText = `من يوم 3 / 12  

وانا بديت نحس بشي مختلف...

مش فاهمه في البداية  
لكن قلبي فهم  

مع الوقت  
لقيت روحي نميل لك  
ونرتاح لك  

اني لما نحكي معاك  
نرتاح بدون سبب  

حتى لو ما قلتي شي  
وجودك يكفيني  

كأنك طبطبتي عليا  

واني رغم اني نشوف الحكي ضعف  
لكن معاك لا  

معاك نحكي بدون خوف  

جوجو 🤍  
كل عام وانتي بخير  

سجى ❤️‍🩹  
انتي راحتي  
وانتي الأمان  

أنا نحبك 🤍`;
}

/* 💌 */
function goCard(){
go("card");
}

function goDraw(){
go("draw");
}

/* 🖌️ رسم */
document.addEventListener("touchmove",(e)=>{
let t=e.touches[0];

let h=document.createElement("div");
h.innerText="💗";
h.style.position="fixed";
h.style.left=t.clientX+"px";
h.style.top=t.clientY+"px";
document.body.appendChild(h);

setTimeout(()=>h.remove(),800);
});

/* 💗 خلفية */
const c=document.getElementById("bg");
const x=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

let p=[];

function spawn(){
p.push({
x:Math.random()*c.width,
y:c.height,
s:1+Math.random()*2,
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

setInterval(spawn,150);
draw();
