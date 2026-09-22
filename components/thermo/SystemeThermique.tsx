/**
 * Le système thermique — coupe d'un bâtiment équipé.
 *
 * ─── CE QUE CETTE PLANCHE DIT, ET QU'AUCUNE AUTRE NE DIT ─────────────────
 * Les pages métier expliquent un métier. L'accueil doit expliquer
 * l'ENSEMBLE : que les cinq spécialités de l'entreprise sont cinq endroits
 * d'un même bâtiment, reliés par les mêmes fluides, et qu'il s'agit d'un
 * seul raisonnement — déplacer de la chaleur.
 *
 * D'où une COUPE. C'est la troisième projection du site, et ce n'est pas un
 * caprice :
 *
 *   /chambres-froides   axonométrie isométrique   un volume, vu du dehors
 *   /refrigeration      élévation frontale        deux états comparés
 *   /pompes-a-chaleur   schéma de circuit         une boucle, hors échelle
 *   ACCUEIL             coupe de bâtiment         tout, à sa place
 *
 * ─── DEUX BÂTIMENTS, PAS UN SEUL RÉDUIT ─────────────────────────────────
 * C'est le point le plus important de ce fichier. Un bâtiment large ramené
 * à 375 px donne un dessin de 240 px de haut où plus rien ne se distingue :
 * le rapport de forme d'une coupe large est une fatalité, pas un réglage.
 *
 * Il y a donc DEUX géométries, décrites par le même type `Plan` et rendues
 * par la même fonction :
 *
 *   LARGE    724 × 470 unités, cinq travées, huit sous-détails, étiquettes
 *            de plan dans les marges. Au-dessus de 1024 px.
 *   ÉTROIT   360 × 330 unités, bâtiment resserré, un seul split, aucun
 *            texte dans le dessin. Rapport de forme presque carré : à
 *            375 px il occupe 470 px de haut au lieu de 240.
 *
 * Les deux portent les MÊMES systèmes aux mêmes étages. Ce n'est pas une
 * version dégradée, c'est le même bâtiment redessiné pour une autre page.
 *
 * ─── LES TEMPÉRATURES SONT CELLES DU SITE, ET RIEN QUE CELLES-LÀ ─────────
 *   −18 à −22 °C   chambre froide négative
 *   0 à +4 °C      chambre froide positive
 *   +2 à +6 °C     vitrine réfrigérée
 *
 * Reprises au mot près du registre de `/refrigeration`. Aucune température
 * de chauffage, aucune température de pompe à chaleur : le contenu du site
 * n'en donne aucune, et une valeur inventée sur un plan est un mensonge qui
 * a l'air d'une preuve. Ces deux systèmes sont dessinés et nommés, jamais
 * chiffrés.
 *
 * ─── LE ROUGE TIENT EN DEUX ENDROITS ─────────────────────────────────────
 *   la chaleur rejetée au-dessus du groupe de condensation
 *   le circuit de chauffage — départ animé, retour en trait faible
 *
 * ─── LES DEUX RÉSEAUX NE SE CROISENT PAS ────────────────────────────────
 * Contrainte de lisibilité, et elle commande le tracé : la liaison qui
 * descend vers les chambres froides passe SOUS la dalle, dans le vide
 * technique entre plancher et plafond des chambres. Elle ne remonte jamais
 * à l'étage, où l'air soufflé occupe déjà tout le champ. Deux réseaux cyan
 * au même niveau, et la planche devient illisible.
 */

type P = [number, number];

const d = (pts: P[], ferme = false) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ') + (ferme ? ' Z' : '');

const rect = (x: number, y: number, w: number, h: number) =>
  d([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true);

/** Une des trois consignes — texte repris du registre de /refrigeration. */
type Froid = { x: number; w: number; temp: string; nom: string };

export const FROIDS: readonly { temp: string; nom: string }[] = [
  { temp: '−18 à −22 °C', nom: 'Chambre négative' },
  { temp: '0 à +4 °C', nom: 'Chambre positive' },
  { temp: '+2 à +6 °C', nom: 'Vitrine' },
];

/** Tout ce qu'il faut pour tracer une coupe, à n'importe quel format. */
type Plan = {
  sol: number;
  toit: number;
  dalle: number;
  gauche: number;
  droite: number;
  /** Épaisseur de trait de référence. */
  k: number;
  /** Sous-détails : hachures de terrain, ailettes, refends. */
  detail: boolean;
  pac: { x: number; w: number; h: number };
  groupe: { x: number; w: number; h: number };
  splits: number[];
  splitW: number;
  splitH: number;
  /** Décalage des splits sous la toiture. */
  splitDy: number;
  /**
   * Épaisseur du POCHÉ — la matière tranchée par le plan de coupe.
   *
   * C'est ce qui sépare une coupe d'un schéma. Les murs, la dalle et la
   * toiture étaient des traits simples : la planche n'avait donc pas de
   * silhouette, et à 1440 px elle se lisait comme un filaire posé sur du
   * blanc. Remplir la matière et laisser le vide vide est LA convention
   * d'une coupe de bureau d'études — et c'est aussi ce qui donne au dessin
   * une présence visible de loin, sans ajouter le moindre ornement.
   */
  poche: number;
  /**
   * Les REFENDS — cloisons de l'étage, en x.
   *
   * L'étage était une boîte vide : deux splits à gauche, deux émetteurs à
   * droite, et rien entre les deux. Les cloisons en font des PIÈCES, et les
   * pièces expliquent les appareils — deux volumes climatisés, deux volumes
   * chauffés, un appareil par pièce. Le vide se remplit d'information, pas
   * de décoration.
   *
   * Elles montent du plafond au plancher, et les réseaux leur passent
   * dessus : une canalisation traverse une cloison, elle ne la contourne
   * pas. C'est l'ordre de tracé qui le dit — les circuits sont peints après
   * le bâti, donc par-dessus.
   */
  refends: number[];
  emetteurs: number[];
  emW: number;
  emH: number;
  froids: Froid[];
  local: { x: number; w: number };
  /** Corps des textes dans le dessin. 0 = aucun texte. */
  corps: number;
};

function Coupe({ p }: { p: Plan }) {
  const { sol, toit, dalle, gauche, droite, k, detail } = p;
  const froidY = dalle + 26;
  const froidH = sol - froidY;
  /** Le couloir technique, entre la dalle et le plafond des chambres. */
  const couloir = dalle + 13;

  return (
    <>
      {/* ── LE BÂTI ───────────────────────────────────────────────────── */}
      <path d={d([[gauche - 140, sol], [droite + 140, sol]])} stroke="currentColor" strokeWidth={2 * k} opacity={0.85} />
      {detail &&
        Array.from({ length: 30 }, (_, i) => (
          <path key={i} d={d([[gauche - 120 + i * 33, sol + 4], [gauche - 134 + i * 33, sol + 18]])} stroke="currentColor" strokeWidth={0.8} opacity={0.3} />
        ))}

      {/* ── LE POCHÉ ──────────────────────────────────────────────────
          La matière tranchée est pleine, le vide reste vide. Quatre bandes
          et deux cloisons remplacent les quatre traits d'avant : même
          géométrie, même encombrement, mais le bâtiment a désormais un
          corps — et c'est ce corps qui se voit de loin. */}
      {(() => {
        const ep = p.poche;
        const larg = droite - gauche + 2 * ep;
        return (
          <g fill="currentColor" stroke="none">
            {/* Les deux murs de façade */}
            <path d={rect(gauche - ep, toit, ep, sol - toit)} opacity={0.9} />
            <path d={rect(droite, toit, ep, sol - toit)} opacity={0.9} />
            {/* Le plancher haut, sous les machines de toiture */}
            <path d={rect(gauche - ep, toit, larg, ep * 1.15)} opacity={0.9} />
            {/* La dalle intermédiaire */}
            <path d={rect(gauche - ep, dalle, larg, ep * 1.15)} opacity={0.9} />
            {/* Les refends. Plus fins que les façades — une cloison de
                distribution n'est pas un mur porteur, et le dessin doit le
                dire plutôt que de les aligner tous au même trait. */}
            {p.refends.map((x) => (
              <path key={x} d={rect(x - ep * 0.34, toit, ep * 0.68, dalle - toit)} opacity={0.72} />
            ))}
          </g>
        );
      })()}
      <path d={d([[gauche - 12 - p.poche, toit], [droite + 12 + p.poche, toit]])} stroke="currentColor" strokeWidth={1.6 * k} opacity={0.9} />
      {[gauche - 12 - p.poche, droite + 12 + p.poche].map((x) => (
        <path key={x} d={d([[x, toit], [x, toit - 13]])} stroke="currentColor" strokeWidth={1.3 * k} opacity={0.6} />
      ))}

      {/* ── EN TOITURE ────────────────────────────────────────────────── */}
      <path d={rect(p.pac.x, toit - p.pac.h, p.pac.w, p.pac.h)} stroke="currentColor" strokeWidth={1.5 * k} />
      <g transform={`translate(${p.pac.x + p.pac.w / 2} ${toit - p.pac.h / 2})`}>
        <circle r={p.pac.h * 0.3} stroke="currentColor" strokeWidth={1 * k} opacity={0.65} />
        {/* `transformBox` en style local, et non dans `globals.css` : la
            classe `.tfc-helice` est partagée avec les planches de
            /chambres-froides et /refrigeration, qui ne doivent pas bouger.
            Sans lui, `transform-origin: center` se résout au centre de la
            FENÊTRE du dessin et les pales tournent en orbite autour du
            bâtiment au lieu de tourner sur leur axe. */}
        <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              d={`M0 0 C${p.pac.h * 0.09} ${-p.pac.h * 0.09} ${p.pac.h * 0.12} ${-p.pac.h * 0.19} ${p.pac.h * 0.043} ${-p.pac.h * 0.26} C${-p.pac.h * 0.043} ${-p.pac.h * 0.19} ${-p.pac.h * 0.069} ${-p.pac.h * 0.09} 0 0 Z`}
              transform={`rotate(${a})`}
              stroke="currentColor"
              strokeWidth={0.9 * k}
              opacity={0.7}
            />
          ))}
        </g>
      </g>

      <path d={rect(p.groupe.x, toit - p.groupe.h, p.groupe.w, p.groupe.h)} stroke="currentColor" strokeWidth={1.5 * k} />
      {detail &&
        Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={d([[p.groupe.x + 16, toit - p.groupe.h + 10 + i * 9], [p.groupe.x + p.groupe.w - 16, toit - p.groupe.h + 10 + i * 9]])} stroke="currentColor" strokeWidth={0.8} opacity={0.4} />
        ))}

      {/* La chaleur rejetée — premier des deux rouges. */}
      {[0, 1, 2].map((i) => {
        const x = p.groupe.x + p.groupe.w * 0.22 + i * (p.groupe.w * 0.28);
        return (
          <path
            key={i}
            d={d([[x, toit - p.groupe.h - 8], [x + 10, toit - p.groupe.h - 46]])}
            stroke="var(--color-alert)"
            strokeWidth={2 * k}
            markerEnd="url(#tfc-sys-chaud)"
          />
        );
      })}

      {/* ── À L'ÉTAGE : splits et air soufflé ─────────────────────────── */}
      {p.splits.map((x) => (
        <g key={x}>
          <path d={rect(x, toit + p.splitDy, p.splitW, p.splitH)} stroke="currentColor" strokeWidth={1.4 * k} />
          {detail && <path d={d([[x + 8, toit + p.splitDy + p.splitH - 6], [x + p.splitW - 8, toit + p.splitDy + p.splitH - 6]])} stroke="currentColor" strokeWidth={0.8} opacity={0.5} />}
          {[0, 1, 2].map((i) => {
            const x0 = x + p.splitW * 0.2 + i * (p.splitW * 0.29);
            const y0 = toit + p.splitDy + p.splitH + 4;
            const y1 = dalle - 14;
            return (
              <path
                key={i}
                d={`M${x0} ${y0} Q${x0 - 12} ${(y0 + y1) / 2} ${x0 - 34} ${y1}`}
                stroke="var(--color-brand)"
                strokeWidth={1.8 * k}
                strokeDasharray="12 10"
                className="tfc-flux"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            );
          })}
        </g>
      ))}

      {/* ── AU REZ : les volumes froids ───────────────────────────────── */}
      {p.froids.map((f) => (
        <g key={f.temp}>
          <path d={rect(f.x, froidY, f.w, froidH)} fill="var(--color-brand)" opacity={0.07} stroke="none" />
          <path d={rect(f.x, froidY, f.w, froidH)} stroke="currentColor" strokeWidth={1.5 * k} />
          {detail && <path d={d([[f.x + 10, froidY + 15], [f.x + f.w - 10, froidY + 15]])} stroke="currentColor" strokeWidth={0.9} opacity={0.4} />}
          {p.corps > 0 && (
            <>
              <text
                x={f.x + f.w / 2}
                y={froidY + froidH * 0.42}
                textAnchor="middle"
                fontSize={p.corps + 2}
                fill="var(--color-brand)"
                stroke="none"
                className="font-[family-name:var(--font-display)] tabular-nums"
              >
                {f.temp}
              </text>
              <path d={d([[f.x + 18, froidY + froidH * 0.55], [f.x + f.w - 18, froidY + froidH * 0.55]])} stroke="var(--color-brand)" strokeWidth={1.1} opacity={0.4} />
              <text
                x={f.x + f.w / 2}
                y={froidY + froidH * 0.71}
                textAnchor="middle"
                fontSize={p.corps - 4}
                letterSpacing={0.9}
                fill="currentColor"
                stroke="none"
                opacity={0.5}
                className="font-[family-name:var(--font-sans)]"
              >
                {f.nom.toUpperCase()}
              </text>
            </>
          )}
        </g>
      ))}

      {/* ── LE LOCAL TECHNIQUE ────────────────────────────────────────── */}
      <path d={rect(p.local.x, froidY + 26, p.local.w, froidH - 26)} stroke="currentColor" strokeWidth={1.5 * k} />
      {detail && <path d={d([[p.local.x + 14, froidY + 44], [p.local.x + p.local.w - 14, froidY + 44]])} stroke="currentColor" strokeWidth={0.9} opacity={0.45} />}

      {/* Les émetteurs, à l'étage. */}
      {p.emetteurs.map((x) => (
        <g key={x}>
          {/* Le même voile que les volumes froids, mais en rouge.
              Les trois chambres étaient teintées de cyan et les émetteurs
              n'étaient teintés de rien : la planche s'intitulait « froid ET
              chaleur » et ne montrait que du froid. Deux aplats à 7 % ne
              sont pas un ornement — ils rendent le titre vrai. */}
          <path d={rect(x, dalle - p.emH - 12, p.emW, p.emH)} fill="var(--color-alert)" opacity={0.08} stroke="none" />
          <path d={rect(x, dalle - p.emH - 12, p.emW, p.emH)} stroke="currentColor" strokeWidth={1.4 * k} />
          {detail &&
            Array.from({ length: 4 }, (_, i) => (
              <path key={i} d={d([[x + 11 + i * 13, dalle - p.emH - 6], [x + 11 + i * 13, dalle - 18]])} stroke="currentColor" strokeWidth={0.8} opacity={0.45} />
            ))}
        </g>
      ))}

      {/* ── LE CIRCUIT DE CHAUFFAGE ───────────────────────────────────── */}
      {/* Une vraie boucle : départ de la chaudière, passage sous les deux
          émetteurs avec un piquage sous chacun, retour à la chaudière.
          L'ancien tracé s'arrêtait à mi-course et ne se lisait pas comme un
          circuit — il n'en était pas un. */}
      {(() => {
        const cx = p.local.x + p.local.w / 2;
        const g1 = p.emetteurs[0] + p.emW / 2;
        const g2 = p.emetteurs[1] + p.emW / 2;
        const yD = dalle - 24;
        const yR = dalle - 15;
        const depart = d([
          [cx - 7, froidY + 26],
          [cx - 7, yD],
          [g1, yD],
        ]);
        const retour = d([
          [g2, yR],
          [cx + 7, yR],
          [cx + 7, froidY + 26],
        ]);
        return (
          <>
            <path d={`${depart} M${g1} ${yD} L${g2} ${yD}`} stroke="var(--color-alert)" strokeWidth={1.6 * k} opacity={0.6} />
            <path d={depart} stroke="var(--color-alert)" strokeWidth={2.6 * k} strokeDasharray="20 320" className="tfc-circule-inverse" />
            <path d={retour} stroke="var(--color-alert)" strokeWidth={1.4 * k} opacity={0.42} />
            {[g1, g2].map((x) => (
              <path key={x} d={d([[x, yD], [x, dalle - 12]])} stroke="var(--color-alert)" strokeWidth={1.6 * k} opacity={0.72} />
            ))}
          </>
        );
      })()}

      {/* ── LES LIAISONS FRIGORIFIQUES ───────────────────────────────── */}
      {(() => {
        const pacX = p.pac.x + p.pac.w / 2;
        const grpX = p.groupe.x + p.groupe.w * 0.3;
        const yHaut = toit + p.splitDy - 14;
        const riser = gauche - 14;
        const splitsX = p.splits.map((x) => x + p.splitW / 2);
        const froidsX = p.froids.map((f) => f.x + f.w / 2);

        /* Vers les splits : la liaison descend le long de la façade, rentre
           AU-DESSUS des appareils et y plonge. Elle ne traverse donc jamais
           la zone des arcs d'air soufflé, qui commence sous les splits. */
        const versSplits = d([
          [pacX, toit],
          [pacX, toit - 18],
          [riser, toit - 18],
          [riser, yHaut],
          [splitsX[0], yHaut],
          [splitsX[0], toit + p.splitDy],
        ]);
        const versSplits2 =
          splitsX.length > 1
            ? d([
                [splitsX[0], yHaut],
                [splitsX[splitsX.length - 1], yHaut],
                [splitsX[splitsX.length - 1], toit + p.splitDy],
              ])
            : '';

        /* Vers les chambres : la liaison longe le couloir technique SOUS la
           dalle. Elle reste hors du champ de l'air soufflé. */
        const versFroids = d([
          [grpX, toit],
          [grpX, couloir],
          [froidsX[1], couloir],
          [froidsX[1], froidY],
        ]);
        const versFroids2 = d([
          [froidsX[1], couloir],
          [froidsX[0], couloir],
          [froidsX[0], froidY],
        ]);
        const versVitrine = d([
          [froidsX[1], couloir],
          [froidsX[2], couloir],
          [froidsX[2], froidY],
        ]);

        return (
          <>
            {[versSplits, versSplits2, versFroids, versFroids2, versVitrine]
              .filter(Boolean)
              .map((t, i) => (
                <path key={i} d={t} stroke="var(--color-brand)" strokeWidth={1.4 * k} opacity={0.45} />
              ))}
            <path d={versFroids} stroke="var(--color-brand)" strokeWidth={2.6 * k} strokeDasharray="22 480" className="tfc-circule" />
            <path d={versSplits} stroke="var(--color-brand)" strokeWidth={2.6 * k} strokeDasharray="18 360" className="tfc-circule" style={{ animationDelay: '2.5s' }} />
          </>
        );
      })()}
    </>
  );
}

/** Une étiquette de plan : texte, attache horizontale, oblique vers la pièce. */
function Etiquette({ x, y, w, cible, texte, fin = 1 }: { x: number; y: number; w: number; cible: P; texte: string; fin?: 1 | -1 }) {
  const bout: P = [x + (fin === 1 ? w : -w), y + 8];
  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={fin === 1 ? 'start' : 'end'}
        fontSize={15}
        letterSpacing={1.3}
        fill="currentColor"
        stroke="none"
        opacity={0.8}
        className="font-[family-name:var(--font-sans)]"
      >
        {texte}
      </text>
      <path d={d([[x, y + 8], bout, cible])} stroke="currentColor" strokeWidth={0.9} opacity={0.42} fill="none" />
      <circle cx={cible[0]} cy={cible[1]} r={2.8} fill="currentColor" opacity={0.75} stroke="none" />
    </g>
  );
}

/* ─── LES DEUX PLANS ─────────────────────────────────────────────────── */

const LARGE: Plan = {
  sol: 478,
  toit: 150,
  dalle: 322,
  gauche: 200,
  droite: 900,
  k: 1,
  detail: true,
  corps: 15,
  pac: { x: 252, w: 112, h: 54 },
  groupe: { x: 596, w: 132, h: 62 },
  splits: [268, 452],
  splitW: 76,
  splitH: 26,
  splitDy: 44,
  poche: 9,
  refends: [398, 605, 774],
  emetteurs: [690, 796],
  emW: 62,
  emH: 42,
  froids: [
    { x: 224, w: 150, temp: FROIDS[0].temp, nom: FROIDS[0].nom },
    { x: 392, w: 128, temp: FROIDS[1].temp, nom: FROIDS[1].nom },
    { x: 540, w: 104, temp: FROIDS[2].temp, nom: FROIDS[2].nom },
  ],
  local: { x: 734, w: 88 },
};

const ETROIT: Plan = {
  sol: 430,
  toit: 140,
  dalle: 286,
  gauche: 60,
  droite: 420,
  k: 1.7,
  detail: false,
  corps: 0,
  pac: { x: 78, w: 74, h: 46 },
  groupe: { x: 258, w: 96, h: 52 },
  splits: [96],
  splitW: 62,
  splitH: 22,
  splitDy: 40,
  poche: 7,
  refends: [210, 332],
  emetteurs: [268, 344],
  emW: 52,
  emH: 36,
  froids: [
    { x: 74, w: 82, temp: FROIDS[0].temp, nom: FROIDS[0].nom },
    { x: 166, w: 76, temp: FROIDS[1].temp, nom: FROIDS[1].nom },
    { x: 252, w: 62, temp: FROIDS[2].temp, nom: FROIDS[2].nom },
  ],
  local: { x: 330, w: 64 },
};

export function SystemeThermique() {
  const defs = (
    <defs>
      <marker id="tfc-sys-chaud" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--color-alert)" strokeWidth="1.7" />
      </marker>
    </defs>
  );

  return (
    <div>
      {/* ── La coupe complète, au-dessus de 1024 px ── */}
      <svg
        viewBox="10 22 1200 522"
        aria-hidden
        focusable="false"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden w-full text-ink lg:block"
      >
        {defs}
        <Coupe p={LARGE} />

        <Etiquette x={96} y={LARGE.toit - 76} w={116} cible={[LARGE.pac.x, LARGE.toit - 28]} texte="POMPE À CHALEUR" />
        <Etiquette x={1128} y={LARGE.toit - 110} w={154} cible={[LARGE.groupe.x + LARGE.groupe.w, LARGE.toit - 42]} texte="RÉFRIGÉRATION" fin={-1} />
        <Etiquette x={96} y={LARGE.toit + 150} w={106} cible={[LARGE.splits[0], LARGE.toit + LARGE.splitDy + 12]} texte="CLIMATISATION" />
        <Etiquette x={1128} y={LARGE.dalle - 84} w={210} cible={[LARGE.local.x + 20, LARGE.dalle + 60]} texte="CHAUFFAGE" fin={-1} />
        <Etiquette x={96} y={LARGE.sol + 56} w={120} cible={[LARGE.froids[0].x + 40, LARGE.sol - 30]} texte="CHAMBRES FROIDES" />
      </svg>

      {/* ── La coupe resserrée, en dessous ── */}
      <svg
        viewBox="30 34 420 424"
        aria-hidden
        focusable="false"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full text-ink lg:hidden"
      >
        {defs}
        <Coupe p={ETROIT} />
      </svg>
    </div>
  );
}
