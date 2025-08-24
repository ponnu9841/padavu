import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
// import { testimonials } from "@/lib/constants";
import React from "react";
import TestimonialCard from "./testimonial-card";
import AnimatedTypography from "@/components/animation/animated-typography";

export default function Testimonials({
   testimonialsData,
}: {
   testimonialsData: Testimonial[];
}) {
   return (
      <section>
         <div className="container">
            {/* <h2 className="text-center uppercase pt-5 text-primary">Testimonials</h2> */}
            <AnimatedTypography
               variant="h2"
               text="TESTIMONIALS"
               className="text-center mb-4 lg:mb-8"
            />
            <div className="mt-6">
               <CarouselSlider
                  id="testimonials-slider"
                  carouselContentClassName="justify-center max-w-full"
                  togglerPosition="bottom"
               >
                  {testimonialsData.map((testimonial, index) => (
                     <RenderCarouselItem
                        key={index}
                        carouselItemClassName="basis-full md:basis-1/2 lg:basis-1/4"
                        cardClassName="bg-tranparent rounded-sm p-12 relative mb-4"
                     >
                        <TestimonialCard {...testimonial} />
                     </RenderCarouselItem>
                  ))}
               </CarouselSlider>
            </div>
         </div>
      </section>
   );
}
