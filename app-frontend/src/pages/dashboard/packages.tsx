import Package from "@/components/admin/packages";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function Home() {
   return (
      <div>
         <h2 className="text-lg">Packages</h2>
         <Package />
      </div>
   );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
