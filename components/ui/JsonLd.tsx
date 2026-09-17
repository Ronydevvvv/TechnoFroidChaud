/**
 * Sérialisation des données structurées.
 *
 * `dangerouslySetInnerHTML` est le procédé documenté par Next.js pour le
 * JSON-LD. Ici l'objet est construit exclusivement à partir de constantes
 * du dépôt (content/, lib/seo.ts) : aucune donnée utilisateur, aucune
 * saisie, aucune réponse d'API n'y transite. Il n'y a donc pas de surface
 * d'injection à assainir.
 *
 * Cette garantie tombe le jour où l'on y injecterait une valeur venue d'un
 * formulaire ou d'un CMS : il faudrait alors échapper explicitement.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
