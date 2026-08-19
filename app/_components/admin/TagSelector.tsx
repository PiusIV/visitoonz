type Tag = { id: string; name: string; slug: string };

type Props = {
  tags: Tag[];
  selectedIds: string[];
  onToggle: (tagId: string) => void;
};

export default function TagSelector({ tags, selectedIds, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-widest uppercase text-gold">
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedIds.includes(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => onToggle(tag.id)}
              className={
                isSelected
                  ? "px-3 py-1.5 text-[11px] tracking-wide border transition-all bg-gold text-[#0A0A0A] border-gold"
                  : "px-3 py-1.5 text-[11px] tracking-wide border transition-all text-muted border-border hover:text-text hover:border-white/30"
              }
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
