import { SOCIAL } from '../config/site.js';
import { ext } from '../lib/paths.js';
import { BrandIcon } from './Icons.jsx';

/** Round icon links to the social profiles in src/config/site.js. */
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`social ${className}`} aria-label="Social profiles">
      {SOCIAL.map((s) => (
        <li key={s.id}>
          <a className={`social-link social-${s.id}`} href={s.url} {...ext} rel="me noopener noreferrer" aria-label={`Rizwan on ${s.label} (opens in a new tab)`}>
            <BrandIcon name={s.id} size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}
