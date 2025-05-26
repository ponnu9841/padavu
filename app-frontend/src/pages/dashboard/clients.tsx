import Clients from "@/components/admin/clients";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function ClientsPage() {
   return (
      <div>
         <h2 className="text-lg">Clients</h2>
         <Clients />
      </div>
   );
}

ClientsPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
