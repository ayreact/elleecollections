export default function TrustBadges() {
  const promises = [
    {
      title: 'Trendy Finds',
      description: 'Your Style',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Quality Goods',
      description: 'Best items',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Made to Wow You',
      description: 'Stand out',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="mt-0 py-8 bg-[#f5f1ea]">
      <h2 className="text-center text-xs font-bold uppercase tracking-widest text-stone-500 mb-8">
        The Ellee Assurance
      </h2>

      <div className="flex justify-center items-start gap-4 px-2">
        {promises.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#064e3b] mb-3 shadow-sm">
              {item.icon}
            </div>
            <h3 className="font-sans font-semibold text-sm text-stone-900 tracking-tight leading-tight mb-1">
              {item.title}
            </h3>
            <p className="text-[11px] text-stone-500 leading-tight">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
