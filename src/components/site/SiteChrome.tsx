import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotel, whatsappLink } from "@/lib/hotel";

const nav = [
  { to: "/rooms", label: "Rooms" },
  { to: "/tours", label: "Tours" },
  { to: "/services", label: "Services" },
  { to: "/location", label: "Location" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 text-[20px] font-medium" aria-label="The Square">
      <svg viewBox="0 0 30 22" className="h-[20px] w-[28px] text-primary" aria-hidden>
        <circle cx="4" cy="17" r="3.6" fill="currentColor" />
        <path d="M10.5 18.5 16.8 5.2 25.5 18.5" fill="none" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span dir="ltr" className="tracking-normal">the square</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
      <div className="site-nav pointer-events-auto flex items-center gap-6 rounded-full bg-background/90 py-1.5 pe-1.5 ps-4 shadow-sm border backdrop-blur-md lg:gap-8">
        <Brand />
        <nav className="hidden items-center gap-5 text-sm lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-foreground/75 hover:text-primary data-[status=active]:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={whatsappLink("مرحبًا، أحب أحجز في The Square بوتيك أوتيل.")} target="_blank" rel="noreferrer" className="btn">
          Book a stay
        </a>
        <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {open && (
        <nav className="pointer-events-auto absolute inset-x-3 top-16 rounded-3xl bg-background p-4 shadow-xl lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-2xl px-3 py-3 text-lg hover:bg-muted">
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
    <footer className="bg-lime px-[4vw] pb-6 pt-10 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <Brand />
          <p className="mt-3 max-w-xs text-sm text-foreground/80">A boutique stay on Talaat Harb Square, in the heart of Downtown Cairo.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm">
          {nav.map((n) => <Link key={n.to} to={n.to} className="hover:underline">{n.label}</Link>)}
        </nav>
        <ul className="space-y-2 text-sm md:justify-self-end">
          <li className="flex gap-2"><MapPin className="size-4 shrink-0" />{hotel.addressEn}</li>
          <li className="flex gap-2"><Phone className="size-4" /><a href={`tel:${hotel.phone}`} dir="ltr">{hotel.phoneDisplay}</a></li>
          <li className="flex gap-2"><MessageCircle className="size-4" /><a href={`https://wa.me/${hotel.whatsapp}`} dir="ltr">{hotel.whatsappDisplay}</a></li>
          <li className="flex gap-2"><Mail className="size-4" /><a href={`mailto:${hotel.email}`}>{hotel.email}</a></li>
          <li className="flex gap-2"><Instagram className="size-4" /><a href={hotel.instagram} target="_blank" rel="noreferrer" dir="ltr">{hotel.instagramHandle}</a></li>
        </ul>
      </div>
      <p className="mt-8 text-center text-xs text-foreground/70">© {new Date().getFullYear()} The Square Boutique Hotel</p>
    </footer>
  );
}

export function PageHeader({ title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-32 text-center">
      
      <h1 className="mt-4 text-4xl md:text-6xl">{title}</h1>
      {intro && <p className="reveal mx-auto mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
    </div>
  );
}
