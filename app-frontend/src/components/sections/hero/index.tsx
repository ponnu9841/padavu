import { AnimateElement } from "@/components/animation";
import CarouselSlider from "@/components/carousel";
import { Award, CheckCircle, Factory, Users } from "lucide-react";

const stats = [
   {
      id: "1",
      title: "Satisfied Customer",
      count: "500+",
      icon: Users,
   },
   {
      id: "2",
      title: "Sqft Factory",
      count: "5000+",
      icon: Factory,
   },
   {
      id: "3",
      title: "Years experience",
      count: "15+",
      icon: Award,
   },
   {
      id: "4",
      title: "Completed Projects",
      count: "600+",
      icon: CheckCircle,
   },
];

export default function Hero({ banners }: { banners: Banner[] | null }) {
   if (banners) {
      return (
         <div className="relative">
            <CarouselSlider
               images={banners}
               cardContentClassName="min-h-[70vh] lg:min-h-[80vh] xl:min-h-screen"
               id="home-slider"
               showTitle
               renderBackground
               loop={false}
            ></CarouselSlider>
            <div className="absolute left-3 bottom-3 lg:left-20 lg:bottom-20 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 max-w-[calc(100%-1.5rem)]">
               {stats.map((stat, index) => (
                  <div
                     key={stat.id}
                     className="bg-card/20 text-background/90 rounded-md p-3 flex gap-1"
                  >
                     <div>
                        {
                           <stat.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16" />
                        }
                        
                     </div>
                     <div>
                        <h3 className="text-sm md:text-xl lg:text-2xl font-semibold md:font-bold mt-1 md:mt-2">
                           {stat.count}
                        </h3>
                        <AnimateElement
                           animation="fadeInUp"
                           duration={(index + 1) * 0.2}
                        >
                           <p className="text-xs lg:text-lg xl:text-lg leading-none md:leading-7 font-semibold md:font-bold tracking-wider text-center">
                              {stat.title}
                           </p>
                        </AnimateElement>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      );
   }
}
