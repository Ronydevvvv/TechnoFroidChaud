/**
 * Les trois cadrans — ce qu'on lit sur une installation.
 *
 * ─── POURQUOI UN CADRAN, ET POURQUOI TROIS ───────────────────────────────
 * La page porte déjà la LIGNE DE VIE, qui a le temps pour axe : elle dit
 * QUAND les choses arrivent — l'installation tourne, tombe, on qualifie, on
 * cherche, elle repart.
 *
 * Elle ne dit pas ce qu'on REGARDE pendant ce temps-là. Un frigoriste ne
 * diagnostique pas en écoutant : il pose un manomètre et il lit. Ces trois
 * cadrans sont ce relevé, pris à trois moments de la même séquence :
 *
 *   DÉFAUT              l'aiguille est hors de la plage de service
 *   CONTRÔLE            elle bouge — c'est la mesure en cours
 *   REMISE EN SERVICE   elle est revenue dans la plage
 *
 * Ce n'est donc pas une deuxième planche qui redirait la première. Le
 * chronogramme donne l'ORDRE, les cadrans donnent l'ÉTAT LU à trois de ses
 * cinq temps. Les deux se tiennent, et la section le dit en une phrase.
 *
 * ─── AUCUN CHIFFRE, ET C'EST UNE DÉCISION ────────────────────────────────
 * Un manomètre gradué porterait des VALEURS — une basse pression, une haute
 * pression, une plage nominale. Aucune de ces valeurs n'existe dans le
 * projet : elles dépendent du fluide, de la machine et de la saison, et
 * aucune installation de l'entreprise n'est documentée ici.
 *
 * Dessiner « 4,2 bar » serait donc inventer une donnée technique, ce que le
 * cahier des charges interdit explicitement. Les cadrans n'ont ni chiffre,
 * ni unité, ni échelle : seulement des repères, une plage, une aiguille.
 *
 * C'est exactement la convention déjà retenue pour la ligne de vie, dont le
 * cartouche annonce « axe non gradué ». Ici le cartouche annonce « cadrans
 * de principe, non gradués ». La règle ne change pas d'une planche à
 * l'autre, et le visiteur ne peut pas se méprendre sur ce qu'il regarde.
 *
 * L'information tient tout entière dans la POSITION de l'aiguille par
 * rapport à la plage. Dehors, en mouvement, dedans : c'est vrai de
 * n'importe quelle installation, quel que soit le fluide, et cela
 * n'engage aucun chiffre.
 *
 * ─── LE ROUGE EST TENU À UN SEUL CADRAN ──────────────────────────────────
 * Le premier, et seulement lui : l'aiguille du défaut et rien d'autre. Le
 * troisième passe au cyan, qui est déjà la couleur « en service » de la
 * ligne de vie. Le deuxième reste en encre, parce qu'un contrôle n'est ni
 * une panne ni une remise en service — c'est le moment où l'on ne sait pas
 * encore.
 *
 * La plage de service est en gris sur les deux premiers cadrans et en cyan
 * sur le troisième. Elle ne change pas de place : c'est l'aiguille qui la
 * rejoint, et c'est tout le propos.
 *
 * ─── POURQUOI IL N'Y A PAS DE GÉOMÉTRIE MOBILE DÉDIÉE ────────────────────
 * Les autres planches du site en ont une, parce que ce sont des
 * compositions LARGES : réduire une coupe de bâtiment de 1200 unités à la
 * largeur d'un téléphone rend ses intitulés illisibles.
 *
 * Ici, le dessin est un instrument CARRÉ de 120 unités, et il ne contient
 * aucun texte — les trois intitulés sont en HTML, à côté. À 200 px comme à
 * 240 px, le même cadran se lit identiquement : il n'y a rien à rendre
 * illisible. Ce qui s'adapte n'est donc pas le dessin mais la MISE EN PAGE
 * — trois cadrans de front au-dessus de 640 px, empilés en dessous.
 *
 * ─── COMPOSANT SERVEUR ───────────────────────────────────────────────────
 * Aucun `'use client'`, aucun état, aucune animation. La trigonométrie
 * s'exécute une fois au build et le navigateur ne reçoit que des chemins
 * SVG déjà calculés. Zéro octet de JavaScript pour trois instruments.
 */

/* ═══════════════════════════════════════════════════════════════════════
   GÉOMÉTRIE
   ═══════════════════════════════════════════════════════════════════════

   Repère : centre (60, 60), angle en degrés, 0° vers le haut, croissant
   dans le sens des aiguilles d'une montre — la convention d'un cadran, pas
   celle des mathématiques. L'ordonnée est inversée parce qu'en SVG l'axe y
   descend.

   Course : de −135° (butée basse gauche) à +135° (butée basse droite), soit
   270°. C'est la course d'un manomètre de service. */

const C = 60;

const pt = (deg: number, r: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)];
};

const f = (n: number) => Number(n.toFixed(2));

/** Arc d'un rayon donné, de `d1` à `d2`, dans le sens du cadran. */
const arc = (d1: number, d2: number, r: number) => {
  const [x1, y1] = pt(d1, r);
  const [x2, y2] = pt(d2, r);
  const grand = Math.abs(d2 - d1) > 180 ? 1 : 0;
  return `M${f(x1)} ${f(y1)} A${r} ${r} 0 ${grand} 1 ${f(x2)} ${f(y2)}`;
};

const DEBUT = -135;
const FIN = 135;

/** Les onze repères de la course. Un sur cinq est long. */
const REPERES = Array.from({ length: 11 }, (_, i) => {
  const deg = DEBUT + (i * (FIN - DEBUT)) / 10;
  const majeur = i % 5 === 0;
  const [x1, y1] = pt(deg, 47);
  const [x2, y2] = pt(deg, majeur ? 37 : 41.5);
  return { x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2), majeur };
});

/** La plage de service. Même position sur les trois cadrans. */
const PLAGE: [number, number] = [-10, 45];

type Etat = 'defaut' | 'controle' | 'service';

/** L'angle de l'aiguille à chacun des trois moments. */
const AIGUILLE: Record<Etat, number> = {
  defaut: -120, // contre la butée basse : le circuit est tombé
  controle: -55, // en course, sous la plage : on mesure
  service: 18, // dans la plage
};

/**
 * Les aiguilles fantômes du deuxième cadran. Elles ne sont pas une
 * animation : elles disent qu'une mesure se prend en plusieurs lectures,
 * de la même manière que les traits de relevé de la ligne de vie disent un
 * geste de mesure sans porter de valeur.
 *
 * Elles sont COURTES — 25 unités contre 33 pour l'aiguille vive. À longueur
 * égale, la plus pâle des deux se lisait comme la petite aiguille d'une
 * montre, et le cadran basculait en horloge.
 */
const FANTOMES = [-86, -70];

/** Décalage du frémissement, un par cadran. Voir le groupe animé plus bas. */
const DECALAGE: Record<Etat, number> = { defaut: 0, controle: -4.3, service: -8.6 };

function Cadran({ etat }: { etat: Etat }) {
  const deg = AIGUILLE[etat];
  const [ax, ay] = pt(deg, 33);

  /* Le cyan ne sort que quand l'installation est revenue en service, le
     rouge que quand elle est tombée. Entre les deux, l'encre. */
  const couleurAiguille =
    etat === 'defaut'
      ? 'var(--color-alert)'
      : etat === 'service'
        ? 'var(--color-brand)'
        : 'var(--color-ink)';

  /**
   * La plage était tracée en `--color-line` tant que l'aiguille ne l'avait
   * pas rejointe. À l'écran, elle disparaissait : sur les deux premiers
   * cadrans on ne voyait qu'une aiguille seule, et « elle est hors de la
   * plage » ne veut rien dire quand on ne voit pas la plage.
   *
   * Elle est donc en ardoise sur les trois cadrans, au même poids. Seule sa
   * COULEUR change quand l'aiguille y revient — la position de la plage,
   * elle, ne bouge jamais, et c'est ce qui rend les trois cadrans
   * comparables d'un coup d'œil.
   */
  const couleurPlage = etat === 'service' ? 'var(--color-brand)' : 'var(--color-slate)';

  return (
    <svg
      viewBox="0 0 120 126"
      role="img"
      aria-hidden
      focusable="false"
      className="block h-auto w-full max-w-[13.5rem]"
    >
      {/* ─── LE RACCORD ───
          Un manomètre se visse : il a une tige et un écrou sous le boîtier.
          Sans eux, un cercle gradué parcouru par une aiguille est une
          HORLOGE — c'est ce que montraient les premières captures. Le
          raccord est le seul trait qui tranche, et il coûte deux
          rectangles. Tracé en premier, donc sous le boîtier. */}
      <rect x="55.5" y="104" width="9" height="14" fill="var(--color-stone)" stroke="var(--color-slate)" strokeWidth="0.9" />
      <rect x="52" y="117" width="16" height="6" fill="var(--color-stone)" stroke="var(--color-slate)" strokeWidth="0.9" />

      {/* Le boîtier */}
      <circle cx={C} cy={C} r="52" fill="var(--color-paper)" stroke="var(--color-slate)" strokeWidth="0.9" />
      <circle cx={C} cy={C} r="47" fill="none" stroke="var(--color-line)" strokeWidth="0.8" />

      {/* La plage de service — l'unique information du cadran */}
      <path
        d={arc(PLAGE[0], PLAGE[1], 43.5)}
        fill="none"
        stroke={couleurPlage}
        strokeWidth="3.4"
        strokeLinecap="butt"
      />

      {/* Les repères. Aucun chiffre : voir l'en-tête du fichier. */}
      {REPERES.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke={r.majeur ? 'var(--color-slate)' : 'var(--color-line)'}
          strokeWidth={r.majeur ? 1.2 : 0.8}
          strokeLinecap="round"
        />
      ))}

      {/* Les lectures intermédiaires, deuxième cadran seulement */}
      {etat === 'controle' &&
        FANTOMES.map((d) => {
          const [fx, fy] = pt(d, 25);
          return (
            <line
              key={d}
              x1={C}
              y1={C}
              x2={f(fx)}
              y2={f(fy)}
              stroke="var(--color-slate)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.32"
            />
          );
        })}

      {/* L'aiguille et son moyeu.
          Le groupe porte le frémissement : le moyeu tourne avec l'aiguille
          plutôt que de rester fixe dessous, ce qui est le cas d'un vrai
          instrument — c'est le même axe. Décalage par cadran pour que les
          trois ne respirent pas ensemble : trois manomètres synchronisés
          se lisent comme une animation, trois décalés comme trois
          instruments. */}
      <g
        className="tfc-aiguille"
        style={{ animationDelay: `${DECALAGE[etat]}s` }}
      >
        <line
          x1={C}
          y1={C}
          x2={f(ax)}
          y2={f(ay)}
          stroke={couleurAiguille}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx={C} cy={C} r="3.4" fill={couleurAiguille} />
      </g>
      <circle cx={C} cy={C} r="1.3" fill="var(--color-paper)" />
    </svg>
  );
}

export function TroisCadrans() {
  const temps: { etat: Etat; nom: string; sous: string }[] = [
    {
      etat: 'defaut',
      nom: 'Défaut',
      sous: 'L’aiguille est hors de la plage de service. C’est ce que confirme le premier relevé, avant toute pièce commandée.',
    },
    {
      etat: 'controle',
      nom: 'Contrôle',
      sous: 'Plusieurs lectures, pas une. Un relevé isolé ne distingue pas une fuite d’un encrassement d’échangeur.',
    },
    {
      etat: 'service',
      nom: 'Remise en service',
      sous: 'L’aiguille est revenue dans la plage, et le relevé est reporté sur le rapport d’intervention.',
    },
  ];

  return (
    <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-3 sm:gap-y-0">
      {temps.map((t) => (
        <li key={t.nom} className="border-t border-line pt-7">
          <Cadran etat={t.etat} />
          <p className="heading mt-6 text-[1.05rem] leading-[1.25] text-ink">{t.nom}</p>
          <p className="mt-2 max-w-[34ch] text-[0.92rem] leading-7 text-slate">{t.sous}</p>
        </li>
      ))}
    </ol>
  );
}
