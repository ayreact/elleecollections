export default function HeroBanner() {
  return (
    <section className="p-4">
      <div className="relative rounded-2xl overflow-hidden bg-stone-900 text-white shadow-md border border-stone-200/50">
        <img
          alt="Luxury curated gift hampers"
          className="w-full h-44 object-cover opacity-65 scale-100 hover:scale-105 transition-transform duration-700"
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent flex flex-col justify-end p-4">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white leading-tight">
            Trendy. Affordable. Always You.
          </h1>
          <p className="text-stone-300 text-xs mt-1 font-light line-clamp-1">
            Shop Ellee Collections for clothing, bags, shoes, jewelleries, hats & more.
          </p>
        </div>
      </div>
    </section>
  );
}
