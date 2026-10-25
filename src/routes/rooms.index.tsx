import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, Coffee, Wifi, ArrowRight, Eye } from "lucide-react";
import { rooms, photo, whatsappLink } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rooms/")({
  head: () => ({ meta: pageMeta("Rooms & suites | The Square Boutique Hotel, Cairo", "Choose a balcony, square-view window or quiet double room in Downtown Cairo. Breakfast included. Request availability directly.") }),
  component: RoomsPage,
});
function RoomsPage() {
  return <>
    <header className="mx-auto max-w-6xl px-5 pb-12 pt-32 md:pt-40">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><h1 className="text-5xl md:text-7xl">Your room.<br /><em>Your Cairo.</em></h1><p className="max-w-sm leading-7 text-muted-foreground">Wake up above Talaat Harb Square, or settle into a quiet retreat. Find your place in the heart of Downtown.</p></div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-y py-5 text-sm"><span className="flex items-center gap-2"><Coffee className="size-4 text-primary" />Breakfast included</span><span className="flex items-center gap-2"><Wifi className="size-4 text-primary" />Free Wi-Fi</span><span className="flex items-center gap-2"><BedDouble className="size-4 text-primary" />Private bathrooms</span></div>
    </header>
    <div className="mx-auto max-w-6xl px-5">
      {rooms.map((room,i) => <article key={room.slug} className="grid gap-8 border-b pb-12 mb-12 md:grid-cols-2 md:items-center md:gap-14">
        <Link to="/rooms/$slug" params={{slug:room.slug}} className={`group block overflow-hidden rounded-lg ${i%2 ? 'md:order-2' : ''}`}><img src={photo(room.photos[0])} alt={room.nameEn} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading={i===0 ? 'eager' : 'lazy'} /></Link>
        <div><span className="text-sm text-muted-foreground">0{i+1} / 0{rooms.length}</span><h2 className="mt-4 text-3xl md:text-4xl">{room.nameEn}</h2><p className="mt-5 leading-7 text-muted-foreground">{room.summary}</p><div className="mt-6 flex flex-wrap gap-5 text-sm"><span className="flex gap-2"><BedDouble className="size-4 text-primary" />{room.beds}</span><span className="flex gap-2"><Eye className="size-4 text-primary" />{room.view}</span></div><Button asChild className="mt-8 rounded-full px-6"><Link to="/rooms/$slug" params={{slug:room.slug}}>Explore & request a stay<ArrowRight /></Link></Button></div>
      </article>)}
    </div>
    <section className="bg-secondary px-5 py-14"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-3xl">Stay a little longer.</h2><p className="mt-3 max-w-xl text-muted-foreground">Stay 3 nights or more for complimentary airport transfers. Let reservations know at least 48 hours before arrival.</p></div><Button asChild className="rounded-full"><a href={whatsappLink('Hello, I would like to book a stay of 3 nights or more with airport transfers.')} target="_blank" rel="noreferrer">Plan my stay<ArrowRight /></a></Button></div></section>
  </>;
}
