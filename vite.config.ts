import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind is used by exactly one brand (Brilliant Brains) and is scoped to
  // it — see src/brilliant-brains.css.
  plugins: [react(), tailwindcss()],
})
