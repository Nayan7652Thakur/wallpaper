import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist'  // Explicitly define the output directory
  },
  plugins: [react()],
})
