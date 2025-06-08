import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchContact } from "@/store/features/contact-slice";
import { ContactFormData, contactSchema } from "@/schema";
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

const defaultValues = {
   id: "",
   location: "",
   contactOne: "",
   contactTwo: "",
   emailOne: "",
   emailTwo: "",
};

export default function ContactForm() {
   const form = useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
      defaultValues,
   });

   const [loading, setLoading] = useState(false);
   const dispatch = useAppDispatch();
   const { data } = useAppSelector((state) => state.contact);

   const onSubmit = (data: ContactFormData) => {
      if (data.id) {
         axiosInstance
            .put("/contact", data)
            .then((response) => {
               if (response.status === 200) {
                  form.reset();
                  dispatch(fetchContact());
               }
            })
            .finally(() => setLoading(false));
      } else {
         axiosInstance
            .post("/contact", data)
            .then((response) => {
               if (response.status === 200) {
                  form.reset();
                  dispatch(fetchContact());
               }
            })
            .finally(() => setLoading(false));
      }
   };

   useEffect(() => {
      if (data) {
         form.reset({
            id: data.id,
            location: data.location,
            contactOne: data.contactno_one,
            contactTwo: data.contactno_two || "",
            emailOne: data.email_one,
            emailTwo: data.email_two || "",
            map: data.map || "",
         });
      }
   }, [data]); //eslint-disable-line

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 grid-cols-2 gap-4"
         >
            <input type="hidden" {...form.register("id")} />
            <FormField
               control={form.control}
               name="map"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Map</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Add url for map location"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="location"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Location</FormLabel>
                     <FormControl>
                        <Textarea placeholder="Add Location" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="contactOne"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Contact Number</FormLabel>
                     <FormControl>
                        <Input placeholder="Add Contact Number" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="contactTwo"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Alternate Contact Number</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Add Alternate Contact Number"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="emailOne"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder="Add Email" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="emailTwo"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Alternate Email</FormLabel>
                     <FormControl>
                        <Input placeholder="Add Alternate Email" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="col-span-2 -mt-6">
               <FormAction loading={loading} showResetButton={false} />
            </div>
         </form>
      </Form>
   );
}
