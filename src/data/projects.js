// Portfolio projects. To add one: put the screenshot in public/assets/work/<slug>.webp
// (plus an optional 640px-wide <slug>-640.webp for small screens) and add a row below.
// Columns: slug, name, platform, category, domain, image width, image height
//
// Case studies (see CASE_STUDIES below) also have <slug>-detail.webp, shown in the
// project popup, and a written description.

export const PLATFORMS = {
  wordpress: 'WordPress',
  shopify: 'Shopify',
  hugo: 'Hugo',
};

const rows = [
  ["worldfirst", "WorldFirst", "wordpress", "International payments (Alibaba)", "worldfirst.com", 1448, 1086],
  ["firmpilot", "Firmpilot", "wordpress", "Legal marketing platform", "firmpilot.com", 1448, 1086],
  ["tegmade", "TEG Made", "wordpress", "Brand and products website", "tegmade.com", 1448, 1086],
  ["kombudrinks", "Kombu Drinks", "wordpress", "Bilingual WordPress e-commerce", "kombudrinks.com", 1448, 1086],
  ["mudaustralia", "MUD Australia", "wordpress", "Ceramics brand", "mudaustralia.com", 1640, 924],
  ["leapevent", "Leap Event", "wordpress", "Event booking platform", "leapevent.tech", 1280, 720],
  ["wasteco", "WasteCo", "wordpress", "Cleaning services", "wasteco.net", 1280, 720],
  ["citrusbits", "CitrusBits", "wordpress", "Technology agency", "citrusbits.com", 1080, 1080],
  ["aytam-damad", "Aytam Damad", "wordpress", "Arabic RTL website", "aytam-damad.org.sa", 1080, 1080],
  ["aish", "Aish", "wordpress", "Publishing and blog", "aish.com", 940, 788],
  ["bumper", "Bumper", "wordpress", "eCommerce", "bumper.sale", 1080, 1080],
  ["ciklum", "Ciklum", "wordpress", "Technology services", "ciklum.com", 1080, 1080],
  ["nitestv", "Nites TV", "wordpress", "Media", "nitestv.tv", 1080, 1080],
  ["dylansocialmanager", "Dylan Social Manager", "wordpress", "Restaurant marketing landing page", "dylansocialmanager.com.au", 1920, 922],
  ["vitalcells", "Vitalcells", "wordpress", "Health and wellness", "vitalcells.com", 940, 788],
  ["womenlovetech", "Women Love Tech", "wordpress", "News and media", "womenlovetech.com", 1080, 1080],
  ["thecarousel", "The Carousel", "wordpress", "Lifestyle publication", "thecarousel.com", 1080, 1080],
  ["gritdaily", "Grit Daily", "wordpress", "News publication", "gritdaily.com", 940, 788],
  ["ablemkr", "AbleMkr", "wordpress", "Construction", "ablemkr.com", 1080, 1350],
  ["cityofflowersnyc", "City of Flowers NYC", "wordpress", "Retail", "cityofflowersnyc.com", 1080, 1350],
  ["madridfuelsupply", "Madrid Fuel Supply", "wordpress", "Fuel supply business", "madridfuelsupply.co", 1080, 1080],
  ["primametrics", "Prima Metrics", "wordpress", "Business consulting", "primametrics.co.za", 624, 624],
  ["cooksmarts", "Cook Smarts", "wordpress", "Cooking and meal planning", "cooksmarts.com", 1080, 1080],
  ["jdforrest", "JD Forrest", "wordpress", "Business website", "jdforrest.com", 1080, 1350],
  ["phase", "Phase", "wordpress", "Children’s charity", "phase.center", 1080, 1080],
  ["phasepreschool", "Phase Preschool", "wordpress", "Education", "phasepreschool.com", 1080, 1350],
  ["investingletter", "Investing Letter", "wordpress", "Finance and investing", "investingletter.com", 1080, 1080],
  ["caringconnections", "Caring Connections", "wordpress", "Senior care charity", "caringconnections.us", 1080, 1080],
  ["entouragecannabis", "Entourage", "wordpress", "Specialty retail", "entouragecannabis.com", 940, 788],
  ["digitalzonesoftware", "Digital Zone Software", "shopify", "Software store", "digitalzonesoftware.com", 1080, 1420],
  ["domogummies", "Domo Gummies", "shopify", "Subscription store", "domogummies.com", 1080, 1080],
  ["organicscarecrow", "Organic Scarecrow", "shopify", "Organic products", "organicscarecrow.com", 1080, 1080],
  ["woodstockresources", "Woodstock Resources", "shopify", "Wood products", "woodstockresources.com.au", 1080, 1080],
  ["bestabrasives", "Best Abrasives", "shopify", "Furniture, warehouse and tools", "bestabrasives.com.au", 1080, 1920],
  ["organicdeliverysydney", "Organic Delivery Sydney", "shopify", "Grocery delivery", "organicdeliverysydney.com.au", 1080, 1080],
  ["italianshoes", "Italian Shoes", "shopify", "Footwear retail", "italianshoes.com.au", 1280, 800],
  ["mosey", "Mosey", "hugo", "Business website", "mosey.com", 1280, 720],
  ["matplus", "Matplus", "hugo", "Multisite build", "matplus.eu", 1080, 1080],
  ["marketing_dashboard", "Marketing Dashboard", "hugo", "Reporting dashboard", "rizi97.github.io/hugo-marketing-reports/", 1080, 1080],
  ["dimsoudigital", "Dimsou Digital", "hugo", "IT company", "dimsoudigital.com", 940, 788],
  ["tysktech", "TyskTech", "hugo", "Multisite with Tailwind CSS", "rizi97.github.io/hugo-multisite-tailwind", 1080, 1350],
  ["top-fin", "Top Fin", "hugo", "News site", "top-fin.es", 1080, 1080],
  ["dictanote", "Dictanote", "hugo", "SaaS product website", "dictanote.co", 940, 788],
  ["controlledlighting", "Controlled Lighting", "hugo", "IoT lighting", "controlledlighting.net", 1920, 2385],
  ["nhklaw", "NHK Law", "hugo", "Law firm", "nhklaw.pages.dev", 1587, 2245],
  ["gatewaylanguages", "Gateway Languages", "hugo", "Medical interpreting and translation", "gatewaylanguages.com", 1918, 1760]
];

// A 640px variant exists for every screenshot wider than 740px (see README, "Images").
const VARIANT_MIN = 740;

// Case studies: a designed detail image for the popup plus the project write-up.
const CASE_STUDIES = {
  tegmade: {
    detail: { w: 1448, h: 1086 },
    body: [
      'Developed the WordPress website from scratch using Figma designs and Elementor. Integrated website forms with Monday.com for lead management, Zapier for workflow automation, and ActiveCampaign for automated email communication.',
      'Managed the complete project, including development, third-party integrations, and deployment. I also provide ongoing maintenance and support. This project showcases my expertise in Elementor, Figma-to-WordPress conversion, marketing automation, lead management, and WordPress maintenance.',
    ],
  },
  worldfirst: {
    detail: { w: 1448, h: 1086 },
    body: [
      'Developed a custom WordPress website (Alibaba) by converting Figma designs into Elementor layouts and building the complete front end.',
      'Created a custom currency calculator and integrated React-based front-end modules, WordPress REST APIs, and Node.js functionality.',
      'Also developed multiple landing pages for Alibaba and other company projects. This project showcases my expertise in WordPress development, Figma-to-WordPress conversion, Elementor, React, API integration, custom functionality, and responsive web development.',
    ],
  },
  firmpilot: {
    detail: { w: 1920, h: 1080 },
    body: [
      'Developed a fully custom WordPress theme for FirmPilot from scratch using Figma designs. Built multiple responsive pages with unique, advanced animations powered by the GSAP library.',
      'Converted the designs into a pixel-perfect website, implementing custom layouts, interactive elements, and tailored functionality. This project showcases my expertise in custom WordPress theme development, Figma-to-WordPress conversion, GSAP animations, responsive design, and advanced front-end development.',
    ],
  },
  kombudrinks: {
    detail: { w: 1448, h: 1086 },
    body: [
      'Developed a bilingual WordPress e-commerce website from scratch by converting Adobe XD designs into a custom WordPress theme. Built flexible theme customization options, custom metaobjects, and dynamic content management to let the client control website content directly from the backend.',
      'Configured WPML for French and English language management and implemented custom cart functionality. This project showcases my expertise in WordPress theme development, XD-to-WordPress conversion, ACF, multilingual e-commerce, and dynamic theme customization.',
    ],
  },
};

export const projects = rows.map(([slug, name, platform, category, domain, w, h]) => {
  const label = PLATFORMS[platform];
  const cleanDomain = domain.replace(/\/$/, '');
  return {
    slug,
    name,
    platform,
    platformLabel: label,
    category,
    domain: cleanDomain,
    url: 'https://' + domain,
    img: 'assets/work/' + slug + '.webp',
    imgSmall: w > VARIANT_MIN ? 'assets/work/' + slug + '-640.webp' : null,
    w,
    h,
    alt: name + ' website shown on desktop and mobile, built with ' + label,
    desc: label + ' website for ' + name + ', ' + category.charAt(0).toLowerCase() + category.slice(1) + '.',
    ...(CASE_STUDIES[slug] && {
      caseStudy: true,
      alt: name + ' case study: website shown on desktop, laptop and mobile, built with ' + label,
      detailImg: 'assets/work/' + slug + '-detail.webp',
      detailW: CASE_STUDIES[slug].detail.w,
      detailH: CASE_STUDIES[slug].detail.h,
      detailAlt: name + ' case study: project highlights and tech stack, with the website on desktop, laptop and mobile',
      body: CASE_STUDIES[slug].body,
    }),
  };
});

export const byPlatform = (platform) => projects.filter((p) => p.platform === platform);

const FEATURED = [
  { slug: 'worldfirst', text: 'Custom WordPress website for WorldFirst (Alibaba): Figma designs built in Elementor, a custom currency calculator, React front-end modules and REST API integrations.' },
  { slug: 'kombudrinks', text: 'Bilingual WordPress e-commerce website built from Adobe XD as a custom theme, with ACF-powered content and WPML for French and English.' },
  { slug: 'leapevent', text: 'WordPress website for an event technology and booking platform.' },
  { slug: 'matplus', text: 'Hugo multisite for Matplus, a software and services company in materials innovation, built as fast static pages.' },
  { slug: 'domogummies', text: 'Shopify subscription store for a gummies brand, presented across desktop and mobile.' },
];

export const featured = FEATURED.map(({ slug, text }) => ({ ...projects.find((p) => p.slug === slug), summary: text }));
