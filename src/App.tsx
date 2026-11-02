import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Product } from './types/store';

// UI Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductGrid } from './components/ProductGrid';
import { VideoShowcaseSection } from './components/VideoShowcaseSection';
import { TrendingSection } from './components/TrendingSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WhatsAppCartDrawer } from './components/WhatsAppCartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartToast } from './components/CartToast';
import { PolicyModals } from './components/PolicyModals';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);

  const handleShopNow = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoClick = () => {
    const vidEl = document.getElementById('videos');
    if (vidEl) {
      vidEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
        {/* Top Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectCategory={handleSelectCategory}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onShopClick={handleShopNow}
            onVideoClick={handleVideoClick}
          />

          {/* 2. Categories Navigation Strip */}
          <CategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 3. Product Catalog Grid */}
          <ProductGrid
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onClearFilters={handleClearFilters}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectCategory={setSelectedCategory}
          />

          {/* 4. Video Showcase ("See Our Gadgets in Action") */}
          <VideoShowcaseSection
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* 5. Trending Products & Promotional Banner */}
          <TrendingSection
            products={PRODUCTS}
            onExploreCollection={handleShopNow}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* 6. About Us */}
          <AboutSection />

          {/* 7. Interactive FAQ */}
          <FaqSection />
        </main>

        {/* 8. Footer */}
        <Footer
          onSelectCategory={handleSelectCategory}
          onOpenPrivacy={() => setPolicyModal('privacy')}
          onOpenTerms={() => setPolicyModal('terms')}
        />

        {/* WhatsApp Cart Slide-Over Drawer */}
        <WhatsAppCartDrawer />

        {/* Product Detail Quick View Modal */}
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={(p) => setQuickViewProduct(p)}
        />

        {/* Privacy & Terms Modals */}
        <PolicyModals
          type={policyModal}
          onClose={() => setPolicyModal(null)}
        />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Cart Item Added Toast */}
        <CartToast />
      </div>
    </CartProvider>
  );
}
