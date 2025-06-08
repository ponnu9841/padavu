import BannerPages from "@/components/banner-pages";
import Clients from "@/components/sections/clients";
import { getClientsResponse, getPagesBannersResponse } from "@/lib/get-data";
import { generatePageMetadata, getCurrentPageBanner } from "@/lib/utils";

export const generateMetadata = () => generatePageMetadata("contact");

export default async function ClientsPage() {
   const [banners, clientsData] = await Promise.all([
      getPagesBannersResponse(),
      getClientsResponse(),
   ]);

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
            {clientsData && <Clients clientsData={clientsData} />}
         </section>
      </>
   );
}
