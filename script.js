function go(id){
document.querySelectorAll(".scene").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function openGift(){
for(let i=0;i<120;i++){
let e=document.createElement("div");
e.innerText=Math.random()>0.5?"🌸":"💗";
e.style.position="fixed";
e.style.left=Math.random()*100+"vw";
e.style.top=Math.random()*100+"vh";
document.body.appendChild(e);
setTimeout(()=>e.remove(),2000);
}
setTimeout(()=>go("cake"),800);
}

function light(){
flame.style.display="block";
cutBtn.style.display="block";
}

function cut(){
go("story");
storyText.innerText=`من يوم 3 / 12  

وانا بديت نحس بشي مختلف...
لقيت روحي نميل لك ونرتاح لك  

وجودك بس يريحني  

جوجو 🤍  
كل عام وانتي بخير  

سجى ❤️‍🩹  
انتي راحتي  
أنا نحبك 🤍`;
}

function playMusic(){
window.open("https://youtube.com/watch?v=1t9sfYqZ2iY");
}

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

/* خلفية */
const c=document.getElementById("bg");
const x=c.getContext("2d");
c.width=innerWidth;
c.height=innerHeight;

let p=[];
setInterval(()=>{
p.push({x:Math.random()*c.width,y:c.height,t:Math.random()>0.5?"💗":"🌸"});
},150);

function draw(){
x.clearRect(0,0,c.width,c.height);
p.forEach((e,i)=>{
e.y-=1;
x.fillText(e.t,e.x,e.y);
if(e.y<0) p.splice(i,1);
});
requestAnimationFrame(draw);
}
draw();
