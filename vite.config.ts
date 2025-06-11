import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // importante per il deploy relativo
  build: {
    assetsDir: '', // non usare la cartella 'assets', tutti i file sono direttamente dentro dist/
    rollupOptions: {
      output: {
        entryFileNames: '[name].js', // nomi dei file JS senza hash
        chunkFileNames: '[name].js', // nomi dei file chunk senza hash
        assetFileNames: '[name][extname]' // nomi di tutti gli asset (CSS, immagini, font) senza hash
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
