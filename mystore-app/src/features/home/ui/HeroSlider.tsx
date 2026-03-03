
import type { Slide } from "../api/fetchSlides";

type Props = {
  slides: Slide[];
};

export default function HeroSlider({ slides }: Props) {
  if (slides.length === 0)
    return <div className="h-64 bg-slate-200 animate-pulse rounded"></div>;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="flex w-full animate-slide">
        {slides.map((s) => (
          <div key={s.id} className="min-w-full">
            <img
              src={s.image}
              alt={s.title}
              className="h-64 w-full object-cover md:h-96"
            />
          </div>
        ))}
      </div>
    </div>
  );
}