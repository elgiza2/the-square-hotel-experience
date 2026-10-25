import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

// Smooth scroll + scroll reveals, re-run on every navigation. Client-only (inside useEffect).
export function SiteMotion() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      window.scrollTo(0, 0);

      const lenis = reduce ? null : new Lenis({ duration: 1.25, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = (t: number) => lenis?.raf(t * 1000);
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        if (reduce) return;
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 18, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });
        gsap.utils.toArray<HTMLElement>("h1, h2").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 22, filter: "blur(8px)", duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
        });
        gsap.utils.toArray<HTMLElement>(".glass-flicker").forEach((el) => {
          gsap.to(el, { opacity: 0.15, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 3, repeatDelay: 1 + Math.random() * 3 });
        });
        gsap.utils.toArray<HTMLElement>("[data-par]").forEach((el) => {
          gsap.to(el, { y: Number(el.dataset["par"]) * 2, ease: "none", scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset["count"]);
          const dec = Number(el.dataset["dec"] ?? 0);
          const suf = el.dataset["suf"] ?? "";
          const o = { p: 0 };
          gsap.to(o, {
            p: 1, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: () => { el.textContent = (to * o.p).toFixed(dec) + suf; },
          });
        });
      });
      ScrollTrigger.refresh();
      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(raf);
        lenis?.destroy();
      };
    })();
    return () => { cancelled = true; cleanup(); };
  }, [path]);

  return null;
}
