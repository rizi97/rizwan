import { Link } from 'react-router-dom';
import { Arrow } from '../components/Icons.jsx';

export default function NotFound() {
  return (
    <section className="page-hero not-found" aria-labelledby="nf-title">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow eyebrow-line">Error 404</p>
        <h1 id="nf-title" className="page-title">
          This page <span className="accent-text">doesn’t exist.</span>
        </h1>
        <p className="hero-lead">The link may be old or mistyped. Here are the main places to go instead.</p>
        <div className="btn-row">
          <Link to="/" className="btn btn-primary btn-lg">
            Back to home <Arrow />
          </Link>
          <Link to="/work/wordpress/" className="btn btn-outline btn-lg">
            WordPress portfolio
          </Link>
          <Link to="/contact/" className="btn btn-outline btn-lg">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
