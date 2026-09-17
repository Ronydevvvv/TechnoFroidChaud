## 0. Entreprise, Réalisations, et vérification globale

### `/entreprise` — le fonctionnement manquait

La page répondait déjà à quatre des cinq questions : qui (hero et repères
légaux), ce qu'on fait (quatre principes), les engagements (trois, développés)
et la zone (communes desservies). Le DÉROULÉ n'y figurait nulle part.

`Parcours` y est inséré entre les engagements et la zone, avec
`engagements={false}` — la page porte déjà sa propre section d'engagements,
la répéter deux écrans plus bas aurait fait exactement la redite que cette
passe supprime — et `ground="dark"`. Ce second réglage n'est pas décoratif :
en pierre, la section aurait suivi une autre section en pierre, et deux sols
identiques qui se suivent aplatissent la page. C'est d'ailleurs en anthracite
que l'accueil traite la méthode.

### `/realisations` — le chapô se contredisait

Il annonçait : « nous préférons attendre nos propres images plutôt que d'en
emprunter ». Depuis l'harmonisation, la page s'ouvre justement sur une photo
empruntée. Le texte dit désormais ce qui est vrai : « Les images qui
l'illustrent montrent du matériel, pas nos chantiers : les photographies de
nos propres poses les remplaceront. »

Rien d'autre n'a bougé : aucune réalisation n'est inventée, aucune photo
libre de droits n'est présentée comme un chantier de l'entreprise.

### Les grilles de cartes ont disparu

C'était le dernier motif « composant générique » du site. `TradeItems` —
quatre encadrés identiques sur quatre pages métier, seize boîtes au total —
et les deux grilles de `/entreprise` passent au filet numéroté de l'accueil.

Il reste **quatorze** `card` sur le site, toutes des panneaux ISOLÉS et non
des grilles répétées : la carte téléphone du dépannage, le bloc de contact,
les repères de la page PAC. Un panneau unique qui contient une information
d'une autre nature n'est pas un composant générique ; c'est une grille de
boîtes identiques qui l'est.

### SEO — deux défauts corrigés

`/chauffage` portait un `title` de 71 caractères, tronqué en résultat de
recherche : ramené à 48, la requête visée — « chauffagiste Forbach » — passe
en tête. `/mentions-legales` avait une `description` de 47 caractères, trop
courte pour être affichée : elle porte désormais la raison sociale, la forme
juridique et l'adresse.

### Vérification globale

| Contrôle | Résultat |
| --- | --- |
| Responsive | 7 largeurs × 12 pages — **84/84 sans défaut** |
| Débordement horizontal | aucun, à aucune largeur |
| Erreurs console / 404 | zéro |
| H1 | unique sur les 12 pages |
| Images | toutes chargées, toutes avec `alt` |
| Liens internes | 12 distincts, **tous en 200** |
| CTA | lien devis ET téléphone présents sur les 12 pages |
| En-tête, déroulant Services, pied de page | présents partout |
| `title` / `description` / canonical / OpenGraph | conformes sur les 12 pages |
| Données structurées | 1 à 4 blocs JSON-LD par page |
| Canvas WebGL | aucun |

`npm run build` → 17 pages.

---

## 0. Corps des pages métier

Ordre de lecture appliqué aux cinq pages métier : **solutions → pour qui →
installations et matériel → méthode → engagements → appel à l'action.**

### « Pour qui » existait déjà, et n'était affiché nulle part

`content/services.ts` porte un champ `audience` par métier — « Restauration,
commerces de bouche, laboratoires » pour la réfrigération, « Maisons
individuelles, rénovation » pour les pompes à chaleur. Il n'était rendu sur
aucune page : les pages disaient ce qu'elles installaient, jamais pour qui.
Il s'affiche désormais sous le chapô des prestations. **Aucun public n'a été
inventé** : le champ existait, il est simplement branché.

Sur `/refrigeration` et `/chambres-froides`, une section « Pour qui » séparée
aurait répété leur tableau d'usages — qui porte déjà les applications
réelles, plage de température par plage. Elle n'a donc pas été ajoutée : ces
tableaux SONT le palier « pour qui ».

### Méthode et engagements : un seul palier, compact

Nouveau composant `components/sections/Parcours.tsx`, avant l'appel à
l'action des cinq pages métier. Il réunit les deux questions de fin de
parcours — « comment ça se passe ? » puis « pourquoi vous ? » — sur un même
sol. Séparées en deux sections pleine hauteur, elles étiraient la page et le
visiteur décrochait avant le devis.

**Compact, parce que ce n'est pas la page qui porte ce contenu** : seuls les
NOMS des six étapes, sur un filet numéroté, puis les cinq engagements en une
ligne de puces. Le visiteur d'une page métier ne vient pas apprendre la
méthode, il vérifie qu'elle existe. Un lien renvoie au détail. Chaque page
passe une phrase d'introduction qui lui est propre — ce que la visite relève
sur CE métier.

### La duplication des six étapes est supprimée

Elles étaient écrites en dur dans `components/home/Methode.tsx`. Les rappeler
sur cinq pages aurait signifié six copies d'un même texte : on corrige un mot
sur l'accueil, il reste faux ailleurs. Elles vivent désormais dans
**`content/methode.ts`**, source unique de l'accueil et des pages métier.

### Répétitions retirées

`Signature` — « Ce qui décide de tout », sur le dimensionnement — figurait sur
`/climatisation` juste après la section « Ce que la visite technique
relève », qui dit la même chose. Retirée de cette page.

### Correction de cohérence sur l'accueil

La section méthode reçoit `id="methode"` et `scroll-mt-24`. Sans elle, les
cinq liens « Le détail de chaque étape » des pages métier tombaient en haut
de l'accueil. Vérifié : le lien atterrit à 96 px du haut, soit juste sous
l'en-tête fixe. C'est la seule modification apportée à l'accueil.

### Vérifié

12 routes × 2 largeurs (1440 et 375) : aucun débordement horizontal, H1
unique partout, zéro erreur console, zéro 404, toutes les images avec leur
`alt`, aucun canvas. `npm run build` → 17 pages.

`/chauffage` passe de 3 519 à 4 143 px — c'était la page la plus maigre du
site, elle porte enfin un déroulé et des engagements. `/climatisation`
descend de 4 678 à 4 555 px malgré ces ajouts, la répétition retirée
compensant.

---

## 0. Harmonisation du site

Toutes les pages partagent désormais la direction de l'accueil.

### Le levier : une variante `photo` sur `PageHero`

Le composant l'annonçait dans son propre commentaire — « quand les photos
arriveront, une variante s'ajoutera ici sans toucher aux pages ». C'est fait.
Une page passe `variant="photo"` et un objet `photo`, rien d'autre.

Elle rejoue le dispositif de l'accueil à l'échelle d'une page intérieure :
photographie en fond, voile latéral sur grand écran et vertical sur
téléphone, fil d'Ariane, sur-titre à filet d'accent, H1, chapô, puis devis +
téléphone. Même grammaire, hauteur moindre — une page intérieure ne rejoue
pas l'ouverture du site.

Neuf pages l'utilisent : entreprise, climatisation, chauffage, pompes à
chaleur, réfrigération, chambres froides, réalisations, dépannage, contact.

### Dépannage garde sa spécificité

`urgence` inverse l'ordre des actions : le téléphone devient le bouton, le
devis le lien secondaire. Sur une panne, on appelle, on ne remplit pas un
formulaire. Le filet du sur-titre y est rouge — seul emploi de l'alerte sur
le site, comme le voulait le design system. Son ancien hero sur mesure, une
carte blanche ombrée, a disparu.

### La 3D a quitté le site

`/chambres-froides` et `/refrigeration` portaient la scène three.js. Le
CYCLE FRIGORIFIQUE qu'elle illustrait est conservé — c'était l'information,
la scène n'en était que l'habillage — et il est désormais porté par une
photographie et du texte, donc lisible sur téléphone, où il ne l'était
jamais : la scène n'y était pas montée, et la moitié des visiteurs voyait un
cadre vide.

**Supprimés** : `components/scene/`, `public/3d/` (deux GLB et trois `.skp`),
`public/draco/`, et les dépendances `three`, `@react-three/fiber`,
`@react-three/drei`, `@types/three`. Plus aucun canvas WebGL nulle part.

### Un seul signe pour annoncer une section

`SectionHeading` servait un sur-titre coloré, l'accueil un filet d'accent
devant un libellé gris. Deux façons d'annoncer une section sur un même site.
C'est le filet qui l'emporte — un libellé coloré se confond avec un lien, un
filet ne se confond avec rien. Changé dans le composant, donc propagé à
toutes les pages ; les six sur-titres écrits en dur ailleurs ont suivi.

### Vérifié

13 routes × 2 largeurs (1440 et 375), y compris la page 404 : **aucun
débordement horizontal, H1 unique partout, zéro erreur console, zéro 404,
aucun lien vide, toutes les images chargées avec leur `alt`, aucun canvas.**
`npm run build` → 17 pages.

---

## 0. Refonte de l'accueil

### Structure — chaque section répond à UNE question

| Section | Question à laquelle elle répond | Sol |
| --- | --- | --- |
| Hero | que faites-vous, comment vous joindre ? | photo sombre |
| Repères | qui, depuis quand, où ? | blanc |
| **Nos métiers** | **que savez-vous faire ?** | **acier** |
| Publics | est-ce que ça me concerne ? | pierre |
| Nos installations | qu'est-ce que je reçois ? | blanc |
| Méthode 01→06 | comment ça se passe ? | pierre |
| Engagements | pourquoi vous ? | blanc |
| Zone | intervenez-vous chez moi ? | pierre |
| Appel final | comment je vous contacte ? | anthracite |

L'acier des « Métiers » est le seul grand aplat sombre du corps de page : la
section la plus importante est la plus visible, sans qu'aucun effet n'ait à
le signaler.

L'appel à l'action revient **trois fois** — hero, bas de « Nos installations »
(au moment où le visiteur vient de comprendre ce qu'il reçoit), clôture.
Jamais entre deux sections sans rapport.

### Le modèle 3D a quitté l'accueil

« Nos installations » portait la scène three.js. Remplacée par une
photographie : c'est la seule section dont le rôle est de montrer du travail
réel, et un modèle prouve qu'on sait modéliser, pas qu'on sait poser.

**Plus aucun canvas WebGL sur l'accueil, à aucune largeur.** La scène
interactive complète reste sur `/chambres-froides` et `/refrigeration`, qui
n'ont pas été touchées. `components/scene/TechnicalPlate.tsx` et
`components/home/Domaines.tsx` sont supprimés — plus personne ne les
importait.

### Photographies

Huit au total sur l'accueil, toutes de vraies photographies sous licence
gratuite à usage commercial — **aucune générée, aucun rendu, aucune licence
achetée**. Provenance et licences dans **`public/photos/CREDITS.md`**.

**Elles illustrent un métier, elles n'attestent d'aucune réalisation.** Aucune
légende ne porte de commune, de date ni de client. C'est la règle qui tient
tout le reste : les réalisations ne sont pas confirmées (§16), donc rien n'en
est revendiqué.

Toutes sont provisoires. Les chemins sont regroupés en tête de
`Metiers.tsx` (un tableau) et de `Chantier.tsx` (une constante) : le jour des
vraies prises de vue, il n'y a que ces deux endroits à modifier.

### Hero — inchangé

Photographie, composition, H1, CTA, téléphone, voiles : rien n'a bougé. Voir
la section suivante pour son détail.

### Passe de rythme visuel

La page se lisait comme une pile de blocs éditoriaux. Quatre réglages, aucun
effet ajouté :

1. **Les filets entre sections sont supprimés.** Un `border-b` sous chaque
   section, c'est précisément ce qui fait lire une page comme un empilement.
   Le changement de sol sépare déjà.
2. **Deux ancrages sombres au lieu d'un.** « Méthode » passe sur acier : le
   corps de page alterne désormais blanc / ACIER / pierre / blanc / ACIER /
   blanc / pierre au lieu de dériver vers une longue queue claire.
3. **« Nos métiers » prend le dessus** — tuiles en 5:4 plutôt qu'en 4:3,
   titres à 1,4 rem, respiration portée à `py-28`. Au survol, un filet cyan
   se trace sous le titre, à la largeur du mot : c'est le seul emploi de
   l'accent dans la grille, il désigne la cible du clic.
4. **Respirations égalisées** à `py-24` sur les sections du corps, contre un
   mélange de `py-16` / `py-20` qui donnait un rythme métronomique.

Et « Nos installations » donne 7 colonnes sur 12 à la photographie contre 5
au texte : l'image domine, comme dans la presse. Le rapport inverse produit
une page de brochure.

### Passe de finition UX

Trois points, aucun effet ajouté.

**Publics devient une interface, pas un texte.** C'était la seule section
sans image, coincée entre deux sections visuelles : elle se lisait comme un
creux. Les prestations deviennent des LIGNES cliquables pleine largeur,
séparées de filets, flèche à droite — le vocabulaire de l'index du hero.
Un sur-titre nomme le public en clair (« Entreprises, commerces,
restaurants ») là où « Professionnels » seul demandait au visiteur de se
reconnaître dans une abstraction.

**Engagements devient une bande de preuve.** Cinq paragraphes rangés en
trois colonnes, personne ne les lit : à cet endroit on cherche à se rassurer
en trois secondes. Une phrase par engagement, cinq colonnes sur grand écran.
Les textes longs vivent sur les pages métier et `/entreprise`.

**Textes dégraissés.** Les six lignes de « Nos métiers » et les trois
livrables de « Nos installations » passent de deux lignes à une. Le titre
porte l'information, la phrase ne fait que la qualifier.

Résultat : **−271 px sur desktop et −282 px sur mobile** à contenu constant.

### En-tête — navigation desktop regroupée

Huit entrées à plat saturaient la barre : elle se lisait comme un sommaire,
et le bouton de devis — la seule action de l'en-tête — se noyait au milieu de
huit libellés de même poids.

Quatre entrées la remplacent : **Entreprise · Services · Réalisations ·
Dépannage**, puis le téléphone et le bouton. Les cinq métiers passent sous
« Services ».

**Ce que le regroupement coûte est compensé.** La règle d'origine disait
qu'un déroulant enterre les pages les plus rentables. C'est vrai : les cinq
métiers restent donc atteignables en un clic depuis la section « Nos
métiers » de l'accueil, le pied de page (toutes les pages) et le menu mobile
— inchangé, toujours à plat. Aucune URL n'a changé.

**Points de bascule ramenés en arrière** — quatre entrées tiennent là où huit
se cassaient : la barre desktop apparaît dès **1024 px** (contre 1280), le
téléphone dès **1280 px** (contre 1600), et le menu burger recule à 1023 px.

**Le déroulant, trois comportements.** Un gestionnaire unique se
contredisait — le survol ouvrait, le clic refermait aussitôt, et « Services »
était inutilisable à la souris :

| | |
| --- | --- |
| souris | survol seul ; le clic ne referme pas |
| tactile | bascule au `pointerdown` |
| clavier | le focus ouvre, Tab hors du groupe et Échap referment, Entrée rouvre |

**Apparence du panneau.** `invisible` remplace l'attribut `hidden` : les deux
retirent l'élément du parcours de tabulation et le cachent aux lecteurs
d'écran, mais `hidden` ne se transitionne pas — le panneau surgissait. La
visibilité, l'opacité et un décalage de 4 px s'animent maintenant ensemble
sur 180 ms.

Le reste tient en quatre détails : filet à 14 % d'opacité, ombre portée
courte et très diffuse (elle décolle le panneau de la photographie du hero
sans se voir comme une ombre), `backdrop-blur` sur l'état sombre pour
s'accorder à l'en-tête défilé, et surtout un **fond de survol INSET** — il
ne touche jamais le filet du panneau. C'est ce dernier point qui sépare un
menu d'entreprise d'un menu système, où la surbrillance file d'un bord à
l'autre. Une flèche dans l'accent apparaît au survol, sur deux pixels.

Vérifié en navigateur réel : ouverture au survol, au focus, au tap ;
fermeture par Échap, clic au-dehors, changement de page ; tabulation qui
entre bien dans le panneau ; navigation effective vers `/pompes-a-chaleur` ;
« Services » marqué actif sur les cinq pages métier ; les cinq liens
répondent 200.

### Vérifié

`npm run build` → 17 pages. Sept largeurs (1920, 1440, 1280, 768, 390, 375,
360) : **aucun débordement horizontal, zéro erreur console, zéro 404, H1
unique, aucun lien vide, 8 images chargées avec leur `alt`, aucun canvas.**

---

## 1. État en une phrase

L'accueil a été refondu en direction anthracite/acier, la 3D interactive est
en ligne et vérifiée, et **plus aucun placeholder gris n'apparaît sur la page
d'accueil**. Les pages intérieures gardent l'ancienne direction claire : c'est
le chantier ouvert.

### Ce qui a été DÉPOSÉ, et pourquoi

Le client a jugé la direction précédente trop « concept généré ». Il avait
raison : elle cherchait à paraître technique par le graphisme au lieu de
laisser le métier le faire.

| Retiré | Motif |
| --- | --- |
| `Blueprint.tsx` — coupe cotée | Faux schéma décoratif |
| `TechSpec.tsx` — fiches clé/valeur | Répétition de composant |
| IBM Plex Mono | Chasse fixe partout = look tableau de bord |
| `.tech`, `.tech-label`, `.rule-tech` | Micro-labels et filets sans fonction |
| Trames quadrillées de fond | Décor pur |
| `overline` en capitales espacées | Le tic le plus reconnaissable, 20 occurrences |
| Section « typologies » | Doublon des métiers, deux titres identiques |

### Panneaux vides — supprimés

Les quatre métiers portaient chacun un grand visuel sombre en attente de
photo. Quatre fois le même gabarit image/titre/texte/lien : c'est ce qui
donnait l'impression de gabarit.

Les quatre métiers ont désormais **quatre compositions différentes**, qui
tiennent sans aucune image :

| Métier | Composition |
| --- | --- |
| Climatisation | Bande sombre pleine largeur + trois sous-types |
| Pompes à chaleur | Deux colonnes — ce qu'on relève avant de chiffrer |
| Réfrigération | Températures de service en gros chiffres bleus |
| Chambres froides | Bande sombre qui renvoie à l'expérience 3D |

**Plus aucun grand rectangle vide sur l'accueil.**

### BUG CORRIGÉ — pivot des turbines

Les rotors étaient exportés avec leur origine à (0, 0, 0). Le maillage
s'affichait au bon endroit, mais toute rotation se serait faite autour du
centre de la pièce : des pales en orbite de deux mètres.

Cause : `matrix_parent_inverse` est **ignoré par l'exportateur glTF**. Le
défaut était invisible dans Blender, visible seulement dans le GLB.
Correctif : les sommets sont translatés pour centrer le maillage sur le
pivot (`turbine.data.transform`), l'inverse est neutralisé, la position
locale remise à zéro. Vérifié : `local=(0,0,0)`, `monde=(0.03, 2.09, 2.25)`.

### Piste explorée puis abandonnée — rendus serrés

Objectif : remplacer les panneaux vides par des gros plans rendus
(évaporateur, compresseur). Le cadrage par nom de nœud a été ajouté à
`render_stills.py` et fonctionne (`focus_camera`).

**Mais le carter de l'évaporateur masque les turbines** : tous les cadrages
serrés ne rendent qu'une paroi blanche. Le modèle n'expose pas ses organes.
Piste laissée de côté ; `focus_camera` est conservé, il resservira si un
modèle plus détaillé arrive.

### Périmètre d'activité — corrigé

Le nouveau site avait **écarté le chauffage et les chaudières**. Vérification
faite sur techno-froid-chaud.fr, c'était une erreur : l'entreprise s'y
présente comme « Technicien, **frigoriste-chauffagiste** » et annonce la
réparation et l'installation de chaudières, ainsi que « services de
chauffagiste » et « experts en chauffage, pompes à chaleur et systèmes
thermiques ».

Rétabli : métier `chauffage` dans `content/services.ts`, page `/chauffage`,
entrée de navigation, cinquième expertise sur l'accueil, métadonnées,
pied de page et hero. **Aucune prestation inventée** — tout provient de leur
propre site.

### Passe de direction artistique — dernière étape

- **Hero** : le visuel 3D sort du conteneur et occupe 52 % de l'écran en
  pleine hauteur, avec un fondu vers la gauche. La barre de légende a été
  supprimée : c'est elle qui le faisait lire comme une fenêtre Three.js.
  Titre porté à 4,2 rem, description ramenée à deux lignes.
- **Expertises** : quatre corps typographiques différents au lieu de quatre
  items identiques. Climatisation à 4,6 rem, PAC et Réfrigération à 2,7 rem
  côte à côte, Chambres froides à 3,6 rem. Filets et flèches répétés retirés.
- **Preuve** : la phrase occupe 9 colonnes, les liens tombent en pied de la
  dixième. L'angle bleu vide a disparu.
- **Zone** : « Forbach » composé à 7 rem — le nom de la ville EST le visuel.
  Les autres communes passent en texte courant, plus de liste SEO.
- **Header** : il déborde­ait de 8 px à 1440 et de 104 px à 1280. Il n'est
  plus bridé à 82 rem et le téléphone n'apparaît qu'au-delà de 1400 px.
  Vérifié sans débordement sur onze largeurs.

### Accueil — réduit de 60 %

| | Avant | Après |
| --- | --- | --- |
| Hauteur | 9 862 px | **3 962 px** |
| Écrans (1440×900) | 11 | **4,4** |
| Sections | 8 | **6** |

Chaque section était correcte ; l'ensemble se lisait comme une encyclopédie.
Une page d'accueil d'entreprise est une vitrine.

**Où est parti le contenu retiré :**

| Section supprimée | Destination |
| --- | --- |
| « Le dimensionnement, avant le catalogue » | `/climatisation` |
| Les quatre développements métier | pages métier |
| Expérience 3D + cycle frigorifique | `/chambres-froides` |
| « Comment nous travaillons » | `/entreprise` |
| « L'entreprise en bref » (repères) | supprimée |

**Rythme des surfaces** — c'est lui qui structure la page, pas les filets :
anthracite → blanc → **bleu profond** → blanc → pierre → anthracite.
Le bleu profond de la section « preuve » est le seul aplat coloré du site.

**Composants supprimés** : `Trades`, `Realisations`, `Reperes`, `TrustBar`,
`TradeVisual`.

### Pages intérieures — reprises

`PageHero` portait un cadre photo : chaque page intérieure s'ouvrait donc
sur le même grand rectangle vide. Il est supprimé et remplacé par **trois
variantes** (`plain`, `split`, `dark`) pour que les pages ne se ressemblent
pas.

| Page | Hero | Ce qui remplace le cadre vide |
| --- | --- | --- |
| `/entreprise` | plain | Liste des communes réellement desservies |
| `/climatisation` | split | « Ce qui sépare deux devis au même prix » |
| `/pompes-a-chaleur` | split | Aparté éditorial dans le hero |
| `/refrigeration` | split | « Ce que nous demandons au téléphone » |
| `/chambres-froides` | split | **Page créée** — usages, 3D, vigilance |
| `/realisations` | plain | Typologies + zone d'intervention |
| `/entretien-depannage` | propre | Carte téléphone (déjà bonne) |
| `/contact` | propre | Inchangée, formulaire honnête |

**`/chambres-froides` est une création.** « Chambre froide » est la requête
la plus cherchée du secteur et n'existait qu'en sous-partie de
`/refrigeration`, donc invisible pour un moteur. C'est la seule page qui
porte l'expérience 3D, et pour une raison : une chambre froide est un volume
qu'on ne peut pas photographier de l'extérieur.

**Faux chantiers supprimés.** Les six réalisations non confirmées, leurs six
routes `/realisations/[slug]` et `ProjectsGrid` ont été retirés du projet.

### Ce qui porte la direction actuelle

Photographie (à venir), volume 3D, typographie, composition. Rien d'autre.

- **Palette** : anthracite bleuté `#141a21` au lieu du quasi-noir, blanc cassé
  `#f4f3f0`, bleu pétrole `#14657f` en accent unique.
- **Hero** : la scène 3D **vivante** occupe 7 colonnes sur 12. Montée après le
  premier rendu via `requestIdleCallback`, desktop et pointeur fin seulement.
- **Métiers** : bandes éditoriales alternées, image large d'un côté, texte de
  l'autre. Format déjà calé sur les prises de vue demandées.
- **Matériaux 3D requalifiés à l'exécution** (`requalify()` dans
  `models.tsx`) : les GLB sortaient en orange vif et cyan saturé, couleurs par
  défaut de la bibliothèque SketchUp. Teinte conservée, chroma coupé,
  comportement de surface attribué d'après la luminance. Sans cela la scène
  ressemblait à une capture SketchUp.

**Ordre de l'accueil :** hero → dimensionnement → métiers → **3D** →
comment nous travaillons → méthode → repères → appel final.

---

## 2. Ce qui est terminé

| Bloc | État | Preuve |
| --- | --- | --- |
| Structure Next.js 15 / React 19 / TS strict | fait | `npm run build` → 21 pages statiques |
| Design system (`app/globals.css`) | fait | jetons couleur, typo, espacement, grille |
| Contenu éditorial sorti du JSX (`content/`) | fait | 4 fichiers typés, aucune chaîne en dur |
| Pages métier (clim, PAC, réfrigération, dépannage) | fait | 4 routes + FAQ + JSON-LD |
| Réalisations + pages détail | fait | 6 routes SSG via `generateStaticParams` |
| Pages légales (mentions, confidentialité) | fait | 6 champs `[À COMPLÉTER]` restants |
| SEO (sitemap, robots, LocalBusiness, FAQPage) | fait | `lib/seo.ts` |
| Coordonnées réelles du client | fait | tél., e-mail, adresse Morsbach |
| **Diagnostic Blender automatisé** | **fait** | `scripts/blender/inspect_scene.py` + 3 rapports JSON |

**Poids actuel :** 146 kB de JS au premier chargement, sur toutes les pages.

---

## 3. Ce qui est en cours

Rien n'est à moitié écrit. L'accueil est complet et cohérent ; le chantier
suivant est la reprise des pages intérieures dans la même direction.

---

## 4. Ce qui reste

Par ordre de valeur décroissante.

1. **README à corriger** — il décrit quatre scènes 3D, `components/scene/`,
   `public/hdri/` et des dépendances `three` qui n'existent pas sous cette
   forme.
4. **Formulaire de contact** — branché sur `/api/contact` (Resend). Il reste
   à renseigner `RESEND_API_KEY` et `CONTACT_FROM` dans `.env.local` :
   voir `.env.example`. Tant qu'ils manquent, la route répond 503 et le
   formulaire affiche une erreur explicite — jamais un faux succès.
5. **Six champs légaux obligatoires** — capital, TVA, décennale, hébergeur,
   médiateur.
6. **Photographies** — voir `PRISES-DE-VUE.md`. PV 01, PV 04 et PV 06
   suffisent à basculer l'accueil sur de vraies images.
7. **Logo** — déposer `public/logo.svg` puis passer `LOGO_FILE` à `true` dans
   `components/ui/Logo.tsx`.

---

## 16. Certifications et réalisations — état des allégations

**Certifications : retirées partout.** RGE QualiPAC, FEEBAT et CAPEB ne sont
pas confirmées. Elles ont été ôtées du hero, du bandeau, du pied de page, des
métadonnées, de la FAQ, de la page PAC et des données structurées
(`hasCredential`). Le site ne promet plus aucune éligibilité à MaPrimeRénov'
ni aux CEE ; il explique le dispositif et sa condition, sans se l'attribuer.
Trois engagements opposables les remplacent — devis après visite, garantie
3 ans, un seul interlocuteur.

**Réalisations : non confirmées.** Les six entrées de `content/site.ts`
portent commune, année et client. L'accueil ne les affiche plus : il présente
des typologies. `/realisations` les utilise encore et doit être repris.

---

## 5. Décisions prises

- **Palette, typographie, grille** : arrêtées, issues du logo. Ne pas rouvrir.
- **Numérotation `01→06`** réservée à « Notre méthode », seule section où
  l'ordre porte une information.
- **Aucune photo de banque, aucune image générée.** Emplacements réservés.
- **Aucun traceur, aucune police CDN** → pas de bandeau de consentement.
  Ajouter une mesure d'audience rendrait le consentement obligatoire.
- **React 19 obligatoire** : React 18 casse avec Next 15
  (`ReactCurrentOwner undefined`).
- **La 3D ne sera pas dans le hero.** Elle arrive plus bas, en récompense.
  Le hero doit rester le LCP le plus rapide possible.

---

## 6. État Blender

**Opérationnel et automatisé. Aucune manipulation manuelle nécessaire.**

- Blender **5.1.2** — `C:\Program Files\Blender Foundation\Blender 5.1\blender.exe`
- Addon `sketchup_importer` installé et activable en headless
- Import des trois `.skp` : **réussi**

Commande type :

```bash
"/c/Program Files/Blender Foundation/Blender 5.1/blender.exe" --background --factory-startup \
  --python scripts/blender/inspect_scene.py -- \
  --skp public/3d/originals/refrig.skp \
  --out scripts/blender/reports/refrig.json
```

Les rapports sont dans `scripts/blender/reports/`. Les `.skp` d'origine ne
sont jamais modifiés.

---

## 7. État des trois modèles — mesuré, pas supposé

| Fichier | Objets | Maillages | Triangles | Encombrement réel | Verdict |
| --- | --- | --- | --- | --- | --- |
| `refrig.skp` | 67 | 41 | 10 215 | 1,11 × 0,99 × 0,75 m | **Exploitable tel quel** |
| `walk-in-freezer.skp` | 1 949 | 1 820 | 235 175 | **3,25 × 4,47 × 2,44 m** | Exploité — voir note |
| `evaporator.skp` | 639 | 176 | 311 443 | **70,2 × 12,4 × 5,3 m** | À recadrer |

### Ce que ça implique

**`refrig.skp` est le meilleur des trois.** Dimensions crédibles pour un
groupe de condensation, budget triangles négligeable, et il contient un
`C-Copeland Scroll Compressor` nommé — donc un vrai compresseur modélisé.

**Correction importante sur les cotes.** Les 6,10 m de profondeur annoncés au
premier diagnostic étaient faux : un panneau de catalogue isolé, dressé 1,6 m
devant la chambre, gonflait la boîte englobante. La chambre réelle mesure
**3,25 × 4,47 m sur 2,44 m de haut**. `drop_detached_panels()` l'écarte
désormais automatiquement.

**`walk-in-freezer.skp` est correctement dimensionné** mais **catastrophiquement fragmenté** :
1 820 maillages dont 781 sous 100 triangles — boulons, rondelles, fils de
rayonnage. Le problème n'est pas le nombre de triangles, c'est le nombre
d'appels de rendu. **Fusion par matériau obligatoire**, sinon la scène
saturera le CPU avant le GPU. Il contient aussi 3 candidats rotor forts
(`G-Object.004/005/006`) : l'évaporateur est probablement déjà dans ce
fichier.

Note : le matériau `Helen_Skin` porte sur 22 objets `C-Box` de
0,60 × 0,29 × 0,36 m — ce sont des **cartons sur les rayonnages**, pas une
silhouette humaine. Nom de texture hérité de la bibliothèque SketchUp.

**`evaporator.skp` n'est pas un évaporateur seul.** 70 mètres d'étendue :
le fichier contient une implantation complète, ou de la géométrie parasite
très loin de l'origine. Il porte trois objets de 26 400 triangles chacun et
un `C-expasion valf` (détendeur, 20 201 triangles) — donc de la matière
utile pour illustrer le cycle, mais il faut isoler ce qu'on garde avant
tout export.

---

## 8. État GLB — produit et mesuré

| Fichier | Triangles | Appels de rendu | Poids |
| --- | --- | --- | --- |
| `tfc-cold-room.glb` | 43 053 | 10 | 130 Ko |
| `tfc-refrigeration-unit.glb` | 10 215 | 9 | 112 Ko |

**249 Ko au total**, budget fixé à 2 Mo par modèle. De 1 949 objets à
19 appels de rendu.

Décodeur Draco **auto-hébergé** dans `public/draco/` (756 Ko, jamais servi au
premier rendu). `useGLTF(url, true)` irait le chercher sur gstatic.com, ce qui
casserait la promesse « aucune ressource tierce » et rendrait un bandeau de
consentement obligatoire.

**Turbines reconstruites.** Les rotors d'origine faisaient 70 triangles :
des disques plats, sans pales. Les faire tourner n'aurait produit aucun
mouvement visible. `build_blades()` génère moyeu, cinq pales vrillées à 28°
et jonc de bord, au diamètre mesuré de 305 mm.

---

## 9. État 3D côté web — en ligne et vérifié

`three` 0.171 · `@react-three/fiber` 9 · `@react-three/drei` 10.

Section `components/sections/Installation.tsx`, montée uniquement si
**≥ 1024 px ET pointeur fin ET pas de `prefers-reduced-motion` ET section en
approche**. `frameloop="demand"`.

Vérifié sous Chromium réel (`node scripts/shots.mjs`) :

- WebGL 2.0, canvas 1198 × 599, tampon conforme
- les quatre points de vue répondent
- **aucun canvas sur mobile** — le téléphone ne télécharge pas three.js
- zéro erreur console, zéro 404

`three` reste hors du paquet initial : toutes les routes sont à **103 kB de
JS partagé**.

---

## 10. État homepage

Huit sections, vérifiées en direct comme visibles et non vides :

1. Hero — titre + emplacement photo `PV 01`
2. TrustBar — qualifications
3. « Ce qui décide de tout » — le dimensionnement
4. Nos métiers — trois domaines
5. Repères — 2021, 3 métiers, 15 communes, 3 ans
6. Notre méthode — six étapes
7. Réalisations
8. Appel à l'action

---

## 11. État SEO

Sitemap, robots, canonical, OpenGraph, `HVACBusiness`, `FAQPage` en place.
Pages métier déjà séparées par service — la structure d'URL visée par le
cahier des charges est respectée, sauf `/depannage` qui s'appelle
`/entretien-depannage`.

---

## 12. État mobile

Vérifié à 390 × 844 : **débordement horizontal nul**, hero lisible, coupe
cotée encore déchiffrable, menu sombre cohérent, aucun canvas WebGL monté.

`scripts/shots.mjs` fait désormais défiler toute la page avant capture — les
grands blocs vides des anciennes captures venaient de là, pas du site.

---

## 13. Problèmes rencontrés et solutions

| Problème | Solution |
| --- | --- |
| React 18 + Next 15 → `ReactCurrentOwner undefined` | Passage React 19 |
| Port 3000 occupé | `autoPort: true` dans `.claude/launch.json` |
| Captures pleine page toutes vides | Diagnostic : `whileInView` jamais déclenché sans défilement. À corriger dans `shots.mjs`. |
| Identification des ventilateurs | Heuristique par **géométrie répétée** plutôt que par nom — SketchUp ne conserve pas les noms |

---

## 13 bis. Rendus Blender — piste explorée, puis écartée pour le hero

**Question posée :** peut-on remplacer les emplacements photo par des rendus
des modèles réels, en attendant les photographies ?

**Chaîne construite et fonctionnelle :** `scripts/blender/render_stills.py`.
Cycles CPU, cadrage calculé sur la boîte englobante, matériaux requalifiés,
désaturation des teintes de bibliothèque, éclairage trois points. Un rendu
760 × 428 en 20 échantillons prend 4 secondes ; la pleine définition est
donc gratuite.

**Résultat : insuffisant pour porter la direction artistique.**

Les trois SketchUp sont de la géométrie de catalogue : volumes blancs, sans
texture, sans jonction de panneau, sans tuyauterie apparente, sans câblage,
sans usure. Correctement éclairés, ils donnent une **vue technique propre** —
jamais l'impression d'une installation réelle. Un hero de 75 vh occupé par
une boîte blanche affaiblirait le site au lieu de le porter.

Ce n'est pas un problème d'éclairage ni de cadrage : les deux ont été
corrigés et vérifiés. C'est la densité d'information du modèle source.

**Conséquences retenues :**

1. Le hero ne sera pas un rendu. Il attend une photographie réelle.
2. La 3D **interactive** reste la signature : le mouvement des turbines,
   l'entrée dans le volume et les points d'explication apportent ce qu'une
   image fixe du même modèle n'apporte pas.
3. Le script de rendu est conservé — il resservira pour des vignettes
   techniques et pour illustrer le cycle frigorifique, à petite échelle.

---

## 14. Prochaines étapes, dans l'ordre

1. `scripts/blender/setup_tfc_scene.py` — nettoyage, fusion par matériau,
   hiérarchie `TFC_*`, pivots de rotors, export GLB + Draco.
2. Recadrer `evaporator.skp` : isoler l'unité utile des 70 m d'étendue.
3. Installer `three` / `@react-three/fiber` / `drei` et monter la scène.
4. Corriger `shots.mjs` (défilement avant capture) et recapturer.
5. Corriger le README.

---

## 15. Commandes utiles

```bash
npm run dev            # serveur de développement
npm run build          # 21 pages statiques
node scripts/shots.mjs # captures (défilement à corriger d'abord)
```
