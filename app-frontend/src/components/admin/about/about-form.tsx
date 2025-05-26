import FileUpload from "@/components/file-upload";
import TextEditor from "@/components/text-editor";
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
import { AboutFormData, aboutSchema } from "@/schema";
import { fetchAbout } from "@/store/features/about-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const defaultValues = {
   id: "",
   image: [],
   imageAlt: "",
   shortDescription: "",
   longDescription: "",
};

export default function AboutForm() {
   const form = useForm<AboutFormData>({
      resolver: zodResolver(aboutSchema),
      defaultValues,
   });

   const dispatch = useAppDispatch();
   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);
   const about = useAppSelector((state) => state.about.about);

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
   };

   const onSubmit = (data: AboutFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("alt", data.imageAlt || "");
      form.append("shortDescription", data.shortDescription);
      form.append("longDescription", data.longDescription || "");
      form.append("existingImage", existingImage || "");
      if (data.image.length > 0) {
         form.append("image", data.image[0]);
      }
      if (data.id) {
         form.append("id", data.id);
      }
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/about", form)
         .then((response) => {
            if (response.status === 200) {
               successCB();
            }
         })
         .catch((error) => {
            console.log(error);
            setLoading(false);
         })
         .finally(() => setLoading(false));

      function successCB() {
         resetForm();
         dispatch(fetchAbout());
      }
   };

   useEffect(() => {
      if (about) {
         form.reset({
            id: about.id,
            image: [],
            imageAlt: about.alt || "",
            shortDescription: about.short_description,
            longDescription: about.long_description || "",
         });
         setExistingImage(about.image);
      }
   }, [about]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="image"
                     render={({ field, fieldState: { error } }) => (
                        <FormItem>
                           <FormLabel>Image</FormLabel>
                           <FormControl>
                              <FileUpload
                                 files={field.value}
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
                           <FormLabel>Image</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="Image Alt" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="shortDescription"
                     render={({ field, fieldState: { error } }) => (
                        <FormItem>
                           <FormLabel>Short Description</FormLabel>
                           <FormControl>
                              <TextEditor
                                 placeholder="Enter short description"
                                 value={field.value}
                                 setValue={field.onChange}
                                 error={error?.message}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="longDescription"
                     render={({ field, fieldState: { error } }) => (
                        <FormItem>
                           <FormLabel>Long Description</FormLabel>
                           <FormControl>
                              <TextEditor
                                 placeholder="Enter long description"
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
            </div>
            <Button type="submit" disabled={loading}>
               {loading ? "Saving" : "Save"}
            </Button>
         </form>
      </Form>
   );
}
