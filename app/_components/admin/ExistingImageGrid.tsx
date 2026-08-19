import Image from "next/image";

type ExistingImage = {
  id: string;
  url: string;
  is_primary: boolean;
};

type Props = {
  images: ExistingImage[];
  onSetPrimary: (imageId: string) => void;
  onRemove: (imageId: string) => void;
};

export default function ExistingImageGrid({
  images,
  onSetPrimary,
  onRemove,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {images.map((img) => (
        <div key={img.id} className="relative w-20 h-20 group">
          <Image
            src={img.url}
            alt="product"
            fill
            className="object-cover border border-border"
            sizes="80px"
          />
          {img.is_primary && (
            <span className="absolute top-1 left-1 text-[8px] bg-gold text-[#0A0A0A] px-1 z-10">
              Primary
            </span>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
            {!img.is_primary && (
              <button
                type="button"
                onClick={() => onSetPrimary(img.id)}
                className="text-[8px] text-gold uppercase"
              >
                Set primary
              </button>
            )}
            <button
              type="button"
              onClick={() => onRemove(img.id)}
              className="text-[8px] text-red-400 uppercase"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
