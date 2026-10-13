import { createPortal } from 'react-dom';
import useDialog from '../lib/useDialog.js';
import { asset, ext } from '../lib/paths.js';
import { Arrow } from './Icons.jsx';

/** Full-size viewer for certificates and recognition photos. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const open = index !== null && index !== undefined;
  const step = (d) => onChange((index + d + items.length) % items.length);
  const ref = useDialog(open, { onClose, onPrev: () => step(-1), onNext: () => step(1) });
  if (!open) return null;
  const c = items[index];
  const meta = [c.issuer, c.dateLabel || c.note].filter(Boolean).join(' · ');

  return createPortal(
    <div className="dialog-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" tabIndex={-1}>
        <figure className="lightbox-figure">
          <img key={c.img} src={asset(c.img)} alt={c.alt || c.title} width={c.w} height={c.h} />
          <figcaption>
            <span id="lightbox-title" className="lightbox-title">
              {c.title}
            </span>
            <span className="lightbox-meta">{meta}</span>
          </figcaption>
        </figure>
        <div className="dialog-nav">
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => step(-1)} aria-label="Previous item">
            <Arrow dir="left" /> Prev
          </button>
          <a className="btn btn-sm btn-ghost" href={asset(c.img)} {...ext}>
            Open original <Arrow dir="out" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" className="btn btn-sm btn-primary" onClick={onClose} data-autofocus="">
            Close
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => step(1)} aria-label="Next item">
            Next <Arrow />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
