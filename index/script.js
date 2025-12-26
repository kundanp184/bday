const modal = document.getElementById("surpriseModal");
const btn = document.getElementById("surpriseBtn");
const span = document.getElementsByClassName("close")[0];
const explosionDiv = document.getElementById("explosion");

// Explosion images (transparent PNG URLs - direct hotlink)
const explosionImages = [
    "https://p1.hiclipart.com/preview/940/296/894/birthday-party-party-popper-birthday-christmas-cracker-drawing-fireworks-christmas-day-confetti-png-clipart.jpg",
    "https://www.kindpng.com/picc/m/116-1167613_celebration-png-exploding-party-popper-gif-transparent-png.png",
    "https://static.vecteezy.com/system/resources/previews/023/204/792/non_2x/colorful-confetti-and-tinsel-falling-shiny-confetti-and-tinsel-falling-isolated-on-a-transparent-background-festival-elements-anniversary-and-birthday-celebration-element-free-png.png",
    "https://us.123rf.com/450wm/bannosuke/bannosuke1609/bannosuke160900031/64941988-exploding-party-popper-with-confetti.jpg"
];

// Falling items (hearts + confetti)
const fallingItems = [
    "❤️", "💖", "💕", "🎉", "🎈", "✨", "🌟", "🎂", "🎁",
    "https://png.pngtree.com/png-vector/20220616/ourlarge/pngtree-vector-pink-heart-emoji-with-cute-face-in-retro-style-png-image_5097341.png" // extra shiny heart
];

btn.onclick = function() {
    modal.style.display = "flex";

    // Switch to Gallery View
document.getElementById("goToGalleryBtn").onclick = function() {
    document.getElementById("mainView").style.display = "none";
    document.getElementById("galleryView").style.display = "block";
    
    // Hearts fall in gallery too
    fallingInterval = setInterval(createFallingItem, 300);
}

// Back to Message View
document.getElementById("backToMessageBtn").onclick = function() {
    document.getElementById("galleryView").style.display = "none";
    document.getElementById("mainView").style.display = "block";
}

// Modal close होने पर falling hearts रोक दो
span.onclick = function() {
    modal.style.display = "none";
    clearInterval(fallingInterval);
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearInterval(fallingInterval);
    }
}
    const song = document.getElementById("loveSong");
    song.play().catch(error => console.log("Autoplay blocked:", error));
    
    // Continuous falling...
    fallingInterval = setInterval(createFallingItem, 300);
    // Party popper explosion!
    explosionDiv.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const img = document.createElement("img");
        img.src = explosionImages[Math.floor(Math.random() * explosionImages.length)];
        img.classList.add("explosion-img");
        img.style.left = Math.random() * 80 + 10 + "%";
        img.style.top = "50%";
        img.style.animationDelay = i * 0.1 + "s";
        explosionDiv.appendChild(img);
    }
    
    // Start continuous falling hearts & confetti only in modal
    fallingInterval = setInterval(createFallingItem, 300);
}

span.onclick = function() {
    modal.style.display = "none";
    clearInterval(fallingInterval);
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearInterval(fallingInterval);
    }
}

let fallingInterval;

// Create falling hearts/confetti
function createFallingItem() {
    if (modal.style.display !== "flex") return;
    
    const item = document.createElement("div");
    const content = fallingItems[Math.floor(Math.random() * fallingItems.length)];
    
    if (content.includes("http")) {
        const img = document.createElement("img");
        img.src = content;
        img.style.width = "50px";
        item.appendChild(img);
    } else {
        item.innerHTML = content;
        item.style.fontSize = (Math.random() * 20 + 30) + "px";
    }
    
    item.classList.add("falling");
    item.style.left = Math.random() * 100 + "vw";
    item.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.querySelector(".modal-content").appendChild(item);
    
    setTimeout(() => item.remove(), 10000);
}

// Whole page light falling hearts (पुराना वाला रखा है)
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = "30px";
    heart.style.animation = "fall-linear 8s linear";
    heart.style.pointerEvents = "none";
    heart.style.opacity = "0.6";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 800); // थोड़ा slow किया ताकि heavy न लगे

var animateButton = function(e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};
var classname = document.getElementsByClassName("bubbly-button");
for (var i = 0; i < classname.length; i++) {
  classname[i].addEventListener('click', animateButton, false);
  
}

const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

class Particle {
    constructor(x, y, vx = 0, vy = 0, isExplosion = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 8 + 5;
        this.color = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff0000', '#ffd700'][Math.floor(Math.random() * 5)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.1 - 0.05;
        this.gravity = 0.15;
        this.life = isExplosion ? 150 : 300;
        this.isHeart = Math.random() > 0.3; // Zyadatar hearts
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        if (this.isHeart) {
            // Heart shape
            ctx.beginPath();
            ctx.moveTo(0, this.size / 4);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, -this.size / 4, 0, this.size / 2);
            ctx.bezierCurveTo(this.size, -this.size / 4, this.size / 2, -this.size / 2, 0, this.size / 4);
            ctx.fill();
        } else {
            // Circle confetti
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.life--;
    }
}

function createExplosion(x, y) {
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        particles.push(new Particle(
            x,
            y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed - 5,
            true
        ));
    }
}

function createFallingConfetti() {
    if (Math.random() < 0.3) {
        const x = Math.random() * canvas.width;
        particles.push(new Particle(x, -20, (Math.random() - 0.5) * 2, Math.random() * 2 + 1));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createFallingConfetti();

    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

document.body.addEventListener('click', (e) => {
    createExplosion(e.clientX, e.clientY);
});

animate(); // Animation start