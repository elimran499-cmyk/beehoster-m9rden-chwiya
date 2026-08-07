import React from 'react';

/**
 * Page-wide light field. Fixed to the viewport so every section sits on the
 * same warm accent wash — the sections themselves stay transparent and the
 * frosted cards blur whatever passes behind them. On cream these read as a
 * tint in the paper rather than light sources, so they run far softer than
 * the dark build's blooms did.
 */
export const AmbientLights: React.FC = () => (
  <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="bloom bloom-warm w-[46rem] h-[42rem] -top-48 left-1/2 -translate-x-1/3 opacity-60" />
    <div className="bloom bloom-ember w-[42rem] h-[40rem] top-[22rem] -left-44 opacity-55" />
    <div className="bloom bloom-warm w-[38rem] h-[36rem] top-[44rem] left-[42%] opacity-35" />
    <div className="bloom bloom-ember w-[38rem] h-[34rem] top-[6rem] -right-32 opacity-45" />
    <div className="absolute inset-0 grain-overlay opacity-[0.06] mix-blend-multiply" />
  </div>
);
