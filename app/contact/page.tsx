import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { company, servedTowns } from '@/content/company';

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

      <section className="bg-white py-16 lg:py-24">
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* ─── NOUS JOINDRE ─── */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="heading text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.08] text-ink">
                Nous joindre directement
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              {/* Le numéro d'abord, et en grand : c'est le geste le plus
                  court entre cette page et une réponse. */}
              <a
                href={company.phoneHref}
                className="heading mt-7 block text-[clamp(2rem,4.4vw,3rem)] leading-[1.1] text-ink transition-colors duration-300 hover:text-brand"
                aria-label={`Appeler le ${company.phone}`}
              >
                {company.phone}
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

            <Reveal delay={0.16}>
              <div className="mt-9">
                <p className="text-[0.86rem] text-slate">Zone d’intervention</p>
                <p className="mt-3 max-w-[46ch] text-[0.97rem] leading-7 text-ink">
                  {servedTowns.join(' · ')} et les communes alentour.
                </p>
                <p className="mt-4 max-w-[46ch] text-[0.94rem] leading-7 text-slate">
                  Au-delà du rayon habituel, un forfait de déplacement figure sur
                  le devis — jamais découvert après coup.
                </p>
              </div>
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
              <ContactForm email={company.email} phone={company.phone} />
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
