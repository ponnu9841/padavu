import NextImage from "@/components/Image";
import { useAppSelector, useAppDispatch } from "@/hooks/use-store";
import { DeleteDrawer } from "@/components/admin/delete-drawer";
import { fetchBanner, setSelectedBanner } from "@/store/features/banner-slice";
import axiosInstance from "@/lib/axios";
import EditButton from "../edit-button";

export default function BannerData() {
   const dispatch = useAppDispatch();
   const data = useAppSelector((state) => state.banners.data);

   const deleteBanner = async (id: string, image: string) => {
      const response = await axiosInstance.delete(`/banners`, {
         params: { id, image },
      });
      if (response.status === 200) {
         dispatch(fetchBanner());
      }
   };

   return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
         {data.length > 0
            ? data.map((banner, index) => (
                 <div key={index} className="max-w-[200px]">
                    <div className="relative mb-3">
                       <NextImage
                          src={banner.image}
                          className="aspect-square max-w-[200px]"
                       />
                       <div className="absolute bottom-0 right-0">
                          <EditButton
                             onClick={() => dispatch(setSelectedBanner(banner))}
                          />
                          <DeleteDrawer
                             title={`Delete Banner ${banner.title}`}
                             description={`Are you sure you want to delete ${banner.title}? This action cannot be undone.`}
                             onDelete={() =>
                                deleteBanner(banner.id, banner.image)
                             }
                          />
                       </div>
                       {/* <div className="absolute top-3 right-16">edit</div> */}
                    </div>

                    <div>
                       <span className="font-bold">Title:&nbsp;</span>
                       {banner.title}
                    </div>
                    <div className="mt-3 max-h-[100px] overflow-auto">
                       <span className="font-bold">Description:&nbsp;</span>
                       {banner.description}
                    </div>
                 </div>
              ))
            : "Banner not Added"}
      </div>
   );
}
