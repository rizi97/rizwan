import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Img from '../components/Img.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Arrow } from '../components/Icons.jsx';
import { byPlatform, PLATFORMS } from '../data/projects.js';
import { CONTACT } from '../config/site.js';
import { ext } from '../lib/paths.js';

const PAGE_SIZE = 9;

const COPY = {
  wordpress: {
    intro:
      'Business websites, publications, charities and stores built on WordPress and WooCommerce, using custom themes, page builders and integrations. Select a project to view it larger and browse the collection.',
    cta: 'Need a WordPress developer for a new build or an existing site?',
  },
  shopify: {
    intro:
      'Shopify stores for food, beverage, retail and software brands, built with Liquid themes, custom sections and subscription setups. Select a project to view it larger and browse the collection.',
    cta: 'Planning a new Shopify store or a theme rebuild?',
  },
  hugo: {
    intro:
      'Static websites and multisites built with Hugo for companies, SaaS products, law firms and publishers. Fast to load and simple to host. Select a project to view it larger and browse the collection.',
    cta: 'Want a fast static website built with Hugo?',
  },
};

export default function Portfolio({ platform }) {
  const list = byPlatform(platform);
  const label = PLATFORMS[platform];
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="page-hero" data-scene="">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" data-depth="-30" />
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb" data-reveal="">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#work">Work</Link>
              </li>
              <li>
                <span aria-current="page">{label}</span>
              </li>
            </ol>
          </nav>
          <h1 className="page-title">
            <span className="line-mask">
              <span className="line" data-reveal="line">
                {label}
              </span>
            </span>
            <span className="line-mask">
              <span className="line accent-text" data-reveal="line" data-delay="90">
                portfolio.
              </span>
            </span>
          </h1>
          <p className="hero-lead" data-reveal="" data-delay="200">
            {COPY[platform].intro}
          </p>
          <nav className="segmented" aria-label="Portfolio by platform" data-reveal="" data-delay="300">
            {Object.entries(PLATFORMS).map(([id, name]) => (
              <NavLink key={id} to={`/work/${id}/`} className="segmented-link">
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      </section>

      <section className="section section-paper section-tight-top" aria-label={`${label} projects`}>
        <div className="container">
          <p className="results-count">
            {list.length} {label} projects
          </p>
          <ul className="project-grid">
            {list.map((p, i) => (
              <li key={p.slug} hidden={i >= limit}>
                <article className="project-card">
                  <button type="button" className="project-card-img" onClick={() => setOpen(i)} aria-label={`Open ${p.name} project details`}>
                    <Img src={p.img} small={p.imgSmall} w={p.w} h={p.h} alt={p.alt} sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 400px" />
                  </button>
                  <div className="project-card-body">
                    <div>
                      <h2 className="project-card-title">{p.name}</h2>
                      <p className="project-card-cat">{p.category}</p>
                    </div>
                    <a className="round-link" href={p.url} {...ext} aria-label={`Visit ${p.name} live website (opens in a new tab)`}>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {limit < list.length && (
            <div className="more-row">
              <button type="button" className="btn btn-dark" onClick={() => setLimit((l) => l + PAGE_SIZE)} data-magnetic="">
                View more projects <Arrow dir="down" />
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand id="work-cta" title={COPY[platform].cta}>
        <a className="btn btn-outline btn-lg" href={CONTACT.whatsapp} {...ext}>
          WhatsApp
        </a>
      </CtaBand>

      <ProjectModal list={list} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
