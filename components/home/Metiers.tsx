import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Nos métiers — la section qui porte l'accueil.
 *
 * ─── CE QU'ELLE REMPLACE ─────────────────────────────────────────────────
 * Une bande de cinq liens séparés par des filets, intitulée « Nos domaines ».
 * Elle était propre, mais elle demandait au visiteur de LIRE pour comprendre
 * le périmètre de l'entreprise. Sur un site d'artisan, le périmètre doit se
 * VOIR : un restaurateur reconnaît une chambre froide en une fraction de
 * seconde, il ne lit pas une liste.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── POURQUOI SIX, ET DANS CET ORDRE ─────────────────────────────────────
 * Les six métiers réellement exercés, ni plus ni moins — rien n'est inventé,
 * tout vient de `content/services.ts` et du site actuel de l'entreprise.
 * L'ordre suit la saison commerciale : la climatisation d'abord, le
 * dépannage en dernier parce qu'on ne le cherche pas, on le subit.
 *
 * ─── CE QUI ÉVITE LA GRILLE DE CARTES ────────────────────────────────────
 * Aucune bordure, aucun rayon sur la tuile, aucune ombre, aucun fond de
 * carte. Une photographie, un titre, une ligne. Ce qui sépare les éléments
 * est l'écart entre eux, pas un cadre autour de chacun.
 *
 * Au survol : l'image s'agrandit de 3 % en 700 ms sous un cadre qui, lui,
 * ne bouge pas, et le voile s'éclaircit. Rien d'autre — pas de translation
 * de la tuile, pas d'ombre qui apparaît, pas de bordure qui s'allume.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Les photographies sont provisoires et documentées dans
 * `public/photos/CREDITS.md`. Aucune n'est présentée comme un chantier de
 * l'entreprise : elles illustrent un MÉTIER, elles n'attestent pas d'une
 * réalisation.
 */

const metiers = [
  {
    titre: 'Climatisation',
    texte: 'Mono-split, multi-split, gainable et cassette.',
    href: '/climatisation',
    chaud: false,
    img: '/photos/metier-climatisation.jpg',
    alt: 'Unités extérieures de climatisation multi-split en façade d’un bâtiment.',
  },
  {
    titre: 'Chauffage et chaudières',
    texte: 'Installation, remplacement et entretien.',
    href: '/chauffage',
    chaud: true,
    img: '/photos/metier-chauffage.jpg',
    alt: 'Local technique équipé de ballons tampons et d’une production de chaleur.',
  },
  {
    titre: 'Pompes à chaleur',
    texte: 'Air/air et air/eau, dimensionnées sur le bâtiment.',
    href: '/pompes-a-chaleur',
    chaud: true,
    img: '/photos/metier-pompes-a-chaleur.jpg',
    alt: 'Pompe à chaleur air/eau installée en pignon d’une maison individuelle.',
  },
  {
    titre: 'Réfrigération',
    texte: 'Groupes, vitrines et laboratoires de préparation.',
    href: '/refrigeration',
    chaud: false,
    img: '/photos/metier-refrigeration.jpg',
    alt: 'Groupes frigorifiques montés sur châssis contre la façade d’un bâtiment.',
  },
  {
    titre: 'Chambres froides',
    texte: 'Positive ou négative, montée et réglée sur place.',
    href: '/chambres-froides',
    chaud: false,
    img: '/photos/metier-chambres-froides.jpg',
    alt: 'Intérieur d’une chambre froide professionnelle en service.',
  },
  {
    titre: 'Entretien et dépannage',
    texte: 'Urgence qualifiée dès l’appel, entretien planifié.',
    href: '/entretien-depannage',
    chaud: false,
    img: '/photos/metier-depannage.jpg',
    alt: 'Frigoriste raccordant un manifold de service sur une installation.',
  },
] as const;

export function Metiers() {
  return (
    <section
      aria-labelledby="metiers-titre"
      className="bg-steel-900 py-14 text-white sm:py-16 lg:py-24"
    >
      <div className="container-t">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between lg:gap-14">
            <h2 id="metiers-titre" className="heading t-h2 text-white">
              Nos métiers
            </h2>
            <p className="max-w-md text-[1rem] leading-8 text-steel-100">
              Le froid et la chaleur relèvent du même métier : un transfert
              d’énergie, qu’il faut calculer avant de l’installer.
            </p>
          </div>
        </Reveal>

        {/* Une colonne sur téléphone, deux sur tablette, trois sur grand
            écran. Trois colonnes sur un écran de 390 px donneraient des
            vignettes de 110 px : illisibles, donc inutiles. */}
        <ul className="mt-8 grid grid-cols-1 gap-x-7 gap-y-8 sm:mt-10 sm:gap-y-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-12">
          {metiers.map((m, i) => (
            <Reveal as="li" key={m.titre} delay={Math.min(i * 0.05, 0.25)}>
              <Link
                href={m.href}
                className="group block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px]"
              >
                {/* `overflow-hidden` sur le cadre, `scale` sur l'image :
                    c'est l'image qui bouge à l'intérieur d'un cadre fixe.
                    Si la tuile entière grandissait, elle pousserait ses
                    voisines et la grille respirerait à chaque survol. */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-steel-800">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    sizes="(min-width:1024px) 31vw, (min-width:640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  {/* Voile permanent : il tient les six photographies à la
                      même densité, quelles que soient leurs expositions
                      d'origine, et il les accorde à l'acier de la section. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,17,24,0.62)_0%,rgba(10,17,24,0.2)_55%,rgba(10,17,24,0.08)_100%)] transition-opacity duration-500 group-hover:opacity-70"
                  />
                </div>

                <h3 className="heading mt-5 flex items-baseline justify-between gap-4 text-[1.12rem] text-white lg:text-[1.22rem]">
                  {/* Le filet d'accent se trace sous le titre au survol.
                      `inline-block` + `after` : il épouse la largeur du mot,
                      pas celle de la colonne — un trait qui dépasserait le
                      texte se lirait comme une bordure de carte. */}
                  <span className={`relative inline-block after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-right after:scale-x-0 ${m.chaud ? 'after:bg-alert' : 'after:bg-brand'} after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:origin-left group-hover:after:scale-x-100`}>
                    {m.titre}
                  </span>
                  <span
                    aria-hidden
                    className={`text-[0.95rem] text-white/30 transition-[transform,color] duration-300 group-hover:translate-x-1 ${m.chaud ? 'group-hover:text-alert' : 'group-hover:text-brand'}`}
                  >
                    →
                  </span>
                </h3>
                <p className="mt-3 max-w-[38ch] text-[0.95rem] leading-7 text-steel-100">
                  {m.texte}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
