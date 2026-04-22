const scenes=document.querySelectorAll(".scene");
const light=document.querySelector(".light");
const flash=document.querySelector(".flash");

/* انتقال سينمائي */
function go(id){
flash.style.opacity=1;
setTimeout(()=>{
scenes.forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
flash.style.opacity=0;
},400);
}

/* صوت */
let sound=new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b98a1.mp3");

/* 🎁 */
document.querySelector(".gift").onclick=()=>{
sound.play();
shakeScreen();
burst();
setTimeout(()=>{
go("story");
write();
},900);
};

/* اهتزاز */
function shakeScreen(){
document.body.style.transform="translateX(10px)";
setTimeout(()=>document.body.style.transform="translateX(-10px)",100);
setTimeout(()=>document.body.style.transform="translateX(0)",200);
}

/* انفجار */
function burst(){
for(let i=0;i<200;i++){
let e=document.createElement("div");
e.innerText=Math.random()>0.5?"💗":"🌸";
e.style.position="fixed";
e.style.left=Math.random()*100+"vw";
e.style.top=Math.random()*100+"vh";
e.style.fontSize=(14+Math.random()*14)+"px";
document.body.appendChild(e);
setTimeout(()=>e.remove(),2000);
}
}

/* كتابة */
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

/* الانتقال */
document.querySelector(".glass").onclick=()=>go("card");
document.querySelector(".card").onclick=()=>go("final");

/* ❤️ */
document.querySelector(".heart").onclick=()=>{
burst();
finalText.innerText="نحبك يا عيوني 🤍";
};

/* ضوء */
document.addEventListener("mousemove",(e)=>{
light.style.left=e.clientX-150+"px";
light.style.top=e.clientY-150+"px";
});

/* خلفية */
const c=document.getElementById("bg");
const x=c.getContext("2d");
c.width=innerWidth;
c.height=innerHeight;

let p=[];

setInterval(()=>{
p.push({x:Math.random()*c.width,y:c.height,t:Math.random()>0.5?"💗":"🌸"});
},100);

function draw(){
x.clearRect(0,0,c.width,c.height);
p.forEach((e,i)=>{
e.y-=1;
x.fillText(e.t,e.x,e.y);
if(e.y<0)p.splice(i,1);
});
requestAnimationFrame(draw);
}
draw();

/* 🎧 */
function music(){
window.open("https://youtube.com/watch?v=1t9sfYqZ2iY");
}
