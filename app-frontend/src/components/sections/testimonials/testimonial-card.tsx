"use client";

import NextImage from "@/components/Image";
import parse from "html-react-parser";
import BlurAnimation from "@/components/animation/blur-animation";
import AnimateText from "@/components/animation/animate-text";
import ZoomAnimation from "@/components/animation/zoom-animation";

export default function TestimonialCard({
   image,
   name,
   testimonial,
}: // designation,
Testimonial) {
   return (
      <div className="mb-3">
         <ZoomAnimation className="col-span-2">
            <NextImage
               src={image}
               className="aspect-square min-h-[300px] max-h-[300px] w-full"
            />
         </ZoomAnimation>
         <div className="relative col-span-3 text-background/90">
            <div className="text-xl uppercase font-bold mt-4 flex justify-center">
               <AnimateText text={name} />
            </div>

            <BlurAnimation>
               <div className="mt-2 text-center line-clamp-3 text-sm">{parse(testimonial)}</div>
            </BlurAnimation>
         </div>
      </div>
   );
}
