const { chromium } = require('E:/caiwu/node_modules/playwright');

const adminJobs = [
  ['admin-dashboard', '/admin/dashboard', 2600],
  ['admin-products', '/admin/products', 2600],
  ['admin-product-suppliers', '/admin/products/suppliers', 2600],
  ['admin-users', '/admin/users', 2600],
  ['admin-services', '/admin/services', 2600],
  ['admin-tickets', '/admin/tickets', 2600],
  ['admin-orders', '/admin/finance/orders', 3000],
  ['admin-invoices', '/admin/finance/invoices', 3000],
  ['admin-recharges', '/admin/finance/recharges', 3000],
  ['admin-coupons', '/admin/coupons', 2600],
  ['admin-referral', '/admin/referral', 2600],
  ['admin-referral-withdrawals', '/admin/referral/withdrawals', 2600],
  ['admin-site-info', '/admin/site-info', 2800],
  ['admin-site-hero', '/admin/site-hero', 2800],
  ['admin-notices', '/admin/content/notices', 2800],
  ['admin-help', '/admin/content/help', 2800],
  ['admin-media', '/admin/content/media-library', 2800],
  ['admin-staff', '/admin/system/staff', 2600],
  ['admin-roles', '/admin/system/roles', 2600],
  ['admin-account-policy', '/admin/account-policy', 2600],
  ['admin-automation', '/admin/automation', 2600],
  ['admin-logs-schedules', '/admin/logs/schedules', 2800],
  ['admin-logs-gateway', '/admin/logs/gateway', 2800],
  ['admin-specs', '/admin/specs', 2600],
  ['admin-cpu-models', '/admin/cpu-models', 2600],
  ['admin-notifications', '/admin/notifications', 2800],
];

const wwwJobs = [
  ['www-home', '/', 2600],
  ['www-help', '/help', 2400],
  ['www-notices', '/notices', 2400],
  ['www-about', '/about', 2400],
];

async function rebrand(p) {
  await p.evaluate(() => {
    const w = document.querySelector('.tdesign-starter-side-nav-logo-wrapper');
    if (w) {
      w.innerHTML = '<span style="font-size:18px;font-weight:600;color:#165dff;letter-spacing:0.01em">创欧云 · Caiwu</span>';
      w.setAttribute('aria-label', '创欧云 Caiwu');
    }
    const v = document.querySelector('.tdesign-starter-side-nav-version');
    if (v) v.innerHTML = '<span>创欧云管理端</span><span>v1.0.0</span>';
    for (const el of document.querySelectorAll('span,div,a,strong,h1,h2,h3')) {
      if (el.children.length) continue;
      if (el.textContent && /TDesign\s*Starter/i.test(el.textContent)) {
        el.textContent = el.textContent.replace(/TDesign\s*Starter/gi, '创欧云');
      }
    }
    document.title = '创欧云管理端';
  });
}

// 结构化判断页面是否有内容：有表格数据行、有卡片、有表单控件，或有足量文字
async function hasContent(p) {
  return p.evaluate(() => {
    const rows = document.querySelectorAll('.t-table tbody tr').length;
    const emptyBlocks = document.querySelectorAll('.t-table__empty, .t-empty').length;
    const cards = document.querySelectorAll('.t-card').length;
    const forms = document.querySelectorAll('.t-form, .t-form__item').length;
    const text = (document.querySelector('.t-layout__content') || document.body).innerText || '';
    // 若有数据行，视为有内容，即使某个侧栏为空
    if (rows > 0) return { ok: true, why: 'rows=' + rows };
    if (cards > 0 || forms > 3) return { ok: true, why: 'cards=' + cards + ' forms=' + forms };
    if (text.replace(/\s/g, '').length > 220) return { ok: true, why: 'text' };
    return { ok: false, why: 'empty rows=0 cards=' + cards + ' forms=' + forms };
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
      const c = await hasContent(p);
      if (!c.ok) { report.push('SKIP ' + name + ' (' + c.why + ')'); continue; }
      await p.screenshot({ path: `D:/caiwu-website/.shots/${name}.png` });
      report.push('ok ' + name + ' (' + c.why + ')');
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
