import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#090E1A] border border-slate-800 rounded-3xl p-6 sm:p-8 text-left shadow-2xl text-slate-300 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            ) : (
              <FileText className="w-5 h-5 text-amber-400" />
            )}
            <h3 className="text-lg font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed pr-2">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong className="text-white">{STORE_CONFIG.name}</strong>, your privacy is paramount. This policy clarifies how we handle your delivery information when you order through our WhatsApp channel.
              </p>
              <h4 className="text-white font-semibold pt-2">1. Information We Collect</h4>
              <p>
                When you initiate an order, we collect only the necessary delivery details (name, contact phone number, city, and street address) shared by you on WhatsApp for parcel dispatch.
              </p>
              <h4 className="text-white font-semibold pt-2">2. How Information is Used</h4>
              <p>
                Your shipping data is shared strictly with our courier partners (TCS, Trax, Leopards Courier) for doorstep fulfillment. We do not sell, rent, or lease customer data to third-party advertisers.
              </p>
              <h4 className="text-white font-semibold pt-2">3. Payment & Security</h4>
              <p>
                We do not request or store sensitive credit card or banking PIN credentials. Orders are settled securely via Cash on Delivery (COD) or direct Raast/IBFT verified transfers.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong className="text-white">{STORE_CONFIG.name}</strong>. By ordering gadgets through our website and WhatsApp service, you agree to the following terms:
              </p>
              <h4 className="text-white font-semibold pt-2">1. Orders & Pricing</h4>
              <p>
                All prices are listed in Pakistani Rupees (PKR) and include standard nationwide shipping. While we strive for absolute accuracy, orders are confirmed after human inventory verification on WhatsApp.
              </p>
              <h4 className="text-white font-semibold pt-2">2. 7-Day Checking Guarantee</h4>
              <p>
                Customers enjoy a 7-day checking guarantee starting from the day of courier delivery. In case of manufacturing defects or parcel damage, please provide an unboxing video to our WhatsApp support within 7 calendar days for replacement.
              </p>
              <h4 className="text-white font-semibold pt-2">3. Delivery Timelines</h4>
              <p>
                Standard delivery takes 24–48 hours in major metropolitan centers (Karachi, Lahore, Islamabad) and 2–4 business days for other regional destinations across Pakistan. Unforeseen courier delays due to weather or public holidays are communicated via WhatsApp.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
