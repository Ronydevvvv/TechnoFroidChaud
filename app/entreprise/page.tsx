import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { company, commitments, servedTowns } from '@/content/company';

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
        <div className="container-t">
          <Reveal>
            <h2
              id="portrait"
              className="heading max-w-[16ch] text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.01] text-ink"
            >
              Le froid et le chaud, même physique
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 max-w-[50ch] text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.55] text-ink lg:mt-10">
              Déplacer de l’énergie d’un endroit à un autre : c’est le même
              raisonnement qui gouverne une pompe à chaleur et un groupe de
              chambre froide.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[62ch] text-[1.05rem] leading-8 text-slate">
              C’est pour cette raison qu’une même équipe pose une pompe à
              chaleur le mardi et remonte un groupe frigorifique le jeudi. Le
              geste change, le raisonnement non. Les bâtiments du bassin
              houiller ont par ailleurs leurs habitudes — combles bas,
              alimentations anciennes, façades contraintes — et cela change le
              dimensionnement plus souvent qu’on ne le croit.
            </p>
          </Reveal>

          {/* La signature. Le dirigeant, le siège, la date : trois données
              de `content/company.ts`, posées comme on signe une lettre. */}
          <Reveal delay={0.16}>
            <div className="mt-12 border-t border-ink pt-7 lg:mt-16 lg:pt-8">
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

      {/* ═════════════ LES PRINCIPES ═════════════
          Aucun filet. C'est la seule section du site tenue par le seul blanc :
          partout ailleurs, c'est un filet qui sépare. Six positions, chacune
          un titre et un paragraphe, séparées par de l'espace et rien d'autre. */}
      <section aria-labelledby="principes" className="border-y border-line bg-stone py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <h2
              id="principes"
              className="heading max-w-[13ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] text-ink"
            >
              Comment nous travaillons
            </h2>
            <p className="mt-5 max-w-[48ch] text-[1rem] leading-8 text-slate">
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
          <div className="mt-14 [&>*+*]:mt-12 lg:mt-20 lg:[&>*+*]:mt-16">
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
                <div className="lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-x-16">
                  <h3 className="heading max-w-[22ch] text-[clamp(1.4rem,2.8vw,2.3rem)] leading-[1.1] text-ink lg:col-span-4">
                    {p.titre}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[1.02rem] leading-8 text-slate lg:col-span-7 lg:col-start-6 lg:mt-0">
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
          <Reveal>
            <h2
              id="engagements"
              className="heading max-w-[14ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-white"
            >
              Ce sur quoi vous pouvez nous tenir
            </h2>
            <p className="mt-6 max-w-[50ch] text-[1rem] leading-8 text-steel-100">
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

          <Reveal delay={0.08}>
            <ul className="mt-11 flex flex-wrap items-baseline gap-y-2 border-t border-line pt-9 lg:mt-14">
              {servedTowns.map((t, i) => (
                /* Le point médian suit le nom au lieu de le précéder : placé
                   devant, il ouvrait les lignes suivantes du mur par un
                   séparateur orphelin. Derrière, une fin de ligne se lit comme
                   une continuation. */
                <li key={t} className="heading text-[clamp(1.25rem,2.6vw,2.2rem)] leading-[1.3] text-ink">
                  {t}
                  {/* ─── L'ANCRAGE ───
                      Le mur portait quinze noms de même poids : une liste,
                      pas un territoire. Or `content/company.ts` documente
                      déjà que les communes sont ORDONNÉES PAR PROXIMITÉ DU
                      SIÈGE — une information réelle, présente dans la
                      source, et jusqu'ici invisible sur la page.

                      Marquer le siège suffit à la rendre lisible : le mur
                      cesse d'être une énumération et devient un rayon, qui
                      part de Morsbach et s'éloigne. C'est la seule marque
                      cyan de la section, et elle porte le seul fait qui
                      ancre l'entreprise quelque part.

                      Rien n'est ajouté au contenu : la commune vient de
                      `company.city`, l'ordre vient du tableau. */}
                  {t === company.city && (
                    <span className="label ml-2.5 align-middle text-[0.6em] tracking-[0.1em] text-brand uppercase">
                      Siège
                    </span>
                  )}
                  {i < servedTowns.length - 1 && (
                    <span aria-hidden className="px-3 text-line lg:px-4">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-10 max-w-[56ch] border-t border-line pt-7 text-[0.97rem] leading-7 text-slate">
              Au-delà de ce rayon, un forfait de déplacement s’ajoute. Il est
              indiqué sur le devis, jamais découvert après l’intervention.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction
        title="Une question sur votre installation ?"
        body="Si c’est une panne, dites-le dès le premier message : le traitement n’est pas le même qu’un projet d’installation."
      />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
