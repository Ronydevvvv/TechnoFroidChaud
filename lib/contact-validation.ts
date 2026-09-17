/**
 * Validation d'une demande de contact.
 *
 * Ce fichier est importé par la route serveur UNIQUEMENT. La validation
 * côté navigateur (`required`, `type="email"`) est un confort d'usage : elle
 * se contourne en trois secondes avec les outils de développement, et une
 * requête peut de toute façon être envoyée directement à l'endpoint sans
 * jamais passer par la page. Tout ce qui compte est vérifié ici.
 */

export type ContactPayload = {
  nom: string;
  tel: string;
  email: string;
  commune: string;
  objet: string;
  message: string;
  /** Piège à robots — doit rester vide. */
  entreprise: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; erreur: string; champ?: string };

const LIMITES = {
  nom: 120,
  tel: 30,
  email: 180,
  commune: 120,
  objet: 60,
  message: 4000,
} as const;

/** Objets acceptés. Une valeur hors liste est refusée plutôt que nettoyée. */
const OBJETS = new Set([
  'climatisation',
  'chauffage',
  'pompes-a-chaleur',
  'refrigeration',
  'depannage',
  'entretien',
  'autre',
]);

function texte(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

/**
 * Neutralise les caractères de contrôle et les retours chariot isolés.
 *
 * Le corps du message part en HTML : sans échappement, un `<script>` ou une
 * balise d'image collée dans le champ « message » se retrouverait interprétée
 * dans la boîte de réception du destinataire.
 */
export function echapperHtml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Retire les caractères de contrôle utilisés pour injecter des en-têtes. */
function sansInjectionEntete(v: string): string {
  return v.replace(/[\r\n\t\0]+/g, ' ').trim();
}

export function validerDemande(brut: unknown): ValidationResult {
  if (typeof brut !== 'object' || brut === null) {
    return { ok: false, erreur: 'Requête illisible.' };
  }

  const c = brut as Record<string, unknown>;

  // ── Piège à robots ──────────────────────────────────────────────────
  // Rempli = automate. On ne le dit pas à l'appelant : un robot qui apprend
  // quel champ le trahit contourne le piège au tir suivant.
  const entreprise = texte(c.entreprise);
  if (entreprise.length > 0) {
    return { ok: false, erreur: 'PIEGE' };
  }

  const nom = sansInjectionEntete(texte(c.nom));
  const tel = sansInjectionEntete(texte(c.tel));
  const email = sansInjectionEntete(texte(c.email)).toLowerCase();
  const commune = sansInjectionEntete(texte(c.commune));
  const objet = sansInjectionEntete(texte(c.objet));
  const message = texte(c.message);

  if (nom.length < 2) {
    return { ok: false, erreur: 'Indiquez votre nom.', champ: 'nom' };
  }
  if (nom.length > LIMITES.nom) {
    return { ok: false, erreur: 'Nom trop long.', champ: 'nom' };
  }

  // Numéro français ou international, espaces et séparateurs tolérés.
  const chiffres = tel.replace(/[^\d+]/g, '');
  if (chiffres.replace(/\D/g, '').length < 9 || chiffres.length > LIMITES.tel) {
    return { ok: false, erreur: 'Numéro de téléphone incomplet.', champ: 'tel' };
  }

  // Volontairement simple : la seule validation d'adresse qui vaille est
  // l'envoi réel. On écarte l'absurde, pas l'inhabituel.
  if (
    email.length > LIMITES.email ||
    !/^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(email)
  ) {
    return { ok: false, erreur: 'Adresse e-mail invalide.', champ: 'email' };
  }

  if (commune.length > LIMITES.commune) {
    return { ok: false, erreur: 'Commune trop longue.', champ: 'commune' };
  }

  if (objet && !OBJETS.has(objet)) {
    return { ok: false, erreur: 'Objet de demande inconnu.', champ: 'objet' };
  }

  if (message.length > LIMITES.message) {
    return { ok: false, erreur: 'Message trop long.', champ: 'message' };
  }

  return {
    ok: true,
    data: { nom, tel, email, commune, objet: objet || 'autre', message, entreprise: '' },
  };
}
