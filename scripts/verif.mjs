import { chromium } from 'playwright';
import fs from 'fs';

/**
 * Vérification finale : débordement, superposition, console, liens.
 *
 *   node scripts/verif.mjs <dossier> [port]
 */

const OUT = process.argv[2] ?? '.verif';
const PORT = process.argv[3] ?? '3100';
const BASE = `http://localhost:${PORT}`;
fs.mkdirSync(OUT, { recursive: true });

const LARGEURS = [
  { nom: 'desktop-large', w: 1920, h: 1080 },
  { nom: 'laptop', w: 1440, h: 900 },
  { nom: 'laptop-petit', w: 1280, h: 800 },
  { nom: 'tablette', w: 768, h: 1024 },
  // `isMobile` n'est pas un détail : sans lui, Chromium met la page en
  // page dans la largeur demandée quoi qu'il arrive. Avec, il applique le
  // vrai viewport mobile — et un élément insécable plus large que l'écran
  // fait alors exploser toute la mise en page, comme sur un vrai téléphone.
  // `overflow-x: clip` sur le body masquait ce débordement à `scrollWidth`.
  { nom: 'mobile', w: 390, h: 844, mobile: true },
  { nom: 'mobile-375', w: 375, h: 812, mobile: true },
  { nom: 'mobile-petit', w: 360, h: 780, mobile: true },
];

const PAGES = [
  '/', '/entreprise', '/climatisation', '/chauffage', '/pompes-a-chaleur',
  '/refrigeration', '/chambres-froides', '/realisations',
  '/entretien-depannage', '/contact', '/mentions-legales', '/confidentialite',
];

const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-gl=angle'] });
const rapport = { erreurs: [], debordements: [], liensCasses: [], hauteurs: {} };

/** Fait défiler toute la page : sans cela les apparitions restent à 0. */
async function poser(page) {
  await page.evaluate(async () => {
    const pas = Math.round(innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += pas) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 350));
  });
}

for (const v of LARGEURS) {
  const page = await browser.newPage({
    viewport: { width: v.w, height: v.h },
    isMobile: !!v.mobile,
    hasTouch: !!v.mobile,
  });
  page.on('pageerror', (e) => rapport.erreurs.push(`${v.nom} PAGEERROR ${e.message.slice(0, 140)}`));
  page.on('console', (m) => {
    if (m.type() === 'error') rapport.erreurs.push(`${v.nom} CONSOLE ${m.text().slice(0, 140)}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400) rapport.erreurs.push(`${v.nom} HTTP ${r.status()} ${r.url().slice(0, 110)}`);
  });

  for (const route of PAGES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await poser(page);

    const m = await page.evaluate(() => ({
      // `innerWidth` est le seul témoin fiable sous émulation mobile :
      // il vaut la largeur RÉELLE de mise en page, là où `clientWidth`
      // reste bloqué sur la largeur de l'écran.
      scrollW: Math.max(document.documentElement.scrollWidth, window.innerWidth),
      clientW: document.documentElement.clientWidth,
      hauteur: document.body.scrollHeight,
      // Tout élément qui dépasse le bord droit de plus d'un pixel.
      coupables: [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
        .slice(0, 4)
        .map((el) => `${el.tagName}.${String(el.className).slice(0, 60)}`),
    }));

    if (m.scrollW > m.clientW + 1) {
      rapport.debordements.push({ vue: v.nom, route, de: m.scrollW - m.clientW, coupables: m.coupables });
    }
    if (route === '/') rapport.hauteurs[v.nom] = m.hauteur;
  }

  // Captures de l'accueil seulement.
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/${v.nom}-hero.png` });
  await poser(page);
  await page.screenshot({ path: `${OUT}/${v.nom}-complet.png`, fullPage: true });
  await page.close();
}

// Liens internes : on vérifie que chaque href du site répond.
const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const hrefs = new Set();
for (const route of PAGES) {
  await p.goto(BASE + route, { waitUntil: 'domcontentloaded' });
  for (const h of await p.$$eval('a[href^="/"]', (a) => a.map((x) => x.getAttribute('href')))) {
    hrefs.add(h);
  }
}
for (const h of hrefs) {
  const r = await p.request.get(BASE + h);
  if (r.status() >= 400) rapport.liensCasses.push(`${h} → ${r.status()}`);
}
await p.close();
await browser.close();

console.log(JSON.stringify(rapport, null, 1));
