import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/ui/Reveal';
import { GlypheMetier, type Metier } from '@/components/ui/GlypheMetier';
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
 * La page présente donc ce que l'entreprise SAIT FAIRE — des typologies,
 * pas des références — et le dit franchement au visiteur.
 *
 * ─── RENDRE LA PAGE VISUELLE SANS RIEN REVENDIQUER ───────────────────────
 * La version précédente était strictement typographique : faute de
 * photographies de chantier, on avait renoncé à toute image. C'était
 * honnête, mais c'était aussi la page la plus aride du site — cinq pavés de
 * texte, là où le visiteur vient précisément pour VOIR.
 *
 * L'image revient, sous une condition tenue jusqu'au bout : CHACUNE PORTE
 * SON CARTOUCHE, et ce cartouche dit exactement ce qu'elle est. Pas une
 * légende de politesse en bas de page, pas une mention dans les crédits :
 * une ligne sous chaque photographie, à la même place que le cartouche des
 * planches techniques du site.
 *
 *     « Illustration métier — matériel de la filière »
 *
 * Aucune commune, aucune date, aucun client, aucun « réalisé par nos
 * équipes ». Une photographie de matériel illustre un SAVOIR-FAIRE ; elle
 * n'atteste d'aucune RÉALISATION, et la page ne laisse jamais croire le
 * contraire. C'est la même règle que sur l'accueil et les pages métier
 * (voir `public/photos/CREDITS.md`), appliquée ici là où elle est la plus
 * sensible — parce que c'est la page qui s'appelle « Nos installations ».
 *
 * ─── LA COMPOSITION ──────────────────────────────────────────────────────
 * Le titre monumental reste : c'est lui qui porte la page, et la DA est
 * validée. Ce qui change est ce qui vient dessous.
 *
 *   TITRE       pleine largeur, jusqu'à 4,2 rem
 *   PHOTO       colonnes 7 à 12, en 16/10 — le ratio des tuiles de l’accueil
 *   TEXTE       colonnes 1 à 5 — corps, caractéristiques, lien métier
 *
 * L'image est TOUJOURS à droite, le texte TOUJOURS à gauche. On aurait pu
 * les alterner un bloc sur deux : c'est précisément le zigzag qu'on
 * reconnaît dans un gabarit, et qui avait déjà été retiré de cette page.
 * Une asymétrie tenue sur cinq blocs se lit comme une décision ; une
 * asymétrie qui bascule se lit comme un effet.
 *
 * Sur mobile la photographie passe EN PREMIER, avant le texte : c'est là
 * que la page doit devenir visuelle le plus vite, et l'ordre du DOM suffit
 * — la grille de bureau replace tout par `col-start`, sans dépendre de lui.
 *
 * ─── LE GLYPHE ───────────────────────────────────────────────────────────
 * Chaque entrée porte le glyphe de sa page métier — la réduction de sa
 * propre planche technique, la même qu'en tête des listes de l'accueil. Il
 * ne décore pas : il fait le lien entre cette entrée et la page qu'elle
 * ouvre, et le visiteur retrouve dans la planche ce qu'il a vu ici.
 *
 * QUAND LES CHANTIERS CONFIRMÉS ARRIVERONT : la photographie de chaque
 * entrée est remplacée et son cartouche devient la vraie légende — commune,
 * année, nature de la pose. La structure ne bouge pas d'une ligne.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const metadata = pageMetadata({
  title: 'Nos installations — climatisation, froid et pompes à chaleur',
  description:
    'Les types d’installations réalisées par Techno Froid Chaud à Forbach et dans l’est mosellan : climatisation, pompes à chaleur, réfrigération et chambres froides.',
  path: '/realisations',
});

const trail = [{ name: 'Nos installations', path: '/realisations' }];

/**
 * ─── LE RYTHME DE LA GALERIE ─────────────────────────────────────────────
 * Les cinq entrées avaient la MÊME composition : texte à gauche, image à
 * droite, toujours six colonnes, toujours en 16/10. Cinq fois de suite, à
 * taille constante, une page ne se lit plus comme une galerie mais comme
 * une liste — et les photographies, petites et alignées, finissent par
 * ressembler à des vignettes de catalogue.
 *
 * Ce qui change ici n'est donc pas le côté — un simple zigzag est le
 * gabarit que tout le monde reconnaît — mais la TAILLE. L'image d'ouverture
 * prend les douze colonnes, puis les quatre suivantes en prennent 7, 8, 6
 * et 9, en changeant de bord. Une largeur qui varie de 6 à 12 colonnes se
 * voit ; un bord qui bascule à largeur constante ne se voit pas.
 *
 * Les rapports d'image restent tous en PAYSAGE. Les photographies sources
 * sont cadrées ainsi : les forcer en portrait pour varier davantage
 * couperait les sujets, ce qui est cher payé pour un effet de mise en page.
 *
 *   i  colonnes image   rapport   bord
 *   0       12          21 / 9    pleine largeur — l'ouverture
 *   1        7          16 / 10   droite
 *   2        8           3 / 2    gauche
 *   3        6          16 / 10   droite
 *   4        9          21 / 9    gauche
 */
const RYTHME = [
  {
    img: 'lg:col-span-12 lg:row-start-1',
    ratio: 'lg:aspect-[21/9]',
    /* Douze colonnes de texte feraient des lignes de 110 signes. Sous une
       image pleine largeur, le texte se compose donc lui-même en deux
       colonnes : le corps à gauche, les caractéristiques à droite. */
    txt: 'lg:col-span-12 lg:row-start-2 lg:grid lg:grid-cols-12 lg:gap-x-16',
    a: 'lg:col-span-5',
    b: 'lg:col-span-5 lg:col-start-7 lg:mt-0',
  },
  { img: 'lg:col-span-7 lg:col-start-6 lg:row-start-1', ratio: 'lg:aspect-[16/10]', txt: 'lg:col-span-4 lg:col-start-1 lg:row-start-1', a: '', b: '' },
  { img: 'lg:col-span-8 lg:col-start-1 lg:row-start-1', ratio: 'lg:aspect-[3/2]', txt: 'lg:col-span-4 lg:col-start-9 lg:row-start-1', a: '', b: '' },
  { img: 'lg:col-span-6 lg:col-start-7 lg:row-start-1', ratio: 'lg:aspect-[16/10]', txt: 'lg:col-span-5 lg:col-start-1 lg:row-start-1', a: '', b: '' },
  {
    img: 'lg:col-span-10 lg:col-start-1 lg:row-start-1',
    ratio: 'lg:aspect-[21/9]',
    txt: 'lg:col-span-12 lg:row-start-2 lg:grid lg:grid-cols-12 lg:gap-x-16',
    a: 'lg:col-span-5',
    b: 'lg:col-span-5 lg:col-start-7 lg:mt-0',
  },
] as const;

/**
 * Typologies réellement proposées. Aucune n'est datée ni localisée.
 *
 * `img` / `alt` / `legende` : la photographie et son cartouche. `legende`
 * décrit CE QUE MONTRE L'IMAGE, jamais ce que l'entreprise aurait posé —
 * c'est cette phrase qui empêche la confusion, et elle est écrite entrée
 * par entrée plutôt que générée, pour qu'on ne puisse pas la vider par
 * inadvertance.
 */
const typologies = [
  {
    title: 'Chambre froide professionnelle',
    lede: 'Restauration, boucherie, commerces de bouche, laboratoires.',
    body: 'Montage des panneaux sandwich, pose du groupe logé ou déporté, régulation et relevé des températures. Le dimensionnement tient compte de la charge à refroidir, du nombre d’ouvertures de porte et de la température de la pièce autour — pas seulement du volume.',
    points: ['Positive 0 à +4 °C', 'Négative −18 à −22 °C', 'Groupe logé ou déporté'],
    href: '/chambres-froides',
    glyphe: 'chambre-froide' as Metier,
    img: '/photos/metier-chambres-froides.jpg',
    alt: 'Intérieur d’une chambre froide en panneaux isothermes, rayonnages et sol clair.',
    legende: 'Chambre froide en panneaux isothermes',
  },
  {
    title: 'Installation frigorifique commerciale',
    lede: 'Vitrines, meubles, réserves.',
    body: 'Meubles positifs et négatifs, groupes à distance, raccordements en cave ou en local technique. Le circuit est conçu pour rester accessible : un groupe qu’on atteint se dépanne en une heure, un groupe encastré immobilise une journée.',
    points: ['Vitrine +2 à +6 °C', 'Groupe à distance', 'Traçabilité des charges'],
    href: '/refrigeration',
    glyphe: 'refrigeration' as Metier,
    img: '/photos/metier-refrigeration.jpg',
    alt: 'Groupes frigorifiques montés sur châssis dans un local technique.',
    legende: 'Groupes frigorifiques sur châssis',
  },
  {
    title: 'Climatisation',
    lede: 'Logements, bureaux, locaux professionnels.',
    body: 'Mono-split pour une pièce, multi-split pour plusieurs volumes sur un seul groupe extérieur, gainable quand aucune unité ne doit être visible. Le choix se fait après relevé du volume, de l’exposition et de l’occupation réelle.',
    points: ['Mono et multi-split', 'Gainable en combles', 'Cassette en faux plafond'],
    href: '/climatisation',
    glyphe: 'climatisation' as Metier,
    img: '/photos/metier-climatisation.jpg',
    alt: 'Unités de climatisation murales en façade d’un bâtiment.',
    legende: 'Unités de climatisation en façade',
  },
  {
    title: 'Pompe à chaleur',
    lede: 'Remplacement de chaudière ou relève.',
    body: 'Air/air et air/eau, raccordées sur plancher chauffant ou radiateurs basse température. Le dimensionnement part des déperditions du bâtiment : sur un bâti mal isolé, nous le disons avant la commande plutôt qu’après la première facture.',
    points: ['Air/air, air/eau', 'Relève de chaudière', 'Mise en service et réglages'],
    href: '/pompes-a-chaleur',
    glyphe: 'pac' as Metier,
    img: '/photos/metier-pompes-a-chaleur.jpg',
    alt: 'Groupe extérieur de pompe à chaleur posé sur socle le long d’une façade.',
    legende: 'Groupe extérieur de pompe à chaleur',
  },
  {
    title: 'Entretien et dépannage',
    lede: 'Sur nos installations comme sur celles d’un autre.',
    body: 'Contrat annuel ou passage ponctuel : nettoyage des échangeurs, contrôle des pressions, vérification de l’étanchéité et des sécurités. En dépannage, nous cherchons la cause — une fuite retrouvée évite trois recharges de fluide.',
    points: ['Contrat annuel', 'Recherche de fuite', 'Remise en service'],
    href: '/entretien-depannage',
    glyphe: 'depannage' as Metier,
    img: '/photos/metier-depannage.jpg',
    alt: 'Manifold de service raccordé sur le circuit d’une installation frigorifique.',
    legende: 'Manifold de service sur un circuit frigorifique',
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
          Cinq entrées monumentales. Le titre porte, la photographie montre,
          le cartouche dit ce qu'elle est — dans cet ordre, et jamais
          l'inverse : si l'image passait devant le titre, la page
          ressemblerait à une galerie de réalisations, ce qu'elle n'est pas. */}
      <section aria-labelledby="sommaire" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <h2 id="sommaire" className="sr-only">
            Les types d’installations que nous réalisons
          </h2>

          {typologies.map((t, i) => {
            const r = RYTHME[i % RYTHME.length];
            return (
            <Reveal key={t.title} delay={Math.min(i * 0.04, 0.16)}>
              <article className="border-t-2 border-ink pt-7 pb-14 lg:pt-9 lg:pb-24">
                {/* La ligne de tête : le glyphe de la page métier, puis la
                    clientèle. Le glyphe hérite de la couleur du texte, donc
                    il n'introduit aucune couleur propre. */}
                <p className="flex items-center gap-3 text-[0.95rem] text-slate">
                  <GlypheMetier metier={t.glyphe} className="size-4 shrink-0 text-slate/55" />
                  {t.lede}
                </p>

                <h3 className="heading mt-4 max-w-[20ch] text-[clamp(2rem,5.4vw,4.2rem)] leading-[1.02] text-ink">
                  {t.title}
                </h3>

                <div className="mt-8 lg:mt-11 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16 lg:gap-y-10">
                  {/* ─── LA PHOTOGRAPHIE ET SON CARTOUCHE ───
                      Première dans le DOM pour que mobile devienne visuel
                      tout de suite ; replacée à droite sur grand écran par
                      `col-start`, qui ne dépend pas de l'ordre du DOM.

                      `figcaption` et non un simple `p` : le navigateur et le
                      lecteur d'écran rattachent alors la phrase à l'image,
                      donc la mise au point vaut aussi hors de l'écran. */}
                  <figure className={`group/ph m-0 ${r.img}`}>
                    <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-steel-800 ${r.ratio}`}>
                      <Image
                        src={t.img}
                        alt={t.alt}
                        fill
                        sizes="(min-width:1024px) 70vw, 92vw"
                        /* Zoom de 3 % sur 900 ms. Un survol de photographie
                           doit se sentir, pas se voir : au-dela de 5 % le
                           cadrage bouge et le sujet se decentre. La
                           preference « mouvement reduit » le coupe net. */
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover/ph:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/ph:scale-100"
                      />
                      {/* Le même voile que les tuiles de l'accueil : il tient
                          les cinq photographies à la même densité quelles que
                          soient leurs expositions d'origine. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,17,24,0.34)_0%,rgba(10,17,24,0.08)_60%,rgba(10,17,24,0)_100%)]"
                      />
                    </div>

                    <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3 text-[0.74rem] tracking-[0.08em] text-slate uppercase">
                      <span className="text-ink">Illustration métier</span>
                      <span aria-hidden className="text-line">
                        —
                      </span>
                      <span>{t.legende}</span>
                    </figcaption>
                  </figure>

                  {/* ─── LE TEXTE ───
                      Les caractéristiques sur filets, puis le lien métier.
                      Elles étaient en cyan : trois valeurs colorées par
                      entrée, quinze en tout, faisaient un semis de marqueurs
                      sans aucune fonction. */}
                  <div className={`mt-9 lg:mt-0 ${r.txt}`}>
                    <p className={`text-[1.02rem] leading-8 text-slate ${r.a}`}>{t.body}</p>

                    <div className={r.b}>
                    <ul className="mt-7 border-t border-line">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="border-b border-line py-2.5 text-[0.93rem] leading-7 text-slate"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    <Link href={t.href} className="link-t mt-6 inline-flex text-[0.97rem] text-ink">
                      Le métier en détail
                    </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
            );
          })}
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
