document.addEventListener('DOMContentLoaded', () => {
    const cloudsContainer = document.getElementById('env-clouds');
    const starsContainer = document.getElementById('env-stars');
    const dustContainer = document.getElementById('env-dust');

    // Generar nubes
    for (let i = 0; i < 5; i++) {
        let cloud = document.createElement('div');
        cloud.className = 'cloud-particle';
        cloud.style.top = `${Math.random() * 60 + 5}%`;
        cloud.style.animationDuration = `${Math.random() * 15 + 20}s`;
        cloud.style.animationDelay = `${Math.random() * 10}s`;
        cloud.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        cloudsContainer.appendChild(cloud);
    }

    // Generar estrellas
    for (let i = 0; i < 35; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }

    // Generar polvo desértico
    for (let i = 0; i < 20; i++) {
        let dust = document.createElement('div');
        dust.className = 'dust';
        let size = Math.random() * 4 + 2; 
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.animationDuration = `${Math.random() * 4 + 3}s`;
        dust.style.animationDelay = `${Math.random() * 5}s`;
        dustContainer.appendChild(dust);
    }

    // --- MANIPULACIÓN DEL DOM EN EL SCROLL ---
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const masterBg = document.getElementById('master-bg');
        if (masterBg) {
            masterBg.style.backgroundPosition = `center ${scrollPercent}%`;
        }

        const s1 = document.getElementById('scene-1');
        const s2 = document.getElementById('scene-2');
        const s3 = document.getElementById('scene-3');
        const s4 = document.getElementById('scene-4');
        const s5 = document.getElementById('scene-5');

        if (scrollPercent >= 0 && scrollPercent < 18) {
            setActiveScene(s1, [s2, s3, s4, s5]);
            setEnvOpacity(1, 0, 0);
        } else if (scrollPercent >= 18 && scrollPercent < 45) {
            setActiveScene(s2, [s1, s3, s4, s5]);
            setEnvOpacity(1, 0, 0);
        } else if (scrollPercent >= 45 && scrollPercent < 72) {
            setActiveScene(s3, [s1, s2, s4, s5]);
            setEnvOpacity(0, 1, 0);
        } else if (scrollPercent >= 72 && scrollPercent < 90) {
            setActiveScene(s4, [s1, s2, s3, s5]);
            setEnvOpacity(0, 0, 1);
        } else if (scrollPercent >= 90) {
            setActiveScene(s5, [s1, s2, s3, s4]);
            setEnvOpacity(0, 0, 0.7);
        }
    });

    function setActiveScene(activeElement, inactiveElements) {
        if (activeElement) activeElement.classList.add('active');
        inactiveElements.forEach(el => {
            if (el) el.classList.remove('active');
        });
    }

    function setEnvOpacity(clouds, stars, dust) {
        if (cloudsContainer) cloudsContainer.style.opacity = clouds;
        if (starsContainer) starsContainer.style.opacity = stars;
        if (dustContainer) dustContainer.style.opacity = dust;
    }
});
