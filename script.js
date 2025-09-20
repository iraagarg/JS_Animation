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
const lightnings  = [];
let  flashOpacity = 0;
