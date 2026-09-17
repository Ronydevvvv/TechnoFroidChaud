import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

/**
 * Capture le canvas 3D SEUL, point de vue par point de vue.
 *
 * Une capture de fenêtre montre surtout la mise en page ; pour juger d'un
 * rendu, il faut le cadre exact de la scène, sans le reste de la page.
 *
 *   node scripts/scene-shots.mjs <dossier> [port] [page]
 */

const OUT = process.argv[2] ?? '.scene';
const PORT = process.argv[3] ?? '3000';
const PAGE = process.argv[4] ?? '/';

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`http://localhost:${PORT}${PAGE}`, { waitUntil: 'networkidle' });

await page.evaluate(() => {
  const s = document.getElementById('installation');
  if (s) window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - 40);
});

await page.waitForSelector('#installation canvas', { timeout: 25000 });
await page.waitForTimeout(4000);

const canvas = await page.$('#installation canvas');
const tabs = await page.$$('#installation [role="tab"]');

const noms = [];
for (let i = 0; i < tabs.length; i++) {
  if (i > 0) {
    await tabs[i].click();
    await page.waitForTimeout(3000);
  }
  const nom = (await tabs[i].textContent()).trim();
  noms.push(nom);
  await canvas.screenshot({ path: path.join(OUT, `vue-${i}.png`) });
}

console.log(JSON.stringify({ vues: noms }, null, 1));
await browser.close();
