import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { BoucleThermodynamique } from '@/components/thermo/BoucleThermodynamique';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { tradeBySlug } from '@/content/services';
import { faq } from '@/content/site';

/**
 * Pompes à chaleur — page à plus forte valeur du site.
 *
 * ─── L'IDÉE FORTE, ET LA COMPOSITION QUI EN DÉCOULE ──────────────────────
 * Une pompe à chaleur ne fabrique pas de chaleur : elle la DÉPLACE. Tout le
 * reste de la page découle de là — le rendement, le choix de la solution,
 * et jusqu'aux aides publiques qui existent précisément parce que ce
 * déplacement consomme moins.
 *
 * La page est donc bâtie autour de ce mouvement :
 *
 *   LA BOUCLE       Le circuit frigorifique, fermé, avec ses quatre organes
 *                   aux quatre côtés et le sens de parcours du fluide. Un
 *                   seul segment cyan — là où la chaleur est PRISE — un seul
 *                   rouge — là où elle est RENDUE — et trois flèches
 *                   extérieures pour les trois échanges. Elle remplace un
 *                   escalier typographique qui disait l'ordre du cycle sans
 *                   dire qu'il est fermé.
 *
 *   LE RAPPORT      Le COP, montré au lieu d'être écrit : deux barres dans
 *                   la proportion exacte du texte, 1 kWh consommé contre
 *                   4 kWh restitués. Le libellé dit EXEMPLE — un COP affiché
 *                   sans cette précaution se lirait comme une performance
 *                   promise par l'entreprise.
 *
 *   LE GLOSSAIRE    Les quatre configurations en liste ouverte à alinéa
 *                   suspendu : nom en grand, description en retrait
 *                   dessous. Ni cartes, ni grille 2 × 2, ni colonnes.
 *
 *   LE TABLEAU      Les aides, en tableau réel sur la seule bande carbone
 *                   du site. La dernière ligne — la condition RGE — reçoit
 *                   un filet épais : c'est la seule information de la page
 *                   qui peut coûter de l'argent au visiteur s'il l'ignore.
 *
 * Aucune composition de /climatisation ni de /chauffage n'est reprise.
 *
 * ─── CE QUI NE DOIT PAS ÊTRE RÉTABLI ─────────────────────────────────────
 * Le bloc des aides affirmait autrefois une éligibilité appuyée sur une
 * qualification RGE non confirmée. Il explique désormais le mécanisme et sa
 * condition, sans jamais dire que l'entreprise y ouvre droit. Ne pas
 * rétablir de promesse d'éligibilité sans les numéros de qualification.
 * Voir `content/company.ts` et `A-FOURNIR.md`.
 */

const trade = tradeBySlug('pompes-a-chaleur')!;
const trail = [{ name: 'Pompes à chaleur', path: '/pompes-a-chaleur' }];

export const metadata = pageMetadata({
  title: 'Pompe à chaleur à Forbach — installation air/air et air/eau',
  description:
    'Installation de pompes à chaleur air/air et air/eau à Forbach et en Moselle, dimensionnées sur les déperditions réelles du bâtiment.',
  path: '/pompes-a-chaleur',
});

const pageFaq = faq.filter((f) =>
  [
    'Une pompe à chaleur peut-elle remplacer complètement ma chaudière ?',
    'Suis-je éligible aux aides de l’État ?',
    'Que couvre exactement la garantie de trois ans ?',
  ].includes(f.q),
);

const cycle = [
  {
    step: 'Évaporation',
    body: 'Le fluide capte la chaleur de l’air extérieur et passe à l’état gazeux — même par température négative.',
  },
  {
    step: 'Compression',
    body: 'Le compresseur élève la pression du gaz, donc sa température. C’est le seul poste qui consomme réellement.',
  },
  {
    step: 'Condensation',
    body: 'Le gaz chaud cède son énergie au circuit de chauffage ou à l’air soufflé, et redevient liquide.',
  },
  {
    step: 'Détente',
    body: 'Le détendeur fait retomber la pression, le fluide refroidit, et le cycle recommence.',
  },
];

/**
 * Panorama des aides. Chaque ligne décrit un dispositif public et sa
 * condition — aucune ne dit que l'entreprise y donne accès.
 */
const aides = [
  {
    k: 'MaPrimeRénov’',
    v: 'Aide de l’État versée après travaux. Le montant dépend de vos revenus et du gain énergétique obtenu.',
  },
  {
    k: 'CEE',
    v: 'Certificats d’économie d’énergie, versés par les fournisseurs d’énergie. Cumulables avec MaPrimeRénov’.',
  },
  {
    k: 'TVA 5,5 %',
    v: 'Taux réduit sur le matériel et la pose, pour un logement achevé depuis plus de deux ans.',
  },
];

/** Tenue à part : c'est une condition, pas un dispositif. */
const condition = {
  k: 'La condition',
  v: 'Ces deux premiers dispositifs imposent un installateur qualifié RGE. Posez-nous la question avant de commander : nous vous répondrons précisément, pièces à l’appui.',
};

export default function PompesAChaleurPage() {
  return (
    <>
      <PageHero
        overline="Pompes à chaleur"
        title="Déplacer la chaleur plutôt que la produire"
        intro={trade.lede}
        trail={trail}
        facts={[
          { k: 'Types', v: 'Air/air · Air/eau' },
          { k: 'Étude', v: 'Calcul des déperditions' },
          { k: 'Garantie', v: '3 ans' },
        ]}
        variant="photo"
        actions
        /* Le seul hero du site à porter trois relevés ET un chapô de cinq
           lignes : à 375 px le bloc Types / Étude / Garantie tombait en bas
           d'un hero de 963 px. Resserrage sous 640 px uniquement. */
        serreMobile
        photo={{
          src: '/photos/hero-pompes-a-chaleur.jpg',
          alt: 'Pompe à chaleur air/eau installée en pignon d’une maison individuelle.',
          position: '60% 50%',
        }}
      />

      {/* ═════════════ MOMENT 1 — LA BOUCLE ═════════════
          L'escalier typographique — quatre temps décalés vers la droite —
          disait l'ORDRE du cycle. Il ne disait pas que le cycle est FERMÉ,
          ni où la chaleur entre, ni où elle sort, ni que l'électricité
          n'intervient qu'en un seul point. Un circuit dessiné dit les
          quatre à la fois.

          Les quatre textes d'étape sont conservés mot pour mot, sous le
          dessin, en bande calme : le schéma porte le regard, le texte porte
          le détail. */}
      <section aria-labelledby="cycle" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          {/* Titre à gauche, énoncé à droite, sur une seule ligne — la même
              composition que la planche d'accueil. Empilés, ils laissaient
              la moitié droite de l'écran vide juste avant le schéma, à
              l'endroit exact où la page doit donner envie de descendre. */}
          <Reveal className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="cycle"
              className="heading max-w-[15ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-ink"
            >
              Elle ne fabrique pas la chaleur, elle la déplace
            </h2>
            <p className="max-w-[46ch] text-[1.02rem] leading-8 text-slate lg:pb-2">
              C’est pourquoi elle restitue plus d’énergie qu’elle n’en consomme.
              Le fluide fait le même tour, sans fin, tant que la consigne n’est
              pas atteinte.
            </p>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-12 lg:mt-16">
            <div className="flex flex-col gap-y-2 border-t-2 border-ink pt-4 text-[0.74rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-ink">Circuit frigorifique — boucle fermée</span>
              <span>Sens de parcours du fluide</span>
            </div>

            <div className="mt-6 lg:mt-8">
              <BoucleThermodynamique />
            </div>
          </Reveal>

          {/* Les quatre temps, en bande calme sous le schéma. */}
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {cycle.map((phase, i) => (
              <Reveal key={phase.step} delay={Math.min(i * 0.05, 0.18)}>
                <div className="border-t border-line pt-5">
                  <dt className="heading text-[1.12rem] leading-[1.2] text-ink">{phase.step}</dt>
                  <dd className="mt-2.5 text-[0.95rem] leading-7 text-slate">{phase.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ═════════════ MOMENT 2 — LE RAPPORT ═════════════
          Le COP était un paragraphe. C'est un RAPPORT, et un rapport se
          montre : deux barres dont les longueurs sont dans la proportion
          exacte énoncée par le texte — une pour un, quatre pour quatre.

          Rien n'est déduit. Le contenu dit « un COP de 4 signifie 4 kWh de
          chaleur restitués pour 1 kWh consommé » : seules ces deux valeurs
          sont dessinées. L'écart entre les deux barres n'est pas chiffré —
          il est nommé, « prélevé dans l'air extérieur », ce que la boucle
          vient de montrer.

          Et le libellé dit EXEMPLE. Un COP affiché sans cette précaution se
          lirait comme une performance promise par l'entreprise. */}
      <section aria-labelledby="cop" className="border-y border-line bg-stone py-16 lg:py-20">
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[0.74rem] tracking-[0.1em] text-slate uppercase">
                Exemple — lecture d’un COP
              </p>
              <h2
                id="cop"
                className="heading mt-3 text-[clamp(3rem,9vw,6rem)] leading-[0.92] text-ink tabular-nums"
              >
                COP 4
              </h2>
              <p className="mt-6 max-w-[42ch] text-[1rem] leading-8 text-slate">
                Le rendement se lit sur le COP : un COP de 4 signifie 4 kWh de
                chaleur restitués pour 1 kWh consommé. Il chute quand la
                température d’eau demandée monte — d’où le relevé des émetteurs
                lors de la visite.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {/* Les deux barres. Leurs largeurs — 25 % et 100 % — sont la
                proportion énoncée, pas une mise en page. */}
            <Reveal>
              <div className="border-t border-line pt-6">
                <p className="text-[0.74rem] tracking-[0.08em] text-slate uppercase">
                  Électricité consommée
                </p>
                {/* Le nombre au-dessus, la barre en dessous. Sur la même
                    ligne, une barre à 100 % plus son libellé dépassaient le
                    conteneur de 59 px à 375 px — et surtout, la proportion
                    n'était plus lisible puisque le texte mangeait la piste. */}
                <p className="heading mt-2 text-[clamp(1.6rem,5vw,2.4rem)] leading-none text-ink tabular-nums">
                  1 kWh
                </p>
                <span aria-hidden className="mt-3 block h-4 w-1/4 bg-ink" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-[0.74rem] tracking-[0.08em] text-slate uppercase">
                  Chaleur restituée
                </p>
                <p className="heading mt-2 text-[clamp(1.6rem,5vw,2.4rem)] leading-none text-brand tabular-nums">
                  4 kWh
                </p>
                <span aria-hidden className="mt-3 block h-4 w-full bg-brand" />
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 flex items-start gap-2.5 text-[0.82rem] leading-6 text-slate">
                <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-brand" />
                La différence est prélevée dans l’air extérieur — elle n’est pas
                produite.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════ LE GLOSSAIRE ═════════════
          Liste ouverte à alinéa suspendu : le nom sort dans la marge, la
          description rentre dessous. Aucun encadré, aucune colonne de titres,
          aucune case de hauteur égale — donc rien qui puisse se lire comme
          une grille de cartes. */}
      <section aria-labelledby="solutions" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="solutions"
              className="heading max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] text-ink"
            >
              Quatre configurations, selon l’existant
            </h2>
            <p className="max-w-[50ch] text-[1rem] leading-8 text-slate lg:pb-2">
              Le choix se décide sur l’isolation, le type d’émetteurs et la
              température d’eau nécessaire — jamais sur catalogue.
            </p>
          </Reveal>

          <dl className="mt-11 lg:mt-14">
            {trade.items.map((it, i) => (
              <Reveal key={it.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-t border-line py-7 lg:py-9">
                  <dt className="heading text-[clamp(1.3rem,2.4vw,1.9rem)] leading-[1.1] text-ink">
                    {it.title}
                  </dt>
                  <dd className="mt-3 max-w-[58ch] text-[1rem] leading-8 text-slate lg:ml-[7%]">
                    {it.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.22}>
            <p className="border-t border-line pt-6 text-[0.9rem] text-slate">
              {trade.audience}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LE TABLEAU ═════════════
          Seule bande carbone du site. Le tableau prend toute la largeur au
          lieu d'être posé à côté d'un titre : c'est un document à consulter,
          et sa dernière ligne est celle qui peut coûter de l'argent au
          visiteur — elle reçoit donc le filet épais. */}
      <section aria-labelledby="aides" className="bg-carbon py-16 text-white lg:py-24">
        <div className="container-t">
          <Reveal className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="aides"
              className="heading max-w-[16ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-white"
            >
              Ce qui existe, et à quelles conditions
            </h2>
            <p className="max-w-[52ch] text-[1.02rem] leading-8 text-mist lg:pb-2">
              Le financement d’une pompe à chaleur passe rarement par le seul
              devis. Voici les dispositifs en vigueur et ce qu’ils exigent — y
              compris quand la réponse ne nous arrange pas.
            </p>
          </Reveal>

          <dl className="mt-12 border-t border-white/30 lg:mt-16">
            {aides.map((row, i) => (
              <Reveal key={row.k} delay={Math.min(i * 0.05, 0.16)}>
                <div className="grid gap-x-10 gap-y-2 border-b border-line-dark py-6 lg:grid-cols-12 lg:py-7">
                  <dt className="heading text-[1.15rem] text-white lg:col-span-3 lg:text-[1.3rem]">
                    {row.k}
                  </dt>
                  <dd className="text-[0.97rem] leading-8 text-mist lg:col-span-8 lg:col-start-5">
                    {row.v}
                  </dd>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="grid gap-x-10 gap-y-2 border-b-2 border-t-2 border-white py-7 lg:grid-cols-12 lg:py-9">
                <dt className="heading text-[1.15rem] text-white lg:col-span-3 lg:text-[1.3rem]">
                  {condition.k}
                </dt>
                <dd className="text-[0.97rem] leading-8 text-white lg:col-span-8 lg:col-start-5">
                  {condition.v}
                </dd>
              </div>
            </Reveal>
          </dl>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-[46ch] text-[0.88rem] leading-7 text-white/55">
                Montants et conditions fixés par la réglementation en vigueur —
                à vérifier à la date des travaux.
              </p>
              <Link href="/contact" className="btn btn-onDark shrink-0">
                Vérifier mon éligibilité
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LES QUESTIONS ═════════════
          Écrites ici plutôt qu'avec le composant partagé : celui-ci pose un
          surtitre « FAQ » et une colonne de titre collante à gauche, deux
          marques de gabarit que cette refonte supprime. L'accordéon, lui,
          reste le composant commun — c'est le système, pas le gabarit.

          La méthode est repliée au pied de cette section, en une ligne. Le
          visiteur d'une page métier ne vient pas l'apprendre : il vérifie
          qu'elle existe. */}
      <section aria-labelledby="questions" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <h2
              id="questions"
              className="heading max-w-[16ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] text-ink"
            >
              Les questions qui reviennent
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-9 lg:mt-12">
              <Accordion items={pageFaq} />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-col gap-x-12 gap-y-3 border-t border-line pt-7 lg:flex-row lg:items-baseline">
              <p className="max-w-[54ch] text-[0.95rem] leading-7 text-slate">
                Sur une pompe à chaleur, tout part du calcul des déperditions du
                bâtiment — jamais de la surface seule.
              </p>
              <Link href="/#methode" className="link-t shrink-0 text-[0.95rem] text-ink">
                Comment se passe un projet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction
        title="Un projet de pompe à chaleur ?"
        body="Nous calculons les déperditions avant de proposer une puissance, et nous vous disons ce à quoi vous pouvez prétendre en aides."
      />

      <JsonLd
        data={serviceSchema({
          name: 'Installation de pompe à chaleur',
          description: trade.lede,
          path: '/pompes-a-chaleur',
        })}
      />
      <JsonLd data={faqSchema(pageFaq)} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
