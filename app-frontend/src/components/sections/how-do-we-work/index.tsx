import AnimatedTypography from "@/components/animation/animated-typography";
import { RenderElement } from "@/components/render-element";
import Image from "next/image";

const workSteps = [
   {
      icon: "/images/work/1.png",
      title: "Pre design talks with Interior Designers",
   },
   {
      icon: "/images/work/2.png",
      title: "Detailed design presentation & Approval",
   },
   {
      icon: "/images/work/3.png",
      title: "Production at our own factories",
   },
   {
      icon: "/images/work/4.png",
      title: "On time delivery of materials",
   },
   {
      icon: "/images/work/5.png",
      title: "Execution of project by our team heads",
   },
   {
      icon: "/images/work/6.png",
      title: "Project close-out",
   },
];

export default function HowDoWeWork() {
   return (
      <section className="my-10 px-4">
         <AnimatedTypography
            variant="h2"
            text="HOW DO WE WORK"
            className="text-4xl font-bold text-center text-primary mb-10"
         />

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {workSteps.map((step, index) => (
               <div
                  key={index}
                  className="flex flex-col items-center text-center"
               >
                  <div className="mb-4">
                     <Image
                        src={step.icon || "/placeholder.svg"}
                        alt={step.title}
                        width={80}
                        height={80}
                        className="mx-auto"
                     />
                  </div>
                  <div className="text-primary font-semibold mb-1">
                     {index + 1}.
                  </div>
                  <RenderElement
                     title={step.title}
                     variant="h3"
                     className="text-primary text-sm font-medium"
                  />
               </div>
            ))}
         </div>
      </section>
   );
}
