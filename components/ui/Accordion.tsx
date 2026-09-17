'use client';

import { useId, useState } from 'react';

/**
 * Accordéon.
 *
 * Un seul ouvert à la fois. La hauteur est animée par
 * `grid-template-rows: 0fr → 1fr`, qui anime une hauteur automatique sans
 * mesure JavaScript ni saut de mise en page.
 *
 * Le signe « + » est composé de deux filets et pivote de 45° : il ne change
 * jamais de glyphe, donc rien ne saute au moment de la bascule.
 */

type Item = { q: string; a: string };

export function Accordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
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
                className="group flex w-full cursor-pointer items-start justify-between gap-8 py-6 text-left"
              >
                <span className="heading text-[1.08rem] text-ink transition-colors group-hover:text-brand">
                  {item.q}
                </span>

                <span
                  aria-hidden
                  className={`relative mt-1.5 block size-3 shrink-0 transition-transform duration-500 ${
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
              hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-[0.98rem] leading-8 text-slate">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
