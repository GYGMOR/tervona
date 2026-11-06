import Reveal from "@/components/motion/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";

/** Apple-typischer Abschnittskopf: farbige Kapitelzeile, grosse Headline, ruhiger Lead. */
export default function SectionIntro({
  eyebrow,
  title,
  text,
  align = "center",
  tone = "light",
  className,
  children,
  size = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
  size?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={cn(center && "mx-auto max-w-4xl text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <p className="t-eyebrow text-gradient inline-block">{eyebrow}</p>
        </Reveal>
      )}
      <SplitHeading text={title} className={cn(size === "h1" ? "t-h1" : "t-h2", eyebrow && "mt-3", tone === "dark" ? "text-white" : "text-ink")} />
      {text && (
        <Reveal delay={0.15}>
          <p className={cn("t-lead mt-6", center && "mx-auto max-w-2xl", tone === "dark" ? "text-night-soft" : "text-ink-soft")}>{text}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
