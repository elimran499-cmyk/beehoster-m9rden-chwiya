import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/iptvData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { whatsAppLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

/* Support lands in WhatsApp, so the callout links straight out instead of
   routing through the order panel. */
export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [filterCategory, setFilterCategory] = useState<string>('Alles');

  const categories = ['Alles', 'Bestellen', 'Activatie & snelheid', 'Apparaten', 'Zenders & VOD', 'Betalen'];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    if (filterCategory === 'Alles') return true;
    return faq.category === filterCategory;
  });

  return (
    <section id="faq" className="relative z-10 py-24 border-t border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-accent-deep uppercase tracking-widest bg-accent-soft px-3.5 py-1 rounded-full border border-accent/35">
            VEELGESTELDE VRAGEN
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.06]">
            Vragen? <span className="accent-gradient-text">Wij hebben de antwoorden</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            Alles over ons IPTV-abonnement, het instellen van je apparaat en de snelle activatie.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-accent text-white shadow-md'
                  : 'glass-card text-muted hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? 'glass-panel-accent border-accent/50'
                    : 'glass-card hover:border-accent/45'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-ink flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-muted'}`} />
                    {faq.question}
                  </span>
                  
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-accent text-white' : 'bg-paper text-muted'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-muted leading-relaxed border-t border-line animate-in fade-in duration-200">
                    <p className="pl-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="relative mt-12 p-6 rounded-3xl glass-card glass-edge specular overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 shrink-0">
              <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-ink">Staat jouw vraag er niet tussen?</h4>
              <p className="text-xs text-muted">Ons supportteam is 24/7 bereikbaar via WhatsApp en helpt je direct verder.</p>
            </div>
          </div>

          <a
            href={whatsAppLink('Hoi BEEHOSTER! Ik heb een vraag over jullie IPTV-abonnementen.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 text-xs font-bold text-white bg-[#25D366] rounded-xl shadow-lg shadow-[#25D366]/30 flex items-center gap-2 hover:scale-[1.03] transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
