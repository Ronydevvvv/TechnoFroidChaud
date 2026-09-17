import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import Link from 'next/link';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { PlanDiffusion } from '@/components/thermo/PlanDiffusion';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, serviceSchema, breadcrumbSchema } from '@/lib/seo';
import { tradeBySlug } from '@/content/services';
import { etapes } from '@/content/methode';
import { company } from '@/content/company';
import { faq } from '@/content/site';

/**
 * Climatisation — page pilote, seconde version.
 *
 * ─── POURQUOI LA PREMIÈRE VERSION A ÉTÉ REFUSÉE ──────────────────────────
 * Elle avait supprimé les cartes, les numéros et les labels — et elle
 * restait un gabarit. Toutes ses sections partageaient la même composition :
 * titre à gauche, contenu à droite, filets horizontaux, grandes réserves de
 * blanc. On avait remplacé des encadrés par des zones de texte, ce qui ne
 * change pas la nature du problème. La page avait aussi GRANDI (4 884 px),
 * alors qu'elle devait gagner en densité.
 *
 * ─── LA RÈGLE DE CETTE VERSION ───────────────────────────────────────────
 * Aucune composition n'est employée deux fois. En descendant, chaque écran
 * change de principe :
 *
 *   IMBRICATION   photo verticale à fond perdu à gauche, nomenclature à
 *                 droite qui CHEVAUCHE l'image. Rien n'est aligné sur la
 *                 grille de l'autre.
 *   BANDEAU       pleine largeur, serré, empilé : la thèse puis le relevé
 *                 en quatre colonnes courtes. Aucun découpage gauche/droite.
 *   PLEIN         une photographie à fond perdu, légende dans l'image.
 *                 Le seul temps purement visuel de la page.
 *   TITRE EN VEDETTE  la question ouvre le paragraphe, la réponse
 *                 l'enchaîne dans la même ligne de texte. Aucune colonne :
 *                 le bloc le plus dense de la page, juste après le plus aéré.
 *   FAQ           accordéon, compact, sans sur-titre.
 *
 * ─── CE QUI A ÉTÉ BANNI DE CETTE PAGE ────────────────────────────────────
 *   — le filet cyan d'annonce : zéro occurrence hors du hero ;
 *   — le grand aplat anthracite : un seul, l'appel à l'action final ;
 *   — les numéros 01/02 : zéro ;
 *   — la réserve de blanc décorative : les sections sont serrées, la
 *     respiration vient des changements de sol et de la photographie.
 *
 * ─── LES PHOTOGRAPHIES ───────────────────────────────────────────────────
 * J'avais écrit qu'il n'existait qu'une image de climatisation exploitable.
 * C'était faux : la source fait 3840 × 2560, on y prélève des CADRAGES
 * différents. `clim-unite.jpg` isole l'unité et sa grille circulaire en
 * portrait ; `clim-bande.jpg` la reprend en bande large avec son ombre
 * portée sur le mur à panneaux. Ce sont deux images distinctes, pas la
 * photographie du hero répétée.
 * ─────────────────────────────────────────────────────────────────────────
 */

const trade = tradeBySlug('climatisation')!;
const trail = [{ name: 'Climatisation', path: '/climatisation' }];

export const metadata = pageMetadata({
  title: 'Installation de climatisation à Forbach et en Moselle',
  description:
    'Installation, entretien et dépannage de climatisation à Forbach : mono-split, multi-split, gainable et cassette. Dimensionnement calculé avant devis.',
  path: '/climatisation',
});

const pageFaq = faq.filter((f) =>
  [
    'Faut-il faire entretenir une climatisation ?',
    'Le devis est-il payant ?',
    'Sous quel délai intervenez-vous en dépannage ?',
  ].includes(f.q),
);

const releves = [
  { k: 'Volume', v: 'Surface × hauteur réelle' },
  { k: 'Exposition', v: 'Orientation et vitrages' },
  { k: 'Isolation', v: 'Année et nature des murs' },
  { k: 'Occupation', v: 'Nombre de personnes' },
];

const devis = [
  {
    q: 'La longueur de liaison est-elle chiffrée ?',
    a: 'Au-delà de la longueur fournie avec l’appareil, chaque mètre se facture. S’il n’apparaît pas, il arrivera en fin de chantier.',
  },
  {
    q: 'Le percement et sa reprise sont-ils inclus ?',
    a: 'Traverser un mur, poser un fourreau, reboucher proprement : c’est du temps, et cela doit figurer.',
  },
  {
    q: 'La mise en service est-elle détaillée ?',
    a: 'Tirage au vide, contrôle d’étanchéité, relevé des pressions. Un appareil branché n’est pas un appareil mis en service.',
  },
];

const engagements = [
  `Installés à ${company.city}`,
  'Devis après visite',
  `Garantie ${company.warrantyYears} ans`,
  'Dépannage qualifié',
  'Un seul interlocuteur',
];

export default function ClimatisationPage() {
  return (
    <>
      <PageHero
        overline="Climatisation"
        title="Rafraîchir sans surdimensionner"
        intro={trade.lede}
        trail={trail}
        variant="photo"
        actions
        photo={{
          src: '/photos/hero-climatisation.jpg',
          alt: 'Unités extérieures de climatisation multi-split en façade d’un bâtiment.',
          position: '62% 50%',
        }}
      />

      {/* ═════════════ IMBRICATION ═════════════
          La photographie part du bord gauche de l'écran et monte plus haut
          que le texte ; le bloc de droite redescend sur elle. Les deux
          n'ont pas la même origine verticale et se recouvrent : c'est ce
          chevauchement qui remplace la colonne sagement posée à côté.

          La nomenclature est SERRÉE — quatre lignes, petit corps, filets
          entre les rangs seulement. Elle se lit comme une planche de
          matériel, pas comme quatre paragraphes. */}
      <section className="relative bg-white">
        <div className="lg:grid lg:grid-cols-12">
          {/* Photographie : à fond perdu à gauche, sur 5 colonnes. */}
          <div className="relative h-[320px] lg:col-span-5 lg:h-[660px]">
            <Image
              src="/photos/clim-unite.jpg"
              alt="Unité extérieure de climatisation et sa grille de ventilation, fixée sur un mur à panneaux."
              fill
              sizes="(min-width:1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* `z-10` : sans lui, la photographie affleurait derrière le bord
              du panneau et le chevauchement se lisait comme un défaut
              d'alignement plutôt que comme un parti pris. Le panneau doit
              passer franchement DEVANT. */}
          <div className="relative z-10 lg:col-span-7 lg:-ml-16 lg:pt-20">
            <div className="bg-white px-[clamp(1.25rem,4.5vw,3.5rem)] py-12 lg:py-14 lg:pr-[clamp(1.25rem,4.5vw,3.5rem)] lg:pl-16">
              <Reveal>
                <h2 className="heading max-w-[16ch] text-[clamp(1.7rem,2.9vw,2.3rem)] leading-[1.1] text-ink">
                  Quatre façons de poser une climatisation
                </h2>
                <p className="mt-5 max-w-[46ch] text-[1rem] leading-7 text-slate">
                  Le choix ne dépend pas du budget mais de la configuration —
                  nombre de pièces, hauteur sous plafond, présence de combles,
                  contraintes de façade. Pour les{' '}
                  {trade.audience.toLowerCase()}.
                </p>
              </Reveal>

              <dl className="mt-9">
                {trade.items.map((item, i) => (
                  <Reveal key={item.title} delay={Math.min(i * 0.04, 0.16)}>
                    <div className="grid gap-x-8 gap-y-1 border-t border-line py-4 sm:grid-cols-[10rem_1fr]">
                      <dt className="heading text-[1.02rem] text-ink">
                        {item.title}
                      </dt>
                      <dd className="text-[0.93rem] leading-6 text-slate">
                        {item.body}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ BANDEAU ═════════════
          Pleine largeur, empilé, serré. La thèse tient le haut, le relevé
          court en dessous sur quatre colonnes courtes. Aucun titre de
          section : la phrase EST le titre.

          La méthode et les engagements se replient sur la dernière ligne —
          ils occupaient une section entière. */}
      <section className="border-y border-line bg-stone py-12 lg:py-16">
        <div className="container-t">
          <Reveal>
            <p className="max-w-[34ch] text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.35] text-ink">
              Un appareil trop puissant démarre et s’arrête sans cesse : il
              consomme davantage, assèche l’air et s’use plus vite qu’un
              modèle plus petit correctement calculé.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-7 lg:grid-cols-4 lg:gap-x-12">
              {releves.map((r) => (
                <div key={r.k}>
                  <dt className="text-[0.85rem] text-slate">{r.k}</dt>
                  <dd className="heading mt-1 text-[1.02rem] text-ink">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-9 text-[0.9rem] leading-7 text-slate">
              <span className="text-slate/60">Le déroulé — </span>
              {etapes.map((e) => e.nom).join(' · ')}
              <span className="mx-3 text-slate/30">|</span>
              <span className="text-slate/60">Nos engagements — </span>
              {engagements.join(' · ')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LE PLAN ═════════════
          La pièce maîtresse graphique de la page, et la CINQUIÈME
          projection du site. Les quatre autres sont prises : coupe de
          bâtiment à l'accueil, axonométrie aux chambres froides, élévation
          à la réfrigération, schéma de circuit aux pompes à chaleur.

          Restait la vue en PLAN — la section horizontale. C'est le
          complément exact de la coupe de l'accueil, et c'est la bonne ici :
          une climatisation ne se juge pas en hauteur mais à la portée de
          l'air soufflé et au chemin de l'air repris. Le contenu de la page
          raisonne déjà en plan sans le dire — « bouches discrètes dans
          chaque pièce », « diffusion sur quatre côtés ».

          Elle est posée APRÈS le bandeau du dimensionnement : la page dit
          d'abord quelles poses existent, puis ce qui décide de la
          puissance, et seulement ensuite ce que l'air fait réellement dans
          la pièce. */}
      <section aria-labelledby="diffusion" className="bg-white py-14 sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="diffusion"
                className="heading max-w-[15ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03] text-ink"
              >
                Jusqu’où l’air va, et par où il revient
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                L’unité intérieure souffle l’air traité vers le fond du
                volume ; il revient le long des parois. Dehors, l’unité
                extérieure rejette la chaleur prise dedans.
              </p>
            </div>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-11 lg:mt-16" delay={0.06}>
            {/* Le cartouche — même convention que les autres planches du
                site. « De principe » n'est pas une précaution de style : le
                plan ne représente aucune installation particulière, et la
                page ne contient ni cote ni portée chiffrée. */}
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
              <span className="text-ink">Zone climatisée — vue en plan de principe</span>
              <span className="flex flex-wrap items-center gap-x-7 gap-y-2">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  Air soufflé et repris
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-alert" />
                  Chaleur rejetée
                </span>
              </span>
            </div>

            <div className="mt-6 lg:mt-10">
              <PlanDiffusion />
            </div>

            {/* ─── LA LÉGENDE MOBILE ───
                Sous 1024 px, le plan ne porte aucun texte : une désignation
                dans le dessin y ferait six pixels de haut. Les cinq
                désignations sortent donc du SVG et passent en HTML, dans
                l'ordre exact où le plan portrait les empile, de la pièce
                jusqu'à la chaleur qui sort. Une seule colonne : un
                `grid-cols-2` se lirait en Z et romprait cette
                correspondance. */}
            <div className="lg:hidden">
              <ul className="mt-6 grid gap-y-3 border-t border-line pt-5 text-[0.86rem] tracking-[0.05em] text-slate uppercase">
                {[
                  'Zone climatisée',
                  'Air soufflé',
                  'Air repris',
                  'Unité intérieure',
                ].map((n) => (
                  <li key={n}>{n}</li>
                ))}
                <li className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-4">
                  <span>Unité extérieure</span>
                  <span className="tracking-normal text-slate/80 normal-case">
                    Chaleur rejetée dehors
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ PLEIN ═════════════
          Le seul temps purement visuel. Pas de colonne, pas de titre : une
          photographie à fond perdu et sa légende posée dedans. C'est lui
          qui donne à la page sa respiration — pas une réserve de blanc. */}
      <section className="relative h-[300px] w-full overflow-hidden lg:h-[440px]">
        <Image
          src="/photos/clim-bande.jpg"
          alt="Unité extérieure de climatisation et son ombre portée sur un mur à panneaux."
          fill
          sizes="100vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_top,rgba(10,17,24,0.92)_0%,rgba(10,17,24,0.55)_38%,rgba(10,17,24,0)_100%)]"
        />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-t pb-8 lg:pb-10">
            <p className="max-w-[44ch] text-[0.95rem] leading-7 text-white/85">
              Une seule traversée de façade, un seul appareil visible dehors :
              c’est ce que permet un multi-split correctement dimensionné.
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════ LA PIÈCE MAÎTRESSE ═════════════
          C'est le seul contenu de la page qu'aucun concurrent n'écrit :
          il doit donc être ce qu'on retient. Il est traité comme une PAGE
          DE DOCUMENT, pas comme une section de site.

          ─── CE QUI LE REND DISTINCT ───
          Deux règles épaisses, en haut et en bas, cadrent le bloc comme un
          feuillet. Entre elles, chaque question est composée en grand dans
          la colonne principale, et sa réponse est renvoyée en NOTE DE
          MARGE, à gauche, en petit corps. La marge est un procédé
          d'imprimerie — elle n'existe nulle part ailleurs sur le site, et
          elle est l'exact inverse de la version précédente, qui poussait
          les réponses à droite.

          ─── CE QUI N'EST PAS AFFIRMÉ ───
          Le titre dit « à poser à un devis de climatisation », sans
          exception ni comparaison : la page ne prétend pas que les devis
          des autres sont incomplets, elle donne au lecteur de quoi lire
          n'importe lequel — y compris celui de l'entreprise. */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="border-t-2 border-ink pt-8 lg:pt-10">
              <p className="text-[0.9rem] text-slate">
                Trois questions à poser à un devis de climatisation
              </p>
              <h2 className="heading mt-4 max-w-[17ch] text-[clamp(2.1rem,5vw,4rem)] leading-[1.02] text-ink">
                Ce qui sépare deux devis au même prix
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 lg:mt-20">
            {devis.map((d, i) => (
              <Reveal key={d.q} delay={Math.min(i * 0.06, 0.2)}>
                <div className="grid gap-x-10 gap-y-3 border-t border-line py-8 lg:grid-cols-12 lg:py-10">
                  {/* La note de marge. Petit corps, alignée en tête de la
                      question : elle commente, elle ne répond pas à côté. */}
                  <p className="text-[0.88rem] leading-6 text-slate lg:col-span-3 lg:pt-2">
                    {d.a}
                  </p>
                  <h3 className="heading text-[clamp(1.35rem,3vw,2.3rem)] leading-[1.15] text-ink lg:col-span-8 lg:col-start-5">
                    {d.q}
                  </h3>
                </div>
              </Reveal>
            ))}
            <div aria-hidden className="border-t-2 border-ink" />
          </div>
        </div>
      </section>

      {/* ═════════════ FAQ ═════════════
          Le composant partagé porte un sur-titre à filet cyan ; il est donc
          écrit ici, sans lui. L'accordéon, lui, est réemployé tel quel. */}
      <section className="border-t border-line bg-stone py-14 lg:py-16">
        <div className="container-t grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="heading text-[clamp(1.5rem,2.4vw,1.9rem)] text-ink">
                Ce qu’on nous demande le plus
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <Accordion items={pageFaq} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════ L'APPEL À L'ACTION ═════════════
          Le composant partagé compose un titre, un paragraphe, puis une
          rangée d'actions — la clôture standard de tous les sites
          d'entreprise. Il est remplacé ICI seulement ; les autres pages
          continuent de l'utiliser.

          Ce qui change : le NUMÉRO devient l'élément le plus grand de la
          page après le hero. Sur un métier où l'on décroche son téléphone,
          le numéro n'est pas une mention de bas de page, c'est l'action.
          Le devis passe en second, l'e-mail en troisième. */}
      <section className="bg-steel-900 py-16 text-white lg:py-24">
        <div className="container-t">
          <Reveal>
            <p className="max-w-[40ch] text-[1.05rem] leading-8 text-steel-100">
              Un projet de climatisation ? La visite technique permet de
              calculer la puissance nécessaire et de repérer le passage des
              liaisons. C’est elle qui rend le devis fiable.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href={company.phoneHref}
              aria-label={`Appeler le ${company.phone}`}
              className="heading mt-8 block text-[clamp(2.4rem,7.5vw,5.5rem)] leading-[1.05] text-white transition-colors duration-300 hover:text-brand lg:mt-10"
            >
              {company.phone}
            </a>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              <Link href="/contact" className="btn btn-primary btn-arrow">
                Demander un devis
              </Link>
              <a
                href={`mailto:${company.email}`}
                className="link-t text-[0.98rem] text-steel-100 hover:text-white"
              >
                {company.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={serviceSchema({
          name: 'Installation de climatisation',
          description: trade.lede,
          path: '/climatisation',
        })}
      />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
