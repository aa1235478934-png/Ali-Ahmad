/**
 * GadgetHub Central Configuration
 * Easily update your store details, WhatsApp business number, and policies here.
 */

export const STORE_CONFIG = {
  // Brand details
  name: 'GadgetHub',
  tagline: 'Smart Gadgets. Better Living.',
  description: 'Premium innovative gadgets and electronics designed to make your everyday life smarter, seamless, and futuristic.',

  // WhatsApp Business Configuration
  // REPLACE THIS WITH YOUR REAL WHATSAPP BUSINESS NUMBER (Country code + number without plus or spaces)
  // Example for Pakistan: "923001234567"
  whatsappNumber: '923001234567',
  
  // Default greeting for floating WhatsApp button
  defaultWhatsAppGreeting: 'Hi GadgetHub! I am browsing your store and would like to know more about your gadgets.',

  // Currency settings
  currency: 'PKR',
  currencySymbol: '₨',
  
  // Shipping & Policies
  shippingInfo: {
    freeShippingThreshold: 0, // Free shipping on all orders
    deliveryTime: '2 - 4 Business Days Across Pakistan',
    couriers: 'TCS, Trax & Leopards Courier',
    codAvailable: true,
  },

  warranty: '7 Days Checking & Replacement Guarantee',
  
  // Contact details
  contact: {
    phoneDisplay: '+92 300 1234567',
    email: 'support@gadgethub.pk',
    address: 'Suite 402, Tech Vista Center, Shahrah-e-Faisal, Karachi, Pakistan',
    hours: 'Mon - Sat: 10:00 AM – 9:00 PM PKT',
  },

  // Social Links
  socials: {
    instagram: 'https://instagram.com/gadgethub_pk',
    facebook: 'https://facebook.com/gadgethub.pk',
    youtube: 'https://youtube.com/@gadgethub_pk',
    tiktok: 'https://tiktok.com/@gadgethub_pk',
  },
};

/**
 * Format a number into Pakistani Rupee string (e.g. "₨ 12,499")
 */
export function formatPKR(amount: number): string {
  return `${STORE_CONFIG.currencySymbol} ${amount.toLocaleString('en-PK')}`;
}

/**
 * Generate a direct WhatsApp Order URL for a single product
 */
export function createProductWhatsAppUrl(
  productName: string,
  pricePKR: number,
  quantity: number = 1,
  productCodeOrUrl: string = ''
): string {
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gadgethub.pk';
  const itemUrl = productCodeOrUrl ? `${currentUrl}/#product-${productCodeOrUrl}` : currentUrl;
  
  const lines = [
    `*NEW ORDER INQUIRY - ${STORE_CONFIG.name.toUpperCase()}*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `📦 *Product:* ${productName}`,
    `🔢 *Quantity:* ${quantity}`,
    `💰 *Unit Price:* ${formatPKR(pricePKR)}`,
    `💵 *Total Amount:* ${formatPKR(pricePKR * quantity)}`,
    `🔗 *Product Link:* ${itemUrl}`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `_Please confirm availability and dispatch schedule. Thank you!_`
  ];

  const message = lines.join('\n');
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a WhatsApp Checkout URL for the complete shopping cart
 */
export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  orderNotes?: string;
}

export function createCartWhatsAppUrl(
  items: Array<{ name: string; pricePKR: number; quantity: number }>,
  subtotal: number,
  customer?: OrderCustomerDetails
): string {
  const lines: string[] = [
    `*ORDER CHECKOUT - ${STORE_CONFIG.name.toUpperCase()}*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `🛍️ *ORDERED ITEMS (${items.length}):*`,
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} × ${formatPKR(item.pricePKR)} = *${formatPKR(item.pricePKR * item.quantity)}*`
    );
  });

  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`💳 *Order Subtotal:* ${formatPKR(subtotal)}`);
  lines.push(`🚚 *Delivery:* FREE (Across Pakistan)`);
  lines.push(`💵 *Total Payable (COD):* *${formatPKR(subtotal)}*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);

  if (customer && customer.fullName.trim()) {
    lines.push(`📍 *DELIVERY DETAILS:*`);
    lines.push(`• *Name:* ${customer.fullName.trim()}`);
    lines.push(`• *Phone:* ${customer.phone.trim()}`);
    lines.push(`• *City:* ${customer.city.trim()}`);
    lines.push(`• *Address:* ${customer.address.trim()}`);
    if (customer.orderNotes?.trim()) {
      lines.push(`• *Special Instructions:* ${customer.orderNotes.trim()}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  } else {
    lines.push(`_I would like to place an order for these items. Please reply to confirm delivery details._`);
  }

  lines.push(`_Thank you for choosing ${STORE_CONFIG.name}!_`);

  const message = lines.join('\n');
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a general WhatsApp chat URL
 */
export function createGeneralWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || STORE_CONFIG.defaultWhatsAppGreeting;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
