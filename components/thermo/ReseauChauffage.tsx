/**
 * Le réseau de chauffage — schéma de distribution.
 *
 * ─── LA SIXIÈME PROJECTION, ET POURQUOI CE N'EST PAS LA BOUCLE DE LA PAC ──
 * Le site en emploie déjà cinq, chacune réservée à une page :
 *
 *   /                   coupe de bâtiment        section verticale
 *   /chambres-froides   axonométrie isométrique  un volume vu du dehors
 *   /refrigeration      élévation frontale       des machines de face
 *   /pompes-a-chaleur   schéma de circuit        un ANNEAU, hors échelle
 *   /climatisation      vue en plan              section horizontale
 *
 * Celle-ci est un schéma topologique comme la boucle des pompes à chaleur,
 * et c'est précisément pour ça qu'il faut dire ce qui l'en sépare : la
 * TOPOLOGIE n'est pas la même.
 *
 *   la boucle PAC    un anneau fermé, quatre organes, AUCUNE dérivation.
 *                    Son sujet est le changement d'état du fluide.
 *   ce réseau        un PEIGNE : un tronc de départ, plusieurs dérivations
 *                    parallèles, un tronc de retour. Son sujet est la
 *                    distribution — une source, plusieurs émetteurs.
 *
 * Un anneau et un peigne ne se confondent pas à l'œil : l'un n'a pas de
 * branche, l'autre n'est que ça.
 *
 * ─── LA SEULE PLANCHE DU SITE SANS UN SEUL TRAIT CYAN ────────────────────
 * Le contenu de cette page ne mentionne aucun circuit froid — c'est le seul
 * métier du site dont le pôle est entièrement chaud. Le cyan n'a donc rien
 * à y faire, et le rouge cesse d'y être l'exception pour devenir la couleur
 * principale. C'est une identité qu'aucune autre page ne peut avoir, et
 * elle vient du contenu, pas d'un choix graphique.
 *
 *   rouge  le DÉPART — tronc en trait fort, dérivations en trait fin
 *   encre  le RETOUR, les émetteurs, la chaudière, le circulateur
 *
 * Le retour n'est pas coloré. Il porte la même eau, après qu'elle a cédé sa
 * chaleur : lui donner une couleur froide serait affirmer une température
 * que le contenu ne donne pas.
 *
 * ─── CE QUE LE DESSIN NOMME VIENT DU CONTENU, AU MOT PRÈS ────────────────
 * `content/services.ts` nomme explicitement, pour ce métier : le corps de
 * chauffe, le brûleur, la régulation, le circulateur, la vanne, les
 * radiateurs, et le circuit qu'on purge, désemboue et équilibre. Ce sont
 * exactement les organes dessinés, et il n'y en a pas d'autres.
 *
 * ─── AUCUNE DONNÉE AJOUTÉE ───────────────────────────────────────────────
 * Aucune température de départ, aucune de retour, aucune puissance, aucun
 * débit, aucun diamètre. Le contenu n'en donne aucune, et une valeur
 * inventée sur un schéma est un mensonge qui a l'air d'une preuve. Le
 * cartouche dit « de principe » : le réseau ne représente aucune
 * installation particulière, et le nombre d'émetteurs n'est pas un relevé.
 */

/* ═══════════════════════════════════════════════════════════════════════
   LE RÉSEAU LARGE — au-dessus de 1024 px
   Chaudière à gauche, départ en tête, quatre émetteurs, retour en pied.
   ═══════════════════════════════════════════════════════════════════════ */

/** Ordonnées des deux troncs. */
const DEP = 180;
const RET = 336;
/** Abscisses des quatre émetteurs. */
const EMET_X = [380, 592, 804, 1016];
const EMET_W = 118;

function Radiateur({ x, y, w, h, n, sw }: { x: number; y: number; w: number; h: number; n: number; sw: number }) {
  return (
    <g>
      <path d={`M${x} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x} ${y + h} Z`} stroke="currentColor" strokeWidth={sw} />
      {Array.from({ length: n }, (_, i) => {
        const cx = x + (w / (n + 1)) * (i + 1);
        return (
          <path key={i} d={`M${cx} ${y + 7} L${cx} ${y + h - 7}`} stroke="currentColor" strokeWidth={sw * 0.62} opacity={0.5} />
        );
      })}
    </g>
  );
}

function ReseauLarge({ className }: { className?: string }) {
  const designations: [number, string, string][] = [
    [60, 'CHAUDIÈRE', 'Corps de chauffe et brûleur'],
    [290, 'DÉPART', 'Tronc et dérivations'],
    [520, 'ÉMETTEURS', 'Radiateurs à équilibrer'],
    [750, 'RETOUR', 'Vers la chaudière'],
    [980, 'CIRCULATEUR', 'Il met le circuit en mouvement'],
  ];

  return (
    <svg
      viewBox="46 136 1160 338"
      aria-hidden
      focusable="false"
      className={`hidden w-full text-ink lg:block ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {[
          ['tfc-ch-dep-l', 'var(--color-alert)'],
          ['tfc-ch-ret-l', 'currentColor'],
        ].map(([id, c]) => (
          <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9" fill="none" stroke={c} strokeWidth="1.8" />
          </marker>
        ))}
      </defs>

      {/* ── La chaudière : enveloppe, corps de chauffe, brûleur ── */}
      <path d="M60 150 L196 150 L196 366 L60 366 Z" stroke="currentColor" strokeWidth={1.7} />
      <path d="M78 176 L178 176 L178 268 L78 268 Z" stroke="currentColor" strokeWidth={1.2} opacity={0.7} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M90 ${196 + i * 26} L166 ${196 + i * 26}`} stroke="currentColor" strokeWidth={0.9} opacity={0.45} />
      ))}
      <path d="M92 300 L164 300" stroke="currentColor" strokeWidth={1.4} opacity={0.75} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${106 + i * 18} 300 L${106 + i * 18} 282`} stroke="var(--color-alert)" strokeWidth={1.5} opacity={0.8} />
      ))}

      {/* ── Le tronc de départ, le trait le plus fort de la planche ── */}
      {/* Le tronc s'arrête à la dérivation du DERNIER émetteur. Poussé
          au-delà, il se terminait par une flèche dans le vide : un réseau
          ouvert, ce qui est faux et se voit. */}
      <path d={`M196 ${DEP} L${EMET_X[3] + 22} ${DEP}`} stroke="var(--color-alert)" strokeWidth={2.6} />
      <path
        d={`M196 ${DEP} L${EMET_X[3] + 22} ${DEP}`}
        stroke="var(--color-alert)"
        strokeWidth={4.4}
        strokeDasharray="26 620"
        opacity={0.55}
        className="tfc-circule"
      />
      {[480, 700, 920].map((x) => (
        <path key={x} d={`M${x - 22} ${DEP} L${x} ${DEP}`} stroke="var(--color-alert)" strokeWidth={2.6} markerEnd="url(#tfc-ch-dep-l)" />
      ))}

      {/* ── Le tronc de retour. Même eau, sans couleur : le contenu ne
             donne aucune température, on n'en suggère donc aucune. ── */}
      <path
        d={`M${EMET_X[3] + EMET_W - 22} ${RET} L196 ${RET}`}
        stroke="currentColor"
        strokeWidth={1.8}
        opacity={0.6}
      />
      {[960, 660, 340].map((x) => (
        <path key={x} d={`M${x + 22} ${RET} L${x} ${RET}`} stroke="currentColor" strokeWidth={1.8} opacity={0.6} markerEnd="url(#tfc-ch-ret-l)" />
      ))}

      {/* ── Les quatre émetteurs, et leurs dérivations ── */}
      {EMET_X.map((x) => (
        <g key={x}>
          {/* Dérivation de départ, avec sa vanne */}
          <path d={`M${x + 22} ${DEP} L${x + 22} 222`} stroke="var(--color-alert)" strokeWidth={1.6} opacity={0.85} />
          <path
            d={`M${x + 14} 196 L${x + 30} 208 L${x + 14} 208 L${x + 30} 196 Z`}
            stroke="var(--color-alert)"
            strokeWidth={1.3}
            opacity={0.85}
          />
          <Radiateur x={x} y={222} w={EMET_W} h={72} n={6} sw={1.6} />
          {/* Dérivation de retour */}
          <path d={`M${x + EMET_W - 22} 294 L${x + EMET_W - 22} ${RET}`} stroke="currentColor" strokeWidth={1.6} opacity={0.6} />
        </g>
      ))}

      {/* ── Le circulateur, sur le retour ── */}
      <g transform={`translate(272 ${RET})`}>
        <circle r={19} stroke="currentColor" strokeWidth={1.6} fill="var(--color-paper)" />
        <path d="M-7 -9 L9 0 L-7 9 Z" stroke="currentColor" strokeWidth={1.3} opacity={0.75} />
      </g>

      {/* ── Les désignations, sous le réseau ── */}
      {designations.map(([x, nom, sous]) => (
        <g key={nom}>
          <path d={`M${x} 412 L${x + 150} 412`} stroke="currentColor" strokeWidth={1.4} opacity={0.85} />
          <text x={x} y={434} fontSize={16} letterSpacing={1.4} fill="currentColor" stroke="none" className="font-[family-name:var(--font-sans)]">
            {nom}
          </text>
          <text x={x} y={456} fontSize={15} fill="currentColor" stroke="none" opacity={0.55} className="font-[family-name:var(--font-sans)]">
            {sous}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   LE RÉSEAU COMPACT — sous 1024 px
   ───────────────────────────────────────────────────────────────────────
   Ce n'est pas le réseau large réduit, et ce n'est pas la même mise en
   page. Le peigne se redresse : la chaudière passe EN TÊTE, le tronc de
   départ descend dans la marge gauche, les émetteurs s'empilent, et le
   tronc de retour remonte dans la marge droite jusqu'à la chaudière.

   Le regard descend donc la colonne de départ, traverse chaque émetteur,
   et remonte par le retour — c'est le sens d'un téléphone, et c'est
   l'inverse du parcours de gauche à droite du réseau large.

   Trois simplifications, chacune au service de la lecture :
     aucun texte dans le dessin — les désignations passent en HTML sous le
       schéma, où elles gardent le corps du reste du site ;
     les sous-détails tombent — vannes de dérivation, lignes du corps de
       chauffe, une paire d'ailettes par émetteur ;
     quatre émetteurs deviennent trois, et tous les traits montent d'un
       cran. Le nombre d'émetteurs n'est pas une donnée : c'est un schéma
       de principe, et le cartouche le dit.
   ═══════════════════════════════════════════════════════════════════════ */

const DEP_X = 48;
const RET_X = 292;
const RANGS = [176, 288, 400];

function ReseauCompact({ className }: { className?: string }) {
  return (
    <svg
      viewBox="34 18 289 460"
      aria-hidden
      focusable="false"
      className={`mx-auto w-full max-w-[23rem] text-ink lg:hidden ${className ?? ''}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {[
          ['tfc-ch-dep-c', 'var(--color-alert)'],
          ['tfc-ch-ret-c', 'currentColor'],
        ].map(([id, c]) => (
          <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9" fill="none" stroke={c} strokeWidth="1.8" />
          </marker>
        ))}
      </defs>

      {/* La chaudière, en tête */}
      <path d="M114 32 L226 32 L226 112 L114 112 Z" stroke="currentColor" strokeWidth={2.1} />
      <path d="M132 50 L208 50 L208 84 L132 84 Z" stroke="currentColor" strokeWidth={1.4} opacity={0.7} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${146 + i * 24} 96 L${146 + i * 24} 84`} stroke="var(--color-alert)" strokeWidth={1.9} opacity={0.8} />
      ))}

      {/* Le tronc de départ : il descend dans la marge gauche */}
      <path d={`M114 60 L${DEP_X} 60 L${DEP_X} ${RANGS[2] + 18}`} stroke="var(--color-alert)" strokeWidth={3.2} />
      <path
        d={`M114 60 L${DEP_X} 60 L${DEP_X} ${RANGS[2] + 18}`}
        stroke="var(--color-alert)"
        strokeWidth={4.2}
        strokeDasharray="22 400"
        opacity={0.55}
        className="tfc-circule"
      />
      {[240, 360].map((y) => (
        <path key={y} d={`M${DEP_X} ${y - 26} L${DEP_X} ${y}`} stroke="var(--color-alert)" strokeWidth={3.2} markerEnd="url(#tfc-ch-dep-c)" />
      ))}

      {/* Le tronc de retour : il remonte dans la marge droite */}
      <path d={`M${RET_X} ${RANGS[2] + 46} L${RET_X} 92 L226 92`} stroke="currentColor" strokeWidth={2.4} opacity={0.6} />
      {[200, 360].map((y) => (
        <path key={y} d={`M${RET_X} ${y + 26} L${RET_X} ${y}`} stroke="currentColor" strokeWidth={2.4} opacity={0.6} markerEnd="url(#tfc-ch-ret-c)" />
      ))}

      {/* Les trois émetteurs, dérivés entre les deux troncs */}
      {RANGS.map((y) => (
        <g key={y}>
          <path d={`M${DEP_X} ${y + 18} L100 ${y + 18}`} stroke="var(--color-alert)" strokeWidth={2.4} opacity={0.85} />
          <Radiateur x={100} y={y} w={140} h={64} n={4} sw={2.1} />
          <path d={`M240 ${y + 46} L${RET_X} ${y + 46}`} stroke="currentColor" strokeWidth={2.4} opacity={0.6} />
        </g>
      ))}

      {/* Le circulateur, sur le retour, juste avant la chaudière */}
      <g transform={`translate(${RET_X} 132)`}>
        <circle r={17} stroke="currentColor" strokeWidth={2.1} fill="var(--color-paper)" />
        <path d="M-6 -8 L8 0 L-6 8 Z" stroke="currentColor" strokeWidth={1.8} opacity={0.75} />
      </g>

    </svg>
  );
}

/**
 * Le composant exporté : deux réseaux, deux mises en page, un seul jeu de
 * conventions. Au-dessus de 1024 px le peigne couché et ses cinq
 * désignations ; en dessous, le peigne debout, sans aucun texte — la
 * légende HTML de la page prend le relais.
 */
export function ReseauChauffage({ className }: { className?: string }) {
  return (
    <>
      <ReseauLarge className={className} />
      <ReseauCompact className={className} />
    </>
  );
}
