import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { cn } from "@/lib/cn";
import type { Service } from "@/types/content";

type ServiceRowProps = {
  service: Service;
  index: number;
  reverse?: boolean;
};

/** Editorial service row: numbered, with a visual and a short list of what it explores. */
export function ServiceRow({ service, index, reverse = false }: ServiceRowProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article id={service.slug} className="grid scroll-mt-28 gap-8 border-t hairline py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
      <div className={cn("lg:col-span-6", reverse && "lg:order-2")}>
        <ProjectImage image={service.image} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
      <div className={cn("flex flex-col justify-center lg:col-span-5", reverse ? "lg:order-1" : "lg:col-start-8")}>
        <p className="eyebrow text-olive-deep">{number}</p>
        <h2 className="mt-4 font-serif text-h2 font-medium">{service.title}</h2>
        <p className="mt-5 text-lead text-stone-deep">{service.description}</p>
        <ul className="mt-8 space-y-3 border-t hairline pt-6">
          {service.explores.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-olive" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
