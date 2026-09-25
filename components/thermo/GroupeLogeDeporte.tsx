/**
 * Groupe logé / groupe à distance — schéma comparatif.
 *
 * ─── CE QU'IL DIT, ET D'OÙ ÇA VIENT ──────────────────────────────────────
 * Le contenu de la page tient en une phrase : « Groupe logé ou à distance.
 * Le report du groupe supprime le bruit et la chaleur en salle. » C'est un
 * arbitrage, et un arbitrage se compare — deux états côte à côte, pas un
 * paragraphe.
 *
 * Rien n'est ajouté : le dessin affirme exactement ce que la phrase
 * affirme. Aucune puissance, aucun niveau sonore, aucune cote chiffrée.
 *
 * ─── POURQUOI UNE ÉLÉVATION ET NON UNE AXONOMÉTRIE ───────────────────────
 * `/chambres-froides` porte déjà une axonométrie éclatée. Reprendre la même
 * projection ferait de ces planches une série, donc un gabarit. Ici, deux
 * élévations frontales — la projection la plus plate qui soit, et la bonne
 * pour une comparaison : les deux états se lisent d'un seul coup d'œil,
 * sans que la perspective en avantage un.
 *
 * ─── LE CODE COULEUR NE CHANGE PAS D'UNE PAGE À L'AUTRE ──────────────────
 *   rouge  la chaleur rejetée — dedans à gauche, dehors à droite
 *   cyan   la liaison frigorifique
 *   encre  le bâti, le mobilier, le sol
 *
 * C'est le seul rouge de la page, et il n'est là que parce que le dessin
 * parle littéralement de chaleur rejetée en salle.
 */

type Props = {
  /** Décalage horizontal, pour poser les deux états côte à côte. */
  x: number;
  /** `true` : le groupe est reporté dehors. */
  deporte: boolean;
};

/**
 * ─── LARGEUR D'UN ÉTAT, ET POURQUOI 258 ET NON 300 ───────────────────────
 * Le meuble s'arrête à 150 et le refend — la limite dedans/dehors — était
 * posé à `W - 58`, donc à 242. Entre les deux : 92 unités de sol vide, soit
 * 31 % de la largeur de chaque état. C'est là qu'était la sensation de
 * flottement, pas dans les marges de la page, qui sont normales.
 *
 * À 258, le refend tombe à 200 et l'écart passe à 50 unités — assez pour
 * qu'on voie une pièce, plus assez pour qu'on voie un terrain vague. Tout
 * ce qui est « dehors » reste ancré sur `W` et suit donc le mur : unité
 * extérieure, liaison, flèches de chaleur.
 */
const W = 258;
const H = 250;
/** Niveau du sol, commun aux deux états — sinon la comparaison boite. */
const SOL = 196;

function Etat({ x, deporte }: Props) {
  return (
    <g transform={`translate(${x} 0)`}>
      {/* Le local : sol et refend. Le refend est la limite dedans/dehors. */}
      <path d={`M8 ${SOL} L${W - 8} ${SOL}`} stroke="currentColor" strokeWidth={1.4} opacity={0.6} />
      <path
        d={`M${W - 58} ${SOL} L${W - 58} 46`}
        stroke="currentColor"
        strokeWidth={1.4}
        opacity={0.45}
      />

      {/* Le meuble réfrigéré : caisson, vitre inclinée, bandeau. */}
      <path d={`M40 ${SOL} L40 120 L150 120 L150 ${SOL} Z`} stroke="currentColor" strokeWidth={1.4} />
      <path d={`M40 120 L150 120 L150 96 L58 96 Z`} stroke="currentColor" strokeWidth={1.2} opacity={0.8} />
      <path d={`M48 ${SOL - 14} L142 ${SOL - 14}`} stroke="currentColor" strokeWidth={0.9} opacity={0.4} />
      <path d={`M48 ${SOL - 34} L142 ${SOL - 34}`} stroke="currentColor" strokeWidth={0.9} opacity={0.4} />

      {deporte ? (
        <>
          {/* La liaison traverse le refend et rejoint l'unité extérieure. */}
          <path
            d={`M150 ${SOL - 52} L${W - 30} ${SOL - 52} L${W - 30} ${SOL - 74}`}
            stroke="var(--color-brand)"
            strokeWidth={1.5}
            opacity={0.55}
          />
          <path
            d={`M150 ${SOL - 52} L${W - 30} ${SOL - 52} L${W - 30} ${SOL - 74}`}
            stroke="var(--color-brand)"
            strokeWidth={2.6}
            strokeDasharray="18 200"
            className="tfc-circule"
          />
          {/* L'unité extérieure, au-delà du refend. */}
          <path
            d={`M${W - 52} ${SOL - 74} L${W - 8} ${SOL - 74} L${W - 8} ${SOL - 118} L${W - 52} ${SOL - 118} Z`}
            stroke="currentColor"
            strokeWidth={1.4}
          />
          <g transform={`translate(${W - 30} ${SOL - 96})`}>
            <circle r={13} stroke="currentColor" strokeWidth={1} opacity={0.6} />
            {/* `transformBox: fill-box` en style local, comme sur les autres
                   planches : sans lui la rotation se fait autour de
                   l'ORIGINE du SVG, et les trois pales décollent du moyeu
                   pour orbiter hors du cadre. La classe `.tfc-helice` ne
                   peut pas le porter — elle est partagée, et chaque hélice
                   a son propre centre. */}
            <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
              {[0, 120, 240].map((a) => (
                <path
                  key={a}
                  d="M0 0 C4 -4 5 -9 2 -12 C-2 -9 -3 -4 0 0 Z"
                  transform={`rotate(${a})`}
                  stroke="currentColor"
                  strokeWidth={0.9}
                  opacity={0.7}
                />
              ))}
            </g>
          </g>
          {/* La chaleur part dehors. */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${W - 4} ${SOL - 112 + i * 16} L${W + 26} ${SOL - 120 + i * 16}`}
              stroke="var(--color-alert)"
              strokeWidth={1.5}
              opacity={0.85}
              markerEnd="url(#tfc-fl-chaud-2d)"
            />
          ))}
        </>
      ) : (
        <>
          {/* Le groupe est dans le socle du meuble. */}
          <path d={`M56 ${SOL} L56 ${SOL - 30} L118 ${SOL - 30} L118 ${SOL} Z`} stroke="currentColor" strokeWidth={1.3} />
          <g transform={`translate(${87} ${SOL - 15})`}>
            <circle r={9} stroke="currentColor" strokeWidth={0.9} opacity={0.6} />
            {/* `transformBox: fill-box` en style local, comme sur les autres
                   planches : sans lui la rotation se fait autour de
                   l'ORIGINE du SVG, et les trois pales décollent du moyeu
                   pour orbiter hors du cadre. La classe `.tfc-helice` ne
                   peut pas le porter — elle est partagée, et chaque hélice
                   a son propre centre. */}
            <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
              {[0, 120, 240].map((a) => (
                <path
                  key={a}
                  d="M0 0 C3 -3 4 -6 1.5 -8.5 C-1.5 -6 -2 -3 0 0 Z"
                  transform={`rotate(${a})`}
                  stroke="currentColor"
                  strokeWidth={0.8}
                  opacity={0.7}
                />
              ))}
            </g>
          </g>
          {/* La chaleur reste en salle. */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${62 + i * 26} ${SOL - 36} L${56 + i * 26} ${SOL - 74}`}
              stroke="var(--color-alert)"
              strokeWidth={1.5}
              opacity={0.85}
              markerEnd="url(#tfc-fl-chaud-2d)"
            />
          ))}
          {/* Le bruit, en salle lui aussi : trois arcs concentriques. */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${132 + i * 11} ${SOL - 26} A ${16 + i * 11} ${16 + i * 11} 0 0 1 ${132 + i * 11} ${SOL - 4}`}
              stroke="currentColor"
              strokeWidth={1.1}
              opacity={0.5 - i * 0.12}
            />
          ))}
        </>
      )}
    </g>
  );
}

/** Les deux désignations, au mot près, partagées par les deux compositions. */
const NOMS: [string, string][] = [
  ['GROUPE LOGÉ', 'Chaleur et bruit en salle'],
  ['GROUPE À DISTANCE', 'Chaleur rejetée dehors'],
];

/** La pointe de flèche rouge. Un seul `marker` pour les deux compositions. */
function Marqueur() {
  return (
    <defs>
      <marker
        id="tfc-fl-chaud-2d"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--color-alert)" strokeWidth="1.8" />
      </marker>
    </defs>
  );
}

/** Le cartouche d'un état : filet, désignation, conséquence. */
function Nom({ dx, titre, sous }: { dx: number; titre: string; sous: string }) {
  return (
    <g transform={`translate(${dx} 0)`}>
      <path d={`M8 ${SOL + 26} L150 ${SOL + 26}`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
      <text
        x={8}
        y={SOL + 46}
        fontSize={13}
        letterSpacing={1.4}
        fill="currentColor"
        stroke="none"
        className="font-[family-name:var(--font-sans)]"
      >
        {titre}
      </text>
      <text
        x={8}
        y={SOL + 64}
        fontSize={12}
        fill="currentColor"
        stroke="none"
        opacity={0.55}
        className="font-[family-name:var(--font-sans)]"
      >
        {sous}
      </text>
    </g>
  );
}

const CADRE = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/**
 * ─── DEUX COMPOSITIONS, PAS UNE RÉDUCTION ────────────────────────────────
 * LARGE  les deux états CÔTE À CÔTE. C'est la seule disposition qui permet
 *        de comparer : l'œil passe de l'un à l'autre sans rien mémoriser.
 *
 * ÉTROIT les deux états EMPILÉS, chacun sur toute la largeur. Côte à côte
 *        à 375 px, chaque moitié tombait à 160 px et les désignations à
 *        cinq pixels de haut — la planche devenait un ornement illisible.
 *        Empilés, le dessin garde sa taille et les intitulés leur corps ;
 *        on compare de haut en bas au lieu de gauche à droite, ce qui est
 *        la seule chose qu'on perde.
 *
 * Le dessin est le MÊME dans les deux cas : `Etat` est appelé à l'identique,
 * seul le cadrage change. C'est ce que demande la règle des planches du
 * site — une géométrie par largeur, jamais un SVG rétréci.
 */
export function GroupeLogeDeporte({ className = '' }: { className?: string }) {
  return (
    <>
      {/* ═══ CÔTE À CÔTE — au-dessus de 640 px ═══ */}
      <svg
        viewBox={`0 40 ${W * 2 + 104} ${H - 22}`}
        aria-hidden
        focusable="false"
        className={`hidden w-full text-ink sm:block ${className}`}
        {...CADRE}
      >
        <Marqueur />
        <Etat x={0} deporte={false} />
        <Etat x={W + 60} deporte />
        {NOMS.map(([t, sc], i) => (
          <Nom key={t} dx={i * (W + 60)} titre={t} sous={sc} />
        ))}
      </svg>

      {/* ═══ EMPILÉS — en dessous de 640 px ═══ */}
      <div className={`flex flex-col gap-4 sm:hidden ${className}`}>
        {NOMS.map(([t, sc], i) => (
          <svg
            key={t}
            /* `W + 40` et non `W + 16` : l'état « à distance » pousse son
               groupe et ses flèches jusqu'à 326 unités, mesuré sur la
               bbox réelle. Le même cadrage pour les deux planches, sinon
               elles ne seraient plus à la même échelle et la comparaison
               deviendrait fausse. */
            viewBox={`0 40 ${W + 40} ${H - 22}`}
            aria-hidden
            focusable="false"
            className="w-full text-ink"
            {...CADRE}
          >
            {i === 0 ? <Marqueur /> : null}
            <Etat x={0} deporte={i === 1} />
            <Nom dx={0} titre={t} sous={sc} />
          </svg>
        ))}
      </div>
    </>
  );
}
