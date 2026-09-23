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

/**
 * ─── TROIS RÉGIMES, ET UN SEUL TÉLÉCHARGE LA VIDÉO ───────────────────────
 * La page d'accueil pesait 3 151 ko, dont 2 692 pour ce seul fichier — 85 %.
 * Les autres pages du site font 205 à 372 ko. Le même flux partait vers un
 * téléphone en 4G, derrière un texte qui le recouvre.
 *
 *   'lecture'  ≥ 1024 px, mouvement accepté   → la vidéo, 1 000 ko
 *   'fixe'     ≥ 1024 px, mouvement réduit    → le poster seul, 47 ko
 *   'absente'  < 1024 px                      → rien, la photo suffit
 *
 * Sous 1024 px, la photographie du hero est DÉJÀ chargée en `priority` et
 * déjà cadrée pour l'écran étroit (`object-[88%_50%]`). Poser une vidéo
 * par-dessus n'ajoute aucune information : cela rejoue la même scène, à
 * 1 Mo, sur la connexion qui les compte. Le hero reste un hero
 * photographique — c'est sa composition d'origine.
 *
 * En mouvement réduit, on garde le `<video>` avec son poster mais SANS
 * `src` : l'image affichée reste exactement la même qu'en lecture, puisque
 * le poster est la première image du fichier. Rien ne bouge, rien ne se
 * télécharge au-delà de 47 ko.
 */
type Regime = 'attente' | 'lecture' | 'fixe' | 'absente';

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
  /* 'attente' au premier rendu : le régime dépend de la fenêtre et d'une
     préférence système, qui n'existent ni l'une ni l'autre sur le serveur.
     Rien n'est donc émis dans le HTML — et rien ne se télécharge avant que
     le client ait tranché. */
  const [regime, setRegime] = useState<Regime>('attente');

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return setRegime('absente');
    setRegime(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'fixe' : 'lecture',
    );
  }, []);

  useEffect(() => {
    /* Un refus de lecture automatique n'est PAS un échec : le poster est
       déjà la bonne image, on la garde simplement fixe. */
    if (regime === 'lecture') void ref.current?.play().catch(() => {});
  }, [regime]);

  if (regime === 'attente' || regime === 'absente') return null;

  return (
    <video
      ref={ref}
      /* Pas de `src` en régime fixe : le poster suffit, et il est la
         première image du fichier — donc le même visuel, à 47 ko. */
      src={regime === 'lecture' ? src : undefined}
      poster={poster}
      autoPlay={regime === 'lecture'}
      muted
      loop
      playsInline
      /* `auto` : la vidéo fait maintenant 1 000 ko et le poster tient le
         premier écran pendant son chargement. Rien ne sert de retarder le
         flux — c'est ce retard qui faisait durer l'ancien décalage. */
      preload={regime === 'lecture' ? 'auto' : 'none'}
      aria-hidden
      tabIndex={-1}
      onError={() => setOk(false)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
        ok ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
