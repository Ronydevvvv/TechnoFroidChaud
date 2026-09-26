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
const CY = 190;
/**
 * Aplatissement vertical de l'éventail.
 *
 * Passé de 0,5 à 0,42. À 0,5 la planche occupait 780 px de haut sur grand
 * écran — le plus gros bloc de chacune des trois pages qui la portent, pour
 * quinze points et quinze noms. L'ellipse un peu plus plate resserre le
 * dessin sans toucher ni aux rayons, ni aux angles, ni aux étiquettes : la
 * donnée dessinée reste exactement la même, seule la hauteur du cadre
 * change.
 */
const KY = 0.42;

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
  const out: { nom: string; deg: number; r: number; x: number; y: number; anneau: number }[] = [];
  let i = 0;
  for (const anneau of ANNEAUX)
    for (const deg of anneau.angles) {
      if (i >= AUTRES.length) break;
      const [x, y] = pt(deg, anneau.r);
      out.push({ nom: AUTRES[i], deg, r: anneau.r, x: f(x), y: f(y), anneau: ANNEAUX.indexOf(anneau) });
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
      viewBox="0 -14 720 400"
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
        <path key={a.r} d={arcGuide(a.r)} stroke="currentColor" strokeWidth={0.8} opacity={0.11} />
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
      {POINTS.map((p) => {
        /* ─── LE POIDS DIT LA PROXIMITÉ ───
           Les quatorze communes étaient toutes au même poids : le schéma
           rangeait donc par distance sans que cela se VOIE. Le point et
           l'étiquette s'allègent maintenant d'un anneau au suivant. On lit
           l'éloignement avant de lire les noms, et le siège cesse d'être
           un point parmi quinze.

           ─── L'ÉCART EST CONSERVÉ, LE PLANCHER EST REMONTÉ ───
           La dégressivité partait de 0,66 et descendait à 0,52 : mesuré,
           cela donnait 4,00:1 sur l'anneau moyen et 3,47:1 sur le dernier,
           pour des noms composés à 12–13 px. Sous le seuil de 4,5:1 — donc
           des communes que personne ne lit mal ne lit plus. L'ÉCART de 0,14
           entre le premier et le dernier anneau est gardé tel quel, c'est
           lui qui porte l'information ; seul le plancher remonte, à 0,68,
           qui vaut 5,8:1. La hiérarchie se voit toujours, elle ne se paie
           plus en lisibilité. */
        const k = p.anneau / (ANNEAUX.length - 1);
        return (
          <g key={p.nom}>
            <circle cx={p.x} cy={p.y} r={f(3.2 - k * 0.9)} fill="currentColor" opacity={0.72 - k * 0.18} />
            <text
              x={p.x + 10}
              y={p.y + 4.2}
              fontSize={f(13.5 - k * 1.2)}
              fill="currentColor"
              stroke="none"
              opacity={0.82 - k * 0.14}
              className="font-[family-name:var(--font-sans)]"
            >
              {p.nom}
            </text>
          </g>
        );
      })}

      {/* ─── LE SIÈGE ───
          Le seul élément cyan du schéma, et le seul cerclé. Il n'est pas
          « plus important » : il est l'ORIGINE, c'est-à-dire ce par rapport
          à quoi tout le reste est rangé. */}
      {/* Le réticule : quatre traits courts qui s'arrêtent avant le cercle.
          C'est la marque d'un point de référence sur une planche — elle dit
          « c'est d'ICI que tout est mesuré », ce qu'un simple disque ne dit
          pas. Les traits n'entrent pas dans le cercle : un réticule fermé
          devient une cible, et une cible n'est plus un repère. */}
      {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dy]) => (
        <path
          key={`${dx}${dy}`}
          d={`M${CX + dx * 20} ${CY + dy * 20} L${CX + dx * 27} ${CY + dy * 27}`}
          stroke="var(--color-brand)"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      <circle cx={CX} cy={CY} r={17.5} stroke="var(--color-brand)" strokeWidth={1.1} opacity={0.55} />
      <circle cx={CX} cy={CY} r={11} stroke="var(--color-brand)" strokeWidth={0.8} opacity={0.28} />
      <circle cx={CX} cy={CY} r={5.6} fill="var(--color-brand)" />
      <text
        x={CX}
        y={CY - 36}
        textAnchor="middle"
        fontSize={20}
        fill="currentColor"
        stroke="none"
        className="font-[family-name:var(--font-display)]"
      >
        {SIEGE}
      </text>
      <text
        x={CX}
        y={CY + 46}
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
