import BannerPages from "@/components/banner-pages";
import Blog from "@/components/sections/blog";
import { getPagesBannersResponse } from "@/lib/get-data";
import { generatePageMetadata, getCurrentPageBanner } from "@/lib/utils";

export const generateMetadata = () => generatePageMetadata("blogs");

export default async function BlogPage() {
   const banners = await getPagesBannersResponse();

   const currentBanner = banners
      ? getCurrentPageBanner(banners, "contact")
      : null;

   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/banner-page.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />

         <Blog />
      </>
   );
}
