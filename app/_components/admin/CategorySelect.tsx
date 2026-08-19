import type { FlatCategory } from "@/app/_lib/admin-helpers";

type Props = {
  value: string;
  options: FlatCategory[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CategorySelect({ value, options, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-widest uppercase text-gold">
        Category
      </label>
      <select
        name="category_id"
        value={value}
        onChange={onChange}
        required
        className="bg-bg border border-border px-4 py-3 text-[13px] text-text focus:outline-none focus:border-gold appearance-none"
      >
        <option value="" disabled>
          Select a category
        </option>
        {options.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
