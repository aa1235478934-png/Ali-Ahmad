import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../types/store';
import { formatPKR } from '../config/storeConfig';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-2xl bg-[#090E1A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#070A11]">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search innovative gadgets (projector, speaker, clock, ring, etc.)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type keywords above to search all smart gadgets, categories, and specs.
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 pb-1">
                Found {results.length} results
              </div>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-amber-400 font-semibold uppercase">
                        <span>{product.category}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <div className="flex items-center gap-0.5 text-slate-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-slate-300">
                        {formatPKR(product.pricePKR)}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No gadgets match "<span className="text-white">{query}</span>". Try another term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
