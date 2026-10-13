import { asset, srcSet } from '../lib/paths.js';

/**
 * Responsive image for public assets. Pass `small` (a 640px variant) to get a
 * srcset; `sizes` describes how wide the image is shown.
 */
export default function Img({ src, small, smallW = 640, w, h, alt, sizes, eager = false, className, style, ...rest }) {
  return (
    <img
      src={asset(src)}
      srcSet={srcSet(src, w, small, smallW)}
      sizes={small ? sizes : undefined}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? undefined : 'lazy'}
      decoding={eager ? undefined : 'async'}
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      style={style}
      {...rest}
    />
  );
}
