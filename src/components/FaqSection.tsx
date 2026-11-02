import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faq';
import { STORE_CONFIG } from '../config/storeConfig';

export const FaqSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'ordering' | 'delivery' | 'payment' | 'warranty'>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#070A11] border-t border-slate-900/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Help & Clarifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about placing an order, Cash on Delivery, delivery schedules across Pakistan, and checking warranties.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(
            [
              { id: 'all', label: 'All Questions' },
              { id: 'ordering', label: 'WhatsApp Ordering' },
              { id: 'delivery', label: 'Delivery & Shipping' },
              { id: 'payment', label: 'Cash on Delivery & Payment' },
              { id: 'warranty', label: '7-Day Warranty' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Inquiry Callout */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-5 h-5 fill-[#25D366]/20" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific question?</h4>
              <p className="text-xs text-slate-400">
                Our support team is active on WhatsApp to answer your questions in minutes.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi GadgetHub, I have a quick question about ordering an item.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors whitespace-nowrap cursor-pointer"
          >
            Chat with Representative
          </a>
        </div>
      </div>
    </section>
  );
};
