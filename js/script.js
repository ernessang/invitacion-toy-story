document.addEventListener('DOMContentLoaded', () => {
    const cloudsContainer = document.getElementById('env-clouds');
    const starsContainer = document.getElementById('env-stars');
    const dustContainer = document.getElementById('env-dust');

    // Generador de partículas ambientales
    for (let i = 0; i < 5; i++) {
        let cloud = document.createElement('div');
        cloud.className = 'cloud-particle';
        cloud.style.top = `${Math.random() * 60 + 5}%`;
        cloud.style.animationDuration = `${Math.random() * 15 + 20}s`;
        cloud.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        cloudsContainer.appendChild(cloud);
    }
    for (let i = 0; i < 35; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
    }
    for (let i = 0; i < 20; i++) {
        let dust = document.createElement('div');
        dust.className = 'dust';
        let size = Math.random() * 4 + 2; 
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.animationDuration = `${Math.random() * 4 + 3}s`;
        dustContainer.appendChild(dust);
    }

    // --- CÁLCULO PARALLAX DEL SCROLL ---
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const masterBg = document.getElementById('master-bg');
        if (masterBg) masterBg.style.backgroundPosition = `center ${scrollPercent}%`;

        // Captura de juguetes por ID
        const logo = document.getElementById('main-logo');
        const woody = document.getElementById('col-woody');
        const pelota = document.getElementById('col-pelota');
        const potato = document.getElementById('col-potato');
        
        const buzz = document.getElementById('col-buzz');
        const control = document.getElementById('col-control');
        const aliens = document.getElementById('col-aliens');

        const bullseye = document.getElementById('col-bullseye');
        const cactus = document.getElementById('col-cactus');
        const jessie = document.getElementById('col-jessie');

        const rex = document.getElementById('col-rex');
        const hamm = document.getElementById('col-hamm');

        const s1 = document.getElementById('scene-1');
        const s2 = document.getElementById('scene-2');
        const s3 = document.getElementById('scene-3');
        const s4 = document.getElementById('scene-4');
        const s5 = document.getElementById('scene-5');

        if (logo) {
            logo.style.transform = `scale(${1 + scrollPercent * 0.012}) translateY(${scrollTop * 0.15}px)`;
        }

        // CONTROL CINEMATOGRÁFICO DE ENTRADAS Y SALIDAS
        if (scrollPercent >= 0 && scrollPercent < 18) {
            setActiveScene(s1, [s2, s3, s4, s5]);
            setEnvOpacity(1, 0, 0);
            manageGroupVisibility([woody, pelota, potato, buzz, control, aliens, bullseye, cactus, jessie, rex, hamm], false);
        } 
        else if (scrollPercent >= 18 && scrollPercent < 45) {
            setActiveScene(s2, [s1, s3, s4, s5]);
            setEnvOpacity(1, 0, 0);
            
            manageGroupVisibility([woody, pelota, potato], true);
            manageGroupVisibility([buzz, control, aliens, bullseye, cactus, jessie, rex, hamm], false);

            const rel2 = scrollPercent - 30;
            if(woody) woody.style.transform = `translateY(${rel2 * -4}px) rotate(${rel2 * 0.15}deg)`;
            if(pelota) pelota.style.transform = `translateX(${rel2 * 3}px) rotate(${rel2 * 8}deg)`;
            if(potato) potato.style.transform = `translateY(${rel2 * -2}px) scale(${1 + rel2 * 0.005})`;
        } 
        else if (scrollPercent >= 45 && scrollPercent < 72) {
            setActiveScene(s3, [s1, s2, s4, s5]);
            setEnvOpacity(0, 1, 0);
            
            manageGroupVisibility([woody, pelota, potato, bullseye, cactus, jessie, rex, hamm], false);
            manageGroupVisibility([buzz, control, aliens], true);

            const rel3 = scrollPercent - 55;
            if(buzz) buzz.style.transform = `translateY(${rel3 * -6}px) translateX(${rel3 * -3}px)`;
            if(control) control.style.transform = `translateY(${rel3 * 2}px) rotate(${rel3 * -5}deg)`;
            if(aliens) aliens.style.transform = `translateY(${rel3 * -3}px) scale(${1 + rel3 * 0.008})`;
        } 
        else if (scrollPercent >= 72 && scrollPercent < 90) {
            setActiveScene(s4, [s1, s2, s3, s5]);
            setEnvOpacity(0, 0, 1);
            
            manageGroupVisibility([woody, pelota, potato, buzz, control, aliens, rex, hamm], false);
            manageGroupVisibility([bullseye, cactus, jessie], true);

            const rel4 = scrollPercent - 80;
            if(bullseye) bullseye.style.transform = `translateY(${rel4 * -4}px) scaleX(-1)`;
            if(cactus) cactus.style.transform = `translateY(${rel4 * -1.5}px)`;
            if(jessie) jessie.style.transform = `translateY(${rel4 * -5}px) rotate(${rel4 * -0.2}deg)`;
        } 
        else if (scrollPercent >= 90) {
            setActiveScene(s5, [s1, s2, s3, s4]);
            setEnvOpacity(0, 0, 0.7);
            
            manageGroupVisibility([woody, pelota, potato, buzz, control, aliens, bullseye, cactus, jessie], false);
            manageGroupVisibility([rex, hamm], true);

            const rel5 = scrollPercent - 95;
            if(rex) rex.style.transform = `scaleX(-1) translateY(${rel5 * -3}px)`;
            if(hamm) hamm.style.transform = `translateY(${rel5 * -4}px) rotate(${rel5 * 0.5}deg)`;
        }
    });

    function setActiveScene(activeElement, inactiveElements) {
        if (activeElement) activeElement.classList.add('active');
        inactiveElements.forEach(el => {
            if (el) el.classList.remove('active');
        });
    }

    function manageGroupVisibility(elementsArray, show) {
        elementsArray.forEach(el => {
            if (el) {
                if (show) {
                    el.style.display = 'block';
                    setTimeout(() => { el.style.opacity = 1; }, 10);
                } else {
                    el.style.opacity = 0;
                    el.style.display = 'none';
                }
            }
        });
    }

    function setEnvOpacity(clouds, stars, dust) {
        if (cloudsContainer) cloudsContainer.style.opacity = clouds;
        if (starsContainer) starsContainer.style.opacity = stars;
        if (dustContainer) dustContainer.style.opacity = dust;
    }
});
