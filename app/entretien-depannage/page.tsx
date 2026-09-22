import { PageHero } from '@/components/sections/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { LigneDeVie } from '@/components/thermo/LigneDeVie';
import { TroisCadrans } from '@/components/thermo/TroisCadrans';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { company } from '@/content/company';
import { faq } from '@/content/site';

/**
 * Entretien & Dépannage.
 *
 * La page la plus rapide et la plus dépouillée du site : quelqu'un dont la
 * chambre froide est à l'arrêt cherche un numéro, pas une expérience. Ici,
 * le meilleur design est celui qui disparaît.
 *
 * ─── LE FILET PORTE L'URGENCE ────────────────────────────────────────────
 * L'ordre de passage est la seule vraie information de la page, et c'est
 * l'ÉPAISSEUR DU FILET qui l'encode : 2 px pour ce qui passe devant, 1 px
 * pour les 48 h, un filet clair pour le créneau. Le trait dit le rang sans
 * qu'un numéro, une pastille ou une icône n'aient à le dire.
 *
 * C'est aussi la seule page où le rouge du logo apparaît, et il se limite
 * au mot « Priorité » et au filet qui le porte. Une page d'urgence qui vire
 * au rouge partout ne rassure personne : elle ressemble à un gabarit
 * d'urgence, ce que le brief demande explicitement d'éviter.
 *
 * ─── LE TÉLÉPHONE ────────────────────────────────────────────────────────
 * Il est central deux fois : en tête, où `urgence` le met en bouton devant
 * le devis, et en pied, où il ferme la page. Entre les deux, on explique —
 * parce qu'un visiteur qui appelle sans savoir quoi dire perd le temps
 * qu'il croyait gagner.
 *
 * Les trois grilles de `.card` ont disparu : l'ordre de passage, les deux
 * formules et les quatre questions n'ont plus un seul encadré.
 */

const trail = [{ name: 'Entretien & Dépannage', path: '/entretien-depannage' }];

export const metadata = pageMetadata({
  title: 'Dépannage climatisation et froid à Forbach',
  description:
    'Dépannage et entretien de climatisation, chauffage, chambres froides et groupes frigorifiques à Forbach et dans l’est mosellan.',
  path: '/entretien-depannage',
});

const pageFaq = faq.filter((f) =>
  [
    'Sous quel délai intervenez-vous en dépannage ?',
    'Le devis est-il payant ?',
    'Faut-il faire entretenir une climatisation ?',
    'Reprenez-vous une installation posée par une autre entreprise ?',
  ].includes(f.q),
);

/**
 * L'ordre de passage. `filet` encode le rang : plus c'est urgent, plus le
 * trait est épais. C'est la seule hiérarchie graphique de la page.
 */
const priorities = [
  {
    rank: 'Priorité',
    urgent: true,
    filet: 'border-t-2 border-alert',
    title: 'Équipement professionnel à l’arrêt',
    body: 'Chambre froide, vitrine, groupe frigorifique. La marchandise est en jeu : traitement dans la journée quand c’est possible.',
  },
  {
    rank: 'Sous 48 h',
    urgent: false,
    filet: 'border-t border-ink',
    title: 'Chauffage hors service en saison froide',
    body: 'Pompe à chaleur ou chaudière à l’arrêt sur un logement occupé.',
  },
  {
    rank: 'Sur créneau',
    urgent: false,
    filet: 'border-t border-line',
    title: 'Confort domestique',
    body: 'Climatisation qui refroidit mal, bruit anormal, télécommande en défaut. Rendez-vous sous quelques jours.',
  },
];

const formules = [
  {
    nom: 'Contrat annuel',
    phrase: 'Une visite par an, calée à la date qui vous arrange, avec rapport écrit après passage.',
    items: [
      'Nettoyage des échangeurs et des filtres',
      'Contrôle des pressions et des sécurités',
      'Vérification d’étanchéité du circuit',
      'Rapport d’intervention remis à chaque passage',
    ],
  },
  {
    nom: 'Passage ponctuel',
    phrase:
      'Sans engagement. Le déplacement de diagnostic est facturé — il demande du temps et du matériel de mesure — et son montant vous est annoncé avant.',
    items: [
      'Recherche de fuite et de panne électrique',
      'Remplacement de pièce, remise en service',
      'Charge de fluide et relevé des pressions',
      'Devis chiffré si la réparation est lourde',
    ],
  },
];

export default function DepannagePage() {
  return (
    <>
      <PageHero
        overline="Entretien & Dépannage"
        title="Une panne. Un numéro."
        intro="Décrivez ce qui ne fonctionne pas et sur quel équipement. Nous qualifions l’urgence au téléphone, avant tout déplacement."
        trail={trail}
        variant="photo"
        actions
        urgence
        photo={{
          src: '/photos/hero-depannage.jpg',
          alt: 'Frigoriste raccordant un manifold de service sur une installation.',
          position: '50% 50%',
        }}
        facts={[
          { k: 'Horaires', v: company.hours },
          { k: 'Zone', v: 'Bassin houiller, est mosellan' },
          { k: 'Garantie', v: `${company.warrantyYears} ans sur nos poses` },
        ]}
      />

      {/* ═════════════ L'ORDRE DE PASSAGE ═════════════
          Le délai est ce que le visiteur cherche : c'est donc lui qui est
          grand, et la situation qui le qualifie. L'inverse — situation en
          gros, délai en petit — obligerait à lire trois paragraphes pour
          savoir quand quelqu'un vient. */}
      <section aria-labelledby="ordre" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <h2
              id="ordre"
              className="heading max-w-[13ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03] text-ink"
            >
              Ce qui passe devant, et pourquoi
            </h2>
            <p className="mt-6 max-w-[48ch] text-[1.02rem] leading-8 text-slate">
              Nous annonçons l’ordre plutôt que de promettre à tout le monde une
              intervention immédiate. Une promesse tenue vaut mieux qu’une
              promesse large.
            </p>
          </Reveal>

          <dl className="mt-12 lg:mt-16">
            {priorities.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.06, 0.18)}>
                <div className={`${p.filet} grid gap-x-12 gap-y-2 py-7 lg:grid-cols-12 lg:py-9`}>
                  <dt
                    className={`heading text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.08] lg:col-span-4 ${
                      p.urgent ? 'text-alert' : 'text-ink'
                    }`}
                  >
                    {p.rank}
                  </dt>
                  <dd className="lg:col-span-7 lg:col-start-6">
                    <p className="heading text-[1.1rem] leading-[1.3] text-ink lg:text-[1.2rem]">
                      {p.title}
                    </p>
                    <p className="mt-2.5 max-w-[52ch] text-[0.97rem] leading-7 text-slate">
                      {p.body}
                    </p>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ═════════════ LA LIGNE DE VIE ═════════════
          La pièce maîtresse graphique de la page, et la SEPTIÈME projection
          du site — la première qui ne soit pas spatiale. Les six autres
          décrivent un objet ou un branchement ; celle-ci a le TEMPS pour
          axe. Un chronogramme ne se confond avec aucune projection
          géométrique, parce qu'il n'en est pas une.

          Elle est posée entre l'ordre de passage et les formules : la page
          dit d'abord QUI passe devant, puis COMMENT se déroule une
          intervention, et seulement ensuite ce que chaque formule contient. */}
      <section aria-labelledby="sequence" className="bg-stone py-14 sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="sequence"
                className="heading max-w-[15ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03] text-ink"
              >
                D’un défaut à la remise en service
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                Une installation tourne, puis s’arrête. Ce qui suit n’est pas
                un déplacement immédiat : c’est une qualification, puis une
                recherche, puis une remise en service.
              </p>
            </div>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-11 lg:mt-16" delay={0.06}>
            {/* Le cartouche — même convention que les autres planches du
                site. L'axe du temps n'est pas gradué et ne le sera pas : le
                contenu donne un ORDRE, pas des durées. */}
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
              <span className="text-ink">État de l’installation — séquence, axe non gradué</span>
              <span className="flex flex-wrap items-center gap-x-7 gap-y-2">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  En service
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-alert" />
                  Défaut et intervention
                </span>
              </span>
            </div>

            <div className="mt-6 lg:mt-10">
              <LigneDeVie />
            </div>

            {/* ─── LES CINQ TEMPS, EN HTML SOUS 1024 px ───
                La ligne debout ne porte aucun texte : un intitulé dans le
                dessin y ferait six pixels de haut. Les cinq temps passent
                donc en HTML, NUMÉROTÉS — ici le numéro n'est pas une
                décoration, c'est l'information même : la séquence a un
                ordre, et c'est son seul sujet. */}
            <ol className="mt-6 grid gap-y-5 border-t border-line pt-5 lg:hidden">
              {[
                ['En service', 'Contrôles et étanchéité'],
                ['Défaut', 'Équipement à l’arrêt'],
                ['Qualification', 'Au téléphone, d’abord'],
                ['Contrôle', 'Recherche de la panne'],
                ['Remise en service', 'Rapport d’intervention'],
              ].map(([nom, sous], i) => (
                <li key={nom} className="flex items-baseline gap-x-4">
                  <span
                    aria-hidden
                    className="heading w-7 shrink-0 text-[0.92rem] text-slate/60 tabular-nums"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="heading block text-[1.02rem] leading-[1.25] text-ink">
                      {nom}
                    </span>
                    <span className="mt-0.5 block text-[0.9rem] leading-6 text-slate">
                      {sous}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ CE QU'ON LIT SUR L'INSTALLATION ═════════════
          La ligne de vie, juste au-dessus, a le TEMPS pour axe : elle dit
          quand les choses arrivent. Elle ne dit pas ce qu'on regarde
          pendant ce temps-là — or un frigoriste ne diagnostique pas à
          l'oreille, il pose un manomètre et il lit.

          Ces trois cadrans sont ce relevé, pris à trois des cinq temps de
          la séquence. Ils ne redisent donc pas le chronogramme : ils lui
          ajoutent l'ÉTAT LU, là où lui donne l'ordre.

          Le fond revient au blanc entre deux fonds pierre. Deux planches
          techniques sur un même aplat feraient un bloc ; séparées par un
          changement de fond, elles se lisent comme deux instruments
          distincts de la même page.

          AUCUN CHIFFRE SUR CES CADRANS, et c'est écrit dans le cartouche :
          les pressions dépendent du fluide et de la machine, aucune n'est
          documentée ici, et en graduer un serait inventer une donnée
          technique. Voir l'en-tête de `components/thermo/TroisCadrans.tsx`. */}
      <section aria-labelledby="releve" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="releve"
                className="heading max-w-[14ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05] text-ink"
              >
                Ce qu’on lit sur l’installation
              </h2>
              <p className="max-w-[44ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                La séquence ci-dessus donne l’ordre des opérations. Le relevé,
                lui, donne l’état : c’est lui qui décide si l’on change une
                pièce ou si l’on cherche encore.
              </p>
            </div>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-11 lg:mt-14" delay={0.06}>
            {/* Même cartouche que les autres planches du site. La mention
                « non gradués » y est au même endroit que « axe non gradué »
                sur la ligne de vie : la règle ne change pas d'une planche à
                l'autre. */}
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
              <span className="text-ink">
                Relevé de service — cadrans de principe, non gradués
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-[3px] w-6 bg-slate" />
                Plage de service
              </span>
            </div>

            <div className="mt-9 lg:mt-12">
              <TroisCadrans />
            </div>

            <figcaption className="mt-10 max-w-[58ch] border-t border-line pt-6 text-[0.95rem] leading-7 text-slate">
              Ces cadrans ne portent ni chiffre ni unité, et n’en porteront
              pas : une pression de service dépend du fluide, de la machine et
              de la saison. Ce qu’ils montrent est la seule chose vraie de
              toute installation — la position de l’aiguille par rapport à sa
              plage.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LES DEUX FORMULES ═════════════
          Empilées, pleine largeur, séparées par un filet d'encre. Elles
          étaient deux `.card` côte à côte — deux encadrés blancs sur fond
          pierre, la forme même que cette refonte supprime. Les puces cyan
          sont devenues des lignes sur filet : quatre points ne se lisent pas
          mieux parce qu'un rond les précède. */}
      <section aria-labelledby="formules" className="border-y border-line bg-stone py-16 lg:py-24">
        <div className="container-t">
          <h2 id="formules" className="sr-only">
            Entretien : contrat annuel ou passage ponctuel
          </h2>

          {formules.map((f, i) => (
            <Reveal key={f.nom} delay={Math.min(i * 0.06, 0.16)}>
              <div className="border-t-2 border-ink pt-8 pb-12 lg:pt-10 lg:pb-16">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                  <div className="lg:col-span-5">
                    <h3 className="heading text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.08] text-ink">
                      {f.nom}
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-[1rem] leading-8 text-slate">
                      {f.phrase}
                    </p>
                  </div>

                  <ul className="mt-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
                    {f.items.map((line) => (
                      <li
                        key={line}
                        className="border-t border-line py-3.5 text-[0.97rem] leading-7 text-ink"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═════════════ AVANT D'APPELER ═════════════ */}
      <section aria-labelledby="avant" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <h2
              id="avant"
              className="heading max-w-[14ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.06] text-ink"
            >
              Avant d’appeler
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-9 lg:mt-12">
              <Accordion items={pageFaq} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ LE NUMÉRO ═════════════
          La page se ferme sur ce pour quoi on l'a ouverte. Le numéro est un
          lien `tel:` : sur un téléphone, il déclenche l'appel — c'est le
          geste entier, pas un affichage. */}
      <section aria-labelledby="appeler" className="bg-steel-900 py-16 text-white lg:py-20">
        <div className="container-t">
          <Reveal>
            <h2 id="appeler" className="heading text-[clamp(1.6rem,3vw,2.3rem)] text-white">
              Un équipement à l’arrêt ?
            </h2>
            <a
              href={company.phoneHref}
              className="heading mt-5 block text-[clamp(2.4rem,7vw,5rem)] leading-[1.05] text-white transition-colors duration-300 hover:text-brand lg:mt-7"
              aria-label={`Appeler le ${company.phone}`}
            >
              {company.phone}
            </a>
            <p className="mt-7 max-w-[48ch] border-t border-white/15 pt-6 text-[0.97rem] leading-7 text-steel-100 lg:mt-9">
              {company.hours}. Dites l’équipement, ce qu’il fait, et depuis
              quand : l’urgence se qualifie en deux minutes au téléphone.
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd data={faqSchema(pageFaq)} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
