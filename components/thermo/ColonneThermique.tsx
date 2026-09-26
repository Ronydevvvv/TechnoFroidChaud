import { Reveal } from '@/components/ui/Reveal';

/**
 * La colonne thermique — l'échelle des consignes, à la verticale.
 *
 * ─── POURQUOI PAS LES BARRES DE /chambres-froides ────────────────────────
 * Cette page et `/chambres-froides` portent toutes deux des plages de
 * température, et c'est précisément pour ça qu'elles ne peuvent pas porter
 * le même graphique. Là-bas, quatre USAGES comparés sur un axe horizontal :
 * on lit un écart. Ici, quatre ÉQUIPEMENTS étagés sur une colonne : on lit
 * une hauteur. Même code graphique — la mesure — deux formes.
 *
 * La verticale a une seconde raison, celle-là mécanique : c'est la seule
 * orientation qui gagne à être lue sur un téléphone, où la place est en
 * hauteur. La composition mobile n'est donc pas une réduction du bureau,
 * c'est la même idée à sa bonne échelle.
 *
 * ─── LE PROBLÈME QUE RÉSOLVENT LES LIGNES DE RAPPEL ──────────────────────
 * Deux plages se chevauchent presque — la vitrine à +2/+6 et la chambre
 * positive à 0/+4. Posées à leur hauteur exacte, leurs deux blocs de texte
 * se recouvriraient.
 *
 * D'où la construction d'un relevé annoté réel : les SEGMENTS restent à
 * leur hauteur vraie sur la règle, les TEXTES sont répartis à intervalle
 * régulier, et une ligne de rappel relie chaque texte à son segment. Rien
 * n'est déplacé pour arranger le dessin ; ce sont les rappels qui absorbent
 * l'écart.
 *
 * ─── HAUTEUR FIXE, ET C'EST VOLONTAIRE ───────────────────────────────────
 * Le bloc a une hauteur en pixels, pas en `%` : les coordonnées du SVG et
 * celles des rangées HTML doivent coïncider au pixel près, sinon les
 * rappels pointent à côté. Deux jeux de valeurs, un par palier.
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * Les quatre plages sont celles du contenu. La règle va de +14 à −26 °C
 * parce que c'est l'étendue nécessaire pour les contenir avec une marge de
 * lecture. Aucune valeur intermédiaire n'est affirmée.
 */

const HAUT = 14;
const BAS = -26;

/** Hauteur, en fraction de la colonne, d'une température donnée. */
const fr = (t: number) => (HAUT - t) / (HAUT - BAS);

/** Le signe moins typographique, comme partout ailleurs sur le site. */
const degre = (t: number) => (t > 0 ? `+${t}` : t < 0 ? `−${Math.abs(t)}` : '0');

const graduations = [10, 5, 0, -5, -10, -15, -20, -25];
const majeures = new Set([10, 0, -10, -20]);

export type Consigne = {
  use: string;
  note: string;
  /** Bornes réelles, en °C. `de` est la plus froide. */
  de: number;
  a: number;
  /** Le libellé exact tel qu'il est écrit dans le contenu. */
  temp: string;
};

/** Le dessin de la règle et des rappels. Une taille, un jeu de nombres. */
function Regle({
  consignes,
  h,
  largeur,
  xRegle,
  compact,
}: {
  consignes: readonly Consigne[];
  h: number;
  largeur: number;
  xRegle: number;
  compact: boolean;
}) {
  const n = consignes.length;
  const pad = compact ? 14 : 20;
  const utile = h - pad * 2;
  const y = (t: number) => pad + fr(t) * utile;
  /** Centre vertical de la rangée de texte correspondante. */
  const yRang = (i: number) => (h / n) * (i + 0.5);

  return (
    <svg
      viewBox={`0 0 ${largeur} ${h}`}
      width={largeur}
      height={h}
      aria-hidden
      focusable="false"
      fill="none"
      className="overflow-visible text-ink"
    >
      {/* Le montant */}
      <path
        d={`M${xRegle} ${y(HAUT)} L${xRegle} ${y(BAS)}`}
        stroke="currentColor"
        strokeWidth={1.3}
        opacity={0.7}
      />

      {/* Les graduations. Les majeures sont chiffrées, les autres non —
          une règle entièrement légendée n'est plus une règle, c'est un
          tableau. */}
      {graduations.map((t) => {
        const maj = majeures.has(t);
        return (
          <g key={t}>
            <path
              d={`M${xRegle - (maj ? 9 : 5)} ${y(t)} L${xRegle} ${y(t)}`}
              stroke="currentColor"
              strokeWidth={maj ? 1.2 : 0.9}
              opacity={maj ? 0.75 : 0.4}
            />
            {maj && (
              <text
                x={xRegle - 14}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="central"
                fontSize={compact ? 11.5 : 11.5}
                letterSpacing={0.4}
                fill="currentColor"
                opacity={0.72}
                className="font-[family-name:var(--font-sans)] tabular-nums"
              >
                {degre(t)}
              </text>
            )}
          </g>
        );
      })}

      {/* Les segments, à leur hauteur vraie, et leurs rappels. */}
      {consignes.map((c, i) => {
        const froid = c.a <= 0;
        const yh = y(c.a);
        const yb = y(c.de);
        const ym = (yh + yb) / 2;
        const couleur = froid ? 'var(--color-brand)' : 'currentColor';
        return (
          <g key={c.use}>
            <path
              d={`M${xRegle} ${yh} L${xRegle} ${yb}`}
              stroke={couleur}
              strokeWidth={compact ? 5 : 7}
              strokeLinecap="butt"
              opacity={froid ? 1 : 0.85}
            />
            <path
              d={`M${xRegle + 5} ${ym} L${xRegle + 16} ${ym} L${largeur - 4} ${yRang(i)}`}
              stroke={couleur}
              strokeWidth={1.1}
              opacity={0.62}
            />
            <circle cx={largeur - 4} cy={yRang(i)} r={3} fill={couleur} opacity={0.85} />
          </g>
        );
      })}
    </svg>
  );
}

export function ColonneThermique({ consignes }: { consignes: readonly Consigne[] }) {
  const n = consignes.length;

  return (
    <div className="relative">
      {/* La règle, en deux tailles. Un seul SVG redimensionné aurait donné
          des graduations de 4 px de haut sur téléphone. */}
      <div className="pointer-events-none absolute top-0 left-0 lg:hidden">
        <Regle consignes={consignes} h={624} largeur={74} xRegle={44} compact />
      </div>
      <div className="pointer-events-none absolute top-0 left-0 hidden lg:block">
        <Regle consignes={consignes} h={768} largeur={186} xRegle={62} compact={false} />
      </div>

      {/* Les rangées, à intervalle régulier. Leur hauteur est celle qui sert
          à calculer les rappels : les deux doivent rester d'accord. */}
      <div
        className="grid h-[624px] pl-[86px] lg:h-[768px] lg:pl-[210px]"
        style={{ gridTemplateRows: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {consignes.map((c, i) => {
          const froid = c.a <= 0;
          return (
            <Reveal key={c.use} delay={Math.min(i * 0.06, 0.2)}>
              <div className="flex h-full flex-col justify-center">
                <p className="heading text-[0.98rem] leading-[1.2] text-ink lg:text-[1.15rem]">
                  {c.use}
                </p>
                <p
                  className={`heading mt-1 text-[clamp(2rem,7vw,3.6rem)] leading-[1.02] whitespace-nowrap tabular-nums ${
                    froid ? 'text-brand' : 'text-ink'
                  }`}
                >
                  {c.temp}
                </p>
                <p className="mt-1.5 max-w-[34ch] text-[0.85rem] leading-6 text-slate lg:text-[0.9rem]">
                  {c.note}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
