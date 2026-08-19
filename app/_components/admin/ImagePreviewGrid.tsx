import Image from "next/image";

type Props = {
  previews: string[];
  onRemove: (index: number) => void;
  showPrimaryBadge?: boolean;
};

export default function ImagePreviewGrid({
  previews,
  onRemove,
  showPrimaryBadge = false,
}: Props) {
  if (previews.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {previews.map((src, i) => (
        <div key={i} className="relative w-20 h-20 group">
          <Image
            src={src}
            alt={"preview-" + i}
            fill
            unoptimized
            className="object-cover border border-border"
            sizes="80px"
          />
          {showPrimaryBadge && i === 0 && (
            <span className="absolute top-1 left-1 text-[8px] bg-gold text-[#0A0A0A] px-1 z-10">
              Primary
            </span>
          )}
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center z-10"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
