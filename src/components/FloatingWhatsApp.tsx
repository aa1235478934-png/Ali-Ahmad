import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { STORE_CONFIG, createGeneralWhatsAppUrl } from '../config/storeConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsAppUrl = createGeneralWhatsAppUrl();

  return (
    <aside aria-label="WhatsApp live chat support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip / Speech Bubble */}
      {showTooltip && (
        <div className="mb-3 p-3 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl text-left max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-white">Need help finding a gadget?</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Chat directly with our team on WhatsApp for video demos and stock inquiries.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EA952] text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
        aria-label={`Chat with ${STORE_CONFIG.name} on WhatsApp`}
      >
        <MessageSquare className="w-7 h-7 fill-slate-950 stroke-none" />

        {/* Floating pulse indicator */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-[#070A11] rounded-full" />
      </a>
    </aside>
  );
};
