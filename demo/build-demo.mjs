#!/usr/bin/env node
/**
 * 拼装在线演示到官网 dist/demo/：
 *   dist/demo/index.html        入口页（demo/index.html）
 *   dist/demo/data/*.json       脱敏数据集（demo/data/，提交在官网仓库）
 *   dist/demo/{admin,console,www}/  三端 demo 产物（构建自 E:\caiwu 对应 workspace）
 *   dist/demo/media/            数据集实际引用到的媒体文件（从 backend/public/media 拷）
 *
 * 用法：npm run demo:build [-- --caiwu <caiwu 仓库路径>] [--skip-build]
 * 前置：官网已 npm run build（dist/ 存在）；demo/data/*.json 已就位。
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const distRoot = path.join(siteRoot, 'dist');
const demoDist = path.join(distRoot, 'demo');

function parseArgs(argv) {
  const options = { caiwuRoot: 'E:/caiwu', skipBuild: false, skipSiteBuild: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--caiwu') {
      options.caiwuRoot = argv[i + 1] || options.caiwuRoot;
      i += 1;
    } else if (arg.startsWith('--caiwu=')) {
      options.caiwuRoot = arg.slice('--caiwu='.length);
    } else if (arg === '--skip-build') {
      options.skipBuild = true;
    } else if (arg === '--skip-site-build') {
      options.skipSiteBuild = true;
    }
  }
  return options;
}

/** 递归拷贝目录（Node 内置 fs 没有 cpSync 的 Windows 兼容顾虑，逐层实现）。 */
function copyDir(source, target) {
  if (!existsSync(source)) {
    throw new Error(`源目录不存在：${source}`);
  }
  mkdirSync(target, { recursive: true });
  for (const entry of readdirSync(source)) {
    const from = path.join(source, entry);
    const to = path.join(target, entry);
    if (statSync(from).isDirectory()) {
      copyDir(from, to);
    } else {
      copyFileSync(from, to);
    }
  }
}

const options = parseArgs(process.argv.slice(2));
const caiwuRoot = path.resolve(options.caiwuRoot);
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// dist/ 会被官网 npm run build 整体重写；本脚本每次都自己重建官网产物，
// 否则任何一次 build 都会把上一轮的 dist/demo 冲掉（截图脚本、CI 都会触发）。
// 优先用 build:app（纯 vite 构建，不跑 SEO 生成）；仓库里还没有该脚本时退回 build。
if (!options.skipSiteBuild) {
  const siteScripts = JSON.parse(readFileSync(path.join(siteRoot, 'package.json'), 'utf8')).scripts || {};
  const siteBuildScript = siteScripts['build:app'] ? 'build:app' : 'build';
  console.log(`构建官网主站（npm run ${siteBuildScript}）...`);
  const siteBuild = spawnSync(npmBin, ['run', siteBuildScript], {
    cwd: siteRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (siteBuild.status !== 0) {
    console.error(`官网构建失败（exit ${siteBuild.status}）`);
    process.exit(1);
  }
}

if (!existsSync(distRoot)) {
  console.error('dist/ 不存在，官网构建未产出产物。');
  process.exit(1);
}

const dataDir = path.join(siteRoot, 'demo', 'data');
const expectedApps = ['admin', 'console', 'www'];

for (const app of expectedApps) {
  const file = path.join(dataDir, `${app}.json`);
  if (!existsSync(file)) {
    console.error(`缺少数据集 ${file}。请先在 caiwu 仓库运行：`);
    console.error('  cd backend && php scripts/demo_anonymize.php && php scripts/demo_export.php');
    console.error('然后把 demo-data/*.json 拷到 demo/data/。');
    process.exit(1);
  }
}

if (!options.skipBuild) {
  const workspaces = {
    admin: 'caiwu-admin-v3',
    console: 'caiwu-user-v4-console',
    www: 'caiwu-user-v3-www',
  };

  for (const [app, workspace] of Object.entries(workspaces)) {
    console.log(`构建 ${app} (${workspace})...`);
    const result = spawnSync(npmBin, ['run', 'build:demo', '--workspace', workspace], {
      cwd: caiwuRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    if (result.status !== 0) {
      console.error(`${app} 构建失败（exit ${result.status}）`);
      process.exit(1);
    }
  }
}

console.log('拼装 dist/demo/...');
rmSync(demoDist, { recursive: true, force: true });
mkdirSync(demoDist, { recursive: true });

copyFileSync(path.join(siteRoot, 'demo', 'index.html'), path.join(demoDist, 'index.html'));
copyDir(dataDir, path.join(demoDist, 'data'));

for (const app of expectedApps) {
  const workspaceDir = {
    admin: 'frontend-admin-v3',
    console: 'frontend-user-v4-console',
    www: 'frontend-user-v3-www',
  }[app];
  copyDir(path.join(caiwuRoot, workspaceDir, 'dist-demo'), path.join(demoDist, app));
}

// 媒体：扫描数据集里出现的 /demo/media/<file>，只拷实际被引用的文件
const mediaSource = path.join(caiwuRoot, 'backend', 'public', 'media');
const mediaTarget = path.join(demoDist, 'media');
const referenced = new Set();

for (const app of expectedApps) {
  const text = readFileSync(path.join(dataDir, `${app}.json`), 'utf8');
  for (const match of text.matchAll(/\/demo\/media\/([^"'\\\s]+)/g)) {
    referenced.add(match[1]);
  }
}

mkdirSync(mediaTarget, { recursive: true });
const missing = [];
for (const file of referenced) {
  const source = path.join(mediaSource, file);
  if (existsSync(source)) {
    copyFileSync(source, path.join(mediaTarget, file));
  } else {
    missing.push(file);
  }
}

console.log(`  入口页 1 个`);
console.log(`  数据集 ${expectedApps.length} 个`);
console.log(`  媒体 ${referenced.size - missing.length}/${referenced.size} 个`);
if (missing.length > 0) {
  console.warn(`  以下媒体文件不存在，已跳过：${missing.join(', ')}`);
}
console.log('完成：dist/demo/');
