import CarouselSlider from "@/components/carousel";
import { heroData } from "@/lib/constants";
import React from "react";

export default function Hero() {
   return (
      <CarouselSlider
         images={heroData}
         cardContentClassName="min-h-[70vh] lg:min-h-[80vh] xl:min-h-screen"
         id="home-slider"
         showTitle
      ></CarouselSlider>
   );
}
