import { company } from './company';

/**
 * Contenus transverses : méthode, réalisations, FAQ, briefs de prise de vue.
 *
 * Les emplacements photo portent la référence du dossier (PV 01…) : le
 * composant PhotoSlot affiche le brief tant que le fichier n'est pas livré,
 * ce qui rend visible ce qui manque au lieu de le masquer par une image
 * générique.
 */

/** Dossier §05 — le déroulé réel d'un chantier. L'ordre porte l'information. */
export const method = [
  {
    n: '01',
    title: 'Prise de contact',
    body: 'Vous décrivez la situation par téléphone ou par le formulaire. On qualifie immédiatement s’il s’agit d’une urgence ou d’un projet.',
    meta: 'Par téléphone ou par le formulaire',
  },
  {
    n: '02',
    title: 'Visite technique',
    body: 'Relevé sur place : volumes, exposition, alimentation électrique, passage des liaisons, contraintes de façade.',
    meta: 'Sur rendez-vous',
  },
  {
    n: '03',
    title: 'Dimensionnement',
    body: 'Calcul des déperditions ou de la charge à refroidir. C’est cette étape qui décide de la puissance, et donc de la consommation pour quinze ans.',
    meta: 'Calcul écrit',
  },
  {
    n: '04',
    title: 'Devis',
    body: 'Matériel désigné par marque et référence, main-d’œuvre détaillée, ce qui est inclus et ce qui ne l’est pas. Rien en « divers ».',
    meta: 'Chiffrage détaillé, poste par poste',
  },
  {
    n: '05',
    title: 'Installation',
    body: 'Chantier protégé, percements repérés avant, liaisons frigorifiques tirées proprement. On repart avec nos gravats.',
    meta: 'Date fixée à la commande',
  },
  {
    n: '06',
    title: 'Mise en service',
    body: 'Tirage au vide, contrôle d’étanchéité, charge de fluide, relevé des pressions. Puis prise en main des commandes avec vous.',
    meta: 'Le jour de la pose',
  },
  {
    n: '07',
    title: 'Suivi',
    body: 'Vous rappelez, vous tombez sur la personne qui a posé. L’entretien annuel se cale à la date qui vous arrange.',
    meta: 'Dans la durée',
  },
];

/**
 * Les six « réalisations » qui vivaient ici (commune, année, client) ont été
 * SUPPRIMÉES : elles n'ont jamais été confirmées par l'entreprise, et leurs
 * six pages de détail avec elles.
 *
 * Pour publier de vraies références : ajouter ici un tableau `projects`
 * confirmé par le dirigeant, avec les photographies correspondantes, puis
 * dédoubler les blocs de `app/realisations/page.tsx` en fiches.
 */

export const faq = [
  {
    q: 'Sous quel délai intervenez-vous en dépannage ?',
    a: 'Cela dépend de la nature de la panne. Un équipement professionnel à l’arrêt — chambre froide, vitrine — passe en priorité, dans la journée quand c’est possible. Pour un confort domestique, on cale un créneau sous quelques jours.',
  },
  {
    q: 'Le devis est-il payant ?',
    a: 'Les conditions du devis et, le cas échéant, du déplacement de diagnostic vous sont indiquées lors du premier échange — avant toute intervention, jamais découvertes sur la facture.',
  },
  {
    q: 'Que couvre exactement la garantie de trois ans ?',
    a: `Elle couvre les installations réalisées par nos soins : matériel posé et main-d’œuvre associée. Elle ne couvre pas les dégradations extérieures, ni un défaut d’entretien, ni une intervention d’un tiers sur l’installation. Le périmètre exact figure sur le devis.`,
  },
  {
    q: 'Une pompe à chaleur peut-elle remplacer complètement ma chaudière ?',
    a: 'Souvent oui, parfois en relève. Cela dépend de l’isolation, du type d’émetteurs et de la température d’eau nécessaire. C’est précisément ce que la visite technique permet de trancher, calculs à l’appui.',
  },
  {
    q: 'Suis-je éligible aux aides de l’État ?',
    a: 'Les principales aides à la rénovation énergétique — MaPrimeRénov’, certificats d’économie d’énergie — sont conditionnées au recours à un installateur qualifié RGE. Interrogez-nous sur ce point avant de commander : nous vous dirons précisément ce à quoi votre projet peut prétendre, et dans quelles conditions.',
  },
  {
    q: 'Faut-il faire entretenir une climatisation ?',
    a: 'Pour un particulier, l’entretien n’est obligatoire qu’au-delà d’une certaine charge de fluide, mais il reste vivement recommandé : un échangeur encrassé consomme davantage et se dégrade. Pour les installations professionnelles, le contrôle d’étanchéité est encadré par la réglementation.',
  },
  {
    q: 'Reprenez-vous une installation posée par une autre entreprise ?',
    a: 'Oui pour l’entretien et le dépannage. Pour une reprise complète, on commence par un état des lieux : selon ce qu’on trouve, conserver l’existant n’est pas toujours la solution la plus économique, et nous le disons.',
  },
] as const;
