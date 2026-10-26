import { createFileRoute } from "@tanstack/react-router";
import { photo } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta(
      "About | The Square Boutique Hotel",
      "A boutique hotel in a historic building on Talaat Harb Square, with tours arranged by the hotel.",
    ),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="A boutique stay. A landmark square." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div className="space-y-5 leading-8 text-muted-foreground">
          <p>The Square Boutique Hotel is a small boutique hotel in Downtown Cairo, offering a comfortable short stay in the heart of the city.</p>
          <p>The hotel overlooks Talaat Harb Square, surrounded by Downtown Cairo’s historic buildings, within walking distance of Tahrir Square and the Egyptian Museum.</p>
          <p>The team can help arrange your wider journey through Egypt, with tours and an itinerary suited to your time here.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src={photo("065A8786-1")} alt="Balcony overlooking Talaat Harb Square" loading="lazy" className="col-span-2 aspect-[16/10] w-full rounded-lg object-cover" />
          <img src={photo("065A8971-1")} alt="Breakfast area" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
          <img src={photo("065A8865-1")} alt="Hotel room" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
        </div>
      </div>
    </>
  );
}
