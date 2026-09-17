'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Apparition au défilement.
 *
 * Une opacité et huit pixels de translation. C'est tout.
 *
 * La version précédente empilait des décalages en cascade, des filets qui
 * se traçaient et des lueurs qui montaient. Additionnés, ces mouvements se
 * remarquaient — et une animation qu'on remarque sur un site d'entreprise
 * est une animation de trop. Ici, le visiteur doit sentir que la page se
 * pose, sans pouvoir dire ce qui a bougé.
 */

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header' | 'figure';
};

export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -6% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
