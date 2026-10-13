import { useState } from 'react';
import { CONTACT } from '../config/site.js';
import { ext } from '../lib/paths.js';
import { Arrow } from '../components/Icons.jsx';

const SERVICES = [
  'WordPress development',
  'WooCommerce store',
  'Shopify store or theme',
  'Figma or design to website',
  'Hugo or static website',
  'Maintenance and support',
  'Bug fix or troubleshooting',
  'AI automation or integration',
  'Something else',
];
const BUDGETS = ['Not sure yet', 'Under $500', '$500 to $1,500', '$1,500 to $5,000', '$5,000 or more', 'Ongoing monthly support'];
const EMPTY = { name: '', email: '', service: SERVICES[0], budget: BUDGETS[0], message: '' };
const DEFAULT_STATUS = 'Your message comes straight to my inbox. Prefer chat? Send it via WhatsApp instead.';

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'A sentence or two about the project helps me reply properly.';
  return e;
}

const bodyText = (v) =>
  `Name: ${v.name.trim()}\nEmail: ${v.email.trim()}\nService: ${v.service}\nBudget: ${v.budget}\n\n${v.message.trim()}`;

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      <span id={`err-${id}`} className="field-error" role="alert">
        {error || ''}
      </span>
    </div>
  );
}

function InquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: DEFAULT_STATUS, tone: '' });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };
  const check = () => {
    const e = validate(values);
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : 'false', 'aria-describedby': `err-${k}` });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending || !check()) return;
    setSending(true);
    setStatus({ text: 'Sending your message…', tone: '' });
    try {
      const v = values;
      const r = await fetch(CONTACT.formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: v.name.trim(),
          email: v.email.trim(),
          service: v.service,
          budget: v.budget,
          message: v.message.trim(),
          _subject: 'Project inquiry: ' + v.service,
          _replyto: v.email.trim(),
        }),
      });
      if (!r.ok) throw new Error('Request failed');
      setValues(EMPTY);
      setStatus({ text: 'Thanks, your message has been sent. I’ll reply by email, usually within one working day.', tone: 'ok' });
    } catch {
      setStatus({ text: `The message couldn’t be sent. Please try again, or email ${CONTACT.email} directly.`, tone: 'bad' });
    } finally {
      setSending(false);
    }
  };

  const onWhatsApp = () => {
    if (!check()) return;
    const text = encodeURIComponent('Hi Rizwan, I have a project inquiry.\n\n' + bodyText(values));
    window.open(`${CONTACT.whatsapp}?text=${text}`, '_blank', 'noopener');
    setStatus({ text: 'WhatsApp opened in a new tab with your message filled in. Press send there to deliver it.', tone: '' });
  };

  return (
    <form className="card form-card" onSubmit={onSubmit} noValidate aria-labelledby="form-title" data-reveal="" data-delay="150">
      <h2 id="form-title" className="card-title-lg">
        Project inquiry
      </h2>
      <div className="form-grid">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Jane Smith" value={values.name} onChange={set('name')} {...aria('name')} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={values.email} onChange={set('email')} {...aria('email')} />
        </Field>
        <Field id="service" label="Service needed">
          <select id="service" name="service" value={values.service} onChange={set('service')}>
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget range">
          <select id="budget" name="budget" value={values.budget} onChange={set('budget')}>
            {BUDGETS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="message" label="Project details" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="What are you building or fixing? Include your current website link if you have one."
          value={values.message}
          onChange={set('message')}
          {...aria('message')}
        />
      </Field>
      <div className="btn-row">
        <button type="submit" className="btn btn-primary" disabled={sending} data-magnetic="">
          {sending ? 'Sending…' : 'Send message'} <Arrow />
        </button>
        <button type="button" className="btn btn-outline" onClick={onWhatsApp}>
          Send via WhatsApp
        </button>
      </div>
      <p className={`form-status${status.tone ? ' is-' + status.tone : ''}`} role="status">
        {status.text}
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <section className="page-hero" data-scene="">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" data-depth="-30" />
        <div className="container">
          <p className="eyebrow eyebrow-line" data-reveal="">
            Contact
          </p>
          <h1 className="page-title">
            <span className="line-mask">
              <span className="line" data-reveal="line">
                Tell me about
              </span>
            </span>
            <span className="line-mask">
              <span className="line accent-text" data-reveal="line" data-delay="90">
                your project.
              </span>
            </span>
          </h1>

          <div className="contact-grid">
            <InquiryForm />
            <aside className="contact-aside" data-reveal="" data-delay="250" aria-label="Other ways to reach me">
              <a className="contact-tile contact-tile-primary" href={`mailto:${CONTACT.email}`}>
                <span className="eyebrow">Email</span>
                <span className="contact-tile-value">{CONTACT.email}</span>
              </a>
              <a className="contact-tile" href={CONTACT.whatsapp} {...ext}>
                <span className="eyebrow">WhatsApp</span>
                <span className="contact-tile-value">{CONTACT.phone}</span>
              </a>
              <a className="contact-tile contact-tile-accent" href="#book">
                <span>
                  <span className="eyebrow">Book a meeting</span>
                  <span className="contact-tile-value">Pick a date and time</span>
                </span>
                <span className="round-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
              <div className="card next-steps">
                <h2 className="card-title">What happens next</h2>
                <ol>
                  <li>I read your message and reply with any questions.</li>
                  <li>If it helps, we have a short call to go through the details.</li>
                  <li>You receive a clear scope and estimate before any work starts.</li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="book" className="section section-paper" aria-labelledby="book-title">
        <div className="container book">
          <div className="book-copy">
            <p className="eyebrow" data-reveal="">
              Book a meeting
            </p>
            <h2 id="book-title" className="section-title" data-reveal="">
              Schedule a call at a time that suits you.
            </h2>
            <p className="section-intro" data-reveal="">
              Choose an available date and time. You’ll get a confirmation by email with the video call link.
            </p>
            <ul className="promise-list promise-list-col" data-reveal="">
              {['Talk through your goals and requirements', 'Get my recommendations on platform and approach', 'Agree on the next steps'].map((t) => (
                <li key={t}>
                  <span className="bullet" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="calendar card" data-reveal="">
            <iframe
              src={`${CONTACT.calendly}?hide_gdpr_banner=1&background_color=ffffff&primary_color=6d3fd8`}
              title="Book a meeting with Rizwan on Calendly"
              loading="lazy"
            />
            <p className="calendar-fallback">
              Calendar not loading?{' '}
              <a href={CONTACT.calendly} {...ext}>
                Open the booking page ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
