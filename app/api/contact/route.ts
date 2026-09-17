import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validerDemande, echapperHtml } from '@/lib/contact-validation';
import { company } from '@/content/company';

/**
 * Réception des demandes de contact.
 *
 * ─── PRINCIPES ───────────────────────────────────────────────────────────
 * 1. Aucune clé ne quitte le serveur. `RESEND_API_KEY` est lue ici, dans un
 *    module qui ne part jamais au navigateur. Le formulaire ne connaît que
 *    l'URL de cette route.
 * 2. Aucun faux succès. Si la clé manque ou si l'envoi échoue, la réponse
 *    est une erreur explicite — jamais un « message envoyé » de complaisance.
 * 3. Toute donnée est revalidée ici. La validation du navigateur ne protège
 *    de rien : cet endpoint est appelable directement.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Node explicite : le SDK Resend n'est pas garanti sur le runtime edge.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ─────────────────────────────────────────────────────────────────────────
   Limitation de débit

   En mémoire, volontairement. Une base pour trois formulaires par semaine
   serait disproportionnée, et le pire cas d'un redémarrage — un compteur
   remis à zéro — reste sans conséquence.

   Si le site passe un jour sur plusieurs instances, ce compteur devient
   par-instance : il faudra alors un magasin partagé (Upstash, Vercel KV).
   ───────────────────────────────────────────────────────────────────────── */
const FENETRE_MS = 10 * 60 * 1000;
// 8 et non 4 : le compteur incrémente aussi sur les requêtes refusées, et
// un visiteur qui corrige deux fautes de frappe atteignait la limite avant
// d'avoir pu envoyer. Un automate, lui, dépasse 8 en quelques secondes.
const MAX_PAR_FENETRE = 8;
const compteurs = new Map<string, { n: number; depuis: number }>();

function tropDeDemandes(ip: string): boolean {
  const maintenant = Date.now();
  const e = compteurs.get(ip);

  if (!e || maintenant - e.depuis > FENETRE_MS) {
    compteurs.set(ip, { n: 1, depuis: maintenant });
    return false;
  }

  e.n += 1;

  // Purge opportuniste : sans elle, la Map grossit indéfiniment.
  if (compteurs.size > 500) {
    for (const [cle, v] of compteurs) {
      if (maintenant - v.depuis > FENETRE_MS) compteurs.delete(cle);
    }
  }

  return e.n > MAX_PAR_FENETRE;
}

function adresseIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip') || 'inconnue').trim();
}

const OBJETS_LISIBLES: Record<string, string> = {
  climatisation: 'Installation — climatisation',
  chauffage: 'Installation — chauffage et chaudières',
  'pompes-a-chaleur': 'Installation — pompe à chaleur',
  refrigeration: 'Installation — réfrigération',
  depannage: 'Dépannage — équipement en panne',
  entretien: 'Entretien ou contrat annuel',
  autre: 'Autre demande',
};

export async function POST(req: Request) {
  // ── Débit ────────────────────────────────────────────────────────────
  if (tropDeDemandes(adresseIp(req))) {
    return NextResponse.json(
      { erreur: 'Trop de demandes envoyées. Réessayez dans quelques minutes.' },
      { status: 429 },
    );
  }

  // ── Lecture ──────────────────────────────────────────────────────────
  let brut: unknown;
  try {
    brut = await req.json();
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible.' }, { status: 400 });
  }

  // ── Validation ───────────────────────────────────────────────────────
  const v = validerDemande(brut);

  if (!v.ok) {
    // Le piège à robots reçoit un 200 : un automate qui lit une erreur
    // recommence en changeant de champ. Aucun e-mail n'est envoyé.
    if (v.erreur === 'PIEGE') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ erreur: v.erreur, champ: v.champ }, { status: 400 });
  }

  const d = v.data;

  // ── Configuration ────────────────────────────────────────────────────
  const cle = process.env.RESEND_API_KEY;
  const expediteur = process.env.CONTACT_FROM;
  const destinataire = process.env.CONTACT_TO || company.email;

  if (!cle || !expediteur) {
    // Le formulaire n'est pas branché : on le dit, on ne le cache pas.
    return NextResponse.json(
      {
        erreur:
          'Le service d’envoi n’est pas encore configuré sur ce site.',
        nonConfigure: true,
      },
      { status: 503 },
    );
  }

  // ── Envoi ────────────────────────────────────────────────────────────
  const recu = new Date().toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  });

  const ligne = (k: string, val: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#61656c;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#151a20"><strong>${echapperHtml(val)}</strong></td></tr>`;

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.6;color:#151a20">
<p style="margin:0 0 20px;color:#61656c">Demande reçue via le formulaire du site — ${recu}</p>
<table style="border-collapse:collapse;margin-bottom:24px">
${ligne('Nom', d.nom)}
${ligne('Téléphone', d.tel)}
${ligne('E-mail', d.email)}
${d.commune ? ligne('Commune', d.commune) : ''}
${ligne('Objet', OBJETS_LISIBLES[d.objet] ?? d.objet)}
</table>
${
  d.message
    ? `<p style="margin:0 0 8px;color:#61656c">Message</p>
<div style="white-space:pre-wrap;border-left:2px solid #14657f;padding:4px 0 4px 16px">${echapperHtml(d.message)}</div>`
    : '<p style="color:#61656c">Aucun message saisi.</p>'
}
</div>`;

  const texte = [
    `Demande reçue via le formulaire du site — ${recu}`,
    '',
    `Nom       : ${d.nom}`,
    `Téléphone : ${d.tel}`,
    `E-mail    : ${d.email}`,
    d.commune ? `Commune   : ${d.commune}` : null,
    `Objet     : ${OBJETS_LISIBLES[d.objet] ?? d.objet}`,
    '',
    d.message || 'Aucun message saisi.',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const resend = new Resend(cle);
    const { error } = await resend.emails.send({
      from: expediteur,
      to: destinataire,
      // `replyTo` : répondre depuis la boîte tombe directement sur le client.
      replyTo: d.email,
      subject: `Demande — ${OBJETS_LISIBLES[d.objet] ?? d.objet} — ${d.nom}`,
      html,
      text: texte,
    });

    if (error) {
      console.error('[contact] échec Resend :', error);
      return NextResponse.json({ erreur: 'Envoi impossible.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error('[contact] exception :', e);
    return NextResponse.json({ erreur: 'Envoi impossible.' }, { status: 502 });
  }
}

/** Toute autre méthode est refusée explicitement. */
export function GET() {
  return NextResponse.json({ erreur: 'Méthode non autorisée.' }, { status: 405 });
}
