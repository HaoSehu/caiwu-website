const { chromium } = require('E:/caiwu/node_modules/playwright');

const adminJobs = [
  ['admin-dashboard', '/admin/dashboard', 2400],
  ['admin-products', '/admin/products', 2000],
  ['admin-product-suppliers', '/admin/products/suppliers', 2200],
  ['admin-users', '/admin/users', 2200],
  ['admin-services', '/admin/services', 2200],
  ['admin-tickets', '/admin/tickets', 2200],
  ['admin-orders', '/admin/finance/orders', 2600],
  ['admin-invoices', '/admin/finance/invoices', 2600],
  ['admin-recharges', '/admin/finance/recharges', 2600],
  ['admin-coupons', '/admin/coupons', 2200],
  ['admin-referral', '/admin/referral', 2200],
  ['admin-site-info', '/admin/site-info', 2400],
  ['admin-site-hero', '/admin/site-hero', 2400],
  ['admin-notices', '/admin/content/notices', 2400],
  ['admin-media', '/admin/content/media-library', 2400],
  ['admin-staff', '/admin/system/staff', 2200],
  ['admin-roles', '/admin/system/roles', 2200],
  ['admin-account-policy', '/admin/account-policy', 2200],
  ['admin-automation', '/admin/automation', 2200],
  ['admin-logs-schedules', '/admin/logs/schedules', 2400],
  ['admin-logs-gateway', '/admin/logs/gateway', 2400],
  ['admin-specs', '/admin/specs', 2200],
  ['admin-cpu-models', '/admin/cpu-models', 2200],
  ['admin-notifications', '/admin/notifications', 2400],
];

const wwwJobs = [
  ['www-home', '/', 2400],
  ['www-help', '/help', 2200],
  ['www-notices', '/notices', 2200],
  ['www-about', '/about', 2200],
];

async function rebrand(p) {
  await p.evaluate(() => {
    // 左上角 logo：用一个干净的文本品牌替换整个 SVG 字标
    const wrapper = document.querySelector('.tdesign-starter-side-nav-logo-wrapper');
    if (wrapper) {
      wrapper.innerHTML = '<span style="font-size:18px;font-weight:600;color:#165dff;letter-spacing:0.01em">创欧云 · Caiwu</span>';
      wrapper.setAttribute('aria-label', '创欧云 Caiwu');
    }
    // 左下角版本条：TDesign Starter → 产品名
    const ver = document.querySelector('.tdesign-starter-side-nav-version');
    if (ver) ver.innerHTML = '<span>创欧云管理端</span><span>v1.0.0</span>';
    // 其余任何残留文本
    const walk = (root) => {
      for (const el of root.querySelectorAll('*')) {
        if (el.children.length) continue;
        if (!el.textContent) continue;
        if (/TDesign\s*Starter/i.test(el.textContent)) {
          el.textContent = el.textContent.replace(/TDesign\s*Starter/gi, '创欧云');
        }
      }
    };
    walk(document.body);
    document.title = '创欧云管理端';
  });
}

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  const p = await ctx.newPage();
  const report = [];

  for (const [name, path, wait] of adminJobs) {
    try {
      await p.goto('http://127.0.0.1:4391' + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await p.waitForTimeout(wait);
      await rebrand(p);
      await p.waitForTimeout(400);
      const bodyText = await p.innerText('body');
      // 跳过明显为空的页面（暂无数据 / 空表格）
      const isEmpty = /暂无数据|当前目录没有|没有可安装插件/.test(bodyText);
      if (isEmpty) { report.push('SKIP(empty) ' + name); continue; }
      await p.screenshot({ path: `D:/caiwu-website/.shots/${name}.png` });
      report.push('ok ' + name);
    } catch (e) { report.push('FAIL ' + name + ' ' + e.message.slice(0, 50)); }
  }

  for (const [name, path, wait] of wwwJobs) {
    try {
      await p.goto('http://127.0.0.1:4390' + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await p.waitForTimeout(wait);
      await p.screenshot({ path: `D:/caiwu-website/.shots/${name}.png` });
      report.push('ok ' + name);
    } catch (e) { report.push('FAIL ' + name + ' ' + e.message.slice(0, 50)); }
  }

  console.log(report.join('\n'));
  await b.close();
})();
