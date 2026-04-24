// script.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Scene management
  const scenes = {
    intro: document.getElementById('scene-intro'),
    story: document.getElementById('scene-story'),
    relationship: document.getElementById('scene-relationship'),
    surprises: document.getElementById('scene-surprises'),
    transition: document.getElementById('scene-transition'),
    draw: document.getElementById('scene-draw'),
    giftbox: document.getElementById('scene-giftbox'),
    finalheart: document.getElementById('scene-finalheart'),
    ending: document.getElementById('scene-ending')
  };

  // Story text (full story, do not change text)
  const storyParagraphs = [
    "وفي لحظة…",
    "ما كانتش محسوبة",
    "بدت حكايتي اني وملاذي الآمن جوجو نور عيوني…",
    "مش صدفة عادية",
    "ولا مجرد تعارف",
    "تعرفت على سجى…",
    "عن طريق رسالة",
    "في تلجرام",
    "كانت تسأل على مشروع",
    "في مادة برمجة مرئيه 1…",
    "قررت نساعدها لجمال اسلوبها",
    "كان الموضوع بسيط في البداية…",
    "لكن أسلوبها",
    "كان مختلف",
    "كانت تحكي باحترام",
    "تشكر…",
    "وتعتذر…",
    "بطريقة خلتني نوقف",
    "ونحس…",
    "إنها مش زي أي حد 🤍",
    "بدي الكلام خفيف…",
    "مجرد دراسة",
    "ومساعدة",
    "لكن مع الأيام…",
    "بدي يومي",
    "بدي في انتظار",
    "بدي في تعلّق…",
    "بدون حتى ما نحس حبيتهاا",
    "لين جت فتره…",
    "كنت تحت ضغط",
    "في مشروع التخرج",
    "تعب",
    "توتر",
    "تفكييرر",
    "وقفت معايا…",
    "سهرت معايا",
    "تسند فيا",
    "وتخفف عليا",
    "وكأنها",
    "حاسّة بكل شي",
    "في اللحظة هذي…",
    "فهمت",
    "إنها مش شخص عادي",
    "ولا مجرد حد في حياتي",
    "هي حاجة أكبر",
    "ومن وقتها…",
    "وكل موقف حلو منها",
    "كان يقربني أكثر",
    "لين لقيت روحي…",
    "تعلقت بيها",
    "بدون ما نحس",
    "نحب فيها…",
    "اهتمامها",
    "طيبتها",
    "جمالها",
    "وعيونهااا ل مذوبيني",
    "وطريقتها الهادية",
    "اللي تخلي فيا",
    "نرتاح",
    "وفي موقف…",
    "مستحيل ننساه",
    "يوم عطتني شال",
    "كهدية للتخرج",
    "في وقت…",
    "كنت حتى أنا",
    "مش عارف",
    "كيف بندير لنفسي حاجة",
    "اللحظة هذي…",
    "كانت كبيرة عندي",
    "وقيمتها…",
    "أكبر من أي حاجة مادية",
    "ومن بعدها…",
    "أي حاجة بسيطة منها",
    "تفرحني",
    "حتى سؤال عادي",
    "حتى كلمة صغيرة",
    "حتى ريبوست علي تيك توك يخليني فرحان",
    "ومن وقتها…",
    "نشوف فيها",
    "ملاذي الآمن 🤍",
    "ودنيتي كلها",
    "ومن غيرها…",
    "نحس روحي",
    "بروحي…",
    "ومش مرتاح",
    "اني معاذ تعرفت علي سجى وحبيتها قبل ل نعرف روحي حبيتها",
    "فجأة كأنها يد كبيره حضنتني بقوه",
    "حنيتها تخلي فيا نحس في روحي انسان مؤذي ونخاف نقسى عليها فيوم",
    "تسند فيا وتدعم فيا بشكل منقدرش نوصفه وكان ليها الفضل في انجازي لمشروع التخرج",
    "خوفها عليا ونصائحها ليا كانهم نسمه بارده تصححلي في مساري",
    "ومرات لما نغلط تزعل مني واني منرضاش تقعد زعلانه مني دقيقه",
    "نحبها حب منقدرش لا نوصفه ولا نعبر عليه ان شاء الله ربي يكتب في قلبها نفس مقدار حبي ليها بحبها ليا",
    "الوحيده ل متخليش فيا لما نتضايق",
    "ولما نتعب تسأل عليا وتقعد تطمن عليا هادي اني متأكد انها ملاك نازل ع الدنيا بكميه الحنيه والطيبه هادي كلها"
  ];

  // 21 Emotional surprises messages
  const surprises = [
    "ياملاذي الامن من تعب الدنيا 🤍",
    "كل شي بدي بابتسامة منك",
    "ما كنتش متوقع إنك تغيّري كل ش فيا",
    "وجودك بس يحلي ايامي",
    "أحلى صدفة صارتلي",
    "طريقتك مختلفة ومميزه",
    "تخلي فيا نبتسم بدون سبب",
    "معاك الوقت يجري بشكل أحلى",
    "ربي يدومك جنبي ياعيوني ",
    "صرتي جزء اساسي من يومي",
    "حتى سكوتك فيه راحة",
    "كل رسالة منك تفرحني",
    "نستنى كلامك حتى لو كلمة",
    "نخاف نخسرك وان شاء الله ماتصير",
    "انتي مش عادية",
    "انتي إحساس",
    "كل لحظة معاك كنز",
    "وجودك نعمة",
    "نبي راحتك قبل أي شي",
    "خليتيني احسن وقاعد نتحسن",
    "كل عام وانتي ليا يا عمري 🤍"
  ];

  // Relationship scenes (selected impactful story parts, do not change)
  const relationshipTexts = [
    "مع الأيام…",
    "بدي يومي",
    "بدي في انتظار",
    "بدي في تعلّق…",
    "بدون حتى ما نحس حبيتهاا",
    "لين جت فتره…",
    "كنت تحت ضغط",
    "في مشروع التخرج",
    "تعب",
    "توتر",
    "تفكييرر",
    "وقفت معايا…",
    "سهرت معايا",
    "تسند فيا",
    "وتخفف عليا",
    "وكأنها",
    "حاسّة بكل شي",
    "في اللحظة هذي…",
    "فهمت",
    "إنها مش شخص عادي",
    "ولا مجرد حد في حياتي",
    "هي حاجة أكبر",
    "ومن وقتها…",
    "وكل موقف حلو منها",
    "كان يقربني أكثر",
    "لين لقيت روحي…",
    "تعلقت بيها",
    "بدون ما نحس",
    "نحب فيها…",
    "اهتمامها",
    "طيبتها",
    "جمالها",
    "وعيونهااا ل مذوبيني",
    "وطريقتها الهادية",
    "اللي تخلي فيا",
    "نرتاح"
  ];

  // DOM references
  const storyTextP = document.getElementById('storyText');
  const relationshipTextP = document.getElementById('relationshipText');
  const surpriseTextP = document.getElementById('surpriseText');
  const surpriseParticles = document.getElementById('surpriseParticles');

  // Scene control variables
  let currentSceneIndex = 0;
  const sceneOrder = [
    'intro',     // Cinematic intro
    'story',     // Story scenes with tap to continue
    'relationship', // Relationship progression scenes
    'surprises',  // 21 emotional surprises
    'transition', // Transition message to drawing
    'draw',       // Drawing mini game
    'giftbox',    // Gift box cinematic reveal
    'finalheart', // Final heart scene ending
    'ending'      // Final cinematic ending
  ];

  // Story progression indices
  let storyIndex = 0;
  let relationshipIndex = 0;
  let surpriseIndex = 0;

  // Start audio softly at launch
  const bgAudio = document.getElementById('backgroundAudio');
  bgAudio.volume = 0.08; // Very low volume for soft romantic piano and ambient
  bgAudio.play().catch(() => { /* Autoplay restriction fallback */ });

  // Helper function to switch visible scene
  function showScene(name) {
    Object.values(scenes).forEach(sec => {
      sec.classList.remove('active');
    });
    if (scenes[name]) {
      scenes[name].classList.add('active');
    }
  }

  // Intro scene tap handler
  function onIntroTap() {
    showScene('story');
    storyIndex = 0;
    displayStoryText(storyIndex);
  }

  // Display story text by index with fade effect
  function displayStoryText(index) {
    if (index < storyParagraphs.length) {
      fadeText(storyTextP, storyParagraphs[index]);
    } else {
      // End of story, move to relationship progression
      showScene('relationship');
      relationshipIndex = 0;
      displayRelationshipText(relationshipIndex);
    }
  }

  // Display relationship text with fade effect
  function displayRelationshipText(index) {
    if (index < relationshipTexts.length) {
      fadeText(relationshipTextP, relationshipTexts[index]);
    } else {
      // End of relationship scenes, go to surprises
      showScene('surprises');
      surpriseIndex = 0;
      displaySurprise(surpriseIndex);
    }
  }

  // Display one surprise with cinematic animation
  function displaySurprise(index) {
    if (index < surprises.length) {
      fadeText(surpriseTextP, surprises[index], () => {
        playSurpriseParticles();
      });
    } else {
      // All surprises done, proceed to transition scene
      showScene('transition');
    }
  }

  // Helper fade text with callback
  function fadeText(element, text, afterFadeIn) {
    element.style.opacity = 0;
    setTimeout(() => {
      element.textContent = text;
      element.style.opacity = 1;
      if (afterFadeIn) {
        afterFadeIn();
      }
    }, 400);
  }

  // Surprise particles: hearts floating up behind text
  function playSurpriseParticles() {
    surpriseParticles.innerHTML = '';
    const heartsCount = 15;
    for (let i = 0; i < heartsCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.style.left = `${Math.random() * 90 + 5}%`;
      heart.style.bottom = `-20px`;
      heart.style.animationDelay = `${Math.random() * 1.5}s`;
      heart.style.animationDuration = `${4 + Math.random() * 3}s`;
      surpriseParticles.appendChild(heart);
      // Removing heart after animation to keep DOM clean
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }
  }

  // Transition scene tap event - proceed to draw scene
  function onTransitionTap() {
    showScene('draw');
    initDrawingCanvas();
  }

  // Drawing canvas and logic
  const drawCanvas = document.getElementById('drawCanvas');
  const ctx = drawCanvas.getContext('2d');
  let drawing = false;
  let lastX = 0;
  let lastY = 0;

  // Hearts follow drawing position
  const drawArea = document.querySelector('.draw-panel');
  const finishDrawBtn = document.getElementById('finishDrawBtn');

  // Setup drawing canvas sizing
  function resizeCanvas() {
    drawCanvas.width = drawCanvas.clientWidth * devicePixelRatio;
    drawCanvas.height = drawCanvas.clientHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Glowing brush style
  function setDrawStyle() {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 9;
    const gradient = ctx.createRadialGradient(lastX, lastY, 2, lastX, lastY, 20);
    gradient.addColorStop(0, 'rgba(255, 182, 193, 1)');
    gradient.addColorStop(1, 'rgba(255, 106, 145, 0)');
    ctx.strokeStyle = gradient;
  }

  // Draw on canvas function
  function drawLine(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // Start drawing
  function startDrawing(x, y) {
    drawing = true;
    [lastX, lastY] = [x, y];
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
  }

  // Draw move
  function drawMove(x, y) {
    if (!drawing) return;
    // Draw glowing brush line
    setDrawStyle();
    drawLine(x, y);
    [lastX, lastY] = [x, y];
    // Spawn heart near cursor/finger
    spawnHeart(x, y);
  }

  // End drawing
  function endDrawing() {
    drawing = false;
  }

  // Heart spawn management for drawing
  function spawnHeart(x, y) {
    if (!drawArea) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.width = '16px';
    heart.style.height = '14px';
    heart.style.left = `${x + drawCanvas.getBoundingClientRect().left - drawArea.getBoundingClientRect().left - 8}px`;
    heart.style.top = `${y + drawCanvas.getBoundingClientRect().top - drawArea.getBoundingClientRect().top - 12}px`;
    heart.style.animationDuration = '2.8s';
    heart.style.animationName = 'floatUp';
    heart.style.opacity = 0.9;

    drawArea.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2800);
  }

  // Canvas event handlers for mouse and touch
  function getPointerPosition(e) {
    if (e.touches) return [e.touches[0].clientX, e.touches[0].clientY];
    return [e.clientX, e.clientY];
  }

  drawCanvas.addEventListener('mousedown', e => {
    const [x, y] = getPointerPosition(e);
    startDrawing(x - drawCanvas.getBoundingClientRect().left, y - drawCanvas.getBoundingClientRect().top);
  });

  drawCanvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const [x, y] = getPointerPosition(e);
    startDrawing(x - drawCanvas.getBoundingClientRect().left, y - drawCanvas.getBoundingClientRect().top);
  }, { passive: false });

  drawCanvas.addEventListener('mousemove', e => {
    const [x, y] = getPointerPosition(e);
    drawMove(x - drawCanvas.getBoundingClientRect().left, y - drawCanvas.getBoundingClientRect().top);
  });

  drawCanvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const [x, y] = getPointerPosition(e);
    drawMove(x - drawCanvas.getBoundingClientRect().left, y - drawCanvas.getBoundingClientRect().top);
  }, { passive: false });

  ['mouseup', 'touchend', 'touchcancel', 'mouseleave'].forEach(eventName => {
    drawCanvas.addEventListener(eventName, endDrawing);
  });

  // Finish Draw button handler
  finishDrawBtn.addEventListener('click', () => {
    // Proceed to giftbox scene
    showScene('giftbox');
  });

  // Gift box scene logic
  const giftBox = document.getElementById('giftBox');

  // Heart & flowers container for gift open
  let giftOpenAnimationRunning = false;

  giftBox.addEventListener('click', () => {
    if (giftOpenAnimationRunning) return;
    giftOpenAnimationRunning = true;
    openGiftBox();
  });

  giftBox.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && !giftOpenAnimationRunning) {
      e.preventDefault();
      giftOpenAnimationRunning = true;
      openGiftBox();
    }
  });

  // Gift box open effect function
  function openGiftBox() {
    giftBox.classList.remove('shaking');
    giftBox.style.animation = 'none';
    // Simulate slow cinematic opening then light explosion with hearts and flowers
    giftBox.style.transition = 'transform 1.2s ease-out';
    giftBox.style.transform = 'scale(1.2) rotateX(70deg)';

    setTimeout(() => {
      // Explosion light effect
      const explosion = document.createElement('div');
      explosion.className = 'light-explosion-glow';
      scenes.giftbox.querySelector('.glass-panel').appendChild(explosion);

      // Create hearts and roses bursts
      createBurstParticles(scenes.giftbox.querySelector('.glass-panel'));

      // Fade out gift box
      giftBox.style.opacity = '0';

      // After animation show final heart scene
      setTimeout(() => {
        showScene('finalheart');
      }, 2100);
    }, 1300);
  }

  // Burst particles animation for hearts and roses
  function createBurstParticles(container) {
    const count = 28;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = (i % 2 === 0) ? 'burst-heart' : 'burst-rose';
      p.style.left = '50%';
      p.style.top = '50%';

      // Random spread and animation delay
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 60;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;

      p.style.setProperty('--x', `${x}px`);
      p.style.setProperty('--y', `${y}px`);
      p.style.animationDelay = `${Math.random() * 0.8}s`;

      container.appendChild(p);

      // Remove after animation
      p.addEventListener('animationend', () => {
        p.remove();
      });
    }

    // Light explosion glow
    const explosion = container.querySelector('.light-explosion-glow');
    if (explosion) {
      setTimeout(() => {
        explosion.remove();
      }, 1800);
    }
  }

  // Floating heart and rose burst styles to be added as CSS injections
  const burstStyle = document.createElement('style');
  burstStyle.textContent = `
  .light-explosion-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle at center, #ffe6f0 0%, transparent 80%);
    border-radius: 50%;
    filter: drop-shadow(0 0 35px #ff92bae6);
    transform: translate(-50%, -50%) scale(0);
    animation: explosionScale 0.6s ease forwards;
    z-index: 25;
  }
  @keyframes explosionScale {
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
  .burst-heart, .burst-rose {
    position: absolute;
    width: 25px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0;
    filter: drop-shadow(0 0 6px #ffbadbbb);
    animation: burstMove 1.6s cubic-bezier(0.57, -0.21, 0.78, 0.55) forwards;
  }
  .burst-heart {
    background-image: url('data:image/svg+xml;utf8,<svg fill="pink" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 462s-56-46.3-96-90c-38-41-70-79-70-136 0-53 43-90 81-90 22 0 41 11 51 29 10-18 29-29 51-29 38 0 81 37 81 90 0 57-32 95-70 136-40 44-96 90-96 90z"/></svg>');
  }
  .burst-rose {
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23ff6f91" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 2C27 14 14 14 8 34c4 20 36-12 36-12S37 1 32 2z"/></svg>');
  }
  @keyframes burstMove {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x), var(--y)) scale(0);
      opacity: 0;
    }
  }
  `;
  document.head.appendChild(burstStyle);

  // Final heart scene logic
  const finalHeartContainer = document.getElementById('finalHeartContainer');

  // Tap to spawn hearts in final heart scene
  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.animationDuration = '4.6s';
    heart.style.animationName = 'floatUp';
    heart.style.opacity = 0.95;

    finalHeartContainer.appendChild(heart);

    // Remove after animation
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }

  // Large merged heart management
  function addMergedHeart() {
    const existingHeart = finalHeartContainer.querySelector('.merged-heart');
    if (existingHeart) return;
    const bigHeartDiv = document.createElement('div');
    bigHeartDiv.className = 'merged-heart';
    finalHeartContainer.appendChild(bigHeartDiv);
  }

  // Handle taps on finalheart scene
  function onFinalHeartTap(e) {
    let x = e.clientX - finalHeartContainer.getBoundingClientRect().left;
    let y = e.clientY - finalHeartContainer.getBoundingClientRect().top;

    createFloatingHeart(x, y);

    // If enough hearts created, show big heart
    addMergedHeart();

    // Proceed to ending after a delay (optional enhancement)
    setTimeout(() => {
      showScene('ending');
    }, 6000);
  }

  /*
  Event listeners setup for scenes tap/click
  the order of scenes controlled by sceneOrder and currentSceneIndex
  */

  // Setup tap/click for intro scene to start story
  scenes.intro.addEventListener('click', onIntroTap);
  scenes.intro.addEventListener('touchstart', e => {
    e.preventDefault();
    onIntroTap();
  }, { passive: false });

  // Story scene tap progresses story paragraphs
  scenes.story.addEventListener('click', () => {
    storyIndex++;
    displayStoryText(storyIndex);
  });
  scenes.story.addEventListener('touchstart', e => {
    e.preventDefault();
    storyIndex++;
    displayStoryText(storyIndex);
  }, { passive: false });

  // Relationship scene tap progresses relationship paragraphs
  scenes.relationship.addEventListener('click', () => {
    relationshipIndex++;
    displayRelationshipText(relationshipIndex);
  });
  scenes.relationship.addEventListener('touchstart', e => {
    e.preventDefault();
    relationshipIndex++;
    displayRelationshipText(relationshipIndex);
  }, { passive: false });

  // Surprises scene tap progresses surprises one by one
  scenes.surprises.addEventListener('click', () => {
    surpriseIndex++;
    displaySurprise(surpriseIndex);
  });
  scenes.surprises.addEventListener('touchstart', e => {
    e.preventDefault();
    surpriseIndex++;
    displaySurprise(surpriseIndex);
  }, { passive: false });

  // Transition scene tap proceeds to drawing scene
  scenes.transition.addEventListener('click', onTransitionTap);
  scenes.transition.addEventListener('touchstart', e => {
    e.preventDefault();
    onTransitionTap();
  }, { passive: false });

  // Final heart scene tap to create hearts and proceed to ending
  scenes.finalheart.addEventListener('click', onFinalHeartTap);
  scenes.finalheart.addEventListener('touchstart', e => {
    e.preventDefault();
    onFinalHeartTap(e.touches[0]);
  }, { passive: false });

  // Initialize app with intro scene shown
  showScene('intro');

  /*
  RAIN PARTICLES BACKGROUND CANVAS IMPLEMENTATION
  for continuous soft rain animation
  */

  const rainCanvas = document.getElementById('rainCanvas');
  const rc = rainCanvas.getContext('2d');
  let rainDrops = [];
  const rainCount = 130;

  function resizeRainCanvas() {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
  }
  resizeRainCanvas();
  window.addEventListener('resize', resizeRainCanvas);

  class RainDrop {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * rainCanvas.width;
      this.y = Math.random() * rainCanvas.height;
      this.len = 12 + Math.random() * 22;
      this.speed = 2 + Math.random() * 4;
      this.opacity = 0.15 + Math.random() * 0.3;
      this.width = 1;
    }
    update() {
      this.y += this.speed;
      if (this.y > rainCanvas.height + this.len) {
        this.reset();
        this.y = -this.len;
      }
    }
    draw() {
      rc.beginPath();
      rc.strokeStyle = `rgba(255, 182, 193, ${this.opacity})`;
      rc.lineWidth = this.width;
      rc.moveTo(this.x, this.y);
      rc.lineTo(this.x, this.y + this.len);
      rc.stroke();
    }
  }

  // Setup raindrops
  for (let i = 0; i < rainCount; i++) {
    rainDrops.push(new RainDrop());
  }

  // Animation loop
  function animateRain() {
    rc.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    rainDrops.forEach(drop => {
      drop.update();
      drop.draw();
    });
    requestAnimationFrame(animateRain);
  }
  animateRain();

});
