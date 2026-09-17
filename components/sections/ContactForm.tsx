'use client';

import { useRef, useState } from 'react';
import { trades } from '@/content/services';

/**
 * Formulaire de contact.
 *
 * Champs encadrés, rayon de 6 px, même que les boutons. Le filet bleu et
 * l'anneau au focus suffisent à désigner l'endroit où l'on écrit.
 *
 * L'envoi passe par `/api/contact`, une route serveur. Le navigateur ne voit
 * jamais de clé : il ne connaît que cette URL.
 *
 * Quatre états, et aucun faux succès. Si la route répond une erreur — service
 * non configuré, panne d'envoi, limite de débit — le message le dit et rappelle
 * le téléphone. Un formulaire qui prétend envoyer sans envoyer est pire que
 * pas de formulaire du tout.
 *
 * Le piège à robots (`entreprise`) est hors flux et hors tabulation ; seul
 * un automate le remplit.
 */

type Etat =
  | { phase: 'saisie' }
  | { phase: 'envoi' }
  | { phase: 'envoye' }
  | { phase: 'erreur'; message: string };

export function ContactForm({ email, phone }: { email: string; phone: string }) {
  const [etat, setEtat] = useState<Etat>({ phase: 'saisie' });
  const formRef = useRef<HTMLFormElement>(null);

  const label = 'label mb-2 block text-slate';

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat.phase === 'envoi') return;

    setEtat({ phase: 'envoi' });
    const donnees = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donnees),
      });

      if (r.ok) {
        setEtat({ phase: 'envoye' });
        formRef.current?.reset();
        return;
      }

      const corps = await r.json().catch(() => ({}));
      setEtat({
        phase: 'erreur',
        message:
          typeof corps.erreur === 'string'
            ? corps.erreur
            : 'Une erreur est survenue.',
      });
    } catch {
      setEtat({
        phase: 'erreur',
        message: 'Une erreur est survenue.',
      });
    }
  }

  return (
    <form ref={formRef} onSubmit={envoyer} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="nom" className={label}>
          Nom et prénom
        </label>
        <input id="nom" name="nom" autoComplete="name" required className="field" />
      </div>

      <div>
        <label htmlFor="tel" className={label}>
          Téléphone
        </label>
        <input id="tel" name="tel" type="tel" autoComplete="tel" required className="field" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className={label}>
          E-mail
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className="field" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="commune" className={label}>
          Commune
        </label>
        <input id="commune" name="commune" autoComplete="address-level2" className="field" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="objet" className={label}>
          Objet de la demande
        </label>
        <select id="objet" name="objet" className="field" defaultValue="">
          <option value="" disabled>
            Choisir…
          </option>
          {trades.map((t) => (
            <option key={t.slug} value={t.slug}>
              Installation — {t.title.toLowerCase()}
            </option>
          ))}
          <option value="depannage">Dépannage — équipement en panne</option>
          <option value="entretien">Entretien ou contrat annuel</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Votre situation
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="field"
          placeholder="Type de local, surface approximative, équipement existant, ce qui ne fonctionne pas…"
        />
      </div>

      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="entreprise">Ne pas remplir</label>
        <input id="entreprise" name="entreprise" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        {etat.phase === 'envoye' ? (
          <div role="status" className="rounded-md border-l-2 border-brand bg-stone p-6">
            <p className="heading text-[1.1rem] text-ink">
              Votre demande a bien été envoyée.
            </p>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-slate">
              Nous vous rappelons pour convenir d’une visite. S’il s’agit d’une
              panne en cours, le téléphone reste le plus rapide.
            </p>
            <p className="mt-5 font-semibold text-ink">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="link-t">
                {phone}
              </a>
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={etat.phase === 'envoi'}
              className="btn btn-primary btn-arrow disabled:cursor-not-allowed disabled:opacity-60"
            >
              {etat.phase === 'envoi' ? 'Envoi en cours…' : 'Envoyer la demande'}
            </button>
            <p className="max-w-[22rem] text-[0.82rem] leading-6 text-slate">
              Vos coordonnées servent uniquement à vous répondre. Elles ne sont
              ni revendues ni utilisées pour de la prospection.
            </p>

            {etat.phase === 'erreur' && (
              <div
                role="alert"
                className="w-full rounded-md border-l-2 border-alert bg-stone p-6"
              >
                <p className="heading text-[1.05rem] text-ink">{etat.message}</p>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-slate">
                  Vous pouvez nous contacter directement au{' '}
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="link-t font-semibold text-ink"
                  >
                    {phone}
                  </a>{' '}
                  ou par e-mail à{' '}
                  <a href={`mailto:${email}`} className="link-t font-semibold break-all text-ink">
                    {email}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
