import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://rizi97.github.io/rizwan/ (a GitHub Pages project site),
// so every URL starts with /rizwan/.
// For a custom domain at the root, build with:  BASE_PATH=/ npm run build
// (and update SITE_URL in src/config/site.js).
const base = process.env.BASE_PATH || '/rizwan/';

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
