import AnimatedTypography from "@/components/animation/animated-typography";
import NextImage from "@/components/Image";
import { cn } from "@/lib/utils";
import React from "react";

const BgShade = ({ className }: { className?: string }) => (
   <div
      className={cn(
         "absolute inset-0 bg-black/50 w-full h-full z-1",
         className
      )}
   />
);

const Heading = ({ heading }: { heading: string }) => (
   <AnimatedTypography
      variant="h2"
      text={heading}
      className="absolute top-6 left-6 z-2 text-lg lg:text-6xl"
   />
);

export default function Experts() {
   return (
      <section className="bg-secondary text-background">
         <div className="bg-card rounded-xl md:rounded-4xl 2xl:rounded-[5rem] p-5 md:p-10">
            <AnimatedTypography
               variant="h2"
               text="OUR EXPERTS"
               className="text-center text-primary mb-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 lg:grid-row-2">
               <div className="relative col-span-2 row-span-1 max-h-96 w-full aspect-square">
                  <NextImage
                     className="relative aspect-square rounded-tl-4xl"
                     imageClassName="object-cover lg:rounded-tl-4xl"
                     src="/images/experts/kitchen.webp"
                  />
                  <Heading heading="KITCHEN" />
                  <BgShade className="lg:rounded-tl-4xl" />
               </div>
               <div className="relative col-span-1 lg:row-span-2 w-full">
                  <NextImage
                     className="relative aspect-square"
                     imageClassName="object-cover lg:rounded-r-4xl"
                     src="/images/experts/dining.webp"
                  />
                  <Heading heading="KITCHEN" />
                  <BgShade className="lg:rounded-r-4xl" />
               </div>
               <div className="col-span-2 row-span-1 lg:max-h-96 w-full overflow-hidden lg:rounded-bl-4xl">
                  <div className="flex flex-col lg:flex-row">
                     <div className="relative w-full lg:w-1/2">
                        <NextImage
                           className="relative aspect-square"
                           imageClassName="object-cover lg:rounded-bl-4xl"
                           src="/images/experts/bedroom.webp"
                        />
                        <Heading heading="BEDROOM" />
                        <BgShade className="lg:rounded-bl-4xl" />
                     </div>
                     <div className="relative w-full lg:w-1/2">
                        <NextImage
                           className="relative aspect-square"
                           imageClassName="object-cover"
                           src="/images/experts/living-room.webp"
                        />
                        <Heading heading="LIVING ROOM" />
                        <BgShade />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
