import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port 3000 matches the backend's default CORS origin and the login link in approval emails.
    port: 3000,
    // Forward API calls to Spring Boot so the browser sees a single origin.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
