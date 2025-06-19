import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/use-store";
import ClientsForm from "./form";
import ClientsData from "./clients-data";
import { fetchClient, setSelectedClient } from "@/store/features/clients-slice";

export default function Clients() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchClient({ controller }));
      return () => {
         controller.abort();
         dispatch(setSelectedClient(null));
      };
   }, [dispatch]);

   return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
         <div className="md:col-span-2">
            <ClientsForm />
         </div>
         <div className="md:col-span-3">
            <ClientsData />
         </div>
      </div>
   );
}
