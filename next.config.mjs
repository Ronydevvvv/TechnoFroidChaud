/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Un package-lock.json traîne plus haut dans l'arborescence de l'utilisateur ;
  // on fixe la racine pour que Next ne la devine pas de travers.
  outputFileTracingRoot: import.meta.dirname,

  experimental: {
    /**
     * lucide-react expose un millier d'icônes depuis un point d'entrée
     * unique. Sans cette réécriture, un `import { Phone } from 'lucide-react'`
     * peut entraîner l'arbre entier dans le paquet de développement et
     * ralentir la compilation. On n'en utilise qu'une douzaine.
     */
    optimizePackageImports: ['lucide-react'],
  },

  async headers() {
    return [
      {
        // Les sondes d'éclairage ne changent jamais : elles sont
        // versionnées par leur nom. Un an de cache immuable évite de les
        // retélécharger à chaque visite.
        source: '/hdri/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Le site n'utilise aucune de ces interfaces. Les refuser
          // explicitement réduit la surface exposée par une extension ou
          // un script tiers introduit par erreur.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
