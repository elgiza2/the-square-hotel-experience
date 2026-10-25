import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Plane, MapPin, Compass } from "lucide-react";
import { hotel, photo, rooms, whatsappLink } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { RoomCard } from "@/components/site/RoomCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "ذا سكوير بوتيك أوتيل | فندق بوتيك على ميدان طلعت حرب، وسط البلد",
      "فندق بوتيك صغير في ٣ ميدان طلعت حرب بوسط البلد، بغرف مطلة على الميدان وفطار مشمول، على مسافة مشي من التحرير والمتحف المصري.",
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
          address: {
            "@type": "PostalAddress",
            streetAddress: "3 Talaat Harb Square, 4th Floor",
            addressLocality: "Cairo",
            addressCountry: "EG",
          },
          geo: { "@type": "GeoCoordinates", latitude: hotel.lat, longitude: hotel.lng },
          sameAs: [hotel.instagram],
          amenityFeature: ["Free WiFi", "Breakfast included", "Airport transfer"].map((n) => ({
            "@type": "LocationFeatureSpecification",
            name: n,
            value: true,
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: MapPin, title: "على ميدان طلعت حرب", body: "قلب وسط البلد، مشي للتحرير والمتحف المصري." },
  { icon: Coffee, title: "فطار يومي مشمول", body: "مع كل الغرف." },
  { icon: Plane, title: "توصيل مجاني من المطار", body: "للحجوزات ٣ ليالي أو أكتر." },
  { icon: Compass, title: "رحلات منظمة", body: "الأهرامات، سقارة، الإسكندرية، والنيل." },
];

function Index() {
  return (
    <>
      <section className="relative">
        <img src={photo("065A8800-1")} alt="بلكونة الفندق المطلة على ميدان طلعت حرب" className="h-[78vh] min-h-[520px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-14 text-primary-foreground">
          <p className="font-serif text-lg tracking-[0.25em]" dir="ltr">THE SQUARE BOUTIQUE HOTEL</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight md:text-6xl">صباحك فوق ميدان طلعت حرب</h1>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/85">
            فندق بوتيك صغير في مبنى تاريخي بوسط البلد، على بعد خطوات من التحرير والمتحف المصري.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/rooms" className="rounded-md bg-primary-foreground px-6 py-3 font-medium text-primary hover:bg-primary-foreground/90">
              شوف الغرف
            </Link>
            <a
              href={whatsappLink("مرحبًا، أحب أعرف التوافر في ذا سكوير بوتيك أوتيل.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-primary-foreground/60 px-6 py-3 font-medium hover:bg-primary-foreground/10"
            >
              اسأل على واتساب
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((p) => (
          <div key={p.title} className="border-s-2 border-brass ps-4">
            <p.icon className="size-6 text-accent" />
            <h2 className="mt-3 text-lg text-primary">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl text-primary">الغرف</h2>
          <Link to="/rooms" className="text-sm font-medium text-accent">كل الغرف ←</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <img src={photo("065A8891-1")} alt="الكرسي المعلق في البلكونة" loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover" />
          <img src={photo("065A8967-1")} alt="منطقة الفطار في الفندق" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-lg object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-accent">القصة</p>
          <h2 className="mt-2 text-3xl text-primary">القاهرة الحقيقية، من شباكك</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            ميدان طلعت حرب من أشهر ميادين مصر. كان اسمه زمان «ميدان سليمان باشا»، واتغير اسمه سنة ١٩٥٤ على اسم طلعت حرب، رائد الاقتصاد المصري. من الفندق تقدر تعيش وسط البلد القديمة، والفريق معاك خطوة بخطوة يرتبلك برنامجك في مصر.
          </p>
          <Link to="/about" className="mt-6 inline-block text-sm font-medium text-accent">اعرف أكتر ←</Link>
        </div>
      </section>
    </>
  );
}
