import { createFileRoute } from "@tanstack/react-router";
import { rooms } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";
import { RoomCard } from "@/components/site/RoomCard";

export const Route = createFileRoute("/rooms/")({
  head: () => ({
    meta: pageMeta(
      "الغرف | ذا سكوير بوتيك أوتيل، وسط البلد",
      "غرف دبل مريحة بفطار مشمول، منها غرف ببلكونة أو شباك مطل على ميدان طلعت حرب في وسط البلد.",
    ),
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <>
      <PageHeader
        eyebrow="الإقامة"
        title="الغرف"
        intro="كل الغرف فيها حمام خاص وتكييف وواي فاي مجاني وفطار يومي. الأسعار بتتأكد مع فريق الحجوزات حسب التاريخ."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
      </div>
    </>
  );
}
