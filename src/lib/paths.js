import { SITE_URL } from '../config/site.js';

const BASE = import.meta.env.BASE_URL; // e.g. "/rizwan-portfolio/"

/** Public asset path, e.g. asset('assets/img/x.webp') -> "/rizwan-portfolio/assets/img/x.webp" */
export const asset = (p) => BASE + p.replace(/^\//, '');

/** Absolute production URL for a route path, e.g. absUrl('/about/') */
export const absUrl = (p = '/') => SITE_URL + (p.startsWith('/') ? p : '/' + p);

/** srcset for an image that may have a 640px (or 480px) variant */
export const srcSet = (full, fullW, small, smallW = 640) =>
  small ? `${asset(small)} ${smallW}w, ${asset(full)} ${fullW}w` : undefined;

/** Props for an external link that opens in a new tab safely */
export const ext = { target: '_blank', rel: 'noopener noreferrer' };
