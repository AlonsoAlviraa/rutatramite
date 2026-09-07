import { DISCLAIMER_SHORT } from "@/lib/types";

export function Disclaimer({ className = "", text = DISCLAIMER_SHORT }: { className?: string; text?: string }) {
  return (
    <p className={`text-sm leading-relaxed text-ink/80 ${className}`} data-disclaimer="">
      {text}
    </p>
  );
}
