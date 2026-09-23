/**
 * L'axe thermique — la signature graphique de la page contact.
 *
 * ─── CE QU'IL DIT ────────────────────────────────────────────────────────
 * Un seul trait, gradué, qui va du FROID au CHAUD. À gauche le cyan, à
 * droite le rouge, et au milieu le passage de l'un à l'autre. C'est tout le
 * métier de l'entreprise ramené à une ligne : déplacer de l'énergie d'un
 * bout à l'autre de cet axe.
 *
 * Les trois métiers s'y accrochent à leur place réelle sur l'échelle —
 * réfrigération au froid, climatisation au milieu, chauffage au chaud. Ce
 * n'est pas un alignement décoratif : c'est leur position thermique.
 *
 * ─── POURQUOI UN SEUL DISPOSITIF, ET PAS DEUX ────────────────────────────
 * Le brief proposait aussi un schéma « local → installation → technicien »
 * entre les deux colonnes. Deux axes horizontaux gradués sur la même page,
 * à deux écrans d'intervalle, se seraient répétés sans rien ajouter : le
 * second aurait affaibli le premier. Un seul, bien placé, porte la page.
 *
 * ─── AUCUNE VALEUR ───────────────────────────────────────────────────────
 * Les graduations ne portent AUCUN chiffre, et n'en porteront pas. Une
 * échelle de température chiffrée ici supposerait des consignes que le
 * contenu ne donne pas pour ces trois métiers pris ensemble. C'est la même
 * convention que partout ailleurs sur le site : « axe non gradué »,
 * « cadrans de principe », « sans échelle géographique ». On dessine ce
 * qu'on sait, on annonce ce qu'on ne sait pas.
 *
 * ─── DEUX COMPOSITIONS ───────────────────────────────────────────────────
 *   LARGE    l'axe couché, les trois métiers répartis dessus.
 *   ÉTROIT   l'axe DEBOUT, à gauche, les trois métiers empilés à sa droite.
 *            Un axe couché de 900 unités ramené à 375 px rendrait ses
 *            intitulés illisibles ; debout, il garde le corps du site.
 */

/** Les trois métiers, à leur place sur l'échelle. 0 = froid, 1 = chaud. */
const REPERES = [
  { nom: 'Réfrigération', t: 0.1 },
  { nom: 'Climatisation', t: 0.42 },
  { nom: 'Chauffage', t: 0.86 },
] as const;

const X0 = 40;
const X1 = 860;
const Y = 46;
const x = (t: number) => X0 + t * (X1 - X0);

export function AxeThermique() {
  return (
    <>
      {/* ═══ L'AXE COUCHÉ — au-dessus de 768 px ═══ */}
      <svg
        viewBox="0 0 900 104"
        aria-hidden
        focusable="false"
        fill="none"
        strokeLinecap="round"
        className="hidden w-full text-ink sm:block"
      >
        <defs>
          {/* Le seul dégradé du site, et il porte une information : le
              passage du froid au chaud EST le sujet. Il court sur le trait
              seul — jamais sur un fond, jamais sur une surface. */}
          <linearGradient id="tfc-axe" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="46%" stopColor="var(--color-slate)" />
            <stop offset="100%" stopColor="var(--color-alert)" />
          </linearGradient>
        </defs>

        {/* Les graduations. Une tous les 1/40e, une plus longue tous les
            1/8e. Aucune ne porte de valeur. */}
        {Array.from({ length: 41 }, (_, i) => {
          const majeur = i % 5 === 0;
          const px = x(i / 40);
          return (
            <path
              key={i}
              d={`M${px.toFixed(1)} ${Y} L${px.toFixed(1)} ${Y + (majeur ? 10 : 5)}`}
              stroke="currentColor"
              strokeWidth={majeur ? 1 : 0.7}
              opacity={majeur ? 0.34 : 0.2}
            />
          );
        })}

        <path d={`M${X0} ${Y} L${X1} ${Y}`} stroke="url(#tfc-axe)" strokeWidth={2} />

        {/* Les extrémités, nommées */}
        <text x={X0} y={Y - 16} fontSize={13} letterSpacing={1.4} fill="var(--color-brand)" stroke="none" className="font-[family-name:var(--font-sans)]">FROID</text>
        <text x={X1} y={Y - 16} textAnchor="end" fontSize={13} letterSpacing={1.4} fill="var(--color-alert)" stroke="none" className="font-[family-name:var(--font-sans)]">CHALEUR</text>

        {/* Les trois métiers, accrochés à leur position thermique */}
        {REPERES.map((r) => {
          const px = x(r.t);
          return (
            <g key={r.nom}>
              <circle cx={px} cy={Y} r={3.4} fill="currentColor" opacity={0.8} />
              <path d={`M${px} ${Y + 12} L${px} ${Y + 26}`} stroke="currentColor" strokeWidth={0.9} opacity={0.3} />
              <text
                x={px}
                y={Y + 42}
                textAnchor="middle"
                fontSize={15}
                fill="currentColor"
                stroke="none"
                opacity={0.78}
                className="font-[family-name:var(--font-sans)]"
              >
                {r.nom}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ═══ L'AXE DEBOUT — en dessous de 768 px ═══
          Le dessin ne porte aucun texte : à 375 px un intitulé dans le SVG
          ferait six pixels de haut. Les trois métiers sortent donc en HTML,
          à droite de l'axe, où ils gardent le corps du site. C'est la même
          solution que la coupe de l'accueil et la ligne de vie du
          dépannage. */}
      <div className="flex gap-5 sm:hidden">
        <svg
          viewBox="0 0 24 260"
          aria-hidden
          focusable="false"
          fill="none"
          strokeLinecap="round"
          className="h-auto w-6 shrink-0 self-stretch text-ink"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="tfc-axe-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand)" />
              <stop offset="46%" stopColor="var(--color-slate)" />
              <stop offset="100%" stopColor="var(--color-alert)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 27 }, (_, i) => (
            <path
              key={i}
              d={`M12 ${10 + i * 9} L${i % 5 === 0 ? 22 : 18} ${10 + i * 9}`}
              stroke="currentColor"
              strokeWidth={i % 5 === 0 ? 1 : 0.7}
              opacity={i % 5 === 0 ? 0.34 : 0.2}
            />
          ))}
          <path d="M12 10 L12 244" stroke="url(#tfc-axe-v)" strokeWidth={2} />
        </svg>

        <ul className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <li className="text-[0.76rem] tracking-[0.12em] text-brand uppercase">Froid</li>
          {REPERES.map((r) => (
            <li key={r.nom} className="text-[1.02rem] text-ink">
              {r.nom}
            </li>
          ))}
          <li className="text-[0.76rem] tracking-[0.12em] text-alert uppercase">Chaleur</li>
        </ul>
      </div>
    </>
  );
}
