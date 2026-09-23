import { Reveal } from '@/components/ui/Reveal';
import { SystemeThermique, FROIDS } from '@/components/thermo/SystemeThermique';

/**
 * Froid et chaleur — la planche d'accueil.
 *
 * ─── POURQUOI ELLE EXISTE ────────────────────────────────────────────────
 * L'accueil énumérait les métiers. Il ne montrait pas ce qui les relie —
 * que les cinq spécialités sont cinq endroits d'un même bâtiment, et un
 * seul raisonnement. Cette section le montre avant que la page ne se mette
 * à l'expliquer : « Nos métiers » arrive juste après, et n'a plus à porter
 * seul la démonstration.
 *
 * ─── CE QU'ELLE N'EST PAS ────────────────────────────────────────────────
 * Pas une grille de quatre cartes, pas une illustration posée à côté d'un
 * paragraphe, pas une série d'icônes. Le dessin EST la section : il prend
 * la largeur, le texte se tient au-dessus en trois lignes, et rien n'est
 * ajouté dessous.
 *
 * ─── LE TEXTE EST COURT PARCE QUE LE DESSIN PARLE ────────────────────────
 * Deux phrases. La première nomme le principe commun, la seconde dit que
 * c'est le même geste. Tout le reste — les cinq systèmes, les trois
 * consignes, les fluides, la chaleur rejetée — est dans la planche. C'est
 * exactement le cas où un schéma remplace une explication.
 *
 * Aucune donnée n'est avancée ici : les trois températures affichées dans
 * la coupe sont celles du registre de `/refrigeration`, au mot près.
 */

export function Systeme() {
  /* `lg:pt-10` et non `lg:pt-[4.5rem]` : cette section suit la bande des
     repères, et toutes deux sont blanches. Les 72 px d'ouverture se
     cumulaient avec les 36 px de fermeture de la bande, sans que rien — ni
     filet, ni fond — ne dise à l'œil où finissait l'une et où commençait
     l'autre. Le bas de la section garde ses 96 px : lui débouche sur
     l'acier des métiers, donc il se lit comme une marge, pas comme un
     trou. */
  return (
    <section aria-labelledby="systeme-titre" className="border-y border-line bg-white py-14 sm:py-16 lg:pt-10 lg:pb-24">
      <div className="container-t">
        <Reveal>
          <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="systeme-titre"
              className="heading max-w-[13ch] text-[clamp(2.1rem,5vw,3.9rem)] leading-[1.02] text-ink"
            >
              Froid et chaleur, le même raisonnement
            </h2>
            <p className="max-w-[44ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
              Déplacer de l’énergie d’un endroit à un autre. C’est la même
              physique qui tient une chambre à −22 °C et qui chauffe un
              logement — seuls changent le matériel et les contraintes.
            </p>
          </div>
        </Reveal>

        <Reveal as="figure" className="m-0 mt-11 lg:mt-16" delay={0.06}>
          {/* Le cartouche, même convention que les autres planches du site :
              désignation à gauche, code couleur à droite. */}
          <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:text-[0.74rem] sm:items-baseline sm:justify-between">
            <span className="text-ink">Bâtiment équipé — coupe de principe</span>
            <span className="flex flex-wrap items-center gap-x-7 gap-y-2">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-px w-6 bg-brand" />
                Fluide et air froids
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-px w-6 bg-alert" />
                Chaleur
              </span>
            </span>
          </div>

          <div className="mt-6 lg:mt-10">
            <SystemeThermique />
          </div>

          {/* ─── LA LÉGENDE MOBILE ───
              Sous 1024 px, la coupe ne porte aucun texte : à cette largeur,
              un intitulé dans le dessin ferait cinq pixels de haut. Les cinq
              systèmes et les trois consignes sortent donc du SVG et passent
              en HTML, où ils gardent le corps du reste du site — et où les
              températures deviennent l'élément le plus grand de l'écran.
              C'est la hiérarchie inverse du bureau, et c'est la bonne : sur
              un téléphone, le chiffre porte plus loin que le dessin. */}
          <div className="lg:hidden">
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-line pt-5 text-[0.86rem] tracking-[0.05em] text-slate uppercase">
              {['Pompe à chaleur', 'Climatisation', 'Réfrigération', 'Chambres froides', 'Chauffage'].map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>

            <dl className="mt-6 grid gap-y-5 border-t border-line pt-6">
              {FROIDS.map((f) => (
                <div key={f.temp} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.84rem] tracking-[0.07em] text-slate uppercase">{f.nom}</dt>
                  <dd className="heading text-[clamp(1.35rem,5.6vw,1.9rem)] leading-none whitespace-nowrap text-brand tabular-nums">
                    {f.temp}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
