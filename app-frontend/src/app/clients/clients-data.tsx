"use client";

import { Pagination } from "@/components/pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import Clients from "@/components/sections/clients";
import { fetchClient, setPageNo } from "@/store/features/clients-slice";
import { useEffect } from "react";

export default function ClientsData() {
   const { loading, pageNo, data } = useAppSelector((state) => state.clients);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchClient({ controller, pageNo, pageSize: 10 }));
   }, [pageNo]); //eslint-disable-line

   useEffect(() => {
      return () => {
         dispatch(setPageNo(1));
      };
   }, []); //eslint-disable-line

   const lastPage = data?.totalPages;
   return (
      <>
         {data && <Clients clientsData={data} />}
         {!loading && data?.data.length ? (
            <div className="mt-6">
               <Pagination
                  pageNo={pageNo}
                  setPageNo={(pageNo) => dispatch(setPageNo(pageNo))}
                  totalPages={lastPage || 1}
                  className="justify-center"
               />
            </div>
         ) : (
            <></>
         )}
      </>
   );
}
