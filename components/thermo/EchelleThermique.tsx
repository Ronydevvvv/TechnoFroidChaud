import { Reveal } from '@/components/ui/Reveal';

/**
 * L'échelle thermique.
 *
 * ─── CE QU'ELLE REMPLACE ─────────────────────────────────────────────────
 * Quatre lignes de texte qui disaient « Chambre froide positive — 0 à +4 °C
 * — fruits, légumes ». L'information était juste, mais il fallait LIRE les
 * quatre lignes pour comprendre que les surgelés sont vingt degrés plus bas
 * que le reste. Ici, on le VOIT : la barre des surgelés est seule à gauche,
 * les trois autres se serrent à droite.
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * Les quatre plages sont celles de la page, au degré près. L'axe va de −24 à
 * +8 °C parce que c'est ce qu'il faut pour les contenir, pas pour faire joli.
 * Aucune valeur intermédiaire n'est affirmée.
 *
 * ─── LA GÉOMÉTRIE EST VRAIE ──────────────────────────────────────────────
 * La position de chaque barre est calculée depuis sa température. Ce n'est
 * pas une illustration de graphique : c'en est un. Si une plage changeait
 * dans le contenu, la barre se déplacerait toute seule.
 *
 * ─── ALIGNEMENT ──────────────────────────────────────────────────────────
 * La colonne de gauche a une largeur fixe (`--stub`), ce qui permet à la
 * grille de fond — les verticales des graduations — de se caler sur les
 * quatre voies avec un seul `left`. Sans cette variable, il faudrait
 * répéter le calcul à trois endroits et il divergerait au premier
 * ajustement.
 */

const MIN = -24;
const MAX = 8;
const pc = (t: number) => ((t - MIN) / (MAX - MIN)) * 100;

/**
 * Le signe moins TYPOGRAPHIQUE (U+2212), pas le trait d'union du clavier.
 * Le reste de la page écrit « −18 à −22 °C » ; une règle en
 * « -20 » aurait mélangé deux signes à dix centimètres d'écart. Le trait
 * d'union est aussi plus court et ne s'aligne pas sur la barre des chiffres.
 */
const degre = (t: number) => (t > 0 ? `+${t}` : t < 0 ? `−${Math.abs(t)}` : '0');

/** Graduations. Les trois repères majeurs sont légendés, les autres non. */
const graduations = [
  { t: -20, majeur: true },
  { t: -15, majeur: false },
  { t: -10, majeur: true },
  { t: -5, majeur: false },
  { t: 0, majeur: true },
  { t: 5, majeur: false },
];

export type Plage = {
  usage: string;
  note: string;
  /** Bornes réelles, en °C. `de` est la plus froide. */
  de: number;
  a: number;
  /** Le libellé exact tel qu'il est écrit dans le contenu. */
  label: string;
};

export function EchelleThermique({ plages }: { plages: readonly Plage[] }) {
  return (
    <div className="[--stub:0px] lg:[--stub:20rem]">
      {/* ─── La règle, une seule fois, en tête ─── */}
      <div className="relative hidden h-9 lg:block" style={{ paddingLeft: 'var(--stub)' }}>
        <div className="relative h-full border-b border-ink">
          <span className="absolute -top-0.5 right-0 text-[0.78rem] tracking-[0.04em] text-slate sm:text-[0.7rem]">
            °C
          </span>
          {graduations.map((g) => (
            <div
              key={g.t}
              className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${pc(g.t)}%` }}
            >
              <span
                className={`text-[0.78rem] tracking-[0.04em] tabular-nums sm:text-[0.7rem] ${
                  g.majeur ? 'text-slate' : 'text-transparent'
                }`}
              >
                {degre(g.t)}
              </span>
              <span
                aria-hidden
                className={`mt-1 w-px bg-ink ${g.majeur ? 'h-2.5' : 'h-1.5 opacity-40'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─── Les quatre voies ─── */}
      <div className="relative">
        {/* Grille de fond : les verticales traversent les quatre voies d'un
            seul tenant, comme sur un relevé. C'est elle qui fait lire
            l'ensemble comme un graphique et non comme quatre lignes. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ left: 'var(--stub)' }}
        >
          {graduations.map((g) => (
            <div
              key={g.t}
              className={`absolute inset-y-0 w-px ${g.majeur ? 'bg-line' : 'bg-line/50'}`}
              style={{ left: `${pc(g.t)}%` }}
            />
          ))}
        </div>

        <dl className="relative">
          {plages.map((p, i) => {
            const froid = p.a <= 0;
            return (
              <Reveal key={p.usage} delay={Math.min(i * 0.06, 0.2)}>
                <div className="grid items-baseline gap-x-0 gap-y-3 border-t border-line py-7 lg:grid-cols-[var(--stub)_1fr] lg:py-8">
                  <div className="lg:pr-10">
                    <dt className="heading text-[clamp(1.25rem,2.4vw,1.85rem)] leading-[1.12] text-ink">
                      {p.usage}
                    </dt>
                    <dd className="mt-1.5 max-w-[34ch] text-[0.9rem] leading-6 text-slate">
                      {p.note}
                    </dd>
                  </div>

                  <dd className="relative">
                    {/* La valeur, en grand, en chiffres de chasse fixe :
                        c'est elle qu'on retient, pas la barre. */}
                    <p
                      className={`heading text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none whitespace-nowrap tabular-nums ${
                        froid ? 'text-brand' : 'text-ink'
                      }`}
                    >
                      {p.label}
                    </p>

                    {/* La voie. La barre est posée à sa vraie place sur
                        l'axe — c'est le seul endroit de la page où une
                        position porte une information. */}
                    <div className="relative mt-4 h-2.5">
                      <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line" />
                      <div
                        aria-hidden
                        className={`absolute top-0 h-2.5 ${froid ? 'bg-brand' : 'bg-ink'}`}
                        style={{
                          left: `${pc(p.de)}%`,
                          width: `${pc(p.a) - pc(p.de)}%`,
                          minWidth: '3px',
                        }}
                      />
                    </div>
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>

      {/* Règle de bas, sur téléphone seulement : sans elle, les barres
          flotteraient sans repère puisque la règle de tête est masquée. */}
      <div className="relative mt-2 h-6 border-t border-ink lg:hidden">
        {graduations
          .filter((g) => g.majeur)
          .map((g) => (
            <span
              key={g.t}
              className="absolute top-1.5 -translate-x-1/2 text-[0.78rem] text-slate tabular-nums sm:text-[0.7rem]"
              style={{ left: `${pc(g.t)}%` }}
            >
              {degre(g.t)}
            </span>
          ))}
        <span className="absolute top-1.5 right-0 text-[0.78rem] text-slate sm:text-[0.7rem]">°C</span>
      </div>
    </div>
  );
}
