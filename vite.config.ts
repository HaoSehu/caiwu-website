import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5190,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
})
