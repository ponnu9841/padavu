import NextImage from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import {
   fetchTestimonial,
   setSelectedTestimonial,
   // setSelectedTestimonial,
} from "@/store/features/testimonial-slice";
import React from "react";
// import { MdEdit } from "react-icons/md";
import { DeleteDrawer } from "../delete-drawer";
import axiosInstance from "@/lib/axios";
import parse from "html-react-parser";
import EditButton from "../edit-button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";

export default function TestimonialsData() {
   const dispatch = useAppDispatch();
   const { loading, data } = useAppSelector((state) => state.testimonials);

   const deleteTestimonial = async (id: string, image: string | undefined) => {
      try {
         const response = await axiosInstance.delete(`/testimonials`, {
            params: { id, image },
         });
         if (response && response.status === 200) {
            dispatch(fetchTestimonial());
         }
      } catch (error) {
         throw error;
      }
   };

   return (
      <div className="grid grid-cols-2 gap-6 max-h-[500px] overflow-auto">
         {!loading && data.length === 0 && (
            <div className="col-span-4 text-center mt-3 text-red-500">
               No Record Found
            </div>
         )}
         {loading &&
            Array(4)
               .fill(null)
               .map((_, index) => (
                  <Skeleton key={index} className="aspect-square" />
               ))}
         {!loading &&
            data.map((testimonial) => (
               <div key={testimonial.id}>
                  <div className="relative flex justify-center min-h-[100px]">
                     <NextImage
                        src={testimonial.image}
                        alt={testimonial.alt || ""}
                        className="aspect-square max-w-[100px]"
                     />

                     <div className="absolute bottom-0 right-0">
                        <EditButton
                           onClick={() => dispatch(setSelectedTestimonial(testimonial))}
                        />
                        <DeleteDrawer
                           title={`Delete Testimonial from ${testimonial.name}`}
                           description={`Are you sure you want to delete this Testimonial? This action cannot be undone.`}
                           onDelete={() =>
                              deleteTestimonial(
                                 testimonial.id,
                                 testimonial.image
                              )
                           }
                        />
                     </div>
                  </div>
                  <div className="mt-4">
                     <div>
                        <span className="font-bold">Name: </span>{" "}
                        {testimonial?.name}
                     </div>
                     <div>
                        <span className="font-bold">Designation </span>
                        {parse(testimonial.designation || "")}
                     </div>
                  </div>
                  <div className="mt-4">
                     <span className="font-bold">Testimonial </span>{" "}
                     {parse(testimonial?.testimonial)}
                  </div>
               </div>
            ))}
      </div>
   );
}
