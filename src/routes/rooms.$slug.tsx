import { createFileRoute, notFound } from "@tanstack/react-router";
import { RoomLanding } from "@/components/site/RoomLanding";
import { getRoom, photo, hotel } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const room = getRoom(params.slug);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [...pageMeta("Room unavailable | The Square Boutique Hotel", "Explore rooms at The Square Boutique Hotel in Downtown Cairo."), { name: "robots", content: "noindex" }] };
    const { room } = loaderData;
    const image = photo(room.photos[0]);
    return {
      meta: [...pageMeta(`${room.nameEn} | The Square Boutique Hotel`, `${room.summary} Breakfast included in Downtown Cairo.`), ...(/^https:\/\//.test(image) ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : [])],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            name: room.nameEn,
            description: room.summary,
            containedInPlace: { "@type": "Hotel", name: hotel.nameEn },
            amenityFeature: room.facilities.map((f) => ({ "@type": "LocationFeatureSpecification", name: f, value: true })),
          }),
        },
      ],
    };
  },
  component: RoomPage,
});

function RoomPage() {
  const { room } = Route.useLoaderData();
  return <RoomLanding key={room.slug} room={room} />;
}
