import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "light";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 px-7 text-sm font-medium tracking-wide " +
  "transition-colors duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  solid: "bg-charcoal text-ivory hover:bg-olive-deep",
  outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  light: "bg-ivory text-charcoal hover:bg-sand",
};

function Arrow() {
  return (
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
  );
}

type CommonProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string };

/** Navigation button: renders a link. Use for page-to-page actions. */
export function ButtonLink({ href, variant = "solid", arrow = true, className, children }: LinkButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ActionButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

/** Action button: renders a real <button>. Use for form submission and in-page actions. */
export function Button({
  variant = "solid",
  arrow = false,
  className,
  children,
  type = "button",
  ...rest
}: ActionButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
