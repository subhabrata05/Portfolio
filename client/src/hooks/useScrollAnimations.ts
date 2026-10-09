import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    // Respect user accessibility preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const triggers: ScrollTrigger[] = [];

    // Subtle kinetic entrance for section headers and cards
    const sectionContainers = document.querySelectorAll('section:not(#hero)');

    sectionContainers.forEach((sec) => {
      const header = sec.querySelector('.max-w-6xl > div:first-child');
      if (header) {
        const anim = gsap.fromTo(
          header,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: header,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      }

      // Animate glass cards inside section with subtle stagger
      const cards = sec.querySelectorAll('.glass-card');
      if (cards.length > 0) {
        const anim = gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);
}
