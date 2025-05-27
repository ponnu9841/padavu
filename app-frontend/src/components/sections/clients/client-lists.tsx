
import ZoomAnimation from "@/components/animation/zoom-animation";
import NextImage from "@/components/Image";
import React from "react";

export default function ClientLists({
   clientsData,
}: {
   clientsData: Client[];
}) {
   return (
      <ul className="flex flex-wrap justify-center gap-5 text-sm">
         {clientsData.map((client, index) => (
            <li key={index}>
               <ZoomAnimation>
                  <NextImage
                     src={client.image}
                     alt={client.alt || ""}
                     className="w-full min-w-[10.625rem] aspect-square"
                  />
               </ZoomAnimation>
            </li>
         ))}
         {/* <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-1.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-2.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-3.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-4.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-5.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-6.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-7.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-8.jpg"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-9.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-4.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li>
         <li>
            <ZoomAnimation>
               <NextImage
                  src="/images/clients/partner-logo-5.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </ZoomAnimation>
         </li> */}
      </ul>
   );
}
