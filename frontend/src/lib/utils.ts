import { CartItem } from './types';

export const OWNER_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2348123757600';

export function formatCurrency(val: number): string {
  return '₦' + Number(val).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatWhatsAppPayload(
  items: CartItem[],
  name: string,
  city: string,
  giftNote: string
): string {
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  let message = `*NEW ORDER*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${name || 'N/A'}\n`;
  message += `City: ${city || 'N/A'}\n`;
  if (giftNote) {
    message += `Gift Note: ${giftNote}\n`;
  }
  
  message += `\n*Order Items:*\n`;
  items.forEach((item) => {
    message += `${item.qty}x ${item.title}`;
    if (item.variant) {
      message += ` (${item.variant})`;
    }
    message += ` - ${formatCurrency(item.price * item.qty)}\n`;
  });

  message += `\n*Estimated Total: ${formatCurrency(total)}*`;

  return message;
}

export function getWhatsAppUrl(payload: string): string {
  return `https://api.whatsapp.com/send?phone=${OWNER_PHONE}&text=${encodeURIComponent(payload)}`;
}
