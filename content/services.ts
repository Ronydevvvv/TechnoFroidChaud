/**
 * Les trois métiers. Aucun n'est hiérarchisé : le visiteur choisit selon
 * son besoin, pas selon ce qu'on veut lui vendre.
 *
 * Registre éditorial : on décrit ce qu'on fait et comment on le décide.
 * Aucun superlatif, aucune promesse invérifiable.
 */

/**
 * Le pôle thermique du métier.
 *
 * Ce n'est pas une décoration : il décide de la couleur d'accent de la page
 * et de la carte. Le froid code le froid, le chaud code le chaud — le code
 * couleur vient du métier, pas d'un choix graphique.
 */
export type Pole = 'cold' | 'hot';

export type Trade = {
  slug: string;
  pole: Pole;
  title: string;
  /** Une phrase qui situe le métier, affichée sur l'accueil. */
  summary: string;
  /** Chapô de la page dédiée. */
  lede: string;
  audience: string;
  items: { title: string; body: string }[];
};

export const trades: Trade[] = [
  {
    slug: 'chauffage',
    pole: 'hot',
    title: 'Chauffage et chaudières',
    summary:
      'Entretien annuel, réparation et remplacement de chaudières, et les circuits qui vont avec.',
    lede:
      'L’entretien annuel d’une chaudière n’est pas une formalité administrative : c’est lui qui repère l’encrassement, le tirage insuffisant et les débuts de fuite avant qu’ils ne coûtent une réparation. Nous intervenons sur l’existant comme sur le remplacement.',
    audience: 'Particuliers et locaux professionnels',
    items: [
      {
        title: 'Entretien annuel',
        body: 'Nettoyage du corps de chauffe et du brûleur, contrôle des sécurités, mesure de combustion et attestation remise à la fin de l’intervention.',
      },
      {
        title: 'Réparation',
        body: 'Recherche de panne sur la régulation, le circulateur, la vanne ou le brûleur. Nous cherchons la cause avant de remplacer une pièce.',
      },
      {
        title: 'Remplacement',
        body: 'Dépose de l’ancienne chaudière, pose de la nouvelle, raccordement et mise en service. C’est aussi l’occasion d’examiner si une pompe à chaleur serait plus pertinente — nous le disons quand c’est le cas.',
      },
      {
        title: 'Circuit et émetteurs',
        body: 'Purge, désembouage, équilibrage des radiateurs. Un circuit encrassé fait travailler la chaudière pour rien, quelle que soit sa performance.',
      },
    ],
  },
  {
    slug: 'climatisation',
    pole: 'cold',
    title: 'Climatisation',
    summary:
      'Rafraîchir l’été, chauffer l’hiver, avec un appareil dimensionné sur le volume réel de la pièce.',
    lede:
      'Une climatisation trop puissante démarre et s’arrête sans cesse : elle consomme davantage, assèche l’air et s’use plus vite qu’un appareil calculé juste. Le dimensionnement se décide avant le choix du matériel.',
    audience: 'Particuliers et locaux professionnels',
    items: [
      {
        title: 'Mono-split',
        body: 'Une unité intérieure pour une pièce. La solution la plus simple quand un seul volume est concerné : séjour, chambre, bureau.',
      },
      {
        title: 'Multi-split',
        body: 'Plusieurs unités intérieures raccordées à un seul groupe extérieur. Une seule traversée de façade, un seul appareil visible dehors.',
      },
      {
        title: 'Gainable',
        body: 'Réseau de gaines en combles ou en faux plafond, bouches discrètes dans chaque pièce. C’est la pose la plus exigeante et la plus invisible une fois terminée.',
      },
      {
        title: 'Cassette',
        body: 'Encastrée en faux plafond, diffusion sur quatre côtés. Adaptée aux commerces, salles de réunion et grands volumes ouverts.',
      },
    ],
  },
  {
    slug: 'pompes-a-chaleur',
    pole: 'hot',
    title: 'Pompes à chaleur',
    summary:
      'Remplacer une chaudière ou la seconder, avec un calcul de déperditions préalable.',
    lede:
      'Une pompe à chaleur prélève de l’énergie dans l’air extérieur pour la restituer à l’intérieur. Son rendement dépend entièrement de la température d’eau demandée par vos radiateurs : c’est ce que la visite technique mesure avant de chiffrer.',
    audience: 'Maisons individuelles, rénovation',
    items: [
      {
        title: 'Air / air',
        body: 'Chauffe et rafraîchit par soufflage. Installation légère, pas de circuit d’eau, mise en service rapide.',
      },
      {
        title: 'Air / eau',
        body: 'Se raccorde au circuit de chauffage existant : radiateurs ou plancher chauffant. C’est la solution de remplacement d’une chaudière.',
      },
      {
        title: 'Relève de chaudière',
        body: 'La pompe à chaleur couvre la majorité de la saison, la chaudière prend le relais par grand froid. Investissement plus mesuré quand l’isolation ne permet pas le tout-électrique.',
      },
      {
        title: 'Chauffe-eau thermodynamique',
        body: 'Même principe appliqué à l’eau chaude sanitaire. Souvent le premier pas, et le plus rentable, dans une rénovation par étapes.',
      },
    ],
  },
  {
    slug: 'refrigeration',
    pole: 'cold',
    title: 'Réfrigération',
    summary:
      'Chambres froides, vitrines et groupes, conçus pour rester maintenables.',
    lede:
      'En froid professionnel, une panne ne coûte pas un inconfort : elle coûte une marchandise. Un circuit se conçoit donc autant pour être réparé vite que pour fonctionner la première année.',
    audience: 'Restauration, commerces de bouche, laboratoires',
    items: [
      {
        title: 'Chambres froides positives et négatives',
        body: 'Montage des panneaux, porte isotherme, évaporateur, régulation. De la réserve d’un commerce à la chambre de production.',
      },
      {
        title: 'Vitrines et meubles réfrigérés',
        body: 'Groupe logé ou à distance. Le report du groupe supprime le bruit et la chaleur en salle.',
      },
      {
        title: 'Groupes frigorifiques',
        body: 'Dimensionnement du compresseur et du condenseur selon la charge réelle et les ouvertures de porte, pas sur catalogue.',
      },
      {
        title: 'Régulation et relevés',
        body: 'Sondes, enregistrement des températures et alarmes. Ce que la réglementation sanitaire exige de pouvoir présenter en cas de contrôle.',
      },
    ],
  },
];

export const tradeBySlug = (slug: string) => trades.find((t) => t.slug === slug);
