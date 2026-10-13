import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import SocialLinks from './SocialLinks.jsx';
import { Arrow } from './Icons.jsx';
import { CONTACT, DEV_PROFILES, PERSON } from '../config/site.js';
import { ext } from '../lib/paths.js';

const COLUMNS = [
  {
    title: 'Portfolio',
    links: [
      ['/work/wordpress/', 'WordPress websites'],
      ['/work/shopify/', 'Shopify stores'],
      ['/work/hugo/', 'Hugo websites'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['/#services', 'WordPress development'],
      ['/#services', 'WooCommerce and Shopify'],
      ['/#services', 'Maintenance and support'],
      ['/#services', 'AI automations'],
    ],
  },
  {
    title: 'Site',
    links: [
      ['/#process', 'Process'],
      ['/about/', 'About'],
      ['/about/#credentials', 'Credentials'],
      ['/contact/', 'Contact'],
    ],
  },
];

export default function Footer() {
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {COLUMNS.map((col) => (
            <nav key={col.title} className="footer-col" aria-label={`Footer: ${col.title}`}>
              <h2 className="eyebrow">{col.title}</h2>
              <ul>
                {col.links.map(([to, label]) => (
                  <li key={label}>
                    <Link to={to} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer-col">
            <h2 className="eyebrow">Contact</h2>
            <ul>
              <li>
                <a className="footer-link" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a className="footer-link" href={CONTACT.whatsapp} {...ext}>
                  WhatsApp {CONTACT.phone}
                </a>
              </li>
            </ul>
            <ul className="chip-links">
              {DEV_PROFILES.map((p) => (
                <li key={p.id}>
                  <a className="chip-link" href={p.url} {...ext} rel="me noopener noreferrer">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <Logo compact />
            <p className="footer-copy">
              © {__BUILD_YEAR__} {PERSON.name}. All rights reserved.
            </p>
          </div>
          <div className="footer-actions">
            <SocialLinks />
            <button type="button" className="btn btn-sm btn-ghost" onClick={toTop}>
              Back to top <Arrow dir="up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
