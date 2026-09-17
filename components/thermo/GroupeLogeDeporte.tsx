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

const W = 300;
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
            <g className="tfc-helice">
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
            <g className="tfc-helice">
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

export function GroupeLogeDeporte({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 24 ${W * 2 + 104} ${H - 6}`}
      aria-hidden
      focusable="false"
      className={`w-full text-ink ${className}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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

      <Etat x={0} deporte={false} />
      <Etat x={W + 60} deporte />

      {/* Les deux désignations, sous le sol commun. */}
      {[
        [0, 'GROUPE LOGÉ', 'Chaleur et bruit en salle'],
        [W + 60, 'GROUPE À DISTANCE', 'Chaleur rejetée dehors'],
      ].map(([dx, titre, sous]) => (
        <g key={titre as string} transform={`translate(${dx} 0)`}>
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
            {titre as string}
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
            {sous as string}
          </text>
        </g>
      ))}
    </svg>
  );
}
