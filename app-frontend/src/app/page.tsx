import About from "@/components/sections/about";
import Clients from "@/components/sections/clients";
import Experts from "@/components/sections/experts";
import Hero from "@/components/sections/hero";
import HowDoWeWork from "@/components/sections/how-do-we-work";
import Mission from "@/components/sections/mission";
import Packages from "@/components/sections/packages";
import Products from "@/components/sections/products";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import Vision from "@/components/sections/vision";
import Vlogs from "@/components/sections/vlog";
import Works from "@/components/sections/works";

export default function Home() {
   return (
      <main className="min-h-screen">
         <Hero />

         {/* Stats Section */}
         <Stats />

         {/* Packages Section */}
         <Packages />

         {/* Testimonials Section */}
         <Testimonials />

         {/* Experts Section */}
         <Experts />

         {/* How Do we work */}
         <HowDoWeWork />

         {/* About */}
         <About />

         {/* Our Mission */}
         <Mission />

         {/* Vision */}
         <Vision />

         {/* Clients */}
         <Clients />

         {/* Works */}
         <Works />

         {/* Vlogs  */}
         <Vlogs />

         {/* Products */}
         <Products />
      </main>
   );
}
