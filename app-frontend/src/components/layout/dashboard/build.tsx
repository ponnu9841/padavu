import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { getToken } from "@/lib/local-storage-service";
import { useState } from "react";

export default function BuildApplication() {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState("");

   const handleBuild = async () => {
      setLoading(true);
      try {

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/deploy`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getToken()}`,
               },
            }
         );

         const decoder = new TextDecoder("utf-8");
         const reader = response.body?.getReader();
         let accumulatedData = "";

         if (!reader) return;

         while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            accumulatedData += decoder.decode(value, { stream: true });
            setData(accumulatedData);
         }

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
               <p className="py-3">{data}</p>
            </DialogHeader>
            <Button onClick={handleBuild} disabled={loading}>
               {loading ? "Building..." : "Build"}
            </Button>
         </DialogContent>
      </Dialog>
   );
}
