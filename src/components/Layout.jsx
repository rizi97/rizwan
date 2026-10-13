import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { initMotion } from '../lib/motion.js';
import { applyHead } from '../lib/head.js';

// useLayoutEffect warns during server rendering in some setups; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const routeKey = (pathname) => {
  const p = pathname.endsWith('/') ? pathname : pathname + '/';
  return p;
};

export default function Layout({ notFound = false }) {
  const { pathname, hash, key } = useLocation();
  const first = useRef(true);
  const rootRef = useRef(null);

  // Page title / meta when navigating in the browser.
  useEffect(() => {
    applyHead(notFound ? '404' : routeKey(pathname));
  }, [pathname, notFound]);

  // Scroll to top, or to the #section in the URL, after each navigation.
  // Jump instantly when the page changed; glide when moving within the same page.
  const lastPath = useRef(pathname);
  useIsoLayoutEffect(() => {
    const samePage = lastPath.current === pathname && !first.current;
    lastPath.current = pathname;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ block: 'start', behavior: samePage && !reduce ? 'smooth' : 'instant' });
      if (samePage) return undefined;
      // Fonts/images above the target can shift layout while loading; settle once more.
      const t = setTimeout(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }), 300);
      return () => clearTimeout(t);
    }
    if (!first.current && !samePage) window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash, key]);

  // Scroll animations, re-initialised for each page.
  useIsoLayoutEffect(() => {
    const destroy = initMotion(rootRef.current, { firstLoad: first.current });
    first.current = false;
    return destroy;
  }, [pathname]);

  return (
    <div ref={rootRef} className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" data-progress="" aria-hidden="true" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
