export const dynamic = "force-dynamic";

import About from "@/components/sections/about";
import Clients from "@/components/sections/clients";
import Experts from "@/components/sections/experts";
import Hero from "@/components/sections/hero";
import HowDoWeWork from "@/components/sections/how-do-we-work";
import Mission from "@/components/sections/mission";
import Packages from "@/components/sections/packages";
import Products from "@/components/sections/products";
// import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import Vision from "@/components/sections/vision";
import Vlogs from "@/components/sections/vlog";
import Works from "@/components/sections/works";
import {
   getAboutResponse,
   getBannersResponse,
   getBlogsResponse,
   getClientsResponse,
   getExpertsResponse,
   getMissionResponse,
   // getPackagesResponse,
   getProductsResponse,
   getTestimonialsResponse,
   getVisionResponse,
   // getWorksResponse,
} from "@/lib/get-data";
import { generatePageMetadata } from "@/lib/utils";

export const generateMetadata = () => generatePageMetadata("home");

const Home = async () => {
   const [
      bannerData,
      expertsData,
      // packagesData,
      aboutData,
      missionData,
      visionData,
      clientsData,
      // worksData,
      testimonialsData,
      productsData,
      blogData,
   ] = await Promise.all([
      getBannersResponse(),
      getExpertsResponse(),
      // getPackagesResponse(),
      getAboutResponse(),
      getMissionResponse(),
      getVisionResponse(),
      getClientsResponse(),
      // getWorksResponse(),
      getTestimonialsResponse(),
      getProductsResponse(),
      getBlogsResponse(),
   ]);

   return (
      <>
         <Hero banners={bannerData} />

         {/* Stats Section */}
         {/* <Stats /> */}

         {/* Experts Section */}
         {expertsData && <Experts experts={expertsData} />}

         {/* Packages Section */}
         {/* {packagesData && <Packages packages={packagesData} />} */}
         <Packages />

         {/* How Do we work */}
         <HowDoWeWork />

         {/* About */}
         {aboutData && <About aboutData={aboutData} />}

         {/* Our Mission */}
         {missionData && <Mission missionData={missionData} />}

         {/* Vision */}
         {visionData && <Vision visionData={visionData} />}

         {/* Clients */}
         {clientsData && <Clients clientsData={clientsData} showButton />}

         {/* Works */}
         <Works />

         {/* Testimonials Section */}
         {testimonialsData && <Testimonials testimonialsData={testimonialsData} />}

         {/* Products */}
         {productsData && <Products productsData={productsData} />}

         {/* Vlogs  */}
         {blogData && <Vlogs blogData={blogData} />}
      </>
   );
};

export default Home;
