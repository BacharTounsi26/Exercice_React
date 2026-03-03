import type { Slide } from "../api/fetchSlides";
import { imagePath } from "@/shared/utils/imagePath";
import { useHeroSlider } from "../hooks/useHeroSlider";

type Props = {
  slides: Slide[];
};

export default function HeroSlider({ slides }: Props) {
  if (slides.length === 0)
    return <div className="h-64 bg-slate-200 animate-pulse rounded"></div>;

  const { current, next, prev } = useHeroSlider(slides.length);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.id} className="min-w-full">
            <img
              src={imagePath(s.image)}
              alt={s.title}
              className="h-64 w-full object-cover md:h-96"
            />
          </div>
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded"
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded"
      >
        ›
      </button>
    </div>
  );
}