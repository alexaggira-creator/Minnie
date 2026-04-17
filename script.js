document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const videoContainer = document.getElementById('video-container');
    const introVideo = document.getElementById('intro-video');
    const skipBtn = document.getElementById('skip-video');
    const mainContent = document.getElementById('main-content');
    const startBtn = document.getElementById('start-btn');
    
    // Manejar el inicio de la invitación (Click en el botón del sobre)
    startBtn.addEventListener('click', () => {
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            videoContainer.classList.remove('hidden');
            introVideo.play().catch(e => {
                console.log("Error al reproducir video:", e);
                showMainContent(); // Fallback si falla
            });
        }, 800);
    });

    // Cuando el video termina
    introVideo.onended = () => {
        showMainContent();
    };

    // Botón de saltar video
    skipBtn.addEventListener('click', () => {
        introVideo.pause();
        showMainContent();
    });

    function showMainContent() {
        videoContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

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

            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        } else {
            const timerEl = document.getElementById('timer');
            if (timerEl) timerEl.innerHTML = "<h3>¡Es hoy!</h3>";
        }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
});
