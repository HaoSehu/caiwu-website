import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 部署在 GitHub Pages 的项目子路径下；换成自定义域名时改为 '/'。
  base: process.env.BASE_PATH ?? '/caiwu-website/',
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
