import ProductsForm from "@/components/admin/products/form";
import ProductsData from "@/components/admin/products/products-data";
import SectionLayout from "@/components/admin/section-layout";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/hooks/use-store";
import { fetchProducts, resetProducts } from "@/store/features/products-slice";
import { useEffect } from "react";

export default function ProductsPage() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchProducts(controller));
      return () => {
         resetProducts();
         controller.abort();
      };
   }, []); //eslint-disable-line
   return (
      <div>
         <h2 className="text-lg">Products</h2>
         <SectionLayout
            formSection={<ProductsForm />}
            dataSection={<ProductsData />}
         />
      </div>
   );
}

ProductsPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
