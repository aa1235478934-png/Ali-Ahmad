import React from 'react';
import { ShieldCheck, Cpu, Headphones, Award } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#090E1A] border-t border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: About Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>About {STORE_CONFIG.name}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Pioneering Innovative Tech for Modern Living in Pakistan
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Founded with a singular mission: to bring authentic, high-grade personal technology and futuristic gadgets to technology enthusiasts, creators, and professionals across Pakistan without compromise.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Unlike ordinary phone accessory shops selling run-of-the-mill silicone cases and cheap cables, <strong className="text-white font-semibold">GadgetHub</strong> specializes exclusively in true gadgetry: 4K optical laser cubes, magnetic levitation acoustics, transparent cyber IPS glow clocks, medical-precision titanium health rings, and dual laptop display setups.
            </p>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                  Curated Quality
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Every device is lab-tested for thermal stability and genuine specs before entering our catalog.
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[#25D366]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                  7-Day Guarantee
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Enjoy a complete 7-day checking warranty so you can inspect your gadget at your doorstep.
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                  <Headphones className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                  WhatsApp Support
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Direct human support on WhatsApp for video demos, troubleshooting, and instant dispatch updates.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Brand Metrics & Inspection Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Our Quality Assurance Pledge
                </span>
                <h3 className="text-xl font-bold text-white">
                  Zero Counterfeits. 100% Inspected.
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every parcel leaving our facility in Karachi is packaged with multi-layered shockproof air-cushioning and seal verification tags.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Checking Warranty:</span>
                  <span className="text-xs font-mono font-bold text-white">7 Days Replacement</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Payment Safety:</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">Cash on Delivery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Coverage:</span>
                  <span className="text-xs font-mono font-bold text-white">All Pakistan Cities</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Courier Network:</span>
                  <span className="text-xs font-mono font-bold text-slate-300">TCS / Trax / Leopards</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GadgetHub, I have a question about your gadgets and store verification.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  Contact Management on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
