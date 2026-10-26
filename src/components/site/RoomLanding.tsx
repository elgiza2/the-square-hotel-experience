import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Check, ChevronLeft, ChevronRight, Coffee, Eye, MapPin, MessageCircle, Plane, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/site/RoomCard";
import { hotel, photo, rooms, whatsappLink, type Room } from "@/lib/hotel";

export function RoomLanding({ room }: { room: Room }) {
  const [active, setActive] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const message = [
    `Hello, I would like to book «${room.nameEn}».`,
    name && `Name: ${name}`,
    checkIn && `Check-in: ${checkIn}`,
    checkOut && `Check-out: ${checkOut}`,
    `Guests: ${guests}`,
    "Please confirm availability and price.",
  ].filter(Boolean).join("\n");
  const requestStay = () => document.getElementById("request-stay")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });

  return <>
    <section className="pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5">
        <Link to="/rooms" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" />All rooms</Link>
        <div className="mt-6 grid gap-6 pb-9 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-14">
          <h1 className="text-4xl leading-tight md:text-6xl">{room.nameEn}</h1>
          <div><p className="max-w-md leading-7 text-muted-foreground">{room.summary}</p><Button size="lg" className="mt-5 rounded-full" onClick={requestStay}>Request this room<ArrowUpRight /></Button></div>
        </div>
      </div>
      <img src={photo(room.photos[0])} alt={room.nameEn} fetchPriority="high" className="h-[340px] w-full object-cover md:h-[480px] lg:h-[540px]" />
      <div className="border-b bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-5 px-5 py-6 text-sm md:grid-cols-4">
          <span className="flex items-center gap-3"><BedDouble className="size-5 shrink-0 text-primary" />{room.beds}</span>
          <span className="flex items-center gap-3"><Eye className="size-5 shrink-0 text-primary" />{room.view}</span>
          <span className="flex items-center gap-3"><Coffee className="size-5 shrink-0 text-primary" />Breakfast included</span>
          <span className="flex items-center gap-3"><MapPin className="size-5 shrink-0 text-primary" />Downtown Cairo</span>
        </div>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[.8fr_1.2fr] md:gap-16 md:py-24">
      <div><h2 className="h2-display">Your own space.<br /><em>At The Square.</em></h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">{room.summary}</p><ul className="mt-7 space-y-4">{room.highlights.map(highlight => <li key={highlight} className="flex items-center gap-3 border-b pb-4"><Check className="size-4 shrink-0 text-primary" />{highlight}</li>)}</ul></div>
      <div>
        <img src={photo(room.photos[active])} alt={`${room.nameEn} — photo ${active + 1}`} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
        <div className="mt-4 flex items-center justify-between"><span className="text-sm text-muted-foreground">{String(active + 1).padStart(2, "0")} / {String(room.photos.length).padStart(2, "0")}</span><div className="flex gap-2"><Button variant="outline" size="icon" className="rounded-full" aria-label="Previous room photo" onClick={() => setActive((active + room.photos.length - 1) % room.photos.length)}><ChevronLeft /></Button><Button variant="outline" size="icon" className="rounded-full" aria-label="Next room photo" onClick={() => setActive((active + 1) % room.photos.length)}><ChevronRight /></Button></div></div>
        <div className="mt-4 grid grid-cols-5 gap-2">{room.photos.map((image, index) => <Button key={image} variant="ghost" className={`h-auto overflow-hidden rounded-md p-0 ${active === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"}`} aria-label={`View photo ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><img src={photo(image)} alt="" loading="lazy" className="aspect-square w-full object-cover" /></Button>)}</div>
      </div>
    </section>

    <section className="border-y bg-muted px-5 py-16 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16"><h2 className="h2-display">Settle in.<br /><em>It’s all here.</em></h2><ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{room.facilities.map(facility => <li key={facility} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{facility}</li>)}</ul></div></section>

    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-24">
      <div><Plane className="mb-6 size-8 text-primary" /><h2 className="h2-display">Stay three nights.<br /><em>We’ll meet you there.</em></h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Complimentary airport transfers for stays of 3 nights or more. Notify reservations at least 48 hours before arrival.</p><Button variant="link" className="mt-4 px-0" onClick={requestStay}>Plan a longer stay<ArrowRight /></Button></div>
      <div className="ticket bg-lime px-8 py-12 md:px-12"><MapPin className="size-7 text-primary" /><h3 className="mt-5 text-3xl">Cairo, right outside.</h3><p className="mt-4 leading-7">{hotel.addressEn}</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-3"><Button asChild variant="link" className="px-0"><Link to="/location">Explore the neighbourhood<ArrowUpRight /></Link></Button><Button asChild variant="link" className="px-0"><Link to="/tours">Add an Egypt experience<ArrowUpRight /></Link></Button></div></div>
    </section>

    <section id="request-stay" className="scroll-mt-24 border-y bg-secondary px-5 py-16 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
      <div><h2 className="h2-display">Make this room<br /><em>your Cairo address.</em></h2><p className="mt-6 text-xl">{room.nameEn}</p><p className="mt-4 max-w-sm leading-7 text-muted-foreground">Send your dates to reservations. The team will confirm availability and your final price before your booking is confirmed.</p><Button asChild variant="link" className="mt-5 px-0"><a href={`tel:${hotel.phone}`}><Phone />{hotel.phoneDisplay}</a></Button></div>
      <div className="rounded-lg border bg-background p-6 md:p-8"><h3 className="text-2xl">Request your stay</h3><div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <label className="block sm:col-span-2">Name<input autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="mt-2 h-12 w-full rounded-md border bg-background px-3" /></label>
        <label className="block">Check-in<input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="mt-2 h-12 w-full min-w-0 rounded-md border bg-background px-3" /></label>
        <label className="block">Check-out<input type="date" min={checkIn} value={checkOut} onChange={e => setCheckOut(e.target.value)} className="mt-2 h-12 w-full min-w-0 rounded-md border bg-background px-3" /></label>
        <label className="block sm:col-span-2">Guests<select value={guests} onChange={e => setGuests(e.target.value)} className="mt-2 h-12 w-full rounded-md border bg-background px-3"><option value="1">1</option><option value="2">2</option></select></label>
      </div><Button asChild size="lg" className="mt-6 h-auto min-h-12 w-full whitespace-normal rounded-full px-4"><a href={whatsappLink(message)} target="_blank" rel="noreferrer"><MessageCircle />Send request on WhatsApp</a></Button><p className="mt-4 text-center text-xs leading-5 text-muted-foreground">A request, not a confirmed reservation.</p></div>
    </div></section>

    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24"><div className="flex flex-wrap items-end justify-between gap-5"><h2 className="h2-display">Another room.<br /><em>The same Square.</em></h2><Button asChild variant="link" className="px-0"><Link to="/rooms">All rooms<ArrowRight /></Link></Button></div><div className="mt-10 grid gap-10 md:grid-cols-2">{rooms.filter(other => other.slug !== room.slug).map(other => <RoomCard key={other.slug} room={other} />)}</div></section>
  </>;
}