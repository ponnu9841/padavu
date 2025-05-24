import { fetchBanner, setSelectedBanner } from "@/store/features/banner-slice";
import BannerData from "./banner-data";
import BannerForm from "./form";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/use-store";

export default function Banner() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchBanner(controller));
      return () => {
         controller.abort();
         dispatch(setSelectedBanner(null));
      };
   }, [dispatch]);

   return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
         <div className="md:col-span-2">
            <BannerForm />
         </div>
         <div className="md:col-span-3">
            <BannerData />
         </div>
      </div>
   );
}
