import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/use-store";
import TestimonialForm from "./form";
import { clearTestimonial, fetchTestimonial } from "@/store/features/testimonial-slice";
import TestimonialsData from "./testimonials-data";

export default function Testimonials() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchTestimonial(controller));
      // dispatch partner
      return () => {
         controller.abort();
         dispatch(clearTestimonial());
      };
   }, []); //eslint-disable-line

   return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
         <div className="md:col-span-2">
            <TestimonialForm />
         </div>
         <div className="md:col-span-3">
            <TestimonialsData />
         </div>
      </div>
   );
}
