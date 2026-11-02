import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageSquare,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  formatPKR,
  createCartWhatsAppUrl,
  OrderCustomerDetails,
} from '../config/storeConfig';

export const WhatsAppCartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal } =
    useCart();

  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    orderNotes: '',
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    const formattedItems = items.map((item) => ({
      name: item.product.name,
      pricePKR: item.product.pricePKR,
      quantity: item.quantity,
    }));

    const url = createCartWhatsAppUrl(
      formattedItems,
      subtotal,
      showAddressForm && customer.fullName.trim() ? customer : undefined
    );

    // Open WhatsApp in a new tab/window
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090E1A] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#070A11]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">Your Cart</h2>
                <p className="text-[11px] text-slate-400 font-mono">
                  {items.length} {items.length === 1 ? 'item' : 'items'} ready for checkout
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-semibold text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Discover our innovative tech gadgets and add your favorites to checkout instantly via WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex gap-3.5 items-center justify-between"
                    >
                      <div className="w-16 h-16 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {product.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-amber-400 mt-1 tabular-nums">
                          {formatPKR(product.pricePKR)}
                        </div>

                        {/* Quantity Steppers */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-mono font-semibold text-white tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Optional Customer Delivery Information Form */}
                <div className="pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full py-2 px-3 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>
                      {showAddressForm
                        ? '− Hide Delivery Address Details'
                        : '+ Pre-fill Delivery Details (Optional)'}
                    </span>
                    <span className="text-[10px] text-slate-400">Included in WhatsApp text</span>
                  </button>

                  {showAddressForm && (
                    <div className="mt-3 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5 animate-in fade-in duration-200">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customer.fullName}
                          onChange={(e) =>
                            setCustomer({ ...customer, fullName: e.target.value })
                          }
                          placeholder="e.g. Ali Ahmed"
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="text"
                            value={customer.phone}
                            onChange={(e) =>
                              setCustomer({ ...customer, phone: e.target.value })
                            }
                            placeholder="0300 1234567"
                            className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-slate-400 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={customer.city}
                            onChange={(e) =>
                              setCustomer({ ...customer, city: e.target.value })
                            }
                            placeholder="Karachi / Lahore / etc."
                            className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Complete Address
                        </label>
                        <textarea
                          rows={2}
                          value={customer.address}
                          onChange={(e) =>
                            setCustomer({ ...customer, address: e.target.value })
                          }
                          placeholder="House/Apartment #, Street, Area"
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer (Subtotal & WhatsApp Checkout) */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#070A11] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Shipping across Pakistan:</span>
                  <span className="text-emerald-400 font-semibold">FREE (All Orders)</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-sm font-semibold text-white">Total Amount (COD):</span>
                  <span className="text-xl font-bold font-mono text-white tabular-nums">
                    {formatPKR(subtotal)}
                  </span>
                </div>
              </div>

              {/* Checkout on WhatsApp button */}
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer group"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950 stroke-none" />
                <span>Checkout on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Review order details in WhatsApp before sending.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
