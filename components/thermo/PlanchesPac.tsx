import {
  CIEL,
  SOL,
  Consoles,
  Coupe,
  Groupe,
  Jet,
  Mural,
} from '@/components/thermo/PlanchePoses';

/**
 * Les quatre configurations de pompe à chaleur, en coupe.
 *
 * ─── MÊME LANGAGE QUE /climatisation, ET LITTÉRALEMENT ───────────────────
 * Les primitives sont IMPORTÉES de `PlanchePoses` : même `viewBox`, même
 * sol, même plafond, mêmes murs en coupe hachurée, mêmes caissons, même
 * épaisseur de trait. Rien n'est recopié — si une convention change
 * là-bas, elle change ici. C'est ce qui fait une série plutôt que quatre
 * dessins qui se ressemblent.
 *
 * ─── CE QUI LES DISTINGUE VRAIMENT ───────────────────────────────────────
 *   air / air     ce qui circule dedans est de l'AIR. Une unité murale,
 *                 pas une goutte d'eau, et le seul des quatre à souffler.
 *   air / eau     ce qui circule dedans est de l'EAU. Un circuit fermé,
 *                 départ et retour, deux émetteurs. Aucun soufflage.
 *   relève        DEUX producteurs sur le même circuit — la pompe dehors
 *                 et la chaudière dedans. C'est le seul dessin à montrer
 *                 une bifurcation, et c'est tout le sujet.
 *   chauffe-eau   UN seul appareil, vertical, sans rien dehors. Ni mur de
 *                 façade, ni liaison, ni émetteur : un ballon coiffé de
 *                 son module. Le seul des quatre sans extérieur.
 *
 * ─── LES DEUX COULEURS, ET LEUR RÈGLE ────────────────────────────────────
 *   rouge  la chaleur RENDUE — air soufflé chaud, eau de chauffage
 *   cyan   l'air extérieur PRIS, et la circulation
 *
 * Une pompe à chaleur prend de l'énergie à l'air et la rend à l'intérieur :
 * les deux couleurs disent ce transfert, et c'est la seule information que
 * le contenu de `content/services.ts` affirme. Aucune puissance, aucun COP,
 * aucune température, aucun diamètre, aucune cote.
 */

export type Config = 'air-air' | 'air-eau' | 'releve' | 'chauffe-eau';

const MUR = 238;
const EP = 9;

/** Le fourreau de traversée : il interrompt le hachurage du mur. */
function Fourreau({ y, h = 20 }: { y: number; h?: number }) {
  return (
    <path
      d={`M${MUR} ${y}h${EP}v${h}h-${EP}z`}
      fill="var(--color-paper)"
      stroke="currentColor"
      strokeWidth={1.2}
    />
  );
}

/**
 * L'air extérieur capté par le groupe. Trois flèches cyan qui ENTRENT —
 * c'est le sens qui compte : la pompe prend, elle ne rejette pas.
 */
function AirCapte({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          /* Les flèches partent du BORD du cadre et s'arrêtent au flanc
             du groupe. Tracées plus courtes au premier jet, elles se
             superposaient au caisson : de l'air dessiné PAR-DESSUS la
             machine qui le capte ne se lit plus comme une entrée. */
          d={`M${x + 50} ${y + 8 + i * 13}h-20`}
          stroke="var(--color-brand)"
          strokeWidth={1.5}
          strokeDasharray="9 7"
          strokeLinecap="round"
          className="tfc-flux"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </g>
  );
}

/** Un émetteur : radiateur en coupe, ailettes verticales. */
function Emetteur({ x, w = 44, h = 34 }: { x: number; w?: number; h?: number }) {
  return (
    <g>
      <path
        d={`M${x} ${SOL - h - 10}h${w}v${h}h-${w}z`}
        fill="var(--color-alert)"
        fillOpacity={0.07}
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M${x + 8 + i * ((w - 16) / 3)} ${SOL - h - 4}v${h - 12}`}
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.45}
        />
      ))}
      <path d={`M${x + 8} ${SOL - 10}v10M${x + w - 8} ${SOL - 10}v10`} stroke="currentColor" strokeWidth={1} opacity={0.6} />
    </g>
  );
}

/** Un circuit d'eau : le tracé pâle, puis la pastille qui y circule. */
function Circuit({ d, delai = 0, inverse = false }: { d: string; delai?: number; inverse?: boolean }) {
  return (
    <g>
      <path d={d} stroke="var(--color-alert)" strokeWidth={1.5} opacity={0.55} />
      <path
        d={d}
        stroke="var(--color-alert)"
        strokeWidth={2.6}
        strokeDasharray="16 260"
        className={inverse ? 'tfc-circule-inverse' : 'tfc-circule'}
        style={{ animationDelay: `${delai}s` }}
      />
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   1 — AIR / AIR   ce qui circule dedans est de l'air
   ═══════════════════════════════════════════════════════════════════════ */

function AirAir() {
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M18 ${CIEL}h${MUR - 18}`} stroke="currentColor" strokeWidth={2.2} />
      <Coupe id="tfc-pac-aa-mur" x={MUR} y={CIEL} l={SOL - CIEL} ep={EP} />

      <Mural x={176} y={42} />
      <Fourreau y={64} />

      <path d={`M224 59v10h${MUR - 224 + EP + 18}v30h14`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
      <path d={`M216 59v20h${MUR - 216 + EP + 10}v22h22`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
      <circle cx={MUR + EP / 2} cy={69} r={2} fill="currentColor" opacity={0.7} />

      <Consoles mur={MUR + EP} x={268} y={92} h={42} />
      <Groupe x={268} y={92} />
      <AirCapte x={288} y={96} />

      {/* Le soufflage est CHAUD : c'est ce que la pompe restitue. Seul des
          quatre dessins où la chaleur sort par de l'air. */}
      {[
        ['M174 48 Q126 56 74 82', 0],
        ['M174 54 Q120 72 62 114', 0.9],
        ['M174 60 Q114 92 54 146', 1.8],
      ].map(([d, t]) => (
        <path
          key={d as string}
          d={d as string}
          stroke="var(--color-alert)"
          strokeWidth={1.6}
          strokeDasharray="11 9"
          strokeLinecap="round"
          className="tfc-flux"
          style={{ animationDelay: `${t}s` }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2 — AIR / EAU   ce qui circule dedans est de l'eau
   ═══════════════════════════════════════════════════════════════════════ */

function AirEau() {
  const yD = SOL - 62;
  const yR = SOL - 50;
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M18 ${CIEL}h${MUR - 18}`} stroke="currentColor" strokeWidth={2.2} />
      <Coupe id="tfc-pac-ae-mur" x={MUR} y={CIEL} l={SOL - CIEL} ep={EP} />

      <Fourreau y={yD - 8} h={26} />

      <Consoles mur={MUR + EP} x={268} y={72} h={42} />
      <Groupe x={268} y={72} />
      <AirCapte x={288} y={76} />

      {/* Le circuit fermé : un départ qui alimente les deux émetteurs, un
          retour qui revient au groupe. Aucun soufflage — c'est ce qui
          sépare cette configuration de la précédente. */}
      <Circuit d={`M${MUR + EP + 14} 114v${yD - 114}H60v${SOL - 44 - yD}`} />
      <Circuit d={`M150 ${SOL - 44}v${yR - (SOL - 44)}H${MUR + EP + 26}V114`} delai={-5} inverse />
      <path d={`M60 ${yD}h90`} stroke="var(--color-alert)" strokeWidth={1.5} opacity={0.55} />

      <Emetteur x={40} />
      <Emetteur x={128} />

      {/* Le circulateur, sur le retour */}
      <circle cx={196} cy={yR} r={7} stroke="currentColor" strokeWidth={1.2} fill="var(--color-paper)" />
      <path d={`M192 ${yR}h8M196 ${yR - 4}v8`} stroke="currentColor" strokeWidth={1} opacity={0.6} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3 — RELÈVE DE CHAUDIÈRE   deux producteurs, un seul circuit
   ═══════════════════════════════════════════════════════════════════════ */

function Releve() {
  const yD = SOL - 62;
  const NOEUD = 150;
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M18 ${CIEL}h${MUR - 18}`} stroke="currentColor" strokeWidth={2.2} />
      <Coupe id="tfc-pac-rv-mur" x={MUR} y={CIEL} l={SOL - CIEL} ep={EP} />

      <Fourreau y={yD - 8} h={22} />

      <Consoles mur={MUR + EP} x={268} y={72} h={42} />
      <Groupe x={268} y={72} />
      <AirCapte x={288} y={76} />

      {/* La chaudière, DEDANS. C'est le second producteur, et c'est lui
          qui fait toute la différence avec l'air / eau. */}
      <path
        d={`M34 ${SOL - 92}h54v66h-54z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <path d={`M42 ${SOL - 82}h38M42 ${SOL - 72}h38`} stroke="currentColor" strokeWidth={0.8} opacity={0.4} />
      <path d={`M48 ${SOL - 54}h26v14h-26z`} stroke="currentColor" strokeWidth={1.1} opacity={0.7} />
      <path d={`M52 ${SOL - 92}v-10M70 ${SOL - 92}v-10`} stroke="currentColor" strokeWidth={1} opacity={0.5} />

      {/* LA BIFURCATION : les deux arrivées se rejoignent sur un nœud, et
          un seul départ continue vers l'émetteur. */}
      <Circuit d={`M${MUR + EP + 14} 114v${yD - 114}H${NOEUD}`} />
      <Circuit d={`M88 ${SOL - 70}H${NOEUD}V${yD}`} delai={-4} />
      <circle cx={NOEUD} cy={yD} r={3} fill="var(--color-alert)" opacity={0.85} />
      <Circuit d={`M${NOEUD} ${yD}H208v${SOL - 44 - yD}`} delai={-2} />

      <Emetteur x={186} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   4 — CHAUFFE-EAU THERMODYNAMIQUE   un seul appareil, rien dehors
   ═══════════════════════════════════════════════════════════════════════ */

function ChauffeEau() {
  const CX = 150;
  const LARG = 76;
  const HAUT = SOL - 30;
  const MOD = HAUT - 42;
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M18 ${CIEL}h304`} stroke="currentColor" strokeWidth={2.2} />

      {/* Le ballon. Aucun mur de façade, aucune liaison, aucun émetteur :
          c'est le seul des quatre dessins entièrement intérieur, et c'est
          ce vide autour de lui qui le dit. */}
      <path
        d={`M${CX - LARG / 2} ${MOD}h${LARG}v${SOL - MOD - 10}h-${LARG}z`}
        fill="var(--color-alert)"
        fillOpacity={0.06}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d={`M${CX - LARG / 2 + 12} ${SOL - 10}v10M${CX + LARG / 2 - 12} ${SOL - 10}v10`} stroke="currentColor" strokeWidth={1.1} opacity={0.7} />

      {/* Le module thermodynamique, posé sur le ballon */}
      <path
        d={`M${CX - LARG / 2} ${MOD - 34}h${LARG}v34h-${LARG}z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <g transform={`translate(${CX} ${MOD - 17})`}>
        <circle r={11} stroke="currentColor" strokeWidth={1} opacity={0.55} />
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

      {/* L'air ambiant entre d'un côté, ressort de l'autre — c'est là que
          la pompe prend son énergie, et c'est la seule chose qui bouge
          autour de l'appareil. */}
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${CX - LARG / 2 - 46} ${MOD - 26 + i * 12}h34`}
          stroke="var(--color-brand)"
          strokeWidth={1.5}
          strokeDasharray="9 7"
          strokeLinecap="round"
          className="tfc-flux"
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${CX + LARG / 2 + 12} ${MOD - 26 + i * 12}h34`}
          stroke="var(--color-brand)"
          strokeWidth={1.5}
          strokeDasharray="9 7"
          strokeLinecap="round"
          opacity={0.55}
          className="tfc-flux"
          style={{ animationDelay: `${0.4 + i * 0.8}s` }}
        />
      ))}

      {/* Le départ d'eau chaude sanitaire, en haut du ballon */}
      {/* Le départ d'eau chaude descend jusqu'au sol. Il s'arrêtait à
          vingt-six unités au-dessus au premier jet — une canalisation qui
          finit dans le vide se lit comme un oubli, pas comme un départ. */}
      <Circuit d={`M${CX + LARG / 2} ${MOD + 16}h64v${SOL - (MOD + 16)}`} />

      {/* Le niveau d'eau, deux filets dans le volume */}
      <path
        d={`M${CX - LARG / 2 + 10} ${MOD + 30}h${LARG - 20}M${CX - LARG / 2 + 10} ${MOD + 46}h${LARG - 20}`}
        stroke="currentColor"
        strokeWidth={0.8}
        opacity={0.35}
      />
    </>
  );
}

const DESSINS: Record<Config, () => React.ReactElement> = {
  'air-air': AirAir,
  'air-eau': AirEau,
  releve: Releve,
  'chauffe-eau': ChauffeEau,
};

export function PlanchePac({ config, className = '' }: { config: Config; className?: string }) {
  const Dessin = DESSINS[config];
  return (
    <svg
      viewBox="0 0 340 182"
      aria-hidden
      focusable="false"
      fill="none"
      strokeLinejoin="round"
      className={`w-full text-ink ${className}`}
    >
      <Dessin />
    </svg>
  );
}
