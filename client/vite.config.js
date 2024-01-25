import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "/Users/ronaldmaharabam/Assignment/task-project/server/src/dist",
  }
})
