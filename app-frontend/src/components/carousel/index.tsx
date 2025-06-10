"use client";

import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
   Carousel,
   CarouselContent,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { RenderCarouselItem } from "./carousel-item";
import { cn } from "@/lib/utils";
import { RenderBackground, RenderElement } from "@/components/render-element";

const CarouselSlider = (props: CarouselSliderProps) => {
   const {
      images,
      carouselContentClassName,
      carouselItemClassName,
      cardContentClassName,
      cardClassName,
      children,
      orientation = "horizontal",
      id,
      togglerPosition = "default",
      showTitle = false,
      enableScroll = false,
      renderBackground = false,
      loop = true,
   } = props;
   const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

   const opts = {
      loop,
   };

   const hasPadding = carouselItemClassName?.includes("pl-");
   let paddingValue = 0;
   if (hasPadding) {
      paddingValue =
         parseInt(carouselItemClassName?.split("pl-")[1] || "0") || 0;
   }

   const carousel = useRef<HTMLDivElement>(null);
   const [api, setApi] = useState<any>(null); //eslint-disable-line

   useEffect(() => {
      if (!api) return;

      const handleScroll = (event: WheelEvent) => {
         event.preventDefault();
         if (event.deltaY > 0) {
            api.scrollNext();
         } else {
            api.scrollPrev();
         }
      };

      const currentCarousel = carousel.current;
      if (currentCarousel && enableScroll) {
         currentCarousel.addEventListener("wheel", handleScroll, {
            passive: false,
         });
      }

      return () => {
         if (currentCarousel) {
            currentCarousel.removeEventListener("wheel", handleScroll);
         }
      };
   }, [api]); //eslint-disable-line

   return (
      <Carousel
         plugins={[plugin.current]}
         className="w-full relative carousel"
         onMouseEnter={plugin.current.stop}
         onMouseLeave={plugin.current.reset}
         id={id || "carousel-slider"}
         orientation={orientation}
         opts={opts}
         ref={carousel}
         setApi={setApi}
      >
         <CarouselContent
            className={cn(
               "carousel-content w-full",
               `${paddingValue ? "-ml-" + paddingValue : "m-0"}`,
               carouselContentClassName
            )}
         >
            {renderBackground && <RenderBackground />}
            {images?.map((image, index) => (
               <RenderCarouselItem
                  key={index}
                  cardContentClassName={cardContentClassName}
                  carouselItemClassName={carouselItemClassName}
                  cardClassName={cardClassName}
               >
                  <Image
                     src={image.image}
                     fill
                     alt="banner"
                     className="object-cover"
                     sizes="(min-width: 768px)60vw, 70vw"
                     priority={index === 0}
                  />
                  {!!children && children}
                  {showTitle && (
                     <>
                        <div className="absolute top-1/3 left-0 px-10 md:px-32 text-white z-50">
                           {image.title && (
                              <RenderElement
                                 variant="h1"
                                 className="text-display"
                                 title={image.title}
                                 animation="fadeInDown"
                              />
                           )}
                           {image.description && (
                              <RenderElement
                                 variant="p"
                                 className="max-w-4xl"
                                 title={image.description}
                                 animation="fadeInUp"
                              />
                           )}
                        </div>
                     </>
                  )}
               </RenderCarouselItem>
            ))}
            {!!!images && <>{!!children && children}</>}
         </CarouselContent>
         {(children || (images && images.length > 1)) && (
            <>
               <CarouselPrevious
                  className={
                     togglerPosition === "default"
                        ? "left-8 z-3 text-foreground"
                        : "bottom-0 left-1/2 -translate-x-[calc(50%+1.5rem)] z-3 translate-y-0 top-[calc(100%-3rem)] text-foreground"
                  }
               />
               <CarouselNext
                  className={
                     togglerPosition === "default"
                        ? "right-8 z-3 text-foreground"
                        : "bottom-0 left-1/2 -translate-x-[calc(50%-1.5rem)] z-3 translate-y-0 top-[calc(100%-3rem)] text-foreground"
                  }
               />
            </>
         )}
      </Carousel>
   );
};

export default CarouselSlider;
