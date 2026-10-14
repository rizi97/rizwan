// Site-wide settings. Change these in one place and every page picks them up.

// Production address, without a trailing slash. Used for canonical URLs, Open Graph,
// JSON-LD and the sitemap. If you move to a custom domain, change it here AND set
// BASE_PATH in vite.config.js (or the BASE_PATH env var) to match.
export const SITE_URL = 'https://mrizwanaslam.com';

export const PERSON = {
  name: 'Muhammad Rizwan Aslam',
  shortName: 'Rizwan',
  jobTitle: 'WordPress and Shopify Developer',
};

export const CONTACT = {
  email: 'expertzrizwan@gmail.com',
  phone: '+92 303 0697979',
  phoneIntl: '+923030697979',
  whatsapp: 'https://wa.me/923030697979',
  whatsappHello: "https://wa.me/923030697979?text=Hi%20Rizwan%2C%20I'd%20like%20to%20discuss%20a%20project.",
  calendly: 'https://calendly.com/mianrizwan465/30min',
  formspree: 'https://formspree.io/f/mkgwqdwy',
};

// Social profiles shown as icons (header menu, footer, About page).
export const SOCIAL = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammad-rizwan-aslam/' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/rizwan.96/' },
];

// Developer profiles shown as text links.
export const DEV_PROFILES = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/rizi97' },
  { id: 'stackoverflow', label: 'Stack Overflow', url: 'https://stackoverflow.com/users/13847939/muhammad-rizwan' },
];

export const SAME_AS = [...SOCIAL, ...DEV_PROFILES].map((s) => s.url);
