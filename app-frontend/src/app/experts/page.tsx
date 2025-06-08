export const dynamic = "force-dynamic";
import BannerPages from "@/components/banner-pages";
import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import { getExpertsResponse, getPagesBannersResponse } from "@/lib/get-data";
import { cn, getCurrentPageBanner, isEven } from "@/lib/utils";
import parse from "html-react-parser";
import Link from "next/link";

const ExpertsPage = async () => {
   const [banners, expertsData] = await Promise.all([
      getPagesBannersResponse(),
      getExpertsResponse(),
   ]);
   const currentBanner = banners ? getCurrentPageBanner(banners, "blog") : null;
   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/images/placeholder.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />
         <div className="container my-10">
            {expertsData?.map((item, index) => {
               const even = isEven(index);
               return (
                  <div
                     key={item.id}
                     className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-8 items-center mb-8"
                  >
                     <NextImage
                        src={item.image}
                        alt={item.title}
                        className={cn(
                           "aspect-square md:col-span-2" +
                              (!even ? " md:order-2" : "")
                        )}
                        imageClassName="object-cover"
                     />
                     <div className="md:col-span-3">
                        <h2>{item.title}</h2>
                        <div className="my-2">{parse(item.description)}</div>
                        <Link href={`/experts/${item.id}`}>
                           <Button>View More</Button>
                        </Link>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default ExpertsPage;
