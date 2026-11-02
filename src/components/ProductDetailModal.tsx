import React, { useState } from 'react';
import {
  X,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
  Check,
} from 'lucide-react';
import { Product } from '../types/store';
import { formatPKR, createProductWhatsAppUrl } from '../config/storeConfig';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const whatsAppUrl = createProductWhatsAppUrl(
    product.name,
    product.pricePKR,
    quantity,
    product.slug
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div
          className="w-full max-w-3xl bg-[#090E1A] border border-slate-800 rounded-3xl text-left overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-700/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Column: Product Image */}
            <div className="md:col-span-6 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Warranty & Guarantee strip */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>7-Day Checking & Replacement Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Cash on Delivery Nationwide (Pakistan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>100% Tested Prior to Courier Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Ordering */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400 font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-mono">{product.rating.toFixed(1)}</span>
                    <span className="text-slate-500">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{product.tagline}</p>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-white font-mono tabular-nums">
                    {formatPKR(product.pricePKR)}
                  </span>
                  {product.originalPricePKR && (
                    <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                      {formatPKR(product.originalPricePKR)}
                    </span>
                  )}
                  {product.originalPricePKR && (
                    <span className="text-xs text-amber-400 font-semibold">
                      Save {formatPKR(product.originalPricePKR - product.pricePKR)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Feature Bullets */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                    Key Highlights
                  </div>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Specifications table */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="pt-3">
                    <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                      Technical Specifications
                    </div>
                    <div className="divide-y divide-slate-800 text-xs">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="py-1.5 flex justify-between gap-4">
                          <span className="text-slate-400">{key}</span>
                          <span className="text-slate-200 font-medium text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase & WhatsApp Module */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Quantity</span>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-xs font-mono font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-2.5">
                  {/* WhatsApp Order Button */}
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950 stroke-none" />
                    <span>Order Now on WhatsApp ({formatPKR(product.pricePKR * quantity)})</span>
                  </a>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>Add {quantity} to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
