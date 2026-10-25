// Verified hotel data only. Source: thesquareboutiquehotel.com (official site), checked Oct 2026.
// Prices, certificates, room sizes and room counts are intentionally omitted until the hotel confirms them.

const photoModules = import.meta.glob<{ default: { url: string } }>("/src/assets/hotel/*.asset.json", {
  eager: true,
});

export function photo(name: string | undefined): string {
  if (!name) return "";
  const mod = photoModules[`/src/assets/hotel/${name}.jpg.asset.json`];
  if (!mod) throw new Error(`Missing hotel photo: ${name}`);
  return mod.default.url;
}

export const hotel = {
  nameEn: "The Square Boutique Hotel",
  nameAr: "ذا سكوير بوتيك أوتيل",
  addressAr: "٣ ميدان طلعت حرب، الدور الرابع، وسط البلد، القاهرة",
  addressEn: "3 Talaat Harb Square, 4th Floor, Downtown, Cairo, Egypt",
  phone: "+20223910081",
  phoneDisplay: "+20 2 2391 0081",
  whatsapp: "201091506274",
  whatsappDisplay: "+20 109 150 6274",
  email: "post@thesquareboutiquehotel.com",
  website: "https://thesquareboutiquehotel.com",
  instagram: "https://www.instagram.com/thesquareboutiquehotel1/",
  instagramHandle: "@thesquareboutiquehotel1",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Square+Boutique+Hotel+Talaat+Harb+Square+Cairo",
  mapsEmbed: "https://www.google.com/maps?q=Talaat+Harb+Square+Cairo&output=embed",
  lat: 30.0489,
  lng: 31.2393,
};

export function whatsappLink(message: string) {
  return `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Room = {
  slug: string;
  nameAr: string;
  nameEn: string;
  summary: string;
  beds: string;
  view: string;
  highlights: string[];
  facilities: string[];
  photos: string[];
};

const commonFacilities = [
  "Daily breakfast included",
  "Air conditioning",
  "LCD television",
  "Minibar",
  "Free Wi-Fi",
  "Hair dryer",
  "Bathroom amenities",
  "Iron and ironing board on request",
  "Tea and coffee kettle",
  "Safe",
  "Telephone",
  "Writing desk",
  "Room service",
];

export const rooms: Room[] = [
  {
    slug: "double-room-city-view",
    nameAr: "غرفة دبل بإطلالة على المدينة",
    nameEn: "Double Room With City View",
    summary: "A private balcony overlooking Talaat Harb Square, with a hanging chair and a small table for breakfast above the city.",
    beds: "Two beds",
    view: "Square-view balcony",
    highlights: ["Talaat Harb Square balcony", "Two beds", "Private bathroom"],
    facilities: commonFacilities,
    photos: [
      "065A8786-1", "065A8800-1", "065A8766-1", "065A8865-1", "065A8871-1",
      "065A8888-1", "065A8890-1", "065A8891-1", "065A8893-1", "065A8842-1",
    ],
  },
  {
    slug: "superior-double-room",
    nameAr: "غرفة سوبيريور دبل",
    nameEn: "Superior Double Room",
    summary: "An elegant double room with a large bed and a window overlooking Talaat Harb Square and Downtown Cairo’s historic buildings.",
    beds: "Double bed",
    view: "Square-view window",
    highlights: ["Talaat Harb Square window", "Double bed", "Private bathroom"],
    facilities: commonFacilities,
    photos: ["wa1", "wa2"],
  },
  {
    slug: "standard-double-room",
    nameAr: "غرفة ستاندرد دبل",
    nameEn: "Standard Double Room",
    summary: "A quiet, comfortable double room for a short stay and exploring Downtown Cairo on foot.",
    beds: "Double bed",
    view: "Interior view",
    highlights: ["Double bed", "Private bathroom", "Breakfast included"],
    facilities: commonFacilities,
    photos: ["065A8897", "065A8925", "065A8930", "065A8943", "065A8953"],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}

export const services = [
  { title: "Airport transfers", body: "Complimentary airport transfers for stays of 3 nights or more. Notify reservations at least 48 hours before arrival." },
  { title: "Daily breakfast", body: "Breakfast is included with every room and served in the hotel’s breakfast area." },
  { title: "Laundry service", body: "An additional service available to guests on request." },
  { title: "Private tours", body: "Let the team arrange your time in Egypt, from planning your itinerary to your departure." },
];

// Tour names from the hotel's official tours list. Prices hidden until confirmed.
export const tours = [
  "رحلة يوم كامل للإسكندرية",
  "يوم في القاهرة (Cairo Over Day)",
  "توقف في القاهرة يومين وليلة (Cairo Stop Over)",
  "ركوب الجمال حول أهرامات الجيزة",
  "المتحف المصري وأهرامات الجيزة",
  "الجيزة وسقارة وممفيس ودهشور",
  "الجيزة وسقارة والمتحف المصري الكبير",
  "يوم كامل في المتحف المصري الكبير والأهرامات وأبو الهول",
  "نص يوم في أهرامات الجيزة",
  "القاهرة القديمة والمتحف المصري",
  "رحلة فلوكة في النيل",
  "عشاء في مركب على النيل",
  "كروز نيلي من أسوان للأقصر",
  "موتوسيكلات رملية (Quad) عند الأهرامات",
  "عرض الصوت والضوء في الأهرامات",
  "ركوب الخيل وقت الشروق أو الغروب جنب الأهرامات",
];

// Approximate distances published by third-party listings (Booking.com / KAYAK).
export const nearby = [
  { name: "Tahrir Square", distance: "Approx. 500 m" },
  { name: "Egyptian Museum", distance: "Approx. 500–700 m" },
  { name: "Qasr El Nil Bridge", distance: "Approx. 1 km" },
  { name: "Cairo Tower", distance: "Approx. 1.5–2 km" },
  { name: "Khan El Khalili", distance: "Approx. 2.3 km" },
  { name: "Cairo International Airport", distance: "Approx. 16 km" },
];

export const faqs = [
  { q: "Where is the hotel?", a: "At 3 Talaat Harb Square, 4th Floor, in Downtown Cairo, within walking distance of Tahrir Square and the Egyptian Museum." },
  { q: "Is breakfast included?", a: "Yes. Daily breakfast is included with every room." },
  { q: "Are airport transfers available?", a: "Airport transfers are complimentary for stays of 3 nights or more. Please notify reservations at least 48 hours before arrival." },
  { q: "Do any rooms overlook the square?", a: "Yes. The Double Room With City View has a balcony overlooking Talaat Harb Square. The Superior Double Room has a square-view window." },
  { q: "How do I book?", a: "Send a booking request from a room page via WhatsApp, call or email the hotel. Reservations will confirm availability and the price." },
  { q: "Can the hotel arrange tours?", a: "Yes. The hotel arranges day tours in Cairo, Giza and Alexandria, as well as Nile cruises." },
];
