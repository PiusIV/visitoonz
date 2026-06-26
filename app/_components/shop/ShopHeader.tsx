export default function ShopHeader({ count }: { count: number }) {
  return (
    <div className="border-b border-border px-6 md:px-12 py-12">
      <span className="text-[10px] tracking-[0.22em] uppercase text-gold block mb-4">
        The collection
      </span>
      <div className="flex items-baseline justify-between">
        <h1 className="font-cormorant text-4xl md:text-6xl font-light text-text">
          All <em className="italic text-gold">pieces</em>
        </h1>
        <span className="text-[12px] text-muted tracking-wider">
          {count} {count === 1 ? "piece" : "pieces"}
        </span>
      </div>
    </div>
  );
}
