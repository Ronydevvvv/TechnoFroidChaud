import { company, servedTowns } from '@/content/company';

/**
 * Repères — la bande qui suit immédiatement le hero.
 *
 * ─── SA FONCTION, ET ELLE EST UNIQUE ─────────────────────────────────────
 * Répondre en une ligne aux trois questions qu'un visiteur se pose avant
 * toute autre : QUI vous êtes, DEPUIS QUAND, et OÙ vous intervenez. C'est
 * l'écran qui décide s'il continue ou s'il retourne à Google.
 *
 * Elle ne vend rien, ne renvoie nulle part, et c'est voulu : un lien ici
 * détournerait du parcours au moment exact où le visiteur s'oriente.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── CE QU'ELLE N'EST PAS ────────────────────────────────────────────────
 * Ni une rangée de chiffres flatteurs, ni des compteurs animés. Les quatre
 * valeurs sont vérifiables : le métier est celui déclaré par l'entreprise,
 * l'année est celle de l'immatriculation au RCS, les communes sont celles
 * réellement desservies, et le devis après visite est un engagement qui
 * figure au devis lui-même.
 *
 * AUCUN chiffre d'affaires, AUCUN nombre de chantiers, AUCUNE note client.
 * Rien de tout cela n'est confirmé — donc rien de tout cela n'est affiché.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Bande étroite, posée entre deux filets, sur le sol clair : après un hero
 * photographique plein écran, elle sert aussi de respiration.
 */

/**
 * `thermique` : ce repère porte-t-il, en lui-même, le froid ET le chaud ?
 *
 * Un seul le fait — « Frigoriste · Chauffagiste », dont la légende dit
 * justement « Froid et chaleur, un seul métier ». Sa graduation est donc
 * coupée en deux, cyan puis rouge. Les trois autres restent neutres.
 *
 * C'est la seule couleur de la bande, et elle traduit une phrase déjà
 * écrite : elle n'ajoute aucune information, elle en montre une.
 */
const reperes = [
  { valeur: 'Frigoriste · Chauffagiste', legende: 'Froid et chaleur, un seul métier', thermique: true },
  {
    valeur: `Depuis ${company.foundedYear}`,
    legende: `Entreprise immatriculée à ${company.city}`,
    thermique: false,
  },
  /* La légende annonçait « Moselle · Alsace · Meurthe-et-Moselle ». Les
     quinze communes de `content/company.ts` sont TOUTES en Moselle, et le
     reste du site — pied de page, /entreprise, /contact — parle du bassin
     houiller et de l'est mosellan. C'était la dernière occurrence de cette
     affirmation, déjà corrigée sur /contact. */
  { valeur: `${servedTowns.length} communes`, legende: 'Bassin houiller et est mosellan', thermique: false },
  { valeur: 'Devis après visite', legende: 'Aucun chiffrage au téléphone', thermique: false },
] as const;

export function Reperes() {
  return (
    <section aria-label="Repères" className="bg-white">
      {/* ─── POURQUOI CES VALEURS, ET POURQUOI `lg:` SEULEMENT ───
          Sur grand écran la bande mesurait 135 px pour 67 px de contenu —
          le double. Et la section suivante ouvre sur du blanc, elle aussi :
          les deux respirations s'additionnaient en un rectangle vide de
          109 px que rien ne séparait, ni filet ni changement de fond. Une
          respiration qu'on ne peut pas attribuer à l'une des deux sections
          n'est plus une respiration, c'est un trou.

          Sous 1024 px, en revanche, la bande passe à deux colonnes : 234 px
          de contenu pour 294 px de cadre, donc déjà proportionnée. Elle
          n'avait rien à corriger, et ces classes ne la touchent pas. */}
      <div className="container-t pt-7 pb-8 lg:pt-7 lg:pb-6">
        {/* Deux colonnes sur téléphone : quatre repères empilés feraient une
            colonne de 400 px là où l'on attend une bande. */}
        {/* ─── LA GRADUATION ───
            Chaque repère s'ouvre sur un court segment gradué : un filet
            continu, puis quatre traits verticaux. C'est le même vocabulaire
            que la réglette du hero et que les cartouches des planches — un
            bord de feuille, pas un ornement.

            Le premier est coupé en deux, cyan puis rouge, parce que c'est
            le seul repère qui parle des deux régimes. */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-10">
          {reperes.map((r) => (
            <li key={r.valeur}>
              <span aria-hidden className="flex h-2 items-start">
                {r.thermique ? (
                  <>
                    <span className="h-px w-1/2 bg-brand" />
                    <span className="h-px w-1/2 bg-alert" />
                  </>
                ) : (
                  <span className="h-px w-full bg-line" />
                )}
              </span>
              {/* Les quatre traits de graduation, sous le filet. Ils sont
                  posés en fond plutôt qu'en éléments : quatre `span` par
                  repère feraient seize nœuds pour un motif que le moteur de
                  rendu trace en une passe. */}
              <span
                aria-hidden
                className="-mt-2 block h-1.5 w-16 bg-[repeating-linear-gradient(to_right,var(--color-line)_0_1px,transparent_1px_15px)]"
              />
              <p className="heading mt-3 text-[0.98rem] text-ink lg:text-[1.08rem]">{r.valeur}</p>
              <p className="mt-1.5 text-[0.93rem] leading-6 text-slate sm:text-[0.85rem]">{r.legende}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
