
import { memo, useMemo, useState } from "react";
import type { Product }   from "@/shared/types/Product";
import Button from "@/shared/ui/Button";

interface Props { product: Product }

type Tab = "Description" | "Specifications";
const TABS: Tab[] = ["Description", "Specifications"];

const ProductDescription = memo(function ProductDescription({ product }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  const specs = useMemo(
    () => [
      { label: "SKU", value: String(product.id) },
      { label: "Brand", value: product.categoryName },
      { label: "Rating", value: `${product.review ?? "—"}/5` },
      { label: "Stock", value: product.inStock !== false ? "Available" : "Out of stock" },
      { label: "Discount", value: product.discountRate ? `${product.discountRate}%` : "None" },
    ],
    [product.id, product.categoryName, product.review, product.inStock, product.discountRate]
  );

  const descriptionParagraphs = useMemo(
    () => (product.description ? product.description.split("\n") : []),
    [product.description]
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Onglets */}
      <div className="flex border-b border-slate-100">
        {TABS.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant="plain"
            size="none"
            radius="none"
            className={[
              "px-6 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px",
              activeTab === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Contenu */}
      <div className="p-6">
        {activeTab === "Description" && (
          <div className="text-sm leading-relaxed text-slate-600 space-y-3">
            {descriptionParagraphs.length > 0
              ? descriptionParagraphs.map((para, i) => <p key={i}>{para}</p>)
              : <p className="text-slate-400 italic">No description available.</p>
            }
          </div>
        )}

        {activeTab === "Specifications" && (
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