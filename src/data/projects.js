// Portfolio projects. To add one: put the screenshot in public/assets/work/<slug>.webp
// (plus an optional 640px-wide <slug>-640.webp for small screens) and add a row below.
// Columns: slug, name, platform, category, domain, image width, image height

export const PLATFORMS = {
  wordpress: 'WordPress',
  shopify: 'Shopify',
  hugo: 'Hugo',
};

const rows = [
  ["worldfirst", "WorldFirst", "wordpress", "International payments (Alibaba)", "worldfirst.com", 940, 788],
  ["firmpilot", "Firmpilot", "wordpress", "Legal marketing platform", "firmpilot.com", 1800, 760],
  ["tegmade", "TEG Made", "wordpress", "Brand and products website", "tegmade.com", 1080, 1080],
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
  ["kombudrinks", "Kombu Drinks", "shopify", "Beverage brand", "kombudrinks.com", 1080, 1080],
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
  };
});

export const byPlatform = (platform) => projects.filter((p) => p.platform === platform);

const FEATURED = [
  { slug: 'worldfirst', text: 'WordPress work for WorldFirst, the international payments brand within the Alibaba ecosystem, presented across desktop and mobile.' },
  { slug: 'kombudrinks', text: 'Shopify storefront for a beverage brand, with product pages and layouts designed to show off the range.' },
  { slug: 'leapevent', text: 'WordPress website for an event technology and booking platform.' },
  { slug: 'matplus', text: 'Hugo multisite for Matplus, a software and services company in materials innovation, built as fast static pages.' },
  { slug: 'domogummies', text: 'Shopify subscription store for a gummies brand, presented across desktop and mobile.' },
];

export const featured = FEATURED.map(({ slug, text }) => ({ ...projects.find((p) => p.slug === slug), summary: text }));
