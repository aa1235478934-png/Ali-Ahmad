import React from 'react';
import {
  Home,
  Gamepad2,
  Tv,
  Volume2,
  Watch,
  Laptop,
  Monitor,
  Sparkles,
  Flame,
  Layers,
  LucideIcon,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategorySlug } from '../types/store';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Gamepad2,
  Tv,
  Volume2,
  Watch,
  Laptop,
  Monitor,
  Sparkles,
  Flame,
};

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-12 bg-[#090E1A] border-y border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Curated Departments
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore by Innovation
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-2 md:mt-0 max-w-md">
            Strictly high-utility gadgets, ambient tech, and futuristic electronics. Zero generic accessories.
          </p>
        </div>

        {/* Filter Pills / Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* All Gadgets Tab */}
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              selectedCategory === 'all'
                ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-amber-400'
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono tabular-nums text-slate-400">All</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">All Gadgets</h3>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">Complete curated catalog</p>
            </div>
          </button>

          {/* 9 Requested Categories */}
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.iconName] || Sparkles;
            const isSelected = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 group-hover:bg-slate-700 text-amber-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
