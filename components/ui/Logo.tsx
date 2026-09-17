import Image from 'next/image';

/**
 * Logo.
 *
 * RÈGLE ABSOLUE : le logo ne se dessine pas, ne se décline pas, ne
 * s'invente pas. Aucun symbole n'est créé ici.
 *
 * ─── LE FICHIER OFFICIEL ─────────────────────────────────────────────────
 * `public/photos/logo.png`, fourni par l'entreprise : 128 × 93, fond
 * transparent. Il est affiché TEL QUEL — aucun recadrage, aucune retouche,
 * aucune recoloration. Les mêmes pixels servent au favicon.
 *
 * ─── LE PICTOGRAMME ACCOMPAGNE LE NOM, IL NE LE REMPLACE PAS ─────────────
 * Le fichier fourni est une marque FIGURATIVE — un flocon et un thermomètre
 * — pas un logotype. Seul dans l'en-tête, il laissait le site sans nom :
 * « Forbach » isolé sur grand écran, rien du tout en dessous de 640 px où ce
 * mot est masqué. Le nom est donc revenu à sa place, et « Forbach » est
 * parti : sur une seule ligne, la mention secondaire pesait plus qu'elle
 * n'apportait.
 *
 * ─── POURQUOI `alt=""` ───────────────────────────────────────────────────
 * Le nom est écrit juste à côté, en texte, et le lien qui enveloppe le tout
 * porte déjà `aria-label="Techno Froid Chaud, accueil"` (voir `Header.tsx`).
 * Un `alt` sur l'image ferait annoncer le nom une troisième fois. L'image
 * est donc décorative au sens de l'accessibilité.
 *
 * ─── LA COULEUR NE S'ADAPTE PAS, ET C'EST VOULU ──────────────────────────
 * L'en-tête est blanc sur le hero et encre après défilement. Le texte, lui,
 * héritait de cette couleur. Un logo en couleurs propres ne peut pas suivre
 * — et ne doit pas : le recolorer serait le modifier. Il a été vérifié
 * lisible sur les deux fonds.
 *
 * ─── DIMENSIONS ──────────────────────────────────────────────────────────
 * `width`/`height` reprennent la taille réelle du fichier : sans elles,
 * `next/image` ne peut pas réserver la place et le bandeau saute au
 * chargement. La hauteur d'affichage vient de la classe passée par
 * l'en-tête, la largeur suit.
 */

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/photos/logo.png"
        alt=""
        width={128}
        height={93}
        priority
        className="h-full w-auto"
      />
      {/* Exactement la composition typographique d'avant le logo : mêmes
          corps, même graisse, même non-césure. Rien n'a été retouché ici. */}
      <span className="heading text-[1.05rem] whitespace-nowrap lg:text-[1.15rem]">
        Techno Froid Chaud
      </span>
    </span>
  );
}
