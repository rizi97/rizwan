// Certificates and recognition shown on the About page.
// Every title, issuer and date below is read from the certificate itself.
// `date` is ISO (YYYY-MM-DD) for sorting and <time>; leave it null when the certificate shows none.

const img = (name, w, h) => ({
  img: `assets/img/${name}.webp`,
  imgSmall: `assets/img/${name}-640.webp`,
  w,
  h,
});

export const certificates = [
  {
    id: 'chatbot',
    title: 'Chatbot: The Development Guide 2025 (Beginner + Advanced)',
    issuer: 'Udemy',
    kind: 'Certificate of completion',
    date: '2025-07-26',
    ...img('cert-chatbot', 1100, 793),
  },
  {
    id: 'genai',
    title: 'Generative AI for Beginners',
    issuer: 'Udemy',
    kind: 'Certificate of completion',
    date: '2025-06-20',
    ...img('cert-genai', 1100, 799),
  },
  {
    id: 'angular',
    title: 'Angular: The Complete Guide (2024 Edition)',
    issuer: 'Udemy',
    kind: 'Certificate of completion',
    date: '2024-02-13',
    ...img('cert-angular', 1100, 796),
  },
  {
    id: 'csharp',
    title: 'C# Intermediate: Classes, Interfaces and OOP',
    issuer: 'Udemy',
    kind: 'Certificate of completion',
    date: '2024-01-22',
    ...img('cert-csharp', 1100, 789),
  },
  {
    id: 'gulp',
    title: 'Gulp 4: Automate Your Development Workflow',
    issuer: 'Udemy',
    kind: 'Certificate of completion',
    date: '2023-08-27',
    ...img('cert-gulp', 1100, 791),
  },
  {
    id: 'wordpress-theme',
    title: 'WordPress Theme Development',
    issuer: 'Career Institute',
    kind: 'Certificate of achievement',
    date: '2017-10-17',
    ...img('cert-wordpress-theme-2017', 1280, 940),
  },
  {
    id: 'bootstrap',
    title: 'Bootstrap workshop',
    issuer: 'Career Institute',
    kind: 'Certificate of attendance',
    date: '2017-01-18',
    ...img('cert-bootstrap-2017', 1280, 924),
  },
  {
    id: 'php-mysql',
    title: 'Web Development using PHP + MySQL',
    issuer: 'Career Institute, Computer & Academic Studies',
    kind: 'Course certificate',
    date: '2016-02-24',
    ...img('cert-php-mysql-2016', 1280, 938),
  },
  {
    id: 'cplusplus',
    title: 'C++',
    issuer: 'Career Institute, Computer & Academic Studies',
    kind: 'Course certificate',
    date: '2015-04-25',
    ...img('cert-cplusplus-2015', 1280, 937),
  },
  {
    id: 'seo-workshop',
    title: 'SEO & Online Earning, one-day training workshop',
    issuer: 'University of Agriculture Faisalabad (Dept. of Computer Science) · WAPEXP',
    kind: 'Certificate of recognition',
    date: null, // not shown on the certificate
    ...img('cert-seo-workshop', 1280, 982),
  },
];

export const recognition = [
  {
    id: 'wp-meetup-cert',
    title: 'Certificate of Appreciation, Guest Speaker',
    issuer: 'Ciklum · WordPress Meetup',
    note: 'WordPress Meetup 2025, August 2, 2025',
    alt: 'Certificate of Appreciation, Guest Speaker, WordPress Meetup 2025, August 2, 2025',
    ...img('cert-wp-meetup-2025', 819, 597),
  },
  {
    id: 'wp-meetup-talk',
    title: 'Speaking at the WordPress Meetup 2025',
    issuer: 'Community',
    note: 'Ciklum Pakistan office',
    alt: 'Rizwan speaking at the WordPress Meetup 2025 at Ciklum Pakistan',
    ...img('speaking-ciklum', 1100, 734),
  },
  {
    id: 'wordcamp-lahore',
    title: 'WordCamp Lahore 2023',
    issuer: 'Community',
    note: 'WordPress community conference',
    alt: 'Rizwan at WordCamp Lahore 2023, WordPress community conference',
    ...img('wordcamp-lahore-2023', 923, 1100),
  },
  {
    id: 'ciklum-2023',
    title: 'Recognised on stage, 2023',
    issuer: 'Ciklum',
    note: 'Ciklum 2023 event',
    alt: 'Rizwan receiving recognition on stage at a Ciklum event in 2023',
    ...img('award-ciklum-2023', 1100, 717),
  },
  {
    id: 'devnatives',
    title: 'Certificate of Appreciation',
    issuer: 'Devnatives',
    note: 'One year with a client, June 9, 2021',
    alt: 'Certificate of Appreciation from Devnatives, one year with a client, June 9, 2021',
    ...img('cert-devnatives-2021', 1087, 1100),
  },
];

export const formatDate = (iso) =>
  iso
    ? new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    : null;
