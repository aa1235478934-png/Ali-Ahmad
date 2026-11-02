import React, { useState, useMemo } from 'react';
import { ArrowUpDown, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  onClearFilters: () => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  onClearFilters,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' || p.categorySlug === selectedCategory;

        const matchesQuery =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
        if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-16 bg-[#070A11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <span>Verified Catalog</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400 font-mono tabular-nums">
                {filteredProducts.length} Items Available
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Featured Innovations
            </h2>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <label htmlFor="sort-select" className="text-slate-400 sr-only">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured" className="bg-slate-900 text-white">Recommended</option>
                <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
              </select>
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pt-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">No gadgets found</h3>
            <p className="text-sm text-slate-400 max-w-sm">
              We couldn't find any gadgets matching "{searchQuery}" in this category.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
