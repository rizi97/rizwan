import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Portfolio from './pages/Portfolio.jsx';
import NotFound from './pages/NotFound.jsx';

// Every route is pre-rendered to static HTML at build time (see scripts/prerender.js).
export const ROUTES = ['/', '/about/', '/contact/', '/work/wordpress/', '/work/shopify/', '/work/hugo/'];

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="work/wordpress" element={<Portfolio key="wordpress" platform="wordpress" />} />
        <Route path="work/shopify" element={<Portfolio key="shopify" platform="shopify" />} />
        <Route path="work/hugo" element={<Portfolio key="hugo" platform="hugo" />} />
      </Route>
      <Route element={<Layout notFound />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
