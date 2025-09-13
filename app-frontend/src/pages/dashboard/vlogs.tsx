import VlogsData from "@/components/admin/vlogs/vlog";
import VlogsForm from "@/components/admin/vlogs/form";
import SectionLayout from "@/components/admin/section-layout";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/hooks/use-store";
import { fetchVlogs, resetVlogData } from "@/store/features/vlogs-slice";
import { useEffect } from "react";

export default function ProductsPage() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchVlogs({ controller }));
      return () => {
         resetVlogData();
         controller.abort();
      };
   }, []); //eslint-disable-line
   return (
      <div>
         <h2 className="text-lg">Vlogs</h2>
         <SectionLayout
            formSection={<VlogsForm />}
            dataSection={<VlogsData />}
         />
      </div>
   );
}

ProductsPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
