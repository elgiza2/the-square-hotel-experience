import { createFileRoute } from "@tanstack/react-router";
import { hotel, nearby } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: pageMeta(
      "الموقع | فندق في ميدان طلعت حرب قريب من التحرير والمتحف المصري",
      "ذا سكوير بوتيك أوتيل في ٣ ميدان طلعت حرب، وسط البلد: مشي لميدان التحرير والمتحف المصري وكوبري قصر النيل.",
    ),
  }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <>
      <PageHeader eyebrow="فين إحنا" title="في قلب وسط البلد" intro={hotel.addressAr} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.4fr_1fr]">
        <iframe title="خريطة الفندق" src={hotel.mapsEmbed} className="h-[420px] w-full rounded-lg border" loading="lazy" />
        <div>
          <h2 className="text-2xl text-primary">أماكن قريبة</h2>
          <ul className="mt-4 divide-y">
            {nearby.map((n) => (
              <li key={n.name} className="flex justify-between py-3"><span>{n.name}</span><span className="text-muted-foreground">{n.distance}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">المسافات تقريبية.</p>
          <a href={hotel.mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-primary-foreground">افتح في جوجل ماب</a>
        </div>
      </div>
    </>
  );
}
