import BannerPages from "@/components/banner-pages";
import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import { getPagesBannersResponse, getProductsResponse } from "@/lib/get-data";
import { getCurrentPageBanner } from "@/lib/utils";
import parse from "html-react-parser";
import Link from "next/link";

const ExpertsPage = async () => {
   const [banners, packagesData] = await Promise.all([
      getPagesBannersResponse(),
      getProductsResponse(),
   ]);
   const currentBanner = banners
      ? getCurrentPageBanner(banners, "products")
      : null;

   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/banner-page.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />
         <div className="container my-10">
            {packagesData?.map((item) => (
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
                     <div className="mt-2 mb-3">{parse(item.description || "")}</div>
                     <Link href={`/products/${item.id}`}>
                        <Button>View More</Button>
                     </Link>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default ExpertsPage;
