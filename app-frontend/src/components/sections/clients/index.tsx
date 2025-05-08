import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Clients() {
   return (
      <section className="py-10 px-4 max-w-6xl mx-auto">
         <h2 className="mb-3">Our Clients</h2>

         <ul className="flex flex-wrap justify-center gap-5 text-sm md:mb-8">
            <li>
               <NextImage
                  src="/images/clients/partner-logo-1.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-2.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-3.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-4.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-5.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-6.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-7.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-8.jpg"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-9.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-4.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
            <li>
               <NextImage
                  src="/images/clients/partner-logo-5.png"
                  className="w-full min-w-[10.625rem] aspect-square"
               />
            </li>
         </ul>
         <Link href="#" className="flex justify-center">
            <Button size="lg">View More</Button>
         </Link>
      </section>
   );
}
