import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { hotel, photo, rooms, whatsappLink } from "@/lib/hotel";
import { tours } from "@/lib/tours";
import { pageMeta } from "@/lib/seo";
import { RoomCard } from "@/components/site/RoomCard";
import { TourCard } from "@/components/site/TourCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "ذا سكوير بوتيك أوتيل | احجز غرفتك ورحلاتك في وسط البلد",
      "احجز مباشرة في فندق بوتيك على ميدان طلعت حرب: غرف بفطار مشمول، توصيل مجاني من المطار لـ ٣ ليالي أو أكتر، ورحلات للأهرامات والنيل وإسكندرية.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: hotel.nameEn,
          alternateName: hotel.nameAr,
          url: hotel.website,
          telephone: hotel.phone,
          email: hotel.email,
          address: { "@type": "PostalAddress", streetAddress: "3 Talaat Harb Square, 4th Floor", addressLocality: "Cairo", addressCountry: "EG" },
          geo: { "@type": "GeoCoordinates", latitude: hotel.lat, longitude: hotel.lng },
          sameAs: [hotel.instagram],
          aggregateRating: { "@type": "AggregateRating", ratingValue: 8.6, bestRating: 10, reviewCount: 192 },
          amenityFeature: ["Free WiFi", "Breakfast included", "Airport transfer"].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
        }),
      },
    ],
  }),
  component: Index,
});

const glassSpots: [number, number, boolean][] = [
  [3, 64, false], [3, 71, false], [6.5, 71, false], [10, 71, false], [3, 78, false],
  [45.5, 76, true], [49, 80, true], [49, 76, true], [52.5, 76, true],
  [86, 58, false], [86, 67, false], [82, 76, false], [89.5, 76, false], [86, 84, false],
];

// Booking.com guest scores (verified Oct 2026).
const scores = [
  { label: "تقييم الضيوف", to: 8.6, dec: 1, suf: "" },
  { label: "الموظفين", to: 9.6, dec: 1, suf: "" },
  { label: "الموقع", to: 9.4, dec: 1, suf: "" },
  { label: "تقييم منشور", to: 192, dec: 0, suf: "+" },
];

const steps = [
  { n: "١", title: "اختار غرفتك", body: "غرفة ببلكونة على ميدان طلعت حرب، أو شباك على الميدان، أو غرفة هادية. كلها بفطار مشمول.", img: "065A8865-1" },
  { n: "٢", title: "ضيف رحلاتك", body: "الأهرامات، سقارة، المتحف المصري الكبير، النيل، أو إسكندرية. الفريق بيظبط البرنامج على وقتك.", img: "065A8893-1" },
  { n: "٣", title: "أكد على واتساب", body: "ابعت تواريخك، وفريق الحجوزات يأكدلك التوافر والسعر. احجز ٣ ليالي والتوصيل من المطار عليك مجانًا.", img: "065A8967-1" },
];

function Index() {
  const featured = tours.filter((t) => t.featured);
  const [active, setActive] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-60">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="grid-sq size-[46px]" style={{ left: `${(i * 37) % 100}%`, top: `${8 + ((i * 13) % 30)}%` }} />
          ))}
        </div>
        <h1 className="absolute inset-x-0 top-[24%] z-[6] px-4 text-center text-[clamp(34px,5.2vw,76px)] leading-[1.15]">
          صحّي على <em>ميدان طلعت حرب</em>
          <br />وشوف القاهرة كلها
        </h1>
        <div className="absolute inset-x-0 top-[calc(24%+clamp(110px,13vw,200px))] z-[6] flex flex-wrap justify-center gap-3 px-4">
          <Link to="/rooms" className="btn">احجز غرفتك</Link>
          <Link to="/tours" className="btn-ghost">شوف الرحلات</Link>
        </div>
        <div className="fade-top absolute inset-x-0 bottom-0 z-[2] h-[58%]" data-par="8">
          <img src={photo("065A8800-1")} alt="بلكونة الفندق على ميدان طلعت حرب" className="size-full object-cover object-[center_70%]" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[5]">
          {glassSpots.map(([x, y, c], i) => (
            <span
              key={i}
              className={`glass glass-flicker ${i % 2 ? "max-md:hidden" : ""}`}
              style={{ left: `${x}%`, top: `${y}%`, width: c ? "clamp(28px,3.4vw,44px)" : "clamp(36px,5.4vw,74px)" }}
            />
          ))}
        </div>
      </section>

      {/* SCORES */}
      <section className="relative overflow-hidden bg-background px-4 py-24">
        <div className="mx-auto flex max-w-[880px] flex-col items-center gap-5 text-center">
          <span className="pill reveal">ضيوفنا بيقولوا</span>
          <h2 className="h2-display">
            خدمة بتتقيّم <em>٩٫٦</em>
            <br />من ضيوف حقيقيين
          </h2>
          <div className="mt-6 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            {scores.map((s) => (
              <div key={s.label} className="reveal ticket flex h-[130px] flex-col justify-between rounded-[22px] bg-lime px-5 py-4 text-start md:h-[150px]">
                <span className="text-[11px] font-medium">{s.label}</span>
                <b dir="ltr" className="text-end text-[clamp(30px,3.4vw,44px)] font-semibold tabular-nums" data-count={s.to} data-dec={s.dec} data-suf={s.suf}>
                  {s.to.toFixed(s.dec)}{s.suf}
                </b>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">المصدر: تقييمات الضيوف على Booking.com من ١٠</p>
        </div>
      </section>

      {/* ROOMS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="pill reveal">الإقامة</span>
          <h2 className="h2-display">غرف بإطلالة على <em>قلب القاهرة</em></h2>
          <p className="reveal max-w-xl text-muted-foreground">كل الغرف بحمام خاص وتكييف وواي فاي مجاني وفطار يومي.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
        </div>
      </section>

      {/* OFFER STRIP */}
      <section className="px-4 py-8">
        <div className="reveal mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-[26px] bg-primary px-8 py-8 text-primary-foreground md:flex-row">
          <div>
            <p className="text-2xl">احجز ٣ ليالي أو أكتر، والتوصيل من المطار مجاني</p>
            <p className="mt-1 text-sm text-primary-foreground/75">بلّغ الحجوزات قبل ميعاد وصولك بـ ٤٨ ساعة.</p>
          </div>
          <a href={whatsappLink("مرحبًا، أحب أحجز ٣ ليالي أو أكتر مع التوصيل المجاني من المطار.")} target="_blank" rel="noreferrer" className="btn-ghost">
            احجز العرض
          </a>
        </div>
      </section>

      {/* TOURS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="pill reveal">الرحلات</span>
          <h2 className="h2-display">من باب الفندق <em>للأهرامات والنيل</em></h2>
          <p className="reveal max-w-xl text-muted-foreground">رحلات خاصة بمرشد إنجليزي أو إسباني، بنستلمك فيها من الفندق.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {featured.slice(0, 2).map((t) => <TourCard key={t.slug} tour={t} large />)}
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(2).map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/tours" className="btn">كل الرحلات ({tours.length})</Link>
        </div>
      </section>

      {/* HOW TO BOOK — hover accordion */}
      <section className="relative overflow-hidden bg-background py-20">
        <div className="mb-10 flex flex-col items-center gap-4 px-4 text-center">
          <span className="pill reveal">احجز مباشرة</span>
          <h2 className="h2-display">٣ خطوات، <em>ورحلتك جاهزة</em></h2>
        </div>
        <div className="flex border-y border-line max-md:flex-col md:h-[70vh] md:min-h-[520px]">
          {steps.map((s, i) => (
            <div
              key={s.n}
              tabIndex={0}
              aria-label={`الخطوة ${s.n}: ${s.title}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`panel relative overflow-hidden border-line outline-none md:flex-[0_0_clamp(96px,11vw,170px)] md:border-e last:border-e-0 max-md:border-b ${active === i ? "is-active" : "cursor-pointer"}`}
            >
              <div className="flex items-end gap-6 p-6 md:absolute md:bottom-[8vh] md:start-[clamp(14px,1.8vw,28px)] md:w-max md:p-0">
                <span className={`text-[clamp(120px,30vh,320px)] font-semibold leading-[0.74] ${["text-primary", "text-accent", "text-lime"][i]}`}>{s.n}</span>
                <div className="step w-[min(420px,80vw)] md:w-[min(420px,32vw)]">
                  <img src={photo(s.img)} alt="" loading="lazy" className="mb-5 aspect-[16/10] w-full rounded-[18px] object-cover" />
                  <h3 className="mb-2 text-[clamp(20px,1.7vw,26px)]">{s.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[100vh] min-h-[680px] overflow-hidden bg-background">
        <div className="fade-top absolute inset-x-0 bottom-0 h-[80%]">
          <img src={photo("065A8786-1")} alt="إطلالة البلكونة على ميدان طلعت حرب" loading="lazy" className="size-full object-cover" />
        </div>
        <div className="reveal absolute start-1/2 top-[22%] z-[4] w-[min(680px,calc(100%-32px))] -translate-x-1/2 rounded-[26px] border border-background/70 bg-gradient-to-b from-background/95 via-background/75 to-background/10 px-7 pb-14 pt-11 text-center shadow-[0_30px_60px_rgb(10_20_60/0.18)] backdrop-blur-xl rtl:translate-x-1/2">
          <span className="pill">احجز النهارده</span>
          <h2 className="mt-4 mb-3 text-[clamp(24px,2.8vw,38px)]">كل صباح هنا <em>بيستاهل</em></h2>
          <p className="mb-6 text-sm text-muted-foreground">ابعت تواريخك على واتساب، والحجوزات بترد عليك بالتوافر والسعر.</p>
          <a href={whatsappLink("مرحبًا، أحب أحجز في ذا سكوير بوتيك أوتيل. تواريخي:")} target="_blank" rel="noreferrer" className="btn">احجز على واتساب</a>
        </div>
      </section>
    </>
  );
}
