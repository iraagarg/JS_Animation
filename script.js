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

class Lightning {
  constructor() {
    this.segments = [];
     this.opacity = 1;
    this.createBolt();
  }

  createBolt() {
    let x = Math.random() * canvas.width;
    let y = 0;
    this.segments.push({ x, y });


    while (y < canvas.height * 0.8) {
      x += (Math.random() - 0.5) * 100;
      y += Math.random() * 40 + 20;
      this.segments.push({ x, y });
    }
  }

   draw() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
     ctx.lineWidth  = 2;
     ctx.shadowBlur = 20;
    ctx.shadowColor =  "rgba(255,255,255,0.8)";

    ctx.moveTo(this.segments[0].x, this.segments[0].y);
    for (let i = 1; i < this.segments.length;  i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y);
    }

    ctx.stroke();
    ctx.restore();
  }

  update() {
     this.opacity -=  0.02;
    this.draw();
  }
}

for (let i = 0; i < 400; i++) {
  rainDrops.push(new RainDrop());
}

function thunder() {
   if (Math.random() > 0.997) {
    lightnings.push(new Lightning());
     flashOpacity = 0.8;

    const baseSound = document.getElementById("thunderSound");
    const rumbles = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < rumbles; i++) {
      const delay = Math.random() * 2000 + i * 400 + 300;
      setTimeout(() => {
        const thunder = baseSound.cloneNode();
        thunder.volume = 0;
        thunder.play();

        let v = 0;
        const fadeIn = setInterval(() => {
          if (v >= 0.7) {
            clearInterval(fadeIn);
            const fadeOut = setInterval(() => {
              thunder.volume -= 0.02;
              if (thunder.volume <= 0.05) {
                thunder.pause();
                clearInterval(fadeOut);
              }
            }, 150);
          }
           else {
            v += 0.05;
            thunder.volume = v;
          }
        }, 150);
      }, delay);
    }
  }
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
   gradient.addColorStop(0, "#000000");
  gradient.addColorStop(1, "#0b0d27ff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}