"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendMetric } from "@/lib/metrics/events";
/** Public-administration hosts: a click to them counts as official_link_click (same anonymous counter, no cookies). */
const OFFICIAL_HOST=/(^|\.)(gob\.es|boe\.es|cis\.es|juntaelectoralcentral\.es|citapreviadnie\.es|seg-social\.es|congreso\.es|ine\.es|europa\.eu)$/i;
export function Metrics() {
  const pathname=usePathname();
  useEffect(()=>{ sendMetric("page_view"); },[pathname]);
  useEffect(()=>{
    const click=(event: MouseEvent)=>{
      const anchor=(event.target as Element)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if(!anchor) return;
      const url=new URL(anchor.href,window.location.href);
      if(url.origin===window.location.origin && (/\.(pdf|csv|json)$/i.test(url.pathname) || anchor.hasAttribute("download"))) sendMetric("download_click");
      else if(url.protocol==="https:" && url.origin!==window.location.origin && (anchor.hasAttribute("data-official-cta") || anchor.hasAttribute("data-official-source") || OFFICIAL_HOST.test(url.hostname))) sendMetric("official_link_click");
    };
    document.addEventListener("click",click); return ()=>document.removeEventListener("click",click);
  },[]);
  return null;
}
