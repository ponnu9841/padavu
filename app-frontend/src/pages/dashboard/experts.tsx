import ExpertsData from "@/components/admin/experts/experts-data";
import ExpertsForm from "@/components/admin/experts/form";
import SectionLayout from "@/components/admin/section-layout";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/hooks/use-store";
import { fetchExperts, resetExperts } from "@/store/features/experts-slice";
import { useEffect } from "react";

export default function ExpertsPage() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchExperts(controller));
      return () => {
         resetExperts();
         controller.abort();
      };
   }, []); //eslint-disable-line
   return (
      <div>
         <h2 className="text-lg">Experts</h2>
         <SectionLayout
            formSection={<ExpertsForm />}
            dataSection={<ExpertsData />}
         />
      </div>
   );
}

ExpertsPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
