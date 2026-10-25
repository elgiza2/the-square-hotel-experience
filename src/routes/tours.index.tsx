import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { tours, categories, type Tour } from "@/lib/tours";
import { pageMeta } from "@/lib/seo";
import { TourCard } from "@/components/site/TourCard";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
export const Route = createFileRoute("/tours/")({head:()=>({meta:pageMeta("Egypt tours from Cairo | The Square Boutique Hotel", "Explore the pyramids, the Nile, Cairo and Alexandria. Browse the hotel's published tours and request your dates directly.")}),component:ToursPage});
function ToursPage(){
 const [cat,setCat]=useState<Tour['category']|'all'>('all'); const [search,setSearch]=useState('');
 const list=tours.filter(t=>(cat==='all'||t.category===cat)&&`${t.nameEn} ${t.tagline}`.toLowerCase().includes(search.toLowerCase()));
 return <>
 <header className="mx-auto max-w-6xl px-5 pb-12 pt-32 md:pt-40"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><h1 className="text-5xl md:text-7xl">Go beyond<br /><em>the square.</em></h1><p className="max-w-sm leading-7 text-muted-foreground">Ancient wonders. Nile sunsets. A Mediterranean escape. Make more of your time in Egypt with a tour arranged by the hotel.</p></div></header>
 <section className="mx-auto max-w-6xl px-5 pb-20"><div className="flex flex-col gap-5 border-y py-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{(['all',...Object.keys(categories)] as (Tour['category']|'all')[]).map(c=><Button key={c} onClick={()=>setCat(c)} variant={cat===c?'default':'ghost'} aria-pressed={cat===c} className="rounded-full">{c==='all'?'All experiences':categories[c]}</Button>)}</div><label className="flex items-center gap-2 rounded-full border px-4 py-2"><Search className="size-4 text-muted-foreground" /><input aria-label="Search tours" placeholder="Find an experience" value={search} onChange={e=>setSearch(e.target.value)} className="w-full min-w-0 bg-transparent text-sm outline-none" /></label></div>
 <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground"><p>{list.length} experiences</p><p>Prices confirmed by reservations</p></div>
 <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{list.map(t=><TourCard key={t.slug} tour={t}/>)}</div>
 {list.length===0&&<div className="py-20 text-center"><h2 className="text-2xl">No experiences found</h2><Button variant="outline" className="mt-5 rounded-full" onClick={()=>{setCat('all');setSearch('')}}><X />Clear filters</Button></div>}
 </section></>;
}
