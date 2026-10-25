import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock } from "lucide-react";
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
    if (!loaderData) return { meta: [{ title: "رحلة غير موجودة | ذا سكوير" }, { name: "robots", content: "noindex" }] };
    const { tour } = loaderData;
    return {
      meta: pageMeta(`${tour.nameAr} من وسط البلد | ذا سكوير بوتيك أوتيل`, `${tour.tagline} ${tour.overview[0]}`.slice(0, 160)),
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
    `مرحبًا، أحب أحجز رحلة «${tour.nameAr}» (${tour.nameEn}).`,
    name && `الاسم: ${name}`,
    date && `التاريخ: ${date}`,
    `عدد الأفراد: ${people}`,
    "ممكن تأكدولي السعر والمواعيد؟",
  ].filter(Boolean).join("\n");
  const main = tourPhoto(tour.photos[active]);
  const others = tours.filter((t) => t.slug !== tour.slug && t.category === tour.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28">
      <Link to="/tours" className="text-sm text-muted-foreground hover:text-primary">→ كل الرحلات</Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="pill">{categories[tour.category]}</span>
        <span className="pill gap-1"><Clock className="size-3" />{tour.duration}</span>
      </div>
      <h1 className="mt-3 text-[clamp(30px,4vw,54px)]">{tour.nameAr}</h1>
      <p className="mt-1 text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{tour.nameEn}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {main ? (
            <img src={main} alt={tour.nameAr} className="aspect-[16/10] w-full rounded-[22px] object-cover" />
          ) : (
            <div className="flex aspect-[16/10] items-end rounded-[22px] bg-primary p-8 text-4xl text-primary-foreground">{tour.tagline}</div>
          )}
          {tour.photos.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {tour.photos.map((p, i) => (
                <button key={p} onClick={() => setActive(i)} className={`overflow-hidden rounded-xl ${i === active ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}>
                  <img src={tourPhoto(p)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <p className="mt-10 text-2xl leading-relaxed">{tour.tagline}</p>
          <div className="mt-4 space-y-4 leading-8 text-muted-foreground">
            {tour.overview.map((p) => <p key={p}>{p}</p>)}
          </div>

          <h2 className="mt-12 text-2xl">هتشوف إيه</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {tour.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3"><Check className="size-4 text-primary" />{h}</li>
            ))}
          </ul>

          {tour.includes.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl">الرحلة بتشمل</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {tour.includes.map((i) => (
                  <div key={i.label} className="ticket rounded-[22px] bg-lime px-5 py-4">
                    <p className="text-[11px] font-medium">{i.label}</p>
                    <p className="mt-3 font-semibold">{i.value}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tour.itinerary && (
            <>
              <h2 className="mt-12 text-2xl">البرنامج</h2>
              <ol className="mt-4 space-y-4">
                {tour.itinerary.map((d) => (
                  <li key={d.title} className="rounded-[22px] border p-6">
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

        <aside className="h-fit rounded-[26px] border bg-card p-6 shadow-[0_30px_60px_rgb(10_20_60/0.08)] lg:sticky lg:top-24">
          <span className="pill">احجز الرحلة</span>
          <p className="mt-3 text-sm text-muted-foreground">الفريق هيأكدلك السعر والمواعيد حسب العدد والتاريخ.</p>
          <div className="mt-5 space-y-3 text-sm">
            <label className="block">الاسم<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-full border bg-background px-4 py-2.5" /></label>
            <label className="block">التاريخ<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-full border bg-background px-4 py-2.5" /></label>
            <label className="block">عدد الأفراد
              <select value={people} onChange={(e) => setPeople(e.target.value)} className="mt-1 w-full rounded-full border bg-background px-4 py-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>
          <a href={whatsappLink(msg)} target="_blank" rel="noreferrer" className="btn mt-5 w-full">ابعت الطلب على واتساب</a>
          <a href={`tel:${hotel.phone}`} className="btn-ghost mt-2 w-full" dir="ltr">{hotel.phoneDisplay}</a>
          <Link to="/rooms" className="mt-5 block rounded-2xl bg-pill p-4 text-sm text-pill-foreground">
            لسه ما حجزتش إقامتك؟ <b>شوف الغرف</b> واحجز ٣ ليالي والتوصيل من المطار مجاني.
          </Link>
        </aside>
      </div>

      {others.length > 0 && (
        <>
          <h2 className="mt-20 text-2xl">رحلات تانية ممكن تعجبك</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((t) => <TourCard key={t.slug} tour={t} />)}
          </div>
        </>
      )}
    </div>
  );
}
