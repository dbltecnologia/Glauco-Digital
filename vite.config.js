import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ativacao: resolve(__dirname, 'pagina_ativacao.html'),
        forum_iphan: resolve(__dirname, 'forum_iphan_dashboard.html'),
      },
    },
  },
})
