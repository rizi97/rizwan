# Rizwan — portfolio website (React + Vite, pre-rendered)

Personal portfolio of Muhammad Rizwan Aslam. It's a React app that is **pre-rendered to static HTML at build time**, so every page ships complete markup for search engines and fast first paint, then React takes over for the interactive parts.

Production URL: **https://rizi97.github.io/rizwan-portfolio/**

## Commands

Requires Node.js 20.19+ (22 recommended).

```bash
npm install        # once
npm run dev        # local dev server with hot reload → http://localhost:5173/rizwan-portfolio/
npm run build      # production build into dist/ (client bundle + pre-rendered pages)
npm run preview    # serve dist/ like GitHub Pages → http://localhost:4173/rizwan-portfolio/
```

## Deploying

`dist/` is a plain static site. Upload its contents to any static host.

- **GitHub Pages (current setup):** this repository (`rizi97/rizwan-portfolio`) deploys automatically. `.github/workflows/deploy.yml` builds and publishes on every push to `main` (Settings → Pages → Source is **GitHub Actions**).
- **Manual:** run `npm run build` and upload everything inside `dist/` (including `.nojekyll`) to the `/rizwan-portfolio/` site root.
- **Custom domain at the root:** set `SITE_URL` in `src/config/site.js`, then build with `BASE_PATH=/ npm run build`. On Windows PowerShell: `$env:BASE_PATH="/"; npm run build`.

## Project structure

```
index.html                 HTML shell: favicons, manifest; per-page <head> is injected at build
public/                    Copied as-is: images, favicons, web manifest
  assets/img/              Portraits, certificates, recognition photos (+ -640 / -480 variants)
  assets/work/             Project screenshots (+ -640 variants for small screens)
src/
  main.jsx                 Browser entry (hydrates the pre-rendered HTML)
  entry-server.jsx         Build-time renderer used by scripts/prerender.js
  App.jsx                  Routes
  config/site.js           Site URL, email, WhatsApp, Calendly, Formspree, social links  ← edit here
  data/
    projects.js            All 46 portfolio projects + the 5 featured on the home page
    credentials.js         Certificates and recognition (About page)
    home.js                Home page text: services, stack, process, FAQ…
    seo.js                 Title, description, social image and JSON-LD per page; old-URL redirects
  components/              Header, Footer, Logo, ProjectModal, Lightbox, Img, CtaBand…
  pages/                   Home, About, Contact, Portfolio (WordPress/Shopify/Hugo), NotFound
  lib/                     motion.js (scroll/pointer effects), head.js (meta tags), useDialog.js, paths.js
  styles/                  fonts.css (self-hosted fonts), global.css (light theme, tokens at the top)
scripts/
  prerender.js             Writes each route's HTML, 404.html, redirects, sitemap.xml, robots.txt
  serve.js                 Zero-dependency preview server
```

## Common edits

- **Contact details / social links:** `src/config/site.js`. Every page reads from there: header menu, footer, About page and JSON-LD.
- **Add a project:** put `public/assets/work/<slug>.webp` (and optionally a 640px-wide `<slug>-640.webp`) and add one row to `src/data/projects.js`.
- **Add a certificate:** put `public/assets/img/<name>.webp` plus a 640px-wide `<name>-640.webp`, then add an entry to `src/data/credentials.js` using the title, issuer and date shown on the certificate.
- **Colours:** the tokens at the top of `src/styles/global.css` (`--accent`, `--ink`, `--paper`, …).
- **Page titles/descriptions:** `src/data/seo.js`.

## URLs

| Page | URL |
|---|---|
| Home | `/rizwan-portfolio/` |
| About | `/rizwan-portfolio/about/` |
| Contact | `/rizwan-portfolio/contact/` |
| Portfolios | `/rizwan-portfolio/work/wordpress/`, `/rizwan-portfolio/work/shopify/`, `/rizwan-portfolio/work/hugo/` |

Every route is a real pre-rendered HTML file, so refreshing or opening any page directly works on GitHub Pages; unknown URLs get the site's own `404.html` (with a proper 404 status).
Old file names from the previous HTML site redirect to the new pages: `about.html`, `contact.html`, `work-wordpress.html`, `work-shopify.html`, `work-hugo.html`, and `/work/` → `/#work`.

## Images

Responsive variants were generated once from the originals: 640px wide for screenshots/certificates and 480px for portraits. If you replace an image, regenerate its variant with any tool, e.g. `cwebp -resize 640 0 -q 78 in.webp -o in-640.webp`. Screenshots 740px wide or less don't need one.
