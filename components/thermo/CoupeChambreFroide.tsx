/**
 * La coupe — chambre froide en axonométrie éclatée. V2 : planche légendée.
 *
 * ─── CE QU'ELLE REMPLACE ─────────────────────────────────────────────────
 * Une photographie d'entrepôt frigorifique servant de fond à trois
 * paragraphes. La photo montrait un lieu ; elle ne montrait pas ce que la
 * page explique — où est l'évaporateur, où est le groupe, ce qui les relie.
 * Un plan le montre. C'est la seule raison de ce remplacement.
 *
 * ─── LA GÉOMÉTRIE EST CALCULÉE, PAS DESSINÉE À VUE ───────────────────────
 * Projection axonométrique isométrique classique :
 *
 *     X = (x − y) · k · cos30°
 *     Y = (x + y) · k · sin30° − z · k
 *
 * Toutes les arêtes passent par `iso()`. Aucune coordonnée d'objet n'est
 * posée à la main, donc aucune fuite ne diverge : c'est ce qui sépare un
 * plan d'une illustration qui « fait technique ».
 *
 * Le volume est une boîte de 6 × 4 × 3 unités. Deux éléments sont éclatés,
 * comme sur une notice de montage : le plafond monté à z = 4,6 et le
 * panneau de façade glissé à y = −1,5.
 *
 * ─── V2 : LES LÉGENDES ENTRENT DANS LE DESSIN ────────────────────────────
 * Huit organes sont nommés À MÊME LA PLANCHE, sur une ligne d'attache
 * horizontale prolongée d'une oblique — la convention exacte d'un plan
 * d'exécution. Les positions des étiquettes, elles, sont en coordonnées de
 * planche et non de volume : une légende n'appartient pas à la géométrie de
 * l'objet qu'elle désigne.
 *
 * Les étiquettes disparaissent sous 1024 px. Un texte de 15 unités dans une
 * fenêtre de 1060 unités réduite à 375 px ferait 5 px de haut : la légende
 * HTML sous la planche prend alors le relais.
 *
 * ─── AUCUNE COTE CHIFFRÉE ────────────────────────────────────────────────
 * La ligne de cote sous le volume porte « VOLUME ISOLÉ » et pas une
 * dimension : le projet ne contient aucune mesure de chambre, et une cote
 * inventée sur un plan est un mensonge qui a l'air d'une preuve.
 *
 * ─── LE CODE COULEUR VIENT DU MÉTIER ─────────────────────────────────────
 *   cyan   le fluide et l'air froid — le seul cyan de la planche
 *   rouge  la chaleur rejetée par le groupe, et RIEN D'AUTRE sur la page
 *   blanc  le bâti, les arêtes, les attaches
 *
 * ─── ANIMATION ───────────────────────────────────────────────────────────
 * Deux mouvements, tous deux explicatifs : un segment parcourt la liaison
 * frigorifique (le fluide circule) et les arcs d'air soufflé dérivent.
 * Animations CSS, donc coupées par le bloc `prefers-reduced-motion` de
 * `globals.css`.
 */

const K = 56;
const OX = 470;
const OY = 280;

type P = [number, number];

/** Projection isométrique. Une seule porte d'entrée pour toute la planche. */
function iso(x: number, y: number, z: number): P {
  return [OX + (x - y) * K * 0.866, OY + (x + y) * K * 0.5 - z * K];
}

const d = (pts: P[], ferme = true) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') +
  (ferme ? ' Z' : '');

/** Un pavé droit, rendu en trois faces visibles. */
function pave(x: number, y: number, z: number, lx: number, ly: number, lz: number) {
  const A = iso(x, y, z + lz);
  const B = iso(x + lx, y, z + lz);
  const C = iso(x + lx, y + ly, z + lz);
  const D = iso(x, y + ly, z + lz);
  const b = iso(x + lx, y, z);
  const c = iso(x + lx, y + ly, z);
  const dd = iso(x, y + ly, z);
  return {
    dessus: d([A, B, C, D]),
    gauche: d([D, C, c, dd]),
    droite: d([B, C, c, b]),
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   LA PLANCHE COMPACTE — géométrie propre au téléphone
   ───────────────────────────────────────────────────────────────────────
   Ce n'est PAS la planche large réduite. La planche large mesure 1075 × 780
   unités : ramenée à 335 px, elle rend 243 px de haut et ses arêtes se
   confondent. Le rapport de forme d'une axonométrie étalée est une
   fatalité, pas un réglage.

   Trois décisions distinguent cette version, et chacune gagne de la hauteur
   en rendant le dessin plus lisible, pas moins :

     le panneau de façade n'est plus éclaté — c'est lui qui étalait le
       dessin de 1,5 unité vers la gauche, pour une information que la
       légende HTML porte déjà ;
     le groupe est ramené contre le volume au lieu d'être rejeté à trois
       unités ;
     les sous-détails disparaissent — ailettes, ligne de cote, arêtes
       cachées, étiquettes — et les traits restants épaississent.

   Reste l'essentiel, aux mêmes places : le volume, le plafond déposé,
   l'évaporateur, l'air soufflé, le groupe, la liaison, la chaleur rejetée.
   Traits × 1,8, moitié moins d'objets à l'écran : 272 px de haut à 375 px
   au lieu des 243 que rendait la planche large réduite.

   La fenêtre a été élargie à droite (332 → 359 unités) après mesure : les
   trois flèches de chaleur rejetée sortaient du cadre de 19 px à 375 px et
   de 40 px à 768 px. Elles étaient coupées, pas absentes — le genre de
   défaut qu'un coup d'œil ne rattrape pas et qu'une mesure de boîte
   englobante donne au dixième. Aucune coordonnée du dessin n'a bougé ;
   seul le cadrage a changé, d'où les 294 px devenus 272.
   ═══════════════════════════════════════════════════════════════════════ */

const Kc = 34;
const OXc = 150;
const OYc = 250;

function isoC(x: number, y: number, z: number): P {
  return [OXc + (x - y) * Kc * 0.866, OYc + (x + y) * Kc * 0.5 - z * Kc];
}

function paveC(x: number, y: number, z: number, lx: number, ly: number, lz: number) {
  const A = isoC(x, y, z + lz);
  const B = isoC(x + lx, y, z + lz);
  const C = isoC(x + lx, y + ly, z + lz);
  const D = isoC(x, y + ly, z + lz);
  const b = isoC(x + lx, y, z);
  const c = isoC(x + lx, y + ly, z);
  const dd = isoC(x, y + ly, z);
  return { dessus: d([A, B, C, D]), gauche: d([D, C, c, dd]), droite: d([B, C, c, b]) };
}

function CoupeCompacte() {
  const k = 1.8;
  const evap = paveC(1.3, 1.0, 2.05, 1.7, 1.0, 0.5);
  const evapAncre = isoC(2.15, 1.5, 2.3);
  const grp = paveC(5.0, -1.2, 0.2, 1.5, 1.2, 1.3);
  const grpFace = isoC(5.75, -1.2, 0.85);

  const liaison = d(
    [isoC(5.75, -0.6, 0.85), isoC(4.7, -0.6, 0.85), isoC(4.7, 1.5, 2.3), evapAncre],
    false,
  );

  const souffle = [0, 1, 2].map((i) => {
    const a = isoC(1.3, 1.15 + i * 0.28, 2.08 - i * 0.05);
    const c = isoC(0.3, 2.5 + i * 0.22, 0.9 - i * 0.16);
    const m = isoC(0.7, 1.8 + i * 0.3, 1.6 - i * 0.2);
    return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  });

  return (
    <>
      {/* Le volume, le plafond déposé et ses lignes de montage */}
      <path d={d([isoC(0, 0, 0), isoC(4.5, 0, 0), isoC(4.5, 3, 0), isoC(0, 3, 0)])} stroke="currentColor" strokeWidth={1.1 * k} opacity={0.4} />
      <path d={d([isoC(0, 3, 0), isoC(4.5, 3, 0), isoC(4.5, 3, 2.8), isoC(0, 3, 2.8)])} stroke="currentColor" strokeWidth={1.3 * k} opacity={0.8} />
      <path d={d([isoC(4.5, 0, 0), isoC(4.5, 3, 0), isoC(4.5, 3, 2.8), isoC(4.5, 0, 2.8)])} stroke="currentColor" strokeWidth={1.3 * k} opacity={0.62} />
      <path d={d([isoC(0, 0, 2.8), isoC(4.5, 0, 2.8), isoC(4.5, 3, 2.8), isoC(0, 3, 2.8)])} stroke="currentColor" strokeWidth={1 * k} opacity={0.34} />
      <path d={d([isoC(0, 0, 4.2), isoC(4.5, 0, 4.2), isoC(4.5, 3, 4.2), isoC(0, 3, 4.2)])} stroke="currentColor" strokeWidth={1.4 * k} opacity={0.95} />
      {[[0, 0], [4.5, 0], [4.5, 3], [0, 3]].map(([x, y]) => (
        <path key={`${x}-${y}`} d={d([isoC(x, y, 4.2), isoC(x, y, 2.8)], false)} stroke="currentColor" strokeWidth={0.9 * k} strokeDasharray="4 7" opacity={0.5} />
      ))}

      {/* L'air soufflé */}
      {souffle.map((t, i) => (
        <path key={i} d={t} stroke="var(--color-brand)" strokeWidth={1.9 * k} strokeDasharray="13 11" className="tfc-flux" style={{ animationDelay: `${i * 1.1}s` }} />
      ))}

      {/* L'évaporateur */}
      <path d={evap.dessus} stroke="currentColor" strokeWidth={1.3 * k} />
      <path d={evap.gauche} stroke="currentColor" strokeWidth={1.3 * k} />
      <path d={evap.droite} stroke="currentColor" strokeWidth={1.3 * k} />

      {/* La liaison, et le fluide qui la parcourt */}
      <path d={liaison} stroke="var(--color-brand)" strokeWidth={1.4 * k} opacity={0.5} />
      <path d={liaison} stroke="var(--color-brand)" strokeWidth={2.4 * k} strokeDasharray="20 420" className="tfc-circule" />

      {/* Le groupe et sa chaleur rejetée */}
      <path d={grp.dessus} stroke="currentColor" strokeWidth={1.3 * k} />
      <path d={grp.gauche} stroke="currentColor" strokeWidth={1.3 * k} />
      <path d={grp.droite} stroke="currentColor" strokeWidth={1.3 * k} />
      <g transform={`translate(${grpFace[0].toFixed(1)} ${grpFace[1].toFixed(1)})`}>
        <ellipse rx={19} ry={22} stroke="currentColor" strokeWidth={1.1 * k} opacity={0.8} />
        <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
          {[0, 120, 240].map((a) => (
            <path key={a} d="M0 0 C5 -6 7 -13 2.5 -17 C-2.5 -13 -4 -6 0 0 Z" transform={`rotate(${a})`} stroke="currentColor" strokeWidth={1 * k} opacity={0.75} />
          ))}
        </g>
      </g>
      {[0, 1, 2].map((i) => {
        const a = isoC(6.6, -1.1 + i * 0.5, 0.7 + i * 0.32);
        const b2 = isoC(7.5, -1.1 + i * 0.5, 1.0 + i * 0.32);
        return <path key={i} d={d([a, b2], false)} stroke="var(--color-alert)" strokeWidth={1.5 * k} opacity={0.85} markerEnd="url(#tfc-fl-chaud-c)" />;
      })}
    </>
  );
}

function CoupeLarge({ className }: { className: string }) {
  const sol = [iso(0, 0, 0), iso(6, 0, 0), iso(6, 4, 0), iso(0, 4, 0)];
  const haut = [iso(0, 0, 3), iso(6, 0, 3), iso(6, 4, 3), iso(0, 4, 3)];
  const plafond = [iso(0, 0, 4.6), iso(6, 0, 4.6), iso(6, 4, 4.6), iso(0, 4, 4.6)];
  const facade = [iso(0, -1.5, 0), iso(6, -1.5, 0), iso(6, -1.5, 3), iso(0, -1.5, 3)];
  const porte = [iso(3.4, -1.5, 0), iso(5.2, -1.5, 0), iso(5.2, -1.5, 2.1), iso(3.4, -1.5, 2.1)];

  const evap = pave(2.1, 1.4, 2.25, 1.8, 1.1, 0.55);
  const evapAncre = iso(3, 1.95, 2.55);

  const grp = pave(7.9, -2.7, 0.25, 2.0, 1.5, 1.6);
  const grpAncre = iso(8.9, -1.95, 1.85);
  const grpFace = iso(8.9, -2.7, 1.05);

  const liaison = d(
    [iso(8.9, -1.95, 1.05), iso(6.6, -1.2, 1.05), iso(6.6, 1.95, 2.55), evapAncre],
    false,
  );
  const liaisonRetour = d(
    [iso(8.9, -1.75, 0.9), iso(6.35, -1.0, 0.9), iso(6.35, 2.15, 2.4), iso(3, 2.15, 2.4)],
    false,
  );

  const souffle = [0, 1, 2].map((i) => {
    const a = iso(2.05, 1.6 + i * 0.3, 2.28 - i * 0.05);
    const b = iso(0.9, 2.1 + i * 0.35, 1.75 - i * 0.2);
    const c = iso(0.55, 3.3 + i * 0.25, 0.95 - i * 0.18);
    return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${b[0].toFixed(1)} ${b[1].toFixed(
      1,
    )} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  });

  const rejet = [0, 1, 2].map((i) => {
    const a = iso(9.95, -2.5 + i * 0.55, 0.8 + i * 0.38);
    const b = iso(11.1, -2.5 + i * 0.55, 1.2 + i * 0.38);
    return d([a, b], false);
  });

  /**
   * Une étiquette de plan : le texte, sa ligne d'attache horizontale, puis
   * l'oblique qui rejoint la pièce. `fin` dit de quel côté part l'oblique.
   */
  const annot = (x: number, y: number, w: number, cible: P, texte: string, fin: 1 | -1 = 1) => {
    const bout: P = [x + (fin === 1 ? w : -w), y + 9];
    return (
      <g key={texte} className="hidden lg:block">
        <text
          x={x}
          y={y}
          textAnchor={fin === 1 ? 'start' : 'end'}
          fontSize={15}
          letterSpacing={1.1}
          fill="currentColor"
          stroke="none"
          opacity={0.8}
          className="font-[family-name:var(--font-sans)]"
        >
          {texte}
        </text>
        <path
          d={d([[x, y + 9], bout, cible], false)}
          stroke="currentColor"
          strokeWidth={0.9}
          opacity={0.45}
          fill="none"
        />
        <circle cx={cible[0]} cy={cible[1]} r={2.8} fill="currentColor" opacity={0.8} stroke="none" />
      </g>
    );
  };

  // Ligne de cote sous le volume — sans dimension chiffrée.
  const coteA = iso(0, 4, 0);
  const coteB = iso(6, 4, 0);
  const coteY = Math.max(coteA[1], coteB[1]) + 56;

  return (
    <svg
      viewBox="150 -95 1075 780"
      aria-hidden
      focusable="false"
      className={`hidden w-full text-white lg:block ${className}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <marker
          id="tfc-fl-froid"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--color-brand)" strokeWidth="1.6" />
        </marker>
        <marker
          id="tfc-fl-chaud"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--color-alert)" strokeWidth="1.6" />
        </marker>
      </defs>

      {/* ── Le sol et les arêtes cachées ── */}
      <path d={d(sol)} stroke="currentColor" strokeWidth={1.1} opacity={0.34} />
      <path
        d={`${d([iso(0, 0, 0), iso(0, 0, 3)], false)} ${d([iso(0, 0, 3), iso(6, 0, 3)], false)} ${d(
          [iso(0, 0, 3), iso(0, 4, 3)],
          false,
        )}`}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="4 5"
        opacity={0.3}
      />

      {/* ── Les parois ── */}
      <path
        d={d([iso(0, 4, 0), iso(6, 4, 0), iso(6, 4, 3), iso(0, 4, 3)])}
        stroke="currentColor"
        strokeWidth={1.3}
        opacity={0.72}
      />
      <path
        d={d([iso(6, 0, 0), iso(6, 4, 0), iso(6, 4, 3), iso(6, 0, 3)])}
        stroke="currentColor"
        strokeWidth={1.3}
        opacity={0.58}
      />
      <path d={d(haut)} stroke="currentColor" strokeWidth={1} opacity={0.32} />

      {/* ── Le plafond éclaté ── */}
      <path d={d(plafond)} stroke="currentColor" strokeWidth={1.5} opacity={0.95} />
      {[
        [iso(0, 0, 4.6), iso(0, 0, 3)],
        [iso(6, 0, 4.6), iso(6, 0, 3)],
        [iso(6, 4, 4.6), iso(6, 4, 3)],
        [iso(0, 4, 4.6), iso(0, 4, 3)],
      ].map((seg, i) => (
        <path
          key={i}
          d={d(seg as P[], false)}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="3 6"
          opacity={0.55}
        />
      ))}

      {/* ── Le panneau de façade éclaté, et sa porte ── */}
      <path d={d(facade)} stroke="currentColor" strokeWidth={1.5} opacity={0.95} />
      <path d={d(porte)} stroke="currentColor" strokeWidth={1.2} opacity={0.7} />
      <path
        d={d([iso(3.62, -1.5, 1.0), iso(3.62, -1.5, 1.35)], false)}
        stroke="currentColor"
        strokeWidth={2.4}
        opacity={0.85}
      />
      {[
        [iso(0, -1.5, 0), iso(0, 0, 0)],
        [iso(6, -1.5, 0), iso(6, 0, 0)],
        [iso(6, -1.5, 3), iso(6, 0, 3)],
      ].map((seg, i) => (
        <path
          key={i}
          d={d(seg as P[], false)}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="3 6"
          opacity={0.55}
        />
      ))}

      {/* ── L'air soufflé ── */}
      {souffle.map((p, i) => (
        <path
          key={i}
          d={p}
          stroke="var(--color-brand)"
          strokeWidth={2.1}
          strokeDasharray="14 12"
          markerEnd="url(#tfc-fl-froid)"
          className="tfc-flux"
          style={{ animationDelay: `${i * 1.1}s` }}
        />
      ))}

      {/* ── L'évaporateur ── */}
      <path d={evap.dessus} stroke="currentColor" strokeWidth={1.4} />
      <path d={evap.gauche} stroke="currentColor" strokeWidth={1.4} />
      <path d={evap.droite} stroke="currentColor" strokeWidth={1.4} />
      {Array.from({ length: 7 }, (_, i) => {
        const t = 1.45 + i * 0.145;
        return (
          <path
            key={i}
            d={d([iso(2.25, t, 2.25), iso(3.75, t, 2.25)], false)}
            stroke="currentColor"
            strokeWidth={0.9}
            opacity={0.6}
          />
        );
      })}

      {/* ── La liaison frigorifique ── */}
      <path d={liaisonRetour} stroke="currentColor" strokeWidth={1.1} opacity={0.45} />
      <path d={liaison} stroke="var(--color-brand)" strokeWidth={1.5} opacity={0.5} />
      <path
        d={liaison}
        stroke="var(--color-brand)"
        strokeWidth={2.8}
        strokeDasharray="26 620"
        className="tfc-circule"
      />

      {/* ── Le groupe ── */}
      <path d={grp.dessus} stroke="currentColor" strokeWidth={1.4} />
      <path d={grp.gauche} stroke="currentColor" strokeWidth={1.4} />
      <path d={grp.droite} stroke="currentColor" strokeWidth={1.4} />
      <g transform={`translate(${grpFace[0].toFixed(1)} ${grpFace[1].toFixed(1)})`}>
        <ellipse rx={30} ry={35} stroke="currentColor" strokeWidth={1.3} opacity={0.8} />
        <ellipse rx={20} ry={23} stroke="currentColor" strokeWidth={0.9} opacity={0.5} />
        {/* `transformBox` en style local : la classe `.tfc-helice` est
            partagée avec d'autres planches, et `globals.css` ne doit pas
            bouger. Sans lui, `transform-origin: center` se résout au centre
            de la FENÊTRE du dessin et les pales tournent en orbite autour du
            volume au lieu de tourner sur leur axe. */}
        <g className="tfc-helice" style={{ transformBox: 'fill-box' }}>
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              d="M0 0 C8 -9 11 -20 4 -27 C-4 -21 -6 -10 0 0 Z"
              transform={`rotate(${a})`}
              stroke="currentColor"
              strokeWidth={1.1}
              opacity={0.75}
            />
          ))}
        </g>
      </g>
      {rejet.map((p, i) => (
        <path
          key={i}
          d={p}
          stroke="var(--color-alert)"
          strokeWidth={1.6}
          opacity={0.85}
          markerEnd="url(#tfc-fl-chaud)"
        />
      ))}

      {/* ── La ligne de cote ── */}
      <g opacity={0.4}>
        <path
          d={d(
            [
              [coteA[0], coteA[1] + 10],
              [coteA[0], coteY + 6],
            ],
            false,
          )}
          stroke="currentColor"
          strokeWidth={0.8}
          strokeDasharray="3 5"
        />
        <path
          d={d(
            [
              [coteB[0], coteB[1] + 10],
              [coteB[0], coteY + 6],
            ],
            false,
          )}
          stroke="currentColor"
          strokeWidth={0.8}
          strokeDasharray="3 5"
        />
        <path
          d={d(
            [
              [coteA[0], coteY],
              [coteB[0], coteY],
            ],
            false,
          )}
          stroke="currentColor"
          strokeWidth={0.9}
        />
        {[coteA[0], coteB[0]].map((x) => (
          <path
            key={x}
            d={d(
              [
                [x, coteY - 5],
                [x, coteY + 5],
              ],
              false,
            )}
            stroke="currentColor"
            strokeWidth={1.4}
          />
        ))}
      </g>
      <text
        x={(coteA[0] + coteB[0]) / 2}
        y={coteY - 12}
        textAnchor="middle"
        fontSize={14}
        letterSpacing={1.2}
        fill="currentColor"
        stroke="none"
        opacity={0.55}
        className="hidden font-[family-name:var(--font-sans)] lg:block"
      >
        VOLUME ISOLÉ
      </text>

      {/* ── Les étiquettes de plan ── */}
      {annot(300, -62, 120, iso(1.2, -1.5, 3), 'PANNEAU SANDWICH')}
      {annot(1120, -62, 150, iso(5.2, 0, 4.6), 'PLAFOND DÉPOSÉ', -1)}
      {annot(196, 186, 104, iso(2.2, 1.5, 2.8), 'ÉVAPORATEUR')}
      {annot(172, 404, 96, [402, 332], 'AIR SOUFFLÉ')}
      {annot(1185, 186, 140, iso(6.5, 0.4, 1.9), 'LIAISON FRIGORIFIQUE', -1)}
      {annot(1180, 566, 130, grpAncre, 'GROUPE DE CONDENSATION', -1)}
      {annot(1190, 300, 96, iso(10.6, -1.95, 1.12), 'CHALEUR REJETÉE', -1)}
      {annot(690, 628, 118, iso(4.3, -1.5, 0.9), 'PORTE ISOTHERME')}
    </svg>
  );
}

/**
 * Le composant exporté : deux planches, deux fenêtres, un seul jeu de
 * conventions. Au-dessus de 1024 px la planche large et ses huit étiquettes ;
 * en dessous, la planche compacte, sans aucun texte — la légende HTML de la
 * page prend le relais.
 */
export function CoupeChambreFroide({ className = '' }: { className?: string }) {
  return (
    <>
      <CoupeLarge className={className} />
      <svg
        viewBox="55 97 359 291"
        aria-hidden
        focusable="false"
        className={`w-full text-white lg:hidden ${className}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <marker
            id="tfc-fl-chaud-c"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--color-alert)" strokeWidth="1.6" />
          </marker>
        </defs>
        <CoupeCompacte />
      </svg>
    </>
  );
}
