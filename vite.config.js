import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a relative base so built assets load correctly when previewing from the `dist` folder
export default defineConfig({
  plugins: [react()],
  base: './'
})
