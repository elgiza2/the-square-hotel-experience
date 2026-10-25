import { Link } from "@tanstack/react-router";
import { BedDouble, Eye } from "lucide-react";
import { photo, type Room } from "@/lib/hotel";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      to="/rooms/$slug"
      params={{ slug: room.slug }}
      className="group block overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={photo(room.photos[0])}
          alt={room.nameAr}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="font-serif text-sm text-muted-foreground" dir="ltr">{room.nameEn}</p>
        <h3 className="mt-1 text-xl text-primary">{room.nameAr}</h3>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="size-4" />{room.beds}</span>
          <span className="flex items-center gap-1"><Eye className="size-4" />{room.view}</span>
        </div>
        <p className="mt-4 text-sm font-medium text-accent">شوف التفاصيل ←</p>
      </div>
    </Link>
  );
}
