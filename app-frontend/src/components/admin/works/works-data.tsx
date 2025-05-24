import NextImage from "@/components/Image";
import { useEffect } from "react";
import { DeleteDrawer } from "../delete-drawer";
import axiosInstance from "@/lib/axios";
import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EditButton from "@/components/admin/edit-button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
   fetchWork,
   setPageNo,
   setSelectedWork,
} from "@/store/features/works-slice";

export default function Gallery() {
   const dispatch = useAppDispatch();
   const { loading, pageNo, data } = useAppSelector((state) => state.works);

   const lastPage = data?.totalPages;

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchWork({ controller, pageNo }));
      return () => controller.abort();
   }, [pageNo]); //eslint-disable-line

   const deleteWork = async (id: string, image: string) => {
      const response = await axiosInstance.delete(`/works`, {
         params: { id, image },
      });
      if (response && response.status === 200) {
         dispatch(fetchWork({ pageNo }));
      }
   };

   return (
      <div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[500px] overflow-auto">
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
            {!loading &&
               data?.data.map((image) => (
                  <div key={image.id}>
                     <div className="relative">
                        <NextImage
                           className="aspect-square"
                           src={image.image}
                        />
                        <div className="absolute bottom-0 right-0">
                           <EditButton
                              onClick={() => dispatch(setSelectedWork(image))}
                           />
                           <DeleteDrawer
                              title={`Delete Gallery Image ${image.title}`}
                              description={`Are you sure you want to delete this image? This action cannot be undone.`}
                              onDelete={() => deleteWork(image.id, image.image)}
                           />
                        </div>
                     </div>
                     <div className="mt-3">
                        <b>Title </b> {image.title}
                     </div>
                     <div className="mt-3">
                        <b>Description </b> {image.description}
                     </div>
                  </div>
               ))}
         </div>
         {!loading && data?.data.length ? (
            <div className="mt-6">
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
   );
}
