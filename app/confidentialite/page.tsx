import { LegalPage } from '@/components/sections/LegalPage';
import { pageMetadata } from '@/lib/seo';
import { company } from '@/content/company';

/**
 * Politique de confidentialité.
 *
 * Elle décrit ce que le site fait réellement aujourd'hui : aucun traceur,
 * aucune carte tierce, aucune police servie depuis un CDN, aucun cookie
 * autre que techniques. C'est pour cette raison qu'aucun bandeau de
 * consentement n'est nécessaire — et c'est une décision d'architecture,
 * pas un oubli.
 *
 * À RÉVISER si l'on ajoute un jour un outil de mesure d'audience : dans ce
 * cas, un consentement préalable devient obligatoire.
 */

export const metadata = pageMetadata({
  title: `Politique de confidentialité — ${company.legalName}`,
  description: `Traitement des données personnelles sur le site de ${company.legalName}.`,
  path: '/confidentialite',
});

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      trail={[{ name: 'Politique de confidentialité', path: '/confidentialite' }]}
      updated="août 2026"
    >
      <h2 className="t-h3">Ce que ce site ne fait pas</h2>
      <p>
        Ce site ne dépose aucun cookie publicitaire, n’utilise aucun outil de
        mesure d’audience et ne charge aucune ressource depuis un service
        tiers — ni police de caractères, ni carte interactive, ni lecteur
        vidéo. Aucune donnée de navigation n’est transmise à un tiers, et
        c’est la raison pour laquelle aucun bandeau de consentement ne vous
        est présenté.
      </p>

      <h2 className="t-h3">Données collectées</h2>
      <p>
        Seules les informations que vous saisissez volontairement dans le
        formulaire de contact sont collectées : nom, téléphone, adresse
        électronique, commune et description de votre demande.
      </p>

      <h2 className="t-h3">Finalité et base légale</h2>
      <p>
        Ces données servent exclusivement à répondre à votre demande et, le
        cas échéant, à établir un devis. Le traitement repose sur votre
        démarche volontaire, préalable à la conclusion éventuelle d’un
        contrat. Elles ne sont ni revendues, ni cédées, ni utilisées à des
        fins de prospection.
      </p>

      <h2 className="t-h3">Durée de conservation</h2>
      <p>
        Les demandes sans suite sont conservées trois ans. Les données liées à
        un devis accepté sont conservées pendant la durée de la relation
        commerciale, puis pendant les délais légaux de conservation
        comptable.
      </p>

      <h2 className="t-h3">Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification, d’effacement,
        d’opposition et de portabilité sur vos données. Pour l’exercer,
        écrivez à <a href={`mailto:${company.email}`}>{company.email}</a> ou à
        l’adresse du siège : {company.street}, {company.postalCode}{' '}
        {company.city}.
      </p>
      <p>
        En cas de désaccord persistant, vous pouvez saisir la Commission
        nationale de l’informatique et des libertés (CNIL),{' '}
        <a href="https://www.cnil.fr" rel="noreferrer">
          cnil.fr
        </a>
        .
      </p>
    </LegalPage>
  );
}
