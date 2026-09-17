/**
 * La boucle thermodynamique — le circuit fermé d'une pompe à chaleur.
 *
 * ─── POURQUOI CETTE PAGE NE PEUT PAS PORTER UN REGISTRE THERMIQUE ────────
 * `/refrigeration` et `/chambres-froides` ont des températures dans leur
 * contenu. Celle-ci n'en a AUCUNE — et il est hors de question d'en
 * inventer pour faire une belle échelle. Sa matière propre est ailleurs :
 * c'est le TRANSFERT. Un circuit fermé, deux échanges, un seul poste qui
 * consomme. C'est ce que dessine cette boucle, et rien d'autre.
 *
 * ─── LE PARCOURS EST CELUI DU FLUIDE, PAS UN ANNEAU DÉCORATIF ────────────
 * Détente → évaporation → compression → condensation → détente. Les quatre
 * organes sont aux quatre points cardinaux du circuit et le sens de
 * parcours est celui du fluide réel.
 *
 * ─── LE ROUGE ET LE CYAN NE SONT PAS DES COULEURS, CE SONT DES ÉTATS ─────
 * Un seul segment est cyan : l'évaporation, là où le fluide PREND la
 * chaleur. Un seul segment est rouge : la condensation, là où il la REND.
 * Le reste du circuit est en trait neutre. Colorer la moitié froide et la
 * moitié chaude aurait été tout aussi exact, et deux fois trop bavard.
 *
 * Trois flèches extérieures portent les trois échanges, et chacune reprend
 * mot pour mot ce que dit le texte de l'étape correspondante :
 *   entrante cyan    la chaleur prise à l'air extérieur
 *   sortante rouge   la chaleur rendue au circuit ou à l'air soufflé
 *   entrante neutre  l'énergie électrique — « le seul poste qui consomme
 *                    réellement », selon le contenu de la page
 *
 * ─── DEUX COMPOSITIONS, PAS UNE RÉDUCTION ────────────────────────────────
 * Au-dessus de 1024 px, la boucle est COUCHÉE : large, les quatre organes
 * aux quatre côtés, les intitulés à l'extérieur. En dessous, elle est
 * DEBOUT — même circuit, même sens, mais haute et étroite, parce qu'un
 * téléphone a de la hauteur et pas de largeur. Les deux jeux de nombres
 * sont écrits séparément : une boucle large réduite à 375 px aurait donné
 * des intitulés de six pixels.
 */

type Boite = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  r: number;
  /** Corps des intitulés, en unités du viewBox. */
  corps: number;
};

/** Le tracé du circuit, découpé en quatre segments orientés. */
function segments(b: Boite) {
  const { x1, y1, x2, y2, r } = b;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  return {
    /** Détente (haut) → évaporation (gauche) */
    versEvap: `M${cx} ${y1} L${x1 + r} ${y1} A${r} ${r} 0 0 0 ${x1} ${y1 + r} L${x1} ${cy}`,
    /** Évaporation (gauche) → compression (bas) */
    versCompr: `M${x1} ${cy} L${x1} ${y2 - r} A${r} ${r} 0 0 0 ${x1 + r} ${y2} L${cx} ${y2}`,
    /** Compression (bas) → condensation (droite) */
    versCond: `M${cx} ${y2} L${x2 - r} ${y2} A${r} ${r} 0 0 0 ${x2} ${y2 - r} L${x2} ${cy}`,
    /** Condensation (droite) → détente (haut) */
    versDetente: `M${x2} ${cy} L${x2} ${y1 + r} A${r} ${r} 0 0 0 ${x2 - r} ${y1} L${cx} ${y1}`,
    cx,
    cy,
  };
}

function Circuit({ b, vertical, fond }: { b: Boite; vertical: boolean; fond: string }) {
  const s = segments(b);
  const { x1, y1, x2, y2, corps } = b;
  const { cx, cy } = s;

  /** Les quatre organes, à leur point du circuit. */
  const noeuds: { p: [number, number]; nom: string; ancre: 'start' | 'end' | 'middle'; dx: number; dy: number }[] = [
    /* Les deux intitulés latéraux passent SOUS leur nœud : posés à côté,
       ils étaient traversés de part en part par la flèche d'échange, qui
       arrive exactement à cette hauteur. Au-dessus, ils seraient entrés en
       collision avec les mentions « air extérieur » et « logement ».

       Et ils fuient le circuit : ancré `start` à gauche du rail, le texte
       repartait vers la droite et coupait la conduite de part en part.
       Ancré `end`, il se termine avant elle. Le nœud droit fait l'inverse.
       Un intitulé qui traverse une conduite, sur une planche, se lit comme
       un raccord. */
    { p: [x1, cy], nom: 'Évaporation', ancre: 'end', dx: -14, dy: corps + 18 },
    { p: [cx, y2], nom: 'Compression', ancre: 'middle', dx: 0, dy: corps + 22 },
    /* Sur la boucle debout, les deux intitulés latéraux ne sont éloignés que
       de 164 px et se rejoignaient presque au milieu. Le second descend d'une
       ligne : ils ne se disputent plus le même couloir. */
    { p: [x2, cy], nom: 'Condensation', ancre: 'start', dx: 14, dy: corps + (vertical ? 38 : 18) },
    { p: [cx, y1], nom: 'Détente', ancre: 'middle', dx: 0, dy: -18 },
  ];

  return (
    <>
      {/* Le circuit. Deux segments seulement sont colorés. */}
      <path d={s.versEvap} stroke="currentColor" strokeWidth={1.6} opacity={0.5} />
      <path d={s.versCompr} stroke="var(--color-brand)" strokeWidth={2.4} opacity={0.9} />
      <path d={s.versCond} stroke="currentColor" strokeWidth={1.6} opacity={0.5} />
      <path d={s.versDetente} stroke="var(--color-alert)" strokeWidth={2.4} opacity={0.9} />

      {/* Le fluide : un segment qui fait le tour, sans fin. */}
      <path
        d={`${s.versEvap} ${s.versCompr} ${s.versCond} ${s.versDetente}`}
        stroke="currentColor"
        strokeWidth={3.2}
        strokeDasharray="30 900"
        opacity={0.85}
        className="tfc-circule"
      />

      {/* Les quatre organes */}
      {noeuds.map((n) => (
        <g key={n.nom}>
          <circle cx={n.p[0]} cy={n.p[1]} r={7} fill={fond} stroke="currentColor" strokeWidth={1.6} />
          <text
            x={n.p[0] + n.dx}
            y={n.p[1] + n.dy}
            textAnchor={n.ancre}
            fontSize={corps}
            letterSpacing={0.6}
            fill="currentColor"
            stroke="none"
            className="font-[family-name:var(--font-display)]"
          >
            {n.nom}
          </text>
        </g>
      ))}

      {/* Les trois échanges. Ce sont eux qui font de la boucle une
          explication : sans eux, c'est un anneau. */}
      {/* Chaleur prise à l'air extérieur — entre à l'évaporateur */}
      <path
        d={`M${x1 - (vertical ? 52 : 118)} ${cy} L${x1 - 14} ${cy}`}
        stroke="var(--color-brand)"
        strokeWidth={1.8}
        markerEnd="url(#tfc-fl-froid-b)"
      />
      {/* Chaleur rendue — sort au condenseur */}
      <path
        d={`M${x2 + 14} ${cy} L${x2 + (vertical ? 52 : 118)} ${cy}`}
        stroke="var(--color-alert)"
        strokeWidth={1.8}
        markerEnd="url(#tfc-fl-chaud-b)"
      />
      {/* Énergie électrique — entre au compresseur */}
      <path
        d={`M${cx} ${y2 + (vertical ? 96 : 104)} L${cx} ${y2 + 16}`}
        stroke="currentColor"
        strokeWidth={1.6}
        opacity={0.65}
        markerEnd="url(#tfc-fl-neutre-b)"
      />
    </>
  );
}

export function BoucleThermodynamique() {
  const large: Boite = { x1: 140, y1: 200, x2: 780, y2: 368, r: 46, corps: 12.5 };
  const haute: Boite = { x1: 142, y1: 150, x2: 268, y2: 560, r: 34, corps: 15 };

  const defs = (
    <defs>
      {[
        ['tfc-fl-froid-b', 'var(--color-brand)'],
        ['tfc-fl-chaud-b', 'var(--color-alert)'],
        ['tfc-fl-neutre-b', 'currentColor'],
      ].map(([id, c]) => (
        <marker
          key={id}
          id={id}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9" fill="none" stroke={c} strokeWidth="1.7" />
        </marker>
      ))}
    </defs>
  );

  /** Les trois échanges, en toutes lettres. Même texte dans les deux vues. */
  const echanges = [
    { c: 'brand', t: 'Chaleur prise à l’air extérieur' },
    { c: 'alert', t: 'Chaleur rendue à l’intérieur' },
    { c: 'neutre', t: 'Énergie électrique — le seul poste consommé' },
  ];

  return (
    <div>
      {/* ── Couchée, au-dessus de 1024 px ── */}
      <svg
        viewBox="10 162 900 344"
        aria-hidden
        focusable="false"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden w-full text-ink lg:block"
      >
        {defs}
        <Circuit b={large} vertical={false} fond="var(--color-paper)" />
        <text x={30} y={268} fontSize={11} letterSpacing={1.1} fill="var(--color-brand)" stroke="none" className="font-[family-name:var(--font-sans)]">
          AIR EXTÉRIEUR
        </text>
        <text x={890} y={268} textAnchor="end" fontSize={11} letterSpacing={1.1} fill="var(--color-alert)" stroke="none" className="font-[family-name:var(--font-sans)]">
          LOGEMENT
        </text>
        <text x={460} y={490} textAnchor="middle" fontSize={11} letterSpacing={1.1} fill="currentColor" opacity={0.55} stroke="none" className="font-[family-name:var(--font-sans)]">
          ÉLECTRICITÉ
        </text>
      </svg>

      {/* ── Debout, en dessous ── */}
      <svg
        viewBox="10 105 390 586"
        aria-hidden
        focusable="false"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto w-full max-w-[24rem] text-ink lg:hidden"
      >
        {defs}
        <Circuit b={haute} vertical fond="var(--color-paper)" />
        <text x={22} y={340} fontSize={14} letterSpacing={1} fill="var(--color-brand)" stroke="none" className="font-[family-name:var(--font-sans)]">
          AIR EXT.
        </text>
        <text x={388} y={340} textAnchor="end" fontSize={14} letterSpacing={1} fill="var(--color-alert)" stroke="none" className="font-[family-name:var(--font-sans)]">
          LOGEMENT
        </text>
        <text x={205} y={676} textAnchor="middle" fontSize={14} letterSpacing={1} fill="currentColor" opacity={0.55} stroke="none" className="font-[family-name:var(--font-sans)]">
          ÉLECTRICITÉ
        </text>
      </svg>

      {/* La légende des trois échanges, en HTML : elle ne rétrécit pas. */}
      <ul className="mt-6 grid gap-x-10 gap-y-3 border-t border-line pt-5 text-[0.78rem] tracking-[0.04em] text-slate uppercase sm:grid-cols-3">
        {echanges.map((e) => (
          <li key={e.t} className="flex items-start gap-2.5">
            <span
              aria-hidden
              className={`mt-2 h-px w-6 shrink-0 ${
                e.c === 'brand' ? 'bg-brand' : e.c === 'alert' ? 'bg-alert' : 'bg-slate/60'
              }`}
            />
            {e.t}
          </li>
        ))}
      </ul>
    </div>
  );
}
