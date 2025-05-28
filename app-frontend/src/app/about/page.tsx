import About from "@/components/sections/about";
import Mission from "@/components/sections/mission";
import Vision from "@/components/sections/vision";
import {
   getAboutResponse,
   getMissionResponse,
   getVisionResponse,
} from "@/lib/get-data";

const AboutPage = async () => {
   const [aboutData, missionData, visionData] = await Promise.all([
      getAboutResponse(),
      getMissionResponse(),
      getVisionResponse(),
   ]);
   return (
      <>
         {aboutData && <About aboutData={aboutData} />}

         {/* Our Mission */}
         {missionData && <Mission missionData={missionData} />}

         {/* Vision */}
         {visionData && <Vision visionData={visionData} />}
      </>
   );
};

export default AboutPage;
