import { Link } from 'react-router-dom';
import { Arrow } from './Icons.jsx';

/** Closing call to action used at the bottom of the About and portfolio pages. */
export default function CtaBand({ id, title, children }) {
  return (
    <section className="section cta-band" aria-labelledby={id}>
      <div className="container cta-band-inner">
        <h2 id={id} className="cta-band-title" data-reveal="">
          {title}
        </h2>
        <div className="btn-row" data-reveal="">
          <Link to="/contact/" className="btn btn-primary btn-lg" data-magnetic="">
            Discuss Your Project <Arrow />
          </Link>
          {children}
        </div>
      </div>
    </section>
  );
}
