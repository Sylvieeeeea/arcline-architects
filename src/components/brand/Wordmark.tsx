import { cn } from "@/lib/cn";

type WordmarkProps = {
  /** "stacked" shows ARCLINE over ARCHITECTS; "inline" shows the name on one line. */
  variant?: "stacked" | "inline";
  className?: string;
};

/**
 * Original ARCLINE mark: a quarter-circle sector drawn as three architectural
 * strokes (vertical, baseline, arc) with a smaller inner arc, suggesting a
 * plan swing and a structural datum. Drawn with currentColor so it themes
 * with its surroundings.
 */
export function WordmarkSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={cn("h-7 w-7 shrink-0", className)}
    >
      <path d="M8 5V28H31" />
      <path d="M8 5A23 23 0 0 1 31 28" />
      <path d="M8 16.5A11.5 11.5 0 0 1 19.5 28" />
    </svg>
  );
}

export function Wordmark({ variant = "stacked", className }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-charcoal", className)}>
      <WordmarkSymbol />
      <span className="sr-only">ARCLINE ARCHITECTS</span>
      {variant === "stacked" ? (
        <span aria-hidden="true" className="flex flex-col leading-none">
          <span className="font-serif text-[1.5rem] font-medium tracking-[0.3em]">ARCLINE</span>
          <span className="mt-1.5 text-[0.5625rem] font-medium tracking-[0.46em] text-stone-deep">
            ARCHITECTS
          </span>
        </span>
      ) : (
        <span aria-hidden="true" className="font-serif text-xl font-medium tracking-[0.28em]">
          ARCLINE <span className="font-sans text-[0.625rem] tracking-[0.4em] text-stone-deep">ARCHITECTS</span>
        </span>
      )}
    </span>
  );
}
