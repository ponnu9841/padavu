import NextImage from "@/components/Image";

export const ShadowGradient = () => (
   <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.1)_30%,_rgba(255,255,255,0)_100%)]" />
);
export default function About() {
   return (
      <section className="py-10 px-4 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
         <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-8">About Us</h2>

            <p className="text-primary md:text-lg mb-6 lg:mb-24">
               Welcome to Padavu Interio, a reputable interior contracting firm
               based out of Calicut. With a state-of-the-art 5000sqft
               manufacturing unit, we&apos;ve established ourselves as a trusted
               name in the industry since our inception in 2016
            </p>
         </div>
         <div className="md:w-1/2 relative">
            <NextImage
               src="/images/about.webp"
               imageClassName="object-cover rounded-r-large"
            />
            <ShadowGradient />
         </div>
      </section>
   );
}
