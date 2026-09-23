import { company, servedTowns } from '@/content/company';
import { Reveal } from '@/components/ui/Reveal';
import { ZoneIntervention } from '@/components/thermo/ZoneIntervention';

/**
 * Zone d'intervention.
 *
 * ─── CE QUI A CHANGÉ ─────────────────────────────────────────────────────
 * La version précédente composait « Forbach » à 7 rem : le nom de la ville
 * devenait l'élément le plus mémorable de toute la page d'accueil. Une
 * typographie de cette taille est un effet, pas une information — et elle
 * plaçait une commune au-dessus des trois régions réellement desservies.
 *
 * Les communes s'alignaient ensuite séparées par des points médians, dans
 * un bloc dense qui se lisait exactement pour ce qu'il était : une liste
 * destinée aux moteurs.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── CE QUI LES REMPLACE ─────────────────────────────────────────────────
 * Les trois régions passent au premier plan — c'est la réponse à la question
 * que pose la section. Les communes descendent en PHRASE : écrites au fil du
 * texte plutôt qu'énumérées en colonne, elles cessent d'avoir l'air d'un
 * bloc SEO tout en restant lisibles par un moteur.
 *
 * Aucune carte. Une carte tierce imposerait un bandeau de consentement,
 * alors que le site ne pose aucun cookie — et elle n'apprendrait rien de
 * plus qu'une liste de noms à quelqu'un du secteur.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Régions relevées sur le site de l'entreprise, dans les options de son
 * formulaire de contact. Communes issues de `content/company.ts`. Rien n'est
 * ajouté ici.
 */

const regions = ['Moselle', 'Alsace', 'Meurthe-et-Moselle'] as const;

export function Zone() {
  /**
   * Les communes en phrase, pas en colonne : « Morsbach, Forbach, … et
   * Sarreguemines ». C'est la ponctuation qui fait toute la différence entre
   * une information et un référencement.
   */
  const communes = servedTowns.slice(0, -1).join(', ');
  const derniere = servedTowns[servedTowns.length - 1];

  return (
    <section aria-labelledby="zone-titre" className="bg-stone py-14 sm:py-16 lg:py-24">
      <div className="container-t grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 id="zone-titre" className="heading t-h2 text-ink">Nous intervenons près de chez vous</h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.06}>
            {/* Les trois régions : l'information principale de la section. */}
            {/* Les trois régions, séparées par un point médian bleu.
                Le brief les demandait en capitales espacées ; c'est le tic
                typographique que la direction artistique a explicitement
                retiré du site (vingt occurrences supprimées). La lecture
                voulue — trois territoires sur une même ligne — est obtenue
                par le corps et le séparateur, sans déformer les lettres. */}
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {regions.map((r, i) => (
                <span key={r} className="flex items-baseline gap-x-4">
                  {i > 0 ? (
                    <span aria-hidden className="text-[1.1rem] text-brand">
                      ·
                    </span>
                  ) : null}
                  <span className="heading text-[clamp(1.5rem,2.6vw,2.1rem)] text-ink">
                    {r}
                  </span>
                </span>
              ))}
            </p>

            <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-slate">
              Siège à {company.city}, à deux pas de {company.primaryArea}. Nous
              travaillons sur un rayon que nous connaissons — au-delà, le
              forfait de déplacement figure sur le devis.
            </p>

            {/* ─── LES COMMUNES EN PHRASE, SUR GRAND ÉCRAN SEULEMENT ───
                Le schéma les nomme désormais lui aussi. Sous 1024 px, l'axe
                de distance les liste en VRAI TEXTE juste en dessous : la
                phrase y ferait lire quinze noms deux fois de suite.

                Elle reste indispensable au-dessus de 1024 px, où l'éventail
                est un SVG `aria-hidden` — ses intitulés n'existent donc ni
                pour un lecteur d'écran, ni en pratique pour un moteur. Une
                seule source de noms à chaque largeur, et jamais aucune. */}
            <p className="mt-5 hidden max-w-2xl text-[0.95rem] leading-8 text-slate sm:leading-7 lg:block">
              Nous intervenons à {communes} et {derniere}.
            </p>
          </Reveal>
        </div>

        {/* ═════════════ LE SCHÉMA DE ZONE ═════════════
            La section était la plus vide de l'accueil : un titre, trois
            régions, deux paragraphes. Elle affirmait un ancrage sans jamais
            le MONTRER.

            Ce schéma ne dessine qu'une donnée, et elle est réelle :
            `content/company.ts` documente que les quinze communes sont
            rangées par proximité du siège. Le rayon de chaque point est son
            rang. L'angle ne dit rien — il sépare, c'est tout — et le
            cartouche l'annonce.

            Aucune coordonnée géographique n'a été inventée : le projet n'en
            contient aucune, et placer quinze communes de mémoire produirait
            une géographie subtilement fausse, sur la seule page qui
            prétend dire qu'on connaît le terrain. */}
        <figure className="m-0 lg:col-span-12">
          <Reveal delay={0.1}>
            <div className="mt-4 flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem] lg:mt-6">
              <span className="text-ink">
                Zone d’intervention — {servedTowns.length} communes
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                Rangées par distance au siège, sans échelle géographique
              </span>
            </div>

            <div className="mt-8 lg:mt-4">
              <ZoneIntervention />
            </div>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
