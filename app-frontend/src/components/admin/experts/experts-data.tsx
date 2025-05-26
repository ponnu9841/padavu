import NextImage from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
   fetchExperts,
   setSelectedExpert,
} from "@/store/features/experts-slice";
import parse from "html-react-parser";
import EditButton from "../edit-button";
import { DeleteDrawer } from "../delete-drawer";

export default function ExpertsData() {
   const dispatch = useAppDispatch();
   const { loading, data } = useAppSelector((state) => state.experts);

   const deleteExpert = async (id: string, image: string) => {
      const response = await axiosInstance.delete(`/experts`, {
         params: { id, image },
      });
      if (response && response.status === 200) {
         dispatch(fetchExperts());
      }
   };

   return (
      <div>
         <h2 className="text-xl">Uploaded Data</h2>

         <div className="grid grid-cols-4 gap-6 max-h-[500px] overflow-auto">
            {!loading && data.length === 0 && (
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
               data.map((expertData) => (
                  <div key={expertData.id}>
                     <div className="relative flex justify-center">
                        <NextImage
                           src={expertData.image}
                           className="aspect-square max-w-[100px]"
                        />
                        <div className="absolute bottom-0 right-0">
                           <EditButton
                              onClick={() => {
                                 dispatch(setSelectedExpert(expertData));
                              }}
                           />
                           <DeleteDrawer
                              title={`Delete Expertise`}
                              description={`Are you sure you want to delete this expertise? This action cannot be undone.`}
                              onDelete={() =>
                                 deleteExpert(expertData.id, expertData.image)
                              }
                           />
                        </div>
                     </div>
                     <div>{expertData.title}</div>
                     <div>{parse(expertData.description)}</div>
                  </div>
               ))}
         </div>
      </div>
   );
}
