import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: pageMeta("Frequently asked questions | The Square Boutique Hotel", "Answers about location, breakfast, airport transfers, rooms and booking your stay."),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Questions" title="A few things to know." />
      <div className="mx-auto max-w-3xl divide-y px-4">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="cursor-pointer list-none text-lg text-primary">{f.q}</summary>
            <p className="mt-3 leading-8 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
