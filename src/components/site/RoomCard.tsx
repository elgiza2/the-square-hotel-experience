import { Link } from "@tanstack/react-router";
import { BedDouble, Eye, ArrowUpLeft } from "lucide-react";
import { photo, type Room } from "@/lib/hotel";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link to="/rooms/$slug" params={{ slug: room.slug }} className="reveal group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
        <img src={photo(room.photos[0])} alt={room.nameAr} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="glass bottom-4 start-4 flex w-12 items-center justify-center text-primary-foreground">
          <ArrowUpLeft className="size-5" />
        </span>
        <span className="pill absolute end-4 top-4">فطار مشمول</span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{room.nameEn}</p>
      <h3 className="mt-1 text-xl">{room.nameAr}</h3>
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><BedDouble className="size-4" />{room.beds}</span>
        <span className="flex items-center gap-1"><Eye className="size-4" />{room.view}</span>
      </div>
    </Link>
  );
}
