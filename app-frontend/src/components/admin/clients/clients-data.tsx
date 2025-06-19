import NextImage from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { DeleteDrawer } from "../delete-drawer";
import axiosInstance from "@/lib/axios";
import { fetchClient, setPageNo, setSelectedClient } from "@/store/features/clients-slice";
import EditButton from "../edit-button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { Pagination } from "@/components/pagination";

export default function ClientsData() {
   const dispatch = useAppDispatch();
   const { loading, pageNo, data } = useAppSelector((state) => state.clients);

   const lastPage = data?.totalPages;

   const deletePartner = async (id: string, image: string) => {
      const response = await axiosInstance.delete(`/clients`, {
         params: { id, image },
      });
      if (response && response.status === 200) {
         dispatch(fetchClient({ pageNo: 1 }));
      }
   };

   return (
      <div>
         <h2 className="text-xl">Uploaded Images</h2>

         <div className="grid grid-cols-4 gap-6 max-h-[500px] overflow-auto">
            {!loading && data?.data.length === 0 && (
               <div className="col-span-4 text-center mt-3 text-red-500">
                  No Record Found
               </div>
            )}
            {loading &&
               Array(4)
                  .fill(null)
                  .map((_, index) => (
                     <Skeleton key={index} className="aspect-square" />
                  ))}
            {!loading &&
               data?.data.map((client) => (
                  <div key={client.id} className="relative flex justify-center">
                     <NextImage
                        src={client.image}
                        className="aspect-square max-w-[100px]"
                     />
                     <div className="absolute bottom-0 right-0">
                        <EditButton
                           onClick={() => {
                              dispatch(setSelectedClient(client));
                           }}
                        />
                        <DeleteDrawer
                           title={`Delete Client`}
                           description={`Are you sure you want to delete this client? This action cannot be undone.`}
                           onDelete={() =>
                              deletePartner(client.id, client.image)
                           }
                        />
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
