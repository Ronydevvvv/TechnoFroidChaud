import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { company, servedTowns } from '@/content/company';
import { navigation } from '@/content/navigation';

/**
 * Pied de page.
 *
 * Bande carbone : c'est la dernière des deux ponctuations sombres du site,
 * et elle referme le document. Quatre colonnes, aucune illustration, aucun
 * halo — l'information seule.
 *
 * Les communes sont écrites en toutes lettres : c'est du contenu utile au
 * référencement local, et cela évite les pages satellites par commune.
 */

const legal = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
];

export function Footer() {
  return (
    <footer className="bg-carbon text-white">
      {/* ─── LA GRADUATION DE PIED DE PAGE ───
          Une réglette en tête du footer, sur toute la largeur. C'est le
          même trait que le bord de feuille du hero et que les repères de la
          bande sous celui-ci : le site s'ouvre et se ferme sur la même
          marque, et le pied de page cesse d'être un simple bloc de texte.

          Le dégradé porte les graduations, un élément porte le filet : rien
          n'est ajouté au DOM que ce seul `span`, et il est `aria-hidden`.

          Les deux premiers centimètres sont cyan puis rouges — froid et
          chaleur, les deux régimes du métier, exactement comme le premier
          repère de la bande d'accueil. Au-delà, la graduation devient
          neutre. C'est la seule couleur du footer. */}
      <span
        aria-hidden
        className="block h-2 w-full border-t border-line-dark bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.14)_0_1px,transparent_1px_22px)]"
      />
      <span
        aria-hidden
        className="-mt-[1px] flex h-px w-40"
      >
        <span className="h-full w-1/2 bg-brand/70" />
        <span className="h-full w-1/2 bg-alert/70" />
      </span>

      <div className="container-t py-14 lg:py-16">
        {/* La zone d’intervention passe SOUS le bloc de marque, dans la même
            colonne. Placée à droite, elle laissait une réserve de près de
            300 px sous la marque : la colonne de gauche s’arrêtait à la
            phrase d’engagements pendant que la droite continuait. */}
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* ─── ASYMÉTRIE ───
              Quatre colonnes de largeur égale, c'est le pied de page de
              n'importe quel site d'entreprise : rien n'y est plus important
              que le reste. Le bloc de marque prend donc cinq colonnes sur
              douze et le nom monte à 2 rem — c'est la seule chose qu'on doit
              retenir d'un pied de page. Les trois groupes utiles se
              resserrent à sa droite. */}
          <div className="sm:col-span-2 lg:col-span-5">
            {/* ─── LE PICTOGRAMME OFFICIEL ───
                Le pied de page ne portait que le NOM. Le fichier fourni par
                l'entreprise — un flocon et un thermomètre — n'y figurait
                nulle part, alors qu'il ouvre l'en-tête de chaque page.

                Il est affiché TEL QUEL : mêmes pixels que l'en-tête et que
                le favicon, aucun recadrage, aucune recoloration. Seule sa
                hauteur change, pour s'asseoir sur le nom du pied de page,
                qui est composé plus grand que celui de l'en-tête.

                `Logo` n'est pas réutilisé ici : ce composant fixe son propre
                corps typographique (1,05 rem), celui de la barre de
                navigation. L'imposer au pied de page reviendrait à y écraser
                le nom, qui monte à 2 rem et qui est la seule chose qu'on doit
                retenir d'un footer. On reprend donc le MÊME fichier, pas la
                même composition — c'est ce que permet une marque figurative.

                `alt=""` : le nom est juste à côté, en texte. Décrire le
                pictogramme le ferait annoncer deux fois. */}
            <div className="flex items-center gap-3.5">
              <Image
                src="/photos/logo.png"
                alt=""
                width={128}
                height={93}
                className="h-9 w-auto shrink-0 lg:h-11"
              />
              <p className="heading text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-white">
                {company.legalName}
              </p>
            </div>
            <p className="mt-5 max-w-[24rem] text-[0.95rem] leading-7 text-mist">
              Climatisation, pompes à chaleur, réfrigération et chambres
              froides. Installation, entretien et dépannage à{' '}
              {company.primaryArea} et dans l’est mosellan.
            </p>
            <p className="label mt-6 text-white/45">
              Devis après visite · Garantie 3 ans · Un seul interlocuteur
            </p>
          </div>

          {/* La navigation en deux colonnes courtes plutôt qu'une pile de
              neuf liens : elle cesse de se lire comme un plan de site. */}
          <nav aria-label="Navigation de pied de page" className="lg:col-span-3 lg:col-start-7">
            <p className="label text-white/45">Navigation</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[...navigation, { label: 'Contact', href: '/contact' }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-t inline-block py-0.5 text-[0.95rem] text-mist hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="label text-white/45">Nous joindre</p>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li>
                <a
                  href={company.phoneHref}
                  /* -my-2.5 / py-2.5 : la cible tactile passe de 24 à 44 px
                     sans déplacer d'un pixel la ligne de base du texte. */
                  className="-my-2.5 flex items-center gap-2.5 py-2.5 font-semibold text-white"
                >
                  <Phone aria-hidden strokeWidth={1.6} className="h-4 w-4 text-brand" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="link-t flex items-start gap-2.5 break-all text-mist hover:text-white"
                >
                  <Mail aria-hidden strokeWidth={1.6} className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-mist">
                <MapPin aria-hidden strokeWidth={1.6} className="mt-1 h-4 w-4 shrink-0 text-brand" />
                <address className="not-italic">
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                </address>
              </li>
              <li className="text-mist">{company.hours}</li>
            </ul>
          </div>

          {/* Les quinze communes étaient empilées une par ligne : à elles
              seules, elles fixaient la hauteur du pied de page — près de
              400 px pour une information secondaire. Écrites au fil du
              texte, elles restent intégralement lisibles par un moteur de
              recherche et tiennent en quatre lignes. */}
          <div className="sm:col-span-2 lg:col-span-5 lg:col-start-1">
            <p className="label text-white/45">Zone d’intervention</p>
            {/* Chaque commune est insécable : sans cela « Freyming-Merlebach »
                et « Petite-Rosselle » se coupent sur leur trait d'union et
                le nom devient illisible en colonne étroite. Le retour à la
                ligne ne peut avoir lieu qu'entre deux communes. */}
            <p className="mt-5 text-[0.875rem] leading-6 text-mist">
              {servedTowns.map((town, i) => (
                <span key={town}>
                  {/* Le séparateur est HORS du groupe insécable : c'est la
                      seule occasion de retour à la ligne. Placé à
                      l'intérieur, il rendait les quinze communes solidaires
                      — une ligne unique de 1 447 px, et toute la page mise
                      en page sur cette largeur sur un vrai téléphone. */}
                  {i > 0 ? ' · ' : ''}
                  <span className="whitespace-nowrap">{town}</span>
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line-dark pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-white/55">
            © {new Date().getFullYear()} {company.legalName} — SIREN {company.siren}
          </p>
          {/* Les liens légaux ET la signature de conception tiennent dans UN
              SEUL enfant du bandeau. Posée en troisième enfant, la signature
              aurait fait basculer `justify-between` en trois colonnes et
              déplacé les liens légaux au centre — le bandeau bas serait à
              refaire pour une ligne de huit mots. */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-t inline-block py-0.5 text-[0.8rem] text-white/55 hover:text-white/80"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* La signature de conception. Le filet vertical est le seul
                ornement, et il sépare deux natures d'information : à gauche
                ce que le site DOIT afficher, à droite qui l'a dessiné.

                « Astra Studio » se détache par la CASSE TYPOGRAPHIQUE et par
                un cran de contraste — famille display, blanc à 70 % contre
                40 % — jamais par une couleur. Le cyan et le rouge de ce site
                portent un sens métier ; les employer ici les diluerait.

                Le filet disparaît sous 640 px : le bandeau bas y passe en
                colonne, la signature tombe sur sa propre ligne, et un trait
                qui ne sépare plus rien n'est plus qu'un trait. */}
            <p className="flex items-center gap-x-2.5 text-[0.8rem] text-white/55">
              <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
              Designed by{' '}
              {/* `link-t` est la signature de lien du site, celle que portent
                  déjà les deux liens légaux à gauche : au repos son filet est
                  en `scaleX(0)`, donc INVISIBLE — le rendu ne bouge pas d'un
                  pixel. Il balaie de la gauche au survol, et la couleur monte
                  de 70 % à 100 % de blanc. Aucune couleur d'accent : le cyan
                  et le rouge de ce site portent un sens métier.

                  Même onglet, donc pas de `target` — et pas de
                  `rel="noreferrer"`, qui priverait le studio de son
                  référent. */}
              <a
                href="https://astrastudio.pro/"
                className="link-t heading text-white/70 transition-colors hover:text-white"
              >
                Astra Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
