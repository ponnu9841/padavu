import AnimatedTypography from "@/components/animation/animated-typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ClientLists from "./client-lists";

export default function Clients({
   clientsData,
   showButton = false,
}: {
   clientsData: ClientsResponse;
   showButton?: boolean;
}) {
   return (
      <section className="px-4 max-w-6xl mx-auto">
         {/* <h2 className="mb-3">Our Clients</h2> */}
         <AnimatedTypography
            variant="h2"
            text="OUR CLIENTS"
            className="text-center mb-4 lg:mb-8"
         />

         {clientsData && <ClientLists clientsData={clientsData} />}
         {showButton && (
            <Link href="/clients" className="flex justify-center mt-4">
               <Button size="lg">View More</Button>
            </Link>
         )}
      </section>
   );
}
