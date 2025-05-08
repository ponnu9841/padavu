import AnimatedTypography from "@/components/animation/animated-typography";
import NextImage from "@/components/Image";
import React from "react";

const BgShade = () => (
   <div className="absolute inset-0 bg-black/50 w-full h-full z-1" />
);

const Heading = ({ heading }: { heading: string }) => (
   <h3 className="absolute top-6 left-6 z-2 text-6xl">{heading}</h3>
);

export default function Experts() {
   return (
      <section className="bg-secondary pt-10 text-background">
         <AnimatedTypography
            variant="h2"
            text="OUR EXPERTS"
            className="text-center my-3"
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-2">
            <div className="relative col-span-2 row-span-1 max-h-96 w-full aspect-square">
               <NextImage
                  className="relative aspect-square"
                  imageClassName="object-cover"
                  src="/images/experts/kitchen.webp"
               />
               <Heading heading="KITCHEN" />
               <BgShade />
            </div>
            <div className="relative col-span-1 row-span-2 w-full">
               <NextImage
                  imageClassName="object-cover"
                  src="/images/experts/dining.webp"
               />
               <Heading heading="KITCHEN" />
               <BgShade />
            </div>
            <div className="col-span-2 row-span-1 max-h-96 aspect-square w-full grid grid-cols-2">
               <div className="relative">
                  <NextImage
                     imageClassName="object-cover"
                     src="/images/experts/bedroom.webp"
                  />
                  <Heading heading="BEDROOM" />
                  <BgShade />
               </div>
               <div className="relative">
                  <NextImage
                     imageClassName="object-cover"
                     src="/images/experts/living-room.webp"
                  />
                  <Heading heading="LIVING ROOM" />
                  <BgShade />
               </div>
            </div>

            {/* <div className="relative col-span-2 row-span-1 max-h-32">
               <NextImage
                  className="aspect-square w-full"
                  imageClassName="object-cover"
               />
            </div>
            <div className="relative col-span-1 row-span-2">
               <NextImage
                  className="aspect-square w-full"
                  imageClassName="object-cover"
               />
            </div>
            <div className="relative col-span-2 row-span-1 max-h-32">
               <NextImage
                  className="aspect-square w-full"
                  imageClassName="object-cover"
               />
            </div> */}
         </div>
      </section>
   );
}
