export const dynamic = "force-dynamic";
import BannerPages from "@/components/banner-pages";
import NextImage from "@/components/Image";
import { getExpertsResponse, getPagesBannersResponse } from "@/lib/get-data";
import { getCurrentPageBanner } from "@/lib/utils";
import parse from "html-react-parser";

const ExpertsPage = async () => {
   const [banners, expertsData] = await Promise.all([
      getPagesBannersResponse(),
      getExpertsResponse(),
   ]);
   const currentBanner = banners ? getCurrentPageBanner(banners, "blog") : null;
   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/banner-page.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />
         <div className="container my-10">
            {expertsData?.map((item) => (
               <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-8 items-center mb-8"
               >
                  <NextImage
                     src={item.image}
                     alt={item.title}
                     className="aspect-square md:col-span-2"
                     imageClassName="object-cover"
                  />
                  <div className="md:col-span-3">
                     <h2>{item.title}</h2>
                     <div className="mt-2">{parse(item.description)}</div>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default ExpertsPage;
