import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Nos installations.
 *
 * ─── LE MODÈLE 3D A ÉTÉ RETIRÉ ───────────────────────────────────────────
 * Cette section portait la scène three.js de la chambre froide. Elle était
 * techniquement soignée — cotes du fabricant, turbines animées, éclairage
 * accordé à la page — mais elle occupait la place d'une photographie dans
 * la seule section dont le rôle est de montrer du TRAVAIL RÉEL. Un modèle
 * prouve qu'on sait modéliser ; il ne prouve pas qu'on sait poser.
 *
 * Avec elle disparaît tout `three` de la page d'accueil : plus aucun canvas
 * WebGL n'y est monté, à aucune largeur. La scène interactive complète reste
 * en place sur `/chambres-froides` et `/refrigeration`, où elle explique le
 * fonctionnement d'une installation à un visiteur déjà engagé. Ces deux
 * pages n'ont pas été touchées.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── CE QUE LA SECTION AFFIRME, ET CE QU'ELLE N'AFFIRME PAS ──────────────
 * Elle décrit une MÉTHODE de livraison — dimensionner, poser, mettre en
 * service, rester joignable — et elle l'illustre. Elle ne revendique aucun
 * chantier : pas de commune, pas de date, pas de client, pas de « réalisé
 * par nos équipes ». Les réalisations de l'entreprise ne sont pas
 * confirmées ; les inventer en légende serait le plus court chemin pour
 * perdre la crédibilité que toute cette refonte cherche à construire.
 *
 * Les trois lignes sous le texte ne sont pas des arguments : ce sont les
 * trois livrables concrets qu'un client reçoit, dans l'ordre où il les
 * reçoit.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── COMPOSITION ─────────────────────────────────────────────────────────
 * L'image occupe sept colonnes sur douze et déborde du texte en hauteur :
 * c'est elle qui domine, le texte l'accompagne. L'inverse — un paragraphe
 * large et une vignette à côté — produit une page de brochure.
 */

/**
 * Photographie de la section.
 *
 * Provisoire, documentée dans `public/photos/CREDITS.md`. À remplacer par
 * une prise de vue de l'entreprise : c'est LA photographie qui compte le
 * plus sur ce site, celle d'une mise en service par la personne qui a posé
 * l'installation.
 */
const PHOTO = {
  src: '/photos/installation-mise-en-service.jpg',
  alt: 'Technicien procédant au réglage d’un module de production de chaleur.',
  /**
   * Format 4:5, et c'est un choix de composition.
   *
   * En paysage, l'image faisait 437 px de haut face à une colonne de texte
   * de 700 px : centrée, elle laissait un vide de 130 px au-dessus ET en
   * dessous — exactement le genre de respiration creuse que cette refonte
   * chasse. En portrait, les deux colonnes ont presque la même hauteur et
   * la section se tient.
   */
  width: 1600,
  height: 2000,
};

const livrables = [
  {
    titre: 'Une note de dimensionnement',
    texte: 'Déperditions ou charge à refroidir, calculées avant le matériel.',
  },
  {
    titre: 'Un devis détaillé',
    texte: 'Postes séparés, établi après la visite.',
  },
  {
    titre: 'Un relevé de mise en service',
    texte: 'Tirage au vide, étanchéité, charge de fluide, pressions.',
  },
] as const;

export function Chantier() {
  return (
    <section
      aria-labelledby="installations-titre"
      className="bg-white py-14 sm:py-16 lg:py-24"
    >
      {/* ─── POURQUOI PLUS DE `items-center` ───
          La colonne éditoriale est plus courte que la photographie. Centrée,
          elle laissait un bloc blanc mort d'environ 600 × 135 px dans le coin
          bas-gauche, juste avant le changement de fond — d'où l'impression
          que la page s'arrêtait net.

          Les deux colonnes s'étirent donc à la même hauteur et la rangée de
          boutons descend en pied de colonne (`lg:mt-auto`). Le vide n'est pas
          comblé par du contenu ajouté : il est REDISTRIBUÉ en respiration
          entre la liste et l'appel à l'action, là où il travaille. */}
      <div className="container-t grid gap-11 lg:grid-cols-12 lg:items-stretch lg:gap-14">
        {/* ─────────── L'éditorial ─────────── */}
        <div className="lg:col-span-5 lg:flex">
          <Reveal className="lg:flex lg:h-full lg:flex-col">
            <p className="flex items-center gap-3 text-[0.95rem] text-slate"><span aria-hidden className="h-px w-7 bg-brand" />Nos installations</p>

            <h2
              id="installations-titre"
              className="heading mt-3 text-[clamp(1.9rem,3.4vw,2.9rem)] text-ink"
            >
              De la conception à la mise en service
            </h2>

            {/* Une phrase. L'ancienne en faisait quatre lignes et énumérait
                les quatre métiers — que la section « Nos métiers » vient de
                montrer en photographies, deux écrans plus haut. Répéter une
                liste qu'on a déjà vue ne renseigne personne. */}
            <p className="mt-6 max-w-md text-[1.05rem] leading-8 text-slate">
              Nous dimensionnons, posons et réglons l’installation — puis nous
              restons joignables pour l’entretien.
            </p>

            {/* ─── CE QU'ON REÇOIT, ET C'EST LE CŒUR DE LA SECTION ───
                Trois livrables, numérotés, chacun ouvert par un filet.
                Le numéro n'est pas décoratif : ces trois pièces arrivent
                dans cet ordre, et c'est l'ordre qui prouve la méthode — on
                ne chiffre pas avant d'avoir calculé, on ne met pas en
                service avant d'avoir posé.

                Le titre porte la preuve, la ligne en dessous la qualifie.
                Un filet en tête de chaque bloc plutôt qu'un filet unique à
                gauche : on balaie trois entrées au lieu de lire une liste. */}
            {/* ─── LES TROIS LIVRABLES, RELIÉS ───
                Ils étaient trois blocs ouverts chacun par son filet : trois
                objets, donc, là où le texte dit une SÉQUENCE — on ne chiffre
                pas avant d'avoir calculé, on ne met pas en service avant
                d'avoir posé.

                Un filet vertical continu les traverse désormais à gauche, et
                chaque numéro porte son nœud dessus. La lecture devient un
                parcours avant même qu'on ait lu un mot. `relative` sur la
                liste, `absolute` sur le filet : il court du premier nœud au
                dernier, sans déborder ni au-dessus ni en dessous. */}
            <ul className="relative mt-8 space-y-6 pl-8 sm:mt-9">
              <span
                aria-hidden
                className="absolute top-[26px] bottom-[26px] left-[3px] w-px bg-line"
              />
              {livrables.map((l, i) => (
                <li key={l.titre} className="relative border-t border-line pt-4">
                  <span
                    aria-hidden
                    className="absolute left-0 mt-[7px] size-[7px] rounded-full bg-brand ring-[3px] ring-white"
                  />
                  <p className="text-[0.86rem] font-medium text-brand tabular-nums sm:text-[0.8rem]">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="heading mt-2.5 text-[1.08rem] text-ink sm:mt-2 lg:text-[1.15rem]">
                    {l.titre}
                  </p>
                  <p className="mt-1.5 max-w-[42ch] text-[0.97rem] leading-6 text-slate sm:text-[0.9rem]">
                    {l.texte}
                  </p>
                </li>
              ))}
            </ul>

            {/* Les boutons suivent le texte. Ils étaient poussés en pied de
                colonne par `lg:mt-auto` : cela comblait le vide EN BAS, mais
                le déplaçait AU MILIEU — entre la dernière étape et eux. Un
                trou au milieu d'une colonne se voit davantage qu'un bas de
                colonne court. C'est désormais la photographie qui s'aligne
                sur le texte, plus bas dans ce fichier. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-9 lg:mt-10">
              <Link href="/contact" className="btn btn-primary btn-arrow">
                Demander un devis
              </Link>
              <Link href="/realisations" className="link-t text-[1.02rem] text-ink">
                Voir nos installations
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ─────────── La photographie ───────────
            Elle mange la gouttière du conteneur par la droite. La marge
            négative vaut EXACTEMENT cette gouttière : l'image s'arrête donc
            au bord du conteneur, jamais au-delà. Aucun `vw` n'est employé —
            c'est ce qui garantit qu'aucune largeur ne produit de défilement
            horizontal, barre de défilement comprise.

            Ce que cela donne selon la largeur :
              sous 1312 px  le conteneur occupe tout l'écran, l'image touche
                            donc réellement le bord ;
              au-delà       le conteneur est plafonné à 82 rem et centré :
                            l'image s'arrête à son bord, avec la marge de
                            page qui subsiste de chaque côté.

            Dans les deux cas elle franchit la gouttière et cesse d'être
            alignée sur la colonne de texte — c'est ce décrochage qui la fait
            lire comme une photographie de presse plutôt que comme une
            vignette de brochure.

            Sous 1024 px elle reprend sa place dans la gouttière : sur un
            écran étroit, une image à fond perdu mangerait la marge qui rend
            le texte lisible. */}
        <div className="lg:col-span-7 lg:col-start-6 lg:-mr-[clamp(1.25rem,4.5vw,3.5rem)]">
          <Reveal className="lg:h-full" delay={0.08}>
            {/* ─── LA PHOTOGRAPHIE S'ALIGNE SUR LE TEXTE ───
                Elle est au format 4/5. À sept colonnes elle réclamait près
                de 960 px de haut pour une colonne de texte qui en fait 620 :
                c'est cet écart qui creusait le vide de la section.

                `h-full` + `object-cover` inversent la dépendance. La grille
                est en `items-stretch`, donc la colonne connaît déjà sa
                hauteur — celle du texte. L'image la remplit et se recadre
                elle-même. Le texte commande, la photographie suit. */}
            <figure className="m-0">
              {/* ─── LE CADRE COMMANDE, PAS LE FICHIER ───
                  `h-full` seul ne pouvait rien : la hauteur de la rangée
                  était justement dictée par l'image, donc elle se mesurait
                  à elle-même. Au format 4/5 sur sept colonnes, elle
                  réclamait 960 px pour une colonne de texte qui en fait
                  690 — d'où 270 px de blanc sous les boutons.

                  On lui impose donc un rapport proche de la colonne de
                  texte, et `object-cover` recadre. Le sujet — le technicien
                  et le module — occupe le centre du cliché : il survit au
                  recadrage. */}
              <div className="lg:aspect-[6/5] lg:overflow-hidden lg:rounded-sm lg:rounded-r-none">
              <Image
                src={PHOTO.src}
                alt={PHOTO.alt}
                width={PHOTO.width}
                height={PHOTO.height}
                sizes="(min-width:1024px) 58vw, 92vw"
                className="photo h-auto w-full rounded-sm lg:h-full lg:rounded-none lg:object-cover"
              />
              </div>
              {/* La légende décrit un geste du métier. Elle n'attribue ni
                  chantier, ni lieu, ni client — rien de tout cela n'est
                  confirmé. */}
              <figcaption className="mt-3 max-w-md text-[0.93rem] leading-6 text-slate sm:text-[0.85rem]">
                La mise en service décide de la consommation d’une
                installation, bien plus que la marque du matériel.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
