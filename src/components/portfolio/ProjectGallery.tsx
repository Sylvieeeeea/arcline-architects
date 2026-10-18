import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types/content";

/** Editorial gallery: one wide image, then pairs with a gentle vertical offset. */
export function ProjectGallery({ images }: { images: SiteImage[] }) {
  const [lead, ...rest] = images;
  if (!lead) return null;

  return (
    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
      <figure className="lg:col-span-12">
        <ProjectImage image={lead} aspect="aspect-[4/3] sm:aspect-[16/9]" sizes="(min-width: 1536px) 1400px, 100vw" />
        {lead.caption && <figcaption className="mt-3 text-sm text-stone-deep">{lead.caption}</figcaption>}
      </figure>
      {rest.map((image, index) => (
        <figure key={`${image.alt}-${index}`} className={cn("lg:col-span-6", index % 2 === 1 && "lg:mt-16")}>
          <ProjectImage image={image} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
          {image.caption && <figcaption className="mt-3 text-sm text-stone-deep">{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
