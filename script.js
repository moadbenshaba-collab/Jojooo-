const scenes=document.querySelectorAll(".scene");
const music=document.getElementById("music");

function go(n){
scenes.forEach(s=>s.classList.remove("active"));
scenes[n].classList.add("active");
}

/* 🎧 */
function playMusic(){
music.play().catch(()=>{});
}

/* 🔐 */
function login(){
if(pass.value=="سجوو"){
go(2);
}else{
alert("قريبة 🤍");
}
}

/* 🎂 الكيكة */
let clicks=0;
let lit=false;

document.getElementById("cakeArea").onclick=()=>{

clicks++;

/* 🔥 توليع */
if(!lit){
let spark=document.createElement("div");
spark.innerHTML="🔥";
spark.style.position="fixed";
spark.style.left="50%";
spark.style.top="50%";
document.body.appendChild(spark);

setTimeout(()=>spark.remove(),800);

if(clicks>5){
document.getElementById("candle").innerHTML="🕯️🔥";
document.getElementById("cakeHint").innerText="🍰 توا اضغطي باش تقصي الكيكة";
lit=true;
}
}

/* 🔪 تقطيع */
else{
document.getElementById("cakeArea").style.transform="scale(0)";
setTimeout(()=>{
go(3);
startStory();
},800);
}

};

/* 📰 القصة */
let msgs=[
"من يوم 3/12 حسيت بشي مختلف...",
"وجودك راحة 🤍",
"حتى سكوتك فيه أمان",
"انتي مش عادية",
"نحبك 🤍",
"✨ 21 لأنك انتي 21 في قلبي"
];

let i=0;

function startStory(){
showMsg();
}

function showMsg(){
if(i>=msgs.length){
go(4);
return;
}
storyBox.innerHTML="💌 "+msgs[i];
i++;
}

nextMsg.onclick=()=>showMsg();

/* ❤️ رسم */
let drawing=false;
let startTime=0;

heart.onclick=()=>{
drawing=true;
startTime=Date.now();
};

/* رسم */
document.addEventListener("touchmove",(e)=>{
if(!drawing)return;

let t=e.touches[0];

let el=document.createElement("div");
el.innerHTML="💗";
el.style.position="fixed";
el.style.left=t.clientX+"px";
el.style.top=t.clientY+"px";
document.body.appendChild(el);

setTimeout(()=>el.remove(),2000);

/* بعد 20 ثانية */
if(Date.now()-startTime>20000){
go(5);
cardText.innerText="وجودك في حياتي نعمة 🤍";
drawing=false;
}
});

/* 💌 */
function flipCard(){
cardText.innerText="نحبك ياعيوني 🤍";
yt.style.display="block";
}
