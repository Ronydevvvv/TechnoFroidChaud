/**
 * Les repères numérotés — le lien entre un dessin et sa légende.
 *
 * ─── LE DÉFAUT QU'ILS CORRIGENT, ET IL ÉTAIT PARTOUT SUR TÉLÉPHONE ───────
 * Au-dessus de 1024 px, chaque planche porte ses désignations DANS le
 * dessin, posées à côté de l'élément qu'elles nomment. En dessous, le texte
 * ne tient plus dans le SVG — un intitulé y ferait six pixels de haut — et
 * il avait donc été sorti en HTML, sous le schéma.
 *
 * Le résultat était systématiquement le même : un dessin en haut, une liste
 * de mots en bas, et AUCUN moyen de savoir lequel désigne quoi. Sur
 * `/entretien-depannage` le dessin faisait 550 px et la liste 300 de plus ;
 * sur `/chauffage` la liste ne disait même pas dans quel ordre lire. Le
 * visiteur avait sous les yeux une planche technique et une nomenclature,
 * sans la seule chose qui les relie.
 *
 * ─── LA CONVENTION EST CELLE DU DESSIN INDUSTRIEL ────────────────────────
 * Un numéro posé sur la pièce, le même numéro en tête de sa ligne de
 * nomenclature. Rien n'est inventé, rien n'est ajouté au contenu : les
 * désignations sont exactement celles qui existaient déjà. On rend
 * seulement lisible le rapport entre les deux.
 *
 * C'est aussi le seul dispositif qui tient dans un SVG étroit : un chiffre
 * reste lisible à 15 px là où un mot ne l'est plus.
 *
 * ─── POURQUOI UN CHIFFRE ET PAS « 01 » DANS LE DESSIN ────────────────────
 * Deux caractères dans une pastille de 26 unités obligeraient soit à
 * grossir la pastille — qui masquerait alors le trait qu'elle désigne —
 * soit à réduire le corps sous le lisible. Le chiffre seul suffit : une
 * planche ne porte jamais plus de cinq repères.
 */

/** Le pas de numérotation : les repères commencent à 1, jamais à 0. */
export type Repere = {
  /** Le nom de l'élément. Exactement celui de la planche large. */
  nom: string;
  /** La précision qui l'accompagne, quand la planche large en porte une. */
  detail?: string;
};

/**
 * La pastille posée sur le dessin.
 *
 * `r` se règle par planche : les viewBox n'ont pas la même échelle, et un
 * repère doit garder le même poids À L'ÉCRAN d'une planche à l'autre. La
 * valeur par défaut convient aux planches dont la largeur utile avoisine
 * 300 unités pour 335 px rendus.
 */
export function RepereSvg({
  n,
  x,
  y,
  r = 13,
}: {
  n: number;
  x: number;
  y: number;
  r?: number;
}) {
  return (
    <g>
      {/* Le liseré de papier détache la pastille du trait qu'elle touche :
          sans lui, un repère posé sur une conduite semble en faire partie. */}
      <circle cx={x} cy={y} r={r + 2.4} fill="var(--color-paper)" stroke="none" />
      <circle cx={x} cy={y} r={r} fill="var(--color-ink)" stroke="none" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={r * 1.16}
        fontWeight={600}
        fill="var(--color-paper)"
        stroke="none"
        className="font-[family-name:var(--font-sans)]"
      >
        {n}
      </text>
    </g>
  );
}

/**
 * La nomenclature, sous le dessin.
 *
 * Chaque ligne s'ouvre sur la MÊME pastille que le dessin — même diamètre
 * apparent, même encre, même chiffre. C'est cette répétition qui fait le
 * lien ; une simple numérotation typographique ne l'aurait pas faite.
 *
 * Deux colonnes dès 640 px : à cette largeur une nomenclature de cinq
 * lignes pleine largeur laisse une gouttière vide de moitié.
 */
export function ListeReperes({
  items,
  className = '',
}: {
  items: readonly Repere[];
  className?: string;
}) {
  return (
    <ol
      className={`mt-6 grid gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-2 ${className}`}
    >
      {items.map((it, i) => (
        <li key={it.nom} className="flex items-baseline gap-3">
          <span
            aria-hidden
            className="mt-px flex size-[1.55rem] shrink-0 translate-y-[0.2rem] items-center justify-center rounded-full bg-ink text-[0.82rem] font-semibold text-paper tabular-nums"
          >
            {i + 1}
          </span>
          <span className="min-w-0">
            <span className="block text-[0.9rem] tracking-[0.05em] text-ink uppercase">
              {it.nom}
            </span>
            {it.detail ? (
              <span className="mt-0.5 block text-[0.88rem] leading-6 text-slate">
                {it.detail}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
