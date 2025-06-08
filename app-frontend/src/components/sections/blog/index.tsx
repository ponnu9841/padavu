"use client";
import React, { useEffect } from "react";
import BlogCard from "./blog-card";
// import TitleBadge from "@/components/custom/title-badge";
// import Heading from "@/components/custom/heading";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { fetchBlogs, setPageNo } from "@/store/features/blogs-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination";

export default function Blog() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchBlogs({ controller }));
      return () => controller.abort();
   }, []); //eslint-disable-line

   const { blogs, loading, pageNo } = useAppSelector((state) => state.blogs);
   const lastPage = blogs?.totalPages;
   return (
      <>
         {!loading && blogs?.data.length === 0 && (
            <div className="col-span-4 text-center text-red-500 mt-12 md:mt-20">
               No Record Found
            </div>
         )}

         {loading &&
            Array(6)
               .fill(null)
               .map((_, index) => (
                  <Skeleton key={index} className="aspect-square" />
               ))}

         <div className="container">
            {!!blogs?.data.length && (
               <div className="flex flex-col md:flex-row gap-8 flex-wrap items-stretch justify-center mt-12">
                  {blogs?.data.map((blog) => (
                     <div
                        className="md:w-[calc(50%-1rem)] lg:w-[calc(32%-1rem)] min-h-[400px]"
                        key={blog.id}
                     >
                        <BlogCard {...blog} />
                     </div>
                  ))}
               </div>
            )}
            {!loading && blogs?.data.length ? (
               <div className="mt-6">
                  <Pagination
                     pageNo={pageNo}
                     setPageNo={(pageNo) => dispatch(setPageNo(pageNo))}
                     totalPages={lastPage || 1}
                  />
               </div>
            ) : (
               <></>
            )}
         </div>
      </>
   );
}
