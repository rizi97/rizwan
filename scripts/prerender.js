// Pre-renders every route to static HTML after `vite build`, so search engines and
// visitors get complete pages without waiting for JavaScript. Also writes the 404
// page, redirect pages for old URLs, sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, ROUTES, redirects, sitemapPages, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const base = new URL(SITE_URL + '/').pathname; // "/rizwan-portfolio/"

const write = (rel, content) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('  wrote', path.relative(root, file));
};

const page = (route, opts) => {
  const { html, head } = render(route, opts);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const route of ROUTES) write(path.join(route, 'index.html'), page(route));
write('404.html', page('/this-page-does-not-exist/', { notFound: true }));

// Redirect pages for old addresses (GitHub Pages cannot send real 301s).
for (const [from, to] of Object.entries(redirects)) {
  const target = SITE_URL + to;
  const canonical = target.split('#')[0];
  const rel = (base + to).replace(/\/+/g, '/');
  write(
    from,
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${rel}">
<script>location.replace(${JSON.stringify(rel)} + (location.hash && ${JSON.stringify(rel)}.indexOf('#') < 0 ? location.hash : ''));</script>
</head>
<body><p>This page has moved to <a href="${rel}">${canonical}</a>.</p></body>
</html>
`
  );
}

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages.map(([p, pr]) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`
);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write('.nojekyll', '');

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${ROUTES.length} pages, 404 page and ${Object.keys(redirects).length} redirects.`);
