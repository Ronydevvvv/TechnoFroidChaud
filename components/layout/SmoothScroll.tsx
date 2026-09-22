'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  /** Vrai le temps d'une navigation RETOUR / AVANCE du navigateur. */
  const parHistorique = useRef(false);

  useEffect(() => {
    const onPop = () => {
      parHistorique.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /**
   * ─── LE BUG QUE CECI CORRIGE ───────────────────────────────────────────
   * Lenis tient SON PROPRE état de défilement et le réécrit sur la fenêtre à
   * chaque image. Au changement de route, Next remet bien la fenêtre à zéro —
   * puis la boucle `raf` de Lenis, qui ignore la navigation, repose aussitôt
   * l'ancienne position. Résultat : on arrivait sur `/climatisation` au
   * milieu de la page, à la hauteur d'où l'on venait sur l'accueil.
   *
   * Il faut donc remettre LENIS à zéro, pas la fenêtre.
   *
   * ─── POURQUOI CE N'EST PAS INCONDITIONNEL ──────────────────────────────
   * `/#methode` existe sur plusieurs pages métier. Sur une URL qui porte une
   * ancre, la cible n'est pas le haut de page : on ne touche à rien et on
   * laisse Lenis suivre l'ancre, ce qu'il sait faire (`anchors: true`).
   *
   * `immediate` : un retour animé depuis le bas de la page précédente vers
   * le haut de la nouvelle serait un défilement fantôme de plusieurs
   * milliers de pixels. On se place, on n'anime pas.
   *
   * ─── ET SURTOUT : LE BOUTON RETOUR N'EST PAS TOUCHÉ ────────────────────
   * Sur un RETOUR ou une AVANCE, le comportement attendu est l'inverse —
   * l'utilisateur veut retrouver la page là où il l'avait laissée, et c'est
   * Next qui restaure cette position. Forcer le haut de page y serait une
   * régression, pas un correctif. Le drapeau `parHistorique` laisse donc
   * ces navigations strictement inchangées.
   */
  useEffect(() => {
    if (parHistorique.current) {
      parHistorique.current = false;
      return;
    }
    if (window.location.hash) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

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
