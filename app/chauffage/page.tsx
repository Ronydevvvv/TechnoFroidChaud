import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { BandePhoto } from '@/components/sections/BandePhoto';
import { Reveal } from '@/components/ui/Reveal';
import { ReseauChauffage } from '@/components/thermo/ReseauChauffage';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, serviceSchema, breadcrumbSchema } from '@/lib/seo';
import { tradeBySlug } from '@/content/services';
import { etapes } from '@/content/methode';
import { company } from '@/content/company';

/**
 * Chauffage et chaudières.
 *
 * ─── POURQUOI CETTE PAGE EXISTE ──────────────────────────────────────────
 * Le nouveau site avait écarté cette activité, alors qu'elle est au cœur de
 * l'identité de l'entreprise : son site officiel se présente comme
 * « Technicien, frigoriste-chauffagiste » et mentionne explicitement la
 * réparation et l'installation de chaudières.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── SA COMPOSITION LUI APPARTIENT ───────────────────────────────────────
 * /climatisation a servi de pilote, pas de gabarit. Aucune de ses quatre
 * compositions n'est reprise ici : ni la photographie imbriquée, ni la
 * bande de relevés, ni le bandeau photographique, ni le document à
 * marginalia. Cette page tient en trois temps parce que son contenu tient
 * en trois temps — et elle est plus courte que /climatisation, ce qui est
 * la conséquence honnête d'un contenu moins fourni.
 *
 *   1. LA NOTICE     Les quatre interventions en titres courants, dans deux
 *                    colonnes de texte continu. Ni cartes, ni filets par
 *                    item, ni colonne de titres à gauche : une page de
 *                    notice technique, où le nom de l'intervention ouvre
 *                    son propre paragraphe.
 *
 *   2. L'ARBITRAGE   La pièce maîtresse, et la vraie question du visiteur :
 *                    réparer, remplacer, ou passer à la PAC. Trois issues de
 *                    même rang, donc trois colonnes de même largeur séparées
 *                    par des filets verticaux — un tableau de décision, pas
 *                    une grille de cartes : aucun fond, aucun cadre, aucun
 *                    arrondi, aucun numéro. L'ordre n'y porte aucune
 *                    information, il n'y a donc rien à numéroter.
 *
 *   3. LA SUITE      Méthode et engagements repliés sur une seule bande
 *                    claire, puis l'appel à l'action commun au site.
 *
 * ─── UNE SEULE PHOTOGRAPHIE SUR LA PAGE ──────────────────────────────────
 * Celle du hero. Le fonds libre de droits ne contient qu'une seule prise de
 * vue de chaufferie exploitable (Pexels 20046689) : en tirer un second
 * cadrage aurait posé deux fois la même image sur la même page. Le vide
 * choisi vaut mieux que la redite.
 *
 * Aucun chiffre, aucune certification, aucun délai : rien qui ne soit déjà
 * vérifiable dans `content/`.
 */

const trade = tradeBySlug('chauffage')!;
const trail = [{ name: 'Chauffage et chaudières', path: '/chauffage' }];

export const metadata = pageMetadata({
  title: 'Chauffagiste à Forbach — chaudières et chauffage',
  description:
    'Entretien annuel, réparation et remplacement de chaudières à Forbach et dans l’est mosellan. Désembouage et équilibrage des circuits de chauffage.',
  path: '/chauffage',
});

/** L'arbitrage réel, posé sans pousser à la vente. */
const arbitrage = [
  {
    cas: 'Réparer la chaudière',
    quand:
      'Elle a moins d’une quinzaine d’années, la panne est identifiée et la pièce se trouve encore. Une réparation ciblée coûte bien moins qu’un remplacement, et rien n’oblige à changer un appareil qui fonctionne.',
  },
  {
    cas: 'Remplacer par une chaudière',
    quand:
      'Le logement est mal isolé, les radiateurs travaillent en haute température, ou le budget ne permet pas une pompe à chaleur correctement dimensionnée. Mieux vaut une chaudière bien posée qu’une PAC sous-dimensionnée.',
  },
  {
    cas: 'Passer à la pompe à chaleur',
    quand:
      'L’isolation suit, les émetteurs acceptent une eau moins chaude, et la place existe dehors. C’est là que le gain de consommation est réel — pas ailleurs.',
  },
] as const;

/** Les cinq engagements, dans les termes exacts du reste du site. */
const engagements = [
  `Installés à ${company.city}`,
  'Devis après visite',
  `Garantie ${company.warrantyYears} ans`,
  'Dépannage qualifié',
  'Un seul interlocuteur',
];

export default function ChauffagePage() {
  return (
    <>
      <PageHero
        overline="Chauffage et chaudières"
        title="Entretenir, réparer, ou remplacer"
        intro="Entretien annuel, recherche de panne et remplacement de chaudières, à Forbach et dans l’est mosellan. Nous intervenons aussi sur le circuit : purge, désembouage et équilibrage des radiateurs."
        trail={trail}
        variant="photo"
        actions
        photo={{
          src: '/photos/hero-chauffage.jpg',
          alt: 'Local technique équipé de ballons tampons et d’une production de chaleur.',
          position: '50% 50%',
        }}
      />

      {/* ═════════════ 1. LA NOTICE ═════════════
          `columns-2` et non `grid-cols-2` : le texte coule d'une colonne à
          l'autre comme dans un imprimé, les quatre entrées ne se posent donc
          pas en quatre cases de hauteur égale. C'est ce qui empêche la
          section de redevenir une grille quel que soit le soin apporté au
          reste. `break-inside-avoid` garde chaque intervention entière. */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-t">
          <Reveal>
            <h2 className="heading max-w-[20ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.06] text-ink">
              Ce que nous faisons sur une installation de chauffage
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-7 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.22rem)] leading-[1.65] text-ink">
              {trade.lede}
            </p>
            <p className="mt-4 text-[0.9rem] text-slate">{trade.audience}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-11 border-t border-line pt-9 lg:mt-14 lg:columns-2 lg:gap-x-16">
              {trade.items.map((it) => (
                <p
                  key={it.title}
                  className="mb-7 break-inside-avoid text-[0.98rem] leading-8 text-slate last:mb-0"
                >
                  <span className="heading text-[1.06rem] text-ink">{it.title}.</span> {it.body}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LE RÉSEAU ═════════════
          La pièce maîtresse graphique de la page, et la SIXIÈME projection
          du site. C'est un schéma topologique comme la boucle des pompes à
          chaleur, et la distinction se tient sur la topologie : là-bas un
          ANNEAU fermé sans aucune dérivation, dont le sujet est le
          changement d'état du fluide ; ici un PEIGNE — un tronc, des
          dérivations parallèles, un retour — dont le sujet est la
          distribution.

          C'est aussi la seule planche du site sans un seul trait cyan. Le
          contenu de cette page ne mentionne aucun circuit froid : le rouge
          y cesse d'être l'exception pour devenir la couleur principale.

          Elle est posée APRÈS la notice : la page dit d'abord ce qu'on fait
          sur une installation, puis montre ce qu'est cette installation,
          et seulement ensuite pose l'arbitrage réparer / remplacer. */}
      {/* Une respiration photographique : la page n'avait que son
          hero, donc plus aucune matière dès qu'on descendait. Voir
          `components/sections/BandePhoto.tsx` pour la règle du
          cartouche — ce n'est PAS un chantier de l'entreprise. */}
      <BandePhoto
        src="/photos/metier-chauffage.jpg"
        alt="Local technique équipé de ballons tampons et d’une production de chaleur."
        legende="Local technique et production de chaleur"
        position="50% 46%"
        fond="bg-white"
      />

      <section aria-labelledby="reseau" className="border-y border-line bg-stone py-14 sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="reseau"
                className="heading max-w-[15ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03] text-ink"
              >
                La chaudière produit, le circuit distribue
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                Une source, un tronc de départ, autant de dérivations que
                d’émetteurs, et un retour qui ramène l’eau à la chaudière. Le
                circulateur met l’ensemble en mouvement.
              </p>
            </div>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-11 lg:mt-16" delay={0.06}>
            {/* Le cartouche — même convention que les autres planches du
                site. « De principe » n'est pas une précaution de style : le
                nombre d'émetteurs n'est pas un relevé, et la page ne
                contient ni température de départ ni de retour. */}
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
              <span className="text-ink">Réseau de chauffage — schéma de distribution de principe</span>
              <span className="flex flex-wrap items-center gap-x-7 gap-y-2">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-alert" />
                  Départ
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-slate/60" />
                  Retour
                </span>
              </span>
            </div>

            <div className="mt-6 lg:mt-10">
              <ReseauChauffage />
            </div>

            {/* ─── LA LÉGENDE MOBILE ───
                Sous 1024 px, le schéma ne porte aucun texte : une
                désignation dans le dessin y ferait six pixels de haut. Les
                cinq désignations sortent donc du SVG et passent en HTML,
                dans l'ordre où le peigne debout les rencontre — de la
                chaudière en tête jusqu'au circulateur sur le retour. */}
            <div className="lg:hidden">
              <ul className="mt-6 grid gap-y-3 border-t border-line pt-5 text-[0.86rem] tracking-[0.05em] text-slate uppercase">
                {['Chaudière', 'Départ', 'Émetteurs', 'Retour'].map((n) => (
                  <li key={n}>{n}</li>
                ))}
                <li className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-4">
                  <span>Circulateur</span>
                  <span className="tracking-normal text-slate/80 normal-case">
                    Il met le circuit en mouvement
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ 2. L'ARBITRAGE ═════════════
          Trois issues de même rang : trois colonnes de même largeur, tenues
          par des filets verticaux. Le filet est la seule matière graphique de
          la section — il sépare sans encadrer, ce qu'un fond ou une bordure
          complète ne savent pas faire sans fabriquer des cartes.

          Sur téléphone les filets basculent à l'horizontale : trois colonnes
          de 120 px de large ne se lisent pas. */}
      <section aria-labelledby="arbitrage" className="bg-steel-900 py-16 text-white lg:py-24">
        <div className="container-t">
          <Reveal className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="arbitrage"
              className="heading max-w-[13ch] text-[clamp(2.3rem,6vw,4.6rem)] leading-[1.02] text-white"
            >
              Réparer, ou changer ?
            </h2>
            <p className="max-w-[44ch] text-[1.02rem] leading-8 text-steel-100 lg:pb-2">
              La réponse dépend du bâtiment, pas du catalogue. Voici les trois
              issues possibles, et ce qui fait pencher vers chacune.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-y-10 border-t border-white/20 pt-10 lg:mt-16 lg:grid-cols-3 lg:gap-y-0 lg:pt-12">
            {arbitrage.map((a, i) => (
              <Reveal key={a.cas} delay={Math.min(i * 0.07, 0.2)}>
                <div
                  className={
                    i === 0
                      ? 'lg:pr-10'
                      : 'border-t border-white/15 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pr-10 lg:pt-0 lg:last:pr-0'
                  }
                >
                  <h3 className="heading max-w-[13ch] text-[clamp(1.45rem,2.4vw,2.05rem)] leading-[1.12] text-white">
                    {a.cas}
                  </h3>
                  <p className="mt-5 text-[0.95rem] leading-7 text-steel-100">{a.quand}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <Link
              href="/pompes-a-chaleur"
              className="link-t mt-12 inline-flex text-[1.02rem] text-white lg:mt-14"
            >
              Voir la page pompes à chaleur
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ 3. LA SUITE ═════════════
          Méthode et engagements tiennent en une bande claire de deux lignes.
          Le visiteur d'une page métier ne vient pas apprendre la méthode : il
          vérifie qu'elle existe, et le lien mène au détail. Les six temps
          sont donnés en suite typographique, séparés par un point médian —
          l'ordre se lit dans la lecture, il n'a pas besoin d'être chiffré. */}
      <section className="border-y border-line bg-stone py-12 lg:py-14">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-14 gap-y-5 lg:flex-row lg:items-baseline">
              <p className="shrink-0 text-[0.86rem] text-slate lg:w-[14rem]">
                Comment se passe un projet
              </p>
              {/* Une liste en flux flex plutôt qu'un paragraphe : en texte
                  courant, le point médian resté en fin de ligne poussait la
                  boîte inline un pixel au-delà du bord et ouvrait un
                  défilement horizontal à 375 px. En flex, le séparateur reste
                  solidaire du nom qui le suit et la ligne se replie proprement. */}
              <ul className="heading flex flex-wrap items-baseline gap-y-1 text-[clamp(1.05rem,1.9vw,1.4rem)] leading-[1.5] text-ink">
                {etapes.map((e, i) => (
                  <li key={e.nom}>
                    {e.nom}
                    {i < etapes.length - 1 && (
                      <span aria-hidden className="px-2.5 text-line">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-x-14 gap-y-4 border-t border-line pt-8 lg:flex-row lg:items-baseline">
              <Link
                href="/#methode"
                className="link-t shrink-0 text-[0.9rem] text-ink lg:w-[14rem]"
              >
                Le détail de chaque étape
              </Link>
              <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
                {engagements.map((e) => (
                  <li key={e} className="text-[0.95rem] text-ink">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction
        title="Une chaudière à entretenir ou à remplacer ?"
        body="Donnez-nous la marque, l’âge approximatif de l’appareil et ce que vous constatez. Nous vous dirons ce qui se répare et ce qui ne se répare plus."
      />

      <JsonLd
        data={serviceSchema({
          name: 'Chauffage et chaudières',
          description:
            'Entretien annuel, réparation et remplacement de chaudières, désembouage et équilibrage des circuits de chauffage.',
          path: '/chauffage',
        })}
      />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
