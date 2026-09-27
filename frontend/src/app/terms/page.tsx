export default function TermsPage() {
  return (
    <div className="min-h-[70vh] bg-stone-50 py-12 px-6 sm:px-12 md:px-16">
      <div className="max-w-3xl mx-auto space-y-8 text-stone-700 text-sm leading-relaxed">
        <h1 className="font-serif text-3xl text-emerald-900 font-bold mb-8">Terms of Service</h1>
        
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">1. Introduction</h2>
          <p>Welcome to Ellee Collections. By using our website and placing orders through our WhatsApp checkout, you agree to these Terms of Service.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">2. WhatsApp Checkout Model</h2>
          <p>Our platform allows you to browse products and compile a cart. The final checkout and order confirmation process is completed via WhatsApp. This allows us to provide personalized service and confirm availability before you pay.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">3. Pricing and Availability</h2>
          <p>While we strive to keep our catalog up to date, product availability and pricing are subject to final confirmation during the WhatsApp checkout process. We reserve the right to modify prices or cancel orders if items are out of stock.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">4. Shipping and Returns</h2>
          <p>Shipping costs and delivery timelines will be discussed and agreed upon via WhatsApp. Returns and exchanges are handled on a case-by-case basis. Please inspect your items upon delivery.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">5. Modifications</h2>
          <p>We may update these terms occasionally. Continued use of our service implies acceptance of any changes.</p>
        </section>
      </div>
    </div>
  );
}
