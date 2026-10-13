import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from the custom domain https://mrizwanaslam.com/ (GitHub Pages),
// so it lives at the domain root. public/CNAME tells GitHub Pages which domain to use.
// For a custom domain at the root, build with:  BASE_PATH=/ npm run build
// (and update SITE_URL in src/config/site.js).
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [react()],
  define: {
    __BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear())),
  },
  build: {
    assetsDir: 'static',
    cssCodeSplit: false,
  },
  ssr: {
    // Font CSS packages are only needed in the browser bundle.
    noExternal: [],
  },
});
