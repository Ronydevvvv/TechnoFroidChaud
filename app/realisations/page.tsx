import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

/**
 * Nos installations.
 *
 * ─── POURQUOI CETTE PAGE NE MONTRE AUCUN CHANTIER ────────────────────────
 * Le projet contenait six réalisations avec commune, année et type de
 * client. Aucune n'a été confirmée par l'entreprise. Publier une
 * intervention datée et localisée qui n'a pas eu lieu est une allégation
 * commerciale fausse, et c'est le genre de détail qu'un concurrent vérifie.
 *
 * Les fiches projet et leurs six routes ont donc été supprimées. La page
 * présente ce que l'entreprise sait faire — des typologies, pas des
 * références — et le dit franchement au visiteur plutôt que de laisser
 * croire à une galerie vide.
 *
 * ─── LA COMPOSITION DÉCOULE DE CETTE ABSENCE ─────────────────────────────
 * Pas de photographies de chantier, donc pas de vignettes : ce sont les
 * NOMS des installations qui portent la page, posés à 4,2 rem. Cinq entrées
 * monumentales, chacune un titre, une clientèle, un paragraphe et trois
 * caractéristiques — un sommaire de ce qu'on sait poser, pas une galerie
 * qui ferait semblant d'en être une.
 *
 * L'ancienne page alternait blanc et pierre en inversant l'ordre des
 * colonnes un bloc sur deux. Ce zigzag est exactement ce qu'on reconnaît
 * dans un gabarit ; il a disparu.
 *
 * La section « Où nous intervenons » a été retirée : elle reprenait les
 * quinze communes que `/entreprise` affiche désormais en mur de noms, et
 * c'est là-bas qu'elles prouvent quelque chose.
 *
 * QUAND LES PHOTOS ET LES CHANTIERS CONFIRMÉS ARRIVERONT : chaque entrée
 * accueille une image sous son titre, et les entrées peuvent se dédoubler
 * en fiches. La structure ne bouge pas.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const metadata = pageMetadata({
  title: 'Nos installations — climatisation, froid et pompes à chaleur',
  description:
    'Les types d’installations réalisées par Techno Froid Chaud à Forbach et dans l’est mosellan : climatisation, pompes à chaleur, réfrigération et chambres froides.',
  path: '/realisations',
});

const trail = [{ name: 'Nos installations', path: '/realisations' }];

/** Typologies réellement proposées. Aucune n'est datée ni localisée. */
const typologies = [
  {
    title: 'Chambre froide professionnelle',
    lede: 'Restauration, boucherie, commerces de bouche, laboratoires.',
    body: 'Montage des panneaux sandwich, pose du groupe logé ou déporté, régulation et relevé des températures. Le dimensionnement tient compte de la charge à refroidir, du nombre d’ouvertures de porte et de la température de la pièce autour — pas seulement du volume.',
    points: ['Positive 0 à +4 °C', 'Négative −18 à −22 °C', 'Groupe logé ou déporté'],
    href: '/chambres-froides',
  },
  {
    title: 'Installation frigorifique commerciale',
    lede: 'Vitrines, meubles, réserves.',
    body: 'Meubles positifs et négatifs, groupes à distance, raccordements en cave ou en local technique. Le circuit est conçu pour rester accessible : un groupe qu’on atteint se dépanne en une heure, un groupe encastré immobilise une journée.',
    points: ['Vitrine +2 à +6 °C', 'Groupe à distance', 'Traçabilité des charges'],
    href: '/refrigeration',
  },
  {
    title: 'Climatisation',
    lede: 'Logements, bureaux, locaux professionnels.',
    body: 'Mono-split pour une pièce, multi-split pour plusieurs volumes sur un seul groupe extérieur, gainable quand aucune unité ne doit être visible. Le choix se fait après relevé du volume, de l’exposition et de l’occupation réelle.',
    points: ['Mono et multi-split', 'Gainable en combles', 'Cassette en faux plafond'],
    href: '/climatisation',
  },
  {
    title: 'Pompe à chaleur',
    lede: 'Remplacement de chaudière ou relève.',
    body: 'Air/air et air/eau, raccordées sur plancher chauffant ou radiateurs basse température. Le dimensionnement part des déperditions du bâtiment : sur un bâti mal isolé, nous le disons avant la commande plutôt qu’après la première facture.',
    points: ['Air/air, air/eau', 'Relève de chaudière', 'Mise en service et réglages'],
    href: '/pompes-a-chaleur',
  },
  {
    title: 'Entretien et dépannage',
    lede: 'Sur nos installations comme sur celles d’un autre.',
    body: 'Contrat annuel ou passage ponctuel : nettoyage des échangeurs, contrôle des pressions, vérification de l’étanchéité et des sécurités. En dépannage, nous cherchons la cause — une fuite retrouvée évite trois recharges de fluide.',
    points: ['Contrat annuel', 'Recherche de fuite', 'Remise en service'],
    href: '/entretien-depannage',
  },
] as const;

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        overline="Nos installations"
        title="Ce que nous posons, et comment"
        intro="Cette page présente les types d’installations que nous réalisons couramment. Les images qui l’illustrent montrent du matériel, pas nos chantiers : les photographies de nos propres poses les remplaceront."
        trail={trail}
        variant="photo"
        actions
        photo={{
          src: '/photos/hero-realisations.jpg',
          alt: 'Batterie de condenseurs installée en toiture d’un bâtiment professionnel.',
          position: '60% 50%',
        }}
      />

      {/* ═════════════ LE SOMMAIRE ═════════════
          Faute de photographies de chantier, ce sont les NOMS qui portent la
          page. Chaque entrée s'ouvre sur un filet d'encre de 2 px et son
          titre occupe toute la largeur utile : cinq entrées monumentales
          plutôt que cinq blocs à vignette.

          Les trois caractéristiques tiennent sur une seule ligne, en gris.
          Elles étaient en cyan : trois valeurs colorées par entrée, quinze
          en tout, faisaient un semis de marqueurs sans aucune fonction. */}
      <section aria-labelledby="sommaire" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <h2 id="sommaire" className="sr-only">
            Les types d’installations que nous réalisons
          </h2>

          {typologies.map((t, i) => (
            <Reveal key={t.title} delay={Math.min(i * 0.04, 0.16)}>
              <article className="border-t-2 border-ink pt-8 pb-14 lg:pt-10 lg:pb-20">
                <h3 className="heading max-w-[20ch] text-[clamp(2rem,5.4vw,4.2rem)] leading-[1.02] text-ink">
                  {t.title}
                </h3>
                <p className="mt-4 text-[1rem] text-slate">{t.lede}</p>

                <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-16">
                  <p className="text-[1.02rem] leading-8 text-slate lg:col-span-7">{t.body}</p>

                  <div className="mt-7 lg:col-span-4 lg:col-start-9 lg:mt-0">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:block">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="text-[0.93rem] leading-7 text-slate lg:border-t lg:border-line lg:py-2"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={t.href}
                      className="link-t mt-6 inline-flex text-[0.97rem] text-ink lg:mt-7"
                    >
                      Le métier en détail
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction
        title="Décrivez-nous ce que vous voulez installer."
        body="Nous vous dirons ce que cela suppose, ce que cela coûte, et si une autre solution serait plus adaptée à votre local."
      />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
