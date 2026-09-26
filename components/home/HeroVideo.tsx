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
 *   'lecture'  mouvement accepté, débit non restreint  → la vidéo, 1 000 ko
 *   'fixe'     mouvement réduit OU économiseur de data → le poster, 47 ko
 *
 * ─── LE TÉLÉPHONE A RÉCUPÉRÉ LA VIDÉO, ET VOICI POURQUOI ─────────────────
 * Elle en était exclue pour épargner la 4G. C'était un mauvais calcul : le
 * premier écran du téléphone est CELUI QUE LA MAJORITÉ DES VISITEURS VOIT,
 * et il se retrouvait être le seul écran du site sans rien à regarder — une
 * photographie fixe sous un voile épais. On économisait 1 Mo sur l'écran
 * qui compte le plus.
 *
 * Le fichier fait désormais 1 000 ko (il en faisait 2 756 quand la règle a
 * été posée), le poster est la première image du flux, et le régime 'fixe'
 * couvre les deux cas où il faut vraiment s'abstenir : mouvement réduit et
 * `Save-Data`. Un visiteur en forfait limité ou en mode économie reçoit
 * 47 ko, exactement comme avant.
 *
 * En régime fixe on garde le `<video>` avec son poster mais SANS `src` :
 * l'image affichée reste exactement la même qu'en lecture, puisque le
 * poster est la première image du fichier. Rien ne bouge, rien ne se
 * télécharge au-delà de 47 ko.
 */
type Regime = 'attente' | 'lecture' | 'fixe';

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
    const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* `Save-Data` est la seule déclaration explicite d'un visiteur qui veut
       qu'on épargne sa connexion. On la respecte partout, pas seulement sur
       téléphone. Le type n'est pas standard — d'où la lecture prudente. */
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const economie = nav.connection?.saveData === true;
    setRegime(mouvementReduit || economie ? 'fixe' : 'lecture');
  }, []);

  useEffect(() => {
    /* Un refus de lecture automatique n'est PAS un échec : le poster est
       déjà la bonne image, on la garde simplement fixe. */
    if (regime === 'lecture') void ref.current?.play().catch(() => {});
  }, [regime]);

  if (regime === 'attente') return null;

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
