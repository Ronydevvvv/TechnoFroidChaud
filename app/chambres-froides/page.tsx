import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { Flocon } from '@/components/thermo/Flocon';
import { EchelleThermique, type Plage } from '@/components/thermo/EchelleThermique';
import { CoupeChambreFroide } from '@/components/thermo/CoupeChambreFroide';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { company } from '@/content/company';

/**
 * Chambres froides — PILOTE de la couche graphique métier.
 *
 * Page créée à la refonte : « chambre froide » est la requête la plus
 * cherchée du secteur, et elle n'existait qu'en sous-partie de
 * `/refrigeration` — donc invisible pour un moteur.
 *
 * ─── CE QUE CE PILOTE TESTE ──────────────────────────────────────────────
 * Le site savait écrire le métier ; il ne savait pas le MONTRER. Quatre
 * pièces graphiques sont introduites ici, toutes dans le même langage :
 * trait fin, géométrie calculée, aucun aplat, aucune ombre, aucun dégradé.
 *
 *   LE MOTIF     Le flocon, en construction filaire, à l'échelle du hero et
 *                coupé par le bord droit. Sous 12 % d'opacité, il donne au
 *                hero sa profondeur sans rien recouvrir.
 *
 *   L'ÉCHELLE    Les quatre usages posés sur un axe de température RÉEL.
 *                On ne lit plus quatre lignes pour comprendre que les
 *                surgelés sont vingt degrés plus bas : on le voit.
 *
 *   LA COUPE     La chambre en axonométrie éclatée — plafond monté, façade
 *                glissée, évaporateur, groupe, liaison, air soufflé. Elle
 *                remplace une photographie d'entrepôt qui montrait un lieu
 *                sans montrer le fonctionnement.
 *
 *   LA PHOTO     Elle n'est pas perdue : elle revient en bande annotée,
 *                avec sa consigne en grand et une ligne de rappel. Une
 *                photographie posée dans un rectangle ne dit rien ; la même
 *                photographie cotée devient un document.
 *
 * ─── CE QUI N'A PAS BOUGÉ ────────────────────────────────────────────────
 * La structure validée — carte des usages, anatomie, points de vigilance,
 * conclusion — est intacte, dans le même ordre. La palette, la typographie,
 * l'en-tête et le pied de page ne sont pas touchés. Aucun texte métier n'a
 * été réécrit : les quatre plages, les quatre points de vigilance, les
 * trois organes et les trois éléments de dimensionnement sont ceux d'avant,
 * mot pour mot.
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * L'axe thermique va de −24 à +8 °C parce que c'est l'étendue nécessaire
 * pour contenir les quatre plages du contenu. Aucune température, aucune
 * cote, aucun débit n'est affirmé ailleurs que dans `content/`.
 *
 * ─── LE ROUGE ────────────────────────────────────────────────────────────
 * Trois traits, sur toute la page : la chaleur rejetée par le groupe, dans
 * la coupe. C'est sa seule apparition, et c'est ce qui lui donne son sens.
 */

export const metadata = pageMetadata({
  title: 'Chambre froide à Forbach — conception et installation',
  description:
    'Conception, montage et installation de chambres froides positives et négatives à Forbach et en Moselle : panneaux, groupe, régulation et relevé des températures.',
  path: '/chambres-froides',
});

const trail = [{ name: 'Chambres froides', path: '/chambres-froides' }];

/**
 * Les quatre usages. `de` et `a` sont les bornes numériques de `label` —
 * elles ne servent qu'à placer la barre sur l'axe, et ne s'affichent
 * jamais : c'est `label`, le texte d'origine, qui est lu.
 */
const usages: readonly Plage[] = [
  {
    usage: 'Restauration',
    label: '0 à +4 °C',
    de: 0,
    a: 4,
    note: 'Produits frais, préparations du jour, desserts.',
  },
  {
    usage: 'Boucherie et charcuterie',
    label: '0 à +2 °C',
    de: 0,
    a: 2,
    note: 'Viandes en carcasse ou en pièces, séchage contrôlé.',
  },
  {
    usage: 'Commerce de bouche',
    label: '+2 à +6 °C',
    de: 2,
    a: 6,
    note: 'Réserve fraîche, fromages, produits laitiers.',
  },
  {
    usage: 'Surgelés',
    label: '−18 à −22 °C',
    de: -22,
    a: -18,
    note: 'Conservation longue, chaîne du froid négative.',
  },
];

/** Les trois organes. Légendes reprises de l'ancien `content/scene.ts`. */
const anatomie = [
  {
    repere: 'a',
    organe: 'L’enveloppe',
    texte:
      'Les panneaux sandwich forment une enveloppe continue. C’est la qualité des joints, pas l’épaisseur seule, qui décide de la consommation.',
  },
  {
    repere: 'b',
    organe: 'L’évaporateur',
    texte:
      'L’évaporateur absorbe la chaleur de la pièce. Les ventilateurs brassent l’air sur une batterie froide : sans ce mouvement, l’air stagne et la température se stratifie.',
  },
  {
    repere: 'c',
    organe: 'Le groupe',
    texte:
      'Le groupe rejette dehors la chaleur prise dedans. Compresseur et condenseur y travaillent ensemble — c’est la pièce qui consomme, et celle qu’on dimensionne en premier.',
  },
] as const;

const vigilance = [
  {
    title: 'La porte, pas les panneaux',
    body: 'Une chambre bien isolée dont la porte ferme mal consomme plus qu’une chambre moyenne bien fermée. Le joint, le seuil et le réglage des paumelles décident du résultat autant que l’épaisseur de mousse.',
  },
  {
    title: 'Le nombre d’ouvertures',
    body: 'Une réserve qu’on ouvre trois fois par jour et une chambre de service en coup de feu ne demandent pas la même puissance. C’est cette question, posée à la visite, qui change le dimensionnement.',
  },
  {
    title: 'L’emplacement du groupe',
    body: 'Logé, il est compact mais rejette sa chaleur dans le local. Déporté, il demande une liaison mais soulage la pièce et se dépanne sans entrer dans la chambre. Le choix dépend du local, pas d’une préférence.',
  },
  {
    title: 'Le relevé des températures',
    body: 'Pour un professionnel, la traçabilité n’est pas une option. La régulation doit enregistrer, et l’enregistrement doit être consultable le jour d’un contrôle.',
  },
] as const;

const pourDimensionner = [
  { quoi: 'La surface', pourquoi: 'et la hauteur sous plafond réelle du local.' },
  { quoi: 'Le produit conservé', pourquoi: 'c’est lui qui fixe la consigne, pas un standard.' },
  { quoi: 'Le rythme d’ouverture', pourquoi: 'une réserve et une chambre de service ne demandent pas la même puissance.' },
] as const;

export default function ChambresFroidesPage() {
  return (
    <>
      <PageHero
        overline="Chambres froides"
        title="Un volume, une production de froid, et le lien entre les deux"
        intro="Conception, montage des panneaux, pose du groupe, régulation et relevé des températures. Pour la restauration, la boucherie, les laboratoires et les commerces de bouche."
        trail={trail}
        variant="photo"
        actions
        photo={{
          src: '/photos/hero-chambres-froides.jpg',
          alt: 'Intérieur d’une chambre froide professionnelle en service.',
          position: '55% 50%',
        }}
        decor={
          /* Le motif est ancré à droite et déborde de deux côtés : c'est ce
             débordement qui lui donne son échelle. Il est placé là où le
             voile est le plus clair, sinon il disparaîtrait. */
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute -top-[18%] -right-[14%] hidden h-[135%] aspect-square text-white/[0.13] sm:block"
            >
              <Flocon className="tfc-pivot h-full w-full" trait={1.1} />
            </span>

            {/* Un voile local, ancré sur le coin bas-droit. Le voile général
                du hero s'éclaircit vers la droite — c'est voulu, le sujet y
                garde sa place — mais la cote tombait alors sur du carrelage
                blanc et des cageots clairs : illisible à n'importe quelle
                opacité de texte. Un dégradé dissymétrique rétablit le
                contraste sans encadrer le bloc ni assombrir la photo. */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 bottom-0 hidden h-64 w-[38rem] bg-[radial-gradient(ellipse_at_bottom_right,rgba(8,13,19,0.92)_0%,rgba(8,13,19,0.62)_45%,rgba(8,13,19,0)_78%)] lg:block"
            />

            {/* L'amplitude couverte, en bas à droite du hero. Les deux
                bornes sont les extrêmes des quatre plages de la page —
                −22 et +6 — rien n'est ajouté. Le bloc est ancré dans le
                quart où le voile est le plus léger : il y a de la place, et
                il annonce le sujet avant même qu'on ait défilé. */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-[clamp(1.25rem,4.5vw,3.5rem)] bottom-14 hidden text-right lg:block"
            >
              <span className="block text-[0.8rem] tracking-[0.1em] text-white/75 uppercase sm:text-[0.72rem]">
                Plages de consigne couvertes
              </span>
              <span className="heading mt-2 block text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none whitespace-nowrap text-white tabular-nums">
                −22 <span className="text-brand">→</span> +6 <span className="text-[0.46em] align-top">°C</span>
              </span>
              <span className="mt-3 ml-auto block h-px w-40 bg-white/40" />
            </span>
          </>
        }
      />

      {/* ═════════════ L'ÉCHELLE THERMIQUE ═════════════ */}
      <section aria-labelledby="usages" className="bg-white py-14 sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="usages"
                className="heading max-w-[14ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03] text-ink"
              >
                À quelle température, et pour quoi
              </h2>
              <p className="max-w-[40ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                La température de consigne découle du produit conservé, pas d’un
                standard. C’est elle qui détermine ensuite la puissance, le type
                de groupe et le dégivrage.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 lg:mt-16">
            <EchelleThermique plages={usages} />
          </div>
        </div>
      </section>

      {/* ═════════════ LA COUPE ═════════════
          V2 — la planche prend TOUTE la largeur au lieu de sept colonnes sur
          douze. À cette échelle, les huit étiquettes tiennent dans les marges
          du dessin et la page bascule de « schéma illustratif » à « extrait
          de plan ». La légende passe dessous, en trois colonnes : elle
          commente le plan, elle ne se bat plus avec lui pour la place.

          Le cartouche d'en-tête — désignation à gauche, code couleur à
          droite — est la convention d'un document technique, et il remplit
          une zone qui était vide. */}
      <section aria-labelledby="anatomie" className="bg-carbon py-14 text-white sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <h2
              id="anatomie"
              className="heading max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.05] text-white"
            >
              Une chambre froide n’est pas un réfrigérateur agrandi
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-8 text-white/70">
              C’est un volume isolé, une production de froid déportée, et un
              réseau qui relie les deux.
            </p>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-11 lg:mt-16">
            {/* Le cartouche */}
            <div className="flex flex-col gap-y-3 border-t-2 border-white/80 pt-4 text-[0.8rem] tracking-[0.08em] text-white/55 uppercase sm:flex-row sm:text-[0.74rem] sm:items-baseline sm:justify-between">
              {/* La planche compacte n'éclate pas le panneau de façade —
                  c'est lui qui étalait le dessin sur téléphone. Le cartouche
                  dit donc ce que chaque version montre réellement : une
                  légende qui annonce une pièce absente est une légende
                  fausse. */}
              <span className="text-white/80">
                Chambre froide — vue éclatée, plafond déposé
                <span className="hidden sm:inline"> et façade déposée</span>
              </span>
              <span className="flex flex-wrap items-center gap-x-7 gap-y-2">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  Fluide et air froid
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-alert" />
                  Chaleur rejetée
                </span>
              </span>
            </div>

            <div className="mt-6 lg:mt-8">
              <CoupeChambreFroide />
            </div>

            {/* Les annotations de planche, sous le dessin. Elles ne
                décrivent pas : elles COTENT, comme un cartouche de renvoi. */}
            <div className="mt-6 grid gap-x-10 gap-y-5 border-t border-white/20 pt-5 sm:grid-cols-3">
              {[
                ['Fluide frigorigène', 'Circuit fermé'],
                ['Air soufflé', 'Circulation continue'],
                ['Chaleur rejetée', 'Vers l’extérieur du local'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[0.8rem] tracking-[0.08em] text-white/55 uppercase sm:text-[0.72rem]">{k}</p>
                  <p className="heading mt-1.5 text-[0.98rem] text-white/85">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <dl className="mt-12 grid gap-x-12 lg:mt-16 lg:grid-cols-3">
            {anatomie.map((a, i) => (
              <Reveal key={a.organe} delay={Math.min(i * 0.06, 0.2)}>
                <div className="h-full border-t border-white/30 py-6 lg:py-7">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/40 text-[0.8rem] text-white/70"
                    >
                      {a.repere}
                    </span>
                    <dt className="heading text-[1.15rem] text-white lg:text-[1.25rem]">
                      {a.organe}
                    </dt>
                  </div>
                  <dd className="mt-3 text-[0.96rem] leading-7 text-white/70">{a.texte}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ═════════════ LA PHOTO, COTÉE ═════════════
          V2 — la photographie devient un relevé. Elle ne porte plus une
          légende : elle porte une CONSIGNE en tête d'affiche, deux lignes de
          rappel qui entrent dans l'image jusqu'à un point d'ancrage, et une
          ligne de cote verticale sur le bord droit.

          La valeur est écrite « 0 → +4 °C » et non « 0 à +4 °C » : même
          donnée, notation de plan. C'est la seule liberté prise sur un texte
          métier de la page, et elle ne change aucune information.

          La bande est plus haute qu'en V1 — 340 → 460 px, 560 en grand écran
          — parce qu'une cote a besoin d'air au-dessus et en dessous pour se
          lire comme une cote. */}
      <section
        aria-label="Chambre froide positive en service"
        className="relative isolate overflow-hidden bg-carbon"
      >
        <div className="relative h-[460px] w-full lg:h-[560px]">
          <Image
            src="/photos/bande-chambre-froide.jpg"
            alt="Entrepôt frigorifique en service, rayonnages et évaporateurs en plafond."
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,15,21,0.95)_0%,rgba(10,15,21,0.88)_34%,rgba(10,15,21,0.5)_62%,rgba(10,15,21,0.15)_100%)]"
          />

          {/* La cote verticale, sur le bord droit. Deux traits d'about et un
              montant : la convention exacte d'une ligne de cote, ici sans
              dimension — elle borne le champ de la prise de vue, elle ne
              mesure rien qu'on ne sache pas. */}
          <div
            aria-hidden
            className="absolute top-12 right-6 bottom-12 hidden w-10 lg:block"
          >
            <span className="absolute top-0 right-0 h-px w-10 bg-white/35" />
            <span className="absolute right-[19px] h-full w-px bg-white/35" />
            <span className="absolute right-0 bottom-0 h-px w-10 bg-white/35" />
            <span className="absolute top-1/2 right-[26px] -translate-y-1/2 rotate-180 text-[0.74rem] tracking-[0.1em] text-white/45 uppercase [writing-mode:vertical-rl]">
              Champ de prise de vue
            </span>
          </div>

          <div className="absolute inset-0">
            <div className="container-t flex h-full flex-col justify-center">
              <Reveal>
                <p className="text-[0.8rem] tracking-[0.1em] text-white/70 uppercase sm:text-[0.74rem]">
                  Température de consigne
                </p>
                {/* La valeur en tête d'affiche. `tabular-nums` : sans chasse
                    fixe, le 0 et le 4 n'ont pas la même largeur et la flèche
                    ne tombe plus au milieu. */}
                <p className="heading mt-3 text-[clamp(2.4rem,7.4vw,6.2rem)] leading-[0.9] whitespace-nowrap text-white tabular-nums">
                  0 <span className="text-brand">→</span> +4 <span className="text-[0.44em] align-top">°C</span>
                </p>
                <p className="heading mt-4 text-[clamp(1.1rem,2.2vw,1.6rem)] tracking-[0.02em] text-white/85">
                  Chambre positive
                </p>
              </Reveal>

              {/* Les deux lignes de rappel. Elles partent du texte et
                  ENTRENT dans l'image jusqu'à un point d'ancrage : c'est ce
                  qui fait la différence entre une photo légendée et une
                  photo cotée. */}
              <Reveal delay={0.08}>
                <div className="mt-9 space-y-3.5">
                  {[
                    ['Évaporateurs en plafond', 'w-[clamp(3rem,20vw,13rem)]'],
                    ['Rayonnages — charge à refroidir', 'w-[clamp(5rem,30vw,21rem)]'],
                  ].map(([texte, largeur]) => (
                    <div key={texte} className="flex items-center gap-3">
                      <span className="text-[0.8rem] tracking-[0.08em] whitespace-nowrap text-white/70 uppercase sm:text-[0.74rem]">
                        {texte}
                      </span>
                      <span aria-hidden className={`h-px bg-brand/60 ${largeur}`} />
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ LES POINTS DE VIGILANCE ═════════════ */}
      <section aria-labelledby="vigilance" className="border-y border-line bg-stone py-14 sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-5 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="vigilance"
                className="heading max-w-[13ch] text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.05] text-ink"
              >
                Ce qui décide de la facture
              </h2>
              <p className="max-w-[40ch] text-[0.98rem] leading-8 text-slate lg:pb-1">
                Quatre sujets qu’un devis sérieux aborde, et qu’un devis rapide
                passe sous silence.
              </p>
            </div>
          </Reveal>

          <div className="mt-11 grid lg:mt-14 lg:grid-cols-2">
            {vigilance.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 0.05, 0.18)}>
                <div
                  className={`h-full border-t border-line py-7 lg:py-8 ${
                    i % 2 === 1 ? 'lg:border-l lg:pl-12' : 'lg:pr-12'
                  }`}
                >
                  <h3 className="heading text-[1.18rem] leading-[1.2] text-ink lg:text-[1.28rem]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.97rem] leading-7 text-slate">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.22}>
            <Link href="/refrigeration" className="link-t mt-10 inline-flex text-[1rem] text-ink">
              Voir aussi la réfrigération commerciale
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LA CONCLUSION ═════════════ */}
      <section
        aria-labelledby="devis"
        className="relative isolate overflow-hidden bg-steel-900 py-14 text-white sm:py-16 lg:py-24"
      >
        {/* Le motif revient, une seule fois, et plus discret qu'au hero :
            il ferme la page comme il l'a ouverte. */}
        {/* V2 — la rose thermique. Le motif n'est plus un fond : ses six
            branches portent les six bornes réelles des plages de la page,
            de −22 à +6, et trois d'entre elles portent un sens de
            circulation. Il passe de 5,5 % à 13 % d'opacité — en dessous,
            les chiffres deviendraient du bruit illisible plutôt qu'une
            information. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-[16%] -bottom-[30%] hidden h-[142%] aspect-square text-white/[0.13] lg:block"
        >
          <Flocon className="h-full w-full" trait={1.1} technique />
        </span>

        <div className="relative container-t">
          <Reveal>
            <h2
              id="devis"
              className="heading max-w-[17ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] text-white"
            >
              Trois éléments suffisent pour commencer
            </h2>
          </Reveal>

          <dl className="mt-12 border-t border-white/25 lg:mt-14">
            {pourDimensionner.map((p, i) => (
              <Reveal key={p.quoi} delay={Math.min(i * 0.06, 0.2)}>
                <div className="grid gap-x-10 gap-y-1 border-b border-white/15 py-6 lg:grid-cols-12 lg:py-7">
                  <dt className="heading text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15] text-white lg:col-span-4">
                    {p.quoi}
                  </dt>
                  <dd className="text-[0.97rem] leading-7 text-steel-100 lg:col-span-7 lg:col-start-6 lg:pt-2">
                    {p.pourquoi}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.22}>
            <p className="mt-8 max-w-[52ch] text-[0.97rem] leading-7 text-steel-100">
              La visite technique fait le reste : volume, température de
              service et passage des liaisons vers le groupe.{' '}
              <Link href="/#methode" className="link-t text-white">
                Comment se passe un projet
              </Link>
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/15 pt-9 lg:mt-12">
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
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
