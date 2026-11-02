import React from 'react';
import { Flame, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface TrendingSectionProps {
  products: Product[];
  onExploreCollection: () => void;
  onQuickView: (product: Product) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  products,
  onExploreCollection,
  onQuickView,
}) => {
  const trendingProducts = products.filter((p) => p.trending).slice(0, 3);

  return (
    <section id="trending" className="py-20 bg-[#070A11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top: Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Highest Demand</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Trending Gadgets This Week
            </h2>
          </div>
          <button
            type="button"
            onClick={onExploreCollection}
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 group cursor-pointer"
          >
            <span>View All Innovations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Trending Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={`trending-${product.id}`}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C1527] via-[#111A30] to-[#0A1020] border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Limited Batch Tech Releases</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                Elevate Your Workspace with Smart Living Tech
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Every unit in our collection is rigorously stress-tested for heat dissipation, optical clarity, and wireless acoustic fidelity. Instant WhatsApp checkout and 7-day checking guarantee across Pakistan.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={onExploreCollection}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer group"
              >
                <span>Explore Full Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Same-Day Dispatch
                </span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  7-Day Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
