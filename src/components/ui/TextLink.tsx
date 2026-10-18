import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Understated text link with an underline rule and a small leading arrow. */
export function TextLink({ href, className, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 border-b border-charcoal pb-1 text-sm font-medium tracking-wide",
        "transition-colors duration-300 hover:border-olive-deep hover:text-olive-deep",
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 20 12"
        className="h-3 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M0 6h18M13 1l5 5-5 5" />
      </svg>
    </Link>
  );
}
