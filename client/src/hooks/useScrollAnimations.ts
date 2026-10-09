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
        const anim = gsap.from(header, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      }

      // Animate glass cards inside section with subtle stagger
      const cards = sec.querySelectorAll('.glass-card');
      if (cards.length > 0) {
        const anim = gsap.from(cards, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);
}
