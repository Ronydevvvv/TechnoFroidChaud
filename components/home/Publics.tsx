import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Professionnels / Particuliers — à qui l'entreprise s'adresse.
 *
 * ─── CE QUI CLOCHAIT ─────────────────────────────────────────────────────
 * Entre « Nos métiers » et ses six photographies et « Nos installations » et
 * la sienne, cette section était la seule sans image. Elle se lisait donc
 * comme un creux : deux titres, deux paragraphes, deux listes de liens
 * composés en texte courant. De l'éditorial coincé entre deux sections
 * visuelles.
 *
 * Elle n'a pourtant pas besoin d'image : la question qu'elle pose — « est-ce
 * que ça me concerne ? » — se règle par le classement, pas par une
 * photographie de plus. Ce qui lui manquait, c'était d'être une INTERFACE
 * plutôt qu'un texte.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── CE QUI CHANGE ───────────────────────────────────────────────────────
 * 1. Un sur-titre marqué d'un filet d'accent nomme le public en clair —
 *    « Entreprises, commerces, restaurants » — là où « Professionnels »
 *    seul demandait au visiteur de se reconnaître dans une abstraction.
 * 2. Les prestations deviennent des LIGNES cliquables pleine largeur,
 *    séparées de filets, avec la flèche à droite : le vocabulaire du menu,
 *    celui du hero. On ne lit plus une liste, on choisit une entrée.
 * 3. Les deux introductions sont ramenées à une phrase. Elles en faisaient
 *    deux, dont la seconde ne disait rien que la première ne disait déjà.
 *
 * Toujours aucun encadré, aucun fond de carte, aucune ombre : un seul filet
 * sépare les deux colonnes. Ce qui distingue les deux publics est le
 * contenu — l'urgence d'un côté, le calcul de l'autre.
 */

const publics = [
  {
    surtitre: 'Entreprises, commerces, restaurants',
    titre: 'Professionnels',
    intro: 'Une panne de froid se compte en heures, pas en jours.',
    items: [
      { label: 'Chambres froides', href: '/chambres-froides' },
      { label: 'Réfrigération', href: '/refrigeration' },
      { label: 'Climatisation professionnelle', href: '/climatisation' },
      { label: 'Dépannage', href: '/entretien-depannage' },
    ],
  },
  {
    surtitre: 'Maisons et appartements',
    titre: 'Particuliers',
    intro: 'Le matériel se choisit après le calcul, jamais avant.',
    items: [
      { label: 'Chauffage', href: '/chauffage' },
      { label: 'Chaudières', href: '/chauffage' },
      { label: 'Pompes à chaleur', href: '/pompes-a-chaleur' },
      { label: 'Climatisation', href: '/climatisation' },
    ],
  },
] as const;

export function Publics() {
  return (
    <section aria-labelledby="publics-titre" className="bg-stone py-14 sm:py-16 lg:py-24">
      <div className="container-t">
        <h2 id="publics-titre" className="sr-only">
          Nos deux publics
        </h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          {publics.map((p, i) => (
            <Reveal key={p.titre} delay={i * 0.07}>
              {/* Le filet n'apparaît qu'AVANT la seconde colonne : horizontal
                  sur téléphone, vertical dès 1024 px. */}
              <div
                className={
                  i === 1
                    ? 'border-t border-line pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14'
                    : 'lg:pr-14'
                }
              >
                <p className="flex items-center gap-3 text-[0.9rem] text-slate">
                  <span aria-hidden className="h-px w-7 bg-brand" />
                  {p.surtitre}
                </p>

                <h3 className="heading mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] text-ink">
                  {p.titre}
                </h3>

                <p className="mt-4 max-w-md text-[1.02rem] leading-8 text-slate">
                  {p.intro}
                </p>

                {/* Des lignes de menu, pas une liste de texte : toute la
                    largeur est cliquable, la flèche annonce le départ, et le
                    fond s'éclaircit à peine au survol. C'est le même
                    comportement que l'index du hero — un seul vocabulaire
                    d'interaction sur toute la page. */}
                <ul className="mt-8 border-t border-line">
                  {p.items.map((m) => (
                    <li key={m.label} className="border-b border-line">
                      <Link
                        href={m.href}
                        className="group -mx-3 flex items-baseline justify-between gap-6 rounded-[3px] px-3 py-3.5 transition-colors sm:py-4 duration-[250ms] hover:bg-ink/[0.035]"
                      >
                        <span className="heading text-[clamp(1.05rem,2vw,1.3rem)] leading-snug text-ink">
                          {m.label}
                        </span>
                        <span
                          aria-hidden
                          className="text-[0.95rem] text-slate/40 transition-[transform,color] duration-[250ms] group-hover:translate-x-1 group-hover:text-brand"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
