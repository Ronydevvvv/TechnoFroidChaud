'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { company } from '@/content/company';

/**
 * Erreur de rendu.
 *
 * ─── CE QU'IL SE PASSAIT SANS CE FICHIER ─────────────────────────────────
 * Le projet n'avait ni `error.tsx` ni `global-error.tsx`. Si une page
 * levait une exception en production — un contenu mal formé, une donnée
 * absente, un composant client qui échoue — le visiteur tombait sur
 * l'écran par défaut de Next : fond blanc, « Application error: a
 * client-side exception has occurred », aucune navigation, aucun numéro.
 * Sur le site d'une entreprise de dépannage, c'est une porte fermée.
 *
 * ─── CE QU'ON MONTRE À LA PLACE ──────────────────────────────────────────
 * La même page que partout ailleurs : le vocabulaire du site, une
 * explication en français simple, et les deux façons de nous joindre. Le
 * TÉLÉPHONE d'abord — si la page est cassée, le visiteur n'a pas à
 * attendre qu'elle soit réparée pour obtenir une réponse.
 *
 * Aucune trace technique n'est affichée : elle n'aide pas le visiteur et
 * expose la structure du site. Elle part dans la console, où un
 * développeur la lira.
 *
 * `reset()` est la fonction que Next fournit pour retenter le rendu du
 * segment sans recharger la page — une erreur transitoire se répare alors
 * d'un clic.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-b border-line bg-white pt-32 pb-24 lg:pt-40 lg:pb-28">
      <div className="container-t">
        <p className="flex items-center gap-3 text-[0.95rem] text-slate">
          <span aria-hidden className="h-px w-7 shrink-0 bg-brand" />
          Erreur technique
        </p>

        <h1 className="heading t-h1 mt-4 max-w-[18ch] text-ink">
          Cette page n’a pas pu s’afficher
        </h1>

        <p className="lede mt-6 text-[1.05rem] leading-8 text-slate">
          Le problème vient du site, pas de vous. Vous pouvez réessayer — et
          si cela recommence, le téléphone reste le plus direct.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button type="button" onClick={reset} className="btn btn-primary">
            Réessayer
          </button>
          <a
            href={company.phoneHref}
            className="heading -my-2.5 inline-flex items-center py-2.5 text-[1.35rem] text-ink underline-offset-[6px] hover:underline"
            aria-label={`Appeler le ${company.phone}`}
          >
            {company.phone}
          </a>
        </div>

        <p className="mt-12 border-t border-line pt-7 text-[0.95rem] text-slate">
          <Link href="/" className="link-t text-ink">
            Retour à l’accueil
          </Link>
        </p>
      </div>
    </section>
  );
}
