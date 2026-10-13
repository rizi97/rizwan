import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { applyHead } from './lib/head.js';
import './styles/fonts.css';
import './styles/global.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root');
if (root.firstElementChild) {
  // Production: the page was pre-rendered at build time, so attach to that HTML.
  hydrateRoot(root, app);
} else {
  // Development server: render from scratch and fill in the <head> tags.
  const path = location.pathname.slice(basename.length) || '/';
  applyHead(path.endsWith('/') ? path : path + '/');
  createRoot(root).render(app);
}
