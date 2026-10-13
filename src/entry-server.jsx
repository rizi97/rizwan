import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App, { ROUTES } from './App.jsx';
import { headTags } from './lib/head.js';
import { redirects, sitemapPages } from './data/seo.js';
import { SITE_URL } from './config/site.js';

export { ROUTES, redirects, sitemapPages, SITE_URL };

/** Render one route to HTML (body markup + head tags). */
export function render(path, { notFound = false } = {}) {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={basename + path} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html, head: headTags(notFound ? '404' : path) };
}
