import React from 'react';
import { FEATURE_GRID } from '../data/iptvData';
import { Film, Zap, Clock, Tv, ShieldAlert, Headphones, CheckCircle2 } from 'lucide-react';

export const Features: React.FC = () => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      case 'Tv': return <Tv className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Headphones': return <Headphones className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <section id="features" className="relative z-10 py-24 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent-deep uppercase tracking-widest bg-accent-soft px-3.5 py-1 rounded-full border border-accent/35">
            WAAROM BEEHOSTER
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.06]">
            Gebouwd voor <span className="accent-gradient-text">nul buffering</span> en topkwaliteit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            Wij draaien redundante 10Gbps glasvezelservers in Europa en Noord-Amerika, zodat elke 4K-uitzending vloeiend blijft.
          </p>
        </div>

        {/* 3x2 Bento Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_GRID.map((feature, idx) => (
            <div
              key={feature.id}
              className="glass-card glass-edge glass-card-hover p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Subtle Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/8 rounded-bl-full pointer-events-none group-hover:bg-accent/15 transition-all" />

              <div className="w-12 h-12 rounded-2xl bg-paper border border-accent/35 text-accent-deep flex items-center justify-center mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 group-hover:bg-accent group-hover:text-ink transition-all duration-300">
                {getFeatureIcon(feature.icon)}
              </div>

              <h3 className="font-display text-2xl text-ink mb-3 group-hover:text-accent-deep transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 pt-4 border-t border-line flex items-center gap-2 text-xs font-semibold text-accent">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Inbegrepen bij alle abonnementen</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
