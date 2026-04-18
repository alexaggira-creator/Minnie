document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    const startBtn = document.getElementById('start-btn');
    
    // Función para animaciones al hacer scroll (Mejorada para confiabilidad)
    const initScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        if (!('IntersectionObserver' in window)) {
            reveals.forEach(r => r.classList.add('active'));
            return;
        }

        const observerOptions = {
            threshold: 0.05, // Más sensible para móviles
            rootMargin: "0px 0px -20px 0px"
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });

        // Fail-safe: Si después de 3 segundos algo sigue oculto, mostrarlo
        setTimeout(() => {
            reveals.forEach(r => r.classList.add('active'));
        }, 3000);
    };

    // Música
    const musicPlayer = document.getElementById('music-player');
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    // Manejar el inicio de la invitación
    startBtn.addEventListener('click', () => {
        const preIntroVideo = document.getElementById('pre-intro-video');
        
        introOverlay.style.opacity = '0';
        introOverlay.style.pointerEvents = 'none';
        setTimeout(() => {
            if (preIntroVideo) preIntroVideo.pause();
            introOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Mostrar reproductor y empezar música
            if (musicPlayer) musicPlayer.classList.remove('hidden');
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Music error:", e));
                musicBtn.classList.add('playing');
            }

            // Reproducir video inmersivo del inicio
            if (introVideo) {
                introVideo.currentTime = 0;
                introVideo.play().catch(e => console.log("Bg error:", e));
            }
            
            // Activar animaciones con un leve delay para asegurar renderizado
            setTimeout(initScrollReveal, 100);
            window.scrollTo(0, 0);
        }, 800);
    });

    // Toggle de música
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.classList.add('playing');
                musicBtn.classList.remove('muted');
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                musicBtn.classList.add('muted');
            }
        });
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
