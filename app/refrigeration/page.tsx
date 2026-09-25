import { PageHero } from '@/components/sections/PageHero';
import { CallToAction } from '@/components/sections/CallToAction';
import { Reveal } from '@/components/ui/Reveal';
import { ColonneThermique, type Consigne } from '@/components/thermo/ColonneThermique';
import { ElevationInstallation, type Poste } from '@/components/thermo/ElevationInstallation';
import { GroupeLogeDeporte } from '@/components/thermo/GroupeLogeDeporte';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageMetadata, serviceSchema, breadcrumbSchema } from '@/lib/seo';
import { tradeBySlug } from '@/content/services';
import { company } from '@/content/company';

/**
 * Réfrigération.
 *
 * ─── L'IDÉE FORTE ────────────────────────────────────────────────────────
 * Le froid professionnel se juge à une température, et à la preuve qu'on
 * l'a tenue. Deux pôles, et rien d'autre : la CONSIGNE et la TRAÇABILITÉ.
 * La page est construite sur eux.
 *
 * ─── LE REGISTRE DES CONSIGNES, PIÈCE MAÎTRESSE ──────────────────────────
 * Il arrive juste après le hero, avant même les prestations : c'est lui qui
 * dit en une seconde que ce site est celui d'un frigoriste et pas d'un
 * généraliste. La hiérarchie y est franche — la TEMPÉRATURE domine, l'usage
 * la nomme, l'application la qualifie :
 *
 *   Chambre froide positive     0 à +4 °C     Fruits, légumes, …
 *   ──────────────────────      ─────────     ────────────────────
 *   1,05 rem, encre             jusqu'à       0,9 rem, gris
 *                               3,4 rem
 *
 * Ce n'est pas un `<table>` mais un `<dl>`. Une table ne se replie pas : à
 * 375 px, des températures de cette taille imposeraient un défilement
 * horizontal sur la pièce maîtresse de la page. Un couple terme/définition
 * décrit exactement cette donnée — un usage, sa consigne, son application —
 * et se replie sans rien casser.
 *
 * ─── DEUX SECTIONS ONT ÉTÉ RETIRÉES ──────────────────────────────────────
 * 1. Le CYCLE FRIGORIFIQUE (`<Installation />`). Il raconte la même physique
 *    que l'escalier de `/pompes-a-chaleur` et il reste en place sur
 *    `/chambres-froides`, page pédagogique. Le garder ici, c'était le même
 *    composant sur trois pages.
 * 2. La FAQ. Ses trois questions — délai, reprise d'une installation tierce,
 *    garantie — sont celles du reste du site. Un professionnel vient
 *    vérifier une consigne et savoir quoi dire au téléphone ; c'est ce que
 *    la page lui donne.
 *
 * Aucune photographie n'a été ajoutée en remplacement : celle du hero suffit.
 *
 * ─── AUCUNE DONNÉE INVENTÉE ──────────────────────────────────────────────
 * Les quatre plages, les quatre points de traçabilité, les quatre questions
 * du téléphone et les textes des prestations sont ceux d'avant, mot pour
 * mot. Aucun délai, aucun agrément, aucune norme nommée.
 */

const trade = tradeBySlug('refrigeration')!;

/**
 * L'entrée « Vitrines et meubles réfrigérés » quitte la liste.
 *
 * Son texte tient en une phrase — « Groupe logé ou à distance. Le report
 * du groupe supprime le bruit et la chaleur en salle. » — et cette phrase
 * est un ARBITRAGE. Un arbitrage se compare : deux états côte à côte, pas
 * une ligne de nomenclature parmi cinq.
 *
 * Elle est donc déplacée, pas dupliquée ni réécrite : `MATERIEL` est la
 * liste privée de cette entrée, et la section comparative reprend son
 * titre et son corps AU MOT PRÈS depuis `content/services.ts`. Si le
 * contenu change là-bas, les deux suivent.
 */
const CLE_GROUPE = 'Vitrines et meubles réfrigérés';
const MATERIEL = trade.items.filter((i) => i.title !== CLE_GROUPE);
const GROUPE = trade.items.find((i) => i.title === CLE_GROUPE);
const trail = [{ name: 'Réfrigération', path: '/refrigeration' }];

export const metadata = pageMetadata({
  title: 'Chambre froide et réfrigération professionnelle en Moselle',
  description:
    'Installation et dépannage de chambres froides, vitrines et groupes frigorifiques à Forbach et en Moselle. Restauration, commerces de bouche, laboratoires.',
  path: '/refrigeration',
});

/**
 * Les quatre consignes. `de` et `a` sont les bornes numériques de `temp` :
 * elles ne servent qu'à placer le segment sur la règle et ne s'affichent
 * jamais — c'est `temp`, le texte d'origine, qui est lu.
 */
const ranges: readonly Consigne[] = [
  { use: 'Chambre froide positive', temp: '0 à +4 °C', de: 0, a: 4, note: 'Fruits, légumes, produits laitiers, réserve' },
  { use: 'Chambre froide négative', temp: '−18 à −22 °C', de: -22, a: -18, note: 'Surgelés, conservation longue' },
  { use: 'Vitrine réfrigérée', temp: '+2 à +6 °C', de: 2, a: 6, note: 'Vente, exposition en salle' },
  { use: 'Laboratoire de production', temp: '+10 à +12 °C', de: 10, a: 12, note: 'Travail de la viande, pâtisserie' },
];

/**
 * Les quatre postes de la planche, dans l'ordre du plus froid au plus
 * chaud — c'est ce qui donne à l'élévation son gradient thermique de
 * gauche à droite, et l'ordre dans lequel la version mobile les empile.
 *
 * Aucune température ici : la colonne thermique, plus haut sur la page, est
 * la source unique des consignes. La planche ne porte que des désignations.
 *
 * Ces désignations courtes sont celles qu'emploie déjà la planche de
 * l'accueil (`FROIDS`) : « Chambre froide négative » sur une ligne de
 * désignation de 140 unités déborderait sur le poste voisin.
 */
const postes: readonly Poste[] = [
  { nom: 'Chambre négative' },
  { nom: 'Chambre positive' },
  { nom: 'Vitrine' },
  { nom: 'Laboratoire' },
];

const tracabilite = [
  'Relevés de température enregistrés et conservés',
  'Alarme en cas de dérive de la consigne',
  'Contrôle d’étanchéité périodique du circuit',
  'Traçabilité des interventions et des charges de fluide',
];

/** Ce qui fait gagner du temps quand une installation est à l'arrêt. */
const auTelephone = [
  'La marque et le modèle, lisibles sur la plaque signalétique du groupe.',
  'La température affichée, et depuis combien de temps elle dérive.',
  'Ce que fait l’appareil : il ne démarre pas, il tourne sans froid, il givre, il coupe par intermittence.',
  'Si de la marchandise est encore dedans, et laquelle.',
];

export default function RefrigerationPage() {
  return (
    <>
      <PageHero
        overline="Réfrigération"
        title="Le froid professionnel ne pardonne pas l’approximation"
        intro={trade.lede}
        trail={trail}
        /* Les deux consignes qui figuraient ici — « Positif 0 à +4 °C » et
           « Négatif −18 à −22 °C » — ont été retirées : la colonne
           thermique, un écran plus bas, les donne toutes les quatre. Les
           annoncer d'abord au hero les affichait deux fois à quelques
           secondes d'intervalle, et n'en présentait que la moitié.

           Le relevé de clientèle reste : il ne se répète nulle part
           ailleurs sur la page, et c'est la seule information du hero qui
           qualifie à qui l'entreprise s'adresse. */
        facts={[{ k: 'Clientèle', v: 'Professionnels' }]}
        variant="photo"
        actions
        photo={{
          src: '/photos/hero-refrigeration.jpg',
          alt: 'Groupes frigorifiques montés sur châssis contre la façade d’un bâtiment.',
          position: '55% 50%',
        }}
      />

      {/* ═════════════ MOMENT 1 — LA COLONNE ═════════════
          Le registre en trois colonnes de texte devient une règle. Même
          contenu, même libellés, même ordre — mais les quatre consignes sont
          désormais ÉTAGÉES à leur hauteur réelle, et l'écart de vingt-deux
          degrés entre un laboratoire et un surgelé se voit au lieu de se
          lire. */}
      <section aria-labelledby="consignes" className="bg-white py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="consignes"
                className="heading max-w-[12ch] text-[clamp(2.1rem,5vw,3.9rem)] leading-[1.02] text-ink"
              >
                À chaque usage sa consigne
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                Le dimensionnement dépend de la charge à refroidir, du nombre
                d’ouvertures de porte et de la température de la pièce autour —
                pas seulement du volume.
              </p>
            </div>
          </Reveal>

          {/* Le cartouche de la règle — même convention que la planche de
              /chambres-froides : désignation à gauche, code couleur à droite. */}
          <div className="mt-12 flex flex-col gap-y-2 border-t-2 border-ink pt-4 text-[0.74rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between lg:mt-16">
            <span className="text-ink">Températures de consigne — échelle en °C</span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-px w-6 bg-brand" />
              Plage négative
            </span>
          </div>

          <div className="mt-8 lg:mt-10">
            <ColonneThermique consignes={ranges} />
          </div>

          <div aria-hidden className="mt-6 border-b-2 border-ink" />
        </div>
      </section>

      {/* ═════════════ MOMENT 2 — L'ÉLÉVATION ═════════════
          La pièce maîtresse graphique de la page. Elle remplace un schéma
          comparatif de 704 unités qui, sur téléphone, n'était que le dessin
          du bureau réduit — ses désignations tombaient à 6,2 px.

          Elle dit ce que la colonne ne peut pas dire. La colonne donne
          l'ÉCART entre les quatre consignes ; l'élévation donne leur PLACE :
          quelle machine tient quelle température, et où part la chaleur
          qu'elle prend. Même données, deux questions différentes.

          Élévation et non coupe : l'accueil porte déjà une coupe de
          bâtiment, et elle montre déjà trois de ces consignes. Ici, pas de
          murs, pas d'étages, pas de pièces — une ligne de sol, un refend,
          et des machines. */}
      <section aria-labelledby="chaleur" className="border-y border-line bg-stone py-14 sm:py-16 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="chaleur"
                className="heading max-w-[15ch] text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03] text-ink"
              >
                Le froid d’un côté, la chaleur de l’autre
              </h2>
              <p className="max-w-[42ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
                Un point de froid ne fabrique rien : il prend la chaleur
                dedans et la pose ailleurs. Le report du groupe supprime le
                bruit et la chaleur en salle.
              </p>
            </div>
          </Reveal>

          <Reveal as="figure" className="m-0 mt-11 lg:mt-16" delay={0.06}>
            {/* Le cartouche — même convention que les autres planches du
                site : désignation à gauche, code couleur à droite. « De
                principe » n'est pas une précaution de style : la planche ne
                représente aucune installation particulière. */}
            <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
              <span className="text-ink">
                Installation frigorifique — élévation de principe
              </span>
              <span className="flex flex-wrap items-center gap-x-7 gap-y-2">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-brand" />
                  Fluide frigorigène
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-6 bg-alert" />
                  Chaleur rejetée
                </span>
              </span>
            </div>

            <div className="mt-6 lg:mt-10">
              <ElevationInstallation postes={postes} />
            </div>

            {/* ─── LA LÉGENDE MOBILE ───
                Sous 1024 px, la planche ne porte aucun texte : une
                désignation dans le dessin y ferait six pixels de haut. Les
                quatre postes sortent donc du SVG et passent en HTML, dans
                l'ordre exact où la colonne de distribution les empile — d'où
                une seule colonne : un `grid-cols-2` se lirait en Z et
                romprait la correspondance avec le dessin.

                Une liste et non un `<dl>` : il n'y a plus de valeur à
                associer à ces désignations depuis que les consignes sont
                revenues à la colonne thermique, et un `<dl>` sans `<dd>`
                n'est pas une liste de définitions. */}
            <div className="lg:hidden">
              <ul className="mt-6 grid gap-y-3 border-t border-line pt-5 text-[0.86rem] tracking-[0.05em] text-slate uppercase">
                {postes.map((p) => (
                  <li key={p.nom}>{p.nom}</li>
                ))}
                <li className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-4">
                  <span>Groupe</span>
                  <span className="tracking-normal text-slate/80 normal-case">
                    Chaleur rejetée dehors
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════ CE QUE NOUS INSTALLONS ═════════════
          Bloc décalé : le titre reste ancré au bord gauche, la liste occupe
          la moitié droite. La marge de gauche n'est pas un vide décoratif,
          c'est ce qui empêche cette section de peser autant que le registre
          qui la précède — elle vient après lui, et cela doit se voir. */}
      <section aria-labelledby="materiel" className="bg-white py-16 lg:py-24">
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* La colonne est portée par ce `div`, pas par le `h2` : `Reveal`
              produit son propre `div`, qui serait alors l'élément de grille —
              le titre se retrouvait dans une colonne sur douze, à un mot par
              ligne. */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2
                id="materiel"
                className="heading max-w-[14ch] text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] text-ink"
              >
                Ce que nous installons et maintenons
              </h2>
            </Reveal>
          </div>

          <div className="mt-9 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <Reveal>
              <p className="max-w-[54ch] text-[1.02rem] leading-8 text-ink">
                Un circuit se conçoit autant pour être réparé vite que pour
                fonctionner la première année. C’est ce qui distingue une
                installation professionnelle d’un assemblage de matériel.
              </p>
            </Reveal>

            <dl className="mt-10">
              {MATERIEL.map((it, i) => (
                <Reveal key={it.title} delay={Math.min(i * 0.05, 0.18)}>
                  <div className="border-t border-line py-6">
                    <dt className="heading text-[1.12rem] leading-[1.25] text-ink">{it.title}</dt>
                    <dd className="mt-2 max-w-[56ch] text-[0.96rem] leading-7 text-slate">
                      {it.body}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.22}>
              <p className="border-t border-line pt-6 text-[0.9rem] text-slate">
                {trade.audience}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════ LE GROUPE — LOGÉ OU À DISTANCE ═════════════
          C'est la pièce maîtresse de la page, et elle manquait.

          La page racontait déjà les consignes (colonne thermique) et
          l'échange froid/chaleur (élévation). Restait le GROUPE lui-même,
          qui est pourtant le cœur d'une installation frigorifique — et il
          était réduit à une ligne de nomenclature.

          La planche existait dans le projet, écrite et documentée, sans
          aucun appelant. Elle compare deux états en élévation frontale :
          la projection la plus plate qui soit, et la bonne pour une
          comparaison — aucune perspective n'avantage l'un des deux.

          C'est le seul rouge de la page, et il n'est là que parce que le
          dessin parle littéralement de chaleur rejetée en salle. */}
      {GROUPE ? (
        <section
          aria-labelledby="groupe"
          className="border-t border-line bg-white pb-12 lg:pb-16"
        >
          <div className="container-t">
            <Reveal>
              <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:items-baseline sm:justify-between sm:text-[0.74rem]">
                <h2 id="groupe" className="text-ink">
                  {GROUPE.title} — comparatif d’implantation
                </h2>
                {/* ─── LE CODE COULEUR RESTE ICI, ET C'EST MESURÉ ───
                    Je l'avais descendu à la hauteur du paragraphe pour que
                    le bloc de tête tienne les douze colonnes, comme la
                    planche : à 1440 px l'énoncé fait 535 px sous 1 150 px
                    d'encre, et ce déséquilibre horizontal se voit.

                    La mesure a tranché contre l'idée. Sous 1024 px la
                    rangée s'empile, le code couleur devient un TROISIÈME
                    bloc entre le texte et le dessin, et l'écart passe de
                    31 à 97 px sur téléphone — 66 px de vide gagnés là où
                    la page est la plus étroite, pour un gain nul sur
                    desktop où l'écart vertical, lui, était déjà juste
                    (44 px du texte à l'encre). Reverti.

                    Le cartouche est l'endroit d'un code couleur : il y est
                    compact aux deux largeurs, et c'est la convention de
                    toutes les autres planches du site. */}
                <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="h-px w-6 bg-brand" />
                    Liaison frigorifique
                  </span>
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="h-px w-6 bg-alert" />
                    Chaleur rejetée
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-8 text-slate lg:mt-8">
                {GROUPE.body}
              </p>
            </Reveal>

            <Reveal as="figure" className="m-0 mt-6 lg:mt-8" delay={0.1}>
              <GroupeLogeDeporte />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ═════════════ LA PREUVE ═════════════
          Le second pôle de la page. Une phrase tenue en grand — c'est elle
          l'argument — et les quatre points en liste ouverte à droite, sans
          puce : un filet par ligne suffit à les séparer. */}
      <section aria-labelledby="preuve" className="bg-steel-900 py-16 text-white lg:py-24">
        <div className="container-t lg:grid lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2
                id="preuve"
                className="heading max-w-[15ch] text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.04] text-white"
              >
                Ce qu’un contrôle vous demandera
              </h2>
              <p className="mt-7 max-w-[40ch] text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.55] text-steel-100">
                La réglementation sanitaire n’exige pas seulement que le froid
                soit produit : elle exige de pouvoir le prouver.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <ul>
              {tracabilite.map((line, i) => (
                <Reveal as="li" key={line} delay={Math.min(i * 0.05, 0.18)}>
                  <p className="border-t border-white/15 py-5 text-[1rem] leading-7 text-white">
                    {line}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.22}>
              <p className="border-t border-white/15 pt-6 text-[0.93rem] leading-7 text-steel-100">
                Un équipement professionnel à l’arrêt passe devant le planning
                courant : une chambre froide qui monte en température coûte une
                marchandise, pas un inconfort. Garantie {company.warrantyYears} ans
                sur nos installations.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════════ AVANT D'APPELER ═════════════
          Placée juste avant l'appel à l'action, parce qu'elle sert au moment
          exact où le visiteur décroche. Les quatre points ne sont pas
          numérotés : ils n'ont pas d'ordre, on les donne dans celui qu'on a. */}
      <section aria-labelledby="telephone" className="border-y border-line bg-stone py-14 lg:py-18">
        <div className="container-t">
          <Reveal>
            <h2
              id="telephone"
              className="heading max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.1] text-ink"
            >
              Ce que nous vous demanderons au téléphone
            </h2>
            <p className="mt-4 max-w-[58ch] text-[0.98rem] leading-7 text-slate">
              Ces quatre éléments permettent souvent d’arriver avec la bonne
              pièce dès le premier passage.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-x-14 lg:grid-cols-2">
            {auTelephone.map((t, i) => (
              <Reveal as="li" key={t} delay={Math.min(i * 0.05, 0.18)}>
                <p className="border-t border-line py-5 text-[0.97rem] leading-7 text-ink">{t}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction
        title="Un besoin en froid professionnel ?"
        body="Décrivez votre local et votre activité. Nous nous déplaçons pour relever les contraintes réelles avant de chiffrer quoi que ce soit."
      />

      <JsonLd
        data={serviceSchema({
          name: 'Réfrigération et chambres froides',
          description: trade.lede,
          path: '/refrigeration',
        })}
      />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
