window.addEventListener('DOMContentLoaded', () => {
    // 1. Línea de tiempo principal para encadenar los movimientos
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 2. Animación de entrada al cuarto (Efecto de Zoom sutil al fondo)
    tl.fromTo(".escenario-canvas", 
        { scale: 1.1, filter: "blur(5px)" }, 
        { scale: 1, filter: "blur(0px)", duration: 1.2 }
    );

    // 3. Entrada de la Cumpleañera (Aparece desde abajo con un rebote elástico)
    tl.fromTo(".cumpleanera", 
        { y: "100%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" },
        "-=0.5"
    );

    // 4. Caída de la Tarjeta de Información (Cae desde el techo rebotando)
    tl.fromTo(".info-tarjeta", 
        { y: "-150%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 1, ease: "bounce.out" },
        "-=0.8"
    );

    // 5. Animación infinita: Hace que la niña flote suavemente en su lugar
    tl.to(".cumpleanera", {
        y: "-10px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});
