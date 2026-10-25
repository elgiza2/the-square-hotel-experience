// Tours published on the hotel's official site (thesquareboutiquehotel.com/tours), translated to Arabic.
// Prices are hidden until the hotel confirms current rates.

const tourPhotos = import.meta.glob<{ default: { url: string } }>("/src/assets/tours/*.asset.json", { eager: true });

export function tourPhoto(name: string | undefined): string {
  if (!name) return "";
  return tourPhotos[`/src/assets/tours/${name}.jpg.asset.json`]?.default.url ?? "";
}

export type Tour = {
  slug: string;
  nameAr: string;
  nameEn: string;
  category: "pyramids" | "cairo" | "nile" | "adventure" | "egypt";
  duration: string;
  tagline: string;
  overview: string[];
  highlights: string[];
  includes: { label: string; value: string }[];
  itinerary?: { title: string; items: string[] }[];
  photos: string[];
  featured?: boolean;
};

const guide = { label: "المرشد", value: "إنجليزي / إسباني" };
const lunch = { label: "الوجبات", value: "غدا" };
const privateCar = { label: "المواصلات", value: "عربية خاصة" };
const water = { label: "مياه معدنية", value: "مجانًا" };

export const categories: Record<Tour["category"], string> = {
  pyramids: "الأهرامات",
  cairo: "القاهرة",
  nile: "النيل",
  adventure: "مغامرات",
  egypt: "مصر",
};

export const tours: Tour[] = [
  {
    slug: "cairo-stop-over",
    nameAr: "القاهرة في يومين",
    nameEn: "Cairo Stop Over",
    category: "cairo",
    duration: "يومين وليلة",
    tagline: "شوف أهم حاجات القاهرة في يومين، بعربية خاصة ومرشد خاص.",
    overview: [
      "أكتر برنامج متكامل بيقدمه الفندق: الأهرامات وسقارة، والمتحف المصري، وعشا في مركب على النيل، والقاهرة القديمة وخان الخليلي.",
      "مناسب جدًا لو عندك ترانزيت أو وقت قصير في القاهرة وعايز تشوف كل حاجة من غير ما تتعب في التنظيم.",
    ],
    highlights: ["أهرامات الجيزة وأبو الهول", "هرم زوسر المدرج في سقارة", "عشا بوفيه مفتوح على النيل مع عروض", "المتحف المصري", "قلعة صلاح الدين وجامع محمد علي", "القاهرة القبطية وخان الخليلي"],
    includes: [guide, { label: "الوجبات", value: "غدا + عشا بوفيه في المركب" }, privateCar],
    itinerary: [
      {
        title: "اليوم الأول: أهرامات الجيزة، سقارة، وعشا على النيل",
        items: [
          "مندوب الرحلات بيستلمك من الفندق لأهرامات خوفو وخفرع ومنقرع.",
          "زيارة أبو الهول ومعبد الوادي.",
          "غدا وتجربة أشهر أكلة مصرية: الكشري.",
          "زيارة هرم زوسر المدرج في سقارة، أقدم مبنى حجري كبير في العالم، ثم الرجوع للفندق.",
          "الساعة ٧ مساءً: السواق بيستلمك لعشا بوفيه مفتوح على النيل مع رقص شرقي وتنورة وأغاني.",
        ],
      },
      {
        title: "اليوم التاني: المتحف المصري، القاهرة القديمة، وخان الخليلي",
        items: [
          "المرشد بيستلمك من الفندق لزيارة المتحف المصري.",
          "جامع محمد علي (جامع المرمر) جوه قلعة صلاح الدين.",
          "غدا في مطعم محلي.",
          "القاهرة القبطية: الكنيسة المعلقة، معبد بن عزرا، كنيسة القديسة بربارة، وكنيسة أبو سرجة.",
          "خان الخليلي لحد آخر اليوم، ثم الرجوع للفندق.",
        ],
      },
    ],
    photos: ["giza-pyramids-skip-the-line-ticket-in-ca", "saqara-11", "cruise-nile-", "mus-1", "citadle-2-", "muizz-street---egypt-800x480-1"],
    featured: true,
  },
  {
    slug: "cairo-over-day",
    nameAr: "يوم في القاهرة",
    nameEn: "Cairo Over Day",
    category: "cairo",
    duration: "يوم كامل",
    tagline: "وقتك ضيق؟ أهم معالم القاهرة في يوم واحد.",
    overview: ["ابدأ يومك عند أهرامات الجيزة، وبعدين المتحف المصري، واختم اليوم في القاهرة القديمة وخان الخليلي."],
    highlights: ["أهرامات الجيزة", "المتحف المصري", "القاهرة القديمة", "خان الخليلي"],
    includes: [guide, lunch, water, { label: "المواصلات", value: "خاصة" }],
    photos: ["giza1234", "mus-1", "muizz-street---egypt-800x480-1", "99-2"],
    featured: true,
  },
  {
    slug: "full-day-gem-giza-pyramids",
    nameAr: "المتحف المصري الكبير والأهرامات وأبو الهول",
    nameEn: "Full Day Tour to GEM, Giza Pyramids & Sphinx",
    category: "pyramids",
    duration: "يوم كامل",
    tagline: "عجيبة من عجائب الدنيا السبع، ومن بعدها أكبر متحف في العالم.",
    overview: ["اتعرف على تاريخ أهرامات الجيزة وأبو الهول، واختم يومك في المتحف المصري الكبير."],
    highlights: ["أهرامات الجيزة", "أبو الهول", "المتحف المصري الكبير (GEM)"],
    includes: [{ label: "اللغة", value: "إنجليزي / إسباني" }, lunch, privateCar],
    photos: ["34dee7c6-68b1-49aa-b5ea-06c1751845d0", "giza-pyramids-skip-the-line-ticket-in-ca", "giza1234", "p05"],
    featured: true,
  },
  {
    slug: "giza-saqqara-grand-egyptian-museum",
    nameAr: "الجيزة وسقارة والمتحف المصري الكبير",
    nameEn: "Giza, Saqqara & The Grand Egyptian Museum",
    category: "pyramids",
    duration: "يوم كامل",
    tagline: "الأهرامات، وأقدم مبنى في التاريخ، وأكبر متحف في العالم في يوم واحد.",
    overview: ["زيارة أهرامات الجيزة وأبو الهول، وسقارة اللي فيها أقدم مبنى في التاريخ، وفي النص وقت ممتع في المتحف المصري الكبير."],
    highlights: ["أهرامات الجيزة وأبو الهول", "هرم سقارة المدرج", "المتحف المصري الكبير"],
    includes: [guide, lunch, water, { label: "المواصلات", value: "خاصة" }],
    photos: ["f4d4f9c8-5a48-46fb-acc5-7813ce95ed7a", "egypt-cairo-pyramids-of-giza-and-camels-", "saqara-11", "giza1234"],
    featured: true,
  },
  {
    slug: "half-day-giza-pyramids",
    nameAr: "نص يوم في أهرامات الجيزة",
    nameEn: "Half Day Tour to Giza Pyramids",
    category: "pyramids",
    duration: "نص يوم",
    tagline: "رحلة خاصة لعجيبة الدنيا الوحيدة الباقية.",
    overview: [
      "مندوب الرحلات بيستلمك من الفندق لأهرامات خوفو وخفرع ومنقرع، وبعدين أبو الهول اللي بيرجع لعصر الملك خفرع، ومعبد الوادي.",
      "رحلة خاصة ليك تستكشف فيها المباني المذهلة دي على راحتك.",
    ],
    highlights: ["أهرامات خوفو وخفرع ومنقرع", "أبو الهول", "معبد الوادي"],
    includes: [{ label: "المرشد", value: "مرشد خاص" }, { label: "المواصلات", value: "عربية خاصة من وإلى الفندق" }],
    photos: ["p05", "105691368-1-58b9c9cc3df78c353c372ad2", "99-1", "giza-pyramids-skip-the-line-ticket-in-ca"],
  },
  {
    slug: "egyptian-museum-giza-pyramids",
    nameAr: "المتحف المصري وأهرامات الجيزة",
    nameEn: "Day Tour to Egyptian Museum & Giza Pyramids",
    category: "pyramids",
    duration: "يوم كامل",
    tagline: "الأهرامات وأبو الهول، ومن بعدها كنوز المتحف المصري في التحرير.",
    overview: ["زيارة أهرامات الجيزة العظيمة وأبو الهول، واختم يومك في المتحف المصري."],
    highlights: ["أهرامات الجيزة", "أبو الهول", "المتحف المصري"],
    includes: [],
    photos: ["giza1234", "mus-1", "giza-pyramids-skip-the-line-ticket-in-ca"],
  },
  {
    slug: "giza-saqqara-pyramids",
    nameAr: "أهرامات الجيزة وسقارة",
    nameEn: "Day Tour to Giza & Saqqara Pyramids",
    category: "pyramids",
    duration: "يوم كامل",
    tagline: "أهرامات الجيزة وأقدم مبنى في التاريخ.",
    overview: ["زيارة أهرامات الجيزة العظيمة وأبو الهول، وسقارة اللي فيها أقدم مبنى في التاريخ."],
    highlights: ["أهرامات الجيزة", "أبو الهول", "هرم سقارة المدرج"],
    includes: [lunch, privateCar, guide],
    photos: ["saqara-11", "giza-pyramids-skip-the-line-ticket-in-ca", "giza1234"],
  },
  {
    slug: "giza-saqqara-memphis-dahshur",
    nameAr: "الجيزة وسقارة وممفيس ودهشور",
    nameEn: "Day Tour to Giza, Saqqara, Memphis & Dahshur",
    category: "pyramids",
    duration: "يوم كامل",
    tagline: "أعظم المواقع الأثرية حوالين القاهرة في يوم واحد.",
    overview: ["زيارة أهرامات الجيزة وأبو الهول، وبعدين هرم سقارة المدرج الأقدم، وممفيس أول عاصمة لمصر القديمة."],
    highlights: ["أهرامات الجيزة وأبو الهول", "هرم سقارة المدرج", "ممفيس، أول عاصمة لمصر القديمة", "دهشور"],
    includes: [],
    photos: ["dahsur-1-", "saqara-11", "giza1234"],
  },
  {
    slug: "saqqara-memphis-dahshur",
    nameAr: "سقارة وممفيس ودهشور",
    nameEn: "Day Tour to Saqqara, Memphis & Dahshur",
    category: "pyramids",
    duration: "يوم كامل",
    tagline: "بعيد عن الزحمة: أقدم أهرامات مصر.",
    overview: ["زيارة هرم سقارة المدرج، وممفيس أول عاصمة لمصر القديمة، عشان تشوف أعظم المواقع الأثرية حوالين القاهرة في يوم."],
    highlights: ["هرم سقارة المدرج", "ممفيس", "دهشور"],
    includes: [lunch, privateCar, guide],
    photos: ["dahsur-1-", "saqara-11"],
  },
  {
    slug: "old-cairo-egyptian-museum",
    nameAr: "القاهرة القديمة والمتحف المصري",
    nameEn: "Day Tour to the Old City & the Egyptian Museum",
    category: "cairo",
    duration: "يوم كامل",
    tagline: "آثار مصر القديمة، والقلعة، والقاهرة القبطية.",
    overview: [
      "اتفرج على آثار مصر القديمة في المتحف المصري. بعدين قلعة صلاح الدين المبنية سنة ١١٨٣ م، وجامع محمد علي اللي اتبنى جوه القلعة في القرن الـ ١٩.",
      "وآخر اليوم جولة في مصر القديمة، المدينة اللي كانت موجودة قبل القاهرة، وفيها كنايس تاريخية كتير وحصن روماني.",
    ],
    highlights: ["المتحف المصري", "قلعة صلاح الدين", "جامع محمد علي", "مصر القديمة والكنايس التاريخية"],
    includes: [guide, privateCar, lunch],
    photos: ["citadle-1", "citadle-3-", "gettyimages-164198408-5b44d96ec9e77c0037", "mus-1"],
  },
  {
    slug: "alexandria-day-tour",
    nameAr: "يوم في إسكندرية",
    nameEn: "Alexandria Over Day Tour",
    category: "egypt",
    duration: "١٢ ساعة",
    tagline: "عروس البحر المتوسط في يوم.",
    overview: ["يوم في تاني أجمل مدينة في مصر: مقابر كوم الشقافة الرومانية المحفورة في الصخر، وأطلال معبد روماني، وقلعة قايتباي، ومكتبة الإسكندرية، وسمك طازة على البحر."],
    highlights: ["مقابر كوم الشقافة", "قلعة قايتباي", "مكتبة الإسكندرية", "غدا سي فود على البحر"],
    includes: [{ label: "الوجبات", value: "غدا" }, guide, { label: "المواصلات", value: "خاصة" }],
    photos: ["alex-8-", "alex6", "alex5", "alex-9-", "alex2-"],
    featured: true,
  },
  {
    slug: "nile-dinner-cruise",
    nameAr: "عشا في مركب على النيل",
    nameEn: "Nile Dinner Cruise in Cairo",
    category: "nile",
    duration: "ساعتين",
    tagline: "ليلة على النيل بعشا مفتوح وعروض.",
    overview: [
      "أحلى طريقة تقضي بيها ليلة على النيل وانت في القاهرة: رحلة ساعتين في المركب بعشا بوفيه مفتوح، ورقص شرقي، وعرض فلكلور، وموسيقى شرقية.",
      "اتفرج على أنوار وسط البلد من على المية وانت بتتعشى.",
    ],
    highlights: ["بوفيه عشا مفتوح", "رقص شرقي وتنورة", "موسيقى شرقية", "أنوار القاهرة بالليل"],
    includes: [{ label: "الوجبات", value: "بوفيه عشا مفتوح" }, { label: "المواصلات", value: "خاصة" }],
    photos: ["cruise-nile-", "f7", "food", "3a"],
    featured: true,
  },
  {
    slug: "felucca-ride-nile",
    nameAr: "فلوكة في النيل",
    nameEn: "Felucca Ride on the Nile",
    category: "nile",
    duration: "حسب اختيارك",
    tagline: "مركب شراعي، وغروب الشمس على النيل.",
    overview: [
      "تجربة هادية في فلوكة على النيل: اتفرج على القاهرة بالليل، أو استمتع بالشروق والشمس الدافية بالنهار.",
      "الفلوكة مركب شراعي مصري بيستخدم من آلاف السنين، ومثالي تهرب بيه من زحمة المدينة. الشكل بيبقى خرافي وقت الغروب. وكمان ممكن نرتبلك عيد ميلادك على الفلوكة.",
    ],
    highlights: ["شروق أو غروب على النيل", "أنوار القاهرة بالليل", "ممكن نرتب عيد ميلاد"],
    includes: [{ label: "الوجبات", value: "من غير وجبات" }],
    photos: ["feluca-new", "fel", "feluca3-1", "fee", "fell"],
    featured: true,
  },
  {
    slug: "nile-cruise-aswan-luxor",
    nameAr: "كروز نيلي من أسوان للأقصر",
    nameEn: "Nile Cruise from Aswan to Luxor",
    category: "egypt",
    duration: "٤ أيام",
    tagline: "معابد الصعيد من على مركب ٥ نجوم.",
    overview: [
      "سافر بالطيارة أو القطر من القاهرة لأسوان أو الأقصر لكروز ٤ أيام على النيل. استرخي على المركب واستمتع بالمناظر.",
      "هتزور الكرنك، ومعبد الأقصر، ووادي الملوك، ومعبد حتشبسوت، وكوم أمبو، وإدفو، ومعبد فيلة.",
    ],
    highlights: ["معبد فيلة والسد العالي", "كوم أمبو وإدفو", "وادي الملوك ومعبد حتشبسوت", "الكرنك ومعبد الأقصر"],
    includes: [
      { label: "الإقامة", value: "كروز ٥ نجوم" },
      { label: "الوصول / المغادرة", value: "أسوان / الأقصر" },
      { label: "الوجبات", value: "إقامة كاملة (فول بورد)" },
      privateCar,
    ],
    itinerary: [
      { title: "اليوم الأول: الوصول لأسوان", items: ["مقابلة المرشد في المطار أو محطة القطر.", "الصعود للمركب قبل الغدا.", "زيارة السد العالي والمسلة الناقصة ومعبد فيلة.", "غدا وعشا على المركب، والمبيت في أسوان."] },
      { title: "اليوم التاني: كوم أمبو وإدفو", items: ["الإبحار لكوم أمبو الصبح وفطار على المركب.", "زيارة معبد كوم أمبو، ثم الإبحار لإدفو.", "غدا على المركب، وزيارة معبد إدفو.", "الإبحار للأقصر والوصول متأخر، وعشا على المركب."] },
      { title: "اليوم التالت: الأقصر", items: ["فطار على المركب.", "البر الغربي: وادي الملوك، ومعبد الملكة حتشبسوت، وتمثالي ممنون.", "غدا وعشا على المركب."] },
    ],
    photos: [],
  },
  {
    slug: "camel-riding-giza-pyramids",
    nameAr: "ركوب الجمال عند الأهرامات",
    nameEn: "Camel Riding around Giza Pyramids",
    category: "adventure",
    duration: "ساعتين",
    tagline: "ساعتين على ضهر جمل وقت الشروق أو الغروب.",
    overview: ["اركب جمل في صحرا الجيزة لحد قاعدة الهرم الأكبر، وقت الشروق أو الغروب. ولو الجمل مخوفك شوية، فيه أحصنة كمان."],
    highlights: ["ساعتين في الصحرا", "شروق أو غروب", "خيار الحصان متاح"],
    includes: [guide, lunch, water],
    photos: ["99-1", "99-2", "horse-5-"],
  },
  {
    slug: "horse-riding-giza-pyramids",
    nameAr: "ركوب الخيل وقت الشروق أو الغروب",
    nameEn: "Sunset or Sunrise Horse Riding by the Pyramids",
    category: "adventure",
    duration: "ساعتين",
    tagline: "حصان عربي أصيل، وإطلالة على الأهرامات.",
    overview: [
      "المندوب بيستلمك من الفندق لمكان مفتوح جنب الأهرامات في منطقة نزلة السمان، تركب فيه الحصان براحتك وتتفرج على الأهرامات وقت الشروق أو الغروب.",
      "لو انت فارس شاطر هيبقى عندك فرصة تركب حصان عربي أصيل. ولو دي أول مرة، دي فرصة حلوة تتعلم في الصحرا المفتوحة.",
      "الرحلة مدتها ساعتين، ومعاك متخصص طول الوقت يحافظ على أمانك.",
    ],
    highlights: ["حصان عربي أصيل", "مناسب للمبتدئين", "متخصص مرافق", "استلام من الفندق"],
    includes: [{ label: "المدة", value: "ساعتين" }, { label: "المواصلات", value: "استلام من الفندق" }],
    photos: ["105691368-1-58b9c9cc3df78c353c372ad2-1", "horse1", "99"],
  },
  {
    slug: "quad-bike-giza-pyramids",
    nameAr: "موتوسيكلات رملية عند الأهرامات",
    nameEn: "Quad Bike at Giza Pyramids",
    category: "adventure",
    duration: "في الوقت اللي تختاره",
    tagline: "الأهرامات بطريقة مختلفة ومليانة حماس.",
    overview: ["استكشف الصحرا حوالين أهرامات الجيزة بموتوسيكل رملي (كواد)، وطلّع صور تجنن. وأحلى حاجة إن التجربة في الوقت اللي يناسبك من اليوم."],
    highlights: ["صحرا الجيزة", "صور مع الأهرامات", "الوقت اللي يناسبك"],
    includes: [privateCar],
    photos: ["2000x2000-0-70-367111958a245d8d95dc3d947", "37", "2000x2000-0-70-1c111ffd8677e413b5d6f7554"],
  },
  {
    slug: "sound-light-show-giza",
    nameAr: "عرض الصوت والضوء في الأهرامات",
    nameEn: "Sound & Light Show at Giza Pyramids",
    category: "pyramids",
    duration: "مساءً",
    tagline: "الأهرامات منورة بالليل، وحكاية أبو الهول.",
    overview: [
      "المندوب بيستلمك من الفندق لعرض الصوت والضوء في أهرامات خوفو وخفرع ومنقرع.",
      "العرض بيبدأ بحكاية أبو الهول، حارس مدينة الموتى من ٥٠٠٠ سنة، وبيحكي قصة بناء الأهرامات وتاريخ أشهر شخصيات مصر القديمة زي تحتمس الرابع وإخناتون ونفرتيتي وتوت عنخ آمون.",
    ],
    highlights: ["الأهرامات منورة بالليل", "حكاية أبو الهول", "استلام من الفندق"],
    includes: [{ label: "المواصلات", value: "استلام من الفندق" }],
    photos: [],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
