import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { hotel, whatsappLink } from "@/lib/hotel";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/rooms", label: "الغرف" },
  { to: "/services", label: "الخدمات والرحلات" },
  { to: "/location", label: "الموقع" },
  { to: "/about", label: "عن الفندق" },
  { to: "/faq", label: "أسئلة شائعة" },
  { to: "/contact", label: "تواصل" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="leading-tight">
          <span className="block font-display text-xl text-primary">ذا سكوير</span>
          <span className="block font-serif text-xs tracking-[0.2em] text-muted-foreground" dir="ltr">
            THE SQUARE BOUTIQUE HOTEL
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-foreground/80 hover:text-primary data-[status=active]:font-semibold data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("مرحبًا، أحب أستفسر عن حجز في ذا سكوير بوتيك أوتيل.")}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            احجز الآن
          </a>
          <button className="p-2 lg:hidden" aria-label="القائمة" onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 text-foreground/90">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">ذا سكوير بوتيك أوتيل</p>
          <p className="mt-3 text-sm text-primary-foreground/75">
            فندق بوتيك صغير في قلب وسط البلد، على ميدان طلعت حرب.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-2"><MapPin className="size-4 shrink-0" />{hotel.addressAr}</li>
          <li className="flex gap-2"><Phone className="size-4" /><a href={`tel:${hotel.phone}`} dir="ltr">{hotel.phoneDisplay}</a></li>
          <li className="flex gap-2"><MessageCircle className="size-4" /><a href={`https://wa.me/${hotel.whatsapp}`} dir="ltr">{hotel.whatsappDisplay}</a></li>
          <li className="flex gap-2"><Mail className="size-4" /><a href={`mailto:${hotel.email}`}>{hotel.email}</a></li>
          <li className="flex gap-2"><Instagram className="size-4" /><a href={hotel.instagram} target="_blank" rel="noreferrer" dir="ltr">{hotel.instagramHandle}</a></li>
        </ul>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {nav.map((n) => (
            <li key={n.to}><Link to={n.to} className="text-primary-foreground/80 hover:text-primary-foreground">{n.label}</Link></li>
          ))}
        </ul>
      </div>
      <p className="border-t border-primary-foreground/15 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} The Square Boutique Hotel
      </p>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-14">
      <p className="text-sm font-medium text-accent">{eyebrow}</p>
      <h1 className="mt-2 text-4xl text-primary md:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
