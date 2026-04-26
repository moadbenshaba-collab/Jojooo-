document.addEventListener('DOMContentLoaded', function () {

  /* PARTICLE CANVAS */
  var pc = document.getElementById('particleCanvas');
  var pctx = pc.getContext('2d');
  var particles = [];
  function resizePC() { pc.width = window.innerWidth; pc.height = window.innerHeight; }
  resizePC();
  window.addEventListener('resize', resizePC);
  for (var i = 0; i < 35; i++) {
    particles.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, r: Math.random()*2.5+.5, dx: (Math.random()-.5)*.4, dy: (Math.random()-.5)*.4, alpha: Math.random()*.5+.1, color: Math.random()>.5?'255,107,157':'255,200,80' });
  }
  function animateParticles() {
    pctx.clearRect(0,0,pc.width,pc.height);
    particles.forEach(function(p){ p.x+=p.dx; p.y+=p.dy; if(p.x<0||p.x>pc.width)p.dx*=-1; if(p.y<0||p.y>pc.height)p.dy*=-1; pctx.beginPath(); pctx.arc(p.x,p.y,p.r,0,Math.PI*2); pctx.fillStyle='rgba('+p.color+','+p.alpha+')'; pctx.shadowColor='rgba('+p.color+',.6)'; pctx.shadowBlur=8; pctx.fill(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* STARS */
  var starsEl = document.getElementById('stars');
  if (starsEl) { for (var i=0;i<120;i++) { var s=document.createElement('div'); s.className='star'; var sz=Math.random()*2.2+.4; s.style.cssText='width:'+sz+'px;height:'+sz+'px;top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;--d:'+(Math.random()*3+2)+'s;animation-delay:'+(Math.random()*5)+'s;'; starsEl.appendChild(s); } }

  /* RAIN */
  var rainEl = document.getElementById('rain');
  for (var i=0;i<75;i++) { var d=document.createElement('div'); d.className='drop'; var h=Math.random()*60+15; d.style.cssText='left:'+Math.random()*100+'%;height:'+h+'px;animation-duration:'+(Math.random()*1.2+.7)+'s;animation-delay:'+(Math.random()*3)+'s;opacity:'+(Math.random()*.28+.05)+';'; rainEl.appendChild(d); }

  /* FLOATING HEARTS */
  var fhEl = document.getElementById('floatHearts');
  var fhEmojis = ['❤️','🤍','💕','💗','💖','🌸','✨','💫','🌹','💝'];
  for (var i=0;i<18;i++) { var h=document.createElement('div'); h.className='fh'; h.textContent=fhEmojis[Math.floor(Math.random()*fhEmojis.length)]; h.style.cssText='left:'+Math.random()*100+'%;font-size:'+(Math.random()*1.3+.6)+'rem;--d:'+(Math.random()*9+6)+'s;--dl:'+(Math.random()*9)+'s;'; fhEl.appendChild(h); }

  /* SCREEN NAVIGATION */
  var screens = document.querySelectorAll('.screen');
  var cur = 0;
  var TOTAL = screens.length;

  function updateProgress() { var fill=document.getElementById('progressFill'); if(fill) fill.style.width=(cur/(TOTAL-1)*100)+'%'; }

  function goTo(idx) {
    if (idx<0||idx>=TOTAL) return;
    screens[cur].classList.add('exit');
    var prev=cur;
    setTimeout(function(){ screens[prev].classList.remove('active','exit'); },650);
    cur=idx; screens[cur].classList.add('active'); screens[cur].scrollTop=0;
    updateProgress(); onEnter(cur);
  }
  window.goTo = goTo;

  function onEnter(idx) {
    if (idx===1) startStory('storyBox1','btn1',story1);
    if (idx===2) startStory('storyBox2','btn2',story2);
    if (idx===4) initSurprises();
    if (idx===5) initCanvas();
    if (idx===7) initFinalStars();
  }
  updateProgress();

  /* STORY DATA */
  var story1 = [
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

  var story2 = [
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

  function startStory(boxId, btnId, lines) {
    var box=document.getElementById(boxId); var btn=document.getElementById(btnId);
    if(!box) return; if(box.dataset.done==='1') return;
    box.dataset.done='1'; box.innerHTML='';
    if(btn) btn.classList.add('hidden');
    lines.forEach(function(l,i){ var span=document.createElement('span'); span.className='story-line'+(l.hl?' name-hl':''); span.textContent=l.t; box.appendChild(span); setTimeout(function(){ span.classList.add('show'); },i*145+300); });
    setTimeout(function(){ if(btn) btn.classList.remove('hidden'); },lines.length*145+900);
  }

  /* SURPRISES */
  var surprises = [
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

  var surpriseIdx = 0;
  function initSurprises() { surpriseIdx=0; showSurprise(0); }

  function showSurprise(i) {
    var prog=document.getElementById('surpriseProgress'); var bar=document.getElementById('surpriseBar');
    var emoji=document.getElementById('surpriseEmoji'); var msg=document.getElementById('surpriseMsg');
    var nextBtn=document.getElementById('surpriseNext'); var card=document.getElementById('surpriseCard');
    if(!prog||!emoji||!msg||!nextBtn||!card) return;
    prog.textContent=(i+1)+' / '+surprises.length;
    if(bar) bar.style.width=((i+1)/surprises.length*100)+'%';
    emoji.textContent=surprises[i].e; msg.textContent=surprises[i].m;
    card.style.transition='none'; card.style.opacity='0'; card.style.transform='scale(.9) translateY(10px)';
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ card.style.transition='opacity .38s ease,transform .38s ease'; card.style.opacity='1'; card.style.transform='scale(1) translateY(0)'; }); });
    if(i>=surprises.length-1){ nextBtn.textContent='كملي 🤍'; nextBtn.onclick=function(){ goTo(5); }; }
    else { nextBtn.textContent='التالية 🤍'; nextBtn.onclick=nextSurprise; }
  }

  function nextSurprise() { if(surpriseIdx<surprises.length-1){ surpriseIdx++; showSurprise(surpriseIdx); burstMini(document.getElementById('surpriseCard'),5); } }

  /* CANVAS */
  var canvasReady=false,drawing=false,lx=0,ly=0;
  var COLORS=['#ff6b9d','#ffb3cc','#c56cf0','#ff4757','#ffd6e7','#00d2ff','#ffffff','#ffd700'];
  var cIdx=0; var brushSizes=[3,5,8,12]; var bIdx=1;

  function initCanvas() {
    if(canvasReady) return; canvasReady=true;
    var canvas=document.getElementById('drawCanvas'); if(!canvas) return;
    var ctx=canvas.getContext('2d'); var wrap=canvas.parentElement;
    canvas.width=wrap.clientWidth; canvas.height=Math.min(window.innerHeight*.4,300);
    var hint=document.getElementById('canvasHint'); var firstDraw=true;
    function gp(e){ var r=canvas.getBoundingClientRect(); if(e.touches) return{x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top}; return{x:e.clientX-r.left,y:e.clientY-r.top}; }
    function draw(e){ if(firstDraw&&hint){hint.classList.add('hidden');firstDraw=false;} var p=gp(e); ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p.x,p.y); ctx.strokeStyle=COLORS[cIdx];ctx.lineWidth=brushSizes[bIdx];ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor=COLORS[cIdx];ctx.shadowBlur=14;ctx.stroke(); if(Math.random()<.04){ctx.font=(Math.random()*14+10)+'px serif';ctx.fillStyle=COLORS[cIdx];ctx.shadowBlur=8;ctx.fillText(['❤️','🌸','✨','💕','🌹'][Math.floor(Math.random()*5)],p.x-8,p.y-8);} lx=p.x;ly=p.y; }
    canvas.addEventListener('mousedown',function(e){drawing=true;var p=gp(e);lx=p.x;ly=p.y;});
    canvas.addEventListener('mousemove',function(e){if(!drawing)return;e.preventDefault();draw(e);});
    canvas.addEventListener('mouseup',function(){drawing=false;});
    canvas.addEventListener('mouseleave',function(){drawing=false;});
    canvas.addEventListener('touchstart',function(e){drawing=true;var p=gp(e);lx=p.x;ly=p.y;},{passive:false});
    canvas.addEventListener('touchmove',function(e){if(!drawing)return;e.preventDefault();draw(e);},{passive:false});
    canvas.addEventListener('touchend',function(){drawing=false;});
  }

  var clearBtn=document.getElementById('clearBtn');
  var colorBtn=document.getElementById('colorBtn');
  var sizeBtn=document.getElementById('sizeBtn');
  if(clearBtn) clearBtn.addEventListener('click',function(){ var c=document.getElementById('drawCanvas'); if(c) c.getContext('2d').clearRect(0,0,c.width,c.height); var hint=document.getElementById('canvasHint'); if(hint) hint.classList.remove('hidden'); });
  if(colorBtn) colorBtn.addEventListener('click',function(){ cIdx=(cIdx+1)%COLORS.length; colorBtn.style.borderColor=COLORS[cIdx]; colorBtn.style.boxShadow='0 0 10px '+COLORS[cIdx]; });
  if(sizeBtn) sizeBtn.addEventListener('click',function(){ bIdx=(bIdx+1)%brushSizes.length; sizeBtn.textContent='✏️ '+brushSizes[bIdx]+'px'; });

  /* GIFT */
  var giftDone=false;
  var gift3dEl=document.getElementById('gift3d');
  if(gift3dEl) gift3dEl.addEventListener('click',openGift);

  function openGift() {
    if(giftDone) return; giftDone=true;
    var gift=document.getElementById('gift3d'); var tap=document.getElementById('giftTap');
    var card=document.getElementById('bdayCard'); var scene=document.getElementById('giftScene');
    if(!gift||!card) return;
    gift.classList.add('opened'); if(tap) tap.style.opacity='0';
    for(var i=0;i<45;i++){ (function(i){ setTimeout(function(){ var h=document.createElement('div'); h.className='click-heart'; h.textContent=['❤️','💕','🌸','✨','💖','🤍','⭐','🌹','💫'][Math.floor(Math.random()*9)]; var r=gift.getBoundingClientRect(); h.style.cssText='left:'+(r.left+Math.random()*r.width)+'px;top:'+(r.top+Math.random()*r.height)+'px;font-size:'+(Math.random()*2+.8)+'rem;animation-delay:'+(Math.random()*.15)+'s;'; document.body.appendChild(h); setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h);},1900); },i*35); })(i); }
    setTimeout(function(){ if(scene) scene.style.display='none'; card.classList.remove('hidden'); },950);
  }

  /* YOUTUBE UNMUTE */
  var soundBtn=document.getElementById('soundBtn');
  if(soundBtn) soundBtn.addEventListener('click',function(){ var frame=document.getElementById('ytFrame'); if(!frame) return; frame.src=frame.src.replace('&mute=1','&mute=0'); soundBtn.classList.add('hidden'); });

  /* FINAL STARS */
  function initFinalStars() {
    var wrap=document.getElementById('finalStars'); if(!wrap||wrap.dataset.done) return; wrap.dataset.done='1';
    for(var i=0;i<20;i++){ (function(i){ setTimeout(function(){ var s=document.createElement('div'); s.style.cssText='position:absolute;font-size:'+(Math.random()*1.2+.6)+'rem;top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;animation:twinkle '+(Math.random()*2+1.5)+'s ease-in-out infinite;animation-delay:'+(Math.random()*2)+'s;pointer-events:none;'; s.textContent=['✨','⭐','🌟','💫'][Math.floor(Math.random()*4)]; wrap.appendChild(s); },i*80); })(i); }
  }

  /* TOUCH RING */
  var touchRing=document.getElementById('touchRing');
  if(touchRing) touchRing.addEventListener('click',function(e){ for(var i=0;i<16;i++){ (function(i){ setTimeout(function(){ var h=document.createElement('div'); h.className='click-heart'; h.textContent=['❤️','💕','🌸','✨','💖','🤍','💗','💝','🌹'][Math.floor(Math.random()*9)]; h.style.cssText='left:'+(e.clientX+(Math.random()-.5)*100)+'px;top:'+(e.clientY+(Math.random()-.5)*100)+'px;font-size:'+(Math.random()*1.8+.8)+'rem;animation-delay:'+(Math.random()*.3)+'s;'; document.body.appendChild(h); setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h);},1900); },i*30); })(i); } });

  /* MINI HEARTS */
  function burstMini(el,count){ if(!el) return; var r=el.getBoundingClientRect(); for(var i=0;i<count;i++){ var h=document.createElement('div'); h.className='click-heart'; h.textContent=['❤️','💕','🌸','✨'][Math.floor(Math.random()*4)]; h.style.cssText='left:'+(r.left+Math.random()*r.width)+'px;top:'+(r.top+Math.random()*r.height)+'px;font-size:'+(Math.random()*1+.8)+'rem;animation-delay:'+(Math.random()*.25)+'s;'; document.body.appendChild(h); setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h);},1700); } }

  /* MUSIC */
  var musicBtn=document.getElementById('musicBtn'); var bgMusic=document.getElementById('bgMusic'); var musicOn=false;
  if(musicBtn&&bgMusic){ musicBtn.addEventListener('click',function(){ if(!musicOn){ bgMusic.volume=.14; bgMusic.play().catch(function(){}); musicBtn.classList.add('playing'); musicBtn.textContent='🔊'; musicOn=true; } else { bgMusic.pause(); musicBtn.classList.remove('playing'); musicBtn.textContent='🎵'; musicOn=false; } }); }

}); /* end DOMContentLoaded */
