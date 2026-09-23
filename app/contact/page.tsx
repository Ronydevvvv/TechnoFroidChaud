import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { CallToAction } from '@/components/sections/CallToAction';
import { GlypheDemande, type Demande } from '@/components/contact/GlypheDemande';
import { ZoneIntervention } from '@/components/thermo/ZoneIntervention';
import { AxeThermique } from '@/components/contact/AxeThermique';
import { company, servedTowns } from '@/content/company';
import { faq } from '@/content/site';

/**
 * Contact.
 *
 * ─── DEUX BLOCS, ET RIEN D'AUTRE ─────────────────────────────────────────
 * Le hero, puis une seule section : nous joindre à gauche, le formulaire à
 * droite, séparés par un filet vertical. Aucune section n'a été ajoutée
 * pour donner du corps à la page — une page de contact qui se déroule est
 * une page de contact ratée.
 *
 * ─── LE TÉLÉPHONE EST L'ÉLÉMENT, PAS UNE LIGNE DE PLUS ───────────────────
 * Il est posé à 3 rem, en lien `tel:`. Les quatre coordonnées étaient
 * quatre `.card` à icône, de même taille et de même poids : le numéro
 * qu'on compose y pesait autant que les horaires. Les icônes sont parties
 * avec les encadrés — un intitulé « Téléphone » n'a pas besoin d'un
 * combiné dessiné à côté pour être compris.
 *
 * ─── AUCUNE CARTE INTÉGRÉE ───────────────────────────────────────────────
 * Pas de traceur tiers, pas de script bloquant, et la zone d'intervention
 * écrite sert mieux le référencement local qu'une image de carte que
 * Google ne lit pas.
 *
 * ─── DEUX AFFIRMATIONS CORRIGÉES ─────────────────────────────────────────
 * Le hero annonçait « Devis gratuit après visite » et une zone « Moselle ·
 * Alsace · Meurthe-et-Moselle ». Ni l'une ni l'autre n'est soutenue par
 * `content/` : les engagements disent « devis après visite » sans le mot
 * gratuit, la FAQ précise que les conditions du devis sont annoncées au
 * premier échange, et les quinze communes desservies sont toutes en
 * Moselle. Les deux faits ont été alignés sur le reste du site.
 */

const trail = [{ name: 'Contact', path: '/contact' }];

/**
 * Les quatre motifs de contact.
 *
 * Ils ne sont pas inventés : ce sont EXACTEMENT les quatre valeurs que
 * propose déjà le champ « Objet de la demande » du formulaire, plus bas
 * dans la même page. Cette section ne fait donc que les rendre visibles
 * avant que le visiteur n’ouvre la liste déroulante — et chaque entrée
 * renvoie à la page métier qui la traite.
 *
 * Le glyphe est celui des pages métier : la même marque que sur l’accueil
 * et sur /realisations. Aucune icône nouvelle.
 */
const BESOINS = [
  {
    titre: 'Installation',
    texte: 'Climatisation, chauffage, pompe à chaleur, réfrigération.',
    href: '/realisations',
    glyphe: 'installation' as Demande,
  },
  {
    titre: 'Entretien',
    texte: 'Contrôle, nettoyage des échangeurs, vérification des sécurités.',
    href: '/entretien-depannage',
    glyphe: 'entretien' as Demande,
  },
  {
    titre: 'Dépannage',
    texte: 'Panne, équipement à l’arrêt, recherche de défaut.',
    href: '/entretien-depannage',
    glyphe: 'depannage' as Demande,
  },
  {
    titre: 'Renseignement',
    texte: 'Une question avant de lancer un projet.',
    href: '/entreprise',
    glyphe: 'renseignement' as Demande,
  },
] as const;

/**
 * Ce qu’il faut préparer avant d’appeler.
 *
 * Les quatre éléments sont repris MOT POUR MOT de l’invite du champ
 * « Votre situation » du formulaire : « Type de local, surface
 * approximative, équipement existant, ce qui ne fonctionne pas ». Rien
 * n’est ajouté — on sort simplement de l’invite ce qui y était caché, pour
 * que le visiteur le voie avant de décrocher son téléphone.
 */
const AVANT = [
  { cle: 'Type de local', val: 'Logement, commerce, restaurant, atelier.' },
  { cle: 'Surface approximative', val: 'Le volume à traiter, même estimé.' },
  { cle: 'Équipement existant', val: 'Ce qui est déjà en place, et son âge si vous le savez.' },
  { cle: 'Problème constaté', val: 'Ce qui ne fonctionne pas, et depuis quand.' },
] as const;

/** Les questions de `content/site.ts` qui concernent une prise de contact. */
const pageFaq = faq.filter((f) =>
  [
    'Sous quel délai intervenez-vous en dépannage ?',
    'Le devis est-il payant ?',
    'Reprenez-vous une installation posée par une autre entreprise ?',
    'Que couvre exactement la garantie de trois ans ?',
  ].includes(f.q),
);

export const metadata = pageMetadata({
  title: 'Contact et devis — Techno Froid Chaud, Forbach',
  description:
    'Contactez Techno Froid Chaud pour un devis en climatisation, pompe à chaleur ou froid professionnel à Forbach et dans l’est mosellan.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Contact"
        title="Parlons de votre installation"
        intro="Décrivez la situation en quelques lignes. Nous revenons vers vous pour caler une visite ou, s’il s’agit d’une panne, pour évaluer l’urgence tout de suite."
        trail={trail}
        variant="photo"
        photo={{
          src: '/photos/hero-contact.jpg',
          alt: 'Installation frigorifique en toiture d’un bâtiment professionnel.',
          position: '60% 50%',
        }}
        facts={[
          { k: 'Devis', v: 'Après visite sur place' },
          { k: 'Téléphone', v: company.phone },
          { k: 'Zone', v: 'Bassin houiller, est mosellan' },
        ]}
      />

      {/* ═════════════ L'AXE THERMIQUE ═════════════
          La signature de la page : un trait gradué du froid au chaud, les
          trois métiers accrochés à leur position réelle sur l'échelle.
          Aucune valeur n'y figure — voir l'en-tête du composant.

          Posé entre le hero et la prise de contact, là où le visiteur vient
          de lire « Parlons de votre installation » : il dit DE QUELLE
          installation on parle, sans une phrase de plus. */}
      <section aria-label="Froid et chaleur" className="border-b border-line bg-stone py-10 lg:py-14">
        <div className="container-t">
          <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
            <span className="text-ink">Climatisation · Chauffage · Réfrigération</span>
            <span>Échelle de principe, non graduée</span>
          </div>
          <div className="mt-7 lg:mt-9">
            <AxeThermique />
          </div>
        </div>
      </section>

      <section aria-labelledby="joindre" className="bg-white py-14 lg:py-20">
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* ─── NOUS JOINDRE ─── */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.9rem] text-slate">
                <span aria-hidden className="h-px w-7 bg-brand" />
                Nous joindre
              </p>
              <h2
                id="joindre"
                className="heading mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.08] text-ink"
              >
                Nous joindre directement
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              {/* Le numéro d'abord, et en grand : c'est le geste le plus
                  court entre cette page et une réponse. */}
              {/* Le combiné sonne au survol — exactement la même animation
                  que dans l'en-tête, portée par l'icône seule et jamais par
                  le lien entier, sinon c'est le numéro qui tremble. */}
              <a
                href={company.phoneHref}
                className="group mt-7 flex items-center gap-4"
                aria-label={`Appeler le ${company.phone}`}
              >
                <Phone
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-7 shrink-0 origin-center text-brand group-hover:[animation:tfc-sonne_0.55s_ease-in-out] lg:size-8"
                />
                <span className="heading text-[clamp(2rem,4.4vw,3rem)] leading-[1.1] text-ink transition-colors duration-300 group-hover:text-brand">
                  {company.phone}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-9 border-t border-line">
                <div className="border-b border-line py-4">
                  <dt className="text-[0.86rem] text-slate">E-mail</dt>
                  <dd className="mt-1.5 text-[1rem] text-ink">
                    <a href={`mailto:${company.email}`} className="link-t break-words">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-line py-4">
                  <dt className="text-[0.86rem] text-slate">Adresse</dt>
                  <dd className="mt-1.5 text-[1rem] leading-7 text-ink">
                    {company.street}
                    <br />
                    {company.postalCode} {company.city}
                  </dd>
                </div>
                <div className="border-b border-line py-4">
                  <dt className="text-[0.86rem] text-slate">Horaires</dt>
                  <dd className="mt-1.5 text-[1rem] text-ink">{company.hours}</dd>
                </div>
              </dl>
            </Reveal>

            {/* La liste des quinze communes a quitté cette colonne : elle
                descend en section propre, avec la planche territoriale de
                l'accueil. Elle y était une énumération serrée sous les
                horaires ; elle y devient un rayon. */}
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[46ch] text-[0.94rem] leading-7 text-slate">
                Au-delà du rayon habituel, un forfait de déplacement figure sur
                le devis — jamais découvert après coup.
              </p>
            </Reveal>
          </div>

          {/* ─── LE FORMULAIRE ───
              Plus d'encadré : un filet vertical suffit à séparer les deux
              colonnes au-dessus de 1024 px, et il devient horizontal en
              dessous, où les colonnes s'empilent. Le formulaire est posé sur
              le même fond que le reste — c'est ce qui le fait paraître à sa
              place plutôt que déposé dans une boîte. */}
          <div className="mt-12 border-t border-line pt-10 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <Reveal delay={0.08}>
              <h2 className="sr-only">Formulaire de demande d’intervention</h2>
              <ContactForm email={company.email} phone={company.phone} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════ POUR QUEL BESOIN ? ═════════════
          Quatre lignes, pas quatre cartes. C'est le vocabulaire des listes
          de l'accueil : filet, glyphe, titre, texte, flèche — toute la
          ligne cliquable, un fond à peine plus dense au survol.

          Les quatre entrées ne sont pas inventées : ce sont les valeurs du
          champ « Objet de la demande » du formulaire ci-dessus, rendues
          visibles avant qu'on n'ouvre la liste déroulante. */}
      <section aria-labelledby="besoin" className="border-t border-line bg-stone py-14 lg:py-20">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="besoin"
                className="heading max-w-[14ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] text-ink"
              >
                Pour quel besoin ?
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-1">
                Le dire dès le premier message nous fait gagner un aller-retour
                — et, s’il s’agit d’une panne, cela change l’ordre de passage.
              </p>
            </div>
          </Reveal>

          <ul className="mt-11 border-t border-line lg:mt-14">
            {BESOINS.map((n, i) => (
              <Reveal as="li" key={n.titre} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-b border-line">
                  <Link
                    href={n.href}
                    className="group relative -mx-3 flex items-baseline justify-between gap-6 rounded-[3px] px-3 py-5 transition-[background-color,padding-left] duration-[250ms] hover:bg-ink/[0.035] hover:pl-5 sm:py-6"
                  >
                    {/* Le filet actif, comme sur les lignes de l'accueil :
                        il s'ouvre depuis son centre. `scale-y` plutôt qu'une
                        hauteur animée — une transformation ne déclenche
                        aucun recalcul de mise en page. */}
                    <span
                      aria-hidden
                      className="absolute inset-y-2 -left-3 w-px origin-center scale-y-0 bg-brand transition-transform duration-[250ms] ease-out group-hover:scale-y-100"
                    />
                    <span className="flex min-w-0 items-baseline gap-4">
                      <GlypheDemande
                        demande={n.glyphe}
                        className="mt-0.5 size-5 shrink-0 text-slate/50 transition-[color,transform] duration-[250ms] group-hover:translate-x-0.5 group-hover:text-brand"
                      />
                      <span className="min-w-0">
                        <span className="heading block text-[clamp(1.1rem,2.2vw,1.45rem)] leading-snug text-ink">
                          {n.titre}
                        </span>
                        <span className="mt-1.5 block max-w-[46ch] text-[0.95rem] leading-7 text-slate">
                          {n.texte}
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-[0.95rem] text-slate/40 transition-[transform,color] duration-[250ms] group-hover:translate-x-1.5 group-hover:text-brand"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════ AVANT DE NOUS CONTACTER ═════════════
          Une fiche technique, pas un paragraphe de conseils. Le terme à
          gauche, ce qu'il recouvre à droite, un filet par rang : c'est la
          nomenclature des planches du site.

          Les quatre entrées sortent MOT POUR MOT de l'invite du champ
          « Votre situation » du formulaire. Rien n'a été ajouté — on rend
          simplement visible ce qui y était caché. */}
      <section aria-labelledby="avant" className="bg-white py-14 lg:py-20">
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.9rem] text-slate">
                <span aria-hidden className="h-px w-7 bg-brand" />
                Avant de nous contacter
              </p>
              <h2
                id="avant"
                className="heading mt-4 max-w-[18ch] text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.08] text-ink"
              >
                Quelques informations nous font gagner du temps
              </h2>
              <p className="mt-5 max-w-[42ch] text-[1rem] leading-8 text-slate">
                Rien n’est obligatoire. Mais avec ces quatre éléments, nous
                savons dès le premier appel s’il faut une visite, une pièce ou
                un simple réglage.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Reveal delay={0.08}>
              {/* La graduation en tête de fiche : le même bord de feuille
                  que la bande de l'accueil et que le pied de page. Elle
                  n'ajoute aucun élément au DOM — un dégradé répété la
                  trace en une passe. */}
              <span
                aria-hidden
                className="block h-1.5 w-full bg-[repeating-linear-gradient(to_right,var(--color-line)_0_1px,transparent_1px_16px)]"
              />
              <dl className="-mt-[2px] border-t-2 border-ink">
                {AVANT.map((x) => (
                  <div
                    key={x.cle}
                    className="grid gap-x-8 gap-y-1 border-b border-line py-4 sm:grid-cols-[12rem_1fr]"
                  >
                    <dt className="heading text-[1rem] text-ink">{x.cle}</dt>
                    <dd className="text-[0.95rem] leading-7 text-slate">{x.val}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════ OÙ INTERVENONS-NOUS ? ═════════════
          La planche territoriale de l'accueil, à l'identique : même
          composant, même source, même cartouche. Elle remplace l'énumération
          des quinze communes qui était serrée sous les horaires.

          Sous 1024 px elle se déroule en axe vertical, donc les quinze noms
          restent du vrai texte — rien n'est perdu pour un lecteur d'écran
          ni pour un moteur. */}
      <section aria-labelledby="ou" className="border-y border-line bg-stone py-14 lg:py-20">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="ou"
                className="heading max-w-[14ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] text-ink"
              >
                Où intervenons-nous ?
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-1">
                Siège à {company.city}, à deux pas de {company.primaryArea}. Les
                communes sont rangées par distance au siège.
              </p>
            </div>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-10 lg:mt-12" delay={0.08}>
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
              <span className="text-ink">
                Zone d’intervention — {servedTowns.length} communes
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                Sans échelle géographique
              </span>
            </div>
            <div className="mt-8 lg:mt-4">
              <ZoneIntervention />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ QUESTIONS FRÉQUENTES ═════════════
          Les quatre questions de `content/site.ts` qui concernent une prise
          de contact. Même composant que les autres pages : toutes fermées
          au chargement, ligne entière cliquable, « + » qui pivote. */}
      <section aria-labelledby="questions" className="bg-white py-14 lg:py-20">
        <div className="container-t">
          <Reveal>
            <h2
              id="questions"
              className="heading max-w-[14ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] text-ink"
            >
              Avant d’envoyer votre demande
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-9 lg:mt-12">
              <Accordion items={pageFaq} />
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction
        axe
        title={
          <>
            Un projet en tête ?<br />
            Une panne ?
          </>
        }
        body="Décrivez la situation en quelques lignes, ou appelez directement. Nous qualifions l’urgence au téléphone, avant tout déplacement."
      />

      <JsonLd data={faqSchema(pageFaq)} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
