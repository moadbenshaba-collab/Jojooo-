const scenes=document.querySelectorAll(".scene");
const glow=document.querySelector(".glow");

function go(id){
scenes.forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* 🎁 */
document.querySelector(".gift").onclick=()=>{
softBurst();
setTimeout(()=>{
go("story");
write();
},600);
};

/* 🌸 انفجار ناعم */
function softBurst(){
for(let i=0;i<120;i++){
let e=document.createElement("div");
e.innerText=Math.random()>0.5?"💗":"🌸";
e.style.position="fixed";
e.style.left=Math.random()*100+"vw";
e.style.top=Math.random()*100+"vh";
e.style.opacity=.8;
document.body.appendChild(e);
setTimeout(()=>e.remove(),1500);
}
}

/* 📖 */
function write(){
text.innerText=`من يوم 3 / 12  

وانا بديت نحس بشي مختلف...

لقيت روحي نميل لك  
ونرتاح لك  

وجودك بس يريحني  

جوجو 🤍  
كل عام وانتي بخير  

أنا نحبك 🤍`;
}

/* scroll */
document.getElementById("box").onscroll=function(){
if(this.scrollTop + this.clientHeight >= this.scrollHeight){
setTimeout(()=>go("card"),500);
}
};

/* card */
document.querySelector(".card").onclick=()=>{
go("final");
};

/* ❤️ */
document.querySelector(".heart").onclick=()=>{
finalText.innerText="نحبك يا عيوني 🤍";
softBurst();
};

/* glow follow */
document.addEventListener("mousemove",(e)=>{
glow.style.left=e.clientX-120+"px";
glow.style.top=e.clientY-120+"px";
});

/* background optimized */
const c=document.getElementById("bg");
const x=c.getContext("2d");

c.width=innerWidth;
c.height=innerHeight;

let particles=[];

setInterval(()=>{
particles.push({
x:Math.random()*c.width,
y:c.height,
s:0.5+Math.random(),
t:Math.random()>0.5?"💗":"🌸"
});
},200);

function draw(){
x.clearRect(0,0,c.width,c.height);

particles.forEach((p,i)=>{
p.y-=p.s;
x.fillText(p.t,p.x,p.y);
if(p.y<0)particles.splice(i,1);
});

requestAnimationFrame(draw);
}
draw();

/* 🎧 */
function music(){
window.open("https://youtube.com/watch?v=1t9sfYqZ2iY");
}
