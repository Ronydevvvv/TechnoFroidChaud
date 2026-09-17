import type { ReactNode } from 'react';
import { Breadcrumb, type Crumb } from '@/components/layout/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Gabarit des pages légales.
 *
 * Une colonne, mesure de lecture stricte, aucune fioriture. Ce sont des
 * pages qu'on lit rarement mais qui doivent être claires quand on les lit —
 * et le soin qu'on y met se remarque précisément parce que personne n'en
 * met.
 */

export function LegalPage({
  title,
  trail,
  updated,
  children,
}: {
  title: string;
  trail: Crumb[];
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line bg-stone">
        <div className="container-t pt-28 pb-14 lg:pt-36 lg:pb-16">
          <Reveal>
            <Breadcrumb trail={trail} />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="heading t-h2 mt-8 max-w-[18ch] text-ink">{title}</h1>
            <p className="label mt-4 text-slate">Dernière mise à jour — {updated}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-white py-20 lg:py-24">
        <div className="container-t">
          <Reveal>
            <div className="max-w-2xl [&_h2]:mt-12 [&_h2]:mb-3 [&_h2:first-of-type]:mt-0 [&_p]:mb-5 [&_p]:text-[0.965rem] [&_p]:leading-8 [&_p]:text-slate [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-brand">
              {children}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
