# Techno Froid Chaud — site

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 ·
React Three Fiber 9 · Framer Motion · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 21 pages statiques
npm run start    # serveur de production
```

## Organisation

```
app/                 une route par page + sitemap, robots, 404
components/
  layout/            Header, Footer, Breadcrumb, SmoothScroll
  sections/          sections de page, sans logique métier
  scene/             couche 3D — voir plus bas
  ui/                composants du design system
content/             TOUT le texte du site, typé
lib/                 SEO, cascade d'animation, progression de défilement
public/hdri/         sondes d'éclairage CC0 + licences
```

**Tout le contenu éditorial vit dans `content/`.** Aucune chaîne n'est codée
en dur dans le JSX : pour modifier un service, une commune ou une question de
FAQ, c'est le seul dossier à ouvrir.

## Le design system

`app/globals.css` contient l'intégralité des jetons : palette issue du logo,
échelle typographique, espacement de base 4, grille, boutons, champs, courbes
d'animation. Toute valeur hors de ces échelles est un défaut, pas une
exception.

## La couche 3D

Quatre scènes, toutes procédurales.

| Scène | Page | Storyboard |
| --- | --- | --- |
| `HeroScene` | Accueil | P01 — approche de la villa |
| `SalonScene` | Climatisation | P03–P05 — salon, unité murale, diffusion |
| `OutdoorScene` | Pompes à chaleur | P07–P08 — module hydraulique, unité extérieure |
| `ColdRoomScene` | Réfrigération | P10–P11 — cuisine professionnelle, chambre froide |

### Pourquoi procédural

Les bibliothèques gratuites disponibles (Kenney, Quaternius, Poly Pizza) sont
*low-poly stylisées* : une maison « cartoon » aurait détruit le positionnement
haut de gamme. Les catalogues photoréalistes (KitBash3D, CGTrader) sont
payants et n'ont pas été acquis. L'architecture est donc construite en
primitives, avec des proportions réelles et des matériaux physiquement
corrects ; le réalisme vient de l'éclairage HDRI et de la retenue, pas de la
densité de maillage.

**Pour passer aux modèles sous licence**, remplacer le contenu de chaque
`scenes/*.tsx` par un `useGLTF()` : le socle `Stage.tsx`, la caméra, le
chargement différé et les replis restent valables tels quels.

### Ce qui protège les Core Web Vitals

- **three.js n'est dans aucun paquet initial.** Vérifié : la page d'accueil
  de production ne référence ni `three`, ni `fiber`, ni `drei`. Chaque scène
  est un import dynamique déclenché par l'entrée en vue.
- **Aucun WebGL sur mobile.** `SceneMount` exige `(min-width: 1024px) and
  (pointer: fine)`. Un téléphone ne télécharge ni three.js ni HDRI.
- **`frameloop="demand"`.** La scène ne rend pas en continu : une image n'est
  calculée que si le défilement ou la souris ont bougé. À l'arrêt, la
  consommation GPU est nulle.
- **Mise en sommeil hors champ.** Une scène sortie de l'écran cesse de
  demander des images, même si elle reste montée.
- **`prefers-reduced-motion`** empêche tout montage de scène.
- **Repli statique** — un dégradé accordé à la tonalité de la scène, présent
  dès le premier rendu. Jamais de vide, jamais de saut de mise en page.
- **HDRI en cache immuable** un an, ~1,4 Mo chacune, jamais servies au
  premier rendu.

## À fournir avant la mise en ligne

1. **Le logo en vectoriel** (`/public/logo.svg`). `components/ui/Logo.tsx`
   affiche pour l'instant le nom composé en typographie — aucun symbole n'a
   été créé. Le fichier documente l'échange en une ligne. Le vectoriel fixera
   aussi les valeurs exactes du bleu et du rouge dans `globals.css`.
2. **Les six champs `[À COMPLÉTER]` des mentions légales** — capital social,
   TVA, assurance décennale, hébergeur, médiateur. Ils sont obligatoires.
3. **Une adresse e-mail au nom de domaine.** `content/company.ts` porte
   aujourd'hui l'adresse personnelle du dirigeant, telle qu'affichée sur
   l'ancien site.
4. **Les photographies.** Chaque emplacement affiche son brief de prise de
   vue (référence `PV 01` à `PV 08`, cadrage, lumière, focale). Remplacer les
   `<PhotoSlot>` par des `<Image>` en conservant le ratio.
5. **Les fontes sous licence.** Neue Haas Grotesk et ABC Diatype Mono. Le
   site tourne sur une pile de repli métriquement proche ; le point
   d'insertion unique est en tête de `app/globals.css`.
6. **Le formulaire de contact.** `ContactForm` n'envoie rien et le dit
   explicitement à l'utilisateur. Brancher une route API interne avec Resend
   — aucun service tiers côté client, pour préserver l'absence de traceur.

## Ce que le site ne fait pas, volontairement

Aucun cookie non technique, aucune mesure d'audience, aucune carte
interactive tierce, aucune police servie depuis un CDN. C'est ce qui justifie
l'absence de bandeau de consentement, et c'est une décision d'architecture
documentée dans `/confidentialite`. **Ajouter un outil de mesure rendrait un
consentement préalable obligatoire.**
