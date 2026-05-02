'use strict';
document.addEventListener('DOMContentLoaded', function () {

  /* BG CANVAS */
  var bgC=document.getElementById('pc'),bgX=bgC.getContext('2d'),W,H,pts=[];
  function rsz(){W=bgC.width=window.innerWidth;H=bgC.height=window.innerHeight;}
  rsz();window.addEventListener('resize',rsz,{passive:true});
  var CP=['255,107,157','255,200,80','180,100,255','100,200,255'];
  for(var i=0;i<45;i++)pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,r:Math.random()*2.8+.4,dx:(Math.random()-.5)*.35,dy:(Math.random()-.5)*.35,a:Math.random()*.55+.08,c:CP[Math.floor(Math.random()*CP.length)],p:Math.random()*Math.PI*2});
  function drawBG(){bgX.clearRect(0,0,W,H);pts.forEach(function(p){p.x+=p.dx;p.y+=p.dy;p.p+=.02;if(p.x<0||p.x>W)p.dx*=-1;if(p.y<0||p.y>H)p.dy*=-1;var a=p.a*(0.6+0.4*Math.sin(p.p));bgX.beginPath();bgX.arc(p.x,p.y,p.r,0,Math.PI*2);bgX.fillStyle='rgba('+p.c+','+a+')';bgX.shadowColor='rgba('+p.c+',.7)';bgX.shadowBlur=10;bgX.fill();});requestAnimationFrame(drawBG);}
  drawBG();

  /* STARS */
  (function(){var c=document.getElementById('stars');if(!c)return;for(var i=0;i<130;i++){var s=document.createElement('div');s.className='star';var sz=Math.random()*2.4+.3;s.style.cssText='width:'+sz+'px;height:'+sz+'px;top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;--d:'+(Math.random()*3.5+1.5)+'s;animation-delay:'+(Math.random()*6)+'s;';c.appendChild(s);}})();

  /* RAIN */
  (function(){var c=document.getElementById('rain');for(var i=0;i<90;i++){var d=document.createElement('div');d.className='drop';var h=Math.random()*65+15;d.style.cssText='left:'+Math.random()*100+'%;height:'+h+'px;animation-duration:'+(Math.random()*1.3+.6)+'s;animation-delay:'+(Math.random()*3.5)+'s;opacity:'+(Math.random()*.3+.05)+';';c.appendChild(d);}})();

  /* FLOAT HEARTS */
  (function(){var c=document.getElementById('fh');var em=['❤️','🤍','💕','💗','💖','🌸','✨','💫','🌹','💝','🌟','💌'];for(var i=0;i<22;i++){var h=document.createElement('div');h.className='fh';h.textContent=em[Math.floor(Math.random()*em.length)];h.style.cssText='left:'+Math.random()*100+'%;font-size:'+(Math.random()*1.4+.6)+'rem;--d:'+(Math.random()*10+6)+'s;--dl:'+(Math.random()*10)+'s;';c.appendChild(h);}})();

  /* RIPPLE */
  document.addEventListener('touchstart',function(e){var t=e.touches[0];mkRip(t.clientX,t.clientY);},{passive:true});
  function mkRip(x,y){var r=document.createElement('div');r.className='rip';var sz=60;r.style.cssText='left:'+(x-sz/2)+'px;top:'+(y-sz/2)+'px;width:'+sz+'px;height:'+sz+'px;';document.body.appendChild(r);setTimeout(function(){if(r.parentNode)r.parentNode.removeChild(r);},650);}

  /* NAVIGATION */
  var screens=document.querySelectorAll('.screen'),cur=0,TOT=screens.length;
  function upProg(){var f=document.getElementById('pf');if(f)f.style.width=(cur/(TOT-1)*100)+'%';}
  function goTo(idx){
    if(idx<0||idx>=TOT)return;
    screens[cur].classList.add('exit');
    var prev=cur;
    setTimeout(function(){screens[prev].classList.remove('active','exit');},700);
    cur=idx;screens[cur].classList.add('active');screens[cur].scrollTop=0;
    upProg();onEnter(cur);
  }
  window.goTo=goTo;
  function onEnter(i){
    if(i===1)startStory('bx1','bt1','sg1',S1);
    if(i===2)startStory('bx2','bt2','sg2',S2);
    if(i===4)initSurp();
    if(i===5)initCanvas();
    if(i===6)initGift();
    if(i===7)initFinal();
  }
  upProg();

  /* STORY DATA */
  var S1=[
    {t:'في يوم 10 / 05 / 2005',h:false},{t:'بدأت حكاية بنيتي ونور عيوني جوجو…',h:false},
    {t:'سجو❤️‍🔥، من أول لحظة… كان فيها شي مختلف',h:false},
    {t:'كأنها جاية للدنيا بش تنورها',h:false},
    {t:'وتكون القطعة الناقصة من قمر ليلة ميلادها',h:false},
    {t:'كبرت شوي شوي… والطيبة تمشي معاها في كل خطوة',h:false},
    {t:'أي حد يقرب منها يحس براحة بدون سبب',h:false},
    {t:'وكانت ابتسامتها… تغير الجو كله',h:false},
    {t:'سجى 🤍',h:true},{t:'مش بس اسم… لكن إحساس',h:false},
    {t:'اختارت الهندسة 📐 والبرمجة 💻',h:false},
    {t:'مش طريق سهل… لكن هي ما تعرفش الاستسلام',h:false},
    {t:'مكافحة • مجتهدة • مواظبة • شطورة',h:false},
    {t:'مهندستي 🎀 تتعب… لكن تكمل',h:false},
    {t:'21 سنة من الجمال والطيبة والقوة والحنيه',h:false},
    {t:'واليوم… هي قريبة تحقق حلمها',h:false},
    {t:'احلا خريجه واحلا بش مهندسه 🎀🤍',h:false},
    {t:'رافعه راسها وفخورة بنفسها',h:false},
    {t:'وهذا هو… أجمل شي فيها',h:false},
    {t:'سجى 🤍',h:true}
  ];
  var S2=[
    {t:'وفي لحظة… ما كانتش محسوبة',h:false},
    {t:'بدت حكايتي اني وملاذي الآمن جوجو نور عيوني…',h:false},
    {t:'مش صدفة عادية ولا مجرد تعارف',h:false},
    {t:'تعرفت على سجى عن طريق رسالة في تلجرام',h:false},
    {t:'كانت تسأل على مشروع في مادة برمجة مرئيه 1…',h:false},
    {t:'قررت نساعدها لجمال اسلوبها',h:false},
    {t:'كانت تحكي باحترام، تشكر… وتعتذر…',h:false},
    {t:'بطريقة خلتني نوقف ونحس… إنها مش زي أي حد 🤍',h:false},
    {t:'بدي الكلام خفيف… مجرد دراسة ومساعدة',h:false},
    {t:'لكن مع الأيام… بدي يومي، بدي في انتظار',h:false},
    {t:'بدي في تعلّق… بدون حتى ما نحس حبيتهاا',h:false},
    {t:'لين جت فترة… كنت تحت ضغط في مشروع التخرج',h:false},
    {t:'تعب، توتر، تفكييرر',h:false},
    {t:'وقفت معايا… سهرت معايا',h:false},
    {t:'تسند فيا وتخفف عليا وكأنها حاسّة بكل شي',h:false},
    {t:'في اللحظة هذي… فهمت',h:false},
    {t:'إنها مش شخص عادي ولا مجرد حد في حياتي',h:false},
    {t:'هي حاجة أكبر',h:false},
    {t:'يوم عطتني شال كهدية للتخرج',h:false},
    {t:'في وقت كنت حتى أنا مش عارف كيف بندير لنفسي حاجة',h:false},
    {t:'اللحظة هذي كانت كبيرة عندي',h:false},
    {t:'وقيمتها… أكبر من أي حاجة مادية',h:false},
    {t:'حتى سؤال عادي، حتى كلمة صغيرة، حتى ريبوست على تيك توك يخليني فرحان',h:false},
    {t:'ملاذي الآمن 🤍',h:true},
    {t:'ودنيتي كلها',h:false},
    {t:'ومن غيرها… نحس روحي بروحي… ومش مرتاح',h:false},
    {t:'اني معاذ تعرفت علي سجى وحبيتها قبل ل نعرف روحي حبيتها',h:false},
    {t:'فجأة كأنها يد كبيره حضنتني بقوه',h:false},
    {t:'حنيتها تخلي فيا نحس في روحي انسان مؤذي ونخاف نقسى عليها فيوم',h:false},
    {t:'تسند فيا وتدعم فيا بشكل منقدرش نوصفه',h:false},
    {t:'وكان ليها الفضل في انجازي لمشروع التخرج',h:false},
    {t:'خوفها عليا ونصائحها ليا كانهم نسمه بارده تصححلي في مساري',h:false},
    {t:'ومرات لما نغلط تزعل مني واني منرضاش تقعد زعلانه مني دقيقه',h:false},
    {t:'نحبها حب منقدرش لا نوصفه ولا نعبر عليه',h:false},
    {t:'ان شاء الله ربي يكتب في قلبها نفس مقدار حبي ليها',h:false},
    {t:'الوحيده ل متخليش فيا لما نتضايق',h:false},
    {t:'متأكد انها ملاك نازل ع الدنيا بكميه الحنيه والطيبه هادي كلها',h:false}
  ];

  /* ============================================================
     STORY RENDERER — scroll-to-bottom gate
     زر "كملي" لا يظهر إلا بعد الوصول لنهاية الصفحة
  ============================================================ */
  function startStory(boxId, btnId, gateId, lines) {
    var box = document.getElementById(boxId);
    var btn = document.getElementById(btnId);
    var gate = document.getElementById(gateId);
    var screen = box ? box.closest('.screen') : null;
    if (!box || box.dataset.done === '1') return;
    box.dataset.done = '1';
    box.innerHTML = '';
    if (btn) btn.classList.add('hidden');
    if (gate) gate.classList.add('hidden');

    // Render lines with stagger
    lines.forEach(function (l, i) {
      var sp = document.createElement('span');
      sp.className = 'sl' + (l.h ? ' nhl' : '');
      sp.textContent = l.t;
      box.appendChild(sp);
      setTimeout(function () { sp.classList.add('on'); }, i * 140 + 300);
    });

    // After all lines appear, show scroll-gate and watch scroll
    var totalTime = lines.length * 140 + 900;
    setTimeout(function () {
      if (!screen) {
        if (btn) btn.classList.remove('hidden');
        return;
      }

      // Show the scroll indicator
      if (gate) gate.classList.remove('hidden');

      function isAtBottom() {
        return screen.scrollHeight - screen.scrollTop - screen.clientHeight < 80;
      }

      function unlock() {
        if (gate) gate.classList.add('hidden');
        if (btn) {
          btn.classList.remove('hidden');
          // Smooth scroll to button
          setTimeout(function () {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
        screen.removeEventListener('scroll', onScroll);
      }

      function onScroll() { if (isAtBottom()) unlock(); }

      // If content already fits (no scroll needed), unlock immediately
      if (isAtBottom()) {
        unlock();
      } else {
        screen.addEventListener('scroll', onScroll, { passive: true });
      }
    }, totalTime);
  }

  /* SURPRISES */
  var SURPS=[
    {e:'🌙',m:'أنتِ نور حياتي زي القمر 🌙'},{e:'💌',m:'كل رسالة منك تخلي يومي أحلى 💌'},
    {e:'🎓',m:'مهندستي المستقبلية، أنا فخور بيكِ 🎓'},{e:'🌸',m:'طيبتك مش طبيعية، ربي يحفظها 🌸'},
    {e:'✨',m:'ابتسامتك تغير الجو كله ✨'},{e:'🤍',m:'ملاذي الآمن في كل وقت 🤍'},
    {e:'💻',m:'البرمجة خلتنا نتعرف، والقدر جمعنا 💻'},{e:'🎀',m:'الشال هديتك اللي ما ننساها 🎀'},
    {e:'🌹',m:'أنتِ أجمل شي في حياتي 🌹'},{e:'💫',m:'عيونك مذوبيني من أول نظرة 💫'},
    {e:'🕊️',m:'راحتي وسكينتي أنتِ 🕊️'},{e:'🌙',m:'ليلة ميلادك نزل قمر على الأرض 🌙'},
    {e:'💝',m:'حبك في قلبي ما يوصفه كلام 💝'},{e:'🌟',m:'نجمتي اللي تضوي دربي 🌟'},
    {e:'🤗',m:'دعمك ليا كان أكبر من أي حاجة 🤗'},{e:'🎵',m:'كل أغنية حلوة تذكرني بيكِ 🎵'},
    {e:'☁️',m:'أنتِ الهدوء في وسط الضغط ☁️'},{e:'💐',m:'كل يوم معك زهرة جديدة 💐'},
    {e:'🙏',m:'ربي يجمعنا بالحلال ويسعدنا 🙏'},{e:'🔥',m:'سجو❤️‍🔥 أنتِ الفريدة من نوعها'},
    {e:'🎂',m:'عيد ميلادك الـ21 مبارك يا أحلى إنسانة 🎂🤍'}
  ];
  var sIdx=0;
  function initSurp(){sIdx=0;showSurp(0);}
  function showSurp(i){
    var t=document.getElementById('st'),f=document.getElementById('sf'),e=document.getElementById('se'),m=document.getElementById('sm'),b=document.getElementById('sn'),c=document.getElementById('sc');
    if(!t||!e||!m||!b||!c)return;
    t.textContent=(i+1)+' / '+SURPS.length;
    if(f)f.style.width=((i+1)/SURPS.length*100)+'%';
    e.textContent=SURPS[i].e;m.textContent=SURPS[i].m;
    c.style.transition='none';c.style.opacity='0';c.style.transform='scale(.88) translateY(12px)';
    requestAnimationFrame(function(){requestAnimationFrame(function(){c.style.transition='opacity .4s ease,transform .4s ease';c.style.opacity='1';c.style.transform='scale(1) translateY(0)';});});
    if(i>=SURPS.length-1){b.textContent='كملي 🤍';b.onclick=function(){goTo(5);};}
    else{b.textContent='التالية 🤍';b.onclick=nxtSurp;}
  }
  function nxtSurp(){if(sIdx<SURPS.length-1){sIdx++;showSurp(sIdx);burst(document.getElementById('sc'),6);}}

  /* CANVAS */
  var cvR=false,drw=false,lx=0,ly=0;
  var PAL=['#ff6b9d','#ff3d7f','#ffb3cc','#c56cf0','#7c4dff','#00bcd4','#ff6b35','#ffd700','#4caf50','#ffffff'];
  var ci=0,bS=[3,5,8,13,20],bi=1,er=false;
  function initCanvas(){
    if(cvR)return;cvR=true;
    var cv=document.getElementById('dc');if(!cv)return;
    var ctx=cv.getContext('2d');
    cv.width=cv.parentElement.clientWidth;
    cv.height=Math.min(window.innerHeight*.42,310);
    var pal=document.getElementById('pal');
    if(pal){PAL.forEach(function(col,i){var d=document.createElement('div');d.className='pd'+(i===0?' sel':'');d.style.background=col;d.addEventListener('click',function(){ci=i;er=false;document.querySelectorAll('.pd').forEach(function(x){x.classList.remove('sel');});d.classList.add('sel');var te=document.getElementById('tEr');if(te)te.classList.remove('on');});pal.appendChild(d);});}
    var hint=document.getElementById('ch'),fd=true;
    function gp(e){var r=cv.getBoundingClientRect();if(e.touches)return{x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top};return{x:e.clientX-r.left,y:e.clientY-r.top};}
    function dd(e){
      if(fd&&hint){hint.classList.add('gone');fd=false;}
      var p=gp(e);
      ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(p.x,p.y);
      if(er){ctx.globalCompositeOperation='destination-out';ctx.strokeStyle='rgba(0,0,0,1)';ctx.lineWidth=bS[bi]*3;}
      else{ctx.globalCompositeOperation='source-over';ctx.strokeStyle=PAL[ci];ctx.lineWidth=bS[bi];ctx.shadowColor=PAL[ci];ctx.shadowBlur=16;}
      ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();ctx.shadowBlur=0;
      if(!er&&Math.random()<.045){ctx.globalCompositeOperation='source-over';ctx.font=(Math.random()*16+10)+'px serif';ctx.fillStyle=PAL[ci];ctx.shadowColor=PAL[ci];ctx.shadowBlur=10;ctx.fillText(['❤️','🌸','✨','💕','🌹','💫'][Math.floor(Math.random()*6)],p.x-8,p.y-8);ctx.shadowBlur=0;}
      lx=p.x;ly=p.y;
    }
    cv.addEventListener('mousedown',function(e){drw=true;var p=gp(e);lx=p.x;ly=p.y;});
    cv.addEventListener('mousemove',function(e){if(!drw)return;e.preventDefault();dd(e);});
    cv.addEventListener('mouseup',function(){drw=false;});
    cv.addEventListener('mouseleave',function(){drw=false;});
    cv.addEventListener('touchstart',function(e){drw=true;var p=gp(e);lx=p.x;ly=p.y;},{passive:false});
    cv.addEventListener('touchmove',function(e){if(!drw)return;e.preventDefault();dd(e);},{passive:false});
    cv.addEventListener('touchend',function(){drw=false;});
    var tCl=document.getElementById('tCl'),tCo=document.getElementById('tCo'),tSz=document.getElementById('tSz'),tEr=document.getElementById('tEr');
    if(tCl)tCl.addEventListener('click',function(){ctx.clearRect(0,0,cv.width,cv.height);if(hint)hint.classList.remove('gone');fd=true;});
    if(tCo)tCo.addEventListener('click',function(){ci=(ci+1)%PAL.length;er=false;if(tEr)tEr.classList.remove('on');document.querySelectorAll('.pd').forEach(function(x,i){x.classList.toggle('sel',i===ci);});});
    if(tSz)tSz.addEventListener('click',function(){bi=(bi+1)%bS.length;tSz.textContent='✏️ '+bS[bi];});
    if(tEr)tEr.addEventListener('click',function(){er=!er;tEr.classList.toggle('on',er);});
  }

  /* GIFT */
  var gD=false;
  function initGift(){var g=document.getElementById('g3');if(g&&!gD)g.addEventListener('click',openGift);}
  function openGift(){
    if(gD)return;gD=true;
    var g=document.getElementById('g3'),h=document.getElementById('gh'),c=document.getElementById('bc'),s=document.getElementById('gs');
    if(!g||!c)return;
    g.classList.add('open');if(h)h.style.opacity='0';
    for(var i=0;i<55;i++){(function(i){setTimeout(function(){var el=document.createElement('div');el.className='ch';el.textContent=['❤️','💕','🌸','✨','💖','🤍','⭐','🌹','💫','🌟'][Math.floor(Math.random()*10)];var r=g.getBoundingClientRect();el.style.cssText='left:'+(r.left+Math.random()*r.width)+'px;top:'+(r.top+Math.random()*r.height)+'px;font-size:'+(Math.random()*2.2+.8)+'rem;animation-delay:'+(Math.random()*.18)+'s;';document.body.appendChild(el);setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},2000);},i*32);})(i);}
    setTimeout(function(){if(s)s.style.display='none';c.classList.remove('hidden');},1000);
  }
  var sb=document.getElementById('sb');
  if(sb)sb.addEventListener('click',function(){var f=document.getElementById('ytf');if(f)f.src=f.src.replace('&mute=1','&mute=0');sb.classList.add('gone');});

  /* FINAL */
  function initFinal(){
    var w=document.getElementById('fs');
    if(w&&!w.dataset.done){w.dataset.done='1';for(var i=0;i<25;i++){(function(i){setTimeout(function(){var s=document.createElement('div');s.style.cssText='position:absolute;font-size:'+(Math.random()*1.4+.6)+'rem;top:'+Math.random()*100+'%;left:'+Math.random()*100+'%;animation:twk '+(Math.random()*2.5+1.5)+'s ease-in-out infinite;animation-delay:'+(Math.random()*2.5)+'s;pointer-events:none;';s.textContent=['✨','⭐','🌟','💫','🌸'][Math.floor(Math.random()*5)];w.appendChild(s);},i*70);})(i);}}
    var ring=document.getElementById('pr');
    if(ring)ring.addEventListener('click',function(e){
      mkRip(e.clientX,e.clientY);
      if(navigator.vibrate)navigator.vibrate([30,20,30]);
      for(var i=0;i<20;i++){(function(i){setTimeout(function(){var h=document.createElement('div');h.className='ch';h.textContent=['❤️','💕','🌸','✨','💖','🤍','💗','💝','🌹','💫'][Math.floor(Math.random()*10)];h.style.cssText='left:'+(e.clientX+(Math.random()-.5)*120)+'px;top:'+(e.clientY+(Math.random()-.5)*120)+'px;font-size:'+(Math.random()*2+.8)+'rem;animation-delay:'+(Math.random()*.35)+'s;';document.body.appendChild(h);setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h);},2000);},i*25);})(i);}
    });
  }

  /* BURST */
  function burst(el,n){if(!el)return;var r=el.getBoundingClientRect();for(var i=0;i<n;i++){var h=document.createElement('div');h.className='ch';h.textContent=['❤️','💕','🌸','✨','💖'][Math.floor(Math.random()*5)];h.style.cssText='left:'+(r.left+Math.random()*r.width)+'px;top:'+(r.top+Math.random()*r.height)+'px;font-size:'+(Math.random()*1.2+.8)+'rem;animation-delay:'+(Math.random()*.28)+'s;';document.body.appendChild(h);setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h);},1900);}}

  /* MUSIC */
  var mb=document.getElementById('mbtn'),ma=document.getElementById('aud'),mon=false;
  if(mb&&ma){mb.addEventListener('click',function(){if(!mon){ma.volume=.13;ma.play().catch(function(){});mb.classList.add('on');mb.textContent='🔊';mon=true;}else{ma.pause();mb.classList.remove('on');mb.textContent='🎵';mon=false;}});}

});
