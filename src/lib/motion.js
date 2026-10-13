// Scroll and pointer effects, ported from the original site's data/site.js.
// Elements opt in with data attributes:
//   data-reveal="" | "line" | "scale"  (+ data-delay="ms")   fade/slide in on scroll
//   data-parallax="0.05"   data-depth="-20" (inside data-scene)   subtle movement
//   data-magnetic   data-tilt   data-marquee   data-spin="10"   data-rotate="a|b|c"
//   data-steps > data-step (with data-dot / data-line)   data-progress   data-nav
// Everything is skipped when the visitor prefers reduced motion.

export function initMotion(root, { firstLoad = false } = {}) {
  if (!root || typeof window === 'undefined') return () => {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = 'cubic-bezier(.2,.7,.2,1)';
  const cleanups = [];
  const qa = (sel) => root.querySelectorAll(sel);

  /* ---------- Reveal on scroll ---------- */
  const show = (el) => {
    el.style.opacity = '';
    el.style.transform = '';
  };
  let io = null;
  if (!reduced && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target._rv || e.target);
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    qa('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      // On the first (pre-rendered) load, content already painted stays put.
      if (firstLoad && inView) return;
      const d = +(el.getAttribute('data-delay') || 0);
      const kind = el.getAttribute('data-reveal');
      if (kind === 'line') el.style.transform = 'translateY(105%)';
      else if (kind === 'scale') {
        el.style.opacity = '0';
        el.style.transform = 'scale(.96) translateY(24px)';
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
      }
      el.style.transition = `opacity .9s ${ease} ${d}ms, transform 1s ${ease} ${d}ms`;
      if (kind === 'line' && el.parentElement) {
        el.parentElement._rv = el;
        io.observe(el.parentElement);
      } else io.observe(el);
      if (inView) setTimeout(() => show(el), 30);
    });
    const fallback = setTimeout(() => qa('[data-reveal]').forEach(show), 4000);
    cleanups.push(() => clearTimeout(fallback), () => io.disconnect());
  }

  /* ---------- Scroll: progress bar, header, parallax, process steps ---------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      const bar = document.querySelector('[data-progress]');
      if (bar) bar.style.transform = `scaleX(${Math.min(1, y / Math.max(1, dh - vh))})`;
      const nav = document.querySelector('[data-nav]');
      if (nav) nav.toggleAttribute('data-scrolled', y > 30);
      if (!reduced)
        qa('[data-parallax]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          el.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * +el.getAttribute('data-parallax')).toFixed(1)}px`;
        });
      qa('[data-steps]').forEach((wrap) => {
        const r = wrap.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (r.height + vh * 0.2)));
        const steps = wrap.querySelectorAll('[data-step]');
        steps.forEach((s, i) => s.toggleAttribute('data-on', reduced || p >= ((i + 0.5) / steps.length) * 0.9));
      });
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  cleanups.push(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  });

  if (reduced) return () => cleanups.forEach((f) => f());

  /* ---------- Pointer: tilt, magnetic buttons, depth ---------- */
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const t = e.target.closest && e.target.closest('[data-tilt]');
    qa('[data-tilt][data-tilting]').forEach((el) => {
      if (el !== t) {
        el.removeAttribute('data-tilting');
        el.style.transform = '';
      }
    });
    if (t) {
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      t.setAttribute('data-tilting', '');
      t.style.transform = `perspective(1200px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    }
    const m = e.target.closest && e.target.closest('[data-magnetic]');
    qa('[data-magnetic][data-mag]').forEach((el) => {
      if (el !== m) {
        el.removeAttribute('data-mag');
        el.style.translate = '';
      }
    });
    if (m) {
      const b = m.getBoundingClientRect();
      m.setAttribute('data-mag', '');
      m.style.translate = `${((e.clientX - b.left - b.width / 2) * 0.22).toFixed(1)}px ${((e.clientY - b.top - b.height / 2) * 0.3).toFixed(1)}px`;
    }
    qa('[data-scene]').forEach((sc) => {
      if (sc.getBoundingClientRect().bottom < 0) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      sc.querySelectorAll('[data-depth]').forEach((el) => {
        const d = +el.getAttribute('data-depth');
        el.style.translate = `${(x * d).toFixed(1)}px ${(y * d).toFixed(1)}px`;
      });
    });
  };
  root.addEventListener('pointermove', onMove);
  cleanups.push(() => root.removeEventListener('pointermove', onMove));

  /* ---------- Continuous: spin badge, marquee ---------- */
  let raf;
  let off = 0;
  const t0 = performance.now();
  const loop = () => {
    const now = performance.now();
    qa('[data-spin]').forEach((el) => {
      el.style.transform = `rotate(${(((now - t0) / 1000) * +(el.getAttribute('data-spin') || 8)) % 360}deg)`;
    });
    qa('[data-marquee]').forEach((m) => {
      const w = m.scrollWidth / 2;
      if (!w) return;
      off = (off + 0.45) % w;
      m.style.transform = `translateX(${-off}px)`;
    });
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  cleanups.push(() => cancelAnimationFrame(raf));

  /* ---------- Rotating words ---------- */
  const rot = setInterval(() => {
    qa('[data-rotate]').forEach((el) => {
      const words = el.getAttribute('data-rotate').split('|');
      const i = (+(el.getAttribute('data-ri') || 0) + 1) % words.length;
      el.setAttribute('data-ri', i);
      el.style.transition = 'opacity .3s ease, transform .3s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        el.textContent = words[i];
        el.style.transition = 'none';
        el.style.transform = 'translateY(8px)';
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.transition = 'opacity .35s ease, transform .35s ease';
            el.style.opacity = '';
            el.style.transform = '';
          })
        );
      }, 300);
    });
  }, 2600);
  cleanups.push(() => clearInterval(rot));

  return () => cleanups.forEach((f) => f());
}
