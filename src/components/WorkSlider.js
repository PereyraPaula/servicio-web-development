import './WorkCard.js';

class TrabajosSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.totalSlides = 5;
    this.intervalId = null;
    this.delay = 5000; // 5 segundo
    this.isPaused = false;
  }

  connectedCallback() {
    this.render();
    this.startAutoPlay();

    // Pausar al entrar el mouse en TODO el slider
    this.addEventListener('mouseenter', () => this.pause());
    // Reanudar al salir el mouse
    this.addEventListener('mouseleave', () => this.resume());
  }

  disconnectedCallback() {
    this.stopAutoPlay();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: var(--card-max-width, 100%);
          margin: 0 auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .slider-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }

        .slides-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .slide {
          flex: 0 0 100%;
          width: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
          /* Ocultamos las tarjetas que no están activas para no capturar eventos */
          pointer-events: none;
        }

        .slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        /* Indicadores (dots) */
        .dots-nav {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 1.5rem;
        }

        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .nav-dot:hover {
          background: #9ca3af;
        }

        .nav-dot.active {
          background: #1a1a1a;
          width: 28px;
          border-radius: 5px;
        }

        /* Barra de progreso visual (opcional, muy útil) */
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: #a3e635;
          width: 0%;
          transition: width linear;
          z-index: 10;
        }

        .progress-bar.paused {
          transition: none;
        }
      </style>

      <div class="slider-container">
        <div class="slides-track" id="track">
          ${Array.from({ length: this.totalSlides }, (_, i) => `
            <div class="slide ${i === 0 ? 'active' : ''}" data-index="${i}">
              <trabajo-card data-id="${i + 1}"></trabajo-card>
            </div>
          `).join('')}
        </div>
        <div class="progress-bar" id="progress"></div>
      </div>

      <div class="dots-nav" id="dots">
        ${Array.from({ length: this.totalSlides }, (_, i) => `
          <button class="nav-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir al slide ${i + 1}"></button>
        `).join('')}
      </div>
    `;

    this.track = this.shadowRoot.getElementById('track');
    this.progressBar = this.shadowRoot.getElementById('progress');
    this.dots = this.shadowRoot.querySelectorAll('.nav-dot');
    this.slides = this.shadowRoot.querySelectorAll('.slide');

    // Eventos de los dots
    this.dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.goToSlide(index);
      });
    });
  }

  goToSlide(index) {
    // Normalizar índice
    if (index < 0) index = this.totalSlides - 1;
    if (index >= this.totalSlides) index = 0;

    this.currentIndex = index;

    // Mover el track
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Actualizar clases activas
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.currentIndex);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });

    // Reiniciar barra de progreso
    this.resetProgress();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.resetProgress();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.delay);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pause() {
    this.isPaused = true;
    this.progressBar.classList.add('paused');
    // Congelar la barra de progreso en su estado actual
    const computedStyle = window.getComputedStyle(this.progressBar);
    const currentWidth = computedStyle.width;
    this.progressBar.style.width = currentWidth;
  }

  resume() {
    this.isPaused = false;
    this.progressBar.classList.remove('paused');
    // Reanudar la animación desde donde quedó
    const currentWidth = parseFloat(this.progressBar.style.width) || 0;
    const containerWidth = this.progressBar.parentElement.offsetWidth;
    const percentage = (currentWidth / containerWidth) * 100;
    const remainingTime = (this.delay * (100 - percentage)) / 100;

    // Reiniciar la barra desde el punto actual
    this.progressBar.style.transition = `width ${remainingTime}ms linear`;
    this.progressBar.style.width = '100%';

    // Reiniciar el intervalo para que el próximo slide sea en el tiempo restante
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.delay);
  }

  resetProgress() {
    this.progressBar.style.transition = 'none';
    this.progressBar.style.width = '0%';
    // Forzar reflow
    void this.progressBar.offsetWidth;
    this.progressBar.style.transition = `width ${this.delay}ms linear`;
    this.progressBar.style.width = '100%';
  }
}

customElements.define('trabajos-slider', TrabajosSlider);
