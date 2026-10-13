import { Link } from 'react-router-dom';

/** The "R." brand mark with name. `compact` hides the subtitle (used in the footer). */
export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="logo" aria-label={compact ? 'Rizwan, home' : 'Rizwan, web developer, home'}>
      <span className="logo-mark" aria-hidden="true">
        R<span className="logo-dot">.</span>
        <span className="logo-status" />
      </span>
      <span className="logo-text">
        <span className="logo-name">Rizwan</span>
        {!compact && <span className="logo-sub">Web developer</span>}
      </span>
    </Link>
  );
}
