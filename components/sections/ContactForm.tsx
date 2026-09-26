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

  const label = 'label mb-2 block text-ink';

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

  /**
   * L'astérisque des champs nécessaires.
   *
   * Trois champs sur six sont `required` et RIEN ne le disait : on ne
   * l'apprenait qu'en butant sur le refus du navigateur après avoir appuyé
   * sur « Envoyer ». La marque est cyan, donc lisible d'un coup d'œil, et
   * `aria-hidden` — l'attribut `required` porte déjà l'information aux
   * lecteurs d'écran, la répéter en ferait un bégaiement.
   */
  const Requis = () => (
    <span aria-hidden className="ml-1 text-brand">
      *
    </span>
  );

  return (
    <form ref={formRef} onSubmit={envoyer} className="flex flex-col gap-y-9">
      {/* ─── LE SURTITRE ───
          Le formulaire n'annonçait rien : on arrivait directement sur
          « Nom et prénom », comme sur un formulaire administratif. Cette
          ligne dit ce qu'on est en train de faire — une demande
          d'intervention, pas un message de contact générique — et elle le
          dit dans le vocabulaire des cartouches du site : filet cyan,
          petites capitales. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3">
        <p className="flex items-center gap-3 text-[0.82rem] tracking-[0.08em] text-ink uppercase">
          <span aria-hidden className="h-px w-7 bg-brand" />
          Demande d’intervention
        </p>
        <p className="text-[0.76rem] text-slate">
          <span aria-hidden className="text-brand">
            *
          </span>{' '}
          champs nécessaires pour vous rappeler
        </p>
      </div>

      {/* ═══ 01 — LES COORDONNÉES ═══
          Le formulaire était une colonne de six champs identiques, sans
          respiration ni hiérarchie : on ne voyait pas où il commençait, ni
          combien il restait à remplir. Il se lit maintenant en DEUX temps
          numérotés — qui vous êtes, puis ce dont vous avez besoin — dans
          la même grammaire de cartouche que les planches techniques du
          site. Aucun champ n'a été ajouté, retiré ni déplacé d'un groupe à
          l'autre : seul le rythme change.

          `fieldset` et `legend` plutôt que des `div` et des `p` : c'est
          l'élément qui dit à un lecteur d'écran que ces champs vont
          ensemble. La légende est sortie du flux visuel par `float-none`
          et recomposée au-dessus, faute de quoi le navigateur la place
          dans la bordure du `fieldset`. */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-5 flex w-full items-baseline gap-3 p-0">
          <span className="heading text-[0.95rem] text-brand tabular-nums">01</span>
          <span className="text-[0.8rem] tracking-[0.12em] text-slate uppercase">
            Vos coordonnées
          </span>
          <span aria-hidden className="mt-[0.55rem] h-px flex-1 bg-line" />
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="nom" className={label}>
              Nom et prénom
              <Requis />
            </label>
            <input id="nom" name="nom" autoComplete="name" required className="field" />
          </div>

          <div>
            <label htmlFor="tel" className={label}>
              Téléphone
              <Requis />
            </label>
            <input id="tel" name="tel" type="tel" autoComplete="tel" required className="field" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className={label}>
              E-mail
              <Requis />
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required className="field" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="commune" className={label}>
              Commune
            </label>
            <input id="commune" name="commune" autoComplete="address-level2" className="field" />
          </div>
        </div>
      </fieldset>

      {/* ═══ 02 — LA DEMANDE ═══ */}
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-5 flex w-full items-baseline gap-3 p-0">
          <span className="heading text-[0.95rem] text-brand tabular-nums">02</span>
          <span className="text-[0.8rem] tracking-[0.12em] text-slate uppercase">
            Votre besoin
          </span>
          <span aria-hidden className="mt-[0.55rem] h-px flex-1 bg-line" />
        </legend>

        <div className="grid gap-5">
          <div>
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

          <div>
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
        </div>
      </fieldset>

      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="entreprise">Ne pas remplir</label>
        <input id="entreprise" name="entreprise" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="border-t border-line pt-7">
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
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            {/* ─── SUR TÉLÉPHONE, LE BOUTON PREND TOUTE LA LARGEUR ───
                Il faisait 226 px dans une colonne de 335, et la note de
                confidentialité venait se serrer à côté puis passer
                dessous : le geste qui termine la page avait l'air d'un
                lien parmi d'autres. Pleine largeur et 52 px de haut, il
                redevient ce qu'il est — et la note passe dessous, où elle
                se lit. À partir de 640 px la composition d'origine
                reprend, elle n'a jamais posé de problème là. */}
            <button
              type="submit"
              disabled={etat.phase === 'envoi'}
              /* Le bouton portait le corps par défaut, celui d'un lien de
                 navigation. C'est le geste qui termine la page : il prend
                 le corps au-dessus et un peu d'air autour, sans changer ni
                 de forme ni de couleur. */
              className="btn btn-primary btn-arrow w-full justify-center px-8 py-4 text-[1.02rem] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-start"
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
