import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, MessageSquare } from 'lucide-react';
import { Product } from '../types/store';
import { formatPKR, createProductWhatsAppUrl } from '../config/storeConfig';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const whatsAppUrl = createProductWhatsAppUrl(
    product.name,
    product.pricePKR,
    1,
    product.slug
  );

  return (
    <article
      id={`product-${product.slug}`}
      className="group relative flex flex-col justify-between bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
    >
      {/* Top Image Section */}
      <div
        className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-6 text-center">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
              {product.category}
            </span>
            <span className="text-sm font-medium text-slate-300">{product.name}</span>
          </div>
        )}

        {/* Subtle Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Quick View Button overlay on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-slate-700/60"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Badge if present */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-semibold rounded-md">
            {product.badge}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400/90 font-medium">{product.category}</span>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1 text-slate-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums font-mono text-[11px]">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          {/* Price Block */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white font-mono tabular-nums">
                {formatPKR(product.pricePKR)}
              </span>
              {product.originalPricePKR && (
                <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                  {formatPKR(product.originalPricePKR)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">Free Delivery</span>
          </div>

          {/* Actions: WhatsApp Order & Add to Cart */}
          <div className="grid grid-cols-12 gap-2">
            {/* Primary: Order on WhatsApp Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-8 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors whitespace-nowrap cursor-pointer"
              aria-label={`Order ${product.name} directly on WhatsApp`}
            >
              <MessageSquare className="w-4 h-4 fill-slate-950 stroke-none" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Secondary: Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`col-span-4 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs rounded-xl border border-slate-700 transition-all cursor-pointer ${
                isAdding ? 'scale-95 bg-amber-500/20 text-amber-300 border-amber-500/40' : ''
              }`}
              title="Add to shopping cart"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAdding ? 'Added' : 'Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
