// One entry per route: title, description, social image and structured data.
// Used at build time (pre-rendered into each page's <head>) and in the browser
// when navigating between pages.
import { PERSON, CONTACT, SAME_AS, INTRO_VIDEO } from '../config/site.js';
import { absUrl } from '../lib/paths.js';
import { faqs } from './home.js';

const personId = absUrl('/#person');

const person = {
  '@type': 'Person',
  '@id': personId,
  name: PERSON.name,
  alternateName: PERSON.shortName,
  jobTitle: PERSON.jobTitle,
  url: absUrl('/'),
  image: absUrl('/assets/img/rizwan-portrait.webp'),
  email: 'mailto:' + CONTACT.email,
  sameAs: SAME_AS,
  knowsAbout: ['WordPress', 'WooCommerce', 'Shopify', 'Liquid', 'Elementor', 'PHP', 'Laravel', 'Hugo', 'JavaScript', 'React', 'REST API integrations', 'Website maintenance', 'AI automation'],
};

const breadcrumb = (name, path) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: absUrl('/') },
    { '@type': 'ListItem', position: 2, name, item: absUrl(path) },
  ],
});

const portfolio = (path, name, crumb) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  url: absUrl(path),
  author: { '@id': personId, '@type': 'Person', name: PERSON.name, url: absUrl('/') },
  breadcrumb: breadcrumb(crumb, path),
});

export const seo = {
  '/': {
    title: 'Rizwan | WordPress, WooCommerce & Shopify Developer',
    description:
      'Rizwan is a WordPress, WooCommerce and Shopify developer with nine years of experience. Custom themes and plugins, Hugo websites, maintenance, integrations and AI automations for businesses worldwide.',
    ogDescription: 'Websites built to work harder for your business. WordPress, WooCommerce, Shopify and Hugo development, maintenance and integrations.',
    image: 'assets/img/rizwan-portrait.webp',
    imageAlt: 'Portrait of Muhammad Rizwan Aslam, web developer',
    preload: { src: 'assets/img/rizwan-portrait.webp', small: 'assets/img/rizwan-portrait-480.webp', mid: 'assets/img/rizwan-portrait-640.webp', sizes: '(max-width: 600px) 92vw, (max-width: 940px) 60vw, 460px' },
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        { '@type': 'WebSite', '@id': absUrl('/#website'), url: absUrl('/'), name: 'Rizwan, Web Developer', publisher: { '@id': personId }, inLanguage: 'en' },
        {
          '@type': 'FAQPage',
          '@id': absUrl('/#faq'),
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ],
    },
  },
  '/about/': {
    title: 'About Rizwan | WordPress & Shopify Developer',
    description:
      'Muhammad Rizwan Aslam is a web developer with nine years of experience in WordPress, WooCommerce, Shopify and Hugo. Approach, community work and certifications.',
    ogDescription: 'Nine years of building, fixing and maintaining websites for businesses and agencies.',
    image: 'assets/img/rizwan-seated.webp',
    imageAlt: 'Muhammad Rizwan Aslam seated, smiling at the camera',
    preload: { src: 'assets/img/rizwan-seated.webp', small: 'assets/img/rizwan-seated-480.webp', mid: 'assets/img/rizwan-seated-640.webp', sizes: '(max-width: 940px) 92vw, 480px' },
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          url: absUrl('/about/'),
          mainEntity: { ...person, image: absUrl('/assets/img/rizwan-seated.webp') },
        },
        {
          '@type': 'VideoObject',
          name: INTRO_VIDEO.title,
          description: INTRO_VIDEO.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${INTRO_VIDEO.id}/maxresdefault.jpg`,
          uploadDate: INTRO_VIDEO.uploadDate,
          duration: INTRO_VIDEO.duration,
          embedUrl: `https://www.youtube.com/embed/${INTRO_VIDEO.id}`,
          contentUrl: `https://www.youtube.com/watch?v=${INTRO_VIDEO.id}`,
          author: { '@id': personId },
        },
      ],
    },
  },
  '/contact/': {
    title: 'Contact Rizwan | Hire a WordPress & Shopify Developer',
    description:
      'Start a WordPress, WooCommerce, Shopify or Hugo project with Rizwan. Send a project inquiry, email expertzrizwan@gmail.com or message on WhatsApp.',
    ogDescription: 'Tell me about your project by email, WhatsApp or the inquiry form.',
    image: 'assets/img/rizwan-portrait.webp',
    imageAlt: 'Portrait of Muhammad Rizwan Aslam, web developer',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: absUrl('/contact/'),
      mainEntity: { '@type': 'Person', '@id': personId, name: PERSON.name, email: 'mailto:' + CONTACT.email, telephone: CONTACT.phoneIntl, url: absUrl('/') },
    },
  },
  '/work/wordpress/': {
    title: 'WordPress Developer Portfolio | Rizwan',
    description:
      'Live WordPress and WooCommerce websites by Rizwan: custom themes, Elementor and page builder builds, publications, charities and eCommerce stores.',
    ogDescription: 'Live WordPress and WooCommerce websites built and customized by Rizwan.',
    image: 'assets/social/og-wordpress.jpg',
    imageW: 1200,
    imageH: 630,
    imageAlt: 'WordPress Developer Portfolio by Rizwan, featuring the WorldFirst case study',
    jsonLd: portfolio('/work/wordpress/', 'WordPress Developer Portfolio', 'WordPress portfolio'),
  },
  '/work/shopify/': {
    title: 'Shopify Developer Portfolio | Rizwan',
    description:
      'Live Shopify stores by Rizwan, including Wavvy Supply: Figma to custom Shopify 2.0 themes, Liquid sections, Google Maps store locators and metafields.',
    ogDescription: 'Live Shopify stores built and customized by Rizwan, from Figma to custom Shopify 2.0 themes.',
    image: 'assets/social/og-shopify.jpg',
    imageW: 1200,
    imageH: 630,
    imageAlt: 'Shopify Developer Portfolio by Rizwan, featuring the Wavvy Supply case study',
    jsonLd: portfolio('/work/shopify/', 'Shopify Developer Portfolio', 'Shopify portfolio'),
  },
  '/work/hugo/': {
    title: 'Hugo Website Developer Portfolio | Rizwan',
    description: 'Live Hugo websites by Rizwan: fast static sites and multisites for companies, SaaS products, law firms and publishers.',
    ogDescription: 'Live Hugo static websites and multisites built by Rizwan.',
    image: 'assets/social/og-hugo.jpg',
    imageW: 1200,
    imageH: 630,
    imageAlt: 'Hugo Website Developer Portfolio by Rizwan, featuring the Matplus website',
    jsonLd: portfolio('/work/hugo/', 'Hugo Website Developer Portfolio', 'Hugo portfolio'),
  },
  404: {
    title: 'Page not found | Rizwan',
    description: 'This page doesn’t exist. Browse Rizwan’s WordPress, Shopify and Hugo portfolio or get in touch.',
    image: 'assets/img/rizwan-portrait.webp',
    noindex: true,
  },
};

export const getSeo = (path) => seo[path] || seo[404];

/** Pages listed in sitemap.xml, with priorities kept from the previous sitemap. */
export const sitemapPages = [
  ['/', '1.0'],
  ['/work/wordpress/', '0.9'],
  ['/work/shopify/', '0.9'],
  ['/work/hugo/', '0.8'],
  ['/about/', '0.7'],
  ['/contact/', '0.7'],
];

/** Old addresses that now redirect (static redirect pages are generated at build). */
export const redirects = {
  'about.html': '/about/',
  'contact.html': '/contact/',
  'work-wordpress.html': '/work/wordpress/',
  'work-shopify.html': '/work/shopify/',
  'work-hugo.html': '/work/hugo/',
  'work/index.html': '/#work',
  // Addresses from the earlier Hugo site
  'about-ceo/index.html': '/about/',
  'work/wordpress/page/2/index.html': '/work/wordpress/',
};
