import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/content/company';
import { HeroVideo } from '@/components/home/HeroVideo';

/**
 * La vidéo de fond du premier écran.
 *
 * 1128 × 720, H.264, sans piste audio, 10,00 s, 2,76 Mo, `moov` placé avant
 * `mdat` — le fichier démarre donc avant d'être entièrement téléchargé.
 *
 * La source livrée faisait 1280 × 720 et portait un filigrane incrusté ;
 * elle a été rognée de 144 px à droite. Le détail de la mesure et du choix
 * est écrit sur le composant `HeroVideo`, plus bas dans ce fichier.
 *
 * Elle est posée SUR la photographie ci-dessous, qui reste le socle et le
 * repli. Voir `components/home/HeroVideo.tsx` pour le détail.
 */
const VIDEO = '/video/hero-climatisation.mp4';

/**
 * Hero.
 *
 * ─── LE MODÈLE 3D A ÉTÉ RETIRÉ ───────────────────────────────────────────
 * Le groupe de condensation occupait la moitié droite du premier écran. Il
 * était techniquement juste — cotes du matériel, éclairage cohérent — mais
 * il disait la mauvaise chose : un gros objet modélisé en ouverture de site
 * annonce une démonstration graphique, pas une entreprise de Morsbach qu'on
 * peut appeler. Une entreprise de froid se prouve par des chantiers et par
 * des gens, pas par un rendu.
 *
 * La scène 3D VIVANTE reste plus bas, dans « Nos installations », où elle
 * est à sa place : elle y explique une installation à quelqu'un qui a déjà
 * lu ce que fait l'entreprise.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── LA COMPOSITION EST CELLE D'UN HERO PHOTOGRAPHIQUE ───────────────────
 * Elle est bâtie pour une photographie, et elle l'attend :
 *
 *     la photo occupe TOUT le fond, son sujet cadré à droite
 *     un voile sombre la couvre depuis la gauche, opaque puis transparent
 *     le texte se pose sur la partie opaque
 *
 * C'est le dispositif des sites d'entreprise crédibles, et c'est ce qui rend
 * le remplacement indolore : la mise en page, les corps et les marges sont
 * DÉJÀ ceux du rendu final. Le jour où la photographie arrive, on renseigne
 * `PHOTO` et rien d'autre ne bouge.
 *
 * En attendant, le fond n'est ni un trou ni un cadre en attente : c'est le
 * champ anthracite du site, froid et continu, réchauffé en bas à droite. Un
 * hero sobre et pleinement composé, qui ne promet aucune image absente.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─── AUCUNE PHOTOGRAPHIE N'A ÉTÉ FABRIQUÉE ───────────────────────────────
 * Le projet n'en contient aucune. Il n'y a ici ni image générée, ni photo de
 * banque d'un pavillon quelconque, ni chantier attribué à l'entreprise sans
 * preuve. Une image inventée en haut d'un site d'artisan détruit exactement
 * la crédibilité qu'elle prétend construire.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Photographie du hero.
 *
 * ─── LE SEUL ENDROIT À MODIFIER ───
 * Déposer le fichier dans `public/photos/`, renseigner les champs, et le
 * hero devient photographique. Rien d'autre n'est à toucher.
 *
 * ─── CE QU'IL FAUT COMME PHOTO ───
 * Format paysage, 2400 px de large au minimum. Le SUJET doit se tenir dans
 * la moitié DROITE du cadre : la gauche est recouverte par le voile et doit
 * rester vide, ou n'accueillir que du fond — mur, ciel, local technique.
 *
 * Sujets qui fonctionnent : une unité extérieure ou une pompe à chaleur en
 * façade, un technicien au travail sur une installation, un groupe
 * frigorifique en toiture, une chambre froide en service.
 *
 * Lumière naturelle, cadrage droit, aucune retouche spectaculaire. Une
 * photographie honnête d'un vrai chantier vaut mieux qu'une image parfaite.
 *
 * ─── LE RECADRAGE ───
 * Il n'est PAS une donnée ici : il est écrit en toutes lettres sur l'image,
 * en deux classes (`object-[…]` et `lg:object-[…]`). Tailwind ne génère que
 * les classes qu'il lit dans le source — une valeur calculée à l'exécution
 * ne produirait aucun style. Les deux valeurs sont commentées sur place.
 */
const PHOTO: {
  src: string;
  alt: string;
} | null = {
  /**
   * ─── PHOTOGRAPHIE PROVISOIRE ───────────────────────────────────────────
   * Vraie photographie, prise par un photographe. Ce n'est ni une image
   * générée, ni un rendu 3D.
   *
   * Ce n'est pas un chantier de Techno Froid Chaud, et rien sur la page ne
   * le laisse entendre : le texte de remplacement décrit une installation,
   * il n'en attribue aucune. Aucune légende, aucune date, aucun client,
   * aucune mention dans /realisations. **À remplacer dès que les prises de
   * vue de l'entreprise seront disponibles.**
   *
   * ─── POURQUOI CELLE-CI ───
   * Retenue après comparaison d'une vingtaine de candidates sur Unsplash,
   * Pexels, Pixabay et Wikimedia Commons — uniquement des sources gratuites
   * à usage commercial.
   *
   *   AUCUNE MARQUE LISIBLE. C'est le critère qui a éliminé presque tout le
   *   reste : Daikin sur la façade retenue au tour précédent, Carrier sur le
   *   technicien américain, alpha innotec sur les pompes à chaleur, VITAL
   *   ENERGY sur le gilet du technicien britannique, Viessmann et Mitsubishi
   *   sur Wikimedia.
   *
   *   LA PALETTE EST NATIVE. Le bleu-pétrole de la photographie est déjà
   *   celui du site : elle n'a reçu AUCUN étalonnage, ni assombrissement, ni
   *   désaturation, ni virage. Seul le recadrage a été appliqué.
   *
   *   LE PROPOS S'ÉLARGIT. Une batterie de condenseurs en toiture dit le
   *   froid commercial et l'installation professionnelle, là où la façade
   *   multi-split précédente ne parlait que de climatisation.
   *
   * Ce qu'elle n'a pas : personne à l'image. Constat assumé — aucune photo
   * gratuite ne réunissait « technicien européen identifiable, installation
   * réelle, aucune marque ». Plutôt aucun personnage qu'un mauvais.
   *
   * ─── RECADRAGE D'ORIGINE ───
   * La source est verticale (3840 × 5759). On en a tiré la bande basse —
   * celle où deux plans d'unités se superposent, donc celle qui donne de la
   * profondeur — centrée à 58,25 % de la hauteur.
   *
   * Puis 8 % ont été rognés sur le BORD DROIT. C'est un réglage de
   * composition, pas de cadrage : l'image et la bande sont les mêmes, mais
   * tout le contenu glisse vers la droite d'autant. Le bloc blanc et sa
   * première hélice commençaient à 15 % de la largeur, c'est-à-dire en
   * plein sous le H1 ; ils démarrent maintenant après lui, et les trois
   * lignes du titre reposent sur du sombre.
   *
   * Pourquoi rogner l'image plutôt que régler `object-position` : l'asset
   * et le hero ont le MÊME rapport (2,051). À 1440 × 702 l'image entre
   * exactement dans le cadre, il n'y a donc aucun débordement horizontal à
   * faire glisser — `object-position` y est sans effet. Il ne reprend la
   * main qu'aux autres proportions d'écran, où il sert toujours.
   */
  src: '/photos/toiture-technique.jpg',
  alt:
    'Batterie de condenseurs de climatisation et de réfrigération installée ' +
    'en toiture d’un bâtiment professionnel.',
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0c141c] text-white">
      {/* ————— LE FOND ————— */}
      {PHOTO ? (
        /**
         * Le recadrage suit la largeur.
         *
         * Sur grand écran la photographie s'affiche presque en entier : son
         * rapport est celui du hero, et 62 % suffit à garder les grandes
         * hélices dans le tiers droit tout en laissant la zone sombre à
         * gauche sous le texte.
         *
         * Sur téléphone, le cadre devient étroit et haut : à 62 % on ne
         * verrait plus que le vide sombre du premier plan. On pousse donc à
         * 88 % pour ramener les hélices — le sujet — dans le champ. À 80 %
         * elles étaient encore coupées par le bord droit.
         *
         * Un écran étroit n'est pas un écran large en plus petit : c'est un
         * autre cadrage de la même photographie.
         */
        <>
          <Image
            src={PHOTO.src}
            alt={PHOTO.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[88%_50%] lg:object-[62%_50%]"
          />

          {/* ————— LA VIDÉO —————
              Elle se pose SUR la photographie, qui reste dessous et lui sert
              de socle : premier écran peint immédiatement, repli propre si la
              vidéo n'arrive pas, et rien ne démarre en mouvement réduit.

              ─── LE FICHIER A ÉTÉ RECADRÉ, ET POURQUOI ───
              La source d'origine (1280 × 720) portait un FILIGRANE incrusté :
              une étoile à quatre branches de 48 × 48 px, exactement à 96 px
              du bord droit et 96 px du bas — des valeurs rondes qui trahissent
              un placement programmatique, et non un élément de la scène.
              Mesuré par le minimum temporel sur vingt images : le filigrane
              est identique sur toutes, la scène ne l'est pas.

              Il tombait dans le champ entre 1024 et 1600 px de large, donc sur
              la majorité des postes de bureau.

              Le fichier est donc rogné à 1128 × 720 — 144 px retirés à droite,
              plus 8 px de marge. C'était le seul axe possible : dégager le
              coin par le bas aurait coûté 144 px de hauteur, soit le socle
              entier de la machine. À droite, on ne perd que du mur sombre et
              une gaine. Le détecteur qui trouvait la marque sur l'original ne
              trouve plus rien sur le fichier recadré.

              La piste audio a été supprimée : la vidéo est muette et
              `aria-hidden`, elle ne servait à rien. 4,72 Mo → 2,76 Mo.

              Cadrage : `object-center` aux deux largeurs, désormais VÉRIFIÉ à
              l'écran à 1440, 1024, 768, 430 et 375 px. La vidéo couvre le
              cadre partout ; elle n'est agrandie qu'au-delà de ~1155 px
              (1,28 à 1440), et se trouve à l'échelle native ou réduite en
              dessous. */}
          <HeroVideo src={VIDEO} className="object-center" />
        </>
      ) : (
        <>
          {/* Sans photographie : le champ anthracite du site.
              Froid et continu — aucune découpe, aucune couture. Une arête
              franche en travers d'un premier écran fait deux panneaux, pas
              une lumière : c'est l'un des signes qui trahissent la maquette. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(168deg,#1f3244_0%,#162430_44%,#101820_78%,#0c141c_100%)]"
          />
          {/* La seule touche chaude du premier écran — le chauffage. Basse,
              à droite, rasante, éteinte avant les bords. Elle se devine ;
              elle ne se lit pas comme un dégradé. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(100%_80%_at_88%_112%,rgba(120,88,54,0.3)_0%,rgba(70,55,38,0.15)_36%,rgba(12,20,28,0)_70%)]"
          />
        </>
      )}

      {/* ————— LE VOILE —————
          Il vient de la gauche et s'éteint au milieu : le texte repose sur
          une surface pleine, l'image garde sa moitié droite lisible.

          Sur téléphone, le sujet passe SOUS le texte : le voile devient
          donc vertical, opaque en haut, dégagé en bas. Sans cette bascule,
          un voile latéral couvrirait précisément la partie de la photo
          qu'on veut montrer sur un écran étroit. */}
      {/* Le voile n'existe QUE s'il y a une photographie à voiler.
          Appliqué au champ anthracite, il l'écrasait en noir plat : la
          dérive froide vers chaude disparaissait, et le premier écran
          devenait un aplat sombre sans lumière. On ne voile pas un fond,
          on voile une image. */}
      {PHOTO ? (
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,17,24,0.94)_0%,rgba(10,17,24,0.82)_42%,rgba(10,17,24,0.35)_100%)] lg:bg-[linear-gradient(to_right,rgba(10,17,24,0.95)_0%,rgba(10,17,24,0.88)_34%,rgba(10,17,24,0.45)_62%,rgba(10,17,24,0.12)_100%)]"
        />
      ) : null}

      {/* Voile de tête. L'en-tête est transparent au-dessus du hero : posée
          sur une photographie, sa navigation blanche peut tomber sur une
          zone claire et devenir illisible. Ce dégradé court sur 160 px et
          ne sert qu'à cela. */}
      {PHOTO ? (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(8,14,20,0.72)_0%,rgba(8,14,20,0.3)_55%,rgba(8,14,20,0)_100%)]"
        />
      ) : null}

      {/* ————— LE BORD DE PLANCHE —————
          Une réglette graduée dans la gouttière gauche, posée dans le vide
          sombre qui borde le texte.

          ─── POURQUOI ELLE EXISTE ───
          Le reste du site est DESSINÉ : chaque page métier porte sa planche
          technique, l'accueil sa coupe de bâtiment. Le hero, lui, est
          photographique — c'est le seul écran du site qui ne relève pas du
          bureau d'études, et il s'ouvre dessus.

          Cette réglette est le bord d'une feuille à dessin. Elle ne décrit
          rien, ne mesure rien, n'annonce aucune valeur : elle dit seulement
          que ce qu'on regarde appartient à la même feuille que la coupe qui
          vient deux écrans plus bas. C'est un raccord, pas un ornement.

          ─── AUCUN CHIFFRE, ET C'EST LA MÊME RÈGLE QU'AILLEURS ───
          Des graduations sans valeurs : exactement la convention des autres
          planches, dont les cartouches annoncent « axe non gradué » et
          « cadrans de principe ». Une échelle chiffrée ici supposerait une
          grandeur, et le hero n'en porte aucune.

          ─── CE QU'ELLE NE FAIT PAS ───
          Elle ne bouge pas, ne brille pas, n'a pas de couleur propre —
          du blanc à 9 et 14 %, sur le voile le plus sombre du hero. Elle
          s'arrête au-dessus des boutons et sous l'en-tête, donc elle ne
          croise ni le titre, ni les liens, ni la zone cliquable.

          `lg:` seulement : sous 1024 px la gouttière se referme et le sujet
          de la photographie passe sous le texte. Il n'y a plus de vide à
          border, et une réglette y serait dans le champ, pas dans la marge.

          Deux éléments superposés plutôt qu'un seul : les petites
          graduations tous les 26 px, les grandes tous les 130 px. Un seul
          dégradé ne sait pas produire deux longueurs de trait. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-36 bottom-24 left-3 hidden w-1.5 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.14)_0_1px,transparent_1px_26px)] border-l border-white/[0.09] lg:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-36 bottom-24 left-3 hidden w-3.5 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.2)_0_1px,transparent_1px_130px)] lg:block"
      />

      <div className="container-t relative flex min-h-[82svh] items-center pt-28 pb-16 lg:min-h-[78vh] lg:pt-32 lg:pb-20">
        <div className="w-full max-w-xl lg:max-w-[38rem]">
          <p className="text-[0.98rem] text-white/70">Frigoriste · Chauffagiste</p>

          {/* La césure est écrite, pas déduite : la coupe en trois temps
              fait partie du message au même titre que les mots. Elle ne
              s'applique qu'au-delà de 1024 px — sur téléphone la ligne se
              replie seule, et y imposer une coupe d'écran large produirait
              des lignes orphelines. */}
          <h1 className="heading mt-5 max-w-[13ch] text-[clamp(2.3rem,7.6vw,3.1rem)] leading-[1.06] text-white lg:max-w-none lg:text-[clamp(2.5rem,3.6vw,3.5rem)]">
            Le confort
            <br className="hidden lg:inline" />{' '}
            thermique, maîtrisé
            <br className="hidden lg:inline" />{' '}
            toute l’année.
          </h1>

          <p className="mt-7 max-w-md text-[1.05rem] leading-8 text-white/85 lg:text-[1.1rem]">
            Climatisation, chauffage, réfrigération et chambres froides.
          </p>
          <p className="mt-2 max-w-md text-[0.98rem] leading-7 text-white/55">
            Intervention à {company.city}, {company.primaryArea} et dans le
            secteur.
          </p>

          {/* Les deux façons d'entrer en contact, au même niveau. Dans ce
              métier l'appel reste le premier canal : le téléphone est donc
              composé au corps d'un titre, pas relégué en petit lien. */}
          <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-4">
            <Link href="/contact" className="btn btn-primary btn-arrow">
              Demander un devis
            </Link>
            <a
              href={company.phoneHref}
              className="heading -my-2.5 inline-flex items-center py-2.5 text-[1.35rem] text-white underline-offset-[6px] hover:underline lg:text-[1.5rem]"
              aria-label={`Appeler le ${company.phone}`}
            >
              {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
