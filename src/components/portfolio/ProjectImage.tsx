import Image from "next/image";
import { ProjectArt } from "@/components/portfolio/ProjectArt";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types/content";

type ProjectImageProps = {
  image: SiteImage;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]". */
  aspect?: string;
  /** `sizes` attribute for responsive photographs. */
  sizes?: string;
  /** Use for the single above-the-fold image on a page. */
  priority?: boolean;
  /** Show the small "Concept visual" tag on generated placeholders. */
  showTag?: boolean;
  className?: string;
};

/**
 * Renders a real photograph when `image.src` is set, otherwise the generated
 * placeholder drawing (labelled "Concept visual"). Swapping in photography only
 * requires adding `src` to the image's data entry.
 */
export function ProjectImage({
  image,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showTag = true,
  className,
}: ProjectImageProps) {
  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden bg-sand", aspect, className)}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div role="img" aria-label={image.alt} className={cn("relative overflow-hidden bg-sand", aspect, className)}>
      <ProjectArt
        variant={image.art.variant}
        tone={image.art.tone}
        seed={image.art.seed}
        className="absolute inset-0 h-full w-full"
      />
      {showTag && (
        <span
          aria-hidden="true"
          className="eyebrow absolute bottom-3 left-3 bg-ivory/90 px-2.5 py-1.5 text-[0.625rem] text-charcoal"
        >
          Concept visual
        </span>
      )}
    </div>
  );
}
