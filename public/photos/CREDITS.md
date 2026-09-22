# Photographies — provenance et licence

> Ce fichier existe pour que la provenance de chaque image soit vérifiable
> sans fouiller l'historique. À tenir à jour à chaque ajout.

## `toiture-technique.jpg` — hero de l'accueil

| | |
| --- | --- |
| **Nature** | Photographie. **Ni image générée, ni rendu 3D.** |
| **Source** | Unsplash — https://unsplash.com/photos/l_Vn4HlFQVw |
| **Auteur** | Kettenreaktion (@kettenreaktion) |
| **Licence** | Unsplash License — usage commercial libre, attribution non obligatoire, **0 €** |
| **Statut** | **PROVISOIRE** |

Batterie de condenseurs de climatisation et de réfrigération en toiture d'un
bâtiment professionnel.

### Ce que cette image n'est pas

Ce n'est **pas un chantier de Techno Froid Chaud**, et le site ne le laisse
nulle part entendre : le texte de remplacement décrit une installation, il
n'en attribue aucune. Aucune légende, aucune date, aucun client, aucune
mention dans `/realisations`.

### Pourquoi celle-ci

Retenue après comparaison d'une vingtaine de candidates sur **Unsplash,
Pexels, Pixabay et Wikimedia Commons** — sources gratuites à usage
commercial exclusivement, aucune licence achetée.

1. **Aucune marque lisible.** C'est le critère qui a éliminé presque tout le
   reste : Daikin sur la façade multi-split précédemment en ligne, Carrier
   sur le technicien américain, alpha innotec sur les pompes à chaleur,
   VITAL ENERGY sur le gilet du technicien britannique, Viessmann et
   Mitsubishi sur Wikimedia Commons.
2. **La palette est native.** Le bleu-pétrole de la photographie est déjà
   celui du site.
3. **Le propos s'élargit.** Une batterie de condenseurs en toiture dit le
   froid commercial et l'installation professionnelle, là où la façade
   multi-split ne parlait que de climatisation.

**Ce qu'elle n'a pas :** personne à l'image. Constat assumé — aucune photo
gratuite ne réunissait « technicien européen identifiable + installation
réelle + aucune marque ». Mieux vaut aucun personnage qu'un mauvais.

### Une image a été remplacée

`metier-refrigeration.jpg` montrait un compresseur dont la plaque de marque
et le logo étaient lisibles de près. Remplacée par des groupes frigorifiques
montés sur châssis (Pexels `3964537`) : **aucune marque lisible**, palette
froide, et une lecture « froid commercial » plus immédiate.

L'ancienne — Pexels `39365171` — n'est plus utilisée nulle part sur le site.

### Retouches appliquées

**Aucun étalonnage.** Ni assombrissement, ni désaturation, ni virage, ni
filtre. La classe `.photo` du site (contraste + densité) n'est pas appliquée
non plus : la consigne était de garder l'image naturelle, et cette
photographie est déjà dans la palette.

**Recadrage seul.** La source est verticale (3840 × 5759). On en a tiré la
bande basse — celle où deux plans d'unités se superposent, donc celle qui
donne de la profondeur — centrée à 58,25 % de la hauteur.

Puis **8 % rognés sur le bord droit**. C'est un réglage de composition, pas
de cadrage : même image, même bande, mais tout le contenu glisse vers la
droite d'autant. Le bloc blanc et sa première hélice commençaient à 15 % de
la largeur, donc en plein sous le H1 ; ils démarrent maintenant après lui et
les trois lignes du titre reposent sur du sombre.

Pourquoi rogner l'image plutôt que régler `object-position` : l'asset et le
hero ont le **même rapport** (2,051). À 1440 × 702 l'image entre exactement
dans le cadre — aucun débordement horizontal à faire glisser, donc
`object-position` y est sans effet. Il ne reprend la main qu'aux autres
proportions d'écran.

Sortie : 2560 × 1248, JPEG qualité 84 (mozjpeg), 391 Ko.

### Recadrage à l'affichage

`object-position` 62 % sur grand écran, 80 % sous 1024 px. Sur un écran
étroit, 62 % ne montrerait que le vide sombre du premier plan ; 80 % ramène
les hélices dans le champ.

### À remplacer

Dès que les prises de vue de l'entreprise seront disponibles. Une seule
constante à modifier : `PHOTO` dans `components/home/Hero.tsx`. Le cahier
des charges de prise de vue est écrit juste au-dessus, dans le même fichier.

## Images retirées

`facade-climatisation.jpg` — façade multi-split (Unsplash, Kien Nguyen).
Retirée : logos Daikin visibles, et propos limité à la climatisation.


---

## Photographies de l'accueil — sections sous le hero

Sept photographies ajoutées avec la refonte de l'accueil. **Toutes de vraies
photographies, sous licence gratuite à usage commercial. Aucune image
générée, aucun rendu 3D, aucune licence achetée.**

| Fichier | Source | Auteur | Licence |
| --- | --- | --- | --- |
| `metier-climatisation.jpg` | Unsplash `994AH40vmVs` | Kien Nguyen | Unsplash |
| `metier-chauffage.jpg` | Pexels `20046689` | — | Pexels |
| `metier-pompes-a-chaleur.jpg` | Unsplash `kblddocwPa0` | alpha innotec | Unsplash |
| `metier-refrigeration.jpg` | Pexels `3964537` | — | Pexels |
| `metier-chambres-froides.jpg` | Pexels `5953713` | — | Pexels |
| `metier-depannage.jpg` | Pexels `6471912` | — | Pexels |
| `installation-mise-en-service.jpg` | Pexels `34938442` | — | Pexels |

### Ce que ces images ne sont pas

**Aucune n'est un chantier de Techno Froid Chaud**, et rien sur la page ne le
laisse entendre. Elles illustrent un **métier** — ce que l'entreprise sait
faire — elles n'attestent d'aucune **réalisation**.

C'est une distinction de fond, pas de vocabulaire : aucune légende ne porte
de commune, de date, de client ni de « réalisé par nos équipes ». La section
« Nos installations » décrit une méthode de livraison et les trois livrables
qu'un client reçoit ; elle ne revendique aucun chantier. Les réalisations de
l'entreprise ne sont pas confirmées (voir PROJECT_STATUS §16), et les
inventer en légende serait le plus court chemin pour perdre la crédibilité
que cette refonte construit.

### Une image a été remplacée

`metier-refrigeration.jpg` montrait un compresseur dont la plaque de marque
et le logo étaient lisibles de près. Remplacée par des groupes frigorifiques
montés sur châssis (Pexels `3964537`) : **aucune marque lisible**, palette
froide, et une lecture « froid commercial » plus immédiate.

L'ancienne — Pexels `39365171` — n'est plus utilisée nulle part sur le site.

### Retouches

Recadrage uniquement — 4:3 pour les six métiers (1200 × 900), 4:5 pour la
section installations (1600 × 2000). Aucun étalonnage n'est appliqué au
fichier : l'homogénéité des six vignettes vient d'un voile CSS posé sur la
tuile, qui les tient à la même densité quelles que soient leurs expositions
d'origine. Modifier le voile suffit à les réaccorder, sans retoucher les
fichiers.

### À remplacer

Toutes, dès que les prises de vue de l'entreprise seront disponibles. Les
chemins sont regroupés en tête de `components/home/Metiers.tsx` et de
`components/home/Chantier.tsx` — un tableau et une constante, rien d'autre à
toucher.

La plus importante à obtenir en premier : **celle de la section
« Nos installations »**, une mise en service par la personne qui a posé
l'installation. C'est la seule photographie du site qui prouverait vraiment
quelque chose.


---

## Photographies des pages intérieures

Dix images ajoutées avec l'harmonisation du site. **Toutes tirées des mêmes
sources gratuites à usage commercial que celles de l'accueil** — Unsplash et
Pexels, 0 €, aucune image générée, aucun rendu 3D, aucune licence achetée.

| Fichier | Usage | Source |
| --- | --- | --- |
| `hero-climatisation.jpg` | hero `/climatisation` | Unsplash `994AH40vmVs` |
| `hero-chauffage.jpg` | hero `/chauffage` | Pexels `20046689` |
| `hero-pompes-a-chaleur.jpg` | hero `/pompes-a-chaleur` | Unsplash `kblddocwPa0` |
| `hero-refrigeration.jpg` | hero `/refrigeration` | Pexels `3964537` |
| `hero-chambres-froides.jpg` | hero `/chambres-froides` | Pexels `5953713` |
| `hero-depannage.jpg` | hero `/entretien-depannage` | Pexels `6471912` |
| `hero-entreprise.jpg` | hero `/entreprise` | Pexels `34938442` |
| `hero-realisations.jpg` | hero `/realisations` | Unsplash `l_Vn4HlFQVw` |
| `hero-contact.jpg` | hero `/contact` | Unsplash `l_Vn4HlFQVw` |
| `bande-chambre-froide.jpg` | sol du bloc « anatomie », `/chambres-froides` | Pexels `39432831` |

Ce sont les **mêmes photographies que sur l'accueil**, recadrées en bandes
larges (2400 × 1000). Ce n'est pas une économie : une page métier et sa
vignette sur l'accueil montrent le même sujet, donc le visiteur retrouve
l'image qu'il a cliquée. C'est ce qui fait la continuité.

### Toujours la même règle

Aucune n'est un chantier de Techno Froid Chaud. Elles illustrent un
**métier**, elles n'attestent d'aucune **réalisation** : pas de commune, pas
de date, pas de client, nulle part. `/realisations` le dit explicitement dans
son propre chapô — les photographies de chantiers viendront s'y ajouter.

### Retouches

Recadrage seul, aucun étalonnage. Le `hero-climatisation` écarte le coin
droit de sa source (armoire incendie et notice en langue étrangère), comme
la version de l'accueil.

### À remplacer

Toutes, dès que les prises de vue de l'entreprise seront disponibles. Une
page métier ne demande qu'un objet `photo` dans son `PageHero` : rien
d'autre à toucher.


---

## Les six `metier-*.jpg` servent aussi `/realisations`

Aucun fichier n'a été ajouté. Cinq des six photographies de métier sont
désormais affichées une seconde fois, sur `/realisations`, en regard de la
typologie qu'elles illustrent :

| Typologie | Fichier |
| --- | --- |
| Chambre froide professionnelle | `metier-chambres-froides.jpg` |
| Installation frigorifique commerciale | `metier-refrigeration.jpg` |
| Climatisation | `metier-climatisation.jpg` |
| Pompe à chaleur | `metier-pompes-a-chaleur.jpg` |
| Entretien et dépannage | `metier-depannage.jpg` |

### La règle est appliquée plus strictement là qu'ailleurs

C'est la page qui s'appelle « Nos installations » : c'est donc celle où une
photographie risque le plus d'être prise pour une réalisation de
l'entreprise. Chacune porte pour cette raison un **cartouche nominatif**,
posé sous l'image, dans un `figcaption` — donc rattaché à l'image par le
navigateur comme par le lecteur d'écran :

    ILLUSTRATION MÉTIER — CHAMBRE FROIDE EN PANNEAUX ISOTHERMES

La légende décrit **ce que montre l'image**, jamais ce que l'entreprise
aurait posé. Aucune commune, aucune date, aucun client, aucun « réalisé par
nos équipes », nulle part sur la page. Le chapô de la page le redit en
clair : « Les images qui l'illustrent montrent du matériel, pas nos
chantiers. »

Les légendes sont écrites **entrée par entrée** dans le tableau
`typologies` de `app/realisations/page.tsx`, et non générées à partir du
titre : une légende générée peut se vider ou se désaccorder de son image à
la première modification, celle-ci ne le peut pas.

### À remplacer

Dès que les prises de vue de l'entreprise seront disponibles. Trois champs
par entrée — `img`, `alt`, `legende` — et le cartouche devient alors la
vraie légende du chantier : commune, année, nature de la pose. Aucune
structure à toucher.
