import NextImage from "@/components/Image";
import React from "react";
import { ShadowGradient } from "../about";
import AnimatedTypography from "@/components/animation/animated-typography";
import parse from "html-react-parser";
import { AnimateElement } from "@/components/animation";

export default function Vision({ visionData }: { visionData: Vision }) {
   return (
      <section className="py-10 px-4 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
         <div className="md:w-1/2 text-foreground/90">
            {/* <h2 className="text-2xl font-bold mb-4 mg:mt-8">Our Vision</h2> */}
            <AnimatedTypography
               variant="h2"
               text="Our Vision"
               className="text-2xl font-bold mb-6 text-foreground/90"
            />
            <AnimateElement animation="fadeInUp" duration={1}>
               <div className="[&>ol]:list-disc [&>ol]:ml-6">
                  {parse(visionData?.description || "")}
               </div>
            </AnimateElement>

            {/* <ul className="space-y-2 text-sm md:mb-16">
               <li>
                  - Empower customers through education on professional interior
                  design practices.
               </li>
               <li>
                  - Create spaces that promote well-being, positivity and good
                  air quality.
               </li>
               <li>
                  - Eradicate unethical practices in the interior design
                  industry
               </li>
            </ul> */}
         </div>
         <div className="md:w-1/2 relative">
            <NextImage
               className="aspect-[3/2] md:aspect-auto md:w-full md:rounded-r-large"
               src={visionData?.image || ""}
               imageClassName="md:object-cover md:rounded-r-[5rem]"
            />
            <ShadowGradient />
         </div>
      </section>
   );
}
