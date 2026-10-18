import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Page container: consistent max width and side gutters. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
