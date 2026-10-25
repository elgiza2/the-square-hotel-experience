import { createFileRoute, Link } from "@tanstack/react-router";
import { services, photo } from "@/lib/hotel";
import { tours } from "@/lib/tours";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: pageMeta(
      "الخدمات والرحلات | ذا سكوير بوتيك أوتيل",
      "فطار يومي، توصيل مجاني من المطار للإقامات ٣ ليالي أو أكتر، ورحلات للأهرامات وسقارة والإسكندرية والنيل من وسط البلد.",
    ),
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="أكتر من مجرد غرفة" title="الخدمات والرحلات" intro="هدفنا نخلي رحلتك لمصر كلها تجربة متتنسيش، مش بس الإقامة." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="rounded-lg border bg-card p-6">
            <h2 className="text-xl text-primary">{s.title}</h2>
            <p className="mt-2 text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.4fr]">
        <img src={photo("065A8788-1")} alt="فطار الفندق" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
        <div>
          <h2 className="text-3xl text-primary">الرحلات اللي بننظمها</h2>
          <p className="mt-2 text-muted-foreground">الأسعار والمواعيد بتتأكد مع الفريق حسب عدد الأفراد والتاريخ.</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {tours.map((t) => (
              <li key={t.slug}>
                <Link to="/tours/$slug" params={{ slug: t.slug }} className="block rounded-full bg-pill px-4 py-3 text-sm text-pill-foreground hover:bg-lime">{t.nameAr}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
