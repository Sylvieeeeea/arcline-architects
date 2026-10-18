import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading element. Pages use "h1" once; sections use "h2". */
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2";
  className?: string;
};

/** Editorial section heading: small eyebrow label, serif title, optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  size = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-5 text-olive-deep">{eyebrow}</p>}
      <Tag className={cn("font-serif font-medium", size === "h1" ? "text-h1" : "text-h2")}>{title}</Tag>
      {intro && <p className="mt-6 max-w-2xl text-lead text-stone-deep">{intro}</p>}
    </div>
  );
}
