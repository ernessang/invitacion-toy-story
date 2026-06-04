window.addEventListener('DOMContentLoaded', () => {
    // Initialize Audio Element (Using a royalty-free instrumental placeholder)
    const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.4; // Set comfortable default volume

    const audioBtn = document.getElementById('audio-toggle');
    let isPlaying = false;

    // Audio Toggle Logic
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    audioBtn.innerHTML = '🔊';
                    audioBtn.classList.remove('animate-pulse');
                }).catch(err => console.log("Playback blocked or failed:", err));
            } else {
                bgMusic.pause();
                isPlaying = false;
                audioBtn.innerHTML = '🔇';
            }
        });
    }

    // GSAP Core Timeline Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".escenario-canvas", 
        { scale: 1.1, filter: "blur(5px)" }, 
        { scale: 1, filter: "blur(0px)", duration: 1.2 }
    );

    tl.fromTo(".cumpleanera", 
        { y: "100%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" },
        "-=0.5"
    );

    tl.fromTo(".info-tarjeta", 
        { y: "-150%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 1, ease: "bounce.out" },
        "-=0.8"
    );

    // Animate the floating audio button entrance
    tl.fromTo("#audio-toggle",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.2"
    );

    // Idle character float loop
    tl.to(".cumpleanera", {
        y: "-10px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});
