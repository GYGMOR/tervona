import { cn } from "@/lib/utils";

/** Live-Status «Verfügbar für neue Projekte» mit pulsierendem Punkt. */
export default function Availability({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-[#30d158]/12 px-3 py-1.5 text-[0.8rem] font-medium text-[#24a94f]", className)}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30d158] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]" />
      </span>
      {label}
    </span>
  );
}
