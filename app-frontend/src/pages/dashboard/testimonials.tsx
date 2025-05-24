import Testimonials from "@/components/admin/testimonials";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";

export default function Home() {
   return (
      <div>
         <h2 className="text-lg">Packages</h2>
         <Testimonials />
      </div>
   );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
