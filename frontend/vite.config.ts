import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://api:8000", // 在同一 docker network 中
        changeOrigin: true,
      },
    },
  },
})
