import FileUpload from "@/components/file-upload";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import axiosInstance from "@/lib/axios";
import { TestimonialFormData, testimonialSchema } from "@/schema";
import {
   fetchTestimonial,
   setSelectedTestimonial,
} from "@/store/features/testimonial-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import TextEditor from "@/components/text-editor";

const defaultValues = {
   id: "",
   image: [],
   imageAlt: "",
   name: "",
   designation: "",
   testimonial: "",
};

export default function TestimonialForm() {
   const form = useForm<TestimonialFormData>({
      resolver: zodResolver(testimonialSchema),
      defaultValues,
   });

   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);

   const dispatch = useAppDispatch();
   const selectedTestimonial = useAppSelector(
      (state) => state.testimonials.selectedTestimonial
   );

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
      setSelectedTestimonial(null);
   };

   const onSubmit = (data: TestimonialFormData) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("alt", data.imageAlt || "");
      formData.append("name", data.name);
      formData.append("designation", data.designation || "");
      formData.append("testimonial", data.testimonial);
      formData.append("existingImage", existingImage);
      if (data.id) {
         formData.append("id", data.id);
      }
      if (data.image.length > 0) {
         formData.append("image", data.image[0]);
      }
      const method = data.id ? axiosInstance.put : axiosInstance.post;

      method("/testimonials", formData)
         .then((response) => {
            if (response.status === 200) {
               resetForm();
               dispatch(fetchTestimonial());
            }
         })
         .finally(() => setLoading(false));
   };

   useEffect(() => {
      if (selectedTestimonial) {
         form.reset({
            id: selectedTestimonial.id,
            image: [],
            imageAlt: selectedTestimonial.alt || "",
            name: selectedTestimonial.name,
            designation: selectedTestimonial.designation || "",
            testimonial: selectedTestimonial.testimonial,
         });
         setExistingImage(selectedTestimonial.image);
      }
   }, [selectedTestimonial]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="image"
                  render={({ field, fieldState: { error } }) => (
                     <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <FileUpload
                              files={field.value || []}
                              setFiles={field.onChange}
                              placeholder="Select Image"
                              existingImage={existingImage}
                              error={error?.message}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            {form.watch("image").length > 0 && (
               <div className="my-4">
                  <FormField
                     control={form.control}
                     name="imageAlt"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Image Alt</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="Image alt" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            )}
            <div className="my-4">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Enter Name" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="my-4">
               <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Enter Designation" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="my-4">
               <FormField
                  control={form.control}
                  name="testimonial"
                  render={({ field, fieldState: { error } }) => (
                     <FormItem>
                        <FormLabel>Testimonial</FormLabel>
                        <FormControl>
                           <TextEditor
                              placeholder="Enter Testimonial"
                              value={field.value}
                              setValue={field.onChange}
                              error={error?.message}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <FormAction loading={loading} reset={() => resetForm()} />
         </form>
      </Form>
   );
}
