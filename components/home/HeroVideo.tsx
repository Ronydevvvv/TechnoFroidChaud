'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * La vidéo de fond du hero.
 *
 * ─── LE DÉFAUT QUE CE FICHIER CORRIGE ────────────────────────────────────
 * La version précédente affichait la PHOTOGRAPHIE, puis révélait la vidéo
 * en fondu de 1,2 s une fois `canplay` atteint. Avec `preload="metadata"`,
 * le navigateur ne chargeait presque rien avant la lecture : le visiteur
 * voyait donc la photographie pendant une à trois secondes, puis un
 * changement complet d'image. Deux médias différents qui se succèdent, ça
 * ne se lit pas comme un chargement — ça se lit comme un défaut.
 *
 * ─── LA SOLUTION : UN POSTER TIRÉ DE LA VIDÉO ELLE-MÊME ──────────────────
 * `public/video/hero-poster.jpg` est la PREMIÈRE IMAGE de la vidéo,
 * extraite du fichier. Le navigateur la peint immédiatement, sans attendre
 * un seul octet de flux vidéo — et quand la lecture démarre, elle reprend
 * exactement sur cette image.
 *
 * Il n'y a donc plus de transition à masquer : l'image affichée avant la
 * lecture et la première image lue sont la même. Le hero est « vidéo »
 * dès le premier rendu, visuellement parlant.
 *
 * La vidéo est par conséquent à `opacity-100` d'emblée. Le fondu de 1,2 s
 * a disparu avec la raison qui le justifiait.
 *
 * ─── LA PHOTOGRAPHIE RESTE, MAIS ELLE CHANGE DE RÔLE ─────────────────────
 * Elle ne sert plus de première image : elle est le REPLI, et seulement
 * lui. On ne la découvre que si la vidéo échoue vraiment — codec refusé,
 * fichier introuvable, économiseur de données. `onError` remet alors la
 * vidéo à `opacity-0` et la photographie reparaît.
 *
 * Elle garde son `priority` dans `Hero.tsx` : elle reste le filet de
 * sécurité du premier écran, et son coût est déjà payé par le cache.
 *
 * ─── MOUVEMENT RÉDUIT ────────────────────────────────────────────────────
 * On met en pause et on retire `autoplay`, mais on LAISSE la vidéo
 * visible : ce qu'on voit alors est son poster, c'est-à-dire une image
 * fixe. C'est exactement ce que la préférence demande — plus aucun
 * mouvement — sans priver le visiteur du visuel.
 *
 * ─── AUCUN CONTRÔLE, AUCUN SON, AUCUNE PRISE AU CLAVIER ──────────────────
 * `aria-hidden` et `tabIndex={-1}` : c'est un décor, pas un média qu'on
 * consulte. Il ne doit ni s'annoncer aux lecteurs d'écran ni arrêter la
 * tabulation. Tout le sens du hero est dans le texte à gauche.
 *
 * `muted` est indispensable — sans lui aucun navigateur n'autorise la
 * lecture automatique. `playsInline` empêche iOS de passer en plein écran.
 */

export function HeroVideo({
  src,
  poster,
  className = '',
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  /** Faux uniquement si la vidéo échoue : on rend alors la photo au hero. */
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    /* Mouvement réduit : on fige sur le poster. La vidéo reste visible —
       une image fixe ne contrevient à rien, et la masquer ferait
       réapparaître une AUTRE image, donc un changement de visuel selon la
       préférence système. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      v.removeAttribute('autoplay');
      return;
    }

    /* Un refus de lecture automatique n'est PAS un échec : le poster est
       déjà la bonne image, on la garde simplement fixe. */
    void v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      /* `auto` et non `metadata` : la vidéo fait 2,76 Mo et le poster tient
         le premier écran pendant son chargement. Rien ne sert de retarder
         le flux — c'est ce retard qui faisait durer l'ancien décalage. */
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onError={() => setOk(false)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
        ok ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
