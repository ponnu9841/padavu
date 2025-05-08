import NextImage from "@/components/Image";
import React from "react";

export default function Vlogs() {
   return (
      <div className="py-10 px-4 max-w-6xl mx-auto">
         <h2 className="mb-3">Vlog</h2>
         <div className="grid grid-cols-4 gap-3">
            <div>
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div>
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div>
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div>
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
         </div>
      </div>
   );
}
