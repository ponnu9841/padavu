import Works from "@/components/admin/works";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function Home() {
   return (
      <div>
         <h2 className="text-lg">Works</h2>
         <Works />
      </div>
   );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
