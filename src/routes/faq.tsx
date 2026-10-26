import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/hotel";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/site/SiteChrome";
import { ChevronDown } from "lucide-react";

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
      <div className="mx-auto max-w-3xl px-5 pb-16 md:pb-24">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg text-primary [&::-webkit-details-marker]:hidden">{f.q}<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" /></summary>
            <p className="mt-3 leading-8 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
