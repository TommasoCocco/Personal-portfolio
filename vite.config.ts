import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://github.com/TommasoCocco/portfolio.github.io.git', // Sostituisci 'repository-name' con il nome del tuo repository GitHub
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias per la cartella src
    },
  },
})
