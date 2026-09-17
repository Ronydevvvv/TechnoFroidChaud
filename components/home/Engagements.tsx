import { company } from '@/content/company';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Nos engagements — la section de preuve.
 *
 * ─── POURQUOI PAS DE LABELS ──────────────────────────────────────────────
 * Aucune certification n'est affichée sur ce site : RGE QualiPAC, FEEBAT et
 * CAPEB ne sont pas confirmées par l'entreprise, et une qualification RGE
 * affichée à tort engage le client bien au-delà du site — elle conditionne
 * MaPrimeRénov' et les CEE, et son affichage abusif est sanctionné. Voir
 * `content/company.ts`.
 *
 * Ce qui les remplace tient sans aucun logo : cinq engagements que
 * l'entreprise prend elle-même et que le client peut vérifier dès le premier
 * rendez-vous. C'est moins décoratif qu'un macaron, mais c'est opposable.
 *
 * Rien d'autre n'est affirmé : aucun nombre de chantiers, aucune note
 * client, aucun logo de marque, aucun délai d'intervention chiffré. Tout
 * cela se démontre, et rien de tout cela n'est démontré aujourd'hui.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── CE QUI CHANGE : ON NE LIT PAS UNE PREUVE, ON LA BALAIE ──────────────
 * La version précédente donnait à chaque engagement un paragraphe de deux à
 * trois lignes, rangés en trois colonnes. C'était juste, et illisible : à cet
 * endroit de la page, personne ne lit cinq paragraphes — on cherche à se
 * rassurer en trois secondes.
 *
 *   une phrase par engagement, jamais deux
 *   cinq colonnes sur grand écran : la section devient une BANDE de preuve
 *   et non une grille de texte
 *   le titre porte l'information, la phrase ne fait que la qualifier
 *
 * Les textes longs n'ont pas été jetés : ils vivent sur les pages métier et
 * sur `/entreprise`, où un visiteur qui veut le détail va les chercher.
 *
 * ─── CE QUI ÉVITE LES CINQ CARTES ────────────────────────────────────────
 * Aucun encadré, aucun fond, aucune icône, aucune ombre. Un numéro discret
 * dans l'accent, un titre, une ligne — et un filet en tête de chaque colonne
 * qui, mis bout à bout, dessine un seul trait continu sous le chapeau.
 */

const engagements = [
  {
    titre: `Installés à ${company.city}`,
    texte: `À deux pas de ${company.primaryArea}, sur un rayon que nous connaissons.`,
  },
  {
    titre: 'Devis après visite',
    texte: 'Aucun chiffrage au téléphone : le devis part d’un relevé sur place.',
  },
  {
    titre: `Garantie ${company.warrantyYears} ans`,
    texte: 'Sur nos installations, écrite au devis — donc opposable.',
  },
  {
    titre: 'Dépannage qualifié',
    texte: 'Panne ou projet : nous tranchons dès l’appel.',
  },
  {
    titre: 'Un seul interlocuteur',
    texte: 'Celui qui dimensionne est celui qui met en service.',
  },
] as const;

export function Engagements() {
  return (
    <section aria-labelledby="engagements-titre" className="bg-white py-14 sm:py-16 lg:py-24">
      <div className="container-t">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-14">
            <h2 id="engagements-titre" className="heading t-h2 max-w-[14ch] text-ink">
              Nos engagements
            </h2>
            <p className="max-w-md text-[1rem] leading-8 text-slate">
              Cinq points vérifiables dès le premier rendez-vous. Nous
              n’affichons aucune certification que nous ne pourrions pas
              produire sur demande.
            </p>
          </div>
        </Reveal>

        {/* Cinq colonnes sur grand écran. À cette largeur chaque engagement
            tient dans une colonne de 230 px : c'est précisément ce qui le
            force à une phrase, et ce qui transforme la grille en bande. */}
        <ol className="mt-9 grid grid-cols-1 gap-x-8 gap-y-9 sm:mt-11 sm:gap-y-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 lg:gap-x-9">
          {engagements.map((e, i) => (
            <Reveal as="li" key={e.titre} delay={Math.min(i * 0.04, 0.2)}>
              <div className="border-t border-line pt-5">
                <p className="text-[0.88rem] font-medium text-brand tabular-nums sm:text-[0.82rem]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="heading mt-1.5 text-[1.08rem] text-ink sm:mt-2.5 lg:text-[1.12rem]">
                  {e.titre}
                </h3>
                <p className="mt-3 text-[0.97rem] leading-6 text-slate sm:mt-2 sm:text-[0.9rem]">{e.texte}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
