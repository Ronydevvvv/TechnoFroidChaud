/**
 * La ligne de vie — état d'une installation, du service au retour en service.
 *
 * ─── LA SEPTIÈME PROJECTION, ET LA PREMIÈRE QUI NE SOIT PAS SPATIALE ─────
 * Les six autres planches du site décrivent toutes un OBJET ou un
 * BRANCHEMENT :
 *
 *   /                   coupe de bâtiment        où sont les systèmes
 *   /chambres-froides   axonométrie              de quoi est fait un volume
 *   /refrigeration      élévation frontale       des machines de face
 *   /pompes-a-chaleur   schéma de circuit        un anneau
 *   /climatisation      vue en plan              jusqu'où va l'air
 *   /chauffage          réseau en peigne         qui alimente quoi
 *
 * Celle-ci ne décrit aucun objet. Son axe est le TEMPS, et c'est ce qui la
 * sépare définitivement des six autres : un chronogramme ne se confond avec
 * aucune projection géométrique, parce qu'il n'en est pas une.
 *
 * Le sujet de cette page n'est pas un équipement — c'est une SÉQUENCE : un
 * appareil qui marche, qui tombe, qu'on qualifie, qu'on contrôle, et qui
 * repart. Une ligne d'état dit exactement cela, et rien d'autre ne le dit
 * aussi vite.
 *
 * ─── DEUX NIVEAUX, ET C'EST TOUTE LA GRAMMAIRE ──────────────────────────
 *   niveau haut   l'installation est en service
 *   niveau bas    elle est à l'arrêt
 *
 * La ligne descend au défaut et remonte à la remise en service. Entre les
 * deux, elle reste basse — parce que c'est vrai : pendant qu'on qualifie et
 * qu'on cherche, l'équipement ne fonctionne toujours pas.
 *
 * ─── LE ROUGE NE MARQUE QUE DEUX CHOSES ──────────────────────────────────
 *   la CHUTE et son repère       le défaut
 *   le repère du quatrième temps  l'intervention, l'acte qui y répond
 *
 * Partout ailleurs la ligne est cyan quand l'installation tourne, et en
 * trait neutre tireté quand elle est à l'arrêt. Le rouge signale un
 * problème et l'action qui le traite : il n'est jamais un aplat d'ambiance.
 *
 * ─── LES CINQ TEMPS VIENNENT DU CONTENU, PAS D'UN MODÈLE ─────────────────
 *   EN SERVICE          « Contrôle des pressions et des sécurités »,
 *                       « Vérification d'étanchéité du circuit »
 *   DÉFAUT              « Équipement professionnel à l'arrêt »
 *   QUALIFICATION       « Nous qualifions l'urgence au téléphone, avant
 *                       tout déplacement »
 *   CONTRÔLE            « Recherche de fuite et de panne électrique »
 *   REMISE EN SERVICE   « Remplacement de pièce, remise en service »,
 *                       « Rapport d'intervention remis à chaque passage »
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * Aucun délai, aucune durée, aucune pression, aucune température. L'axe du
 * temps n'est pas gradué et ne le sera pas : le contenu donne un ORDRE, pas
 * des durées, et graduer un axe qu'on ne sait pas mesurer serait inventer.
 * Les traits de relevé du quatrième temps sont un geste de mesure, pas des
 * valeurs — ils ne portent aucun chiffre.
 */

/* ═══════════════════════════════════════════════════════════════════════
   LA LIGNE COUCHÉE — au-dessus de 1024 px
   ═══════════════════════════════════════════════════════════════════════ */

const HAUT = 182;
const BAS = 302;

/** Abscisses des cinq désignations. Les repères s'y accrochent. */
const DES_X = [70, 305, 540, 775, 1010];
const DES_W = 150;

function Repere({ cx, cy, r, couleur, plein, croix }: { cx: number; cy: number; r: number; couleur: string; plein?: boolean; croix?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} stroke={couleur} strokeWidth={r * 0.28} fill={plein ? couleur : 'var(--color-paper)'} />
      {croix && (
        <path
          d={`M${cx - r * 0.44} ${cy - r * 0.44} L${cx + r * 0.44} ${cy + r * 0.44} M${cx + r * 0.44} ${cy - r * 0.44} L${cx - r * 0.44} ${cy + r * 0.44}`}
          stroke="var(--color-paper)"
          strokeWidth={r * 0.26}
        />
      )}
    </g>
  );
}

function LigneLarge({ className }: { className?: string }) {
  const designations: [string, string][] = [
    ['EN SERVICE', 'Contrôles et étanchéité'],
    ['DÉFAUT', 'Équipement à l’arrêt'],
    ['QUALIFICATION', 'Au téléphone, d’abord'],
    ['CONTRÔLE', 'Recherche de la panne'],
    ['REMISE EN SERVICE', 'Rapport d’intervention'],
  ];

  return (
    <svg
      viewBox="56 157 1158 291"
      aria-hidden
      focusable="false"
      className={`hidden w-full text-ink lg:block ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ── Les deux niveaux d'état, en repère très faible ── */}
      {[HAUT, BAS].map((y) => (
        <path key={y} d={`M70 ${y} L1200 ${y}`} stroke="currentColor" strokeWidth={0.9} opacity={0.14} />
      ))}

      {/* ── La ligne d'état ──
             en service → chute → à l'arrêt → remontée → en service */}
      <path d={`M70 ${HAUT} L355 ${HAUT}`} stroke="var(--color-brand)" strokeWidth={2.8} />
      <path d={`M355 ${HAUT} L405 ${BAS}`} stroke="var(--color-alert)" strokeWidth={2.8} />
      <path d={`M405 ${BAS} L1010 ${BAS}`} stroke="currentColor" strokeWidth={2} strokeDasharray="9 8" opacity={0.55} />
      <path d={`M1010 ${BAS} L1060 ${HAUT}`} stroke="var(--color-brand)" strokeWidth={2.8} />
      <path d={`M1060 ${HAUT} L1200 ${HAUT}`} stroke="var(--color-brand)" strokeWidth={2.8} />

      {/* Le fluide qui reprend : un segment parcourt la portion en service */}
      <path
        d={`M1060 ${HAUT} L1200 ${HAUT}`}
        stroke="var(--color-brand)"
        strokeWidth={4.6}
        strokeDasharray="20 160"
        opacity={0.5}
        className="tfc-circule"
      />

      {/* ── Le quatrième temps : des traits de relevé, sans aucun chiffre ── */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${818 + i * 16} ${BAS - 10} L${818 + i * 16} ${BAS - 16 - (i % 2 ? 16 : 27)}`}
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.5}
        />
      ))}

      {/* ── Les cinq repères, dans l'ordre de la séquence ── */}
      <Repere cx={145} cy={HAUT} r={9} couleur="var(--color-brand)" plein />
      <Repere cx={380} cy={(HAUT + BAS) / 2} r={14} couleur="var(--color-alert)" plein croix />
      <Repere cx={615} cy={BAS} r={11.5} couleur="currentColor" />
      <Repere cx={850} cy={BAS} r={11.5} couleur="var(--color-alert)" />
      <Repere cx={1085} cy={HAUT} r={9} couleur="var(--color-brand)" plein />

      {/* ── Les désignations, sous la ligne ── */}
      {designations.map(([nom, sous], i) => (
        <g key={nom}>
          <path d={`M${DES_X[i]} 386 L${DES_X[i] + DES_W} 386`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
          <text x={DES_X[i]} y={408} fontSize={16} letterSpacing={1.4} fill="currentColor" stroke="none" className="font-[family-name:var(--font-sans)]">
            {nom}
          </text>
          <text x={DES_X[i]} y={430} fontSize={15} fill="currentColor" stroke="none" opacity={0.72} className="font-[family-name:var(--font-sans)]">
            {sous}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LA LIGNE DEBOUT — sous 1024 px
   ───────────────────────────────────────────────────────────────────────
   Ce n'est pas la ligne couchée réduite, et ce n'est pas la même mise en
   page. Les deux NIVEAUX d'état deviennent deux COLONNES : la gauche est
   « en service », la droite « à l'arrêt ». La ligne descend à gauche,
   bascule à droite au défaut, y reste pendant la qualification et le
   contrôle, puis rebascule à gauche à la remise en service.

   Le regard descend donc la séquence au lieu de la parcourir — c'est le
   sens d'un téléphone, et c'est l'inverse du parcours de gauche à droite
   de la ligne couchée. Les deux colonnes utilisent la largeur, qu'un
   simple fil vertical aurait laissée vide.

   Deux simplifications, chacune au service de la lecture :
     aucun texte dans le dessin — les cinq temps passent en HTML sous la
       planche, numérotés dans l'ordre exact où les repères les empilent ;
     les traits de relevé tombent, et tous les traits montent d'un cran.
   ═══════════════════════════════════════════════════════════════════════ */

const EN_SERVICE = 80;
const A_LARRET = 260;

function LigneDebout({ className }: { className?: string }) {
  return (
    <svg
      viewBox="56 22 230 416"
      aria-hidden
      focusable="false"
      className={`mx-auto w-full max-w-[19rem] text-ink lg:hidden ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Les deux colonnes d'état, en repère très faible. Elles sont
          écartées de 180 unités : à 120, le tracé était si étroit pour sa
          hauteur qu'il rendait 661 px de haut avec 45 px de vide de chaque
          côté. Écarter les colonnes vaut mieux que rogner la fenêtre —
          rogner l'aurait rendu plus haut encore. */}
      {[EN_SERVICE, A_LARRET].map((x) => (
        <path key={x} d={`M${x} 30 L${x} 430`} stroke="currentColor" strokeWidth={1} opacity={0.14} />
      ))}

      {/* La ligne d'état */}
      <path d={`M${EN_SERVICE} 36 L${EN_SERVICE} 100`} stroke="var(--color-brand)" strokeWidth={3.4} />
      <path d={`M${EN_SERVICE} 100 L${A_LARRET} 164`} stroke="var(--color-alert)" strokeWidth={3.4} />
      <path d={`M${A_LARRET} 164 L${A_LARRET} 324`} stroke="currentColor" strokeWidth={2.6} strokeDasharray="8 7" opacity={0.55} />
      <path d={`M${A_LARRET} 324 L${EN_SERVICE} 380`} stroke="var(--color-brand)" strokeWidth={3.4} />
      <path d={`M${EN_SERVICE} 380 L${EN_SERVICE} 424`} stroke="var(--color-brand)" strokeWidth={3.4} />
      <path
        d={`M${EN_SERVICE} 380 L${EN_SERVICE} 424`}
        stroke="var(--color-brand)"
        strokeWidth={5.6}
        strokeDasharray="12 78"
        opacity={0.5}
        className="tfc-circule"
      />

      {/* Les cinq repères, du haut vers le bas */}
      <Repere cx={EN_SERVICE} cy={60} r={10} couleur="var(--color-brand)" plein />
      <Repere cx={(EN_SERVICE + A_LARRET) / 2} cy={132} r={15} couleur="var(--color-alert)" plein croix />
      <Repere cx={A_LARRET} cy={208} r={12} couleur="currentColor" />
      <Repere cx={A_LARRET} cy={288} r={12} couleur="var(--color-alert)" />
      <Repere cx={EN_SERVICE} cy={404} r={10} couleur="var(--color-brand)" plein />
    </svg>
  );
}

/**
 * Le composant exporté : deux lignes, deux mises en page, un seul jeu de
 * conventions. Au-dessus de 1024 px la ligne couchée et ses cinq
 * désignations ; en dessous, la ligne debout, sans aucun texte — la liste
 * numérotée de la page prend le relais.
 */
export function LigneDeVie({ className }: { className?: string }) {
  return (
    <>
      <LigneLarge className={className} />
      <LigneDebout className={className} />
    </>
  );
}
