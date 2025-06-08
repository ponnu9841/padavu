export const dynamic = "force-dynamic";
import BannerPages from "@/components/banner-pages";
import WorksList from "@/components/sections/works-list";
import { getPagesBannersResponse } from "@/lib/get-data";
import { generatePageMetadata, getCurrentPageBanner } from "@/lib/utils";

export const generateMetadata = () => generatePageMetadata("works");

const ExpertsPage = async () => {
   const banners = await getPagesBannersResponse();
   const currentBanner = banners
      ? getCurrentPageBanner(banners, "works")
      : null;

   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/banner-page.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />
         <div className="container my-10">
            <WorksList showPagination />
         </div>
      </>
   );
};

export default ExpertsPage;
