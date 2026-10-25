import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tours, categories, type Tour } from "@/lib/tours";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";
import { TourCard } from "@/components/site/TourCard";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: pageMeta(
      "رحلات من وسط البلد: الأهرامات، النيل، وإسكندرية | ذا سكوير",
      "رحلات خاصة من الفندق لأهرامات الجيزة وسقارة والمتحف المصري الكبير وفلوكة النيل وإسكندرية وكروز أسوان والأقصر.",
    ),
  }),
  component: ToursPage,
});

function ToursPage() {
  const [cat, setCat] = useState<Tour["category"] | "all">("all");
  const list = cat === "all" ? tours : tours.filter((t) => t.category === cat);
  return (
    <>
      <PageHeader eyebrow="الرحلات" title="اكتشف مصر من باب الفندق" intro="رحلات خاصة بمرشد إنجليزي أو إسباني واستلام من الفندق. الأسعار بتتأكد مع الفريق حسب العدد والتاريخ." />
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-4">
        {(["all", ...Object.keys(categories)] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c as Tour["category"] | "all")}
            className={`rounded-full px-4 py-2 text-sm ${cat === c ? "bg-primary text-primary-foreground" : "bg-pill text-pill-foreground"}`}
          >
            {c === "all" ? "الكل" : categories[c as Tour["category"]]}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => <TourCard key={t.slug} tour={t} />)}
      </div>
    </>
  );
}
