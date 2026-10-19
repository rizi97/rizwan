import { useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import SectionHead from '../components/SectionHead.jsx';
import Lightbox from '../components/Lightbox.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { BrandIcon } from '../components/Icons.jsx';
import { certificates, recognition, formatDate } from '../data/credentials.js';
import { agencies } from '../data/home.js';
import { SOCIAL, DEV_PROFILES } from '../config/site.js';
import { ext } from '../lib/paths.js';

const approach = [
  {
    title: 'Problem solving',
    text: 'I ask what the website needs to achieve before deciding how to build it. That keeps the solution in proportion to the problem.',
  },
  {
    title: 'Technical range',
    text: 'WordPress, Shopify, Hugo, PHP and JavaScript frameworks. Knowing several platforms means I can recommend the right one honestly.',
  },
  {
    title: 'Maintainable work',
    text: 'Clean structure, sensible naming and editable layouts, so your team and future developers can work with what I leave behind.',
  },
];

const certItems = certificates.map((c) => ({
  ...c,
  dateLabel: formatDate(c.date),
  alt: `${c.title}, ${c.kind.toLowerCase()} from ${c.issuer}${c.date ? ', ' + formatDate(c.date) : ''}`,
}));

export default function About() {
  const [cert, setCert] = useState(null);
  const [rec, setRec] = useState(null);

  return (
    <>
      <section className="page-hero page-hero-split" data-scene="">
        <div className="hero-glow hero-glow-left" aria-hidden="true" />
        <div className="container about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow eyebrow-line" data-reveal="">
              About
            </p>
            <h1 className="page-title">
              <span className="line-mask">
                <span className="line" data-reveal="line">
                  Hi, I’m Rizwan.
                </span>
              </span>
              <span className="line-mask">
                <span className="line subdued" data-reveal="line" data-delay="90">
                  Your website’s technical partner.
                </span>
              </span>
            </h1>
            <div className="prose" data-reveal="" data-delay="220">
              <p>
                My full name is Muhammad Rizwan Aslam. I’m a web developer based in Pakistan, and for about nine years I’ve built and
                maintained websites for businesses and agencies in many countries, mostly on WordPress, WooCommerce and Shopify, with
                Hugo, Laravel and modern frontend tools when a project calls for them.
              </p>
              <p>
                A lot of my work happens on websites that already exist: a store that needs a new feature, a theme nobody wants to
                touch, a plugin conflict that appeared after an update. I enjoy that kind of problem solving as much as starting
                something new.
              </p>
            </div>
            <ul className="profile-links" data-reveal="" data-delay="300" aria-label="Profiles">
              {[...SOCIAL, ...DEV_PROFILES].map((s) => (
                <li key={s.id}>
                  <a className="chip-link" href={s.url} {...ext} rel="me noopener noreferrer">
                    {(s.id === 'linkedin' || s.id === 'instagram') && <BrandIcon name={s.id} size={14} />}
                    {s.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <figure className="about-photo" data-reveal="scale" data-delay="150">
            <div className="hero-frame" aria-hidden="true" data-parallax="-0.05" />
            <div className="about-photo-img" data-tilt="">
              <Img
                src="assets/img/rizwan-seated.webp"
                small="assets/img/rizwan-seated-480.webp"
                smallW={480}
                mid="assets/img/rizwan-seated-640.webp"
                w={825}
                h={1100}
                sizes="(max-width: 940px) 92vw, 480px"
                alt="Muhammad Rizwan Aslam seated, smiling at the camera"
                eager
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="section section-paper" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead eyebrow="How I work" id="approach-title" title="Understand the problem first, then write code that lasts." />
          <div className="approach-grid">
            {approach.map((a, i) => (
              <div key={a.title} className={`approach-card approach-${i + 1}`} data-reveal="" data-delay={i * 80}>
                <span className="outline-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="card-title">{a.title}</h3>
                <p className="muted">{a.text}</p>
              </div>
            ))}
          </div>
          <div className="agency-line" data-reveal="">
            <span className="eyebrow">Agencies I’ve worked with</span>
            <p className="agency-names">{agencies.join(', ')}</p>
          </div>
        </div>
      </section>

      <section id="credentials" className="section section-white" aria-labelledby="cert-title">
        <div className="container">
          <SectionHead
            eyebrow="Certificates"
            id="cert-title"
            title="Always learning."
            intro="Courses and workshops completed to keep my skills current, from C++, PHP and WordPress to frontend frameworks, AI and chatbot development."
          />
          <ul className="cert-grid">
            {certItems.map((c, i) => (
              <li key={c.id} data-reveal="" data-delay={(i % 4) * 60}>
                <button type="button" className="cert-card" onClick={() => setCert(i)} aria-label={`View certificate: ${c.title}, full size`}>
                  <span className="cert-thumb">
                    <Img src={c.img} small={c.imgSmall} w={c.w} h={c.h} alt={c.alt} sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, (max-width: 1200px) 31vw, 300px" />
                    <span className="cert-zoom" aria-hidden="true">
                      View
                    </span>
                  </span>
                  <span className="cert-info">
                    <span className="cert-issuer">{c.issuer}</span>
                    <span className="cert-title">{c.title}</span>
                    <span className="cert-meta">
                      {c.kind}
                      {c.dateLabel && (
                        <>
                          {' · '}
                          <time dateTime={c.date}>{c.dateLabel}</time>
                        </>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="recognition" className="section section-tint" aria-labelledby="rec-title">
        <div className="container">
          <SectionHead eyebrow="Recognition & appreciation" id="rec-title" title="Sharing what I know with the community." />
          <ul className="rec-grid">
            {recognition.map((r, i) => (
              <li key={r.id} data-reveal="" data-delay={(i % 4) * 60}>
                <button type="button" className="rec-card" onClick={() => setRec(i)} aria-label={`View ${r.title} full size`}>
                  <span className="rec-img">
                    <Img src={r.img} small={r.imgSmall} w={r.w} h={r.h} alt={r.alt} sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 300px" />
                  </span>
                  <span className="rec-info">
                    <span className="cert-issuer">{r.issuer}</span>
                    <span className="cert-title">{r.title}</span>
                    <span className="cert-meta">{r.note}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand id="about-cta" title="Let’s see if I’m the right developer for your project.">
        <Link to="/#work" className="btn btn-outline btn-lg">
          Explore My Work
        </Link>
      </CtaBand>

      <Lightbox items={certItems} index={cert} onChange={setCert} onClose={() => setCert(null)} />
      <Lightbox items={recognition} index={rec} onChange={setRec} onClose={() => setRec(null)} />
    </>
  );
}
