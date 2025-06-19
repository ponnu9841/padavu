import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { fetchClient } from "@/store/features/clients-slice";
import { ClientFormData, clientSchema } from "@/schema";
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

export default function ClientsForm() {
   const form = useForm<ClientFormData>({
      resolver: zodResolver(clientSchema),
      defaultValues: {
         image: [],
         imageAlt: "",
      },
   });

   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);

   const dispatch = useAppDispatch();
   const selectedClient = useAppSelector(
      (state) => state.clients.selectedClient
   );

   const resetForm = () => {
      form.reset({
         id: "",
         image: [],
         imageAlt: "",
      });
      setExistingImage("");
   };

   const onSubmit = (data: ClientFormData) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("alt", data.imageAlt || "");
      formData.append("existingImage", existingImage);
      if (data.image.length > 0) {
         formData.append("image", data.image[0]);
      }
      if (data.id) formData.append("id", data.id);
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/clients", formData)
         .then((response) => {
            if (response.status === 200) {
               successCB();
            }
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => setLoading(false));
      function successCB() {
         resetForm();
         dispatch(fetchClient({ pageNo: 1 }));
      }
   };

   useEffect(() => {
      if (selectedClient) {
         form.reset({
            id: selectedClient.id,
            imageAlt: selectedClient.alt || "",
         });
         setExistingImage(selectedClient.image);
      }
   }, [selectedClient]); // eslint-disable-line

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
            </div>
            <div className="my-4">
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
            </div>
            <FormAction reset={resetForm} loading={loading} />
         </form>
      </Form>
   );
}
