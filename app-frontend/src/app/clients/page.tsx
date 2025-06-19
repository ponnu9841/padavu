import BannerPages from "@/components/banner-pages";
import { getPagesBannersResponse } from "@/lib/get-data";
import { generatePageMetadata, getCurrentPageBanner } from "@/lib/utils";
import ClientsData from "./clients-data";

export const generateMetadata = () => generatePageMetadata("clients");

export default async function ClientsPage() {
   const banners = await getPagesBannersResponse()

   const currentBanner = banners
      ? getCurrentPageBanner(banners, "contact")
      : null;

   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/banner-page.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt}
         />
         <section className="container my-24">
            <ClientsData />
         </section>
      </>
   );
}
