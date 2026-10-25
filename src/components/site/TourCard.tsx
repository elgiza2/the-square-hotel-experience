import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { tourPhoto, categories, type Tour } from "@/lib/tours";

export function TourCard({ tour, large }: { tour: Tour; large?: boolean }) {
  const img = tourPhoto(tour.photos[0]);
  return (
    <Link to="/tours/$slug" params={{ slug: tour.slug }} className="reveal group block">
      <div className={`relative overflow-hidden rounded-[22px] bg-primary ${large ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        {img ? (
          <img src={img} alt={tour.nameAr} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex size-full items-end p-6 text-3xl text-primary-foreground">{tour.nameAr}</div>
        )}
        <span className="pill absolute end-4 top-4">{categories[tour.category]}</span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4" />{tour.duration}</div>
      <h3 className="mt-1 text-xl">{tour.nameAr}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{tour.tagline}</p>
    </Link>
  );
}
