import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';

/**
 * Appel à l'action de fin de page.
 *
 * ─── CE QUI A ÉTÉ RETIRÉ ─────────────────────────────────────────────────
 * Le sur-titre « Votre projet » : un micro-label qui annonçait une section
 * dont le titre disait déjà tout.
 *
 * Le titre par défaut « Votre projet mérite une installation pensée
 * correctement » : une formule de publicité. On ne dit pas au client ce que
 * son projet mérite, on lui demande ce qu'il veut faire.
 *
 * La ligne d'horaires : ils ne figurent pas sur le site de l'entreprise et
 * restent à confirmer. Ils n'ont rien à faire dans l'élément le plus
 * engageant de la page.
 *
 * La colonne séparée pour les actions : elle coupait la lecture en deux à
 * l'endroit précis où elle doit converger.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Ce qui reste : une question, une phrase, deux façons de répondre. Le
 * téléphone est composé au même corps que le bouton parce que dans ce
 * métier l'appel reste le premier canal — le reléguer en petit lien serait
 * une erreur commerciale. L'e-mail vient en second, discret.
 *
 * Aucun formulaire ici : il doublerait celui de `/contact` et disperserait
 * la mesure. On envoie vers un seul endroit.
 *
 * COMPOSANT PARTAGÉ — également utilisé par les pages métier, qui passent
 * leur propre `title` et `body`. Toute modification s'y répercute.
 */

export function CallToAction({
  title = 'Un projet de chauffage, de climatisation ou de froid ?',
  body = 'Décrivez-nous la situation en quelques lignes. Nous vous rappelons pour convenir d’une visite — ou pour évaluer l’urgence s’il s’agit d’une panne.',
  axe = false,
}: {
  /** Conservé pour compatibilité : plus affiché depuis la refonte du CTA. */
  overline?: string;
  title?: React.ReactNode;
  body?: string;
  /**
   * Ouvre le bloc sur un filet gradué qui va du froid au chaud.
   *
   * OPT-IN, et il le restera : ce composant ferme sept pages. Le filet
   * reprend l'axe thermique de `/contact`, donc il n'a de sens que là — sur
   * les six autres il serait un ornement, c'est-à-dire exactement ce que la
   * direction artistique s'interdit.
   *
   * `false` par défaut : les six autres pages rendent le même HTML qu'avant,
   * à l'octet près.
   */
  axe?: boolean;
}) {
  return (
    <section className="bg-steel-900 py-14 text-white lg:py-16">
      <div className="container-t">
        {/* ─── LE FILET THERMIQUE ───
            Froid à gauche, chaleur à droite, et des graduations qui
            s'effacent vers le milieu. C'est le même trait que l'axe posé en
            tête de `/contact`, réduit à sa plus simple expression : deux
            mots, un dégradé, aucune valeur.

            Deux éléments superposés plutôt qu'un seul : un dégradé CSS ne
            sait pas porter à la fois un trait continu et des graduations. */}
        {axe ? (
          <div aria-hidden className="mb-7 lg:mb-9">
            <div className="h-1.5 w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.22)_0_1px,transparent_1px_18px)]" />
            <div className="-mt-[1px] h-px w-full bg-[linear-gradient(to_right,var(--color-brand)_0%,rgba(255,255,255,0.25)_46%,var(--color-alert)_100%)]" />
            <div className="mt-2.5 flex justify-between text-[0.7rem] tracking-[0.14em] uppercase">
              <span className="text-brand">Froid</span>
              <span className="text-alert">Chaleur</span>
            </div>
          </div>
        ) : null}

        <Reveal>
          <h2 className="heading max-w-4xl text-[clamp(2rem,4.2vw,3.4rem)] text-white">
            {title}
          </h2>

          <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-steel-100">{body}</p>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Un filet ouvre la zone d'action. Il ne décore pas : il marque
              le passage de la lecture à la décision, et il donne au bloc la
              présence qui lui manquait sans rien grossir ni colorer. */}
          <div className="mt-10 border-t border-white/15 pt-9 lg:mt-12 lg:pt-10">
            {/* Les trois façons de répondre sur une même ligne : elles se
                valent, et sur ce métier l'appel reste le premier canal —
                le reléguer en petit lien serait une erreur commerciale. */}
            <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
              <Link href="/contact" className="btn btn-primary btn-arrow">
                Demander un devis
              </Link>

              <a
                href={company.phoneHref}
                className="heading -my-2 inline-flex items-center py-2.5 text-[clamp(1.5rem,2.4vw,2rem)] text-white underline-offset-[6px] hover:underline"
                aria-label={`Appeler le ${company.phone}`}
              >
                {company.phone}
              </a>

              <a
                href={`mailto:${company.email}`}
                className="link-t inline-flex break-all text-[0.95rem] text-steel-200 hover:text-white"
              >
                {company.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
