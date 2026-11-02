# GadgetHub — Smart Gadgets. Better Living.

A complete, premium, responsive e-commerce storefront for innovative gadgets and electronics with instant WhatsApp ordering and shopping cart checkout.

---

## ⚡ Quick Configuration Guide

### 1. How to Change Your WhatsApp Business Number
Open `/src/config/storeConfig.ts` and update the `whatsappNumber` field:

```typescript
export const STORE_CONFIG = {
  name: 'GadgetHub',
  tagline: 'Smart Gadgets. Better Living.',

  // Enter your country code + number with NO plus sign, spaces, or dashes
  // Example for Pakistan: "923001234567"
  whatsappNumber: '923001234567',
  
  // Store contact details, warranty, and courier information
  ...
};
```

When customers click **"Order on WhatsApp"** or **"Checkout on WhatsApp"**, messages will automatically be routed directly to this phone number with a pre-filled, formatted order summary.

---

### 2. How to Add or Edit Products
Open `/src/data/products.ts`. You can edit existing products or add a new product object to the `PRODUCTS` array:

```typescript
{
  id: 'gh-item-10',
  slug: 'my-smart-gadget',
  name: 'Ultra-Compact Cyber Drone',
  tagline: 'Pocket 4K obstacle avoidance drone',
  category: 'Trending Electronics',
  categorySlug: 'trending-electronics',
  pricePKR: 35000,
  originalPricePKR: 42000,
  rating: 4.9,
  reviewCount: 15,
  inStock: true,
  featured: true,
  trending: true,
  image: '/src/assets/images/...', // or imported asset
  badge: 'New Arrival',
  description: 'Detailed description of the gadget...',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  specs: {
    'Battery': '45 Mins',
    'Camera': '4K HDR 60fps',
    'Weight': '249g'
  }
}
```

---

### 3. How to Add or Change Showcase Videos
Open `/src/data/videos.ts`. You can add MP4 video URLs or standard YouTube URLs:

```typescript
{
  id: 'vid-demo-05',
  title: 'Smart Gadget Demo Title',
  description: 'What the video demonstrates...',
  duration: '02:30',
  videoType: 'mp4', // or 'youtube'
  videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID', // or MP4 direct link
  thumbnail: myThumbnailImage,
  productId: 'gh-item-10', // Product ID it links to
  badge: 'Lab Test'
}
```

---

### 4. How to Update FAQs & Business Policies
- **FAQs**: Edit `/src/data/faq.ts`.
- **Privacy & Terms**: Edit `/src/components/PolicyModals.tsx`.
- **Contact Details**: Edit `/src/config/storeConfig.ts`.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📦 Deployment Instructions

1. **Vercel / Netlify / Cloudflare Pages**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
2. **Cloud Run / Docker**:
   - Run `npm run build` to generate production static assets served via your web server.
