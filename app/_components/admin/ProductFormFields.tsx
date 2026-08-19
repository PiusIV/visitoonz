type FormState = {
  name: string;
  slug: string;
  description: string;
  base_price: string;
  category_id: string;
};

type Props = {
  form: FormState;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  showSlug?: boolean;
  urlPreview?: string;
};

export default function ProductFormFields({
  form,
  onChange,
  showSlug = false,
  urlPreview,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-widest uppercase text-gold">
          Product name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="e.g. Canvas Art — Sunset"
          className="bg-transparent border border-border px-4 py-3 text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-gold"
        />
        {urlPreview && (
          <span className="text-[10px] text-muted">URL: {urlPreview}</span>
        )}
      </div>

      {showSlug && (
        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-gold">
            Slug
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={onChange}
            required
            className="bg-transparent border border-border px-4 py-3 text-[13px] text-text focus:outline-none focus:border-gold"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-widest uppercase text-gold">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={4}
          placeholder="Brief description of the product"
          className="bg-transparent border border-border px-4 py-3 text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-widest uppercase text-gold">
          Price (₦)
        </label>
        <input
          name="base_price"
          type="number"
          step="0.01"
          value={form.base_price}
          onChange={onChange}
          required
          placeholder="0.00"
          className="bg-transparent border border-border px-4 py-3 text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-gold"
        />
      </div>
    </>
  );
}
