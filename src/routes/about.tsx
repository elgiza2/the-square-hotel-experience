import { createFileRoute } from "@tanstack/react-router";
import { photo } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta(
      "عن الفندق | ذا سكوير بوتيك أوتيل",
      "فندق بوتيك صغير في مبنى تاريخي على ميدان طلعت حرب، بيهتم بإقامتك وبرحلتك في مصر كلها.",
    ),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="عن الفندق" title="فندق صغير، في أشهر ميدان في وسط البلد" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div className="space-y-5 leading-8 text-muted-foreground">
          <p>ذا سكوير بوتيك أوتيل فندق بوتيك صغير في وسط البلد بالقاهرة، معمول عشان يناسب احتياجاتك لو بتدور على إقامة قصيرة ولطيفة في قلب المدينة.</p>
          <p>الفندق على ميدان طلعت حرب بالظبط، وده بيديك فرصة تعيش القاهرة القديمة الحقيقية. الميدان كان اسمه «ميدان سليمان باشا» على اسم الجنرال الفرنسي الأصل في عهد محمد علي، واتغير اسمه سنة ١٩٥٤ على اسم محمد طلعت حرب، رائد الاقتصاد المصري في أوائل القرن العشرين.</p>
          <p>إحنا مش بس بنهتم بإقامتك، بنهتم برحلتك كلها. بنساعدك تكتشف الأماكن المميزة في كل مدينة ونظبط برنامجك حسب وقتك في مصر، من أول ما تفكر تيجي لحد ما تمشي.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src={photo("065A8786-1")} alt="إطلالة البلكونة على الميدان" loading="lazy" className="col-span-2 aspect-[16/10] w-full rounded-lg object-cover" />
          <img src={photo("065A8971-1")} alt="منطقة الفطار" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
          <img src={photo("065A8865-1")} alt="غرفة في الفندق" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
        </div>
      </div>
    </>
  );
}
