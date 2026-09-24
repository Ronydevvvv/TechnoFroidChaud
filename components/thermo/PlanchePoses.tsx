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
 * Chaque pose reçoit maintenant sa coupe, à 340 × 200 unités. On y voit ce
 * qui les distingue réellement, et qui tient en trois choses : COMBIEN
 * d'unités intérieures, OÙ elles sont posées, et PAR OÙ l'air sort.
 *
 *   mono       une unité murale, une pièce, un groupe dehors
 *   multi      deux unités murales, deux pièces, LE MÊME groupe dehors
 *   gainable   une unité cachée en plénum, un réseau, trois bouches
 *   cassette   une unité encastrée au plafond, quatre jets
 *
 * ─── LE VOCABULAIRE EST CELUI DES AUTRES PLANCHES ────────────────────────
 * Traits d'encre fins, cyan réservé à l'air soufflé, tirets pour le flux,
 * aucun aplat, aucune ombre, aucune couleur en dehors des deux accents du
 * logo. Les murs et les dalles sont plus épais que le mobilier technique :
 * c'est la convention d'une coupe de bâtiment, déjà employée sur l'accueil.
 *
 * ─── AUCUNE DONNÉE N'EST AVANCÉE ─────────────────────────────────────────
 * Ni puissance, ni longueur de liaison, ni débit, ni température. Les
 * dessins disent une TOPOLOGIE — ce qui est relié à quoi — et c'est la
 * seule chose que le contenu de `content/services.ts` affirme.
 *
 * ─── LE MOUVEMENT ────────────────────────────────────────────────────────
 * Seul l'air bouge, avec la classe `tfc-flux` déjà utilisée par la coupe
 * d'accueil et la planche des chambres froides — mêmes tirets, même durée,
 * mêmes décalages. `prefers-reduced-motion` l'arrête, comme partout.
 */

/** Sol et plafond : l'enveloppe commune aux quatre coupes. */
const SOL = 176;
const CIEL = 30;

/** Un jet d'air : une courbe en tirets, cyan, qui part d'une bouche. */
function Jet({
  d,
  delai = 0,
  k = 1,
}: {
  d: string;
  delai?: number;
  k?: number;
}) {
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

/** Le groupe extérieur : caisson, grille d'hélice, pieds. */
function Groupe({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}h46v40h-46z`} stroke="currentColor" strokeWidth={1.5} />
      <circle cx={x + 23} cy={y + 20} r={11} stroke="currentColor" strokeWidth={1} opacity={0.5} />
      <circle cx={x + 23} cy={y + 20} r={3} fill="currentColor" opacity={0.45} />
      <path d={`M${x + 6} ${y + 40}v5M${x + 40} ${y + 40}v5`} stroke="currentColor" strokeWidth={1.1} opacity={0.7} />
    </g>
  );
}

/** Une unité murale : caisson plat, et sa reprise d'air en partie basse. */
function Mural({ x, y, w = 50 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <path d={`M${x} ${y}h${w}v16h-${w}z`} stroke="currentColor" strokeWidth={1.4} />
      <path d={`M${x + 5} ${y + 11}h${w - 10}`} stroke="currentColor" strokeWidth={0.8} opacity={0.5} />
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LES QUATRE COUPES
   ═══════════════════════════════════════════════════════════════════════ */

function Mono() {
  return (
    <>
      {/* L'enveloppe : dalle, plafond, et la façade que la liaison traverse */}
      <path d={`M24 ${SOL}h292`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M24 ${CIEL}h224`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M248 ${CIEL}v${SOL - CIEL}`} stroke="currentColor" strokeWidth={2.2} />

      {/* L'unité intérieure, en haut de la façade */}
      <Mural x={186} y={46} />

      {/* La liaison frigorifique : elle traverse la façade et descend */}
      <path d="M236 62v9h20v57h16" stroke="currentColor" strokeWidth={1.3} opacity={0.75} />
      <circle cx={256} cy={71} r={2.4} fill="currentColor" opacity={0.75} />

      <Groupe x={272} y={108} />

      {/* L'air soufflé : trois jets vers le volume */}
      <Jet d="M184 56 Q140 66 92 96" delai={0} />
      <Jet d="M184 62 Q136 80 86 118" delai={0.9} />
      <Jet d="M184 68 Q132 94 80 140" delai={1.8} />
    </>
  );
}

function Multi() {
  /* Les deux unités sont ADOSSÉES : l'une au mur de gauche, l'autre au
     refend. Suspendues dans le vide comme au premier jet, elles ne se
     lisaient pas comme des unités murales — et leurs jets, obligés de
     partir vers le bas, devenaient quatre tirets raides au lieu de quatre
     nappes d'air. Adossées, elles soufflent vers leur pièce, et les
     courbes retrouvent la longueur de celles du mono-split. */
  const MURG = 26;
  const REFEND = 140;
  return (
    <>
      <path d={`M${MURG} ${SOL}h290`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M${MURG} ${CIEL}h222`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M${MURG} ${CIEL}v${SOL - CIEL}`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M248 ${CIEL}v${SOL - CIEL}`} stroke="currentColor" strokeWidth={2.2} />

      {/* Le refend : c'est lui qui fait DEUX pièces, et c'est tout le sujet */}
      <path d={`M${REFEND} ${CIEL}v${SOL - CIEL}`} stroke="currentColor" strokeWidth={1.6} opacity={0.6} />

      <Mural x={MURG + 2} y={46} w={44} />
      <Mural x={REFEND + 2} y={46} w={44} />

      {/* Les deux liaisons rejoignent la MÊME descente : un seul groupe */}
      <path d={`M${MURG + 46} 48V38h210v90h16`} stroke="currentColor" strokeWidth={1.3} opacity={0.75} />
      <path d={`M${REFEND + 46} 48V38`} stroke="currentColor" strokeWidth={1.3} opacity={0.75} />
      <circle cx={MURG + 46} cy={38} r={2.2} fill="currentColor" opacity={0.75} />
      <circle cx={REFEND + 46} cy={38} r={2.2} fill="currentColor" opacity={0.75} />

      <Groupe x={272} y={108} />

      {/* Chaque unité souffle vers SA pièce : la première vers la droite
          jusqu'au refend, la seconde vers la droite jusqu'à la façade. */}
      <Jet d={`M${MURG + 48} 54 Q${MURG + 76} 62 ${REFEND - 14} 92`} delai={0} k={0.95} />
      <Jet d={`M${MURG + 48} 60 Q${MURG + 70} 84 ${REFEND - 22} 136`} delai={1.1} k={0.95} />
      <Jet d={`M${REFEND + 48} 54 Q${REFEND + 76} 62 ${REFEND + 100} 92`} delai={0.55} k={0.95} />
      <Jet d={`M${REFEND + 48} 60 Q${REFEND + 70} 84 ${REFEND + 92} 136`} delai={1.65} k={0.95} />
    </>
  );
}

function Gainable() {
  /** Les trois bouches, régulièrement réparties dans le faux plafond. */
  const bouches = [108, 188, 268];
  const PLENUM = 64;
  return (
    <>
      <path d={`M24 ${SOL}h292`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M24 ${CIEL}h292`} stroke="currentColor" strokeWidth={2.2} />

      {/* Le faux plafond : c'est lui qui rend la pose invisible */}
      <path d={`M24 ${PLENUM}h292`} stroke="currentColor" strokeWidth={1.8} />
      {/* Le plénum, hachuré léger — le volume technique entre les deux */}
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${34 + i * 21} ${CIEL + 3}l-9 ${PLENUM - CIEL - 6}`}
          stroke="currentColor"
          strokeWidth={0.7}
          opacity={0.16}
        />
      ))}

      {/* L'unité, cachée dans le plénum */}
      <path d={`M40 ${CIEL + 7}h62v22h-62z`} stroke="currentColor" strokeWidth={1.4} />
      <path d={`M48 ${CIEL + 13}h46M48 ${CIEL + 19}h46`} stroke="currentColor" strokeWidth={0.8} opacity={0.45} />

      {/* Le réseau de gaines et ses descentes vers chaque bouche */}
      <path d={`M102 ${CIEL + 18}h186`} stroke="currentColor" strokeWidth={1.6} opacity={0.8} />
      {bouches.map((x) => (
        <path key={x} d={`M${x} ${CIEL + 18}v${PLENUM - CIEL - 18}`} stroke="currentColor" strokeWidth={1.3} opacity={0.7} />
      ))}

      {/* Les bouches, affleurantes */}
      {bouches.map((x) => (
        <path key={x} d={`M${x - 13} ${PLENUM - 3}h26v6h-26z`} stroke="currentColor" strokeWidth={1.2} />
      ))}

      {/* L'air descend de chaque bouche, en éventail */}
      {bouches.map((x, i) => (
        <g key={x}>
          <Jet d={`M${x - 7} ${PLENUM + 8} Q${x - 18} ${PLENUM + 46} ${x - 26} ${SOL - 14}`} delai={i * 0.8} k={0.9} />
          <Jet d={`M${x + 7} ${PLENUM + 8} Q${x + 18} ${PLENUM + 46} ${x + 26} ${SOL - 14}`} delai={i * 0.8 + 0.4} k={0.9} />
        </g>
      ))}
    </>
  );
}

function Cassette() {
  const PLAFOND = 58;
  const CX = 170;
  return (
    <>
      <path d={`M24 ${SOL}h292`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M24 ${CIEL}h292`} stroke="currentColor" strokeWidth={2.2} />
      <path d={`M24 ${PLAFOND}h292`} stroke="currentColor" strokeWidth={1.8} />
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${34 + i * 21} ${CIEL + 3}l-9 ${PLAFOND - CIEL - 6}`}
          stroke="currentColor"
          strokeWidth={0.7}
          opacity={0.16}
        />
      ))}

      {/* Le caisson au-dessus, la face visible affleurante en dessous */}
      <path d={`M${CX - 34} ${CIEL + 8}h68v${PLAFOND - CIEL - 8}h-68z`} stroke="currentColor" strokeWidth={1.4} />
      <path d={`M${CX - 44} ${PLAFOND}h88v7h-88z`} stroke="currentColor" strokeWidth={1.5} />
      <path d={`M${CX - 30} ${PLAFOND + 3.5}h60`} stroke="currentColor" strokeWidth={0.8} opacity={0.45} />

      {/* Quatre jets, deux par côté : c'est la diffusion sur quatre faces
          vue en coupe — on ne peut en montrer que deux de face, les deux
          autres se lisent par leur symétrie. */}
      <Jet d={`M${CX - 44} ${PLAFOND + 11} Q${CX - 96} ${PLAFOND + 26} ${CX - 128} ${PLAFOND + 74}`} delai={0} />
      <Jet d={`M${CX - 40} ${PLAFOND + 11} Q${CX - 78} ${PLAFOND + 40} ${CX - 92} ${SOL - 12}`} delai={0.9} />
      <Jet d={`M${CX + 44} ${PLAFOND + 11} Q${CX + 96} ${PLAFOND + 26} ${CX + 128} ${PLAFOND + 74}`} delai={0.45} />
      <Jet d={`M${CX + 40} ${PLAFOND + 11} Q${CX + 78} ${PLAFOND + 40} ${CX + 92} ${SOL - 12}`} delai={1.35} />
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
  const Coupe = COUPES[pose];
  return (
    <svg
      viewBox="0 0 340 200"
      aria-hidden
      focusable="false"
      fill="none"
      strokeLinejoin="round"
      className={`w-full text-ink ${className}`}
    >
      <Coupe />
    </svg>
  );
}
