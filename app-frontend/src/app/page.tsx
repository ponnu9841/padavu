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
import {
   getAboutResponse,
   getBannersResponse,
   getClientsResponse,
   getExpertsResponse,
   getMissionResponse,
   getPackagesResponse,
   getProductsResponse,
   getTestimonialsResponse,
   getVisionResponse,
   getWorksResponse,
} from "@/lib/get-data";

const Home = async () => {
   const [
      bannerData,
      expertsData,
      packagesData,
      aboutData,
      missionData,
      visionData,
      clientsData,
      worksData,
      testimonialsData,
      productsData,
   ] = await Promise.all([
      getBannersResponse(),
      getExpertsResponse(),
      getPackagesResponse(),
      getAboutResponse(),
      getMissionResponse(),
      getVisionResponse(),
      getClientsResponse(),
      getWorksResponse(),
      getTestimonialsResponse(),
      getProductsResponse()
   ]);

   return (
      <main className="min-h-screen">
         <Hero banners={bannerData} />

         {/* Stats Section */}
         <Stats />

         {/* Experts Section */}
         <Experts experts={expertsData} />

         {/* Packages Section */}
         <Packages packages={packagesData} />

         {/* How Do we work */}
         <HowDoWeWork />

         {/* About */}
         <About aboutData={aboutData} />

         {/* Our Mission */}
         <Mission missionData={missionData} />

         {/* Vision */}
         <Vision visionData={visionData} />

         {/* Clients */}
         <Clients clientsData={clientsData} />

         {/* Works */}
         {worksData && <Works worksData={worksData} />}

         {/* Testimonials Section */}
         {testimonialsData && <Testimonials testimonialsData={testimonialsData} />}

         {/* Products */}
         {productsData && <Products productsData={productsData} />}

         {/* Vlogs  */}
         <Vlogs />
      </main>
   );
};

export default Home;
