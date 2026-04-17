document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const videoBg = document.getElementById('video-bg');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const startBtn = document.getElementById('start-btn');
    
    // Manejar el inicio de la invitación
    startBtn.addEventListener('click', () => {
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            videoBg.classList.remove('hidden');
            mainContent.classList.remove('hidden');
            
            // Reproducir video como fondo loop con sonido tras la interacción
            introVideo.play().catch(e => {
                console.log("Error al reproducir video:", e);
            });
            window.scrollTo(0, 0);
        }, 800);
    });

    // Cuenta regresiva
    const targetDate = new Date('April 25, 2026 16:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const d = document.getElementById('days');
            const h = document.getElementById('hours');
            const m = document.getElementById('minutes');
            const s = document.getElementById('seconds');
            
            if (d) d.innerText = days.toString().padStart(2, '0');
            if (h) h.innerText = hours.toString().padStart(2, '0');
            if (m) m.innerText = minutes.toString().padStart(2, '0');
            if (s) s.innerText = seconds.toString().padStart(2, '0');
        } else {
            const timerEl = document.getElementById('timer');
            if (timerEl) timerEl.innerHTML = "<h3>¡Es hoy!</h3>";
        }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
});
