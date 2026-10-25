import { Link } from "@tanstack/react-router";
import { Clock, ArrowUpRight, Compass } from "lucide-react";
import { tourPhoto, categories, type Tour } from "@/lib/tours";

export function TourCard({ tour, large }: { tour: Tour; large?: boolean }) {
  const img = tourPhoto(tour.photos[0]);
  return (
    <Link to="/tours/$slug" params={{ slug: tour.slug }} className="reveal group block">
      <div className={`overflow-hidden rounded-lg bg-secondary ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {img ? <img src={img} alt={tour.nameEn} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex size-full items-center justify-center"><Compass className="size-16 text-primary" aria-hidden /></div>}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-muted-foreground"><span>{categories[tour.category]}</span><span className="flex items-center gap-1"><Clock className="size-3" />{tour.duration}</span></div>
      <div className="mt-2 flex items-start justify-between gap-3"><h3 className="text-xl">{tour.nameEn}</h3><ArrowUpRight className="mt-1 size-4 shrink-0 text-primary" /></div>
      <p className="mt-2 text-sm text-muted-foreground">{tour.tagline}</p>
    </Link>
  );
}
