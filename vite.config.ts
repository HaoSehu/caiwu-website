import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 站点部署在自定义域名根路径（www.cixx.cn）。
  // 若改回 GitHub Pages 项目页（/caiwu-website/ 子路径），把这里改回子路径。
  base: '/',
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
