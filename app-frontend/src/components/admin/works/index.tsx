import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/use-store";
import { setSelectedWork } from "@/store/features/works-slice";
import WorksForm from "./form";
import WorksData from "./works-data";

export default function Works() {
   const dispatch = useAppDispatch();
   useEffect(
      () => () => {
         dispatch(setSelectedWork(null));
      },
      [] //eslint-disable-line
   );

   return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
         <div className="md:col-span-2">
            <WorksForm />
         </div>
         <div className="md:col-span-3">
            <WorksData />
         </div>
      </div>
   );
}
