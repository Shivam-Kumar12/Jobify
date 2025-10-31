import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Proxy all /api requests to the backend server.
        // Keep the /api prefix so backend routes like /api/v1/* match directly.
        target: "http://localhost:5100",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
