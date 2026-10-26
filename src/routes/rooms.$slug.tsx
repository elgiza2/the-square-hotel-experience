import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, BedDouble, Eye } from "lucide-react";
import { getRoom, photo, rooms, hotel, whatsappLink } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const room = getRoom(params.slug);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Room not found | The Square" }, { name: "robots", content: "noindex" }] };
    const { room } = loaderData;
    return {
      meta: pageMeta(`${room.nameEn} | The Square Boutique Hotel`, `${room.summary} Breakfast included in Downtown Cairo.`),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            name: room.nameEn,
            description: room.summary,
            containedInPlace: { "@type": "Hotel", name: hotel.nameEn },
            amenityFeature: room.facilities.map((f) => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
          }),
        },
      ],
    };
  },
  component: RoomPage,
});

function RoomPage() {
  const { room } = Route.useLoaderData();
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

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28">
      <Link to="/rooms" className="text-sm text-muted-foreground hover:text-primary">← All rooms</Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          
          <h1 className="mt-1 text-4xl text-primary">{room.nameEn}</h1>
          <div className="mt-6 overflow-hidden rounded-lg">
            <img src={photo(room.photos[active])} alt={room.nameEn} className="aspect-[4/3] w-full object-cover" />
          </div>
          {room.photos.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {room.photos.map((p, i) => (
                <Button variant="ghost" aria-label={`View photo ${i+1}`} aria-pressed={i===active} key={p} onClick={() => setActive(i)} className={`h-auto p-0 overflow-hidden rounded ${i === active ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}>
                  <img src={photo(p)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </Button>
              ))}
            </div>
          )}
          <p className="mt-8 text-lg leading-8">{room.summary}</p>
          <div className="mt-4 flex flex-wrap gap-5 text-muted-foreground">
            <span className="flex items-center gap-1"><BedDouble className="size-4" />{room.beds}</span>
            <span className="flex items-center gap-1"><Eye className="size-4" />{room.view}</span>
          </div>
          <h2 className="mt-10 text-2xl text-primary">Amenities</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {room.facilities.map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="size-4 text-accent" />{f}</li>
            ))}
          </ul>
          <div className="mt-8 rounded-lg bg-secondary p-5 text-sm leading-7">
            <strong>Airport transfers:</strong> Complimentary for stays of 3 nights or more. Notify reservations at least 48 hours before arrival.
          </div>
        </div>

        <aside className="h-fit rounded-lg border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="text-xl text-primary">Request your stay</h2>
          <p className="mt-1 text-sm text-muted-foreground">Reservations will confirm availability and your final price.</p>
          <div className="mt-5 space-y-3 text-sm">
            <label className="block">Name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
            <label className="block">Check-in<input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
            <label className="block">Check-out<input type="date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" /></label>
            <label className="block">Guests
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2">
                <option value="1">1</option><option value="2">2</option>
              </select>
            </label>
          </div>
          <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="mt-5 block rounded-md bg-primary px-4 py-3 text-center font-medium text-primary-foreground hover:bg-primary/90">
            Send request on WhatsApp
          </a>
          <a href={`tel:${hotel.phone}`} className="mt-2 block rounded-md border px-4 py-3 text-center text-sm" dir="ltr">{hotel.phoneDisplay}</a>
        </aside>
      </div>

      <h2 className="mt-20 text-2xl text-primary">Other rooms</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {rooms.filter((r) => r.slug !== room.slug).map((r) => (
          <Link key={r.slug} to="/rooms/$slug" params={{ slug: r.slug }} className="flex items-center gap-4 rounded-lg border bg-card p-3 hover:shadow">
            <img src={photo(r.photos[0])} alt="" className="size-20 rounded object-cover" />
            <span className="text-primary">{r.nameEn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
