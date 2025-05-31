import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { SeoFormData, seoSchema } from "@/schema";
import { capitalizeFirstLetter } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import { fetchSeo } from "@/store/features/seo-slice";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";

const defaultValues = {
   title: "",
   description: "",
};

export default function SeoForm({ page }: { page: string }) {
   const form = useForm<SeoFormData>({
      resolver: zodResolver(seoSchema),
      defaultValues: { ...defaultValues, page },
   });

   const [loading, setLoading] = useState(false);
   const dispatch = useAppDispatch();
   const { seoTags } = useAppSelector((state) => state.seoTags);
   const currentSeoTag = seoTags.find((tags) => tags.page === page);

   const onSubmit = async (data: SeoFormData) => {
      try {
         setLoading(true);
         const method = data.id ? axiosInstance.put : axiosInstance.post;
         const response = await method("/seoTags", data);
         if (response.status === 200) {
            form.reset({ ...defaultValues, page });
            dispatch(fetchSeo());
         }
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (currentSeoTag) {
         form.reset({
            id: currentSeoTag.id,
            title: currentSeoTag.title || "",
            description: currentSeoTag.description || "",
         });
      }
   }, [currentSeoTag]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <h3>{capitalizeFirstLetter(page)}</h3>
            <input type="hidden" {...form.register("id")} />
            <input type="hidden" {...form.register("page")} value={page} />
            <div className="space-y-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <Input type="text" {...field} placeholder="Title" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <Textarea {...field} placeholder="Description" />
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
