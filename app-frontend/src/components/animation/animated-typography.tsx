import React from "react";
import AnimateText from "./animate-text";
import { cn } from "@/lib/utils";

const tagMap = {
   h1: "h1",
   h2: "h2",
   h3: "h3",
   h4: "h4",
   h5: "h5",
   h6: "h6",
   p: "p",
};

export default function AnimatedTypography({
   variant,
   text,
   className,
}: {
   variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
   text: string;
   className?: string;
}) {
   const Tag = tagMap[variant] as keyof React.JSX.IntrinsicElements;
   return (
      <Tag className={cn(className)}>
         <span className="sr-only">{text}</span>
         <AnimateText text={text} />
      </Tag>
   );
}
