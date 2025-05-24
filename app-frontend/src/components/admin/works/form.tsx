import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { fetchWork } from "@/store/features/works-slice";
import { WorkFormData, workSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/file-upload";

const defaultValues = {
   id: "",
   image: [],
   alt: "",
   title: "",
   description: "",
};

export default function GalleryForm() {
   const form = useForm<WorkFormData>({
      resolver: zodResolver(workSchema),
      defaultValues,
   });

   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);

   const dispatch = useAppDispatch();
   const pageNo = useAppSelector((state) => state.works.pageNo);
   const selectedWork = useAppSelector((state) => state.works.selectedWork);

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
   };

   const onSubmit = (data: WorkFormData) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("alt", data.imageAlt || "");
      formData.append("title", data.title || "");
      formData.append("description", data.description || "");
      formData.append("existingImage", existingImage);
      if (data.id) {
         formData.append("id", data.id);
      }
      if (data.image.length > 0) {
         formData.append("image", data.image[0]);
      }
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/works", formData)
         .then((response) => {
            if (response.status === 200) {
               resetForm();
               dispatch(fetchWork({ pageNo }));
            }
         })
         .finally(() => setLoading(false));
   };

   useEffect(() => {
      if (selectedWork) {
         form.reset({
            id: selectedWork.id,
            imageAlt: selectedWork.alt || "",
            title: selectedWork.title || "",
            description: selectedWork.description || "",
         });
         setExistingImage(selectedWork.image);
      }
   }, [selectedWork]); //eslint-disable-line

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
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Title" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="my-4">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Description" />
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
