import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration is typed through defineConfig.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
