import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Une respiration photographique, pleine largeur.
 *
 * ─── LE DÉFAUT QU'ELLE CORRIGE, ET IL EST PARTOUT ────────────────────────
 * Chaque page métier suit le même schéma : un hero photographique, puis
 * quatre à six mille pixels de planches et de texte, puis la bande sombre
 * d'appel. Une seule photographie sur toute la page, et elle est au-dessus
 * du pli — donc absente dès qu'on descend.
 *
 * Les planches techniques portent bien ces pages, mais elles sont toutes
 * au trait. Sans une matière photographique en cours de route, l'œil
 * traverse un long dessin gris et le métier finit par sembler abstrait.
 *
 * ─── POURQUOI UN COMPOSANT PARTAGÉ ───────────────────────────────────────
 * Le défaut revient sur quatre pages, avec la même cause et la même forme.
 * Un composant, quatre appels : les proportions, le voile, le survol et la
 * règle d'honnêteté sont réglés une fois et restent identiques partout.
 * C'est aussi ce qui garantit qu'aucune page ne dérivera vers son propre
 * traitement de la photographie.
 *
 * ─── LA RÈGLE D'HONNÊTETÉ, ET ELLE NE SE NÉGOCIE PAS ─────────────────────
 * Le cartouche est OBLIGATOIRE — `legende` n'a pas de valeur par défaut —
 * et il dit ce que l'image est : « Illustration métier ». Ce n'est PAS un
 * chantier de Techno Froid Chaud, aucune page ne le laisse entendre, et
 * les crédits sont dans `public/photos/CREDITS.md`.
 *
 * Aucun texte n'est posé SUR l'image. Une phrase en surimpression
 * demanderait d'écrire quelque chose de neuf sur une photographie qui ne
 * documente rien — et c'est exactement par là qu'un site se met à
 * raconter ce qu'il n'a pas fait.
 *
 * ─── LES PROPORTIONS ─────────────────────────────────────────────────────
 * 21/9 sur grand écran, 16/9 en tablette, 4/3 sur téléphone. Un panoramique
 * ramené à 375 px ne montrerait plus qu'une bande de quatre-vingts pixels ;
 * le format se redresse donc à mesure que la page se resserre, ce qui est
 * la même logique que les planches du site.
 */
export function BandePhoto({
  src,
  alt,
  legende,
  position = '50% 50%',
  fond = 'bg-white',
}: {
  src: string;
  alt: string;
  /** Ce que MONTRE l'image. Jamais ce que l'entreprise aurait posé. */
  legende: string;
  /** `object-position`, pour recadrer selon le sujet. */
  position?: string;
  /** La surface de la section, pour suivre le rythme de la page. */
  fond?: string;
}) {
  return (
    <section aria-label="Illustration métier" className={`${fond} pb-14 lg:pb-20`}>
      <div className="container-t">
        <Reveal as="figure" className="group/ph m-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-steel-800 sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width:1024px) 82vw, 92vw"
              style={{ objectPosition: position }}
              className="object-cover transition-transform duration-[1100ms] ease-out group-hover/ph:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/ph:scale-100"
            />
            {/* Le même voile que les tuiles de l'accueil : il tient les
                photographies à la même densité quelles que soient leurs
                expositions d'origine. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,17,24,0.3)_0%,rgba(10,17,24,0.06)_55%,rgba(10,17,24,0)_100%)]"
            />
          </div>

          <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3 text-[0.74rem] tracking-[0.08em] text-slate uppercase">
            <span className="text-ink">Illustration métier</span>
            <span aria-hidden className="text-line">
              —
            </span>
            <span>{legende}</span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
