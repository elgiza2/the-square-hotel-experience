import { createFileRoute } from "@tanstack/react-router";
import { hotel, nearby } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: pageMeta(
      "Location | The Square Boutique Hotel, Talaat Harb Square",
      "Find the hotel at 3 Talaat Harb Square, Downtown Cairo, close to Tahrir Square and the Egyptian Museum.",
    ),
  }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <>
      <PageHeader eyebrow="Location" title="At the heart of Downtown." intro={hotel.addressEn} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.4fr_1fr]">
        <iframe title="Hotel location map" src={hotel.mapsEmbed} className="h-[420px] w-full rounded-lg border" loading="lazy" />
        <div>
          <h2 className="text-2xl text-primary">Nearby places</h2>
          <ul className="mt-4 divide-y">
            {nearby.map((n) => (
              <li key={n.name} className="flex justify-between py-3"><span>{n.name}</span><span className="text-muted-foreground">{n.distance}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Distances are approximate.</p>
          <a href={hotel.mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-primary-foreground">Open in Google Maps</a>
        </div>
      </div>
    </>
  );
}
