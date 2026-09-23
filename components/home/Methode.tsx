import { etapes } from '@/content/methode';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Comment se passe un projet.
 *
 * ─── LA NUMÉROTATION EST REVENUE, ET C'EST JUSTIFIÉ ──────────────────────
 * Elle avait été retirée parce qu'elle accompagnait six encadrés identiques :
 * numéro bleu, filet, titre, texte — six fois le même objet, c'est-à-dire
 * six cartes quel que soit le nom qu'on leur donne.
 *
 * Mais l'ordre EST l'information de cette section : on ne met pas en service
 * avant d'avoir posé, et on ne pose pas avant d'avoir relevé. Sans repère
 * chiffré, six intitulés alignés se lisent comme un menu, pas comme un
 * déroulé. La règle interne du projet le disait déjà : la numérotation est
 * réservée à la seule section où l'ordre porte une information. C'est
 * celle-ci.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── CE QUI FAIT LA PROGRESSION, ET CE QUI NE LA FAIT PAS ────────────────
 * Ce n'est pas un composant répété. Chaque étape est posée SUR un filet
 * continu qui traverse toute la grille : c'est le filet qui relie les six
 * temps, comme une ligne de temps. Le numéro y est accroché, en petit, dans
 * l'accent bleu ; il se lit, il ne domine pas.
 *
 * Aucun encadré, aucun fond, aucune ombre, aucune flèche, aucune icône.
 *
 *   téléphone   une colonne — le filet devient vertical, à gauche
 *   tablette    deux colonnes
 *   grand écran trois colonnes, deux rangées de trois
 *
 * Sur téléphone la progression est la plus lisible des trois : c'est
 * exactement le sens de lecture naturel, et les six étapes tiennent sans
 * que la page n'explose en hauteur.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── LA SOURCE EST PARTAGÉE ──────────────────────────────────────────────
 * Les six étapes vivent dans `content/methode.ts`. Les cinq pages métier en
 * rappellent les NOMS en bande compacte ; cette section les déroule en
 * entier. Une seule source, deux densités — une correction ici ne peut plus
 * laisser un texte faux ailleurs.
 *
 * Aucun délai promis, aucune gratuité annoncée, aucune garantie non
 * confirmée.
 */

export function Methode() {
  return (
    /* `id` : cible du lien « Le détail de chaque étape » que portent les
       cinq pages métier, où la méthode n'est rappelée qu'en noms d'étapes.
       Sans lui, ces cinq liens tombaient en haut de l'accueil. */
    <section id="methode" className="scroll-mt-24 bg-steel-900 py-14 text-white sm:py-16 lg:py-24">
      <div className="container-t">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <Reveal>
            <h2 className="heading t-h2 max-w-[16ch] text-white">
              Comment se passe un projet
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-sm text-[1rem] leading-8 text-steel-100">
              Le déroulé est le même pour un séjour de 34 m² et pour une
              chambre froide de restaurant.
            </p>
          </Reveal>
        </div>

        {/* Le filet continu qui porte les six temps. Il est posé sur la
            grille, pas sur chaque cellule : c'est ce qui empêche les étapes
            de se lire comme six objets séparés. */}
        <ol className="mt-10 grid gap-x-10 gap-y-10 sm:mt-12 sm:gap-y-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
          {etapes.map((e, i) => (
            <Reveal as="li" key={e.nom} delay={Math.min(i * 0.04, 0.2)}>
              {/* Le filet : horizontal au-dessus de l'étape dès 640 px,
                  vertical à sa gauche sur téléphone. */}
              {/* ─── LE NŒUD SUR LE FILET ───
                  Le filet existait déjà ; il manquait ce qui fait qu'on le
                  lit comme un PARCOURS et non comme six traits : un point
                  posé dessus, à l'aplomb du numéro.

                  Il est en cyan et cerclé de la couleur du fond : le cercle
                  évide le filet juste derrière lui, si bien que le point
                  paraît enfilé sur la ligne plutôt que collé par-dessus.

                  Sa position suit l'orientation du filet — à gauche sur
                  téléphone où la ligne est verticale, en tête dès 640 px où
                  elle passe à l'horizontale. */}
              <div className="relative border-l border-white/[0.28] pl-5 sm:border-l-0 sm:border-t sm:border-white/15 sm:pt-5 sm:pl-0">
                <span
                  aria-hidden
                  className="absolute -left-[4.5px] top-2 size-[7px] rounded-full bg-brand ring-[3px] ring-steel-900 sm:top-[-4.5px] sm:left-0"
                />
                {/* Le numéro est SUR la ligne du nom, pas au-dessus.
                    Empilé, il coûtait une ligne par étape : six lignes de
                    plus, soit près de 150 px de hauteur sur téléphone pour
                    une information de deux caractères. Sur la même ligne il
                    se lit exactement comme le brief l'énonce — « 01 Échange »
                    — et la progression 01 → 06 devient une colonne de
                    chiffres que l'œil suit sans effort.

                    `tabular-nums` : sans chiffres de chasse fixe, le 1 est
                    plus étroit que le 0 et les six noms ne s'alignent plus
                    verticalement d'une étape à l'autre. */}
                <h3 className="heading flex items-baseline gap-2.5 text-[1.15rem] text-white lg:text-[1.25rem]">
                  <span className="text-[0.88rem] font-medium text-brand-clair tabular-nums sm:text-[0.82rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {e.nom}
                </h3>
                <p className="mt-2.5 max-w-none text-[1rem] leading-7 text-steel-100 sm:max-w-[34ch] sm:text-[0.95rem]">
                  {e.texte}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
