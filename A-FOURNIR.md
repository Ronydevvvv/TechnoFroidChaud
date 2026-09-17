# À fournir avant la mise en ligne

> État au 16 septembre 2026, après la refonte éditoriale des neuf pages et la
> passe de préparation à la mise en ligne. Ce fichier ne liste que ce qui
> **manque** et que je ne peux pas inventer. Tout le reste est vérifié et
> conforme — voir le bilan technique en fin de document.
>
> Le design et la structure sont **verrouillés**. Aucune modification
> visuelle ne sera faite sans demande explicite.

---

## 1. BLOQUANT — le site ne peut pas être publié sans

### 1.1 Mentions légales — six champs obligatoires

Six mentions imposées par la loi figurent en clair sur la page sous la forme
`[À COMPLÉTER]`. **Publier sans elles expose l'entreprise à une sanction**
(article 6-III de la LCEN pour l'éditeur et l'hébergeur ; article L. 616-1 du
code de la consommation pour le médiateur).

| # | Champ | Où le trouver |
| --- | --- | --- |
| 1 | **Capital social** | Statuts de la SAS ou extrait Kbis |
| 2 | **Numéro de TVA intracommunautaire** | Format `FR__897970083` — service des impôts des entreprises |
| 3 | **Assureur** (RC pro et décennale) | Attestation d'assurance |
| 4 | **Numéro de police d'assurance** | Même attestation |
| 5 | **Hébergeur du site** — raison sociale **et** adresse postale | Dépend de l'hébergement choisi (Vercel, OVH, o2switch…) |
| 6 | **Médiateur de la consommation** — nom, adresse et site | L'adhésion à un médiateur est **obligatoire** pour tout professionnel vendant à des particuliers. Si l'entreprise n'en a pas, il faut y adhérer avant la mise en ligne. |

Fichier : `app/mentions-legales/page.tsx`

### 1.2 Formulaire de contact — non fonctionnel en l'état

Le formulaire est branché sur une route serveur, mais la clé d'envoi n'est pas
renseignée. Testé en conditions réelles : **une demande valide reçoit un 503**
et le visiteur voit « Le service d'envoi n'est pas encore configuré sur ce
site », suivi du téléphone et de l'e-mail en repli.

C'est honnête — il n'y a **jamais de faux message de succès** — mais aucune
demande n'arrive.

À créer : un fichier `.env.local` (jamais versionné, déjà couvert par
`.gitignore`). Modèle complet et commenté dans `.env.example` :

| Variable | Obligatoire | À fournir |
| --- | --- | --- |
| `RESEND_API_KEY` | oui | Clé API à créer sur resend.com |
| `CONTACT_FROM` | oui | Expéditeur, sur un domaine vérifié chez Resend |
| `CONTACT_TO` | non | Destinataire. Par défaut, l'adresse de `content/company.ts` |

Dès ces valeurs en place, le test de bout en bout avec réception réelle peut
être refait.

---

## 2. IMPORTANT — crédibilité commerciale

### 2.1 Adresse e-mail professionnelle

Le site affiche **`eyup.mermer@gmail.com`** à 22 endroits. C'est l'adresse
personnelle du dirigeant. Une adresse au nom de domaine —
`contact@techno-froid-chaud.fr` — est le geste de crédibilité le moins cher et
le plus visible du projet.

Une seule valeur à changer : `email` dans `content/company.ts`. Les 22
occurrences suivent automatiquement.

### 2.2 Favicon — FAIT

Les trois icônes sont en place et servies sans 404 :

- `app/favicon.ico`
- `app/icon.png` — 512 × 512
- `app/apple-icon.png` — 180 × 180

Toutes sont dérivées de `public/photos/logo.png` par recadrage et
redimensionnement uniquement : le logo n'a pas été redessiné et son fond
transparent est conservé. Le même pictogramme est repris dans l'en-tête, à
gauche du nom.

Rien à fournir sur ce point.

### 2.3 Horaires d'ouverture — à confirmer

Le site annonce **« Du lundi au vendredi, 8 h – 18 h »** dans le pied de page,
sur la page Dépannage et sur la page Contact. Ces horaires sont marqués
**« À CONFIRMER »** dans le code : ils ne figurent pas sur le site actuel de
l'entreprise et ont été posés par défaut.

Deux questions : sont-ils exacts ? Y a-t-il une astreinte le samedi ou en
soirée pour les pannes de froid ? Sur ce métier, la réponse est un argument
commercial.

Fichier : `content/company.ts`, champs `hours` et `openingHoursSchema`.

### 2.4 Photographies de chantiers

**Les 21 images du site sont des photographies libres de droits** (Unsplash,
Pexels, 0 €, aucune IA). Elles illustrent un métier ; **aucune n'est présentée
comme un chantier de l'entreprise** — pas de commune, pas de date, pas de
client, nulle part. Voir `public/photos/CREDITS.md`.

C'est honnête, et c'est le principal levier restant. Par ordre de rentabilité :

1. **Une mise en service** — un technicien, un manifold, une installation
   terminée. C'est LA photo du site : elle remplace celle de la section « Nos
   installations » de l'accueil.
2. **Six photos de métier** — une clim posée, une chaudière, une PAC en
   façade, un groupe frigorifique, une chambre froide, une intervention de
   dépannage. Elles alimentent les vignettes de l'accueil **et** les heros des
   six pages métier.
3. **Trois à cinq chantiers identifiables** — avec commune et année. Ce sont
   elles qui transformeront `/realisations`, aujourd'hui volontairement
   limitée à des typologies et qui le dit dans son propre chapô.

Cahier des charges de prise de vue : en tête de `components/home/Hero.tsx`.
Points de remplacement : `components/home/Metiers.tsx`,
`components/home/Chantier.tsx`, et le champ `photo` de chaque `PageHero`.

### 2.5 Certifications — volontairement absentes

Le site n'affiche **aucune certification**. RGE QualiPAC, FEEBAT et CAPEB
avaient été retirées faute de confirmation, et c'est la bonne décision : une
qualification RGE affichée à tort conditionne MaPrimeRénov' et les CEE, et son
affichage abusif est sanctionné.

**Si l'entreprise détient une qualification**, fournir le numéro et la date de
validité : elle sera rétablie dans `content/company.ts` et dans les données
structurées (`hasCredential`, `lib/seo.ts`). Cela permettrait aussi de parler
des aides de l'État autrement qu'au conditionnel sur `/pompes-a-chaleur`.

---

## 3. À VÉRIFIER — décisions qui vous appartiennent

| Point | Constat | Question |
| --- | --- | --- |
| **Date des pages légales** | « Dernière mise à jour — août 2026 » | À passer à la date réelle de publication. Fichiers : `app/mentions-legales/page.tsx` et `app/confidentialite/page.tsx`, prop `updated`. **En attente de votre date exacte.** |
| **Communes desservies** | 15 communes listées, du siège à Sarreguemines | La liste est-elle exacte ? Elle alimente le pied de page, `/entreprise`, `/contact` et les données structurées `areaServed`. |
| **Garantie 3 ans** | Affichée à 10 endroits comme engagement | Confirmée par le site actuel de l'entreprise. À valider une dernière fois : c'est un engagement opposable. |
| **Domaine** | `www.techno-froid-chaud.fr` est codé en dur | Confirmer que c'est bien le domaine de destination. Il alimente canonical, sitemap et Open Graph. Fichier : `content/navigation.ts`, constante `SITE_URL`. |
| **Photo Réfrigération** | Une plaque de marque reste lisible de près | Me dire si vous voulez que je la remplace. |
| **Description de `/confidentialite`** | 70 caractères — la seule sous les 120 | Fonctionnelle, mais Google la tronquera moins bien que les autres. À rallonger sur un mot de vous. |

---

## 4. Bilan technique — ce qui est vérifié et conforme

Contrôles réalisés sur le build de production, 12 pages × 2 largeurs.

| Contrôle | Résultat |
| --- | --- |
| Compilation | `npm run build` → 17 pages, aucune erreur ; `tsc` propre |
| Responsive | 12 pages × 1440 et 375 px — **24/24 sans défaut** |
| Débordement horizontal | **aucun**, aux deux largeurs |
| Erreurs console | **zéro** sur les 12 pages |
| Liens internes | 12 distincts, **tous en 200**, aucun lien vide |
| CTA | lien devis **et** téléphone sur les 9 pages de contenu (`/contact` porte le formulaire) |
| Coordonnées | 45 occurrences du téléphone, 22 de l'e-mail, 16 de l'adresse — **aucune variante** |
| `tel:` | `+33613966775`, conforme au numéro affiché |
| Formulaire — validation | champ vide → 400 + message de champ ; JSON illisible → 400 ; limitation de débit active |
| Formulaire — piège à robots | champ hors écran, `tabIndex=-1` ; rempli → 200 **sans envoi** |
| Formulaire — sans clé | 503 + message honnête + téléphone en repli, **jamais de faux succès** (vérifié à 1440 et 375 px) |
| `title` | 37 à 60 caractères sur les 12 pages |
| `meta description` | 127 à 161 caractères sur 11 pages (70 sur `/confidentialite`) |
| Canonical | présent sur les 12 pages |
| Open Graph | complet sur les 12 pages, image 1200 × 630, `twitter:card` = `summary_large_image` |
| Données structurées | `HVACBusiness` ×12, `BreadcrumbList` ×9, `Service` ×4, `FAQPage` ×2 — **JSON valide** |
| `robots.txt` / `sitemap.xml` | présents et corrects, 12 URL |
| Accessibilité | `lang="fr"`, lien d'évitement, tous les `alt`, champs étiquetés, un seul `h1` par page, contour de focus visible |
| Poids transféré | accueil **407 Ko** desktop / **170 Ko** mobile ; JS 1 à 3 Ko par page |
| Secrets | aucun dans le dépôt ; `.env.local` et `.env*.local` couverts par `.gitignore` |
| Contenu de démonstration | aucun placeholder, aucun `lorem`, aucun `TODO`, aucun canvas WebGL |

### Poids transféré, page par page

Desktop / mobile, en Ko :

| Page | 1440 px | 375 px |
| --- | --- | --- |
| Accueil | 407 | 170 |
| Chambres froides | 407 | 161 |
| Climatisation | 245 | 118 |
| Réfrigération | 210 | 109 |
| Réalisations | 204 | 112 |
| Contact | 202 | 112 |
| Pompes à chaleur | 199 | 111 |
| Entreprise | 146 | 106 |
| Dépannage | 139 | 104 |
| Chauffage | 135 | 99 |

---

## 5. Ce qui a changé depuis l'audit précédent

La refonte éditoriale a donné à chaque page sa propre composition, sans
toucher au header, à la palette, à la typographie ni au contenu métier.

**Composants supprimés** — ils produisaient le même gabarit sur huit pages :
`Faq`, `Parcours`, `TradeItems`, `Installation` (sections), `Pourquoi`,
`Signature` (accueil), `SectionHeading` (ui), et `content/scene.ts`, dernier
reliquat de la scène 3D retirée.

**Répétitions supprimées** — `/entreprise` disait trois fois la même chose
(« un seul interlocuteur » ×3, « du matériel réparable » ×2, « devis après
visite » ×2). Les listes ont été fondues et dédoublonnées, **textes conservés
mot pour mot**.

**Défauts corrigés** — le filtre de FAQ de `/chambres-froides` ramenait
« Faut-il faire entretenir une climatisation ? » ; `/contact` annonçait un
devis « gratuit » et une zone « Moselle · Alsace · Meurthe-et-Moselle », deux
affirmations qu'aucun contenu du projet ne soutient. Les trois ont été
alignées sur `content/`.

**Image supprimée** — `bande-froid-commercial.jpg`, sans référence depuis le
retrait du cycle frigorifique de `/refrigeration`.
