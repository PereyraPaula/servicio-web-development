# Service Web Development

Sitio web corporativo desarrollado con **Vite** y **Vanilla JavaScript**, diseñado para presentar y ofrecer servicios de desarrollo web a pequeñas y medianas empresas (PYMEs).

---

## 📋 Descripción

Este proyecto es una página web estática y ligera cuyo objetivo es promocionar servicios de creación de sitios web para pequeñas y medianas empresas. Está construido con tecnologías modernas enfocadas en el rendimiento, la simplicidad y una experiencia de usuario fluida.

## ✨ Características

- ⚡ **Vite** como bundler y servidor de desarrollo (HMR ultrarrápido)
- 🎨 **Tailwind CSS v4** integrado vía `@tailwindcss/vite`
- 🟨 **Vanilla JavaScript** — sin frameworks, máxima ligereza
- 📦 Build optimizado con minificación `esbuild` (JS y CSS)
- 📁 Estructura clara: código fuente en `src/`, assets estáticos en `public/`
- 🌐 Salida de producción autocontenida en `dist/`

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión / Rol |
|------------|---------------|
| [Vite](https://vitejs.dev/) | Bundler y dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Framework de utilidades CSS (v4) |
| JavaScript (ES Modules) | Lógica del cliente |
| Node.js | Entorno de desarrollo |

## 📂 Estructura del proyecto

```
service-web-development/
├── public/              # Assets estáticos (favicon, imágenes, etc.)
├── src/                 # Código fuente
│   ├── index.html       # Punto de entrada HTML
│   ├── main.js          # JavaScript principal
│   └── styles.css       # Estilos + directivas Tailwind
├── dist/                # Salida de producción (generada)
├── vite.config.js       # Configuración de Vite
├── package.json
└── README.md
```

> La raíz del proyecto en Vite está configurada en `src/`, por lo que `index.html` debe residir ahí.

## 🚀 Requisitos previos

- **Node.js** ≥ 24
- **pnpm**: 11.24.0 (o npm / yarn)

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/PereyraPaula/servicio-web-development.git
cd service-web-development

# Instalar dependencias
pnpm install
```

## 💻 Desarrollo

Inicia el servidor de desarrollo con recarga en caliente:

```bash
pnpm run dev
```

Por defecto estará disponible en `http://localhost:5173`.

## 🏗️ Build de producción

Genera los archivos optimizados en `dist/`:

```bash
pnpm run build
```

## 👀 Previsualizar el build

Sirve localmente el resultado de producción:

```bash
pnpm run preview
```

## 🧩 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Inicia el servidor de desarrollo |
| `pnpm run build` | Compila para producción |
| `pnpm run preview` | Previsualiza el build de producción |

## 🎨 Personalización

- **Colores y tema:** ajusta el tema en `src/styles.css` (Tailwind v4 se configura desde CSS).
- **Contenido:** edita `src/index.html` y los componentes en `src/`.
- **Configuración de Vite:** modifica `vite.config.js` para cambiar rutas, plugins u opciones de build.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Abre un *issue* o envía un *pull request* con mejoras, correcciones o nuevas ideas.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

Hecho con ❤️ para PYMEs que quieren dar el salto al mundo digital.
