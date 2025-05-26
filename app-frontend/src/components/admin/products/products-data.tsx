import NextImage from "@/components/Image";
import { useAppSelector, useAppDispatch } from "@/hooks/use-store";
import { DeleteDrawer } from "@/components/admin/delete-drawer";
import axiosInstance from "@/lib/axios";
import parse from "html-react-parser";
import EditButton from "../edit-button";
import {
   fetchProducts,
   setSelectedProduct,
} from "@/store/features/products-slice";

export default function ProductsData() {
   const dispatch = useAppDispatch();
   const data = useAppSelector((state) => state.products.data);
   const deleteBanner = async (id: string, image: string) => {
      const response = await axiosInstance.delete(`/products`, {
         params: { id, image },
      });
      if (response.status === 200) {
         dispatch(fetchProducts());
      }
   };

   return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
         {data.length > 0
            ? data.map((item, index) => (
                 <div key={index} className="max-w-[200px]">
                    <div className="relative mb-3">
                       <NextImage
                          src={item.image}
                          className="aspect-square max-w-[200px]"
                       />
                       <div className="absolute bottom-0 right-0">
                          <EditButton
                             onClick={() => dispatch(setSelectedProduct(item))}
                          />
                          <DeleteDrawer
                             title={`Delete Product ${item.title}`}
                             description={`Are you sure you want to delete ${item.title}? This action cannot be undone.`}
                             onDelete={() => deleteBanner(item.id, item.image)}
                          />
                       </div>
                    </div>

                    <div>
                       <span className="font-bold">Title:&nbsp;</span>
                       {item.title}
                    </div>
                    <div className="mt-3 max-h-[100px] overflow-auto">
                       <span className="font-bold">Description:&nbsp;</span>
                       {parse(item.description || "")}
                    </div>
                 </div>
              ))
            : "Package not Added"}
      </div>
   );
}
