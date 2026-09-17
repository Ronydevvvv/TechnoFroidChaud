import { LegalPage } from '@/components/sections/LegalPage';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';

/**
 * Mentions légales.
 *
 * ATTENTION — les champs marqués « À COMPLÉTER » doivent être renseignés
 * avant mise en ligne : ils sont obligatoires au titre de la LCEN et du code
 * de commerce. Ils ne peuvent pas être devinés depuis les sources publiques
 * consultées, et rien n'a été inventé à leur place.
 */

export const metadata = pageMetadata({
  title: `Mentions légales — ${company.legalName}`,
  description:
    `Mentions légales de ${company.legalName}, ${company.legalForm} installée ` +
    `${company.street}, ${company.postalCode} ${company.city} — éditeur, ` +
    'hébergeur et traitement des données du site.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      trail={[{ name: 'Mentions légales', path: '/mentions-legales' }]}
      updated="août 2026"
    >
      <h2 className="t-h3">Éditeur du site</h2>
      <p>
        {company.legalName}, société par actions simplifiée au capital social
        de <strong>[À COMPLÉTER]</strong>, immatriculée au registre du commerce
        et des sociétés sous le numéro SIREN {company.siren}.
      </p>
      <p>
        Siège social : {company.street}, {company.postalCode} {company.city}.
        <br />
        Téléphone : {company.phone}
        <br />
        Courriel : {company.email}
      </p>
      <p>
        Directeur de la publication : {company.director}.
        <br />
        Numéro de TVA intracommunautaire : <strong>[À COMPLÉTER]</strong>.
      </p>

      <h2 className="t-h3">Assurance professionnelle</h2>
      <p>
        Assurance responsabilité civile professionnelle et garantie décennale
        souscrites auprès de <strong>[À COMPLÉTER — assureur]</strong>, police
        n° <strong>[À COMPLÉTER]</strong>, couvrant les interventions réalisées
        sur le territoire français.
      </p>

      <h2 className="t-h3">Hébergement</h2>
      <p>
        Le site est hébergé par <strong>[À COMPLÉTER — hébergeur, adresse]</strong>.
      </p>

      <h2 className="t-h3">Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus de ce site — textes, photographies, éléments
        graphiques et code — est protégé par le droit d’auteur. Toute
        reproduction, même partielle, est soumise à autorisation écrite
        préalable.
      </p>

      <h2 className="t-h3">Médiation de la consommation</h2>
      <p>
        Conformément à l’article L. 612-1 du code de la consommation, tout
        consommateur peut recourir gratuitement à un médiateur en vue de la
        résolution amiable d’un litige. Médiateur compétent :{' '}
        <strong>[À COMPLÉTER — nom et coordonnées du médiateur]</strong>.
      </p>
    </LegalPage>
  );
}
