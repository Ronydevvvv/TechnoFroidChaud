import Link from 'next/link';
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
            <p className="heading text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-white">
              {company.legalName}
            </p>
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
          <p className="text-[0.8rem] text-white/40">
            © {new Date().getFullYear()} {company.legalName} — SIREN {company.siren}
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-t inline-block py-0.5 text-[0.8rem] text-white/40 hover:text-white/80"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
