import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Prevent mobile browser toolbar jumpiness
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

export { gsap, ScrollTrigger };
