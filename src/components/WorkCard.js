import { trabajos } from '../trabajos.js';

class TrabajoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const id = parseInt(this.getAttribute('data-id'));
    const trabajo = trabajos.find(t => t.id === id);

    if (!trabajo) {
      this.shadowRoot.innerHTML = `<p>Error: Trabajo no encontrado.</p>`;
      return;
    }

    this.render(trabajo);
  }

  getColorStatus(state) {
    if (state === 'Sitio en producción') return "green";
    if (state === 'Sitio renovado') return "yellow";
    return "red";
  }

  render(trabajo) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          /* Por defecto ocupa el 100% del padre.
             Si se quiere limitar, se pasa --card-max-width desde fuera. */
          max-width: var(--card-max-width, 100%);
          margin-inline: auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          --color-bg: #f8f9fa;
          --color-text: #1a1a1a;
          --color-text-light: #555;
          --color-border: #e9ecef;
          --color-tag-bg: #1a1a1a;
          --color-tag-text: #ffffff;
          --color-green: #33bf26;
          --color-red: #ef4444;
          --color-yellow: #d8eb34;
          --color-blue: #3b82f6;
          --radius: 16px;
          --shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .card {
          background: #ffffff;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 60%;
          gap: 2rem;
          padding: 2.5rem;
          align-items: center;
          /* Ocupa el 100% del :host, que a su vez es el 100% del padre */
          width: 100%;
        }

        /* --- Columna Izquierda (Texto) --- */
        .info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-width: 0; /* Evita desbordes por textos largos */
        }

        .header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .badge {
          background: #1a1a1a;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
        }

        .categoria {
          font-size: 0.8rem;
          color: var(--color-text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        h2 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-text);
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .bloque {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 8px;
          background: #fff;
          border-left: 4px solid transparent;
        }

        .bloque.desafio { border-left-color: var(--color-red); }
        .bloque.solucion { border-left-color: var(--color-blue); }
        .bloque.resultado { border-left-color: var(--color-green); }

        .bloque h3 {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .bloque p {
          font-size: 0.95rem;
          color: var(--color-text-light);
          line-height: 1.6;
        }

        /* --- Columna Derecha (Navegador + Imagen) --- */
        .preview-wrapper {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          background: #fff;
          height: 100%;
          max-height: 645px;
          min-width: 0; /* Evita desbordes */
        }

        .browser-bar {
          background: #f1f3f5;
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
        }

        .dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #d1d5db;
        }

        .url {
          font-size: 0.75rem;
          color: #212a3d;
          background: #fff;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          flex-grow: 1;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .url a {
          color: inherit;
          text-decoration: none;
        }

        .lighthouse-tag {
          background: var(--color-green);
          color: #000;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .image-container {
          position: relative;
          flex-grow: 1;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 0;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .status-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.85);
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(4px);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-dot.green  { background: var(--color-green); }
        .status-dot.yellow { background: var(--color-yellow); }
        .status-dot.red    { background: var(--color-red); }

        /* --- Responsive --- */
        @media (max-width: 900px) {
          .card {
            grid-template-columns: 1fr;
            padding: 1.5rem;
            gap: 1.5rem;
          }
          h2 {
            font-size: 1.6rem;
          }
          .preview-wrapper {
            height: auto;
            aspect-ratio: 16 / 9;
          }
        }
      </style>

      <article class="card">
        <!-- Columna Izquierda: Información -->
        <div class="info">
          <div class="header">
            <span class="badge">Trabajo</span>
            <span class="categoria">${trabajo.categoria}</span>
          </div>

          <h2>${trabajo.titulo}</h2>

          <div class="bloque desafio">
            <h3>🔴 El desafío:</h3>
            <p>${trabajo.desafio}</p>
          </div>

          <div class="bloque solucion">
            <h3>🔵 La solución:</h3>
            <p>${trabajo.solucion}</p>
          </div>

          <div class="bloque resultado">
            <h3>🟢 El resultado:</h3>
            <p>${trabajo.resultado}</p>
          </div>
        </div>

        <!-- Columna Derecha: Navegador + Imagen -->
        <div class="preview-wrapper">
          <div class="browser-bar">
            <div class="dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            ${trabajo.url ? `<div class="url"><a target="_blank" rel="noopener noreferrer" href="${trabajo.url}">${trabajo.url}</a></div>` : ''}
          </div>
          <div class="image-container">
            <img src="${trabajo.imagen}" alt="Vista previa de ${trabajo.titulo}" loading="lazy">
            <div class="status-badge">
              <span class="status-dot ${this.getColorStatus(trabajo.estado)}"></span>
              ${trabajo.estado}
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

customElements.define('trabajo-card', TrabajoCard);
