import { SITE_URL } from '../config/site.js';

const BASE = import.meta.env.BASE_URL; // "/" on the custom domain

/** Public asset path, e.g. asset('assets/img/x.webp') -> "/assets/img/x.webp" */
export const asset = (p) => BASE + p.replace(/^\//, '');

/** Absolute production URL for a route path, e.g. absUrl('/about/') */
export const absUrl = (p = '/') => SITE_URL + (p.startsWith('/') ? p : '/' + p);

/** srcset for an image with a small (640px or 480px) variant and an optional in-between `mid` size */
export const srcSet = (full, fullW, small, smallW = 640, mid, midW) =>
  small ? [[small, smallW], ...(mid ? [[mid, midW]] : []), [full, fullW]].map(([p, w]) => `${asset(p)} ${w}w`).join(', ') : undefined;

/** Props for an external link that opens in a new tab safely */
export const ext = { target: '_blank', rel: 'noopener noreferrer' };
