class MetricsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._primaryColor = '#2e7d32'; // Valor por defecto
  }

  static get observedAttributes() {
    return ['primary-color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'primary-color' && oldValue !== newValue) {
      this._primaryColor = newValue;
      this.updateStyles();
    }
  }

  get primaryColor() {
    return this._primaryColor;
  }

  set primaryColor(value) {
    this._primaryColor = value;
    this.setAttribute('primary-color', value);
    this.updateStyles();
  }

  updateStyles() {
    const styleElement = this.shadowRoot.querySelector('style');
    if (styleElement) {
      styleElement.textContent = `
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 100%;
          max-width: 600px;
          --primary-color: ${this._primaryColor};
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 1rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .browser-dots {
          display: flex;
          gap: 6px;
        }

        .browser-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .browser-dot.red {
          background-color: #ff5252;
        }

        .browser-dot.gray {
          background-color: #9e9e9e;
        }

        .browser-dot.light-green {
          background-color: #a5d6a7;
        }

        .status-text {
          font-size: 14px;
          color: #757575;
        }

        .live-badge {
          background-color: #cddc39;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        .metrics-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 0 1rem 1rem 1rem;
        }

        .metric-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #f5f5f5;
          border-radius: 8px;
        }

        .metric-title {
          font-size: 14px;
          color: #757575;
        }

        .metric-value {
          font-size: 24px;
          font-weight: bold;
          color: var(--primary-color);
        }

        .metric-subtitle {
          font-size: 12px;
          color: #757575;
        }

        .progress-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: conic-gradient(
            var(--primary-color) 0% 99%,
            #f5f5f5 99% 100%
          );
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--primary-color);
          font-weight: bold;
          font-size: 24px;
          position: relative;
        }

        .progress-circle::before {
          content: "";
          width: 60px;
          height: 60px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
        }

        .core-web-vitals {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .core-web-vitals-icon {
          width: 20px;
          height: 20px;
          background-color: var(--primary-color);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 12px;
        }

        .approved-badge {
          background-color: #a5d6a7;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        @media (max-width: 439px) {
          .progress-circle {
            display: none;
          }
          .metric-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `;
    }
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style></style>
      <div class="header">
        <div class="status-indicator">
          <div class="browser-dots">
            <div class="browser-dot red"></div>
            <div class="browser-dot gray"></div>
            <div class="browser-dot light-green"></div>
          </div>
          <span class="status-text">auditoria-sitio.dev/live-status</span>
        </div>
        <div class="live-badge">EN VIVO</div>
      </div>

      <div class="metrics-section">
        <div class="metric-card">
          <div>
            <div class="metric-title">GOOGLE PAGESPEED INSIGHTS</div>
            <div class="metric-value">99<span style="font-size: 16px; color: #757575;">/100</span></div>
            <div class="metric-subtitle">Clasificación de Rendimiento: Bueno</div>
          </div>
          <div class="progress-circle">99%</div>
        </div>

        <div style="display: flex; gap: 15px;">
          <div class="metric-card" style="flex: 1;">
            <div>
              <div class="metric-title">Velocidad Carga</div>
              <div class="metric-value">0.8 seg</div>
              <div class="metric-subtitle">LCP óptimo</div>
            </div>
          </div>
          <div class="metric-card" style="flex: 1;">
            <div>
              <div class="metric-title">Índice SEO</div>
              <div class="metric-value">100 %</div>
              <div class="metric-subtitle">Indexabilidad 100%</div>
            </div>
          </div>
        </div>

        <div class="metric-card core-web-vitals">
          <div class="core-web-vitals-icon">✓</div>
          <span class="metric-title">Core Web Vitals de Google</span>
          <div class="approved-badge">APROBADO</div>
        </div>
      </div>
    `;
    this.updateStyles(); // Actualizar estilos DESPUÉS de definir el HTML
  }
}

customElements.define('metrics-card', MetricsCard);
