const { chromium } = require('E:/caiwu/node_modules/playwright');

const jobs = [
  // [输出名, 地址, 页面内额外等待ms, 是否整页]
  ['admin-dashboard', 'http://127.0.0.1:4391/admin/dashboard', 2200, false],
  ['admin-products', 'http://127.0.0.1:4391/admin/products', 2000, false],
  ['admin-product-suppliers', 'http://127.0.0.1:4391/admin/products/suppliers', 2000, false],
  ['admin-users', 'http://127.0.0.1:4391/admin/users', 2000, false],
  ['admin-services', 'http://127.0.0.1:4391/admin/services', 2000, false],
  ['admin-tickets', 'http://127.0.0.1:4391/admin/tickets', 2000, false],
  ['admin-orders', 'http://127.0.0.1:4391/admin/finance/orders', 2400, false],
  ['admin-invoices', 'http://127.0.0.1:4391/admin/finance/invoices', 2400, false],
  ['admin-recharges', 'http://127.0.0.1:4391/admin/finance/recharges', 2400, false],
  ['admin-coupons', 'http://127.0.0.1:4391/admin/coupons', 2000, false],
  ['admin-referral', 'http://127.0.0.1:4391/admin/referral', 2000, false],
  ['admin-site-info', 'http://127.0.0.1:4391/admin/site-info', 2200, false],
  ['admin-site-hero', 'http://127.0.0.1:4391/admin/site-hero', 2200, false],
  ['admin-notices', 'http://127.0.0.1:4391/admin/content/notices', 2200, false],
  ['admin-media', 'http://127.0.0.1:4391/admin/content/media-library', 2200, false],
  ['admin-plugins-payment', 'http://127.0.0.1:4391/admin/integration-plugins/payment', 2200, false],
  ['admin-plugins-sms', 'http://127.0.0.1:4391/admin/integration-plugins/sms', 2200, false],
  ['admin-plugins-mail', 'http://127.0.0.1:4391/admin/integration-plugins/mail', 2200, false],
  ['admin-plugins-captcha', 'http://127.0.0.1:4391/admin/integration-plugins/captcha', 2200, false],
  ['admin-staff', 'http://127.0.0.1:4391/admin/system/staff', 2000, false],
  ['admin-roles', 'http://127.0.0.1:4391/admin/system/roles', 2000, false],
  ['admin-account-policy', 'http://127.0.0.1:4391/admin/account-policy', 2000, false],
  ['admin-automation', 'http://127.0.0.1:4391/admin/automation', 2000, false],
  ['admin-logs-schedules', 'http://127.0.0.1:4391/admin/logs/schedules', 2200, false],
  ['admin-logs-gateway', 'http://127.0.0.1:4391/admin/logs/gateway', 2200, false],
  ['admin-specs', 'http://127.0.0.1:4391/admin/specs', 2000, false],
  ['admin-cpu-models', 'http://127.0.0.1:4391/admin/cpu-models', 2000, false],
  ['admin-notifications', 'http://127.0.0.1:4391/admin/notifications', 2200, false],
  ['www-home', 'http://127.0.0.1:4390/', 2000, false],
  ['www-help', 'http://127.0.0.1:4390/help', 2000, false],
  ['www-notices', 'http://127.0.0.1:4390/notices', 2000, false],
  ['www-about', 'http://127.0.0.1:4390/about', 2000, false],
];

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  const p = await ctx.newPage();
  const fails = [];
  for (const [name, url, wait, full] of jobs) {
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await p.waitForTimeout(wait);
      // 演示壳的品牌替换：只改展示，不动布局
      await p.evaluate(() => {
        const walk = (root) => {
          for (const el of root.querySelectorAll('*')) {
            if (el.children.length) continue;
            const t = el.textContent;
            if (!t) continue;
            if (/TDesign\s*Starter/i.test(t)) el.textContent = t.replace(/TDesign\s*Starter/gi, '创欧云');
          }
        };
        walk(document.body);
        document.title = '创欧云管理端';
      });
      await p.waitForTimeout(300);
      await p.screenshot({ path: `D:/caiwu-website/.shots/${name}.png`, fullPage: full });
      console.log('ok', name);
    } catch (e) {
      fails.push(name + ': ' + e.message.slice(0, 60));
    }
  }
  if (fails.length) console.log('FAILS\n' + fails.join('\n'));
  await b.close();
})();
