'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * La vidéo de fond du hero.
 *
 * ─── POURQUOI ELLE NE REMPLACE PAS LA PHOTOGRAPHIE, ELLE SE POSE DESSUS ──
 * La photographie reste sous la vidéo et garde son `priority` : c'est elle
 * qui peint le premier écran, donc elle qui porte le LCP. La vidéo arrive
 * par-dessus quand elle est prête, en fondu.
 *
 * Ce n'est pas une précaution de style, c'est la seule manière d'obtenir
 * trois choses à la fois :
 *   le premier écran est peint tout de suite, sans attendre 4,5 Mo ;
 *   si la vidéo échoue — réseau, codec, économiseur de données — la
 *     photographie reste, et le hero n'a pas de trou ;
 *   en mouvement réduit, on ne lance rien du tout et la photographie
 *     suffit. Une vidéo qui tourne en boucle est exactement ce que cette
 *     préférence demande d'éviter.
 *
 * ─── AUCUN CONTRÔLE, AUCUN SON, AUCUNE PRISE AU CLAVIER ──────────────────
 * `aria-hidden` et `tabIndex={-1}` : c'est un décor, pas un média que
 * l'utilisateur consulte. Il ne doit ni s'annoncer aux lecteurs d'écran ni
 * arrêter la tabulation. Tout le sens du hero est dans le texte à gauche.
 *
 * `muted` est indispensable — sans lui aucun navigateur n'autorise la
 * lecture automatique. `playsInline` empêche iOS de passer en plein écran.
 */

export function HeroVideo({
  src,
  className = '',
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Mouvement réduit : on arrête net et on ne révèle jamais la vidéo.
    // La photographie qui est dessous fait tout le travail.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      v.removeAttribute('autoplay');
      return;
    }

    /* `canplay` et non `loadeddata` : on veut une image ET de quoi
       enchaîner, sinon le fondu révèle une vidéo qui se fige aussitôt. */
    const pret = () => setVisible(true);
    if (v.readyState >= 3) pret();
    v.addEventListener('canplay', pret);

    /* Si la lecture automatique est refusée (économiseur de batterie,
       réglage navigateur), on ne révèle rien : mieux vaut la photographie
       fixe qu'une vidéo arrêtée sur sa première image. */
    void v.play().catch(() => setVisible(false));

    return () => v.removeEventListener('canplay', pret);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
