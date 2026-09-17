/**
 * Le flocon, en symbole technique.
 *
 * ─── POURQUOI IL EST CONSTRUIT ET NON REPRIS ─────────────────────────────
 * Le logo officiel (`public/photos/logo.png`) est un aplat de 128 × 93 px.
 * Agrandi à 900 px pour servir de motif, il devient une tache floue ; et un
 * aplat ne peut pas donner le FILAIRE demandé — un contour, pas une masse.
 *
 * Ce tracé n'est donc pas le logo étiré : c'est un motif de la même FAMILLE,
 * construit à la règle — six branches à 60°, losanges sur la tige, cœur
 * hexagonal — dans le langage de trait du reste de la page.
 *
 * ⚠ POUR ALLER PLUS LOIN : si vous fournissez le logo en vectoriel (SVG, AI
 * ou PDF), ce motif peut être remplacé par la géométrie EXACTE de votre
 * flocon. Depuis un PNG de 128 px, un vectoriel propre n'est pas obtenable.
 *
 * ─── V2 : LA ROSE THERMIQUE ──────────────────────────────────────────────
 * En mode `technique`, le flocon cesse d'être un fond : ses branches
 * deviennent un réseau. Nœuds de raccordement aux intersections, flèches de
 * sens sur trois branches, et surtout une TEMPÉRATURE en bout de chaque
 * branche.
 *
 * Les six valeurs ne sont pas choisies pour l'effet : ce sont exactement les
 * six bornes des quatre plages de la page — −22, −18, 0, +2, +4, +6 — et
 * elles sont ordonnées de la plus froide à la plus chaude en tournant. Le
 * motif devient une rose des températures : il DIT ce que la page traite.
 * Aucune valeur n'est inventée, aucune n'est ajoutée.
 */

/** Les six bornes réelles des plages de la page, de la plus froide à la plus chaude. */
const BORNES = ['−22', '−18', '0', '+2', '+4', '+6'];

/** Une branche, pointant vers le haut. Répétée six fois par rotation. */
function Branche({ technique }: { technique: boolean }) {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0 L0 -124" />
      {/* Losange de tige — la forme que porte le logo */}
      <path d="M0 -38 L11 -50 L0 -62 L-11 -50 Z" />
      {/* Barbes basses */}
      <path d="M0 -55 L24 -79" />
      <path d="M0 -55 L-24 -79" />
      {/* Barbes hautes */}
      <path d="M0 -84 L15 -99" />
      <path d="M0 -84 L-15 -99" />
      {/* Losange de pointe */}
      <path d="M0 -100 L9 -112 L0 -124 L-9 -112 Z" />

      {technique && (
        <>
          {/* Nœuds de raccordement, là où une branche se divise réellement —
              la convention d'un schéma de réseau, pas une décoration. */}
          <circle cx={0} cy={-55} r={3.2} />
          <circle cx={0} cy={-84} r={2.4} />
        </>
      )}
    </g>
  );
}

export function Flocon({
  className = '',
  /** Épaisseur du trait, en unités du viewBox (340 × 340). */
  trait = 2,
  /**
   * Mode symbole : nœuds, sens de circulation et températures en bout de
   * branche. Réservé aux emplois où le motif est lisible — jamais sous
   * 6 % d'opacité, où les chiffres deviendraient du bruit.
   */
  technique = false,
}: {
  className?: string;
  trait?: number;
  technique?: boolean;
}) {
  return (
    <svg
      viewBox="-170 -170 340 340"
      aria-hidden
      focusable="false"
      className={className}
      strokeWidth={trait}
    >
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <Branche technique={technique} />
        </g>
      ))}

      {/* Le cœur : un hexagone, comme sur un cristal réel. */}
      <path
        d="M0 -22 L19 -11 L19 11 L0 22 L-19 11 L-19 -11 Z"
        fill="none"
        stroke="currentColor"
      />

      {technique && (
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Sens de circulation, sur une branche sur deux. */}
          {[0, 120, 240].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M-5 -70 L0 -78 L5 -70" strokeWidth={trait * 1.4} />
            </g>
          ))}

          {/* Les six bornes, en bout de branche. Elles tournent avec la
              branche mais se redressent : un chiffre couché ne se lit pas. */}
          {BORNES.map((v, i) => {
            const a = (i * 60 * Math.PI) / 180;
            const r = 143;
            const x = Math.sin(a) * r;
            const y = -Math.cos(a) * r;
            return (
              <text
                key={v}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={17}
                letterSpacing={0.5}
                fill="currentColor"
                stroke="none"
                className="font-[family-name:var(--font-display)] tabular-nums"
              >
                {v}
              </text>
            );
          })}
        </g>
      )}
    </svg>
  );
}
