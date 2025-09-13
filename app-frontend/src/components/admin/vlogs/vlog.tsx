import { Pagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import EditButton from "@/components/admin/edit-button";
import {
   fetchVlogs,
   setSelectedVlog,
   setPageNo,
   getVlogs,
   getVlogsLoading,
   getVlogsPageNo,
} from "@/store/features/vlogs-slice";
import { DeleteDrawer } from "../delete-drawer";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import axiosInstance from "@/lib/axios";

export default function VlogsData() {
   const dispatch = useAppDispatch();
   const loading = useAppSelector(getVlogsLoading);
   const pageNo = useAppSelector(getVlogsPageNo);
   const vlogs = useAppSelector(getVlogs);

   const lastPage = vlogs?.totalPages;

   const deleteBlog = async (id: string) => {
      try {
         const response = await axiosInstance.delete(`/vlogs`, {
            params: { id },
         });
         if (response && response.status === 200) {
            dispatch(fetchVlogs({ pageNo }));
         }
      } catch (error) {
         throw error;
      }
   };

   return (
      <div>
         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-auto">
            {loading &&
               Array(6)
                  .fill(null)
                  .map((_, index) => (
                     <Skeleton key={index} className="aspect-square" />
                  ))}
            {!loading && vlogs?.data.length === 0 && (
               <div className="col-span-4 text-center mt-3 text-red-500">
                  No Record Found
               </div>
            )}
            {!loading &&
               vlogs?.data.map((vlog: Vlog) => (
                  <div key={vlog.id}>
                     <div className="relative">
                        <iframe className="w-full"
                           src={vlog.url}>
                        </iframe>
                        <div className="absolute bottom-0 right-0">
                           <EditButton
                              onClick={() => dispatch(setSelectedVlog(vlog))}
                           />
                           <DeleteDrawer
                              title={`Delete Vlog`}
                              description={`Are you sure you want to delete this blog? This action cannot be undone.`}
                              onDelete={() => deleteBlog(vlog.id)}
                           />
                        </div>
                     </div>
                     
                  </div>
               ))}
         </div>
         {!loading && vlogs?.data.length ? (
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
