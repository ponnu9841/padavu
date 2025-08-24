import { AnimateElement } from "@/components/animation";
import AnimatedTypography from "@/components/animation/animated-typography";
import NextImage from "@/components/Image";
import parse from "html-react-parser";

export const ShadowGradient = () => (
   <div className="absolute inset-0 md:bg-[linear-gradient(90deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.1)_30%,_rgba(255,255,255,0)_100%)]" />
);
export default function About({
   aboutData,
   showLongDescription = false,
}: {
   aboutData: About;
   showLongDescription?: boolean;
}) {
   return (
      <section className="py-10 px-4 flex flex-col md:flex-row gap-4 md:gap-8 max-w-6xl mx-auto">
         <div className="md:w-1/2">
            {/* <h2 className="text-4xl font-bold mb-8">About Us</h2> */}
            <AnimatedTypography
               variant="h2"
               text="About Us"
               className="lg:mb-8 text-foreground"
            />

            <AnimateElement animation="fadeInUp">
               <div className="text-foreground">
                  {parse(aboutData?.short_description || "")}
               </div>
            </AnimateElement>
            {showLongDescription && (
               <AnimateElement animation="fadeInUp">
                  <div className="text-foreground">
                     {parse(aboutData?.long_description || "")}
                  </div>
               </AnimateElement>
            )}
         </div>
         <div className="md:w-1/2 relative">
            <NextImage
               className="aspect-[3/2] md:aspect-auto md:w-full md:rounded-r-large"
               src={aboutData?.image || ""}
               imageClassName="md:object-cover md:rounded-r-[5rem]"
            />
            <ShadowGradient />
         </div>
      </section>
   );
}
