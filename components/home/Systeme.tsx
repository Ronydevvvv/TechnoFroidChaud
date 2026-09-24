import { Reveal } from '@/components/ui/Reveal';
import { SystemeThermique, FROIDS } from '@/components/thermo/SystemeThermique';

/**
 * Froid et chaleur — la planche d'accueil.
 *
 * ─── POURQUOI ELLE EXISTE ────────────────────────────────────────────────
 * L'accueil énumérait les métiers. Il ne montrait pas ce qui les relie —
 * que les cinq spécialités sont cinq endroits d'un même bâtiment, et un
 * seul raisonnement. Cette section le montre avant que la page ne se mette
 * à l'expliquer : « Nos métiers » arrive juste après, et n'a plus à porter
 * seul la démonstration.
 *
 * ─── CE QU'ELLE N'EST PAS ────────────────────────────────────────────────
 * Pas une grille de quatre cartes, pas une illustration posée à côté d'un
 * paragraphe, pas une série d'icônes. Le dessin EST la section : il prend
 * la largeur, le texte se tient au-dessus en trois lignes, et rien n'est
 * ajouté dessous.
 *
 * ─── LE TEXTE EST COURT PARCE QUE LE DESSIN PARLE ────────────────────────
 * Deux phrases. La première nomme le principe commun, la seconde dit que
 * c'est le même geste. Tout le reste — les cinq systèmes, les trois
 * consignes, les fluides, la chaleur rejetée — est dans la planche. C'est
 * exactement le cas où un schéma remplace une explication.
 *
 * Aucune donnée n'est avancée ici : les trois températures affichées dans
 * la coupe sont celles du registre de `/refrigeration`, au mot près.
 */

export function Systeme() {
  /* ─── L'OUVERTURE DE SECTION, ET POURQUOI 24 px ───
     Cette section suit la bande des repères. Entre le bas de l'encre de la
     bande et le haut de la capitale de « Froid », l'inventaire complet du
     blanc tient en cinq postes, et un seul est réglable :
         1 px   descente de fonte de la légende
        24 px   `padding-bottom` de la bande      (elle, on n'y touche pas)
         1 px   `border-top` de cette section
        XX px   `padding-top` de cette section    ← le seul levier
         2 px   blanc de fonte au-dessus de la capitale
     Rien d'autre : pas de `min-height`, pas de marge de `Reveal`, pas de
     padding de conteneur, pas de `margin-top` sur le titre. Le `gap` de la
     rangée ne joue qu'en colonne, donc sous 1024 px.

     `leading-[1.02]` est ce qui rend le réglage aussi direct : un titre
     d'affiche à interligne serré n'apporte que 2 px de blanc interne. Tout
     l'écart est donc dans le padding, et s'y lit au pixel.

     À 72 px, le blanc atteignait 94 px, que rien — ni filet, ni fond — ne
     permettait d'attribuer à l'une ou l'autre section. 24 px le ramène à
     46 px, et pose le filet au milieu d'un couloir symétrique : 24 px
     au-dessus, 24 px en dessous.

     C'est le minimum défendable, et c'est volontaire. Le hero occupe tout
     le premier écran : la bande se pose donc au ras du pli, et ce qui suit
     décide si l'écran se termine sur une page ou sur du papier. Chaque
     pixel rendu ici rapproche le titre du pli.

     Le bas de section garde ses 96 px : il débouche sur l'acier des
     métiers, et un changement de surface rend la marge attribuable. C'est
     toute la différence, à valeur égale, entre une respiration et un trou. */
  return (
    <section aria-labelledby="systeme-titre" className="border-y border-line bg-white py-14 sm:py-16 lg:pt-6 lg:pb-24">
      <div className="container-t">
        <Reveal>
          <div className="flex flex-col gap-x-16 gap-y-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="systeme-titre"
              className="heading max-w-[13ch] text-[clamp(2.1rem,5vw,3.9rem)] leading-[1.02] text-ink"
            >
              Froid et chaleur, le même raisonnement
            </h2>
            <p className="max-w-[44ch] text-[0.98rem] leading-8 text-slate lg:pb-2">
              Déplacer de l’énergie d’un endroit à un autre. C’est la même
              physique qui tient une chambre à −22 °C et qui chauffe un
              logement — seuls changent le matériel et les contraintes.
            </p>
          </div>
        </Reveal>

        {/* ─── `lg:mt-8`, ET POURQUOI C'ÉTAIT ICI LE VRAI TROU ───
            Un scan de pixels de la production — les rangées entièrement
            blanches sur toute la largeur du conteneur — a classé les vides
            de la zone par hauteur. Le plus grand n'était pas la transition
            depuis la bande (50 px), mais celui-ci : 73 px entre le bas du
            bloc titre et le cartouche, dus aux 64 px de `lg:mt-16`.

            C'est logique une fois vu. Ce qui fait exister cette section aux
            yeux du lecteur, c'est le DESSIN, pas le titre : tant que la
            planche n'est pas apparue, il lit encore « la section n'a pas
            commencé ». Le blanc placé juste avant elle est donc le seul de
            la page qui se lise comme une attente.

            32 px le ramène à 41 px, au niveau des deux autres intervalles
            de la zone. Mobile inchangé : `mt-11` tient. */}
        <Reveal as="figure" className="m-0 mt-11 lg:mt-8" delay={0.06}>
          {/* Le cartouche, même convention que les autres planches du site :
              désignation à gauche, code couleur à droite. */}
          <div className="flex flex-col gap-y-3 border-t-2 border-ink pt-4 text-[0.8rem] tracking-[0.08em] text-slate uppercase sm:flex-row sm:text-[0.74rem] sm:items-baseline sm:justify-between">
            <span className="text-ink">Bâtiment équipé — coupe de principe</span>
            {/* Le code couleur a quitté cette ligne : il est porté par l'axe,
                juste dessous, qui le dit mieux — non plus « cyan = froid »
                mais « le cyan DEVIENT le rouge ». Le laisser ici en plus
                aurait écrit « chaleur » deux fois en cinquante pixels.

                « Axe non gradué » et non « sans échelle de température » :
                la coupe AFFICHE des températures, celles des trois
                enceintes. C'est l'axe qui ne porte aucune valeur, et la
                mention doit dire cela exactement — c'est la formule déjà
                employée sur les autres planches du site. */}
            <span>Axe non gradué</span>
          </div>

          {/* ─── L'AXE DE LA SECTION ───
              Le cartouche annonçait le froid et la chaleur par deux tirets
              de six pixels. C'est le code couleur d'une légende — ça dit
              « cyan = froid », ça ne dit pas que l'un DEVIENT l'autre.

              Or c'est exactement la phrase du titre : « Froid et chaleur,
              le même raisonnement ». L'axe la dessine — un trait gradué qui
              part du cyan, passe par le neutre, arrive au rouge, juste
              au-dessus de la coupe qui montre comment.

              Aucune valeur, aucune unité, aucune graduation chiffrée : la
              même convention que partout ailleurs sur le site. On dessine
              ce qu'on sait, on annonce ce qu'on ne sait pas. */}
          <div aria-hidden className="mt-7 lg:mt-9">
            <div className="h-1.5 w-full bg-[repeating-linear-gradient(to_right,var(--color-line)_0_1px,transparent_1px_16px)]" />
            <div className="-mt-px h-[2px] w-full bg-[linear-gradient(to_right,var(--color-brand)_0%,var(--color-slate)_48%,var(--color-alert)_100%)]" />
            {/* Les intitulés sont ceux de l'ancien code couleur, au mot
                près : le cyan de la coupe est bien « fluide et air froids »,
                pas « froid » en général. On ne perd donc rien de ce que la
                légende disait — on le dit sur un axe au lieu d'une liste. */}
            <div className="mt-2.5 flex items-baseline justify-between gap-4 text-[0.72rem] tracking-[0.14em] uppercase">
              <span className="text-brand">Fluide et air froids</span>
              <span className="hidden text-slate/70 sm:inline">Transfert</span>
              <span className="text-alert">Chaleur</span>
            </div>
          </div>

          <div className="mt-8 lg:mt-12">
            <SystemeThermique />
          </div>

          {/* ─── LA LÉGENDE MOBILE ───
              Sous 1024 px, la coupe ne porte aucun texte : à cette largeur,
              un intitulé dans le dessin ferait cinq pixels de haut. Les cinq
              systèmes et les trois consignes sortent donc du SVG et passent
              en HTML, où ils gardent le corps du reste du site — et où les
              températures deviennent l'élément le plus grand de l'écran.
              C'est la hiérarchie inverse du bureau, et c'est la bonne : sur
              un téléphone, le chiffre porte plus loin que le dessin. */}
          <div className="lg:hidden">
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-line pt-5 text-[0.86rem] tracking-[0.05em] text-slate uppercase">
              {['Pompe à chaleur', 'Climatisation', 'Réfrigération', 'Chambres froides', 'Chauffage'].map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>

            <dl className="mt-6 grid gap-y-5 border-t border-line pt-6">
              {FROIDS.map((f) => (
                <div key={f.temp} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.84rem] tracking-[0.07em] text-slate uppercase">{f.nom}</dt>
                  <dd className="heading text-[clamp(1.35rem,5.6vw,1.9rem)] leading-none whitespace-nowrap text-brand tabular-nums">
                    {f.temp}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
