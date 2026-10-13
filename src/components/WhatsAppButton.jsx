import { CONTACT } from '../config/site.js';
import { ext } from '../lib/paths.js';
import { BrandIcon } from './Icons.jsx';

/** Floating WhatsApp chat button shown on every page. */
export default function WhatsAppButton() {
  return (
    <a className="wa-fab" href={CONTACT.whatsappHello} {...ext} aria-label="Chat with Rizwan on WhatsApp (opens in a new tab)" title="Chat on WhatsApp">
      <BrandIcon name="whatsapp" size={26} />
    </a>
  );
}
