import React from 'react';
import {ChevronDown} from 'lucide-react';
import {AmbientLights} from '../components/AmbientLights';
import {Navbar} from '../components/Navbar';
import {ChannelList} from '../components/ChannelList';
import {Footer} from '../components/Footer';
import {WhatsAppFab} from '../components/WhatsAppFab';

/* ── /zenders ────────────────────────────────────────────────────────────
   De zenderlijst op zijn eigen pagina, zonder de rest van de homepage
   eromheen. Wie hier komt heeft één vraag — "zit mijn zender erbij?" — en
   krijgt alle 99 categorieën, doorzoekbaar, in plaats van de twaalf die
   onder de prijzen passen.

   Dat het een eigen URL is telt dubbel: Google kan hem los indexeren op
   zoekopdrachten naar losse zendernamen, en hij is te delen in een chat.
   ────────────────────────────────────────────────────────────────────── */

export const ChannelsPage: React.FC = () => (
  <div className="relative min-h-screen bg-page text-ink flex flex-col font-sans">

    <AmbientLights />

    <Navbar page="channels" />

    <main className="relative z-10 flex-grow">
      <ChannelList />

      {/* Terug naar de rest van de site — een losse pagina zonder uitgang
          laat je alleen de terugknop over */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-90" aria-hidden="true" />
          Terug naar de homepage
        </a>
      </div>
    </main>

    <Footer />

    <WhatsAppFab />

  </div>
);
