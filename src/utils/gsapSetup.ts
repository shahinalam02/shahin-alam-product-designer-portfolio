import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Prevent mobile browser toolbar jumpiness while responding to dynamic resizes
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  });

  // Global defaults for snappy, natural motion
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.7,
  });
}

let refreshTimeout: number | undefined;

/**
 * Debounced ScrollTrigger refresh to keep triggers accurately aligned
 * with layout shifts (font loads, image loads, interactive accordions, route changes).
 */
export const refreshScrollTrigger = (delay = 80) => {
  if (typeof window === 'undefined') return;
  clearTimeout(refreshTimeout);
  refreshTimeout = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
};

export { gsap, ScrollTrigger };
