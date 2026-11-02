import React from 'react';
import { ArrowRight, ShieldCheck, Truck, MessageCircle, Play } from 'lucide-react';
import heroImage from '../assets/images/hero_smart_gadgets_1792647707645.jpg';

interface HeroProps {
  onShopClick: () => void;
  onVideoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onVideoClick }) => {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#070A11] pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            {/* Quiet Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>Next-Gen Electronics</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>100% Curated</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Fast COD Pakistan</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Discover Amazing Gadgets for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Everyday Life
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Explore innovative gadgets that make your life smarter and easier. Hand-picked smart home innovations, levitating audio, 4K pocket lasers, and futuristic desk devices delivered right to your door.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onVideoClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400/20 group-hover:scale-110 transition-transform" />
                <span>See in Action</span>
              </button>
            </div>

            {/* Adjacency Trust Strip */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Free Shipping Nationwide</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>7-Day Checking Guarantee</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order in 60s</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/60 shadow-2xl shadow-black/80 group">
              <img
                src={heroImage}
                alt="GadgetHub flagship smart gadgets collection featuring laser cube projector, magnetic speaker, and smart desk display"
                className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle scrim & golden light accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A11] via-transparent to-transparent opacity-60" />

              {/* Quiet floating product spotlight note */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800/90 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-amber-400 font-medium">Curated Spotlight</span>
                  <span className="text-xs text-white font-semibold">Smart Living & Desk Setup Tech</span>
                </div>
                <button
                  type="button"
                  onClick={onShopClick}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group/btn"
                >
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
