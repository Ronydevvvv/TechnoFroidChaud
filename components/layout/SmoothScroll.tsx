'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Défilement fluide. Dossier §10 : lerp 0.085.
 *
 * Trois précautions :
 *  — désactivé en mouvement réduit, et désactivé sur écran tactile, où
 *    l'inertie native du système est meilleure que toute réimplémentation ;
 *  — `anchors` géré par Lenis pour que les ancres internes restent fluides ;
 *  — l'instance est exposée sur window pour que ScrollTrigger puisse s'y
 *    synchroniser en phase 4, sans réécrire ce composant.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
      anchors: true,
    });

    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
