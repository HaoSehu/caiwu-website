#!/usr/bin/env node
/**
 * 在线演示端到端冒烟：三端在静态数据集上能渲染、不发出真实网络请求。
 *
 * 用法：npm run demo:build && node demo/smoke-demo.mjs
 * 依赖：Playwright（从 caiwu 仓库或本仓库解析，含 chromium）。
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const PORT = 4321;
const ORIGIN = `http://127.0.0.1:${PORT}`;

function resolvePlaywright() {
  const candidates = [
    path.join(siteRoot, 'package.json'),
    'E:/caiwu/package.json',
  ];
  for (const manifest of candidates) {
    try {
      const requireFrom = createRequire(manifest);
      return requireFrom('@playwright/test');
    } catch {
      /* 继续尝试下一个 */
    }
  }
  throw new Error('无法解析 @playwright/test，请先在 caiwu 或本仓库安装依赖（npm i）。');
}

const { chromium } = resolvePlaywright();

const APPS = [
  { key: 'admin', path: '/demo/admin/', expect: null },
  { key: 'console', path: '/demo/console/', expect: null },
  { key: 'www', path: '/demo/www/', expect: '创欧云' },
];

const failures = [];

// 「不连后端」的判定只针对后端 API 源站：TDesign 图标字体走官方 CDN，
// 属于 UI 框架默认行为，不是业务请求。
const BACKEND_HOSTS = ['api.coyjs.cn', 'api.cixx.cn', '127.0.0.1:8000', 'localhost:8000'];

function isBackendRequest(url) {
  try {
    const { host } = new URL(url);
    return BACKEND_HOSTS.some((blocked) => host === blocked || url.includes(blocked));
  } catch {
    return false;
  }
}

async function checkApp(browser, app) {
  const page = await browser.newPage();
  const backendRequests = [];
  const consoleErrors = [];

  page.on('request', (request) => {
    const url = request.url();
    if (isBackendRequest(url)) {
      backendRequests.push(url);
    }
  });
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => consoleErrors.push(String(error)));

  try {
    await page.goto(ORIGIN + app.path, { waitUntil: 'networkidle', timeout: 30000 });
    // SPA 挂载与首屏请求
    await page.waitForTimeout(2500);

    const textLength = await page.evaluate(() => document.body.innerText.length);
    if (textLength < 50) {
      failures.push(`${app.key}: 页面内容过少（${textLength} 字符），疑似白屏`);
    }

    if (app.expect) {
      const body = await page.evaluate(() => document.body.innerText);
      if (!body.includes(app.expect)) {
        failures.push(`${app.key}: 页面未出现预期文案「${app.expect}」`);
      }
    }

    if (backendRequests.length > 0) {
      failures.push(`${app.key}: 打到后端 ${backendRequests.length} 次，首个为 ${backendRequests[0]}`);
    }

    const fatal = consoleErrors.filter(
      (text) => text.includes('网络异常') || text.includes('登录状态已失效')
    );
    if (fatal.length > 0) {
      failures.push(`${app.key}: 控制台出现致命错误 —— ${fatal[0]}`);
    }

    console.log(
      `[${app.key}] 内容 ${textLength} 字符，后端请求 ${backendRequests.length}，` +
        `控制台错误 ${consoleErrors.length}${fatal.length ? '（含致命）' : ''}`
    );
  } catch (error) {
    failures.push(`${app.key}: 打开失败 —— ${error.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const server = spawn(process.execPath, [path.join(__dirname, 'serve.mjs'), '--port', String(PORT)], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });

  const stopServer = () => {
    try {
      server.kill();
    } catch {
      /* 忽略重复 kill */
    }
  };
  process.on('exit', stopServer);

  // 等端口就绪
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${ORIGIN}/demo/`);
      if (response.ok) break;
    } catch {
      /* 尚未监听 */
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const browser = await chromium.launch();
  try {
    // 入口页
    const entry = await browser.newPage();
    await entry.goto(`${ORIGIN}/demo/`, { waitUntil: 'domcontentloaded' });
    const entryText = await entry.evaluate(() => document.body.innerText);
    if (!entryText.includes('在线演示')) {
      failures.push('入口页: 未渲染入口说明');
    }
    await entry.close();

    for (const app of APPS) {
      await checkApp(browser, app);
    }
  } finally {
    await browser.close();
    stopServer();
  }

  if (failures.length > 0) {
    console.error('\n冒烟失败：');
    for (const failure of failures) {
      console.error('  - ' + failure);
    }
    process.exit(1);
  }
  console.log('\n三端在线演示冒烟通过');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
