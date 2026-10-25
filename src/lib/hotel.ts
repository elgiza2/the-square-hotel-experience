// Verified hotel data only. Source: thesquareboutiquehotel.com (official site), checked Oct 2026.
// Prices, certificates, room sizes and room counts are intentionally omitted until the hotel confirms them.

const photoModules = import.meta.glob<{ default: { url: string } }>("/src/assets/hotel/*.asset.json", {
  eager: true,
});

export function photo(name: string): string {
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
  "فطار يومي مشمول",
  "تكييف وتحكم في الحرارة",
  "شاشة LCD",
  "ميني بار",
  "واي فاي مجاني",
  "سشوار",
  "مستلزمات حمام",
  "مكواة وطاولة كيّ (عند الطلب)",
  "غلاية شاي وقهوة",
  "خزنة",
  "تليفون",
  "مكتب للكتابة",
  "خدمة الغرف",
];

export const rooms: Room[] = [
  {
    slug: "double-room-city-view",
    nameAr: "غرفة دبل بإطلالة على المدينة",
    nameEn: "Double Room With City View",
    summary: "غرفة ببلكونة مطلة مباشرة على ميدان طلعت حرب، فيها كرسي معلّق وترابيزة صغيرة لفطار الصبح فوق الميدان.",
    beds: "سريرين",
    view: "بلكونة مطلة على الميدان",
    highlights: ["بلكونة على ميدان طلعت حرب", "سريرين", "حمام خاص"],
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
    summary: "غرفة دبل أنيقة بسرير كبير وشباك مطل على ميدان طلعت حرب، وسط مباني وسط البلد التاريخية.",
    beds: "سرير دبل",
    view: "شباك مطل على الميدان",
    highlights: ["شباك على ميدان طلعت حرب", "سرير دبل", "حمام خاص"],
    facilities: commonFacilities,
    photos: ["wa1", "wa2"],
  },
  {
    slug: "standard-double-room",
    nameAr: "غرفة ستاندرد دبل",
    nameEn: "Standard Double Room",
    summary: "غرفة هادية ومريحة بسرير دبل، مناسبة للإقامة القصيرة واستكشاف وسط البلد مشي.",
    beds: "سرير دبل",
    view: "داخلية",
    highlights: ["سرير دبل", "حمام خاص", "فطار مشمول"],
    facilities: commonFacilities,
    photos: ["065A8897", "065A8925", "065A8930", "065A8943", "065A8953"],
  },
];

export function getRoom(slug: string) {
  return rooms.find((r) => r.slug === slug);
}

export const services = [
  { title: "توصيل مجاني من وإلى المطار", body: "للحجوزات ٣ ليالي أو أكتر. لازم تبلّغ الحجوزات قبل ميعاد الوصول بـ ٤٨ ساعة." },
  { title: "فطار يومي", body: "الفطار مشمول مع كل الغرف، ويتقدم في منطقة الفطار بالفندق." },
  { title: "خدمة غسيل الملابس", body: "خدمة إضافية متاحة للضيوف عند الطلب." },
  { title: "تنظيم الرحلات", body: "الفريق بيساعدك ترتب برنامجك في مصر حسب وقتك، من أول التخطيط لحد ما تمشي." },
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
  { name: "ميدان التحرير", distance: "حوالي ٥٠٠ متر" },
  { name: "المتحف المصري", distance: "حوالي ٥٠٠ – ٧٠٠ متر" },
  { name: "كوبري قصر النيل", distance: "حوالي ١ كم" },
  { name: "برج القاهرة", distance: "حوالي ١.٥ – ٢ كم" },
  { name: "خان الخليلي", distance: "حوالي ٢.٣ كم" },
  { name: "مطار القاهرة الدولي", distance: "حوالي ١٦ كم" },
];

export const faqs = [
  { q: "الفندق فين بالظبط؟", a: "في ٣ ميدان طلعت حرب، الدور الرابع، في قلب وسط البلد بالقاهرة، على مسافة مشي من ميدان التحرير والمتحف المصري." },
  { q: "هل الفطار مشمول؟", a: "أيوه، الفطار اليومي مشمول مع كل الغرف." },
  { q: "هل فيه توصيل من المطار؟", a: "التوصيل من وإلى المطار مجاني للحجوزات ٣ ليالي أو أكتر، بشرط تبلّغ الحجوزات قبل الوصول بـ ٤٨ ساعة." },
  { q: "هل فيه غرف بإطلالة على الميدان؟", a: "أيوه. غرفة الدبل بإطلالة على المدينة فيها بلكونة على ميدان طلعت حرب، وغرفة السوبيريور فيها شباك مطل على الميدان." },
  { q: "أحجز إزاي؟", a: "ابعت طلب الحجز من صفحة الغرفة على واتساب، أو اتصل بالفندق أو ابعت إيميل، وفريق الحجوزات هيأكدلك التوافر والسعر." },
  { q: "هل الفندق بيرتب رحلات؟", a: "أيوه، الفندق بيرتب رحلات يومية في القاهرة والجيزة والإسكندرية وكروز نيلي." },
];
