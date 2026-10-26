import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle, Instagram, MapPin } from "lucide-react";
import { hotel } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta("Contact | The Square Boutique Hotel", "Call, WhatsApp or email the hotel for reservations. 3 Talaat Harb Square, Downtown Cairo."),
  }),
  component: ContactPage,
});

function ContactPage() {
  const items = [
    { icon: Phone, label: "Telephone", value: hotel.phoneDisplay, href: `tel:${hotel.phone}`, ltr: true },
    { icon: MessageCircle, label: "WhatsApp", value: hotel.whatsappDisplay, href: `https://wa.me/${hotel.whatsapp}`, ltr: true },
    { icon: Mail, label: "Email", value: hotel.email, href: `mailto:${hotel.email}`, ltr: true },
    { icon: Instagram, label: "Instagram", value: hotel.instagramHandle, href: hotel.instagram, ltr: true },
    { icon: MapPin, label: "Address", value: hotel.addressEn, href: hotel.mapsUrl, ltr: false },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s plan your stay." intro="Get in touch for room reservations, tours and enquiries." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <a key={i.label} href={i.href} target="_blank" rel="noreferrer" className="rounded-lg border bg-card p-6 hover:border-primary">
            <i.icon className="size-6 text-accent" />
            <p className="mt-3 text-sm text-muted-foreground">{i.label}</p>
            <p className="mt-1 text-primary break-words" dir={i.ltr ? "ltr" : undefined} >{i.value}</p>
          </a>
        ))}
      </div>
    </>
  );
}
