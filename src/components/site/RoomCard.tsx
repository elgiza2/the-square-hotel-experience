import { Link } from "@tanstack/react-router";
import { BedDouble, Eye, ArrowUpRight } from "lucide-react";
import { photo, type Room } from "@/lib/hotel";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link to="/rooms/$slug" params={{ slug: room.slug }} className="reveal group block">
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <img src={photo(room.photos[0])} alt={room.nameEn} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-3"><h3 className="text-2xl">{room.nameEn}</h3><ArrowUpRight className="mt-1 size-5 shrink-0 text-primary" /></div>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><BedDouble className="size-4" />{room.beds}</span>
        <span className="flex items-center gap-2"><Eye className="size-4" />{room.view}</span>
      </div>
      <p className="mt-3 text-sm text-primary">Breakfast included · View room</p>
    </Link>
  );
}
