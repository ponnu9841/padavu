import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { fetchBanner, setSelectedBanner } from "@/store/features/banner-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { BannerFormData, bannerSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { Textarea } from "@/components/ui/textarea";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/file-upload";

const initalState = {
   id: "",
   image: [],
   imageAlt: "",
   title: "",
   description: "",
};

export default function BannerForm() {
   const form = useForm<BannerFormData>({
      resolver: zodResolver(bannerSchema),
      defaultValues: initalState,
   });
   const { register } = form;

   const dispatch = useAppDispatch();
   const selectedBanner = useAppSelector(
      (state) => state.banners.selectedBanner
   );
   const [loading, setLoading] = useState(false);
   const [existingImage, setExistingImage] = useState("");

   const onSubmit = (data: BannerFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("alt", data.imageAlt || "");
      form.append("title", data.title || "");
      form.append("description", data.description || "");
      form.append("existingImage", existingImage);
      if (data.image && data.image.length > 0) {
         form.append("image", data.image[0]);
      }
      if (data.id) form.append("id", data.id);
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/banners", form)
         .then((response) => {
            if (response.status === 200) {
               dispatch(fetchBanner());
               resetForm();
            }
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => setLoading(false));
   };

   const resetForm = () => {
      form.reset(initalState);
      dispatch(setSelectedBanner(null));
      setExistingImage("");
   };

   useEffect(() => {
      if (selectedBanner) {
         form.reset({
            id: selectedBanner.id,
            imageAlt: selectedBanner.alt || "",
            title: selectedBanner.title,
            description: selectedBanner.description,
         });
         setExistingImage(selectedBanner.image);
      }
   }, [selectedBanner]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
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

            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Enter Title" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Enter Title" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Textarea
                              {...field}
                              placeholder="Enter Banner Description"
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
