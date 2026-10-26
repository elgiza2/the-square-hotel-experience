import { createFileRoute } from "@tanstack/react-router";
import { hotel, nearby } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 lg:grid-cols-[1.4fr_1fr] md:pb-24">
        <iframe title="Hotel location map" src={hotel.mapsEmbed} className="h-[340px] w-full rounded-lg border bg-muted md:h-[420px]" loading="eager" />
        <div>
          <h2 className="text-2xl text-primary">Nearby places</h2>
          <ul className="mt-4 divide-y">
            {nearby.map((n) => (
              <li key={n.name} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3"><span>{n.name}</span><span className="text-muted-foreground">{n.distance}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Distances are approximate.</p>
          <Button asChild className="mt-6 rounded-full"><a href={hotel.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps<ArrowUpRight /></a></Button>
        </div>
      </div>
    </>
  );
}
