import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'https://blockchain-crowdfunding-4wah.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {}
  }
})
