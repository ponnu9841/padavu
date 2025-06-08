import AnimatedTypography from "@/components/animation/animated-typography";
import NextImage from "@/components/Image";
import { cn } from "@/lib/utils";
import Link from "next/link";
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

export default function Experts({ experts }: { experts?: Experts[] }) {
   if (!experts || experts.length === 0) return null;

   const kitchen1 = experts[0];
   const kitchen2 = experts[1];
   const bedroom = experts[2];
   const livingRoom = experts[3];

   return (
      <section className="bg-secondary text-background">
         <div className="bg-card rounded-xl md:rounded-4xl 2xl:rounded-[5rem] p-5 md:p-10">
            <AnimatedTypography
               variant="h2"
               text="OUR EXPERTISM"
               className="text-center text-primary mb-3"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3">
               {kitchen1 && (
                  <div className="relative min-w-full lg:col-span-2 lg:row-span-1 max-h-98 h-full">
                     <Link href={`/experts/${kitchen1.id}`}>
                        <NextImage
                           className="relative aspect-square rounded-tl-4xl"
                           imageClassName="object-cover lg:rounded-tl-4xl"
                           src={kitchen1.image}
                           alt={kitchen1.alt || kitchen1.title}
                        />
                        <Heading heading={kitchen1.title.toUpperCase()} />
                        <BgShade className="lg:rounded-tl-4xl" />
                     </Link>
                  </div>
               )}

               {kitchen2 && (
                  <div className="relative col-span-1 lg:row-span-2 w-full">
                     <Link href={`/experts/${kitchen2.id}`}>
                        <NextImage
                           className="relative aspect-square"
                           imageClassName="object-cover lg:rounded-r-4xl"
                           src={kitchen2.image}
                           alt={kitchen2.alt || kitchen2.title}
                        />
                        <Heading heading={kitchen2.title.toUpperCase()} />
                        <BgShade className="lg:rounded-r-4xl" />
                     </Link>
                  </div>
               )}
               {bedroom && (
                  <div>
                     <Link
                        href={`/experts/${bedroom.id}`}
                        className="relative w-full lg:w-1/2"
                     >
                        <NextImage
                           className="relative aspect-square"
                           imageClassName="object-cover lg:rounded-bl-4xl"
                           src={bedroom.image}
                           alt={bedroom.alt || bedroom.title}
                        />
                        <Heading heading={bedroom.title.toUpperCase()} />
                        <BgShade className="lg:rounded-bl-4xl" />
                     </Link>
                  </div>
               )}

               {livingRoom && (
                  <div>
                     <Link
                        href={`/experts/${livingRoom.id}`}
                        className="relative w-full lg:w-1/2"
                     >
                        <NextImage
                           className="relative aspect-square"
                           imageClassName="object-cover"
                           src={livingRoom.image}
                           alt={livingRoom.alt || livingRoom.title}
                        />
                        <Heading heading={livingRoom.title.toUpperCase()} />
                        <BgShade />
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
