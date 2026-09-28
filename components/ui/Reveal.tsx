'use client';

import { useEffect, useRef, useState, type ReactNode, type Ref } from 'react';

/**
 * Apparition au défilement.
 *
 * Une opacité et huit pixels de translation. C'est tout.
 *
 * La version précédente empilait des décalages en cascade, des filets qui
 * se traçaient et des lueurs qui montaient. Additionnés, ces mouvements se
 * remarquaient — et une animation qu'on remarque sur un site d'entreprise
 * est une animation de trop. Ici, le visiteur doit sentir que la page se
 * pose, sans pouvoir dire ce qui a bougé.
 *
 * ─── POURQUOI CE COMPOSANT N'UTILISE PLUS FRAMER-MOTION ──────────────────
 * Il l'utilisait pour exactement deux choses : passer l'opacité de 0 à 1,
 * et la translation de 8 px à 0, une fois, à l'entrée dans le champ. Le
 * navigateur sait faire les deux — `IntersectionObserver` pour le
 * déclenchement, une transition CSS pour le mouvement.
 *
 * Le coût, lui, n'était pas symbolique : framer-motion pèse une
 * cinquantaine de kilo-octets compressés, et ce composant est employé
 * environ trois cents fois, sur toutes les pages. La bibliothèque partait
 * donc vers chaque visiteur, sur chaque page, pour un fondu.
 *
 * Le CSS de repli existait d'ailleurs déjà dans `globals.css` — `.reveal`
 * et son `@media (scripting: none)` — vestige d'une implémentation native
 * antérieure. Il redevient le mécanisme, au lieu d'être du code mort.
 *
 * ─── CE QUI NE CHANGE PAS ────────────────────────────────────────────────
 * Durée, courbe, seuil de déclenchement, déclenchement unique, délai en
 * cascade : les valeurs sont reprises une à une. À l'écran, rien ne bouge.
 *
 * ─── SANS JAVASCRIPT, ET EN MOUVEMENT RÉDUIT ─────────────────────────────
 * `@media (scripting: none)` rend le contenu visible d'emblée : une page
 * dont le JavaScript échoue reste lisible, ce qui n'était pas garanti quand
 * l'état initial était écrit en style en ligne par la bibliothèque.
 * En mouvement réduit, on n'observe rien et on affiche tout de suite.
 */

type Props = {
  children: ReactNode;
  /** Décalage en cascade, en secondes. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header' | 'figure';
};

export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [vu, setVu] = useState(false);

  /* L'union des six balises donne au `ref` un type intersection que rien ne
     satisfait — `HTMLLIElement` n'est pas un `HTMLDivElement`. On fige donc
     la balise sur une seule pour le typage ; à l'exécution c'est bien celle
     demandée qui est rendue, la chaîne étant passée telle quelle. */
  const Tag = as as 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el || vu) return;

    /* Mouvement réduit, ou navigateur sans observateur : on montre, point.
       Rien ne doit dépendre d'une animation pour être lisible. */
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVu(true);
      return;
    }

    /* Le même seuil que la bibliothèque employait : on déclenche quand
       l'élément a vraiment pénétré le champ, pas au premier pixel. */
    const obs = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) {
          setVu(true);
          obs.disconnect();
        }
      },
      { rootMargin: '-8% 0px -6% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [vu]);

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      className={`reveal${vu ? ' reveal-vu' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
