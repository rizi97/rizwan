// Builds the per-page <head> tags from src/data/seo.js.
// headTags() is used at build time (string HTML); applyHead() keeps the live
// document in sync when the visitor navigates between pages in the browser.
import { getSeo } from '../data/seo.js';
import { absUrl, asset } from './paths.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function headData(path) {
  const s = getSeo(path);
  const canonical = s.noindex ? null : absUrl(path);
  const image = absUrl('/' + s.image);
  return {
    title: s.title,
    meta: [
      ['name', 'description', s.description],
      ['name', 'robots', s.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
      ['property', 'og:type', path === '/about/' ? 'profile' : 'website'],
      ['property', 'og:site_name', 'Rizwan, Web Developer'],
      ['property', 'og:locale', 'en_US'],
      ['property', 'og:title', s.title],
      ['property', 'og:description', s.ogDescription || s.description],
      ['property', 'og:url', canonical || absUrl('/')],
      ['property', 'og:image', image],
      ['property', 'og:image:secure_url', image],
      ['property', 'og:image:type', /\.jpe?g$/.test(s.image) ? 'image/jpeg' : /\.png$/.test(s.image) ? 'image/png' : 'image/webp'],
      ...(s.imageW ? [['property', 'og:image:width', String(s.imageW)], ['property', 'og:image:height', String(s.imageH)]] : []),
      ['property', 'og:image:alt', s.imageAlt || s.title],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', s.title],
      ['name', 'twitter:description', s.ogDescription || s.description],
      ['name', 'twitter:image', image],
    ],
    canonical,
    jsonLd: s.jsonLd || null,
    preload: s.preload
      ? { href: asset(s.preload.src), srcset: `${asset(s.preload.small)} 480w, ${asset(s.preload.mid)} 640w, ${asset(s.preload.src)} 825w`, sizes: s.preload.sizes }
      : null,
  };
}

export function headTags(path) {
  const d = headData(path);
  const out = [`<title>${esc(d.title)}</title>`];
  d.meta.forEach(([attr, key, val]) => out.push(`<meta ${attr}="${key}" content="${esc(val)}">`));
  if (d.canonical) out.push(`<link rel="canonical" href="${esc(d.canonical)}">`);
  if (d.preload)
    out.push(
      `<link rel="preload" as="image" href="${esc(d.preload.href)}" imagesrcset="${esc(d.preload.srcset)}" imagesizes="${esc(d.preload.sizes)}" fetchpriority="high">`
    );
  if (d.jsonLd) out.push(`<script type="application/ld+json">${JSON.stringify(d.jsonLd).replace(/</g, '\\u003c')}</script>`);
  return out.join('\n    ');
}

export function applyHead(path) {
  if (typeof document === 'undefined') return;
  const d = headData(path);
  document.title = d.title;
  d.meta.forEach(([attr, key, val]) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  });
  let link = document.head.querySelector('link[rel="canonical"]');
  if (d.canonical) {
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = d.canonical;
  } else if (link) link.remove();
  let ld = document.head.querySelector('script[type="application/ld+json"]');
  if (d.jsonLd) {
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(d.jsonLd);
  } else if (ld) ld.remove();
}
