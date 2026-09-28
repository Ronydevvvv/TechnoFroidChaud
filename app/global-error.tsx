'use client';

import { useEffect } from 'react';

/**
 * Erreur dans la mise en page racine.
 *
 * Ce cas-ci est le dernier filet : il ne se déclenche que si `layout.tsx`
 * lui-même échoue. Next remplace alors TOUT le document — d'où le `<html>`
 * et le `<body>` écrits ici, que ce fichier est le seul du projet à porter.
 *
 * Conséquence directe : ni l'en-tête, ni le pied de page, ni la feuille de
 * styles globale ne sont garantis. Les styles sont donc écrits en ligne, et
 * le strict nécessaire : un titre, une phrase, un numéro. Toute dépendance
 * supplémentaire serait exactement ce qui vient d'échouer.
 *
 * Le numéro est recopié en dur pour la même raison : importer
 * `content/company` ici, c'est ajouter un module au chemin critique d'un
 * écran dont le rôle est de survivre à une panne de modules. S'il change un
 * jour, il change à deux endroits — un défaut assumé, et c'est le seul
 * fichier du site où il l'est.
 */

export default function GlobalError({
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
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: '#ffffff',
          color: '#151a20',
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <main style={{ maxWidth: '40rem', padding: '2rem 1.5rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              color: '#61656c',
            }}
          >
            Erreur technique
          </p>

          <h1
            style={{
              margin: '0.75rem 0 0',
              fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
              lineHeight: 1.1,
              fontWeight: 600,
            }}
          >
            Le site rencontre un problème
          </h1>

          <p
            style={{
              margin: '1.25rem 0 0',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              color: '#61656c',
            }}
          >
            Nous en sommes désolés. Vous pouvez réessayer, ou nous appeler
            directement — nous répondons.
          </p>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.75rem',
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                border: 0,
                borderRadius: '0.375rem',
                background: '#14657f',
                color: '#ffffff',
                padding: '0.9rem 1.7rem',
                fontSize: '0.95rem',
                fontWeight: 550,
                cursor: 'pointer',
              }}
            >
              Réessayer
            </button>

            <a
              href="tel:+33613966775"
              style={{
                fontSize: '1.35rem',
                fontWeight: 600,
                color: '#151a20',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              }}
            >
              06 13 96 67 75
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
