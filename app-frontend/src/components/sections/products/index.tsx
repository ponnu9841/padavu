import NextImage from "@/components/Image";
import React from "react";
import { RenderHeading, RenderBackground } from "@/components/render-element";

export default function Products({
   productsData,
}: {
   productsData: Product[];
}) {
   return (
      <>
         <h2 className="max-w-6xl mx-auto px-4 mb-4 mt-8">Products</h2>
         <div className="flex flex-col gap-6">
            {productsData.map((item) => (
               <div className="relative" key={item.id}>
                  <NextImage
                     className="w-full min-h-[15rem]"
                     imageClassName="object-cover"
                     src={item.image}
                  />
                  <RenderBackground />
                  <RenderHeading heading={item.title} />
               </div>
            ))}
            {/* <div className="relative">
               <NextImage
                  className="w-full min-h-[15rem]"
                  imageClassName="object-cover"
               />
               <RenderBackground />
               <RenderHeading heading="KITCHEN" />
            </div>
            <div className="relative">
               <NextImage
                  className="w-full min-h-[15rem]"
                  imageClassName="object-cover"
               />
               <RenderBackground />
               <RenderHeading heading="BEDRROOM" />
            </div>
            <div className="relative">
               <NextImage
                  className="w-full min-h-[15rem]"
                  imageClassName="object-cover"
               />
               <RenderBackground />
               <RenderHeading heading="DINING" />
            </div>
            <div className="relative">
               <NextImage
                  className="w-full min-h-[15rem]"
                  imageClassName="object-cover"
               />
               <RenderBackground />
               <RenderHeading heading="LIVING" />
            </div> */}
         </div>
      </>
   );
}
