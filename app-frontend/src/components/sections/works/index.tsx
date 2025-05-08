"use client";
// import Link from "next/link";
import React from "react";
import { allWorks } from "@/lib/constants";
import ZoomAnimation from "@/components/animation/zoom-animation";
import NextImage from "@/components/Image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Works() {
   return (
      <div className="py-10 px-4 max-w-6xl mx-auto">
         <h2>Completed works</h2>
         <div className="columns-1 md:columns-3 gap-4">
            {allWorks.map((work, index) => (
               <ZoomAnimation key={index}>
                  <div className={`relative w-full mb-4`} key={index}>
                     <NextImage
                        src={work.image}
                        className="aspect-square"
                        imageClassName="object-cover"
                     />
                     {/* <img src={work.image} alt={work.title} /> */}
                  </div>
               </ZoomAnimation>
            ))}
         </div>
         <Link href="#" className="flex justify-center mt-3">
            <Button size="lg">View More</Button>
         </Link>
      </div>
   );
}
