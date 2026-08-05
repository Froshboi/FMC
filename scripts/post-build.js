import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../.output/public');
const assetsDir = path.join(publicDir, 'assets');

function findFile(prefix, ext) {
  if (!fs.existsSync(assetsDir)) return null;
  const files = fs.readdirSync(assetsDir);
  return files.find(f => f.startsWith(prefix + '-') && f.endsWith('.' + ext)) || null;
}

const jsFile = findFile('index', 'js');
const cssFile = findFile('styles', 'css');

if (!jsFile) {
  console.error('❌ Could not find main JS entry in .output/public/assets/');
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FMC</title>
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}">` : ''}
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/${jsFile}"></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'index.html'), html);
console.log('✅ Generated .output/public/index.html');