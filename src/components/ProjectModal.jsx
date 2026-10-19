import { createPortal } from 'react-dom';
import useDialog from '../lib/useDialog.js';
import Img from './Img.jsx';
import { Arrow } from './Icons.jsx';
import { ext } from '../lib/paths.js';

/** Popup showing one project large, with previous/next browsing through `list`. */
export default function ProjectModal({ list, index, onChange, onClose }) {
  const open = index !== null && index !== undefined;
  const step = (d) => onChange((index + d + list.length) % list.length);
  const ref = useDialog(open, { onClose, onPrev: () => step(-1), onNext: () => step(1) });
  if (!open) return null;
  const p = list[index];

  return createPortal(
    <div className="dialog-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className={`project-dialog${p.caseStudy ? ' is-case-study' : ''}`} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" tabIndex={-1}>
        <div className="project-dialog-media">
          {p.caseStudy ? (
            <Img key={p.slug + '-detail'} src={p.detailImg} w={p.detailW} h={p.detailH} alt={p.detailAlt} eager />
          ) : (
            <Img key={p.slug} src={p.img} w={p.w} h={p.h} alt={p.alt} eager />
          )}
        </div>
        <div className="project-dialog-body">
          <div className="project-dialog-top">
            <span className="dialog-tags">
              <span className="tag">{p.platformLabel}</span>
              {p.caseStudy && <span className="tag tag-accent">Case study</span>}
            </span>
            <button type="button" className="icon-btn" aria-label="Close project" onClick={onClose} data-autofocus="">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <h2 id="project-dialog-title" className="project-dialog-title">
            {p.name}
          </h2>
          {p.caseStudy ? (
            <div className="project-dialog-text">
              {p.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="muted">{p.desc}</p>
          )}
          <dl className="facts">
            <dt>Category</dt>
            <dd>{p.category}</dd>
            <dt>Platform</dt>
            <dd>{p.platformLabel}</dd>
            <dt>Website</dt>
            <dd>{p.domain}</dd>
          </dl>
          <a className="btn btn-primary" href={p.url} {...ext}>
            Visit live website <Arrow dir="out" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <div className="dialog-nav">
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => step(-1)} aria-label="Previous project">
              <Arrow dir="left" /> Prev
            </button>
            <span className="dialog-count" aria-live="polite">
              {index + 1} / {list.length}
            </span>
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => step(1)} aria-label="Next project">
              Next <Arrow />
            </button>
          </div>
          <p className="dialog-hint">Use the arrow keys to browse, Esc to close</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
