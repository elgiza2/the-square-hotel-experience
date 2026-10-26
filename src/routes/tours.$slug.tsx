import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clock, Compass } from "lucide-react";
import { getTour, tourPhoto, tours, categories } from "@/lib/tours";
import { hotel, whatsappLink } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { TourCard } from "@/components/site/TourCard";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = getTour(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [...pageMeta("Tour unavailable | The Square Boutique Hotel", "Explore Egypt experiences arranged by The Square Boutique Hotel."), { name: "robots", content: "noindex" }] };
    const { tour } = loaderData;
    const image = tourPhoto(tour.photos[0]);
    return {
      meta: [...pageMeta(`${tour.nameEn} from Downtown Cairo | The Square Boutique Hotel`, `${tour.tagline} ${tour.overview[0]}`.slice(0, 160)), ...(image?.startsWith("https://") ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : [])],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: tour.nameEn,
            description: tour.overview.join(" "),
            provider: { "@type": "Hotel", name: hotel.nameEn, telephone: hotel.phone },
            itinerary: tour.highlights.map((h) => ({ "@type": "TouristAttraction", name: h })),
          }),
        },
      ],
    };
  },
  component: TourPage,
});

function TourPage() {
  const { tour } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const [name, setName] = useState("");
  const msg = [
    `Hello, I would like to book the tour «${tour.nameEn}».`,
    name && `Name: ${name}`,
    date && `Date: ${date}`,
    `Guests: ${people}`,
    "Please confirm the price and schedule.",
  ].filter(Boolean).join("\n");
  const main = tourPhoto(tour.photos[active]);
  const others = tours.filter((t) => t.slug !== tour.slug && t.category === tour.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-28 md:pb-24">
      <Link to="/tours" className="text-sm text-muted-foreground hover:text-primary">← All tours</Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="pill">{categories[tour.category]}</span>
        <span className="pill gap-1"><Clock className="size-3" />{tour.duration}</span>
      </div>
      <h1 className="mt-3 text-3xl md:text-5xl">{tour.nameEn}</h1>
      

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {main ? (
            <img src={main} alt={tour.nameEn} className="aspect-[16/10] w-full rounded-lg object-cover" />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-lg bg-secondary"><Compass className="size-16 text-primary" aria-hidden /></div>
          )}
          {tour.photos.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {tour.photos.map((p, i) => (
                <Button variant="ghost" aria-label={`View photo ${i+1}`} aria-pressed={i===active} key={p} onClick={() => setActive(i)} className={`h-auto p-0 overflow-hidden rounded-xl ${i === active ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}>
                  <img src={tourPhoto(p)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </Button>
              ))}
            </div>
          )}

          <p className="mt-10 text-2xl leading-relaxed">{tour.tagline}</p>
          <div className="mt-4 space-y-4 leading-8 text-muted-foreground">
            {tour.overview.map((p) => <p key={p}>{p}</p>)}
          </div>

          <h2 className="mt-12 text-2xl">Highlights</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {tour.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3"><Check className="size-4 text-primary" />{h}</li>
            ))}
          </ul>

          {tour.includes.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl">What’s included</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {tour.includes.map((i) => (
                  <div key={i.label} className="ticket rounded-lg bg-lime px-5 py-4">
                    <p className="text-[11px] font-medium">{i.label}</p>
                    <p className="mt-3 font-semibold">{i.value}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tour.itinerary && (
            <>
              <h2 className="mt-12 text-2xl">Your itinerary</h2>
              <ol className="mt-4 space-y-4">
                {tour.itinerary.map((d) => (
                  <li key={d.title} className="rounded-lg border p-6">
                    <h3 className="text-lg text-primary">{d.title}</h3>
                    <ul className="mt-3 space-y-2 text-muted-foreground">
                      {d.items.map((x) => <li key={x} className="flex gap-2"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />{x}</li>)}
                    </ul>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>

        <aside className="h-fit rounded-lg border bg-card p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-2xl">Request this experience</h2>
          <p className="mt-3 text-sm text-muted-foreground">Reservations will confirm the price and schedule for your dates and group.</p>
          <div className="mt-5 space-y-3 text-sm">
            <label className="block">Name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-full border bg-background px-4 py-2.5" /></label>
            <label className="block">Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-full border bg-background px-4 py-2.5" /></label>
            <label className="block">Guests
              <select value={people} onChange={(e) => setPeople(e.target.value)} className="mt-1 w-full rounded-full border bg-background px-4 py-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>
          <Button asChild className="mt-5 h-auto min-h-10 w-full whitespace-normal rounded-full px-3"><a href={whatsappLink(msg)} target="_blank" rel="noreferrer">Send request on WhatsApp</a></Button>
          <Button asChild variant="outline" className="mt-2 h-10 w-full rounded-full"><a href={`tel:${hotel.phone}`} dir="ltr">{hotel.phoneDisplay}</a></Button>
          <Link to="/rooms" className="mt-5 block rounded-2xl bg-pill p-4 text-sm text-pill-foreground">
            Still looking for a place to stay? <b>Explore rooms</b> Stay 3 nights or more for complimentary airport transfers.
          </Link>
        </aside>
      </div>

      {others.length > 0 && (
        <>
          <h2 className="mt-20 text-2xl">More experiences to discover</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((t) => <TourCard key={t.slug} tour={t} />)}
          </div>
        </>
      )}
    </div>
  );
}
