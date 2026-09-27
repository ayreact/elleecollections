export default function PrivacyPage() {
  return (
    <div className="min-h-[70vh] bg-stone-50 py-12 px-6 sm:px-12 md:px-16">
      <div className="max-w-3xl mx-auto space-y-8 text-stone-700 text-sm leading-relaxed">
        <h1 className="font-serif text-3xl text-emerald-900 font-bold mb-8">Privacy Policy</h1>
        
        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">1. Data Collection</h2>
          <p>We collect essential information to process your orders and provide a seamless WhatsApp checkout experience. This includes your name, phone number, and delivery address.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">2. Use of Information</h2>
          <p>Your personal data is used exclusively to fulfill orders, arrange delivery, and communicate with you regarding your purchases. We do not sell or share your data with third parties for marketing purposes.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">3. Data Protection</h2>
          <p>We implement standard security measures to protect your personal information against unauthorized access, alteration, or disclosure. Order details are communicated securely via WhatsApp's end-to-end encryption.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">4. Your Rights</h2>
          <p>You have the right to request access to or deletion of your personal data stored by us. Please contact us via our official WhatsApp channel for any such requests.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl text-emerald-800 font-semibold">5. Cookies</h2>
          <p>Our website may use local storage and cookies to remember your cart items and preferences while you browse.</p>
        </section>
      </div>
    </div>
  );
}
