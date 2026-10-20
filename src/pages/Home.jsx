import { useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../components/Img.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { IntroVideoButton } from '../components/IntroVideo.jsx';
import { Arrow, BrandIcon } from '../components/Icons.jsx';
import { featured } from '../data/projects.js';
import { CONTACT } from '../config/site.js';
import { ext } from '../lib/paths.js';
import {
  agencies,
  audiences,
  platformCards,
  services,
  stack,
  processSteps,
  stages,
  promises,
  community,
  faqs,
} from '../data/home.js';

const pad = (n) => String(n).padStart(2, '0');

function Hero() {
  return (
    <section className="hero" aria-label="Introduction" data-scene="">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" data-depth="-30" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="eyebrow eyebrow-line" data-reveal="">
              WordPress &amp; Shopify Developer
            </span>
            <span className="line-mask">
              <span className="line" data-reveal="line">
                Websites built
              </span>
            </span>
            <span className="line-mask">
              <span className="line" data-reveal="line" data-delay="90">
                to work <em className="accent-text">harder</em>
              </span>
            </span>
            <span className="line-mask">
              <span className="line" data-reveal="line" data-delay="180">
                for your business.
              </span>
            </span>
          </h1>
          <p className="hero-lead" data-reveal="" data-delay="300">
            I’m Rizwan, a full stack web developer with nine years of experience. I build, fix and maintain WordPress, WooCommerce and
            Shopify websites for businesses and agencies around the world, from new builds to custom functionality on sites that
            already exist.
          </p>
          <div className="btn-row" data-reveal="" data-delay="400">
            <Link to="/contact/" className="btn btn-primary btn-lg" data-magnetic="">
              Discuss Your Project <Arrow />
            </Link>
            <a href="#work" className="btn btn-outline btn-lg" data-magnetic="">
              Explore My Work
            </a>
          </div>
          <div data-reveal="" data-delay="450">
            <IntroVideoButton />
          </div>
          <div className="hero-facts" data-reveal="" data-delay="500">
            <span>
              <span className="bullet" aria-hidden="true" />
              Nine years in web development
            </span>
            <span>
              <span className="bullet" aria-hidden="true" />
              Building for{' '}
              <strong className="rotate" data-rotate={audiences.join('|')}>
                {audiences[0]}
              </strong>
            </span>
          </div>
        </div>

        <div className="hero-visual" data-reveal="scale" data-delay="200">
          <div className="hero-frame" aria-hidden="true" data-depth="-16" />
          <div className="hero-photo" data-depth="8">
            <Img
              src="assets/img/rizwan-portrait.webp"
              small="assets/img/rizwan-portrait-480.webp"
              smallW={480}
              mid="assets/img/rizwan-portrait-640.webp"
              w={825}
              h={1100}
              sizes="(max-width: 600px) 92vw, (max-width: 940px) 60vw, 460px"
              alt="Portrait of Muhammad Rizwan Aslam, web developer"
              eager
            />
            <div className="hero-photo-caption">
              <div>
                <span className="hero-photo-name">Muhammad Rizwan</span>
                <span className="hero-photo-role">Full stack web developer</span>
              </div>
              <span className="pill-status">
                <span className="dot-live" aria-hidden="true" />
                Available
              </span>
            </div>
          </div>
          <div className="hero-badge" aria-hidden="true" data-depth="-24">
            <svg data-spin="10" viewBox="0 0 120 120" width="118" height="118">
              <defs>
                <path id="ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#ring">BUILD · FIX · MAINTAIN · SUPPORT · </textPath>
              </text>
            </svg>
            <span className="hero-badge-mark">
              R<span className="accent-text">.</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container marquee-row">
        <span className="marquee-label">Agencies I’ve worked with</span>
        <div className="marquee-mask">
          <div className="marquee" data-marquee="">
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? 'true' : undefined}>
                {agencies.map((a) => (
                  <li key={a}>
                    {a}
                    <span className="marquee-sep" aria-hidden="true">
                      ◆
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  const [open, setOpen] = useState(null);
  return (
    <section id="work" className="section section-paper" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          eyebrow="01 / Selected work"
          id="work-title"
          title="Websites that fit the business, whatever the platform."
          intro="Recent highlights from WordPress, Shopify and Hugo. I also build on Wix, Weebly, Webflow, Squarespace, Unbounce, Bubble and more when they suit the project."
        />

        <div className="featured-list">
          {featured.map((p, i) => (
            <article key={p.slug} className={`featured${i % 2 ? ' featured-flip' : ''}`}>
              <div className="featured-media" data-reveal="scale">
                <div className="featured-shadow" aria-hidden="true" data-parallax="-0.05" />
                <button type="button" className="featured-img" onClick={() => setOpen(i)} aria-label={`Open ${p.name} project details`} data-tilt="">
                  <Img src={p.img} small={p.imgSmall} w={p.w} h={p.h} alt={p.alt} sizes="(max-width: 940px) 92vw, 600px" />
                </button>
              </div>
              <div className="featured-body" data-reveal="">
                <div className="featured-meta">
                  <span className="featured-num">{pad(i + 1)}</span>
                  <span className="tag">{p.platformLabel}</span>
                </div>
                <h3 className="featured-title">{p.name}</h3>
                <p className="mono-note">{p.category}</p>
                <p className="muted">{p.summary}</p>
                <div className="btn-row">
                  <button type="button" className="btn btn-dark" onClick={() => setOpen(i)}>
                    View project <Arrow />
                  </button>
                  <a className="btn btn-outline" href={p.url} {...ext}>
                    {p.domain} <Arrow dir="out" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="browse">
          <div className="browse-head">
            <h3 className="browse-title" data-reveal="">
              Browse the full portfolio
            </h3>
            <p className="muted">Each platform has its own page. Open any project to see it full size and visit the live website.</p>
          </div>
          <div className="platform-grid">
            {platformCards.map((c, i) => (
              <Link
                key={c.id}
                to={c.to}
                className={`platform-card platform-${c.id}`}
                data-reveal=""
                data-delay={i * 80}
                aria-label={`View ${c.name} portfolio`}
              >
                <BrandIcon name={c.id} size={260} className="platform-watermark" />
                <div className="platform-top">
                  <span className="platform-icon">
                    <BrandIcon name={c.id} size={26} title={`${c.name} logo`} />
                  </span>
                  <span className="platform-go" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="platform-text">
                  <span className="platform-name">{c.name}</span>
                  <span className="platform-desc">{c.text}</span>
                </div>
                <ul className="tag-list">
                  {c.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ProjectModal list={featured} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section-tint" aria-labelledby="services-title">
      <div className="container split">
        <div className="split-aside sticky-aside">
          <p className="eyebrow" data-reveal="">
            02 / Services
          </p>
          <h2 id="services-title" className="section-title" data-reveal="">
            Build it, fix it, keep it running.
          </h2>
          <p className="section-intro" data-reveal="">
            I take on new projects and work inside websites that already exist. If you have a design in Figma, Sketch, XD or PSD, I can
            turn it into a WordPress or Shopify theme your team can manage.
          </p>
          <Link to="/contact/" className="text-link" data-reveal="">
            Ask about your project <Arrow />
          </Link>
        </div>
        <ol className="service-list">
          {services.map((s, i) => (
            <li key={s.title} className="service" data-reveal="">
              <span className="service-num">{pad(i + 1)}</span>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <p className="muted">{s.text}</p>
                <ul className="tag-list">
                  {s.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="section section-paper" aria-labelledby="stack-title">
      <div className="container">
        <SectionHead eyebrow="03 / Expertise" id="stack-title" title="The tools I work with." intro="I pick the stack for the project, not the other way round." />
        <div className="stack">
          {stack.map((g, i) => (
            <div key={g.title} className="stack-row" data-reveal="">
              <div className="stack-head">
                <span className="stack-num">{pad(i + 1)}</span>
                <h3 className="stack-title">{g.title}</h3>
              </div>
              <ul className="chip-list">
                {g.items.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section section-white" aria-labelledby="process-title">
      <div className="container">
        <SectionHead
          eyebrow="04 / Process"
          id="process-title"
          title="Six clear steps, start to finish."
          intro="Full builds follow every step. Smaller jobs like fixes or updates go straight to the ones that matter."
        />
        <ol className="steps" data-steps="">
          {processSteps.map((s, i) => (
            <li key={s.title} className="step" data-step="">
              <span className="step-line" aria-hidden="true" />
              <div className="step-top">
                <span className="step-num">{pad(i + 1)}</span>
                <span className="step-dot" aria-hidden="true" />
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section section-paper" aria-labelledby="why-title">
      <div className="container why">
        <figure className="why-figure" data-reveal="scale">
          <div className="why-photo">
            <Img
              src="assets/img/rizwan-working.webp"
              small="assets/img/rizwan-working-480.webp"
              smallW={480}
              mid="assets/img/rizwan-working-640.webp"
              w={825}
              h={1100}
              sizes="(max-width: 940px) 92vw, 460px"
              alt="Rizwan working on a laptop"
              data-parallax="0.04"
            />
          </div>
          <figcaption className="why-caption">
            <span className="eyebrow">Start to finish</span>
            <span>Planning, build, launch and ongoing care, from one developer.</span>
          </figcaption>
        </figure>
        <div className="why-body">
          <p className="eyebrow" data-reveal="">
            05 / Why work with me
          </p>
          <h2 id="why-title" className="section-title" data-reveal="">
            With you from the first plan to launch, and long after.
          </h2>
          <p className="section-intro" data-reveal="">
            I stay involved at every stage of the project, and I remain available for support whenever you need it. One point of
            contact, from the first conversation to the hundredth update.
          </p>
          <div className="stages">
            {stages.map((s) => (
              <div key={s.label} className="stage" data-reveal="">
                <span className="stage-label">{s.label}</span>
                <div>
                  <h3 className="stage-title">{s.title}</h3>
                  <p className="muted">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <ul className="promise-list" data-reveal="">
            {promises.map((p) => (
              <li key={p}>
                <span className="bullet" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="section section-tint" aria-labelledby="rec-title">
      <div className="container">
        <SectionHead eyebrow="06 / Community & recognition" id="rec-title" title="Active in the WordPress community.">
          <Link to="/about/#credentials" className="text-link" data-reveal="">
            All credentials <Arrow />
          </Link>
        </SectionHead>
        <div className="photo-grid">
          {community.map((c, i) => (
            <figure key={c.title} className="photo-card" data-reveal="" data-delay={i * 80}>
              <div className="photo-card-img">
                <Img src={c.img} small={c.imgSmall} w={c.w} h={c.h} alt={c.alt} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 420px" />
              </div>
              <figcaption>
                <span className="photo-card-title">{c.title}</span>
                <span className="photo-card-note">{c.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="section section-white" aria-labelledby="faq-title">
      <div className="container split">
        <div className="split-aside sticky-aside">
          <p className="eyebrow" data-reveal="">
            07 / FAQ
          </p>
          <h2 id="faq-title" className="section-title" data-reveal="">
            Questions clients usually ask.
          </h2>
          <p className="muted" data-reveal="">
            Something else on your mind? <Link to="/contact/">Send me a message</Link>.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq">
              <summary>
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section final-cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="final-cta-panel">
          <div className="ring ring-lg" aria-hidden="true" data-parallax="-0.08" />
          <div className="ring ring-sm" aria-hidden="true" data-parallax="0.06" />
          <p className="eyebrow" data-reveal="">
            Start a project
          </p>
          <h2 id="cta-title" className="final-cta-title" data-reveal="">
            Have a website that needs work? Let’s talk.
          </h2>
          <p className="section-intro" data-reveal="">
            Tell me what you need. I’ll reply with questions or a short plan, and we can set up a call if it helps.
          </p>
          <div className="btn-row btn-row-center" data-reveal="">
            <Link to="/contact/" className="btn btn-primary btn-lg" data-magnetic="">
              Discuss Your Project <Arrow />
            </Link>
            <a className="btn btn-outline btn-lg" href={CONTACT.whatsapp} {...ext} data-magnetic="">
              WhatsApp
            </a>
            <a className="btn btn-outline btn-lg" href={`mailto:${CONTACT.email}`} data-magnetic="">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Expertise />
      <Process />
      <Why />
      <Community />
      <Faq />
      <FinalCta />
    </>
  );
}
