import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { fetchVlogs, getSelectedVlog } from "@/store/features/vlogs-slice";
import { VlogFormData, vlogSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";

const defaultValues = {
   id: "",
   image: [],
   title: "",
   content: "",
};

export default function VlogsForm() {
   const form = useForm<VlogFormData>({
      resolver: zodResolver(vlogSchema),
      defaultValues,
   });

   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState(false);
   const selectedVlog = useAppSelector(getSelectedVlog);

   const resetForm = () => {
      form.reset(defaultValues);
   };

   const onSubmit = async (data: VlogFormData) => {
      setLoading(true);

      const reqBody = {
         url: data.url,
         ...(data.id ? { id: data.id } : {}),
      }
      
      const method = data.id ? axiosInstance.put : axiosInstance.post;

      try {
         const response = await method("/vlog   ", reqBody);
         if (response.status === 200) {
            resetForm();
         dispatch(fetchVlogs({}));
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false)
      }

      
   };

   useEffect(() => {
      if (selectedVlog) {
         form.reset({
            id: selectedVlog.id,
            url: selectedVlog.url
         });
      }
   }, [selectedVlog]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            <div className="space-y-4 mt-4">
              
               <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                           <Input
                              type="text"
                              placeholder="https://youtube.com"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               
               <FormAction reset={() => resetForm()} loading={loading} />
            </div>
         </form>
      </Form>
   );
}
