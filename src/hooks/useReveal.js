import { useEffect, useRef } from 'react';

/**
 * Adds an `is-visible` class when the element enters the viewport.
 * Used together with `.reveal` class defined in index.css.
 *
 * @param {object} options
 * @param {number} [options.threshold=0.1] - IntersectionObserver threshold
 * @param {string} [options.rootMargin='0px 0px -10% 0px'] - IntersectionObserver rootMargin
 * @param {boolean} [options.once=true] - Whether to unobserve after first reveal
 * @returns {React.RefObject<HTMLElement>}
 */
export function useReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -8% 0px',
  once = true
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced motion: skip the observer, mark as visible immediately
    if (typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
