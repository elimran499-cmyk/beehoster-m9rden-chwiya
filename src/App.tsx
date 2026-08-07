import React, { useState } from 'react';
import { AmbientLights } from './components/AmbientLights';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChannelExplorer } from './components/ChannelExplorer';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { FaqSection } from './components/FaqSection';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { WHATSAPP_DISPLAY, whatsAppLink } from './data/contact';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlanId, setModalPlanId] = useState<string>('plan-12m');

  const handleOpenOrderModal = (planId?: string) => {
    if (planId) {
      setModalPlanId(planId);
    }
    setIsModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-page text-ink flex flex-col font-sans">

      {/* Shared warm light field behind every section */}
      <AmbientLights />

      {/* Sticky top bar */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* The header floats over the page rather than pushing it down, so the
          hero owns its own top padding and nothing needs reserving here. */}
      <main className="relative z-10 flex-grow">
        
        {/* Hero Section */}
        <Hero onOpenOrderModal={handleOpenOrderModal} />

        {/* Channel & VOD Explorer — the catalogue answers the first question a
            visitor has, so it leads straight out of the hero */}
        <ChannelExplorer onOpenOrderModal={handleOpenOrderModal} />

        {/* Subscription Pricing Plans */}
        <Pricing onOpenOrderModal={handleOpenOrderModal} />

        {/* 3x2 Bento Key Features Grid */}
        <Features />

        {/* Verified Testimonials */}
        <Testimonials />

        {/* Blog — internal links into the static article pages */}
        <Blog />

        {/* FAQ Accordion Section */}
        <FaqSection onOpenOrderModal={handleOpenOrderModal} />

      </main>

      <Footer onOpenOrderModal={handleOpenOrderModal} />

      {/* Floating WhatsApp contact — on every screen now that the phone dock
          which used to carry it is gone */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:left-6 sm:right-auto z-40">
        <a
          href={whatsAppLink('Hoi BEEHOSTER! Ik wil graag meer weten over jullie IPTV-abonnementen.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Neem contact op via WhatsApp: ${WHATSAPP_DISPLAY}`}
          className="p-3.5 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-white/40"
          title={`WhatsApp-support 24/7 — ${WHATSAPP_DISPLAY}`}
        >
          <WhatsAppIcon className="w-6 h-6" />
        </a>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        initialPlanId={modalPlanId}
        onClose={handleCloseOrderModal}
      />

    </div>
  );
}
