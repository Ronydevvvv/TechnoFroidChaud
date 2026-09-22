'use client';

import { useId, useState } from 'react';

/**
 * Accordéon.
 *
 * ─── TOUT EST FERMÉ AU CHARGEMENT ────────────────────────────────────────
 * L'état initial était `0`, donc la première question s'ouvrait toute
 * seule. Une réponse déjà dépliée fausse la lecture de la liste : on croit
 * que c'est la plus importante, alors qu'elle n'est que la première. La
 * page arrive maintenant avec les questions fermées, et rien ne s'ouvre
 * sans un clic.
 *
 * ─── POURQUOI `inert` ET NON `hidden` ────────────────────────────────────
 * `hidden` pose `display:none` à l'instant où le panneau se referme : la
 * transition de hauteur n'a jamais le temps de jouer, la fermeture est donc
 * sèche alors que l'ouverture est fluide. Personne ne le remarque
 * consciemment, tout le monde le sent.
 *
 * `inert` règle les deux problèmes à la fois : il sort le panneau replié de
 * l'ordre de tabulation ET de l'arbre d'accessibilité, sans toucher au
 * `display` — la transition continue donc de jouer dans les deux sens.
 *
 * ─── LA LIGNE ENTIÈRE EST LA CIBLE ───────────────────────────────────────
 * Le bouton occupait déjà toute la largeur, mais rien ne le disait : aucun
 * retour visuel avant le clic, donc l'impression que seul le texte réagit.
 * Un fond très faible au survol et au focus rend la zone lisible, et les
 * 24 px de padding vertical donnent une cible tactile de 60 px de haut.
 *
 * Le débord de 8 px (`-mx-2 px-2`) fait mordre ce fond LÉGÈREMENT au-delà
 * du texte, sans décaler le texte lui-même : les questions restent alignées
 * sur la grille de la page.
 *
 * ─── ANIMATION ───────────────────────────────────────────────────────────
 * La hauteur est animée par `grid-template-rows: 0fr → 1fr`, qui anime une
 * hauteur automatique sans mesure JavaScript ni saut de mise en page. Le
 * texte suit en opacité, légèrement décalé, pour qu'il ne se traîne pas
 * pendant que la boîte s'ouvre. Le « + » pivote de 45° : il ne change
 * jamais de glyphe, donc rien ne saute au moment de la bascule.
 *
 * Tout passe par des transitions CSS, que le bloc `prefers-reduced-motion`
 * de `globals.css` neutralise déjà — il n'y a rien à ajouter ici.
 */

type Item = { q: string; a: string };

export function Accordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;

        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group -mx-2 flex w-[calc(100%+1rem)] cursor-pointer items-start justify-between gap-8 px-2 py-6 text-left transition-colors duration-300 hover:bg-ink/[0.035] focus-visible:bg-ink/[0.035]"
              >
                <span className="heading text-[1.08rem] text-ink transition-colors duration-300 group-hover:text-brand">
                  {item.q}
                </span>

                <span
                  aria-hidden
                  className={`relative mt-1.5 block size-3 shrink-0 text-slate transition-[transform,color] duration-500 group-hover:text-brand ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-2xl pb-7 text-[0.98rem] leading-8 text-slate transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 delay-150' : 'opacity-0'
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
