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

const reperes = [
  { valeur: 'Frigoriste · Chauffagiste', legende: 'Froid et chaleur, un seul métier' },
  { valeur: `Depuis ${company.foundedYear}`, legende: `Entreprise immatriculée à ${company.city}` },
  /* La légende annonçait « Moselle · Alsace · Meurthe-et-Moselle ». Les
     quinze communes de `content/company.ts` sont TOUTES en Moselle, et le
     reste du site — pied de page, /entreprise, /contact — parle du bassin
     houiller et de l'est mosellan. C'était la dernière occurrence de cette
     affirmation, déjà corrigée sur /contact. */
  { valeur: `${servedTowns.length} communes`, legende: 'Bassin houiller et est mosellan' },
  { valeur: 'Devis après visite', legende: 'Aucun chiffrage au téléphone' },
] as const;

export function Reperes() {
  return (
    <section aria-label="Repères" className="bg-white">
      <div className="container-t py-9 lg:py-10">
        {/* Deux colonnes sur téléphone : quatre repères empilés feraient une
            colonne de 400 px là où l'on attend une bande. */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4 lg:gap-x-10">
          {reperes.map((r) => (
            <li key={r.valeur}>
              <p className="heading text-[0.98rem] text-ink lg:text-[1.08rem]">{r.valeur}</p>
              <p className="mt-1.5 text-[0.93rem] leading-6 text-slate sm:text-[0.85rem]">{r.legende}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
