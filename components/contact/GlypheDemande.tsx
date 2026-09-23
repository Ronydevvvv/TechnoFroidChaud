/**
 * Les quatre motifs de demande, en glyphes.
 *
 * ─── POURQUOI PAS LES GLYPHES MÉTIER ─────────────────────────────────────
 * La liste réutilisait `GlypheMetier` — le meuble réfrigéré pour
 * « Entretien », le rotor de pompe à chaleur pour « Renseignement ». Ces
 * deux-là ne voulaient rien dire : la correspondance était arbitraire, et
 * un glyphe arbitraire est pire qu'aucun glyphe, parce qu'il promet un sens
 * qu'il n'a pas.
 *
 * Ces quatre-ci dessinent le GESTE, pas l'équipement :
 *
 *   installation    le caisson et sa patte de fixation — on pose
 *   entretien       l'échangeur et sa passe de nettoyage — on entretient
 *   depannage       la ligne d'état qui décroche — quelque chose est tombé
 *   renseignement   une ligne de cote — on mesure avant de décider
 *
 * La ligne de cote est le seul des quatre qui ne représente pas un objet.
 * C'est volontaire : une demande de renseignement n'a pas d'objet, elle a
 * une question — et sur une planche, une question se pose en cotant.
 *
 * ─── CONTRAINTES ────────────────────────────────────────────────────────
 * 24 unités de côté, trait de 1,5, `currentColor`, aucun aplat. Ils
 * héritent donc de la couleur de la ligne et s'éclairent avec elle au
 * survol, sans une seule règle de couleur propre.
 *
 * Ils sont rendus à 20 px : trois ou quatre traits chacun, pas davantage.
 * À cette taille, un cinquième trait devient une tache.
 */

type Demande = 'installation' | 'entretien' | 'depannage' | 'renseignement';

const TRACES: Record<Demande, React.ReactNode> = {
  /* Le caisson et sa patte de fixation : le geste de la pose. */
  installation: (
    <>
      <path d="M6 4.5h14v9H6z" />
      <path d="M6 9h14" />
      <path d="M3 4.5v15h3" />
    </>
  ),
  /* L'échangeur et ses ailettes, traversé par une passe de nettoyage. */
  entretien: (
    <>
      <path d="M4 5.5h16v13H4z" />
      <path d="M8.5 5.5v13M13 5.5v13M17.5 5.5v13" />
      <path d="M2 3 L22 3" />
    </>
  ),
  /* La ligne d'état qui décroche : en service, puis défaut. */
  depannage: (
    <>
      <path d="M2 7.5h7l3.5 9h9.5" />
      <circle cx="12.5" cy="12" r="2" />
    </>
  ),
  /* Une ligne de cote : deux attaches, un trait, deux pointes. */
  renseignement: (
    <>
      <path d="M4 4v16M20 4v16" />
      <path d="M4 12h16" />
      <path d="M7.5 9.5 4 12l3.5 2.5" />
      <path d="M16.5 9.5 20 12l-3.5 2.5" />
    </>
  ),
};

export function GlypheDemande({
  demande,
  className = '',
}: {
  demande: Demande;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {TRACES[demande]}
    </svg>
  );
}

export type { Demande };
