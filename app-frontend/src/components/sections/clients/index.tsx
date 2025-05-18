import AnimatedTypography from "@/components/animation/animated-typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ClientLists from "./client-lists";

export default function Clients() {
   return (
      <section className="pb-10 px-4 max-w-6xl mx-auto">
         {/* <h2 className="mb-3">Our Clients</h2> */}
         <AnimatedTypography
            variant="h2"
            text="OUR CLIENTS"
            className="text-center"
         />

         <ClientLists />
         <Link href="#" className="flex justify-center">
            <Button size="lg">View More</Button>
         </Link>
      </section>
   );
}
