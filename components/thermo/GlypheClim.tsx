/**
 * Les quatre poses de climatisation, en glyphes.
 *
 * ─── POURQUOI CES QUATRE-LÀ, ET PAS DES ICÔNES ───────────────────────────
 * La nomenclature disait « Mono-split », « Multi-split », « Gainable »,
 * « Cassette » — quatre mots qui ne veulent rien dire pour quelqu'un qui
 * n'est pas du métier. Or la différence entre ces quatre poses est
 * entièrement GÉOMÉTRIQUE : où est l'appareil, et par où sort l'air.
 *
 * Chaque glyphe dessine donc exactement cela, et rien d'autre :
 *
 *   mono      une unité, un volume, une nappe d'air
 *   multi     un groupe extérieur, deux unités intérieures
 *   gainable  un réseau en combles, trois bouches vers le bas
 *   cassette  un carré en faux plafond, quatre jets
 *
 * Aucune bibliothèque d'icônes : un flocon et une maison ne distinguent pas
 * un gainable d'une cassette. Ces marques sont le seul moyen de faire voir
 * la différence avant de la lire.
 *
 * ─── LE CYAN NE COLORE QUE L'AIR ─────────────────────────────────────────
 * Le matériel est en `currentColor`, donc il suit la couleur du texte et
 * s'éclaire avec la ligne. Seuls les jets d'air sont cyan. C'est la même
 * grammaire que toutes les planches du site : la couleur dit le fluide,
 * jamais l'objet.
 *
 * 24 unités de côté, trait de 1,4. Aucun aplat, aucun arrondi décoratif.
 */

type Pose = 'mono' | 'multi' | 'gainable' | 'cassette';

/** Un jet d'air : trait cyan court, incliné, toujours orienté vers le bas. */
const jet = (x: number, y: number, dx: number, dy: number, k = '') => (
  <path
    key={k || `${x}-${y}`}
    d={`M${x} ${y} L${x + dx} ${y + dy}`}
    stroke="var(--color-brand)"
    strokeWidth={1.4}
    strokeLinecap="round"
  />
);

const TRACES: Record<Pose, React.ReactNode> = {
  /* MURAL. Le trait vertical à gauche est un MUR : c'est lui qui distingue
     cette pose des deux suivantes, qui sont des poses de PLAFOND. Sans ce
     repère, une unité murale et un gainable se ressemblent — un caisson
     horizontal avec de l'air dessous dans les deux cas. */
  mono: (
    <>
      <path d="M2 2.5v19" />
      <path d="M2 5h13v4.5H2z" />
      <path d="M4.5 7.2h8" />
      {[0, 1, 2].map((i) => jet(5 + i * 4.5, 11.5, -1.5, 6.5, `m${i}`))}
    </>
  ),
  /* DEUX VOLUMES, UN SEUL GROUPE. C'est le nombre d'unités qui porte
     l'information : un caisson dehors, deux dedans, reliés par la liaison
     frigorifique en cyan. */
  multi: (
    <>
      <path d="M1.5 9h6v6.5h-6z" />
      <path d="M3 12.2h3" />
      <path d="M13.5 3.5h9v4h-9z" />
      <path d="M13.5 15h9v4h-9z" />
      <path d="M7.5 11.5h3v-6h3" stroke="var(--color-brand)" strokeWidth={1.2} />
      <path d="M7.5 13.5h3v3.5h3" stroke="var(--color-brand)" strokeWidth={1.2} />
      {jet(16, 8.4, -1.3, 3.6, 'a')}
      {jet(20, 19.9, -1.3, 2.6, 'b')}
    </>
  ),
  /* PLAFOND ET RÉSEAU. Le trait horizontal en tête est le plafond, le
     caisson est caché AU-DESSUS de lui — d'où le tireté — et seules les
     bouches redescendent. C'est tout le propos du gainable : on ne voit
     que les bouches. */
  gainable: (
    <>
      <path d="M1.5 9.5h21" />
      <path d="M5 4h14v5.5H5z" strokeDasharray="2.6 2.2" opacity={0.55} />
      {[7.5, 12, 16.5].map((x, i) => (
        <path key={i} d={`M${x - 1.6} 9.5h3.2v2h-3.2z`} />
      ))}
      {[7.5, 12, 16.5].map((x, i) => jet(x, 12.8, 0, 7, `g${i}`))}
    </>
  ),
  /* PLAFOND ET QUATRE CÔTÉS. Même plafond que le gainable, mais un seul
     appareil encastré, et l'air part en éventail des quatre bords. La
     symétrie est l'information. */
  cassette: (
    <>
      <path d="M1.5 7.5h21" />
      <path d="M7.5 7.5h9v3.5h-9z" />
      <path d="M10 9.4h4" />
      {jet(7.5, 12, -4.5, 6, 'c1')}
      {jet(10.4, 12.4, -1.6, 7, 'c2')}
      {jet(13.6, 12.4, 1.6, 7, 'c3')}
      {jet(16.5, 12, 4.5, 6, 'c4')}
    </>
  ),
};

export function GlypheClim({ pose, className = '' }: { pose: Pose; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {TRACES[pose]}
    </svg>
  );
}

export type { Pose };
