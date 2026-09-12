export default function WhatsAppBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-[#073d2f] to-emerald-900 text-stone-100 px-4 py-2.5 flex items-center justify-between text-xs shadow-inner">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center justify-center p-1 bg-emerald-800/80 rounded-full text-emerald-200">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 17.89c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.32c0-4.51 3.67-8.18 8.18-8.18 2.19 0 4.24.85 5.79 2.4 1.55 1.55 2.4 3.6 2.4 5.79 0 4.51-3.67 8.17-8.18 8.17z" />
          </svg>
        </span>
        <span className="font-medium text-emerald-100/90 text-[11px] tracking-wide">
          Frictionless Guest Checkout via WhatsApp
        </span>
      </div>
      <span className="bg-emerald-800/90 text-amber-200 border border-emerald-700/60 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wider uppercase">
        No Login
      </span>
    </div>
  );
}
