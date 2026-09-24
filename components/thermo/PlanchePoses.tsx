import type { Pose } from '@/components/thermo/GlypheClim';

/**
 * Les quatre poses de climatisation, en coupe.
 *
 * ─── CE QUE REMPLACE CETTE PLANCHE ───────────────────────────────────────
 * Les quatre configurations étaient une liste : un glyphe de 36 px, un
 * titre, un paragraphe. À cette taille un glyphe ne montre pas une pose —
 * il la signale. Le lecteur qui hésite entre gainable et cassette n'avait
 * donc rien à REGARDER, seulement à lire.
 *
 * ─── CE QUI DISTINGUE LES QUATRE DESSINS ─────────────────────────────────
 * Ils ne partagent ni leur architecture, ni leur nombre d'appareils, ni
 * leur façon de souffler. C'est voulu : quatre variantes d'un même dessin
 * ne feraient que quatre fois le même dessin.
 *
 *   mono       une pièce ouverte, UN mur de façade en coupe, une unité
 *              murale, un groupe sur consoles. Le sujet est la LIAISON et
 *              sa traversée de mur.
 *   multi      DEUX pièces séparées par un refend, deux unités adossées,
 *              deux liaisons distinctes jusqu'à une nourrice commune. Le
 *              sujet est la convergence : plusieurs vers un seul.
 *   gainable   un plénum hachuré, une unité SUSPENDUE, une gaine à double
 *              paroi qui se réduit en cours de route, trois descentes.
 *              Le sujet est le réseau.
 *   cassette   un plafond, un caisson encastré, et un DÉTAIL EN PLAN —
 *              le seul des quatre à porter une seconde vue. Le sujet est
 *              la diffusion sur quatre côtés, qu'une coupe seule ne peut
 *              pas montrer.
 *
 * ─── LE VOCABULAIRE EST CELUI DES AUTRES PLANCHES ────────────────────────
 * Traits d'encre pour l'architecture et le matériel, cyan pour l'air
 * soufflé et pour lui seul. Aucun rouge : rien ne chauffe ici. Aucun
 * aplat, aucune ombre, aucun dégradé.
 *
 * Les murs sont dessinés en COUPE — deux lignes et un hachurage entre
 * elles — et non en trait simple : c'est ce qui donne une épaisseur au
 * bâtiment, et c'est ce qui permet de montrer un fourreau de traversée.
 *
 * ─── AUCUNE DONNÉE N'EST AVANCÉE ─────────────────────────────────────────
 * Ni puissance, ni longueur de liaison, ni débit, ni température, ni
 * diamètre. Les dessins disent une TOPOLOGIE — ce qui est relié à quoi —
 * et c'est la seule chose que `content/services.ts` affirme.
 *
 * ─── LE MOUVEMENT ────────────────────────────────────────────────────────
 * Seul l'air bouge, avec la classe `tfc-flux` déjà utilisée par la coupe
 * d'accueil et la planche des chambres froides. Les décalages diffèrent
 * d'un dessin à l'autre : un souffle qui part d'une bouche unique ne se
 * cadence pas comme trois bouches en enfilade.
 * `prefers-reduced-motion` l'arrête, comme partout sur le site.
 */

/** L'enveloppe commune : dalle haute, sol bas. */
const CIEL = 28;
const SOL = 168;

/* ───────────────────────────── PRIMITIVES ───────────────────────────── */

/** Un jet d'air : une courbe en tirets, cyan, qui part d'une bouche. */
function Jet({ d, delai = 0, k = 1 }: { d: string; delai?: number; k?: number }) {
  return (
    <path
      d={d}
      stroke="var(--color-brand)"
      strokeWidth={1.6 * k}
      strokeDasharray="11 9"
      strokeLinecap="round"
      className="tfc-flux"
      style={{ animationDelay: `${delai}s` }}
    />
  );
}

/**
 * Un mur en coupe : deux parements et le hachurage entre eux.
 *
 * `vertical` change l'axe. Le hachurage est tracé par un motif de traits
 * obliques : c'est la convention d'un matériau coupé sur un plan, et c'est
 * ce qui distingue un MUR d'un simple trait de séparation.
 */
function Coupe({
  id,
  x,
  y,
  l,
  ep = 8,
  vertical = true,
}: {
  id: string;
  x: number;
  y: number;
  l: number;
  ep?: number;
  vertical?: boolean;
}) {
  const w = vertical ? ep : l;
  const h = vertical ? l : ep;
  /* Les diagonales sont DÉTOURÉES par le rectangle du mur. Sans clip, les
     dernières dépassaient de 20 px hors de la planche : un hachurage est
     borné par le matériau qu'il remplit, pas par le nombre de traits qu'on
     a bien voulu tracer. Compter les traits au plus juste aurait marché
     pour ces cinq murs et cassé au premier changement d'épaisseur. */
  const n = Math.ceil((l + ep) / 11);
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      {vertical ? (
        <>
          <path d={`M${x} ${y}v${l}`} stroke="currentColor" strokeWidth={1.7} />
          <path d={`M${x + ep} ${y}v${l}`} stroke="currentColor" strokeWidth={1.7} />
        </>
      ) : (
        <>
          <path d={`M${x} ${y}h${l}`} stroke="currentColor" strokeWidth={1.7} />
          <path d={`M${x} ${y + ep}h${l}`} stroke="currentColor" strokeWidth={1.7} />
        </>
      )}
      <g clipPath={`url(#${id})`} stroke="currentColor" strokeWidth={0.7} opacity={0.3}>
        {Array.from({ length: n }, (_, i) =>
          vertical ? (
            <path key={i} d={`M${x} ${y - ep + i * 11}l${ep} -${ep}`} />
          ) : (
            <path key={i} d={`M${x - ep + i * 11} ${y + ep}l${ep} -${ep}`} />
          ),
        )}
      </g>
    </g>
  );
}

/**
 * Le groupe extérieur : caisson, hélice, grille de reprise, et consoles.
 *
 * Les consoles ne sont pas un détail décoratif — un groupe ne pose pas au
 * sol dans cette configuration, il est déporté en façade. Sans elles, le
 * caisson flottait.
 */
function Groupe({ x, y, w = 48, h = 42 }: { x: number; y: number; w?: number; h?: number }) {
  const cx = x + w * 0.56;
  const cy = y + h / 2;
  return (
    <g>
      <path d={`M${x} ${y}h${w}v${h}h-${w}z`} stroke="currentColor" strokeWidth={1.5} />
      {/* L'hélice, de face */}
      <circle cx={cx} cy={cy} r={12} stroke="currentColor" strokeWidth={1} opacity={0.55} />
      {[0, 120, 240].map((a) => (
        <path
          key={a}
          d={`M${cx} ${cy}L${(cx + 10.5 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(cy + 10.5 * Math.sin((a * Math.PI) / 180)).toFixed(1)}`}
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.4}
        />
      ))}
      <circle cx={cx} cy={cy} r={2.6} fill="currentColor" opacity={0.5} />
      {/* La reprise d'air, sur le flanc gauche */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${x + 5} ${y + 9 + i * 8}h${w * 0.2}`}
          stroke="currentColor"
          strokeWidth={0.8}
          opacity={0.45}
        />
      ))}
    </g>
  );
}

/** Deux consoles de façade, du mur jusqu'au caisson. */
function Consoles({ mur, x, y, h }: { mur: number; x: number; y: number; h: number }) {
  return (
    <g stroke="currentColor" strokeWidth={1.2} opacity={0.7}>
      <path d={`M${mur} ${y + 5}h${x - mur}`} />
      <path d={`M${mur} ${y + h - 5}h${x - mur}`} />
      <path d={`M${mur + 5} ${y + 5}l7 8M${mur + 5} ${y + h - 5}l7 -8`} opacity={0.5} />
    </g>
  );
}

/** Une unité murale : caisson plat, volet de soufflage, voyant. */
function Mural({ x, y, w = 54 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <path d={`M${x} ${y}h${w}v17h-${w}z`} stroke="currentColor" strokeWidth={1.4} />
      {/* Le volet, en partie basse — c'est par là que l'air sort */}
      <path d={`M${x + 4} ${y + 12}h${w - 8}`} stroke="currentColor" strokeWidth={1.1} opacity={0.75} />
      <path d={`M${x + 4} ${y + 5}h${w - 22}`} stroke="currentColor" strokeWidth={0.7} opacity={0.4} />
      <circle cx={x + w - 7} cy={y + 5.5} r={1.3} fill="currentColor" opacity={0.5} />
    </g>
  );
}

/** Une bouche de soufflage : cadre et ailettes. */
function Bouche({ x, y, w = 32 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <path
        d={`M${x} ${y}h${w}v7h-${w}z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.3}
      />
      {[1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${x + (w / 4) * i} ${y}v7`}
          stroke="currentColor"
          strokeWidth={0.7}
          opacity={0.45}
        />
      ))}
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   1 — MONO-SPLIT
   Le sujet : une liaison, et sa traversée de façade.
   ═══════════════════════════════════════════════════════════════════════ */

function Mono() {
  const MUR = 238;
  const EP = 9;
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M18 ${CIEL}h${MUR - 18}`} stroke="currentColor" strokeWidth={2.2} />
      <Coupe id="tfc-cl-mono-mur" x={MUR} y={CIEL} l={SOL - CIEL} ep={EP} />

      <Mural x={176} y={42} />

      {/* ─── LE FOURREAU ───
          La traversée est percée, chemisée, puis rebouchée. Le rectangle
          blanc interrompt le hachurage du mur : c'est ainsi qu'on montre
          un percement sur une coupe — le matériau n'est plus là. */}
      <path
        d={`M${MUR} 64h${EP}v20h-${EP}z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.2}
      />

      {/* Les deux tubes — liquide et gaz — plus la descente des condensats,
          qui s'arrête plus bas et ne rejoint pas le groupe. */}
      <path
        d={`M224 59v10h${MUR - 224 + EP + 18}v30h14`}
        stroke="currentColor"
        strokeWidth={1.4}
        opacity={0.85}
      />
      <path
        d={`M216 59v20h${MUR - 216 + EP + 10}v22h22`}
        stroke="currentColor"
        strokeWidth={1.4}
        opacity={0.85}
      />
      {/* Les condensats : ils ne rejoignent pas le groupe, ils sortent
          en façade. Le tracé s'arrêtait en l'air au premier jet — une
          canalisation qui finit dans le vide se lit comme un oubli. */}
      <path
        d={`M208 59v24h${MUR - 208 + EP + 4}v56h8`}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.5}
      />
      <circle cx={MUR + EP / 2} cy={69} r={2} fill="currentColor" opacity={0.7} />

      <Consoles mur={MUR + EP} x={268} y={92} h={42} />
      <Groupe x={268} y={92} />

      {/* L'air soufflé : trois nappes, de plus en plus basses */}
      <Jet d="M174 48 Q126 56 74 82" delai={0} />
      <Jet d="M174 54 Q120 72 62 114" delai={0.9} />
      <Jet d="M174 60 Q114 92 54 146" delai={1.8} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2 — MULTI-SPLIT
   Le sujet : deux liaisons distinctes, une seule nourrice, un seul groupe.
   ═══════════════════════════════════════════════════════════════════════ */

function Multi() {
  const MURG = 18;
  const REFEND = 146;
  const MUR = 238;
  const EP = 9;
  return (
    <>
      <path d={`M${MURG} ${SOL}h${304}`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M${MURG} ${CIEL}h${MUR - MURG}`} stroke="currentColor" strokeWidth={2.2} />
      <Coupe id="tfc-cl-multi-g" x={MURG} y={CIEL} l={SOL - CIEL} ep={EP} />
      <Coupe id="tfc-cl-multi-d" x={MUR} y={CIEL} l={SOL - CIEL} ep={EP} />

      {/* Le refend : trait simple et plus fin que les murs de façade —
          une cloison intérieure n'a pas le même poids qu'une enveloppe,
          et c'est ce contraste qui dit « deux pièces d'un même volume ». */}
      <path d={`M${REFEND} ${CIEL}v${SOL - CIEL}`} stroke="currentColor" strokeWidth={1.5} opacity={0.55} />

      <Mural x={MURG + EP + 2} y={42} w={50} />
      <Mural x={REFEND + 3} y={42} w={50} />

      {/* ─── LA CONVERGENCE ───
          Les deux liaisons restent SÉPARÉES sur tout le parcours, à deux
          hauteurs différentes, et ne se rejoignent qu'à la nourrice, juste
          au-dessus du groupe. C'est là tout le principe du multi-split, et
          il ne se voit que si les deux tracés restent lisibles jusqu'au
          bout. */}
      <path d={`M${MURG + EP + 52} 46v-12h${MUR - MURG - EP - 52 + EP + 16}v52`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
      <path d={`M${REFEND + 53} 46v-6h${MUR - REFEND - 53 + EP + 6}v58`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
      <circle cx={MURG + EP + 52} cy={34} r={2} fill="currentColor" opacity={0.7} />
      <circle cx={REFEND + 53} cy={40} r={2} fill="currentColor" opacity={0.7} />

      {/* Le fourreau commun, plus haut que celui du mono : deux tubes
          passent ici, pas un. */}
      <path
        d={`M${MUR} 28h${EP}v20h-${EP}z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.2}
      />

      {/* La nourrice : la barre où les deux liaisons n'en font plus qu'une */}
      <path d={`M${MUR + EP + 6} 98h${34}`} stroke="currentColor" strokeWidth={1.8} />
      <path d={`M${MUR + EP + 14} 98v10M${MUR + EP + 32} 98v10`} stroke="currentColor" strokeWidth={1.2} opacity={0.8} />

      <Groupe x={MUR + EP + 4} y={108} w={46} h={40} />

      {/* Chaque unité souffle vers SA pièce, jusqu'au refend ou la façade */}
      <Jet d={`M${MURG + EP + 54} 46 Q${MURG + EP + 88} 54 ${REFEND - 12} 84`} delai={0} k={0.95} />
      <Jet d={`M${MURG + EP + 54} 52 Q${MURG + EP + 80} 78 ${REFEND - 20} 138`} delai={1.2} k={0.95} />
      <Jet d={`M${REFEND + 55} 46 Q${REFEND + 82} 54 ${MUR - 14} 84`} delai={0.6} k={0.95} />
      <Jet d={`M${REFEND + 55} 52 Q${REFEND + 76} 78 ${MUR - 22} 138`} delai={1.8} k={0.95} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3 — GAINABLE
   Le sujet : le réseau, et le fait que tout est caché.
   ═══════════════════════════════════════════════════════════════════════ */

function Gainable() {
  const PLAFOND = 70;
  const BOUCHES = [124, 206, 284];
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      {/* Le plénum, en coupe horizontale : c'est le volume qui rend la
          pose invisible, et c'est le seul des quatre dessins où le
          hachurage court sur toute la largeur. */}
      <Coupe id="tfc-cl-gain" x={18} y={CIEL} l={304} ep={PLAFOND - CIEL} vertical={false} />

      {/* L'unité, SUSPENDUE à la dalle par deux tiges */}
      <path d={`M44 ${CIEL + 8}v6M92 ${CIEL + 8}v6`} stroke="currentColor" strokeWidth={1.1} opacity={0.75} />
      <path
        d={`M32 ${CIEL + 14}h72v26h-72z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M40 ${CIEL + 21 + i * 6}h56`} stroke="currentColor" strokeWidth={0.7} opacity={0.4} />
      ))}

      {/* ─── LA GAINE ───
          Deux parois, pas un trait : une gaine a une section. Elle se
          RÉDUIT après la première descente — le débit restant à conduire
          est plus faible, la section suit. C'est ce décrochement qui fait
          lire un réseau plutôt qu'un tuyau. */}
      {/* Le profil de la gaine est rempli de blanc AVANT d'être tracé :
          sans cela le hachurage du plénum courait à l'intérieur, et la
          gaine se lisait comme une saignée dans la dalle plutôt que comme
          un conduit posé dedans. Même traitement pour l'unité, les
          descentes et les bouches. */}
      <path
        d={`M104 ${CIEL + 18}h196v10H162v8H104z`}
        fill="var(--color-paper)"
        stroke="none"
      />
      <path d={`M104 ${CIEL + 18}h196`} stroke="currentColor" strokeWidth={1.5} opacity={0.9} />
      <path d={`M104 ${CIEL + 36}h58v-8h138`} stroke="currentColor" strokeWidth={1.5} opacity={0.9} />
      <path d={`M300 ${CIEL + 18}v10`} stroke="currentColor" strokeWidth={1.5} opacity={0.9} />

      {/* Les trois descentes, à double paroi elles aussi */}
      {BOUCHES.map((x, i) => {
        const haut = i === 0 ? CIEL + 36 : CIEL + 28;
        return (
          <g key={x}>
            <path d={`M${x - 13} ${haut}h26V${PLAFOND}h-26z`} fill="var(--color-paper)" stroke="none" />
            <g stroke="currentColor" strokeWidth={1.2} opacity={0.8}>
              <path d={`M${x - 13} ${haut}V${PLAFOND}`} />
              <path d={`M${x + 13} ${haut}V${PLAFOND}`} />
            </g>
          </g>
        );
      })}

      {BOUCHES.map((x) => (
        <Bouche key={x} x={x - 16} y={PLAFOND - 1} />
      ))}

      {/* Trois souffles en enfilade, décalés l'un après l'autre : le
          réseau se remplit de proche en proche. */}
      {BOUCHES.map((x, i) => (
        <g key={x}>
          <Jet d={`M${x - 9} ${PLAFOND + 11} Q${x - 22} ${PLAFOND + 44} ${x - 32} ${SOL - 12}`} delai={i * 0.85} k={0.9} />
          <Jet d={`M${x + 9} ${PLAFOND + 11} Q${x + 22} ${PLAFOND + 44} ${x + 32} ${SOL - 12}`} delai={i * 0.85 + 0.42} k={0.9} />
        </g>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   4 — CASSETTE
   Le sujet : quatre directions — ce qu'une coupe seule ne peut pas dire.
   ═══════════════════════════════════════════════════════════════════════ */

function Cassette() {
  const PLAFOND = 66;
  const CX = 186;
  /* Le détail en plan se pose SOUS la cassette, entre les deux nappes.
     Placé en bas à gauche au premier jet, il passait derrière les jets de
     ce côté — et un cadre opaque qui avale un flux se lit comme une
     erreur de calque. Au centre, les deux fans s'écartent et laissent
     exactement la place. */
  const PL = 50;
  const PX = CX - PL / 2;
  const PY = 110;
  /** Les quatre flèches du plan : départ, pointe, et les deux barbes. */
  const FLECHES: { d: string; tete: string }[] = [
    { d: `M${PX + PL / 2} ${PY + 16}V${PY + 5}`, tete: `M${PX + PL / 2 - 3.5} ${PY + 10}L${PX + PL / 2} ${PY + 5}l3.5 5` },
    { d: `M${PX + PL / 2} ${PY + PL - 16}V${PY + PL - 5}`, tete: `M${PX + PL / 2 - 3.5} ${PY + PL - 10}L${PX + PL / 2} ${PY + PL - 5}l3.5 -5` },
    { d: `M${PX + 16} ${PY + PL / 2}H${PX + 5}`, tete: `M${PX + 10} ${PY + PL / 2 - 3.5}L${PX + 5} ${PY + PL / 2}l5 3.5` },
    { d: `M${PX + PL - 16} ${PY + PL / 2}H${PX + PL - 5}`, tete: `M${PX + PL - 10} ${PY + PL / 2 - 3.5}L${PX + PL - 5} ${PY + PL / 2}l-5 3.5` },
  ];
  return (
    <>
      <path d={`M18 ${SOL}h304`} stroke="currentColor" strokeWidth={2.2} />
      <Coupe id="tfc-cl-cass" x={18} y={CIEL} l={304} ep={PLAFOND - CIEL} vertical={false} />

      {/* Le caisson, logé dans le plafond et suspendu */}
      <path d={`M${CX - 38} ${CIEL + 8}v-6M${CX + 38} ${CIEL + 8}v-6`} stroke="currentColor" strokeWidth={1.1} opacity={0.75} />
      <path
        d={`M${CX - 38} ${CIEL + 8}h76v${PLAFOND - CIEL - 8}h-76z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <path d={`M${CX - 30} ${CIEL + 16}h60M${CX - 30} ${CIEL + 24}h60`} stroke="currentColor" strokeWidth={0.7} opacity={0.4} />

      {/* La face décorative, affleurante et DÉBORDANTE du caisson : c'est
          ce débord qui fait reconnaître une cassette au premier coup d'œil,
          et c'est sous lui que sortent les quatre volets. */}
      <path
        d={`M${CX - 50} ${PLAFOND}h100v9h-100z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      {[-34, -12, 12, 34].map((d) => (
        <path key={d} d={`M${CX + d} ${PLAFOND}v9`} stroke="currentColor" strokeWidth={0.9} opacity={0.5} />
      ))}

      {/* Deux nappes de chaque côté — les deux autres faces sont
          perpendiculaires au plan de coupe, donc invisibles ici. C'est
          exactement ce que le détail en plan vient compléter. */}
      <Jet d={`M${CX - 50} ${PLAFOND + 12} Q${CX - 96} ${PLAFOND + 18} ${CX - 126} ${PLAFOND + 42}`} delai={0} />
      <Jet d={`M${CX - 44} ${PLAFOND + 12} Q${CX - 86} ${PLAFOND + 44} ${CX - 112} ${SOL - 14}`} delai={1} />
      <Jet d={`M${CX + 50} ${PLAFOND + 12} Q${CX + 96} ${PLAFOND + 18} ${CX + 126} ${PLAFOND + 42}`} delai={0.5} />
      <Jet d={`M${CX + 44} ${PLAFOND + 12} Q${CX + 86} ${PLAFOND + 44} ${CX + 112} ${SOL - 14}`} delai={1.5} />

      {/* ─── LE DÉTAIL EN PLAN ───
          Le seul des quatre dessins à porter une seconde vue, et c'est la
          raison d'être de cette planche : une cassette diffuse sur quatre
          côtés, et une coupe n'en montrera jamais que deux. Le renvoi
          pointillé et la vue de dessus sont la façon dont un plan traite
          exactement ce cas. */}
      <path
        d={`M${CX} ${PLAFOND + 10}V${PY}`}
        stroke="currentColor"
        strokeWidth={0.8}
        strokeDasharray="3 4"
        opacity={0.4}
      />
      <path
        d={`M${PX} ${PY}h${PL}v${PL}h-${PL}z`}
        fill="var(--color-paper)"
        stroke="currentColor"
        strokeWidth={1}
      />
      <path
        d={`M${PX + 16} ${PY + 16}h${PL - 32}v${PL - 32}h-${PL - 32}z`}
        stroke="currentColor"
        strokeWidth={1.2}
      />
      {FLECHES.map((f, i) => (
        <g key={i} stroke="var(--color-brand)" strokeLinecap="round">
          <path
            d={f.d}
            strokeWidth={1.4}
            strokeDasharray="5 4"
            className="tfc-flux"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <path d={f.tete} strokeWidth={1.2} opacity={0.85} />
        </g>
      ))}
    </>
  );
}

const COUPES: Record<Pose, () => React.ReactElement> = {
  mono: Mono,
  multi: Multi,
  gainable: Gainable,
  cassette: Cassette,
};

export function PlanchePose({ pose, className = '' }: { pose: Pose; className?: string }) {
  const Dessin = COUPES[pose];
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
