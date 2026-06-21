interface ChildrenProps {
  children: React.ReactNode;
}

export default function HeroButton({ children }: ChildrenProps) {
  return (
    <button className="rounded-sm text-sm md:text-lg md:rounded:lg p-3 border border-gray-500 w-auto hover:cursor-pointer hover:text-gray-500">
      {children}
    </button>
  );
}
