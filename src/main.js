import "./components/MetricCard.js"
import "./components/WorkSlider.js"

const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

const form = document.querySelector('#formulario-presupuesto');
const WORKER_URL = "https://dry-recipe-6139.paulapereyrallorens.workers.dev/";

/**
 * Muestra un mensaje de estado debajo del formulario.
 * @param {string} text - Texto a mostrar
 * @param {"success"|"error"|"info"} tipo - Tipo de mensaje
 */
const addTextAlert = (text, tipo = "info") => {
  const messageForm = document.querySelector('#message-form');
  if (!messageForm) return;

  // Limpiamos mensajes anteriores para no acumular
  messageForm.innerHTML = "";

  const p = document.createElement("p");
  p.textContent = text;
  p.classList.add("form-message", `form-message--${tipo}`);
  messageForm.appendChild(p);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // --- 1. Recolectar datos del formulario ---
  const formData = new FormData(form);
  const datos = {};

  formData.forEach((valor, campo) => {
    if (datos[campo] !== undefined) {
      if (!Array.isArray(datos[campo])) {
        datos[campo] = [datos[campo]];
      }
      datos[campo].push(valor);
    } else {
      datos[campo] = valor;
    }
  });

  // --- 2. Deshabilitar botón + feedback visual ---
  const boton = form.querySelector('button[type="submit"]');
  const textoOriginal = boton ? boton.textContent : "";
  if (boton) {
    boton.disabled = true;
    boton.textContent = "Enviando...";
  }

  // Mensaje temporal de "enviando..."
  addTextAlert("Enviando...", "info");

  // --- 3. Enviar al Worker ---
  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const result = await response.json();

    if (result.ok) {
      addTextAlert("¡Presupuesto enviado con éxito!", "success");
      form.reset();
    } else {
      console.error(
        "Hubo un error: " + (result.error || "Error desconocido"),
        "error"
      );
    }

  } catch (error) {
    console.error("Error de red:", error);
    console.error(
      "Error de conexión con el servidor. Por favor, intentá de nuevo.",
      "error"
    );

  } finally {
    // --- 4. Restaurar botón ---
    if (boton) {
      boton.disabled = false;
      boton.textContent = textoOriginal;
    }
  }
});
