import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'

const dirname = import.meta.dirname;

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  root: resolve(dirname, 'src'),
  build: {
    outDir: resolve(dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(dirname, 'src/index.html'),
      },
    },
  },
});
