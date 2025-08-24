import AnimatedTypography from "@/components/animation/animated-typography";
import NextImage from "@/components/Image";
import React from "react";

export default function Vlogs({ blogData }: { blogData: BlogResponse }) {
   if (blogData.data.length > 0) {
      return (
         <div className="py-10 px-4 max-w-6xl mx-auto">
            {/* <h2 className="mb-3 text-primary">Blog</h2> */}
            <AnimatedTypography
               variant="h2"
               text="Blog"
               className="mb-4 lg:mb-8"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden">
               {blogData.data.map((item) => (
                  <div className="flex flex-col" key={item.id}>
                     <NextImage
                        src={item.image}
                        className="w-full aspect-2/3 mb-2"
                        imageClassName="object-cover rounded-lg"
                     />
                     <h4>{item.title}</h4>
                  </div>
               ))}
               {/* <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div> */}
            </div>
         </div>
      );
   }
}
