import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { company, commitments, servedTowns } from '@/content/company';
import { ZoneIntervention } from '@/components/thermo/ZoneIntervention';
import { PartenaireLocal } from '@/components/entreprise/PartenaireLocal';

/**
 * L'entreprise.
 *
 * ─── PARTI PRIS ÉDITORIAL ────────────────────────────────────────────────
 * L'entreprise a été immatriculée en 2021, et on l'écrit. L'ancien site
 * annonçait « +13 000 interventions », soit sept par jour sans interruption
 * depuis la création — un client attentif fait ce calcul. Une date assumée
 * vaut mieux qu'un chiffre invérifiable.
 *
 * ─── LA RÉPÉTITION QUI ABÎMAIT LA PAGE ───────────────────────────────────
 * Elle disait trois fois la même chose. Quatre « principes », puis six
 * arguments du composant `Pourquoi` (utilisé par cette page et par elle
 * seule), puis trois « engagements » :
 *
 *   « Du matériel qu'on pourra réparer »  →  deux fois, à trois écrans
 *   « Un seul interlocuteur »             →  trois fois
 *   « On vient voir avant de chiffrer »   →  deux fois (= Devis après visite)
 *
 * Les deux listes ont été fondues en une seule, dédoublonnée, en gardant
 * les textes MOT POUR MOT — et en retirant des principes tout ce que les
 * engagements disent déjà. Rien n'a été réécrit, seulement déplacé ou
 * supprimé. `Pourquoi` n'a plus d'appelant.
 *
 * ─── LES TROIS COMPOSITIONS ──────────────────────────────────────────────
 *   LE PORTRAIT     Une déclaration, deux paragraphes, et une signature :
 *                   le dirigeant, le siège, la date d'immatriculation. Une
 *                   page d'entreprise qui se termine par une signature ne
 *                   ressemble à aucune page de prestations.
 *
 *   LES PRINCIPES   Six positions, SANS AUCUN FILET. C'est la seule section
 *                   du site tenue par le seul blanc. Aucune autre page ne
 *                   peut lui ressembler : partout ailleurs, c'est le filet
 *                   qui sépare.
 *
 *   LES ENGAGEMENTS Poids typographique inversé — le nom en petit, le TEXTE
 *                   en grand. Partout ailleurs sur le site le titre domine.
 *                   Ici la substance est dans le corps, et la dernière ligne
 *                   est la seule qui compte juridiquement.
 *
 *   LE TERRITOIRE   Les quinze communes en mur de noms, à 2,2 rem. Pas de
 *                   carte, pas de photo : la liste EST l'image.
 *
 * Aucune donnée inventée : tout vient de `content/company.ts`.
 */

const trail = [{ name: 'L’entreprise', path: '/entreprise' }];

export const metadata = pageMetadata({
  title: 'Techno Froid Chaud — frigoriste chauffagiste à Forbach',
  description:
    'Techno Froid Chaud, entreprise de climatisation, pompes à chaleur et froid professionnel installée à Morsbach, près de Forbach.',
  path: '/entreprise',
});

/**
 * Les six principes, après fusion des anciens `principles` et des arguments
 * de `components/home/Pourquoi.tsx`. Tous les textes sont d'origine.
 *
 * Trois sujets ont été retirés parce que la section « engagements », deux
 * écrans plus bas, les traite déjà : le devis après visite, l'interlocuteur
 * unique et la garantie.
 */
const principes = [
  {
    titre: 'Le dimensionnement décide de tout',
    corps:
      'Un appareil surdimensionné démarre et s’arrête sans cesse : il consomme plus, s’use plus vite et assèche l’air. Le calcul des déperditions ou de la charge à refroidir passe avant le choix du matériel, jamais l’inverse.',
  },
  {
    titre: 'Du matériel qu’on pourra encore réparer',
    corps:
      'Nous restons sur des marques dont les pièces se trouvent dans huit ans. Une machine 15 % moins chère qui devient irréparable en cinq ans coûte plus cher que celle qu’on aura remplacée pièce à pièce.',
  },
  {
    titre: 'Aucune sous-traitance sur le froid',
    corps:
      'La partie frigorifique — celle qui demande une attestation de capacité — est réalisée en interne, jamais confiée à un tiers.',
  },
  {
    titre: 'Le particulier et le professionnel',
    corps:
      'Un séjour de 34 m² et une chambre froide de restaurant relèvent de la même physique. Nous traitons les deux, avec la même méthode — seules changent les contraintes d’hygiène et de continuité de service.',
  },
  {
    titre: 'Une panne ne se traite pas comme un projet',
    corps:
      'Une chambre froide à l’arrêt se compte en marchandise perdue. Les urgences professionnelles passent devant le planning courant, et nous le disons plutôt que de promettre l’immédiat à tout le monde.',
  },
  {
    titre: 'Ce qu’on ne sait pas faire, on le dit',
    corps:
      'Certains chantiers sortent de notre champ. On l’annonce et on oriente, plutôt que d’apprendre sur votre installation.',
  },
];

export default function EntreprisePage() {
  return (
    <>
      <PageHero
        overline="L’entreprise"
        title="Une entreprise de Morsbach, pas un réseau"
        intro="Techno Froid Chaud est une SAS immatriculée en avril 2021, dirigée par Eyup Mermer. Nous travaillons sur un rayon que nous connaissons : le bassin houiller et l’est mosellan."
        trail={trail}
        facts={[
          { k: 'Forme', v: company.legalForm },
          { k: 'Immatriculation', v: 'Avril 2021' },
          { k: 'SIREN', v: company.siren },
          { k: 'Garantie', v: `${company.warrantyYears} ans` },
        ]}
        variant="photo"
        actions
        photo={{
          src: '/photos/hero-entreprise.jpg',
          alt: 'Technicien procédant au réglage d’un module de production de chaleur.',
          position: '58% 45%',
        }}
      />

      {/* ═════════════ LE PORTRAIT ═════════════
          Une déclaration, deux paragraphes, une signature. Le texte est
          large (jusqu'à 1,3 rem) parce que c'est la page où il doit être lu,
          pas parcouru. */}
      <section aria-labelledby="portrait" className="bg-white py-16 lg:py-24">
        {/* ─── DEUX COLONNES À PARTIR DE 1024 px ───
            Le bloc empilait titre, chapeau, corps et signature dans une seule
            colonne large de 50 à 62 caractères : sur un écran de 1 440 px, la
            moitié droite restait vide sur 854 px de haut, sur la page même
            qui doit inspirer confiance.

            La colonne de texte ne s'élargit pas — une ligne de plus de 65
            signes se lit mal, et ça ne se négocie pas. C'est le SECOND bloc
            qui vient occuper le vide, ce qui est exactement la composition de
            la planche d'accueil : l'énoncé à gauche, ce qui le développe à
            droite.

            `lg:row-start-1` sur les deux colonnes : sans lui, le premier
            enfant déclaré en `col-start-8` pousserait le suivant sur une
            deuxième rangée. */}
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-6 lg:row-start-1">
            <h2
              id="portrait"
              className="heading max-w-[16ch] text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.01] text-ink"
            >
              Le froid et le chaud, même physique
            </h2>

            <p className="mt-8 max-w-[50ch] text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.55] text-ink lg:mt-10">
              Déplacer de l’énergie d’un endroit à un autre : c’est le même
              raisonnement qui gouverne une pompe à chaleur et un groupe de
              chambre froide.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8 lg:row-start-1" delay={0.1}>
            <p className="mt-8 max-w-[62ch] text-[1.05rem] leading-8 text-slate lg:mt-3">
              C’est pour cette raison qu’une même équipe pose une pompe à
              chaleur le mardi et remonte un groupe frigorifique le jeudi. Le
              geste change, le raisonnement non. Les bâtiments du bassin
              houiller ont par ailleurs leurs habitudes — combles bas,
              alimentations anciennes, façades contraintes — et cela change le
              dimensionnement plus souvent qu’on ne le croit.
            </p>

            {/* La signature. Le dirigeant, le siège, la date : trois données
                de `content/company.ts`, posées comme on signe une lettre.
                Elle suit le corps dans sa colonne : une signature se pose au
                bas de ce qu'elle signe, pas au bas de la page. */}
            <div className="mt-12 border-t border-ink pt-7 lg:mt-10 lg:pt-8">
              <p className="heading text-[clamp(1.2rem,2.2vw,1.7rem)] text-ink">
                {company.director}
              </p>
              <p className="mt-2 text-[0.95rem] leading-7 text-slate">
                {company.legalForm} {company.legalName}, immatriculée en avril{' '}
                {company.foundedYear} — SIREN {company.siren}
                <br />
                {company.street}, {company.postalCode} {company.city}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LA RESPIRATION PHOTOGRAPHIQUE ═════════════
          La page enchaînait portrait, principes, engagements, territoire :
          quatre blocs de texte d'affilée, sur près de quatre mille pixels,
          pour UNE seule photographie — celle du hero. Sur la page censée
          donner confiance, c'est la page la plus aride du site.

          ─── POURQUOI CETTE IMAGE, ET POURQUOI ICI ───
          Elle sert déjà l'accueil, en 4/5 dans une colonne, à côté d'un
          texte. Ici elle prend TOUTE la largeur en 21/9 : ce n'est pas la
          même image au même endroit, c'est un autre cadrage pour un autre
          rôle. Là-bas elle illustrait une prestation ; ici elle respire
          entre deux argumentaires, et c'est le geste — un technicien qui
          règle — qui porte le « humain » de la page.

          ─── LA RÈGLE N'A PAS BOUGÉ ───
          Le cartouche dit ce qu'elle est, à la même place que sur les
          planches techniques et sur /realisations : « Illustration
          métier ». Ce n'est PAS un chantier de l'entreprise, la page ne le
          laisse pas entendre, et le crédit est dans
          `public/photos/CREDITS.md`.

          Aucun texte n'est posé sur l'image. Une phrase en surimpression
          aurait demandé d'écrire quelque chose de neuf sur une
          photographie qui ne documente rien — et c'est exactement par là
          qu'un site se met à raconter ce qu'il n'a pas fait. */}
      <section aria-label="Le métier en atelier" className="bg-white pb-16 lg:pb-24">
        <div className="container-t">
          <Reveal as="figure" className="group/ph m-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-steel-800 sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src="/photos/installation-mise-en-service.jpg"
                /* Le hero de cette page porte déjà « Technicien procédant au
                   réglage d'un module de production de chaleur » : deux
                   photographies différentes ne peuvent pas partager le même
                   texte alternatif sur une même page, sinon un lecteur
                   d'écran annonce deux fois la même image. Celui-ci décrit
                   ce qui distingue vraiment cette vue — son cadrage large. */
                alt="Vue large d’un technicien au réglage d’un module de production de chaleur."
                fill
                sizes="(min-width:1024px) 82vw, 92vw"
                className="object-cover object-[50%_42%] transition-transform duration-[1100ms] ease-out group-hover/ph:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/ph:scale-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,17,24,0.3)_0%,rgba(10,17,24,0.06)_55%,rgba(10,17,24,0)_100%)]"
              />
            </div>

            <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3 text-[0.74rem] tracking-[0.08em] text-slate uppercase">
              <span className="text-ink">Illustration métier</span>
              <span aria-hidden className="text-line">—</span>
              <span>Réglage à la mise en service</span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LES PRINCIPES ═════════════
          Aucun filet. C'est la seule section du site tenue par le seul blanc :
          partout ailleurs, c'est un filet qui sépare. Six positions, chacune
          un titre et un paragraphe, séparées par de l'espace et rien d'autre. */}
      <section aria-labelledby="principes" className="border-y border-line bg-stone py-16 lg:py-24">
        <div className="container-t">
          {/* Titre à gauche, énoncé à droite : la composition de la planche
              d'accueil, reprise ici pour la même raison. Empilés, les deux
              laissaient la moitié droite vide juste avant une liste de six
              principes — soit, pour le lecteur, un long blanc suivi d'un long
              texte. */}
          <Reveal className="flex flex-col gap-x-16 gap-y-4 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="principes"
              className="heading max-w-[13ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] text-ink"
            >
              Comment nous travaillons
            </h2>
            <p className="max-w-[48ch] text-[1rem] leading-8 text-slate lg:pb-2">
              Ce qui distingue deux installations identiques sur le papier tient
              à la méthode. Voici la nôtre, dans le détail.
            </p>
          </Reveal>

          {/* L'espacement est porté par le CONTENEUR, pas par les enfants :
              chaque principe est enveloppé par le `div` que produit `Reveal`,
              si bien qu'un `first:mt-0` posé à l'intérieur s'applique toujours
              — le `div` intérieur est toujours le premier enfant de SON
              wrapper. `[&>*+*]` vise les wrappers eux-mêmes, qui sont les
              vrais frères. C'est le seul espacement de la section : il n'y a
              aucun filet entre les six positions. */}
          {/* DEUX PRINCIPES PAR RANGÉE au lieu d'un seul. Empilés en pleine
              largeur, les six faisaient trois écrans d'un même bloc répété —
              la section la plus longue et la plus monotone du site. En deux
              colonnes, chacun se lit d'un coup d'œil, la section tient sur
              un écran et demi, et le regard a un rythme au lieu d'une
              descente.

              `lg:[&>*+*]:mt-0` annule l'espacement vertical hérité : dans
              une grille, c'est `gap-y` qui commande. */}
          <div className="mt-14 [&>*+*]:mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16 lg:[&>*+*]:mt-0">
            {principes.map((p, i) => (
              <Reveal key={p.titre} delay={Math.min(i * 0.04, 0.16)}>
                {/* Deux colonnes sur grand écran : le titre tient les quatre
                    premières, le corps court de la sixième à la douzième.

                    Les six principes étaient empilés pleine largeur, ce qui
                    faisait six blocs identiques sur près de trois écrans —
                    la section la plus longue et la plus monotone du site.
                    En deux colonnes, chaque principe se lit d'un coup d'œil
                    et la section tient sur un écran et demi.

                    AUCUN FILET N'EST AJOUTÉ : c'est la seule section du site
                    tenue par le seul blanc, et c'est ce qui la rend
                    reconnaissable. La colonne vide entre le titre et le
                    corps fait le travail que ferait un trait ailleurs. */}
                {/* Titre au-dessus du corps, et non plus à côté : dans une
                    demi-largeur, deux sous-colonnes laisseraient au texte
                    moins de quarante signes par ligne. */}
                <div>
                  <h3 className="heading max-w-[22ch] text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.12] text-ink">
                    {p.titre}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[1rem] leading-8 text-slate">
                    {p.corps}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Le déroulé en une ligne. Il n'a pas besoin d'une section : la
              page parle de la manière de travailler, pas des six étapes —
              elles sont déroulées en entier sur l'accueil. */}
          <Reveal delay={0.2}>
            <p className="mt-16 max-w-[58ch] border-t border-line pt-7 text-[1rem] leading-8 text-slate lg:mt-20">
              Le déroulé ne change pas selon le métier : c’est la visite qui
              change, pas la façon de travailler.{' '}
              <Link href="/#methode" className="link-t text-ink">
                Les six étapes d’un projet
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LES ENGAGEMENTS ═════════════
          Poids inversé : le nom en petit, le texte en grand. Partout ailleurs
          sur le site c'est le titre qui domine ; ici la substance est dans le
          corps — « aucun chiffrage au téléphone », « écrit sur le devis ».
          Les numéros 01–03 en cyan ont disparu : trois engagements n'ont pas
          d'ordre, ils tiennent ensemble. */}
      <section aria-labelledby="engagements" className="bg-steel-900 py-16 text-white lg:py-24">
        <div className="container-t">
          <Reveal className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="engagements"
              className="heading max-w-[14ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-white"
            >
              Ce sur quoi vous pouvez nous tenir
            </h2>
            <p className="max-w-[50ch] text-[1rem] leading-8 text-steel-100 lg:pb-2">
              Trois engagements que nous prenons nous-mêmes, vérifiables dès le
              premier rendez-vous. Aucun ne dépend d’un organisme extérieur.
            </p>
          </Reveal>

          <dl className="mt-12 lg:mt-16">
            {commitments.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i * 0.06, 0.2)}>
                <div className="border-t border-white/20 py-8 lg:py-10">
                  <dt className="text-[0.92rem] text-steel-100">{c.name}</dt>
                  <dd className="mt-3 max-w-[46ch] text-[clamp(1.15rem,2.1vw,1.6rem)] leading-[1.45] text-white">
                    {c.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.22}>
            <p className="border-t-2 border-white pt-7 text-[1.02rem] leading-8 text-white">
              Ces engagements figurent sur le devis. Ils vous sont opposables à
              partir de sa signature.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LE TERRITOIRE ═════════════
          Quinze noms de communes, en grand. Ni carte, ni photographie, ni
          encadré gris : la liste EST l'image, et c'est la seule preuve
          d'ancrage qu'on puisse donner sans rien inventer. */}
      <section aria-labelledby="territoire" className="border-t border-line bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="territoire"
                className="heading max-w-[12ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] text-ink"
              >
                Un rayon qu’on connaît
              </h2>
              <p className="max-w-[40ch] text-[0.98rem] leading-8 text-slate lg:pb-1">
                Travailler sur un territoire connu, c’est arriver en sachant
                déjà ce qu’on va trouver. Les communes sont rangées par
                distance au siège, de {company.city} vers l’extérieur.
              </p>
            </div>
          </Reveal>

          {/* ═════════════ LA PLANCHE TERRITORIALE ═════════════
              Le mur de quinze noms disait le territoire en typographie. Il
              le disait bien, mais il le disait en LISTE — et une liste ne
              montre pas un rayon.

              C'est la planche de l'accueil qui vient ici, à l'identique :
              même composant, même source, même cartouche. Elle ne répète
              pas la liste, elle la remplace — et elle apporte ce que la
              liste ne pouvait pas donner, l'ordre de proximité, qui est
              pourtant documenté dans `content/company.ts` depuis toujours.

              Sous 1024 px elle se déroule en axe vertical, donc les quinze
              noms restent du vrai texte : rien n'est perdu pour un lecteur
              d'écran ni pour un moteur. */}
          <Reveal as="figure" className="m-0 mt-11 lg:mt-14" delay={0.08}>
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
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

          <Reveal delay={0.14}>
            <p className="mt-10 max-w-[56ch] border-t border-line pt-7 text-[0.97rem] leading-7 text-slate">
              Au-delà de ce rayon, un forfait de déplacement s’ajoute. Il est
              indiqué sur le devis, jamais découvert après l’intervention.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ PARTENAIRE LOCAL ═════════════
          Écrite, mais neutralisée tant que le nom exact du club de lutte de
          Stiring-Wendel n'est pas confirmé. Le composant renvoie `null` et
          la page n'affiche rien : un cadre vide sous un titre « PARTENAIRE
          LOCAL » se lirait comme un site inachevé, pas comme une section en
          préparation.

          Tout tient dans une constante à remplir — voir le fichier. */}
      <PartenaireLocal />

      <CallToAction
        title="Une question sur votre installation ?"
        body="Si c’est une panne, dites-le dès le premier message : le traitement n’est pas le même qu’un projet d’installation."
      />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
