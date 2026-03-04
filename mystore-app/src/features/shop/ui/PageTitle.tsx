
type Props = {
  title?: string;
};

export default function PageTitle({ title }: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        {title || "All Products"}
      </h1>
      <div className="w-24 h-1 bg-indigo-600 mt-3 rounded" />
    </div>
  );
}

// src/features/shop/ui/PageTitle.tsx
