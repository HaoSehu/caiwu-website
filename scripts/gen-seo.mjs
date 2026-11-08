// 构建后生成 sitemap.xml 与 robots.txt。
// 站点是 History 路由（无 #），每个路由都要能被直接访问与收录。
import fs from 'node:fs'
import path from 'node:path'

const ORIGIN = 'https://www.cixx.cn'
const DIST = path.resolve('dist')

// 与 src/router.ts 保持一致；新增页面时在这里补一条。
const routes = [
  ['/', '1.0', 'weekly'],
  ['/features', '0.9', 'monthly'],
  ['/architecture', '0.9', 'monthly'],
  ['/userguide', '0.8', 'monthly'],
  ['/userguide/start', '0.7', 'monthly'],
  ['/userguide/catalog', '0.7', 'monthly'],
  ['/userguide/order', '0.7', 'monthly'],
  ['/userguide/finance', '0.7', 'monthly'],
  ['/userguide/service', '0.7', 'monthly'],
  ['/userguide/marketing', '0.7', 'monthly'],
  ['/userguide/site', '0.7', 'monthly'],
  ['/userguide/system', '0.7', 'monthly'],
  ['/userguide/logs', '0.7', 'monthly'],
  ['/userguide/faq', '0.7', 'monthly'],
  ['/devguide', '0.8', 'monthly'],
  ['/devguide/quickstart', '0.7', 'monthly'],
  ['/devguide/backend', '0.7', 'monthly'],
  ['/devguide/api', '0.7', 'monthly'],
  ['/devguide/frontend', '0.7', 'monthly'],
  ['/devguide/plugin', '0.7', 'monthly'],
  ['/devguide/payment', '0.7', 'monthly'],
  ['/devguide/mail', '0.6', 'monthly'],
  ['/devguide/sms', '0.6', 'monthly'],
  ['/devguide/captcha', '0.6', 'monthly'],
  ['/devguide/hook', '0.6', 'monthly'],
  ['/devguide/storage', '0.6', 'monthly'],
  ['/devguide/module', '0.6', 'monthly'],
  ['/devguide/standards', '0.6', 'monthly'],
  ['/devguide/database', '0.6', 'monthly'],
  ['/devguide/deploy', '0.6', 'monthly'],
  ['/devguide/verify', '0.6', 'monthly'],
  ['/install', '0.8', 'monthly'],
  ['/install/requirements', '0.7', 'monthly'],
  ['/install/sites', '0.7', 'monthly'],
  ['/install/backend', '0.7', 'monthly'],
  ['/install/frontend', '0.7', 'monthly'],
  ['/install/schedule', '0.7', 'monthly'],
  ['/install/firstrun', '0.7', 'monthly'],
  ['/install/troubleshoot', '0.6', 'monthly'],
  ['/install/checklist', '0.6', 'monthly'],
  ['/beginner', '0.8', 'monthly'],
  ['/beginner/onboarding', '0.7', 'monthly'],
  ['/beginner/settings', '0.7', 'monthly'],
  ['/beginner/daily', '0.7', 'monthly'],
  ['/demo', '0.6', 'monthly'],
  ['/compare', '0.6', 'monthly'],
  ['/scenarios', '0.6', 'monthly'],
  ['/start', '0.6', 'monthly'],
]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ([loc, priority, changefreq]) => `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml)
fs.writeFileSync(path.join(DIST, 'robots.txt'), robots)
console.log(`sitemap.xml: ${routes.length} 条路由`)
