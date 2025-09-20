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
