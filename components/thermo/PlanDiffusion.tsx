/**
 * La diffusion d'air — zone climatisée, vue en plan.
 *
 * ─── LA CINQUIÈME PROJECTION, ET POURQUOI C'EST CELLE-LÀ ─────────────────
 * Le site en emploie déjà quatre, chacune réservée à une page :
 *
 *   /                   coupe de bâtiment        section VERTICALE
 *   /chambres-froides   axonométrie isométrique  un volume vu du dehors
 *   /refrigeration      élévation frontale       des machines de face
 *   /pompes-a-chaleur   schéma de circuit        une boucle, hors échelle
 *
 * Il restait une projection orthographique inemployée, et c'est la bonne
 * ici : la VUE EN PLAN — la section horizontale. Ce n'est pas la coupe de
 * l'accueil sous un autre nom, c'en est le complément exact : là où une
 * coupe montre des hauteurs, un plan montre des DISTANCES et des
 * ATTEINTES. Or une climatisation ne se juge pas en hauteur : elle se juge
 * à la portée de l'air soufflé et au chemin de l'air repris.
 *
 * Le contenu de la page raisonne d'ailleurs déjà en plan, sans le dire :
 * « bouches discrètes dans chaque pièce », « diffusion sur quatre côtés ».
 *
 * ─── L'AIR EST LE SUJET, PAS LE MATÉRIEL ─────────────────────────────────
 * C'est ce qui sépare cette planche de l'élévation de `/refrigeration`, qui
 * partage pourtant une géométrie dedans / paroi / dehors. Là-bas, les
 * machines sont le sujet et occupent le trait fort. Ici elles sont réduites
 * à deux rectangles : le trait fort est donné aux QUATRE SOUFFLES et aux
 * deux reprises, qui remplissent la pièce. La hiérarchie est inversée, et
 * c'est elle qu'on lit en premier.
 *
 * ─── LES QUATRE TEMPS, DE GAUCHE À DROITE ────────────────────────────────
 *   la pièce, balayée par l'air soufflé        ZONE CLIMATISÉE
 *   les reprises qui longent les parois        AIR REPRIS
 *   l'unité intérieure, contre la façade       UNITÉ INTÉRIEURE
 *   la liaison, puis la chaleur qui sort       UNITÉ EXTÉRIEURE
 *
 * ─── LE CODE COULEUR NE CHANGE PAS D'UNE PAGE À L'AUTRE ──────────────────
 *   cyan   l'air — soufflé en trait fort, repris en trait faible
 *   rouge  la chaleur rejetée dehors, et rien d'autre
 *   encre  les parois, les deux unités, la liaison
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * Aucune température, aucune puissance, aucun débit, aucune portée chiffrée
 * — le contenu de cette page n'en donne aucune. La planche nomme, elle ne
 * mesure pas. Le cartouche dit « de principe » : elle ne représente aucune
 * installation particulière.
 */

/* ═══════════════════════════════════════════════════════════════════════
   LE PLAN LARGE — au-dessus de 1024 px
   La pièce couchée, la façade à droite, l'unité extérieure au-delà.
   ═══════════════════════════════════════════════════════════════════════ */

/** Parement intérieur de la pièce. */
const IN = { x1: 70, y1: 96, x2: 830, y2: 424 };
/** Épaisseur de paroi, convention de plan : deux traits parallèles. */
const EP = 16;

function PlanLarge({ className }: { className?: string }) {
  /** Les quatre souffles, en éventail depuis l'unité vers le fond. */
  const souffles = [
    'M786 196 Q 470 118 150 152',
    'M786 224 Q 460 188 128 214',
    'M786 256 Q 460 292 128 266',
    'M786 284 Q 470 362 150 328',
  ];

  /** Les deux reprises, le long des parois, qui reviennent à l'unité. */
  const reprises = [
    `M146 ${IN.y1 + 26} L744 ${IN.y1 + 26} Q 792 ${IN.y1 + 26} 800 ${IN.y1 + 74}`,
    `M146 ${IN.y2 - 26} L744 ${IN.y2 - 26} Q 792 ${IN.y2 - 26} 800 ${IN.y2 - 74}`,
  ];

  const designations: [number, string, string][] = [
    [70, 'ZONE CLIMATISÉE', 'Volume réellement traité'],
    [300, 'AIR SOUFFLÉ', 'Diffusion vers le fond'],
    [530, 'AIR REPRIS', 'Retour le long des parois'],
    [760, 'UNITÉ INTÉRIEURE', 'Contre la façade'],
    [990, 'UNITÉ EXTÉRIEURE', 'Chaleur rejetée dehors'],
  ];

  return (
    <svg
      viewBox="38 66 1182 467"
      aria-hidden
      focusable="false"
      className={`hidden w-full text-ink lg:block ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {[
          ['tfc-cl-froid-l', 'var(--color-brand)'],
          ['tfc-cl-chaud-l', 'var(--color-alert)'],
        ].map(([id, c]) => (
          <marker
            key={id}
            id={id}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 1 L9 5 L0 9" fill="none" stroke={c} strokeWidth="1.8" />
          </marker>
        ))}
      </defs>

      {/* ── Les parois, en double trait : la convention du plan ── */}
      <path
        d={`M${IN.x1} ${IN.y1} L${IN.x2} ${IN.y1} L${IN.x2} ${IN.y2} L${IN.x1} ${IN.y2} Z`}
        stroke="currentColor"
        strokeWidth={1.4}
        opacity={0.75}
      />
      <path
        d={`M${IN.x1 - EP} ${IN.y1 - EP} L${IN.x2 + EP} ${IN.y1 - EP} L${IN.x2 + EP} ${IN.y2 + EP} L${IN.x1 - EP} ${IN.y2 + EP} Z`}
        stroke="currentColor"
        strokeWidth={1.4}
        opacity={0.4}
      />

      {/* ── Les quatre souffles. Le trait le plus fort de la planche. ── */}
      {souffles.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--color-brand)"
          strokeWidth={2.4}
          strokeDasharray="16 12"
          opacity={0.9}
          markerEnd="url(#tfc-cl-froid-l)"
          className="tfc-flux"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}

      {/* ── Les deux reprises. Même cyan, trait faible : c'est le même air,
             mais ce n'est pas lui qu'on vient voir. ── */}
      {reprises.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--color-brand)"
          strokeWidth={1.5}
          opacity={0.55}
          markerEnd="url(#tfc-cl-froid-l)"
        />
      ))}

      {/* ── L'unité intérieure, plaquée contre le parement de façade ── */}
      <path d="M786 170 L826 170 L826 310 L786 310 Z" stroke="currentColor" strokeWidth={1.6} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M792 ${196 + i * 44} L820 ${196 + i * 44}`}
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.45}
        />
      ))}

      {/* ── La liaison, et sa traversée de façade ── */}
      <path
        d={`M826 296 L${IN.x2 + 34} 296 L${IN.x2 + 34} 380 L980 380`}
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.65}
      />
      <path
        d={`M${IN.x2 - 4} 288 L${IN.x2 + EP + 4} 288`}
        stroke="currentColor"
        strokeWidth={2.6}
        opacity={0.9}
      />

      {/* ── L'unité extérieure, au-delà de la façade ── */}
      <path d="M980 330 L1150 330 L1150 430 L980 430 Z" stroke="currentColor" strokeWidth={1.6} />
      <g transform="translate(1065 380)">
        <circle r={32} stroke="currentColor" strokeWidth={1.1} opacity={0.6} />
        {/* `transformBox` en style local : `.tfc-helice` est partagée avec
            d'autres planches et `globals.css` ne doit pas bouger. Sans lui,
            `transform-origin: center` se résout au centre de la FENÊTRE et
            les pales tournent en orbite autour du dessin. */}
        <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              d="M0 0 C8 -9 11 -20 4 -27 C-4 -21 -6 -10 0 0 Z"
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
          d={`M1156 ${346 + i * 24} L1204 ${338 + i * 24}`}
          stroke="var(--color-alert)"
          strokeWidth={1.6}
          opacity={0.85}
          markerEnd="url(#tfc-cl-chaud-l)"
        />
      ))}

      {/* ── Les désignations, sous le plan ── */}
      {designations.map(([x, nom, sous]) => (
        <g key={nom}>
          <path d={`M${x} 472 L${x + 150} 472`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
          <text
            x={x}
            y={494}
            fontSize={16}
            letterSpacing={1.4}
            fill="currentColor"
            stroke="none"
            className="font-[family-name:var(--font-sans)]"
          >
            {nom}
          </text>
          <text
            x={x}
            y={516}
            fontSize={15}
            fill="currentColor"
            stroke="none"
            opacity={0.72}
            className="font-[family-name:var(--font-sans)]"
          >
            {sous}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LE PLAN COMPACT — sous 1024 px
   ───────────────────────────────────────────────────────────────────────
   Ce n'est pas le plan large réduit, et ce n'est même pas la même mise en
   page. La pièce se redresse : le plan devient PORTRAIT, l'unité
   intérieure passe contre la paroi du bas, les souffles montent vers le
   fond et les reprises redescendent le long des deux parois. La liaison
   traverse vers le bas, l'unité extérieure se pose dessous, et la chaleur
   sort par le bas de la planche.

   Le regard descend donc : la pièce, la façade, la machine, la chaleur.
   C'est le sens d'un téléphone, et c'est l'inverse du parcours de gauche
   à droite du plan large.

   Trois simplifications, chacune au service de la lecture :
     aucun texte dans le dessin — les désignations passent en HTML sous la
       planche, où elles gardent le corps du reste du site ;
     les sous-détails tombent — ailettes de l'unité, double trait des
       parois hors façade, repère de traversée ;
     les souffles passent de quatre à trois, et tous les traits montent
       d'un cran.
   ═══════════════════════════════════════════════════════════════════════ */

function PlanCompact({ className }: { className?: string }) {
  const souffles = [
    'M152 292 Q 96 192 80 96',
    'M170 292 Q 170 188 170 78',
    'M188 292 Q 244 192 260 96',
  ];
  /* Les reprises s'écartent aux parois et démarrent plus haut que les
     souffles : à 4 unités d'écart, leur pointe et celle du souffle voisin
     se rejoignaient en haut de la pièce — deux marqueurs de flux opposés
     au même endroit se lisent comme un raccord, pas comme deux sens. */
  const reprises = ['M56 70 L56 268 Q 56 296 108 302', 'M284 70 L284 268 Q 284 296 232 302'];

  return (
    <svg
      viewBox="14 28 312 530"
      aria-hidden
      focusable="false"
      className={`mx-auto w-full max-w-[23rem] text-ink lg:hidden ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {[
          ['tfc-cl-froid-c', 'var(--color-brand)'],
          ['tfc-cl-chaud-c', 'var(--color-alert)'],
        ].map(([id, c]) => (
          <marker
            key={id}
            id={id}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 1 L9 5 L0 9" fill="none" stroke={c} strokeWidth="1.8" />
          </marker>
        ))}
      </defs>

      {/* La pièce, en plan portrait */}
      <path d="M44 44 L296 44 L296 320 L44 320 Z" stroke="currentColor" strokeWidth={1.8} opacity={0.75} />
      <path d="M28 328 L312 328" stroke="currentColor" strokeWidth={1.8} opacity={0.4} />

      {/* Les trois souffles, vers le fond de la pièce */}
      {souffles.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--color-brand)"
          strokeWidth={3.4}
          strokeDasharray="14 11"
          opacity={0.9}
          markerEnd="url(#tfc-cl-froid-c)"
          className="tfc-flux"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}

      {/* Les deux reprises, le long des parois */}
      {reprises.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--color-brand)"
          strokeWidth={1.8}
          opacity={0.45}
          markerEnd="url(#tfc-cl-froid-c)"
        />
      ))}

      {/* L'unité intérieure, contre la paroi du bas */}
      <path d="M116 296 L224 296 L224 320 L116 320 Z" stroke="currentColor" strokeWidth={2} />

      {/* La liaison descend et traverse */}
      <path d="M204 320 L204 366 L170 366 L170 392" stroke="currentColor" strokeWidth={1.9} opacity={0.65} />

      {/* L'unité extérieure, sous la façade */}
      <path d="M100 392 L240 392 L240 486 L100 486 Z" stroke="currentColor" strokeWidth={2} />
      <g transform="translate(170 439)">
        <circle r={26} stroke="currentColor" strokeWidth={1.4} opacity={0.6} />
        <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              d="M0 0 C7 -8 9 -17 3 -23 C-4 -18 -5 -8 0 0 Z"
              transform={`rotate(${a})`}
              stroke="currentColor"
              strokeWidth={1.4}
              opacity={0.7}
            />
          ))}
        </g>
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${128 + i * 42} 492 L${120 + i * 42} 542`}
          stroke="var(--color-alert)"
          strokeWidth={2.2}
          opacity={0.85}
          markerEnd="url(#tfc-cl-chaud-c)"
        />
      ))}
    </svg>
  );
}

/**
 * Le composant exporté : deux plans, deux mises en page, un seul jeu de
 * conventions. Au-dessus de 1024 px le plan couché et ses cinq
 * désignations ; en dessous, le plan portrait, sans aucun texte — la
 * légende HTML de la page prend le relais.
 */
export function PlanDiffusion({ className }: { className?: string }) {
  return (
    <>
      <PlanLarge className={className} />
      <PlanCompact className={className} />
    </>
  );
}
