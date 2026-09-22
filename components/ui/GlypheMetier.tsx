/**
 * Les glyphes de métier.
 *
 * ─── POURQUOI PAS UN JEU D'ICÔNES ────────────────────────────────────────
 * Aucune bibliothèque ne contient « chambre froide », « groupe frigorifique »
 * ou « pompe à chaleur ». On y trouve un flocon, une maison et un
 * thermomètre — c'est-à-dire la signalétique de n'importe quel site de
 * chauffagiste, et exactement l'effet « template » que ce site s'interdit.
 *
 * Ces six glyphes sont donc des RÉDUCTIONS des planches techniques déjà
 * dessinées pour les pages métier. Chacun cite la sienne :
 *
 *   chambre froide  le volume et sa porte isotherme  → /chambres-froides
 *   réfrigération   le meuble et son bandeau vitré   → /refrigeration
 *   climatisation   l'unité murale et l'air soufflé  → /climatisation
 *   chauffage       le radiateur et ses ailettes     → /chauffage
 *   pompe à chaleur le rotor dans son cercle         → /pompes-a-chaleur
 *   dépannage       la ligne d'état qui décroche     → /entretien-depannage
 *
 * Ce ne sont pas des illustrations posées à côté d'un mot : ce sont les
 * mêmes objets que les planches, au 1/20e. Un visiteur qui descend la page
 * retrouve dans la planche ce qu'il a vu dans la liste.
 *
 * ─── CONTRAINTES DE DESSIN ───────────────────────────────────────────────
 * 16 unités de côté, trait de 1,3, `currentColor`, aucun aplat, aucun
 * arrondi décoratif. Ils héritent donc de la couleur de la ligne et
 * s'éclairent avec elle au survol, sans une seule règle de couleur propre.
 */

type Metier =
  | 'chambre-froide'
  | 'refrigeration'
  | 'climatisation'
  | 'chauffage'
  | 'pac'
  | 'depannage';

const TRACES: Record<Metier, React.ReactNode> = {
  /* Le volume isolé, vu de face, et sa porte. */
  'chambre-froide': (
    <>
      <path d="M2.2 2.6h11.6v10.8H2.2z" />
      <path d="M8.4 2.6v10.8" />
      <path d="M10.9 8.4v1.6" />
    </>
  ),
  /* Le meuble réfrigéré : caisson, bandeau vitré incliné, socle. */
  refrigeration: (
    <>
      <path d="M2.4 6.2h11.2v7.2H2.4z" />
      <path d="M2.4 6.2 5 3.1h8.6v3.1" />
      <path d="M2.4 11h11.2" />
    </>
  ),
  /* L'unité intérieure et les deux traits d'air soufflé. */
  climatisation: (
    <>
      <path d="M2.2 3.1h11.6v3.6H2.2z" />
      <path d="M4.6 6.7 3.4 13" />
      <path d="M8 6.7 8 13" />
      <path d="M11.4 6.7l1.2 6.3" />
    </>
  ),
  /* Le radiateur : enveloppe et ailettes — celui du réseau en peigne. */
  chauffage: (
    <>
      <path d="M2.4 3.4h11.2v9.2H2.4z" />
      <path d="M5.2 5.4v5.2M8 5.4v5.2M10.8 5.4v5.2" />
    </>
  ),
  /* Le groupe extérieur : son cercle et trois pales radiales.
     Les trois pales pleines de la planche deviennent trois traits — à
     16 unités, une pale dessinée se referme sur elle-même et le glyphe
     n'est plus qu'une tache. */
  pac: (
    <>
      <circle cx="8" cy="8" r="5.7" />
      <path d="M8 8 8 3.4" />
      <path d="M8 8 12 10.3" />
      <path d="M8 8 4 10.3" />
    </>
  ),
  /* La ligne d'état qui décroche : en service, défaut, à l'arrêt.
     C'est le chronogramme de la page, réduit à sa seule marche. */
  depannage: (
    <>
      <path d="M1.8 4.6h4.2l2.4 6h5.8" />
      <circle cx="8.2" cy="7.6" r="1.5" />
    </>
  ),
};

export function GlypheMetier({
  metier,
  className = '',
}: {
  metier: Metier;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {TRACES[metier]}
    </svg>
  );
}

export type { Metier };
