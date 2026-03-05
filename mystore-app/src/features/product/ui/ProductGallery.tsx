
import { memo, useState } from "react";
import { productImagePath } from "@/shared/utils/productImagePath";
import Button from "@/shared/ui/Button";

interface Props {
  imageName:    string;
  categoryName: string;
  productName:  string;
}

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f1f5f9'/%3E%3Crect x='60' y='70' width='80' height='70' rx='6' fill='%23cbd5e1'/%3E%3Ccircle cx='85' cy='62' r='12' fill='%23cbd5e1'/%3E%3C/svg%3E";

const ProductGallery = memo(function ProductGallery({ imageName, categoryName, productName }: Props) {
  const src = productImagePath(categoryName, imageName);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError,    setImgError]    = useState(false);

  const thumbCount = 3;

  function getDisplaySrc(): string {
    return imgError ? PLACEHOLDER : src;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center p-6 min-h-[320px] md:min-h-[400px] overflow-hidden group">
        <img
          src={getDisplaySrc()}
          alt={productName}
          className="max-h-[360px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Miniatures */}
      {!imgError && (
        <div className="flex gap-3">
          {Array.from({ length: thumbCount }, (_, i) => (
            <Button
              key={i}
              onClick={() => setActiveIndex(i)}
              variant="plain"
              size="none"
              radius="xl"
              className={[
                "w-20 h-20 rounded-xl border-2 flex items-center justify-center p-2 bg-white transition-all duration-200",
                activeIndex === i ? "border-indigo-500 shadow-md" : "border-slate-200 hover:border-indigo-300",
              ].join(" ")}
              aria-label={`Vue ${i + 1}`}
            >
              <img
                src={src}
                alt={`Vue ${i + 1}`}
                className="max-h-full object-contain"
                onError={() => setImgError(true)}
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
});

export default ProductGallery;