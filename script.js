// --- 1. ANIMACIÓN DEL TÍTULO (GSAP) ---
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();

    tl.to("#title-main", {
        scale: 1,
        duration: 1.2,
        ease: "bounce.out"
    })
    .to("#title-sub", {
        opacity: 1,
        y: -10,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4");
});

// --- 2. CANVAS DE NUBES EN POSICIÓN REAL ---
const canvas = document.getElementById('sky-canvas');
const ctx = canvas.getContext('2d');

let clouds = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Inicializar nubes distribuidas en el ancho real disponible
    initClouds();
}

function initClouds() {
    const w = canvas.width;
    const h = canvas.height;
    // Posiciones iniciales seguras basadas en el tamaño de tu pantalla
    clouds = [
        { x: w * 0.1, y: h * 0.15, scale: 0.6, speed: 0.3 },
        { x: w * 0.4, y: h * 0.08, scale: 0.8, speed: 0.15 },
        { x: w * 0.7, y: h * 0.22, scale: 0.5, speed: 0.4 },
        { x: w * 0.9, y: h * 0.12, scale: 0.7, speed: 0.25 }
    ];
}

window.addEventListener('resize', resizeCanvas);

// Dibujo vectorial explícito de la silueta clásica de Toy Story
function drawAndyCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // Color blanco puro con opacidad suave para el cielo
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    
    // Curvas del contorno de la nube
    ctx.arc(50, 50, 35, 0, Math.PI * 2);
    ctx.arc(95, 30, 45, 0, Math.PI * 2);
    ctx.arc(150, 45, 35, 0, Math.PI * 2);
    
    // Base plana característica de los dibujos de la película
    ctx.fillRect(50, 35, 100, 50);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Bucle de renderizado continuo
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    clouds.forEach(cloud => {
        // Movimiento constante hacia la izquierda
        cloud.x -= cloud.speed;
        
        // Reaparecer por la derecha de forma fluida si sale del margen izquierdo
        if (cloud.x < -200 * cloud.scale) {
            cloud.x = canvas.width + 100;
            cloud.y = Math.random() * (canvas.height * 0.4); // Mantenerlas en la parte superior
        }
        
        drawAndyCloud(cloud.x, cloud.y, cloud.scale);
    });
    
    requestAnimationFrame(animate);
}

// Arrancar el sistema calculando dimensiones reales primero
resizeCanvas();
animate();
