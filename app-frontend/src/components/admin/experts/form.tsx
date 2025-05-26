import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { ExpertsFormData, expertsSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "@/components/admin/form-action";
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
import {
   fetchExperts,
   setSelectedExpert,
} from "@/store/features/experts-slice";
import TextEditor from "@/components/text-editor";

const defaultValues = {
   id: "",
   image: [],
   imageAlt: "",
   title: "",
   description: "",
};

export default function ClientsForm() {
   const form = useForm<ExpertsFormData>({
      resolver: zodResolver(expertsSchema),
      defaultValues,
   });

   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);

   const dispatch = useAppDispatch();
   const selectedExpert = useAppSelector(
      (state) => state.experts.selectedExpert
   );

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
      dispatch(setSelectedExpert(null));
   };

   const onSubmit = (data: ExpertsFormData) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("alt", data.imageAlt || "");
      formData.append("existingImage", existingImage);
      if (data.image && data.image.length > 0) {
         formData.append("image", data.image[0]);
      }
      if (data.id) formData.append("id", data.id);
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/experts", formData)
         .then((response) => {
            if (response.status === 200) {
               resetForm();
               dispatch(fetchExperts());
            }
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => setLoading(false));
   };

   useEffect(() => {
      if (selectedExpert) {
         form.reset({
            id: selectedExpert.id,
            image: [],
            imageAlt: selectedExpert.alt || "",
            title: selectedExpert.title,
            description: selectedExpert.description,
         });
         setExistingImage(selectedExpert.image);
      }
   }, [selectedExpert]); // eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            <div className="space-y-4 mt-4">
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
               <FormField
                  control={form.control}
                  name="imageAlt"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Image Alt</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Image Alt" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
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
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState: { error } }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <TextEditor
                              placeholder="Enter description"
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
            <FormAction reset={resetForm} loading={loading} />
         </form>
      </Form>
   );
}
