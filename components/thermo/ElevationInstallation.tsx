/**
 * L'installation frigorifique — élévation frontale.
 *
 * ─── CE QU'ELLE REMPLACE, ET POURQUOI ────────────────────────────────────
 * Un schéma comparatif de 704 unités de large, rendu à 335 px sur
 * téléphone : ses désignations tombaient à 6,2 px de haut. C'était le SVG
 * du bureau réduit — le défaut que ce site s'interdit. Il y a donc ici DEUX
 * compositions, et la seconde n'est pas une réduction de la première.
 *
 * ─── POURQUOI UNE ÉLÉVATION, ET PAS UNE COUPE ────────────────────────────
 * L'accueil porte déjà une coupe de bâtiment, et elle montre déjà trois de
 * ces quatre consignes. Reprendre une coupe ici ferait de la planche une
 * redite de la référence.
 *
 * La différence est tenue strictement : l'accueil dessine un BÂTIMENT —
 * murs, dalle, étages, pièces. Cette planche dessine des MACHINES. Une
 * ligne de sol, un refend, et rien d'autre en fait d'architecture. Ce qui
 * est décrit ici n'est pas un lieu, c'est un équipement.
 *
 * ─── L'IDÉE : LE FROID D'UN CÔTÉ, LA CHALEUR DE L'AUTRE ──────────────────
 * Un point de froid ne fabrique pas du froid : il prend de la chaleur
 * quelque part et la pose ailleurs. Le refend partage la planche en deux,
 * et tout le dessin tient dans cette lecture — le cyan descend vers les
 * évaporateurs, le rouge sort au-dessus du groupe.
 *
 * La vitrine est l'exception, et c'est elle qui rend l'arbitrage visible :
 * son groupe est LOGÉ, donc son rouge part dans la salle au lieu de sortir.
 * C'est la phrase du contenu — « le report du groupe supprime le bruit et
 * la chaleur en salle » — dessinée au lieu d'être affirmée.
 *
 * ─── ELLE NE PORTE AUCUNE TEMPÉRATURE, ET C'EST VOULU ────────────────────
 * La colonne thermique, plus haut sur la page, est la source unique des
 * consignes. Les porter ici aussi les affichait deux fois à un écran
 * d'intervalle — deux dessins pour une seule donnée.
 *
 * Le partage est net, et chaque pièce répond à une question :
 *   la colonne      à quelle température, et à quel écart l'une de l'autre
 *   l'élévation     où sont les machines, comment elles sont reliées, par
 *                   où circule le froid, où part la chaleur
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * Les quatre désignations sont celles du projet, au caractère près. Aucune
 * puissance, aucune cote, aucun diamètre, aucun débit : le projet n'en
 * contient aucun, et une valeur inventée sur un plan est un mensonge qui a
 * l'air d'une preuve.
 *
 * C'est une élévation DE PRINCIPE, et le cartouche de la page le dit. Elle
 * ne représente aucune installation particulière et n'affirme donc pas que
 * ces quatre postes seraient servis par un seul groupe.
 *
 * ─── LE CODE COULEUR NE CHANGE PAS D'UNE PAGE À L'AUTRE ──────────────────
 *   cyan   le fluide frigorigène — le seul cyan de la planche
 *   rouge  la chaleur rejetée, et rien d'autre : dehors au-dessus du
 *          groupe, en salle au-dessus de la vitrine
 *   encre  les machines, le sol, le refend
 */

export type Poste = {
  /** Désignation courte, telle qu'elle est écrite dans le projet. */
  nom: string;
};

/**
 * Les quatre postes. Le composant ne porte QUE des désignations : plus
 * aucune température ne transite par lui.
 */
type Props = { postes: readonly Poste[]; className?: string };

/* ═══════════════════════════════════════════════════════════════════════
   LA PLANCHE LARGE — au-dessus de 1024 px
   ═══════════════════════════════════════════════════════════════════════ */

const SOL = 400;
const DALLE = 96;
const REFEND = 980;

/** Abscisses des quatre postes : [début, fin]. */
const POSTES_X: readonly [number, number][] = [
  [70, 250],
  [286, 466],
  [502, 664],
  [700, 946],
];

function ElevationLarge({ postes, className }: Props) {
  const evaps: [number, number, number][] = [
    // [x gauche, x droite, y haut] — les trois évaporateurs alimentés
    [120, 200, 168],
    [336, 416, 168],
    [790, 870, 150],
  ];
  const spineY = 118;

  return (
    <svg
      viewBox="24 84 1248 406"
      aria-hidden
      focusable="false"
      className={`hidden w-full text-ink lg:block ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <marker
          id="tfc-rf-chaud-l"
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

      {/* ── Le sol, commun au dedans et au dehors, et le refend ── */}
      <path d={`M40 ${SOL} L1248 ${SOL}`} stroke="currentColor" strokeWidth={1.5} opacity={0.65} />
      <path d={`M40 ${DALLE} L${REFEND} ${DALLE}`} stroke="currentColor" strokeWidth={1} opacity={0.3} />
      <path d={`M40 ${DALLE} L40 ${SOL}`} stroke="currentColor" strokeWidth={1.2} opacity={0.35} />
      <path
        d={`M${REFEND} ${DALLE} L${REFEND} ${SOL}`}
        stroke="currentColor"
        strokeWidth={1.6}
        opacity={0.55}
      />

      {/* ── 1 et 2 : les deux chambres froides ── */}
      {[0, 1].map((i) => {
        const [x0, x1] = POSTES_X[i];
        const [ex0, ex1, ey] = evaps[i];
        return (
          <g key={i}>
            <path
              d={`M${x0} ${SOL} L${x0} 150 L${x1} 150 L${x1} ${SOL}`}
              stroke="currentColor"
              strokeWidth={1.5}
            />
            {/* La porte isotherme, et sa poignée */}
            <path
              d={`M${x0 + 28} ${SOL} L${x0 + 28} 214 L${x0 + 104} 214 L${x0 + 104} ${SOL}`}
              stroke="currentColor"
              strokeWidth={1.2}
              opacity={0.7}
            />
            <path
              d={`M${x0 + 96} 292 L${x0 + 96} 312`}
              stroke="currentColor"
              strokeWidth={2.2}
              opacity={0.8}
            />
            {/* L'évaporateur, et l'air qu'il souffle */}
            <path
              d={`M${ex0} ${ey} L${ex1} ${ey} L${ex1} ${ey + 24} L${ex0} ${ey + 24} Z`}
              stroke="currentColor"
              strokeWidth={1.3}
            />
            {[0, 1, 2].map((j) => (
              <path
                key={j}
                d={`M${ex0 + 10 + j * 26} ${ey + 30} L${ex0 + 4 + j * 26} ${ey + 62}`}
                stroke="var(--color-brand)"
                strokeWidth={1.6}
                strokeDasharray="10 8"
                opacity={0.75}
                className="tfc-flux"
                style={{ animationDelay: `${j * 0.9}s` }}
              />
            ))}
          </g>
        );
      })}

      {/* ── 3 : la vitrine, groupe LOGÉ ── */}
      <g>
        <path d={`M502 ${SOL} L502 286 L664 286 L664 ${SOL}`} stroke="currentColor" strokeWidth={1.5} />
        <path d="M502 286 L664 286 L664 258 L528 258 Z" stroke="currentColor" strokeWidth={1.2} opacity={0.8} />
        <path d={`M512 ${SOL - 16} L654 ${SOL - 16}`} stroke="currentColor" strokeWidth={0.9} opacity={0.35} />
        {/* Le groupe dans le socle */}
        <path d={`M530 ${SOL} L530 ${SOL - 44} L610 ${SOL - 44} L610 ${SOL}`} stroke="currentColor" strokeWidth={1.3} />
        <g transform={`translate(570 ${SOL - 22})`}>
          <circle r={14} stroke="currentColor" strokeWidth={1} opacity={0.6} />
          {/* `transformBox` en style local : `.tfc-helice` est partagée avec
              d'autres planches et `globals.css` ne doit pas bouger. Sans
              lui, `transform-origin: center` se résout au centre de la
              FENÊTRE et les pales tournent en orbite autour du dessin. */}
          <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
            {[0, 120, 240].map((a) => (
              <path
                key={a}
                d="M0 0 C4 -5 6 -10 2 -14 C-3 -10 -4 -5 0 0 Z"
                transform={`rotate(${a})`}
                stroke="currentColor"
                strokeWidth={0.9}
                opacity={0.7}
              />
            ))}
          </g>
        </g>
        {/* Sa chaleur reste en salle — c'est tout l'arbitrage */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${624 + i * 17} 248 L${618 + i * 17} 194`}
            stroke="var(--color-alert)"
            strokeWidth={1.5}
            opacity={0.85}
            markerEnd="url(#tfc-rf-chaud-l)"
          />
        ))}
      </g>

      {/* ── 4 : le laboratoire. Une pièce, donc des limites en tireté ── */}
      <g>
        {[700, 946].map((x) => (
          <path
            key={x}
            d={`M${x} ${DALLE} L${x} ${SOL}`}
            stroke="currentColor"
            strokeWidth={1.1}
            strokeDasharray="5 7"
            opacity={0.5}
          />
        ))}
        <path d="M716 330 L930 330 L930 344 L716 344 Z" stroke="currentColor" strokeWidth={1.3} />
        <path d={`M730 344 L730 ${SOL}`} stroke="currentColor" strokeWidth={1} opacity={0.5} />
        <path d={`M916 344 L916 ${SOL}`} stroke="currentColor" strokeWidth={1} opacity={0.5} />
        <path d="M790 150 L870 150 L870 174 L790 174 Z" stroke="currentColor" strokeWidth={1.3} />
        {[0, 1, 2].map((j) => (
          <path
            key={j}
            d={`M${800 + j * 26} 180 L${794 + j * 26} 212`}
            stroke="var(--color-brand)"
            strokeWidth={1.6}
            strokeDasharray="10 8"
            opacity={0.75}
            className="tfc-flux"
            style={{ animationDelay: `${j * 0.9}s` }}
          />
        ))}
      </g>

      {/* ── Le réseau : une antenne sous la dalle, trois descentes ── */}
      <path
        d={`M966 ${spineY} L160 ${spineY}`}
        stroke="var(--color-brand)"
        strokeWidth={1.6}
        opacity={0.5}
      />
      {evaps.map(([ex0, ex1, ey]) => {
        const cx = (ex0 + ex1) / 2;
        return (
          <path
            key={cx}
            d={`M${cx} ${spineY} L${cx} ${ey}`}
            stroke="var(--color-brand)"
            strokeWidth={1.6}
            opacity={0.5}
          />
        );
      })}
      <path
        d={`M1044 255 L1000 255 L1000 ${spineY} L160 ${spineY}`}
        stroke="var(--color-brand)"
        strokeWidth={1.6}
        opacity={0.5}
      />
      <path
        d={`M1044 255 L1000 255 L1000 ${spineY} L160 ${spineY}`}
        stroke="var(--color-brand)"
        strokeWidth={2.8}
        strokeDasharray="24 560"
        className="tfc-circule"
      />

      {/* ── Le groupe, dehors, sur son châssis ── */}
      <g>
        <path d="M1044 300 L1044 210 L1204 210 L1204 300 Z" stroke="currentColor" strokeWidth={1.5} />
        {[1064, 1184].map((x) => (
          <path key={x} d={`M${x} 300 L${x} ${SOL}`} stroke="currentColor" strokeWidth={1.2} opacity={0.6} />
        ))}
        <path d="M1044 300 L1204 300" stroke="currentColor" strokeWidth={1.2} opacity={0.6} />
        <g transform="translate(1124 255)">
          <circle r={34} stroke="currentColor" strokeWidth={1.1} opacity={0.65} />
          <circle r={22} stroke="currentColor" strokeWidth={0.8} opacity={0.4} />
          <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
            {[0, 120, 240].map((a) => (
              <path
                key={a}
                d="M0 0 C9 -10 12 -22 4 -30 C-5 -23 -7 -11 0 0 Z"
                transform={`rotate(${a})`}
                stroke="currentColor"
                strokeWidth={1.1}
                opacity={0.7}
              />
            ))}
          </g>
        </g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${1064 + i * 44} 204 L${1084 + i * 44} 152`}
            stroke="var(--color-alert)"
            strokeWidth={1.6}
            opacity={0.85}
            markerEnd="url(#tfc-rf-chaud-l)"
          />
        ))}
      </g>

      {/* ── Les désignations, sous la ligne de sol ── */}
      {postes.map((p, i) => {
        const x = POSTES_X[i][0];
        return (
          <g key={p.nom}>
            <path
              d={`M${x} ${SOL + 28} L${x + 140} ${SOL + 28}`}
              stroke="currentColor"
              strokeWidth={1.4}
              opacity={0.85}
            />
            <text
              x={x}
              y={SOL + 50}
              fontSize={15}
              letterSpacing={1.4}
              fill="currentColor"
              stroke="none"
              className="font-[family-name:var(--font-sans)]"
            >
              {p.nom.toUpperCase()}
            </text>
          </g>
        );
      })}
      <g>
        <path d={`M1044 ${SOL + 28} L1184 ${SOL + 28}`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
        <text
          x={1044}
          y={SOL + 50}
          fontSize={15}
          letterSpacing={1.4}
          fill="currentColor"
          stroke="none"
          className="font-[family-name:var(--font-sans)]"
        >
          GROUPE
        </text>
        <text
          x={1044}
          y={SOL + 74}
          fontSize={15}
          fill="currentColor"
          stroke="none"
          opacity={0.72}
          className="font-[family-name:var(--font-sans)]"
        >
          Chaleur rejetée dehors
        </text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LA PLANCHE COMPACTE — sous 1024 px
   ───────────────────────────────────────────────────────────────────────
   Ce n'est PAS la planche large réduite, et ce n'est même pas la même
   mise en page. Quatre postes alignés sur 1248 unités ramenées à 335 px
   donneraient 80 px par machine : plus une élévation, une frise.

   La planche compacte garde la projection — chaque poste reste vu de
   face — et change la DISTRIBUTION : les quatre postes sont empilés, le
   réseau devient une colonne montante dans la marge gauche, et le groupe
   passe sous le refend, en bas. C'est la mise en page d'une colonne de
   distribution, et elle tombe dans le sens d'un téléphone.

   Trois simplifications, chacune au service de la lecture :
     aucun texte dans le dessin — les désignations passent en HTML sous la
       planche, où elles gardent le corps du reste du site ;
     les sous-détails tombent — poignées, plans de travail, secondes
       lignes de caisson, cercle intérieur du ventilateur ;
     les traits restants montent d'un cran et les flux s'épaississent.
   ═══════════════════════════════════════════════════════════════════════ */

/** Ordonnée du haut de chaque poste, dans l'ordre du registre. */
const RANGS = [30, 126, 222, 312];
const RISER = 28;

function ElevationCompacte({ className }: { className?: string }) {
  return (
    <svg
      viewBox="10 14 320 496"
      aria-hidden
      focusable="false"
      className={`mx-auto w-full max-w-[24rem] text-ink lg:hidden ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <marker
          id="tfc-rf-chaud-c"
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

      {/* ── La colonne montante, dans la marge ── */}
      <path
        d={`M${RISER} 46 L${RISER} 452 L150 452`}
        stroke="var(--color-brand)"
        strokeWidth={1.8}
        opacity={0.5}
      />
      <path
        d={`M${RISER} 46 L${RISER} 452 L150 452`}
        stroke="var(--color-brand)"
        strokeWidth={2.6}
        strokeDasharray="22 420"
        className="tfc-circule"
      />

      {/* ── 1 et 2 : les chambres ── */}
      {[0, 1].map((i) => {
        const y = RANGS[i];
        const sol = y + 68;
        return (
          <g key={i}>
            <path d={`M52 ${sol} L232 ${sol}`} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
            <path
              d={`M62 ${sol} L62 ${y} L212 ${y} L212 ${sol}`}
              stroke="currentColor"
              strokeWidth={1.7}
            />
            <path
              d={`M${RISER} ${y + 20} L78 ${y + 20}`}
              stroke="var(--color-brand)"
              strokeWidth={1.8}
              opacity={0.5}
            />
            <path
              d={`M78 ${y + 10} L134 ${y + 10} L134 ${y + 30} L78 ${y + 30} Z`}
              stroke="currentColor"
              strokeWidth={1.5}
            />
            {[0, 1].map((j) => (
              <path
                key={j}
                d={`M${90 + j * 26} ${y + 36} L${84 + j * 26} ${y + 58}`}
                stroke="var(--color-brand)"
                strokeWidth={2.2}
                strokeDasharray="8 7"
                opacity={0.8}
                className="tfc-flux"
                style={{ animationDelay: `${j}s` }}
              />
            ))}
            <path
              d={`M150 ${sol} L150 ${y + 26} L196 ${y + 26} L196 ${sol}`}
              stroke="currentColor"
              strokeWidth={1.3}
              opacity={0.65}
            />
          </g>
        );
      })}

      {/* ── 3 : la vitrine, groupe logé, chaleur en salle ── */}
      <g>
        <path d={`M52 ${RANGS[2] + 62} L232 ${RANGS[2] + 62}`} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
        <path
          d={`M62 ${RANGS[2] + 62} L62 ${RANGS[2] + 22} L212 ${RANGS[2] + 22} L212 ${RANGS[2] + 62}`}
          stroke="currentColor"
          strokeWidth={1.7}
        />
        <path
          d={`M62 ${RANGS[2] + 22} L212 ${RANGS[2] + 22} L212 ${RANGS[2]} L96 ${RANGS[2]} Z`}
          stroke="currentColor"
          strokeWidth={1.4}
          opacity={0.8}
        />
        <path
          d={`M96 ${RANGS[2] + 62} L96 ${RANGS[2] + 38} L162 ${RANGS[2] + 38} L162 ${RANGS[2] + 62}`}
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <g transform={`translate(129 ${RANGS[2] + 50})`}>
          <circle r={11} stroke="currentColor" strokeWidth={1.1} opacity={0.6} />
          <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
            {[0, 120, 240].map((a) => (
              <path
                key={a}
                d="M0 0 C3 -4 5 -8 1.5 -11 C-2.5 -8 -3 -4 0 0 Z"
                transform={`rotate(${a})`}
                stroke="currentColor"
                strokeWidth={1.1}
                opacity={0.7}
              />
            ))}
          </g>
        </g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${222 + i * 15} ${RANGS[2] + 44} L${216 + i * 15} ${RANGS[2] + 8}`}
            stroke="var(--color-alert)"
            strokeWidth={2}
            opacity={0.85}
            markerEnd="url(#tfc-rf-chaud-c)"
          />
        ))}
      </g>

      {/* ── 4 : le laboratoire ── */}
      <g>
        <path d={`M52 ${RANGS[3] + 64} L232 ${RANGS[3] + 64}`} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
        {[62, 212].map((x) => (
          <path
            key={x}
            d={`M${x} ${RANGS[3]} L${x} ${RANGS[3] + 64}`}
            stroke="currentColor"
            strokeWidth={1.3}
            strokeDasharray="5 7"
            opacity={0.55}
          />
        ))}
        <path
          d={`M${RISER} ${RANGS[3] + 20} L78 ${RANGS[3] + 20}`}
          stroke="var(--color-brand)"
          strokeWidth={1.8}
          opacity={0.5}
        />
        <path
          d={`M78 ${RANGS[3] + 10} L134 ${RANGS[3] + 10} L134 ${RANGS[3] + 30} L78 ${RANGS[3] + 30} Z`}
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d={`M84 ${RANGS[3] + 50} L200 ${RANGS[3] + 50} L200 ${RANGS[3] + 58} L84 ${RANGS[3] + 58} Z`}
          stroke="currentColor"
          strokeWidth={1.4}
        />
      </g>

      {/* ── Le refend, puis le groupe dehors ── */}
      <path d="M16 424 L312 424" stroke="currentColor" strokeWidth={1.9} opacity={0.6} />
      <g>
        <path d="M150 494 L150 436 L264 436 L264 494 Z" stroke="currentColor" strokeWidth={1.7} />
        <g transform="translate(207 465)">
          <circle r={21} stroke="currentColor" strokeWidth={1.3} opacity={0.65} />
          <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
            {[0, 120, 240].map((a) => (
              <path
                key={a}
                d="M0 0 C6 -7 8 -15 3 -19 C-4 -15 -5 -7 0 0 Z"
                transform={`rotate(${a})`}
                stroke="currentColor"
                strokeWidth={1.3}
                opacity={0.7}
              />
            ))}
          </g>
        </g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M272 ${446 + i * 18} L306 ${440 + i * 18}`}
            stroke="var(--color-alert)"
            strokeWidth={2}
            opacity={0.85}
            markerEnd="url(#tfc-rf-chaud-c)"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Le composant exporté : deux planches, deux mises en page, un seul jeu de
 * conventions. Au-dessus de 1024 px l'élévation large et ses désignations ;
 * en dessous, la colonne de distribution, sans aucun texte — la légende
 * HTML de la page prend le relais.
 */
export function ElevationInstallation({ postes, className }: Props) {
  return (
    <>
      <ElevationLarge postes={postes} className={className} />
      <ElevationCompacte className={className} />
    </>
  );
}
