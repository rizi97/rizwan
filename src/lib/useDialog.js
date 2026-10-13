import { useEffect, useRef } from 'react';

/**
 * Shared behaviour for the project popup and certificate lightbox:
 * locks page scroll, moves focus into the dialog, keeps Tab inside it,
 * handles Escape / arrow keys, and restores focus when it closes.
 */
export default function useDialog(open, { onClose, onPrev, onNext }) {
  const ref = useRef(null);
  const handlers = useRef({});
  handlers.current = { onClose, onPrev, onNext };

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    document.body.style.overflow = 'hidden';
    const first = ref.current?.querySelector('[data-autofocus]') || ref.current;
    first?.focus();

    const onKey = (e) => {
      const h = handlers.current;
      if (e.key === 'Escape') h.onClose?.();
      else if (e.key === 'ArrowRight') h.onNext?.();
      else if (e.key === 'ArrowLeft') h.onPrev?.();
      else if (e.key === 'Tab' && ref.current) {
        const items = ref.current.querySelectorAll('a[href], button:not([disabled])');
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (previous && previous.focus) previous.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
}
