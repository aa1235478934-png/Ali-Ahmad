import React from 'react';
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onSelectCategory: (slug: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#05080E] border-t border-slate-900 text-slate-400 text-xs">
      {/* Upper Footer: 4-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#top" className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black">
                <Zap className="w-4 h-4 fill-slate-950 stroke-slate-950" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Gadget<span className="text-amber-400">Hub</span>
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {STORE_CONFIG.tagline} — Pakistan's premier destination for high-end innovative gadgets, levitating audio, 4K laser projection, smart home automation, and cyberpunk workspace setups.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 stroke-none" />
                <span>WhatsApp: +{STORE_CONFIG.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Gadget Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      const shopEl = document.getElementById('shop');
                      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Quick Links & Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Information
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-amber-400 transition-colors">
                  Video Demos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  How to Order
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{STORE_CONFIG.contact.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{STORE_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{STORE_CONFIG.contact.hours}</span>
              </div>
            </div>

            {/* Social media links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={STORE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={STORE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={STORE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
                aria-label="YouTube"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900/90 py-6 bg-[#04060B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {currentYear} {STORE_CONFIG.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Free Delivery across Pakistan</span>
            <span aria-hidden="true">·</span>
            <span>7-Day Checking Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
