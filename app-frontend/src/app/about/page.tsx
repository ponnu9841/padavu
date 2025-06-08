export const dynamic = "force-dynamic";
import BannerPages from "@/components/banner-pages";
import About from "@/components/sections/about";
import Mission from "@/components/sections/mission";
import Vision from "@/components/sections/vision";
import {
   getAboutResponse,
   getMissionResponse,
   getPagesBannersResponse,
   getVisionResponse,
} from "@/lib/get-data";
import { getCurrentPageBanner } from "@/lib/utils";

const AboutPage = async () => {
   const [aboutData, missionData, visionData, banners] = await Promise.all([
      getAboutResponse(),
      getMissionResponse(),
      getVisionResponse(),
      getPagesBannersResponse(),
   ]);
   const currentBanner = banners ? getCurrentPageBanner(banners, "about") : null;
   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/images/placeholder.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />
         {aboutData && <About aboutData={aboutData} showLongDescription />}

         {/* Our Mission */}
         {missionData && <Mission missionData={missionData} />}

         {/* Vision */}
         {visionData && <Vision visionData={visionData} />}
      </>
   );
};

export default AboutPage;
