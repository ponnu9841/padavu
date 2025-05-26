import AboutForm from "@/components/admin/about/about-form";
import MissionForm from "@/components/admin/about/mission-form";
import VisionForm from "@/components/admin/about/vision-form";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/use-store";
import {
   fetchAbout,
   fetchMission,
   fetchVision,
} from "@/store/features/about-slice";
import { useEffect } from "react";

export default function Home() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchAbout(controller));
      dispatch(fetchMission(controller));
      dispatch(fetchVision(controller));
      return () => controller.abort();
   }, []); //eslint-disable-line
   return (
      <Tabs defaultValue="about" className="w-full">
         <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="vision">Vision</TabsTrigger>
         </TabsList>
         <TabsContent value="about">
            <AboutForm />
         </TabsContent>
         <TabsContent value="mission">
            <MissionForm />
         </TabsContent>
         <TabsContent value="vision">
            <VisionForm />
         </TabsContent>
      </Tabs>
   );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
