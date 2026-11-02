import React, { useEffect } from 'react';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../config/storeConfig';

export const CartToast: React.FC = () => {
  const { lastAddedProduct, dismissToast, openCart } = useCart();

  useEffect(() => {
    if (!lastAddedProduct) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [lastAddedProduct, dismissToast]);

  if (!lastAddedProduct) return null;

  const { product } = lastAddedProduct;

  return (
    <aside aria-label="Cart notification" className="fixed bottom-24 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-3.5 bg-slate-900/95 backdrop-blur-md border border-amber-500/40 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-11 h-11 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-800"
          />
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              Added to Cart
            </div>
            <div className="text-xs font-bold text-white truncate">{product.name}</div>
            <div className="text-[11px] font-mono text-amber-400">
              {formatPKR(product.pricePKR)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              openCart();
              dismissToast();
            }}
            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={dismissToast}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
