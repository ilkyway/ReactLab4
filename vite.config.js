import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-blurhash', 'blurhash'],
  },
  server: {
    allowedHosts: [
      '207.244.199.103',
      'localhost',
      '127.0.0.1'
    ]
  }
})
