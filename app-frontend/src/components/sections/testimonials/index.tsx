import CarouselSlider from "@/components/carousel";
import { RenderCarouselItem } from "@/components/carousel/carousel-item";
import { testimonials } from "@/lib/constants";
import React from "react";
import TestimonialCard from "./testimonial-card";

export default function Testimonials() {
   return (
      <section className="bg-secondary text-background ">
          <div className="container">
             <h2 className="text-background pt-5">Testimonials</h2>
             <div className="mt-6">
                <CarouselSlider
                   id="testimonials-slider"
                   carouselContentClassName="justify-stretch max-w-[100%]"
                   togglerPosition="bottom"
                   
                >
                   {testimonials?.map((testimonial, index) => (
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
