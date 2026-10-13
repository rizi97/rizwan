import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { Arrow } from './Icons.jsx';

const WORK = [
  { to: '/work/wordpress/', label: 'WordPress' },
  { to: '/work/shopify/', label: 'Shopify' },
  { to: '/work/hugo/', label: 'Hugo' },
];

const LINKS = [
  { to: '/#services', label: 'Services' },
  { to: '/#process', label: 'Process' },
  { to: '/about/', label: 'About' },
  { to: '/contact/', label: 'Contact' },
];

export default function Header() {
  const { pathname, hash } = useLocation();
  const [workOpen, setWorkOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const workRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const onWork = pathname.startsWith('/work/');

  // Close menus on navigation.
  useEffect(() => {
    setWorkOpen(false);
    setMenuOpen(false);
  }, [pathname, hash]);

  // Dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!workOpen) return;
    const onDoc = (e) => workRef.current && !workRef.current.contains(e.target) && setWorkOpen(false);
    const onKey = (e) => e.key === 'Escape' && setWorkOpen(false);
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [workOpen]);

  // Mobile menu: lock scroll, focus, Escape, close when resized to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth > 940 && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      menuBtnRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <header className="site-header" data-nav="">
      <div className="container header-inner">
        <Logo />

        <nav className="nav-desktop" aria-label="Main">
          <div className="nav-work" ref={workRef} onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
            <button
              type="button"
              className={`nav-link${onWork ? ' is-active' : ''}`}
              aria-expanded={workOpen}
              aria-controls="work-menu"
              onClick={() => setWorkOpen((o) => !o)}
            >
              Work <span className="caret" aria-hidden="true">▾</span>
            </button>
            <div id="work-menu" className="nav-dropdown" hidden={!workOpen}>
              <div className="nav-dropdown-panel">
                {WORK.map((w) => (
                  <NavLink key={w.to} to={w.to} className="nav-dropdown-link">
                    {w.label} portfolio <Arrow />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          {LINKS.map((l) => {
            const L = l.to.includes('#') ? Link : NavLink;
            return (
              <L key={l.to} to={l.to} className="nav-link">
                {l.label}
              </L>
            );
          })}
          <Link to="/contact/#book" className="btn btn-sm btn-primary nav-cta">
            <span className="dot-live" aria-hidden="true" /> Book a Call
          </Link>
        </nav>

        <button
          ref={menuBtnRef}
          type="button"
          className="menu-toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <span className="eyebrow">Menu</span>
          <button ref={closeBtnRef} type="button" className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile">
          <span className="eyebrow">Work</span>
          {WORK.map((w) => (
            <NavLink key={w.to} to={w.to} className="mobile-link mobile-link-sub">
              {w.label}
            </NavLink>
          ))}
          {LINKS.map((l) => {
            const L = l.to.includes('#') ? Link : NavLink;
            return (
              <L key={l.to} to={l.to} className="mobile-link">
                {l.label}
              </L>
            );
          })}
        </nav>
        <div className="mobile-menu-foot">
          <SocialLinks />
          <Link to="/contact/#book" className="btn btn-primary">
            Book a Call
          </Link>
        </div>
      </div>
    </header>
  );
}
