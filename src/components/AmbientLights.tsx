import React from 'react';

/**
 * Page-wide light field. Fixed to the viewport so every section is lit by the
 * same neon blue/cyan blooms — the sections themselves stay transparent and the
 * frosted panels blur whatever passes behind them.
 */
export const AmbientLights: React.FC = () => (
  <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="bloom bloom-warm w-[46rem] h-[42rem] -top-48 left-1/2 -translate-x-1/3 opacity-70" />
    <div className="bloom bloom-ember w-[42rem] h-[40rem] top-[22rem] -left-44 opacity-80" />
    <div className="bloom bloom-warm w-[38rem] h-[36rem] top-[44rem] left-[42%] opacity-45" />
    <div className="bloom bloom-ember w-[38rem] h-[34rem] top-[6rem] -right-32 opacity-65" />
    <div className="absolute inset-0 grain-overlay opacity-[0.12] mix-blend-overlay" />
  </div>
);
