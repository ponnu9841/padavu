"use client";

import ZoomAnimation from "@/components/animation/zoom-animation";
import GalleryDialog from "@/components/gallery-dialog";
import NextImage from "@/components/Image";
import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { fetchWork, setPageNo } from "@/store/features/works-slice";
import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function WorksList({
   showPagination = true,
}: {
   showPagination: boolean;
}) {
   const dispatch = useAppDispatch();
   const { loading, pageNo, data } = useAppSelector((state) => state.works);
   const lastPage = data?.totalPages;
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchWork({ controller, pageNo, pageSize: 12 }));
      return () => controller.abort();
   }, [pageNo]); //eslint-disable-line

   const openDialog = (id: string) => setSelectedImage(id);

   return (
      <>
         <div className="container my-12">
            {loading &&
               Array(6)
                  .fill(null)
                  .map((_, index) => (
                     <Skeleton key={index} className="aspect-square" />
                  ))}
            {!loading && data?.data.length === 0 && (
               <div className="col-span-4 text-center mt-3 text-red-500">
                  No Record Found
               </div>
            )}

            {!loading && data?.data.length && (
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data?.data.map((image, index) => (
                     <div
                        key={index}
                        className="group aspect-square relative cursor-pointer"
                        onClick={() => openDialog(image.id)}
                     >
                        <div className="absolute inset-0 rounded-sm bg-black bg-opacity-0 opacity-0 group-hover:opacity-50 transition-all duration-300 z-10 flex justify-center items-center">
                           <div className="p-3 rounded-full bg-background">
                              <LinkIcon size={15} />
                           </div>
                        </div>
                        <ZoomAnimation className="aspect-square">
                           <NextImage
                              src={image.image}
                              className="rounded-sm overflow-hidden"
                              imageClassName="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                           />
                        </ZoomAnimation>
                     </div>
                  ))}
               </div>
            )}
            {!loading && data?.data.length && showPagination ? (
               <div className="mt-6 flex justify-center">
                  <Pagination
                     pageNo={pageNo}
                     setPageNo={(pageNo) => dispatch(setPageNo(pageNo))}
                     totalPages={lastPage || 1}
                  />
               </div>
            ) : (
               <></>
            )}
         </div>
         {data?.data.length && (
            <GalleryDialog
               selectedImage={selectedImage}
               setSelectedImage={setSelectedImage}
               images={data?.data}
            />
         )}
      </>
   );
}
