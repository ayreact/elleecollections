export default function ProductCardSkeleton() {
  return (
    <article className="bg-white rounded-xl border border-stone-200/90 shadow-sm flex flex-col overflow-hidden animate-pulse">
      <div className="relative aspect-square w-full bg-stone-100/80"></div>
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="h-[2.5rem] flex flex-col space-y-1.5 py-1">
            <div className="h-3 bg-stone-200/80 rounded w-3/4"></div>
            <div className="h-3 bg-stone-200/80 rounded w-1/2"></div>
          </div>
          <div className="mt-1 flex items-baseline justify-between pt-1">
            <div className="h-3.5 bg-stone-200/80 rounded w-16"></div>
          </div>
        </div>
        <div className="mt-3 w-full h-[34px] bg-stone-200/80 rounded-lg"></div>
      </div>
    </article>
  );
}
