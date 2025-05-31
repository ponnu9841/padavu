// import Link from "next/link";
import React from "react";
// import { allWorks } from "@/lib/constants";
import ZoomAnimation from "@/components/animation/zoom-animation";
import NextImage from "@/components/Image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedTypography from "@/components/animation/animated-typography";

export default function Works({
   worksData,
}: {
   worksData: WorksResponse;
}) {
   return (
      <div className="py-10 px-4 max-w-6xl mx-auto">
         <AnimatedTypography
            variant="h2"
            text="Completed Works"
            className="text-primary mb-4"
         />
         {/* <h2 className="mb-4 text-primary">Completed works</h2> */}
         <div className="columns-1 md:columns-3 gap-4">
            {worksData.data.map((work, index) => (
               <ZoomAnimation key={index}>
                  <div className="relative w-full mb-4" key={index}>
                     <NextImage
                        src={work.image}
                        className="aspect-square"
                        imageClassName="object-cover"
                     />
                  </div>
               </ZoomAnimation>
            ))}
         </div>
         <Link href="/works" className="flex justify-center mt-4 lg:mt-8">
            <Button size="lg">View More</Button>
         </Link>
      </div>
   );
}
