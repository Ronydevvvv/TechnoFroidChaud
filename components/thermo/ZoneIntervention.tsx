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

/* ═══════════════════════════════════════════════════════════════════════
   L'ÉVENTAIL DEBOUT — sous 1024 px
   ───────────────────────────────────────────────────────────────────────
   ─── CE QUI ÉTAIT LÀ, ET POURQUOI IL FALLAIT LE REFAIRE ───
   L'éventail large est `hidden lg:block` : sur téléphone, la CARTE
   DISPARAISSAIT PUREMENT ET SIMPLEMENT et il ne restait qu'une colonne de
   quinze noms le long d'un filet gris. Tous les points y avaient le même
   diamètre, à la même abscisse : plus d'anneaux, plus de distance, plus de
   rangement par proximité. Autrement dit, la seule information que la
   planche porte — Cocheren est plus près que Sarreguemines — n'existait
   plus. Sur `/contact` et `/entreprise`, la page n'avait plus aucune pièce
   graphique du tout.

   ─── CE QUE FAIT CELLE-CI ───
   C'est le MÊME éventail, basculé d'un quart de tour. Le siège est en
   tête, l'axe descend, et chaque commune se pose à une ABSCISSE qui est
   son anneau : quatre bandes de distance, de la plus proche à la plus
   lointaine. Quatre courbes relient les communes d'un même anneau — ce
   sont les arcs de l'éventail large, redressés.

   ─── POURQUOI LE DESSIN EST DANS LA GOUTTIÈRE ET LES NOMS EN HTML ───
   Quatorze noms comme « Freyming-Merlebach » dans un SVG de 340 unités se
   chevaucheraient quel que soit l'agencement. Ils restent donc en HTML, au
   corps du site — mais chacun est sur LA MÊME LIGNE que son point, à
   quelques pixels de lui. Ce n'est plus un dessin d'un côté et une légende
   de l'autre : c'est une seule pièce.

   ─── L'ALIGNEMENT EST EXACT, ET C'EST POURQUOI TOUT EST EN PIXELS ───
   Le viewBox fait 132 × 532 et le SVG est rendu à 132 px de large : une
   unité vaut donc un pixel, et les ordonnées du dessin sont littéralement
   celles des lignes de la liste. Aucun réglage approximatif, aucune dérive
   possible quand un nom passe sur deux lignes — la hauteur de ligne est
   fixe et partagée par les deux.
   ═══════════════════════════════════════════════════════════════════════ */

/** Hauteur d'une ligne de commune, en pixels. Partagée par le dessin. */
const LIGNE = 34;
/** Hauteur du bloc du siège, en tête. */
const TETE = 56;
/** Largeur de la gouttière dessinée. */
const GOUT = 132;
/** Abscisse de l'axe, et des quatre anneaux. */
const AXE_X = 15;
const ANNEAU_X = [48, 74, 100, 121];

/** Le même découpage que l'éventail large : 3 · 4 · 4 · 3. */
const RANGS_DEBOUT = [3, 4, 4, 3];

const DEBOUT = (() => {
  const out: { nom: string; x: number; y: number; anneau: number }[] = [];
  let i = 0;
  RANGS_DEBOUT.forEach((n, anneau) => {
    for (let k = 0; k < n && i < AUTRES.length; k++, i++) {
      out.push({
        nom: AUTRES[i],
        x: ANNEAU_X[anneau],
        y: TETE + LIGNE / 2 + i * LIGNE,
        anneau,
      });
    }
  });
  return out;
})();

const HAUT = TETE + AUTRES.length * LIGNE;

/** La courbe qui relie les communes d'un même anneau, légèrement bombée. */
function arcAnneau(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  const d = [`M${pts[0].x} ${pts[0].y}`];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    d.push(`Q${a.x + 7} ${(a.y + b.y) / 2} ${b.x} ${b.y}`);
  }
  return d.join(' ');
}

function EventailDebout() {
  return (
    <svg
      viewBox={`0 0 ${GOUT} ${HAUT}`}
      width={GOUT}
      height={HAUT}
      aria-hidden
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute top-0 left-0 text-ink"
    >
      {/* Les quatre arcs de distance, du plus proche au plus lointain.
          Ils s'effacent avec l'éloignement, exactement comme les arcs de
          guidage de l'éventail large. */}
      {RANGS_DEBOUT.map((_, anneau) => (
        <path
          key={anneau}
          d={arcAnneau(DEBOUT.filter((p) => p.anneau === anneau))}
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.2 - anneau * 0.03}
        />
      ))}

      {/* L'axe, du siège jusqu'à la dernière commune */}
      <path
        d={`M${AXE_X} ${TETE / 2} L${AXE_X} ${HAUT - LIGNE / 2}`}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.22}
      />

      {/* Les rayons : de l'axe vers chaque commune. Leur LONGUEUR est la
          distance — c'est elle qui range les quinze communes, et c'est
          exactement ce que la colonne précédente avait perdu. */}
      {DEBOUT.map((p) => (
        <path
          key={p.nom}
          d={`M${AXE_X} ${p.y} L${p.x - 5} ${p.y}`}
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.34 - p.anneau * 0.05}
        />
      ))}

      {/* Les communes */}
      {DEBOUT.map((p) => (
        <circle
          key={p.nom}
          cx={p.x}
          cy={p.y}
          r={3.4 - p.anneau * 0.45}
          fill="currentColor"
          opacity={0.72 - p.anneau * 0.11}
        />
      ))}

      {/* ─── LE SIÈGE ───
          Le seul élément cyan, et le seul cerclé : il n'est pas « plus
          important », il est l'ORIGINE — ce par rapport à quoi les quatre
          anneaux sont comptés. Même réticule que l'éventail large. */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M${AXE_X + s * 9} ${TETE / 2} L${AXE_X + s * 14} ${TETE / 2}`}
          stroke="var(--color-brand)"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      <circle cx={AXE_X} cy={TETE / 2} r={7.5} stroke="var(--color-brand)" strokeWidth={1} opacity={0.5} />
      <circle cx={AXE_X} cy={TETE / 2} r={3.6} fill="var(--color-brand)" />
    </svg>
  );
}

export function ZoneIntervention() {
  return (
    <>
      <Eventail />

      {/* La planche debout. `LIGNE` et `TETE` sont imposés en pixels aux
          deux moitiés : c'est ce qui garantit qu'un nom reste sur la ligne
          de son point. */}
      <div className="relative lg:hidden" style={{ minHeight: HAUT }}>
        <EventailDebout />

        <p
          className="flex flex-col justify-center"
          style={{ height: TETE, paddingLeft: ANNEAU_X[0] + 10 }}
        >
          <span className="heading text-[1.15rem] leading-[1.2] text-ink">{SIEGE}</span>
          <span className="mt-0.5 text-[0.74rem] tracking-[0.12em] text-brand uppercase">
            Siège
          </span>
        </p>

        <ol>
          {DEBOUT.map((p) => (
            <li
              key={p.nom}
              className="flex items-center text-[0.95rem] text-slate"
              style={{ height: LIGNE, paddingLeft: p.x + 10 }}
            >
              {p.nom}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
