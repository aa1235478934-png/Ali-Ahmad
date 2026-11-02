import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/storeConfig';

interface HeaderProps {
  onOpenSearch: () => void;
  onSelectCategory?: (slug: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Shop', href: '#shop' },
    { label: 'Categories', href: '#categories' },
    { label: 'Videos', href: '#videos' },
    { label: 'Trending', href: '#trending' },
    { label: 'About Us', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070A11]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40'
            : 'bg-[#070A11] border-b border-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#top"
              className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 text-slate-100 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-5 h-5 fill-slate-950 stroke-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-tight font-sans">
                  Gadget<span className="text-amber-400">Hub</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Smart Gadgets
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Search, Cart, and Mobile Menu */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search gadgets"
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline text-slate-400">Search gadgets...</span>
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={openCart}
                aria-label={`Shopping Cart with ${totalItems} items`}
                className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-lg transition-all whitespace-nowrap shrink-0 group"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">Cart</span>
                {totalItems > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center tabular-nums">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800/80 bg-[#0B1120] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex flex-col gap-2">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-semibold text-xs rounded-lg transition-colors"
              >
                Chat on WhatsApp (+{STORE_CONFIG.whatsappNumber})
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
