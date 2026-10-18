"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/layout/Container";
import { ctaNav, primaryNav } from "@/data/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mobile menu behaviour: lock page scroll, trap focus, close on Escape or
  // when the viewport grows to the desktop layout, and restore focus on close.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onDesktop);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onDesktop);
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-ivory">
      <Container className="flex h-[var(--header-h)] items-center justify-between">
        <Link href="/" aria-label="ARCLINE ARCHITECTS — home" className="-ml-1 p-1">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                  "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:bg-charcoal",
                  "after:transition-transform after:duration-300 after:ease-out",
                  active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={ctaNav.href}
            aria-current={isActive(pathname, ctaNav.href) ? "page" : undefined}
            className="inline-flex min-h-11 items-center bg-charcoal px-6 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-olive-deep"
          >
            {ctaNav.label}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex min-h-11 items-center gap-3 px-2 text-sm font-medium tracking-wide lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
          <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
            <span className="h-px w-full bg-charcoal" />
            <span className="h-px w-4 self-end bg-charcoal" />
          </span>
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden"
        >
          <Container className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b hairline">
            <Link href="/" aria-label="ARCLINE ARCHITECTS — home" className="-ml-1 p-1" onClick={() => setOpen(false)}>
              <Wordmark />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="-mr-2 inline-flex min-h-11 items-center gap-3 px-2 text-sm font-medium tracking-wide"
              onClick={() => setOpen(false)}
            >
              Close
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-charcoal" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-charcoal" />
              </span>
            </button>
          </Container>

          <Container as="nav" className="flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-10">
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Contact", href: "/contact" }].map((item) => {
                const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
                return (
                  <li key={item.href} className="border-b hairline">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-16 items-center justify-between font-serif text-[2rem] font-medium",
                        active ? "text-olive-deep" : "text-charcoal",
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-base text-stone-deep">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10">
              <Link
                href={ctaNav.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-center bg-charcoal px-6 text-sm font-medium tracking-wide text-ivory"
              >
                {ctaNav.label}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
