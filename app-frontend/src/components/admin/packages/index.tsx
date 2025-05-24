// import BannerData from "./banner-data";
import { fetchPackage, setSelectedPackage } from "@/store/features/packages-slice";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/use-store";
import PackagesForm from "./form";
import PackagesData from "./packages-data";

export default function Package() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchPackage(controller));
    return () => {
      controller.abort();
      dispatch(setSelectedPackage(null));
    };
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-2">
        <PackagesForm />
      </div>
      <div className="md:col-span-3">
        <PackagesData />
      </div>
    </div>
  );
}
