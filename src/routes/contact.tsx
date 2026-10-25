import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Instagram, MapPin } from "lucide-react";
import { hotel } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta("تواصل معنا | ذا سكوير بوتيك أوتيل", "اتصل بالفندق أو ابعت واتساب أو إيميل للحجز والاستفسار. ٣ ميدان طلعت حرب، وسط البلد، القاهرة."),
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { icon: Phone, label: "تليفون", value: hotel.phoneDisplay, href: `tel:${hotel.phone}`, ltr: true },
    { icon: MessageCircle, label: "واتساب", value: hotel.whatsappDisplay, href: `https://wa.me/${hotel.whatsapp}`, ltr: true },
    { icon: Mail, label: "إيميل", value: hotel.email, href: `mailto:${hotel.email}`, ltr: true },
    { icon: Instagram, label: "إنستجرام", value: hotel.instagramHandle, href: hotel.instagram, ltr: true },
    { icon: MapPin, label: "العنوان", value: hotel.addressAr, href: hotel.mapsUrl, ltr: false },
  ];
  return (
    <>
      <PageHeader eyebrow="إحنا هنا" title="تواصل معنا" intro="للحجز أو أي استفسار عن الغرف والرحلات." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <a key={i.label} href={i.href} target="_blank" rel="noreferrer" className="rounded-lg border bg-card p-6 hover:border-primary">
            <i.icon className="size-6 text-accent" />
            <p className="mt-3 text-sm text-muted-foreground">{i.label}</p>
            <p className="mt-1 text-primary" dir={i.ltr ? "ltr" : undefined} style={i.ltr ? { textAlign: "right" } : undefined}>{i.value}</p>
          </a>
        ))}
      </div>
    </>
  );
}
