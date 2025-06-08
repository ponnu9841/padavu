// import Link from "next/link";
import React from "react";
// import { allWorks } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedTypography from "@/components/animation/animated-typography";
import WorksList from "../works-list";

export default function Works() {
   return (
      <div className="py-10 px-4 max-w-6xl mx-auto">
         <AnimatedTypography
            variant="h2"
            text="Completed Works"
            className="text-primary mb-4"
         />
         {/* <h2 className="mb-4 text-primary">Completed works</h2> */}
         <WorksList showPagination={false} />
         <Link href="/works" className="flex justify-center mt-4 lg:mt-8">
            <Button size="lg">View More</Button>
         </Link>
      </div>
   );
}
