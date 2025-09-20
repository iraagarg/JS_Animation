const canvas = document.getElementById("rainCanvas");
const ctx =  canvas.getContext("2d");

function resizeCanvas() {
   canvas.width = window.innerWidth;
  canvas.height  = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


const rainDrops = [];
 const ripples = [];
const  lightnings  = [];
let  flashOpacity = 0;

const stars = [];
for (let i = 0; i < 200; i++) {
  let starX = Math.random() * canvas.width;
   let starY = Math.random() * canvas.height * 0.6; 
  let starSize = Math.random() * 2 + 0.5;
    let brightness = Math.random() * 0.5 + 0.3;
  let  speed = Math.random() * 0.05 + 0.01;
  let phase = Math.random() * Math.PI * 2;

  stars.push({
     x: starX,
    y:  starY,
    radius: starSize,
    baseOpacity: brightness,
     twinkleSpeed: speed,
    twinklePhase: phase
  });
}

function drawStars() {
  let time =  Date.now() * 0.002;

  stars.forEach(function (star) {
     let twinkle = Math.sin(time * star.twinkleSpeed * 50 + star.twinklePhase);
    let opacity = star.baseOpacity + 0.5 * twinkle;

     if (opacity < 0)  opacity = 0;
    if (opacity > 1)  opacity = 1;

    ctx.beginPath();
     ctx.arc(star.x,  star.y, star.radius, 0, Math.PI * 2 );
     ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
    ctx.fill();
  });
}

class RainDrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
     this.y = Math.random() * -canvas.height; 
    this.length = Math.random() * 20 + 10;
    this.speed =  Math.random() * 4 + 4;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(173,216,230,0.8)"; 
    ctx.lineWidth  = 1.2;
    ctx.moveTo( this.x, this.y);
    ctx.lineTo (this.x,  this.y + this.length);
    ctx.stroke();
  }

  update() {
    this.y += this.speed;

    if (this.y > canvas.height) {
      ripples.push(new Ripple(this.x, canvas.height - 5));
       this.reset();
    }
    this.draw();
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
     this.y = y;
    this.radius = 2;
    this.opacity = 0.6;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(173,216,230,${this.opacity})`;
     ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  update() {
    this.radius += 0.5;
    this.opacity -= 0.01;
     this.draw();
  }
}