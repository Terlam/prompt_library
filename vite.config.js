import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages uses repo name as path. Set VITE_BASE_PATH in CI to e.g. /prompt_library/
  base: process.env.VITE_BASE_PATH || '/',
})
