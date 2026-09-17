/**
 * Décalage en cascade. Dossier §10 : plafonné à 240 ms — au-delà, le retard
 * cesse d'être une élégance et devient une attente.
 *
 * Fonction pure, volontairement hors de Reveal.tsx : ce dernier porte la
 * directive 'use client', et les composants serveur qui calculent leurs
 * délais à l'itération ne peuvent pas appeler une fonction exportée depuis
 * un module client.
 */
export const stagger = (index: number, step = 0.06) => Math.min(index * step, 0.24);
