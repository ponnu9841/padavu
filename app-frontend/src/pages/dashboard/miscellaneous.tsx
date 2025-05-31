import PagesBanner from "@/components/admin/page-banner";
import Seo from "@/components/admin/seo";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/use-store";
import { fetchPagesBanner } from "@/store/features/pages-banner-slice";
import { fetchSeo } from "@/store/features/seo-slice";
import { useEffect } from "react";

export default function OthersPage() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchPagesBanner(controller));
      dispatch(fetchSeo(controller));
      return () => controller.abort();
   }, []); //eslint-disable-line
   return (
      <Tabs defaultValue="banner" className="w-full">
         <TabsList>
            <TabsTrigger value="banner">Pages Banner</TabsTrigger>
            <TabsTrigger value="seo">Seo Meta Tags</TabsTrigger>
         </TabsList>
         <TabsContent value="banner">
            <PagesBanner />
         </TabsContent>
         <TabsContent value="seo">
            <Seo />
         </TabsContent>
      </Tabs>
   );
}

OthersPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
