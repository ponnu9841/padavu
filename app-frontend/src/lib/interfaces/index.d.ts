type Banner = {
   id: string;
   image: string;
   alt?: string;
   title?: string;
   description?: string;
};

type CarouselCardProps = {
   cardContentClassName?: string | undefined;
   cardClassName?: string | undefined;
   carouselItemClassName?: string | undefined;
   children?: React.ReactNode | string;
};

type CarouselSliderProps = CarouselCardProps & {
   images?: Banner[];
   carouselContentClassName?: string | undefined;
   orientation?: "horizontal" | "vertical" | undefined;
   id?: string;
   togglerPosition?: string;
   showTitle?: boolean;
   enableScroll?: boolean;
};

type Testimonial = {
   id: string;
   vido_url?: string;
   image?: string;
   alt?: string;
   name: string;
   designation?: string;
   testimonial: string;
};

type WorkCardProps = {
   image: string;
   heading: string;
   category: string;
   style: string;
};
