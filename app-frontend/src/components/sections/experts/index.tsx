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

export default function Experts({ experts }: { experts?: Experts[] | null }) {
   if (!experts || experts.length === 0) return null;

   const kitchen1 = experts[0];
   const livingRoom = experts[1];
   const bedroom = experts[2];
   const kitchen2 = experts[3];

   return (
      <section className="bg-secondary text-background">
         <div className="bg-card rounded-xl md:rounded-4xl 2xl:rounded-[5rem] p-5 md:p-10">
            <AnimatedTypography
               variant="h2"
               text="OUR EXPERTISM"
               className="text-center text-primary mb-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 lg:grid-row-2">
               {/* First Kitchen - Top Left */}
               {kitchen1 && (
                  <div className="relative col-span-2 row-span-1 max-h-96 w-full aspect-square">
                     <NextImage
                        className="relative aspect-square rounded-tl-4xl"
                        imageClassName="object-cover lg:rounded-tl-4xl"
                        src={kitchen1.image}
                        alt={kitchen1.alt || kitchen1.title}
                     />
                     <Heading heading={kitchen1.title.toUpperCase()} />
                     <BgShade className="lg:rounded-tl-4xl" />
                  </div>
               )}

               {/* Kitchen2 - Large Right */}
               {kitchen2 && (
                  <div className="relative col-span-1 lg:row-span-2 w-full">
                     <NextImage
                        className="relative aspect-square"
                        imageClassName="object-cover lg:rounded-r-4xl"
                        src={kitchen2.image}
                        alt={kitchen2.alt || kitchen2.title}
                     />
                     <Heading heading={kitchen2.title.toUpperCase()} />
                     <BgShade className="lg:rounded-r-4xl" />
                  </div>
               )}

               {/* Bottom Row */}
               {(bedroom || livingRoom) && (
                  <div className="col-span-2 row-span-1 lg:max-h-96 w-full overflow-hidden lg:rounded-bl-4xl">
                     <div className="flex flex-col lg:flex-row">
                        {/* Bedroom */}
                        {bedroom && (
                           <div className="relative w-full lg:w-1/2">
                              <NextImage
                                 className="relative aspect-square"
                                 imageClassName="object-cover lg:rounded-bl-4xl"
                                 src={bedroom.image}
                                 alt={bedroom.alt || bedroom.title}
                              />
                              <Heading heading={bedroom.title.toUpperCase()} />
                              <BgShade className="lg:rounded-bl-4xl" />
                           </div>
                        )}

                        {/* Living Room */}
                        {livingRoom && (
                           <div className="relative w-full lg:w-1/2">
                              <NextImage
                                 className="relative aspect-square"
                                 imageClassName="object-cover"
                                 src={livingRoom.image}
                                 alt={livingRoom.alt || livingRoom.title}
                              />
                              <Heading
                                 heading={livingRoom.title.toUpperCase()}
                              />
                              <BgShade />
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
