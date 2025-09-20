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