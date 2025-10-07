const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const motivationalText = document.getElementById('motivationalText');
const startButton = document.getElementById('startButton');

let bubbles = [];
let animationRunning = false;

const phrases = [
  "¡Nunca te rindas, cada punto cuenta!",
  "El esfuerzo de hoy será tu victoria mañana.",
  "Entrena duro, juega con pasión.",
  "Cada saque es una oportunidad de brillar.",
  "El vóley es vida: mantén la motivación."
];

class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.radius = Math.random() * 15 + 5;
    this.speedY = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y -= this.speedY;
    if(this.y + this.radius < 0) {
      this.y = canvas.height + this.radius;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initBubbles(count = 50) {
  bubbles = [];
  for(let i = 0; i < count; i++) {
    bubbles.push(new Bubble());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(bubble => bubble.update());
  requestAnimationFrame(animate);
}

// Evento del botón
startButton.addEventListener('click', () => {
  if(!animationRunning) {
    canvas.style.display = "block";
    initBubbles();
    animate();
    animationRunning = true;

    const randomIndex = Math.floor(Math.random() * phrases.length);
    motivationalText.textContent = phrases[randomIndex];
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
