import NextImage from "@/components/Image";
import { useAppSelector, useAppDispatch } from "@/hooks/use-store";
import { DeleteDrawer } from "@/components/admin/delete-drawer";
import axiosInstance from "@/lib/axios";
import { setSelectedPackage } from "@/store/features/packages-slice";
import parse from "html-react-parser";
import EditButton from "../edit-button";
import { fetchProducts } from "@/store/features/products-slice";

export default function BannerData() {
   const dispatch = useAppDispatch();
   const data = useAppSelector((state) => state.packages.data);

   const deleteBanner = async (id: string, image: string) => {
      try {
         const response = await axiosInstance.delete(`/products`, {
            params: { id, image },
         });
         if (response.status === 200) {
            dispatch(fetchProducts());
         }
      } catch (error) {
         console.error("Error deleting banner:", error);
         throw error; // Re-throw the error to handle it elsewhere if needed
      }
   };

   return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
         {data.length > 0
            ? data.map((packageData, index) => (
                 <div key={index} className="max-w-[200px]">
                    <div className="relative mb-3">
                       <NextImage
                          src={packageData.image}
                          className="aspect-square max-w-[200px]"
                       />
                       <div className="absolute bottom-0 right-0">
                          <EditButton
                             onClick={() =>
                                dispatch(setSelectedPackage(packageData))
                             }
                          />
                          <DeleteDrawer
                             title={`Delete Package ${packageData.title}`}
                             description={`Are you sure you want to delete ${packageData.title}? This action cannot be undone.`}
                             onDelete={() =>
                                deleteBanner(packageData.id, packageData.image)
                             }
                          />
                       </div>
                       {/* <div className="absolute top-3 right-16">edit</div> */}
                    </div>

                    <div>
                       <span className="font-bold">Title:&nbsp;</span>
                       {packageData.title}
                    </div>
                    <div className="mt-3 max-h-[100px] overflow-auto">
                       <span className="font-bold">Description:&nbsp;</span>
                       {parse(packageData.description)}
                    </div>
                    <div className="mt-3">
                       <span className="font-bold">Price:&nbsp;</span>
                       {packageData.price}
                    </div>
                 </div>
              ))
            : "Package not Added"}
      </div>
   );
}
