import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { fetchPagesBanner } from "@/store/features/pages-banner-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { PagesBannerFormData, pagesBannerSchema } from "@/schema";
import { capitalizeFirstLetter } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
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
   image: [],
   alt: "",
   title: "",
};

export default function PagesBannerForm({ page }: { page: string }) {
   const form = useForm<PagesBannerFormData>({
      resolver: zodResolver(pagesBannerSchema),
      defaultValues: { ...defaultValues, page },
   });

   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);
   const dispatch = useAppDispatch();
   const { banners } = useAppSelector((state) => state.pagesBanner);
   const currentBanner = banners.find((banner) => banner.page === page);

   const onSubmit = async (data: PagesBannerFormData) => {
      const formData = new FormData();
      formData.append("alt", data.alt || "");
      formData.append("title", data.title || "");
      formData.append("page", data.page);
      if (data.image.length > 0) {
         formData.append("image", data.image[0]);
      }
      if (data.id) {
         formData.append("id", data.id);
      }
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      try {
         setLoading(true);
         const response = await method("/pagesBanner", formData);

         if (response.status === 200) {
            form.reset({ ...defaultValues, page });
            setExistingImage("");
            dispatch(fetchPagesBanner());
         }
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (currentBanner) {
         form.reset({ ...defaultValues, page });
         setExistingImage(currentBanner.image);
      }
   }, [currentBanner]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <h3>{capitalizeFirstLetter(page)}</h3>
            <input type="hidden" {...form.register("id")} />
            <input type="hidden" {...form.register("page")} value={page} />
            <div className="space-y-2">
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
                  name="alt"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Image Alt</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              type="text"
                              placeholder="Image Alt Text"
                           />
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
                           <Input {...field} type="text" placeholder="Title" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormAction loading={loading} showResetButton={false} />
            </div>
         </form>
      </Form>
   );
}
