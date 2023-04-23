let canvas = document.getElementById("canvas1") as (HTMLCanvasElement | null);
let ctx = canvas!!.getContext("2d");

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const mouse = { x: 0, y: 0 };
const color = ["red", "blue", "white", "pink", 
    "yellow", "violet", "green", "lightgreen",
    "orange", "aqua", "cyan"];


const particleArray: Particle[] = [];

let hue = 1;

class Particle {
    public x: number;
    public y: number;
    public size: number;
    public speedX: number;
    public speedY: number;
    // public color: number;
    public color: string;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.floor(Math.random() * 10 + 1);
        this.speedX = Math.floor(Math.random() * 10 - 5);
        this.speedY = Math.floor(Math.random() * 10 - 5);
        // this.color = Math.floor(Math.random() * color.length);
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.size -= 0.1;
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}


canvas?.addEventListener("mousemove", function(e) {
    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle(e.x, e.y));
    }
});


// canvas?.addEventListener("click", function(e) {
//     for (let i = 0; i < 50; i++) {
//         particleArray.push(new Particle(e.x, e.y));
//     }
    
// });

function updateParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        if (particleArray[i].size <= 0) {
            particleArray.splice(i, 1);
            i--;
        } else {
            particleArray[i].draw();
            for (let j = i + 1; j < particleArray.length; j++) {
                const dx = particleArray[i].x - particleArray[j].x;
                const dy = particleArray[i].y - particleArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    if (ctx) {
                        ctx.beginPath();
                        ctx.strokeStyle = particleArray[i].color;
                        ctx.lineWidth = particleArray[i].size / 10;
                        ctx.moveTo(particleArray[i].x, particleArray[i].y);
                        ctx.lineTo(particleArray[j].x, particleArray[j].y);
                        ctx.stroke();
                    }
                }

            }
        }
    }
}

function animate() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        updateParticle();
        hue += 5;
        requestAnimationFrame(animate);
    }
};

animate();