import { servedTowns } from '@/content/company';

/**
 * La zone d'intervention — schéma de principe.
 *
 * ─── POURQUOI CE N'EST PAS UNE CARTE ─────────────────────────────────────
 * Une carte tierce imposerait un bandeau de consentement à un site qui ne
 * pose aucun cookie. Et une carte DESSINÉE supposerait des coordonnées : or
 * le projet n'en contient aucune, et placer quinze communes de mémoire
 * produirait une géographie subtilement fausse — le genre d'erreur qu'un
 * habitant du secteur repère en une seconde, sur la seule page qui prétend
 * dire qu'on connaît son territoire.
 *
 * ─── CE QUE LE SCHÉMA DIT, ET QUI EST VRAI ───────────────────────────────
 * `content/company.ts` documente une chose, et une seule, sur ces quinze
 * communes : elles sont **ordonnées par proximité du siège**. C'est une
 * donnée réelle, présente dans la source, et jusqu'ici invisible sur le
 * site.
 *
 * Le schéma ne dessine que cela. Le RAYON de chaque commune est son RANG de
 * proximité — rien d'autre. L'angle ne porte aucune information : il sert
 * uniquement à séparer les points, et le cartouche le dit en toutes lettres
 * (« sans échelle géographique »).
 *
 * C'est la même convention que les autres planches du site, dont les
 * cartouches annoncent « axe non gradué » et « cadrans de principe ». On
 * dessine ce qu'on sait, on annonce ce qu'on ne sait pas.
 *
 * ─── DEUX COMPOSITIONS, PAS UNE RÉDUCTION ────────────────────────────────
 *   LARGE    un éventail. Le siège à gauche, les communes réparties sur
 *            quatre anneaux, étiquetées à droite de leur point.
 *   ÉTROIT   un AXE DE DISTANCE vertical. Le même classement, mais déroulé
 *            de haut en bas — parce qu'un éventail de quinze étiquettes
 *            ramené à 375 px ne serait plus qu'un buisson.
 *
 * Les deux disent exactement la même chose et lisent la même source.
 */

/**
 * ─── LA GÉOMÉTRIE ───────────────────────────────────────────────────────
 * Premier essai : une spirale, chaque commune recevant son angle ET son
 * rayon de son rang. Échec, et pour une raison qui vaut d'être notée : quand
 * le rayon croît pendant que l'angle se redresse vers l'horizontale, les
 * deux effets SE COMPENSENT en ordonnée. Les premières communes se
 * retrouvaient donc à la même hauteur, en tas.
 *
 * Il faut découpler. Le RANG donne le rayon — c'est la seule donnée réelle,
 * et elle est préservée. L'angle, lui, est choisi par ANNEAU, uniquement
 * pour que les points se séparent.
 *
 * Aplatissement vertical (`KY`) : un éventail circulaire de 495 unités de
 * rayon demanderait un dessin presque carré, donc 1 300 px de haut dans la
 * page. L'ellipse le ramène à un format paysage. Elle ne fausse rien : le
 * cartouche annonce déjà qu'il n'y a aucune échelle géographique.
 */

const CX = 90;
const CY = 200;
/** Aplatissement vertical de l'éventail. */
const KY = 0.5;

/** Les quatre anneaux : rayon, puis angles des communes qui s'y posent. */
const ANNEAUX: { r: number; angles: number[] }[] = [
  { r: 150, angles: [-50, 0, 50] },
  { r: 265, angles: [-58, -20, 20, 58] },
  { r: 380, angles: [-58, -20, 20, 58] },
  { r: 495, angles: [-45, 0, 45] },
];

const AUTRES = servedTowns.slice(1);
const SIEGE = servedTowns[0];

const f = (n: number) => Number(n.toFixed(1));

const pt = (deg: number, r: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * KY * Math.sin(a)];
};

/** Les quatorze communes, dans l'ordre de la source — donc par proximité. */
const POINTS = (() => {
  const out: { nom: string; deg: number; r: number; x: number; y: number }[] = [];
  let i = 0;
  for (const anneau of ANNEAUX)
    for (const deg of anneau.angles) {
      if (i >= AUTRES.length) break;
      const [x, y] = pt(deg, anneau.r);
      out.push({ nom: AUTRES[i], deg, r: anneau.r, x: f(x), y: f(y) });
      i++;
    }
  return out;
})();

/** Arc de guidage, ouvert, sans graduation. */
const arcGuide = (r: number) => {
  const [x1, y1] = pt(-68, r);
  const [x2, y2] = pt(68, r);
  return `M${f(x1)} ${f(y1)} A${f(r)} ${f(r * KY)} 0 0 1 ${f(x2)} ${f(y2)}`;
};

/* ═══════════════════════════════════════════════════════════════════════
   L'ÉVENTAIL — au-dessus de 1024 px
   ═══════════════════════════════════════════════════════════════════════ */

function Eventail() {
  return (
    <svg
      viewBox="0 -34 720 468"
      aria-hidden
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hidden w-full text-ink lg:block"
    >
      {/* Les quatre arcs de guidage — un par anneau. Aucun n'est gradué :
          ils donnent le rang, pas une distance. */}
      {ANNEAUX.map((a) => (
        <path key={a.r} d={arcGuide(a.r)} stroke="currentColor" strokeWidth={0.8} opacity={0.13} />
      ))}

      {/* Les rayons, du siège vers chaque commune. Ils s'arrêtent AVANT le
          point : un trait qui touche son point le noie. */}
      {POINTS.map((p) => {
        const [x1, y1] = pt(p.deg, 24);
        const [x2, y2] = pt(p.deg, p.r - 8);
        return (
          <path
            key={p.nom}
            d={`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`}
            stroke="currentColor"
            strokeWidth={0.9}
            opacity={0.22}
          />
        );
      })}

      {/* Les quatorze communes. L'étiquette se pose toujours à droite du
          point : l'éventail s'ouvre vers la droite, donc c'est le seul côté
          où elle ne retombe jamais sur un rayon. */}
      {POINTS.map((p) => (
        <g key={p.nom}>
          <circle cx={p.x} cy={p.y} r={3.1} fill="currentColor" opacity={0.7} />
          <text
            x={p.x + 10}
            y={p.y + 4.4}
            fontSize={13.5}
            fill="currentColor"
            stroke="none"
            opacity={0.74}
            className="font-[family-name:var(--font-sans)]"
          >
            {p.nom}
          </text>
        </g>
      ))}

      {/* ─── LE SIÈGE ───
          Le seul élément cyan du schéma, et le seul cerclé. Il n'est pas
          « plus important » : il est l'ORIGINE, c'est-à-dire ce par rapport
          à quoi tout le reste est rangé. */}
      <circle cx={CX} cy={CY} r={16} stroke="var(--color-brand)" strokeWidth={1} opacity={0.35} />
      <circle cx={CX} cy={CY} r={5.4} fill="var(--color-brand)" />
      <text
        x={CX}
        y={CY - 28}
        textAnchor="middle"
        fontSize={17}
        fill="currentColor"
        stroke="none"
        className="font-[family-name:var(--font-display)]"
      >
        {SIEGE}
      </text>
      <text
        x={CX}
        y={CY + 38}
        textAnchor="middle"
        fontSize={11}
        letterSpacing={1.3}
        fill="var(--color-brand)"
        stroke="none"
        className="font-[family-name:var(--font-sans)]"
      >
        SIÈGE
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   L'AXE DE DISTANCE — en dessous de 1024 px
   ═══════════════════════════════════════════════════════════════════════

   Le même classement, déroulé verticalement. Le dessin ne porte AUCUN
   texte : à 375 px, quinze intitulés dans un SVG feraient six pixels de
   haut. Les noms sortent donc en HTML, à côté de l'axe — c'est la même
   solution que la coupe de l'accueil et la ligne de vie du dépannage. */

export function ZoneIntervention() {
  return (
    <>
      <Eventail />

      <ol className="lg:hidden">
        {servedTowns.map((t, i) => {
          const siege = i === 0;
          return (
            <li key={t} className="flex items-stretch gap-4">
              {/* L'axe : un segment par commune, avec son point. Le premier
                  n'a pas de segment au-dessus, le dernier pas en dessous —
                  sans quoi l'axe flotterait au-delà de son contenu. */}
              <span aria-hidden className="relative flex w-3 shrink-0 justify-center">
                <span
                  className={`w-px bg-line ${siege ? 'mt-3.5' : ''} ${
                    i === servedTowns.length - 1 ? 'mb-3.5 grow-0 h-3.5' : 'grow'
                  }`}
                />
                <span
                  className={`absolute top-2.5 ${
                    siege
                      ? 'size-2.5 rounded-full bg-brand'
                      : 'size-1.5 rounded-full bg-slate/45'
                  }`}
                />
              </span>
              <span className={`block py-1 ${siege ? 'pb-2.5' : ''}`}>
                <span
                  className={
                    siege
                      ? 'heading text-[1.15rem] text-ink'
                      : 'text-[0.98rem] leading-6 text-slate'
                  }
                >
                  {t}
                </span>
                {siege && (
                  <span className="mt-0.5 block text-[0.76rem] tracking-[0.1em] text-brand uppercase">
                    Siège
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
