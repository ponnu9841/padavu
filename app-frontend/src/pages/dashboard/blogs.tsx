import BlogsData from "@/components/admin/blogs/blog";
import BlogsForm from "@/components/admin/blogs/form";
import SectionLayout from "@/components/admin/section-layout";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/hooks/use-store";
import { fetchBlogs, resetBlogData } from "@/store/features/blogs-slice";
import { useEffect } from "react";

export default function ProductsPage() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchBlogs({ controller }));
      return () => {
         resetBlogData();
         controller.abort();
      };
   }, []); //eslint-disable-line
   return (
      <div>
         <h2 className="text-lg">Products</h2>
         <SectionLayout
            formSection={<BlogsForm />}
            dataSection={<BlogsData />}
         />
      </div>
   );
}

ProductsPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
