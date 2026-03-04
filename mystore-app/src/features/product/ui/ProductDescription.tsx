// src/features/product/ui/ProductDescription.tsx
import { memo, useState } from "react";
import type { Product }   from "@/shared/types/Product";

interface Props { product: Product }

type Tab = "Description" | "Caractéristiques";
const TABS: Tab[] = ["Description", "Caractéristiques"];

const ProductDescription = memo(function ProductDescription({ product }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  const specs = [
    { label: "Référence", value: String(product.id) },
    { label: "Marque",    value: product.categoryName },
    { label: "Note",      value: `${product.review ?? "—"}/5` },
    { label: "Stock",     value: product.inStock !== false ? "Disponible" : "Épuisé" },
    { label: "Remise",    value: product.discountRate ? `${product.discountRate}%` : "Aucune" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Onglets */}
      <div className="flex border-b border-slate-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "px-6 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px",
              activeTab === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {activeTab === "Description" && (
          <div className="text-sm leading-relaxed text-slate-600 space-y-3">
            {product.description
              ? product.description.split("\n").map((para, i) => <p key={i}>{para}</p>)
              : <p className="text-slate-400 italic">Aucune description disponible.</p>
            }
          </div>
        )}

        {activeTab === "Caractéristiques" && (
          <table className="w-full text-sm">
            <tbody>
              {specs.map(({ label, value }, i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                  <td className="py-3 px-4 font-semibold text-slate-600 w-1/3 rounded-l-lg">{label}</td>
                  <td className="py-3 px-4 text-slate-700 capitalize rounded-r-lg">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

export default ProductDescription;