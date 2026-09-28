import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  root: resolve(projectDir, 'src'),
  publicDir: resolve(projectDir, 'public'),

  build: {
    minify: 'esbuild',
    cssMinify: 'esbuild',
    outDir: resolve(projectDir, 'dist'),
    emptyOutDir: true,
  },
})
