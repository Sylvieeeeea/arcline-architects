"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { projectCategories, type ProjectCategory } from "@/types/content";

export type FilterableItem = {
  slug: string;
  category: ProjectCategory;
  /** Pre-rendered card (server-rendered), so drawing code stays out of the client bundle. */
  node: ReactNode;
};

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", ...projectCategories];

/** Category filter and responsive grid. Filtering is instant and needs no page reload. */
export function FilterableProjects({ items }: { items: FilterableItem[] }) {
  const [active, setActive] = useState<Filter>("All");

  const visible = active === "All" ? items : items.filter((item) => item.category === active);
  const countFor = (filter: Filter) =>
    filter === "All" ? items.length : items.filter((item) => item.category === filter).length;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const selected = filter === active;
          const count = countFor(filter);
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 border px-5 text-sm font-medium tracking-wide transition-colors duration-300",
                selected
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/60 text-charcoal hover:border-charcoal",
              )}
            >
              {filter}
              <span className={cn("text-xs", selected ? "text-sand" : "text-stone-deep")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-stone-deep">
        Showing {visible.length} of {items.length} projects{active !== "All" ? ` in ${active}` : ""}.
      </p>

      {visible.length > 0 ? (
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.slug} className="md:even:mt-20">
              {item.node}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-lead text-stone-deep">No projects in this category yet.</p>
      )}
    </div>
  );
}
