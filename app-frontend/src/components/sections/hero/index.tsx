import CarouselSlider from "@/components/carousel";
import React from "react";

export default function Hero({ banners }: { banners: Banner[] | null }) {
   if (banners) {
      return (
         <CarouselSlider
            images={banners}
            cardContentClassName="min-h-[70vh] lg:min-h-[80vh] xl:min-h-screen"
            id="home-slider"
            showTitle
         ></CarouselSlider>
      );
   }
}
