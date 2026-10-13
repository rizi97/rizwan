// Serves the production build at http://localhost:4173/rizwan/ exactly as GitHub Pages
// would: folders serve index.html, unknown paths get 404.html. No dependencies needed.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const base = (process.env.BASE_PATH || '/rizwan/').replace(/\/?$/, '/');
const port = +process.env.PORT || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.jpeg': 'image/jpeg',
};

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/' || url === base.slice(0, -1)) {
      res.writeHead(302, { Location: base });
      return res.end();
    }
    if (!url.startsWith(base)) url = '/__none__';
    let file = path.join(dist, url.slice(base.length));
    if (!file.startsWith(dist)) file = path.join(dist, '__none__');
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.endsWith('/')) {
        res.writeHead(301, { Location: url + '/' });
        return res.end();
      }
      file = path.join(file, 'index.html');
    }
    const ok = fs.existsSync(file) && fs.statSync(file).isFile();
    const out = ok ? file : path.join(dist, '404.html');
    res.writeHead(ok ? 200 : 404, { 'Content-Type': types[path.extname(out)] || 'application/octet-stream' });
    fs.createReadStream(out).pipe(res);
  })
  .listen(port, () => console.log(`Serving dist/ at http://localhost:${port}${base}`));
