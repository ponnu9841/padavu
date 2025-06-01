import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

export default function BuildApplication() {
   const [loading, setLoading] = useState(false);
   const handleBuild = async () => {
      setLoading(true);
      try {
         const response = await axiosInstance.get("/deploy");
         if (response) {
            window.location.reload();
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button>Build Application</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Build Application</DialogTitle>
               <DialogDescription>Build Your Application</DialogDescription>
            </DialogHeader>
            <Button onClick={handleBuild} disabled={loading}>{loading ? "Building..." : "Build"}</Button>
         </DialogContent>
      </Dialog>
   );
}
