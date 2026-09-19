"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendMetric } from "@/lib/metrics/events";
export function Metrics() {
  const pathname=usePathname();
  useEffect(()=>{ sendMetric("page_view"); },[pathname]);
  useEffect(()=>{
    const click=(event: MouseEvent)=>{
      const anchor=(event.target as Element)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if(!anchor) return;
      const url=new URL(anchor.href,window.location.href);
      if(url.origin===window.location.origin && (/\.(pdf|csv|json)$/i.test(url.pathname) || anchor.hasAttribute("download"))) sendMetric("download_click");
      else if(url.protocol==="https:" && url.origin!==window.location.origin && (anchor.hasAttribute("data-official-cta") || anchor.hasAttribute("data-official-source"))) sendMetric("official_link_click");
    };
    document.addEventListener("click",click); return ()=>document.removeEventListener("click",click);
  },[]);
  return null;
}
